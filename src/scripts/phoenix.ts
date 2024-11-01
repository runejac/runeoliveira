import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import gsap from 'gsap';

const camera = new THREE.PerspectiveCamera(
  15,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 100;

const scene = new THREE.Scene();
let phoenix: THREE.Group | null = null;
let mixer: THREE.AnimationMixer | null = null;
const loader = new GLTFLoader();

// Update the initial model positions array
let arrPosModel = [
  {
    id: "intro",
    position: new THREE.Vector3(10, -5, 0),
    rotation: new THREE.Euler(0, Math.PI, 0),
  },
  {
    id: "about",
    position: new THREE.Vector3(-17, 0, 0),
    rotation: new THREE.Euler(0, Math.PI * 2, 0),
  },
  {
    id: "footer",
    position: new THREE.Vector3(17, -6, 0),
    rotation: new THREE.Euler(0, Math.PI, 0),
  }
];

loader.load(
  './models/phoenix_bird.glb',
  function (gltf) {
    phoenix = gltf.scene;
    phoenix.scale.set(0.007, 0.007, 0.007);
    phoenix.rotation.y = Math.PI;
    // phoenix.rotation.y = Math.PI * 1.5;
    scene.add(phoenix);
    mixer = new THREE.AnimationMixer(phoenix);
    mixer.clipAction(gltf.animations[0]).play();

    // Set initial position
    phoenix.position.copy(arrPosModel[0].position);

    // Call moveModel after a short delay to ensure everything is set up
    setTimeout(moveModel, 100);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error('Error loading model:', error);
  }
);

const container = document.getElementById('container3D');
if (!container) {
  console.error('Could not find container3D element');
  throw new Error('Missing container element');
}

// Update renderer settings
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  powerPreference: "high-performance"
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
container.appendChild(renderer.domElement);

// Setup new postprocessing effects
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);



const bloomEffect = new BloomEffect({
  luminanceThreshold: 0.1,
  luminanceSmoothing: 0.9,
  intensity: 1.0,
  radius: 0.8
});

const effectPass = new EffectPass(camera, bloomEffect);
effectPass.renderToScreen = true;
composer.addPass(effectPass);

// Update the lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 0);
topLight.position.set(5, 10, 5);
scene.add(topLight);

const bottomLight = new THREE.DirectionalLight(0xffffff, 1.0);
bottomLight.position.set(0, -10, 5);
scene.add(bottomLight);

// Add a subtle front light to fill shadows
const frontLight = new THREE.DirectionalLight(0xffffff, 0.3);
frontLight.position.set(0, 0, 10);
scene.add(frontLight);

// The render function remains the same
function reRender3D() {
  requestAnimationFrame(reRender3D);

  if (mixer) {
    mixer.update(0.01);
  }

  composer.render();
}

reRender3D();

// Update the moveModel function
function moveModel() {
  const sections = document.querySelectorAll('.section');
  let currentSection = null;
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Check if we're near the bottom of the page
  const isNearBottom = scrollPosition + windowHeight > documentHeight - 100;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (isNearBottom && section.id === 'footer') {
      currentSection = 'footer';
    } else if (rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25 && !isNearBottom) {
      currentSection = section.id;
    }
  });

  console.log('Current section:', currentSection);

  let positionActive = arrPosModel.findIndex((value) => value.id === currentSection);
  if (positionActive !== -1 && phoenix) {
    const targetPosition = arrPosModel[positionActive].position;
    const targetRotation = arrPosModel[positionActive].rotation;

    // Check if position actually changes
    const isMoving =
      Math.abs(phoenix.position.x - targetPosition.x) > 0.1 ||
      Math.abs(phoenix.position.y - targetPosition.y) > 0.1;

    // Create a timeline for sequenced animations
    const timeline = gsap.timeline();

    // First animation: Position change
    timeline.to(phoenix.position, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: function () {
        phoenix.position.z = Math.sin(Date.now() * 0.002) * 2;
      },
      onStart: function () {
        if (isMoving && mixer) {
          gsap.to(mixer, {
            timeScale: 2.5,
            duration: 0.5
          });
        }
      }
    });

    // Second animation: Rotation (starts after position change)
    timeline.to(phoenix.rotation, {
      x: targetRotation.x,
      y: targetRotation.y,
      z: targetRotation.z,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: function () {
        if (isMoving && mixer) {
          gsap.to(mixer, {
            timeScale: 1,
            duration: 0.5
          });
        }
      }
    }, ">");  // ">" means start after previous animation
  }
}

// Update the scroll event listener
let scrollTimeout: NodeJS.Timeout;
window.addEventListener('scroll', function () {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (phoenix) {
      moveModel();
    }
  }, 50); // Reduced debounce time for more responsive movement
});

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  composer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});