import * as THREE from 'three';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

let camera, scene, renderer,
  singleMaterial, zmaterial,
  parameters, nobjects, cubeMaterial;

let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let width = window.innerWidth;
let height = window.innerHeight;

const materials = [], objects = [];

interface Postprocessing {
  composer?: EffectComposer;
  bokeh?: BokehPass;
}

const postprocessing: Postprocessing = {};

init();

function init() {

  const container = document.getElementById('background');

  camera = new THREE.PerspectiveCamera(70, width / height, 1, 3000);
  camera.position.z = 200;

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setAnimationLoop(render);
  container.appendChild(renderer.domElement);

  const path = '/textures/cube/';
  const format = '.jpeg';
  const urls = [
    path + 'px' + format, path + 'nx' + format,
    path + 'py' + format, path + 'ny' + format,
    path + 'pz' + format, path + 'nz' + format
  ];

  const textureLoader = new THREE.CubeTextureLoader();
  const textureCube = textureLoader.load(urls);

  textureCube.generateMipmaps = true;
  textureCube.minFilter = THREE.LinearMipmapLinearFilter;
  textureCube.magFilter = THREE.LinearFilter;

  parameters = {
    color: 0xffffff,
    envMap: textureCube,
    envMapIntensity: 1.5,
    metalness: 0.9,
    roughness: 0,
    transparent: true,
    opacity: 0.8,
  };

  cubeMaterial = new THREE.MeshPhysicalMaterial(parameters);

  singleMaterial = false;

  if (singleMaterial) zmaterial = [cubeMaterial];

  const geo = new THREE.SphereGeometry(1, 32, 32);

  const xgrid = 4, ygrid = 3, zgrid = 4;

  nobjects = xgrid * ygrid * zgrid;

  const s = 60;
  let count = 0;

  for (let i = 0; i < xgrid; i++) {

    for (let j = 0; j < ygrid; j++) {

      for (let k = 0; k < zgrid; k++) {

        let mesh;

        if (singleMaterial) {

          mesh = new THREE.Mesh(geo, zmaterial);

        } else {

          mesh = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial(parameters));
          materials[count] = mesh.material;

        }

        const x = 150 * (i - xgrid / 2);
        const y = 150 * (j - ygrid / 2);
        const z = 150 * (k - zgrid / 2);

        mesh.position.set(x, y, z);
        mesh.scale.set(s, s, s);

        mesh.matrixAutoUpdate = true;
        mesh.updateMatrix();

        scene.add(mesh);
        objects.push(mesh);

        count++;

      }

    }

  }

  initPostprocessing();

  renderer.autoClear = false;

  container.style.touchAction = 'none';

  if (window.innerWidth > 800) document.addEventListener('pointermove', onPointerMove);


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

  camera.position.x += (mouseX - camera.position.x) * 0.066;
  camera.position.y += (mouseY - camera.position.y) * 0.066;

  camera.lookAt(scene.position);

  objects.forEach((mesh, i) => {
    mesh.rotation.x = time * (i % 2 ? 0.1 : -0.1);
    mesh.rotation.y = time * (i % 3 ? 0.1 : -0.1);
    mesh.updateMatrix();
  });

  if (!singleMaterial) {
    for (let i = 0; i < nobjects; i++) {
      const h = (360 * (i / nobjects + time) % 360) / 60;
      materials[i].color.setHSL(h, 1, 0.5);
    }
  }
  postprocessing.composer.render(0.1);

}