import * as THREE from 'three';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

let camera,
  scene,
  renderer,
  singleMaterial,
  zmaterial,
  nobjects,
  cubeMaterial;

let mouseX = 0,
  mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let width = window.innerWidth;
let height = window.innerHeight;

const materials = [],
  objects = [];

interface Postprocessing {
  composer?: EffectComposer;
  bokeh?: BokehPass;
}

const postprocessing: Postprocessing = {};
const sharedGeometry = new THREE.SphereGeometry(1, 16, 16);
const frustum = new THREE.Frustum();
const projScreenMatrix = new THREE.Matrix4();
const textureLoader = new THREE.CubeTextureLoader();
textureLoader.setPath('/textures/cube/');
const textureCube = textureLoader.load([
  'px.jpeg',
  'nx.jpeg',
  'py.jpeg',
  'ny.jpeg',
  'pz.jpeg',
  'nz.jpeg',
]);
const sharedMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.9,
  roughness: 0,
  transparent: true,
  opacity: 0.8,
});

sharedMaterial.envMap = textureCube;
sharedMaterial.envMapIntensity = 1.5;

init();

function init() {
  const container = document.getElementById('background');

  camera = new THREE.PerspectiveCamera(70, width / height, 1, 3000);
  camera.position.z = 200;

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setAnimationLoop(render);
  container.appendChild(renderer.domElement);

  textureCube.generateMipmaps = true;
  textureCube.minFilter = THREE.LinearMipmapLinearFilter;
  textureCube.magFilter = THREE.LinearFilter;

  const xgrid = 4,
    ygrid = 3,
    zgrid = 4;

  nobjects = xgrid * ygrid * zgrid;

  const objectPool = new THREE.Group();
  scene.add(objectPool);

  for (let i = 0; i < xgrid; i++) {
    for (let j = 0; j < ygrid; j++) {
      for (let k = 0; k < zgrid; k++) {
        const mesh = new THREE.Mesh(
          sharedGeometry,
          sharedMaterial.clone(),
        );

        const x = 300 * (i - xgrid / 2);
        const y = 300 * (j - ygrid / 2);
        const z = 300 * (k - zgrid / 2);

        mesh.position.set(x, y, z);
        mesh.scale.set(60, 60, 60);

        mesh.matrixAutoUpdate = true;
        mesh.updateMatrix();

        objectPool.add(mesh);
        objects.push(mesh);
        materials.push(mesh.material);
      }
    }
  }

  initPostprocessing();

  renderer.autoClear = false;

  container.style.touchAction = 'none';

  if (window.innerWidth > 800)
    document.addEventListener('pointermove', onPointerMove);

  window.addEventListener('resize', onWindowResize);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  width = window.innerWidth;
  height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  postprocessing.composer.setSize(width, height);
}

function initPostprocessing() {
  const renderPass = new RenderPass(scene, camera);

  const bokehPass = new BokehPass(scene, camera, {
    focus: 1.5,
    aperture: 1,
    maxblur: 0,
  });

  const outputPass = new OutputPass();

  const composer = new EffectComposer(renderer);

  composer.addPass(renderPass);
  composer.addPass(bokehPass);
  composer.addPass(outputPass);

  postprocessing.composer = composer;
  postprocessing.bokeh = bokehPass;
}

function render() {
  const time = Date.now() * 0.00005;

  camera.position.x += (mouseX - camera.position.x) * 0.03;
  camera.position.y += (mouseY - camera.position.y) * 0.03;

  camera.lookAt(scene.position);

  projScreenMatrix.multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse,
  );

  frustum.setFromProjectionMatrix(projScreenMatrix);

  objects.forEach((mesh, i) => {
    if (frustum.containsPoint(mesh.position)) {
      mesh.rotation.x = time * (i % 2 ? 0.1 : -0.1);
      mesh.rotation.y = time * (i % 3 ? 0.1 : -0.1);
      if (!singleMaterial) {
        const h = ((360 * (i / nobjects + time)) % 360) / 60;
        materials[i].color.setHSL(h, 1, 0.5);
      }
    }
  });

  postprocessing.composer.render(0.1);
}
