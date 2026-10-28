/**
 * CODE ALPHA — CINEMATIC 3D BACKGROUND
 * Evolution of Humanity: Ancient Origins -> Modern Civilizations -> Futuristic AI Metropolises
 * Built with Three.js
 */

(function () {
  'use strict';

  const container = document.getElementById('evolution-canvas-container');
  if (!container || typeof THREE === 'undefined') {
    console.warn('Three.js container or library not found. Falling back to ambient background.');
    return;
  }

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030712, 0.0018);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  );
  camera.position.set(0, 40, 400);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x0e1c36, 1.2);
  scene.add(ambientLight);

  const cyanKeyLight = new THREE.DirectionalLight(0x00f3ff, 2.5);
  cyanKeyLight.position.set(200, 300, 200);
  scene.add(cyanKeyLight);

  const violetRimLight = new THREE.DirectionalLight(0xb026ff, 2.0);
  violetRimLight.position.set(-200, -100, -200);
  scene.add(violetRimLight);

  // Mouse Parallax variables
  let mouseX = 0;
  let mouseY = 0;
  let targetCameraX = 0;
  let targetCameraY = 40;
  let targetCameraZ = 400;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.12;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.08;
  });

  // Time Era coordinate map along Z-axis
  // Ancient Origins: Z = 900
  // Classical/Industrial Era: Z = 450
  // Modern Digital Era: Z = 0
  // Cyber Future: Z = -450
  const eraPositions = {
    ancient: { z: 900, y: 30, desc: "Ancient Origins & Primal Stone Monoliths" },
    classical: { z: 450, y: 35, desc: "Classical Architecture & Celestial Astrolabe" },
    modern: { z: 0, y: 40, desc: "Digital Silicon Matrix & Fiber Data Networks" },
    future: { z: -450, y: 55, desc: "Cyberpunk Metropolis & AI Neural Supercluster" }
  };

  // Master Group containers for each Era
  const eraAncientGroup = new THREE.Group();
  const eraClassicalGroup = new THREE.Group();
  const eraModernGroup = new THREE.Group();
  const eraFutureGroup = new THREE.Group();

  scene.add(eraAncientGroup);
  scene.add(eraClassicalGroup);
  scene.add(eraModernGroup);
  scene.add(eraFutureGroup);

  /* =========================================================
     ERA 1: ANCIENT ORIGINS (Z ~ 900)
     Stonehenge-style monolithic pillars, primitive fire ember particles,
     ancient celestial star field
     ========================================================= */
  eraAncientGroup.position.set(0, 0, 900);

  // Monolith Stones Ring
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x24283b,
    roughness: 0.9,
    metalness: 0.1
  });

  const pillarCount = 14;
  const pillarRadius = 160;
  for (let i = 0; i < pillarCount; i++) {
    const angle = (i / pillarCount) * Math.PI * 2;
    const h = 50 + Math.random() * 20;
    const pillarGeom = new THREE.BoxGeometry(16, h, 14);
    const pillar = new THREE.Mesh(pillarGeom, stoneMat);
    pillar.position.set(
      Math.cos(angle) * pillarRadius,
      h / 2,
      Math.sin(angle) * pillarRadius
    );
    pillar.rotation.y = -angle;
    eraAncientGroup.add(pillar);

    // Lintel stones on top of alternate pillars
    if (i % 2 === 0) {
      const lintelGeom = new THREE.BoxGeometry(36, 10, 15);
      const lintel = new THREE.Mesh(lintelGeom, stoneMat);
      lintel.position.set(
        Math.cos(angle) * pillarRadius,
        h + 5,
        Math.sin(angle) * pillarRadius
      );
      lintel.rotation.y = -angle;
      eraAncientGroup.add(lintel);
    }
  }

  // Ancient Human Silhouette Monolith marker in center
  const centerMonolithGeom = new THREE.CylinderGeometry(8, 12, 110, 8);
  const centerMonolithMat = new THREE.MeshStandardMaterial({
    color: 0x1a2133,
    roughness: 0.7,
    emissive: 0x050c18
  });
  const centerMonolith = new THREE.Mesh(centerMonolithGeom, centerMonolithMat);
  centerMonolith.position.set(0, 55, 0);
  eraAncientGroup.add(centerMonolith);

  // Primitive Fire / Ember Particles
  const fireCount = 400;
  const fireGeom = new THREE.BufferGeometry();
  const firePositions = new Float32Array(fireCount * 3);
  const fireColors = new Float32Array(fireCount * 3);

  for (let i = 0; i < fireCount; i++) {
    const r = Math.random() * 90;
    const theta = Math.random() * Math.PI * 2;
    firePositions[i * 3] = Math.cos(theta) * r;
    firePositions[i * 3 + 1] = Math.random() * 80;
    firePositions[i * 3 + 2] = Math.sin(theta) * r;

    // Warm gold/amber fire hues
    fireColors[i * 3] = 1.0;
    fireColors[i * 3 + 1] = 0.4 + Math.random() * 0.4;
    fireColors[i * 3 + 2] = 0.05;
  }
  fireGeom.setAttribute('position', new THREE.BufferAttribute(firePositions, 3));
  fireGeom.setAttribute('color', new THREE.BufferAttribute(fireColors, 3));

  const fireMat = new THREE.PointsMaterial({
    size: 4,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const firePoints = new THREE.Points(fireGeom, fireMat);
  eraAncientGroup.add(firePoints);

  /* =========================================================
     ERA 2: CLASSICAL & INDUSTRIAL AGE (Z ~ 450)
     Roman / Classical Arches, Rotating Celestial Astrolabe, Brass Gears
     ========================================================= */
  eraClassicalGroup.position.set(0, 0, 450);

  // Rotating Celestial Astrolabe Rings
  const astrolabeGroup = new THREE.Group();
  astrolabeGroup.position.set(0, 60, 0);

  const ringMatGold = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.85,
    roughness: 0.25,
    emissive: 0x473809
  });

  const astrolabeRing1 = new THREE.Mesh(
    new THREE.TorusGeometry(80, 2.5, 16, 80),
    ringMatGold
  );
  const astrolabeRing2 = new THREE.Mesh(
    new THREE.TorusGeometry(60, 2.0, 16, 60),
    ringMatGold
  );
  const astrolabeRing3 = new THREE.Mesh(
    new THREE.TorusGeometry(40, 1.8, 16, 40),
    ringMatGold
  );

  astrolabeRing2.rotation.x = Math.PI / 3;
  astrolabeRing3.rotation.y = Math.PI / 4;

  astrolabeGroup.add(astrolabeRing1);
  astrolabeGroup.add(astrolabeRing2);
  astrolabeGroup.add(astrolabeRing3);
  eraClassicalGroup.add(astrolabeGroup);

  // Classical Colonnade Pillars
  for (let i = -3; i <= 3; i++) {
    if (i === 0) continue;
    const colGeom = new THREE.CylinderGeometry(5, 6, 90, 16);
    const colMat = new THREE.MeshStandardMaterial({ color: 0x404860, roughness: 0.5 });
    const col = new THREE.Mesh(colGeom, colMat);
    col.position.set(i * 45, 45, -70);
    eraClassicalGroup.add(col);
  }

  /* =========================================================
     ERA 3: MODERN DIGITAL CIVILIZATION (Z ~ 0)
     Silicon Circuit Microchip Grids, Fiber Optic Streams, Binary Particles
     ========================================================= */
  eraModernGroup.position.set(0, 0, 0);

  // Floor Grid: Silicon Circuit lines
  const gridHelper = new THREE.GridHelper(360, 36, 0x00f3ff, 0x132644);
  gridHelper.position.y = 0;
  eraModernGroup.add(gridHelper);

  // Vertical Fiber-Optic Digital Beams
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x00f3ff,
    transparent: true,
    opacity: 0.65,
    wireframe: true
  });

  for (let i = 0; i < 18; i++) {
    const beamHeight = 120 + Math.random() * 100;
    const beamGeom = new THREE.CylinderGeometry(1.5, 1.5, beamHeight, 6);
    const beam = new THREE.Mesh(beamGeom, beamMat);
    beam.position.set(
      (Math.random() - 0.5) * 320,
      beamHeight / 2,
      (Math.random() - 0.5) * 220
    );
    eraModernGroup.add(beam);
  }

  // Floating Binary / Data Cloud
  const binaryCount = 600;
  const binaryGeom = new THREE.BufferGeometry();
  const binaryPos = new Float32Array(binaryCount * 3);
  for (let i = 0; i < binaryCount; i++) {
    binaryPos[i * 3] = (Math.random() - 0.5) * 400;
    binaryPos[i * 3 + 1] = Math.random() * 150;
    binaryPos[i * 3 + 2] = (Math.random() - 0.5) * 300;
  }
  binaryGeom.setAttribute('position', new THREE.BufferAttribute(binaryPos, 3));
  const binaryMat = new THREE.PointsMaterial({
    color: 0x00f3ff,
    size: 3,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  const binaryPoints = new THREE.Points(binaryGeom, binaryMat);
  eraModernGroup.add(binaryPoints);

  /* =========================================================
     ERA 4: FUTURISTIC AI METROPOLIS (Z ~ -450)
     Cyberpunk Skyscrapers, Neon Hologram Rings, AI Synaptic Constellation
     ========================================================= */
  eraFutureGroup.position.set(0, 0, -450);

  // Cyberpunk Skyscrapers
  const buildingMatCyan = new THREE.MeshStandardMaterial({
    color: 0x071124,
    roughness: 0.2,
    metalness: 0.8,
    emissive: 0x002c42
  });

  const buildingMatViolet = new THREE.MeshStandardMaterial({
    color: 0x0d0924,
    roughness: 0.2,
    metalness: 0.8,
    emissive: 0x2a0047
  });

  for (let i = 0; i < 28; i++) {
    const w = 20 + Math.random() * 25;
    const d = 20 + Math.random() * 25;
    const h = 140 + Math.random() * 240;
    const geom = new THREE.BoxGeometry(w, h, d);
    const mat = i % 2 === 0 ? buildingMatCyan : buildingMatViolet;
    const building = new THREE.Mesh(geom, mat);

    const x = (Math.random() > 0.5 ? 1 : -1) * (110 + Math.random() * 220);
    const z = (Math.random() - 0.5) * 380;
    building.position.set(x, h / 2, z);
    eraFutureGroup.add(building);

    // Glowing Neon Top Beacon
    const beaconGeom = new THREE.SphereGeometry(3, 12, 12);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0x00f3ff : 0xb026ff
    });
    const beacon = new THREE.Mesh(beaconGeom, beaconMat);
    beacon.position.set(x, h + 2, z);
    eraFutureGroup.add(beacon);
  }

  // Giant Levitating Holographic Torus Ring
  const holoRingGeom = new THREE.TorusGeometry(120, 3, 16, 100);
  const holoRingMat = new THREE.MeshBasicMaterial({
    color: 0x00f3ff,
    wireframe: true,
    transparent: true,
    opacity: 0.7
  });
  const holoRing = new THREE.Mesh(holoRingGeom, holoRingMat);
  holoRing.position.set(0, 160, -100);
  holoRing.rotation.x = Math.PI / 4;
  eraFutureGroup.add(holoRing);

  // Outer Counter-Rotating Violet Ring
  const holoRing2Geom = new THREE.TorusGeometry(160, 2, 16, 100);
  const holoRing2Mat = new THREE.MeshBasicMaterial({
    color: 0xb026ff,
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });
  const holoRing2 = new THREE.Mesh(holoRing2Geom, holoRing2Mat);
  holoRing2.position.set(0, 160, -100);
  holoRing2.rotation.y = Math.PI / 3;
  eraFutureGroup.add(holoRing2);

  // AI Neural Network Constellation Nodes
  const neuralNodeCount = 120;
  const neuralNodes = [];
  const neuralGroup = new THREE.Group();
  neuralGroup.position.set(0, 120, 0);

  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00ffa3 });
  for (let i = 0; i < neuralNodeCount; i++) {
    const nodeGeom = new THREE.SphereGeometry(1.8, 8, 8);
    const node = new THREE.Mesh(nodeGeom, nodeMat);
    node.position.set(
      (Math.random() - 0.5) * 220,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 220
    );
    neuralNodes.push(node);
    neuralGroup.add(node);
  }
  eraFutureGroup.add(neuralGroup);

  // Cosmic Background Starfield
  const starCount = 1800;
  const starGeom = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 2000;
    starPos[i * 3 + 1] = Math.random() * 900 - 100;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 2400;
  }
  starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0x88bbff,
    size: 2,
    transparent: true,
    opacity: 0.6
  });
  const starfield = new THREE.Points(starGeom, starMat);
  scene.add(starfield);

  /* =========================================================
     ANIMATION LOOP & TIME ZOOM CONTROLS
     ========================================================= */
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Rotate Astrolabe
    astrolabeRing1.rotation.z += 0.25 * delta;
    astrolabeRing2.rotation.x += 0.35 * delta;
    astrolabeRing3.rotation.y += 0.45 * delta;

    // Rotate Future Hologram Rings
    holoRing.rotation.z += 0.2 * delta;
    holoRing2.rotation.z -= 0.15 * delta;
    holoRing2.rotation.x += 0.1 * delta;

    // Animate AI Neural Network
    neuralGroup.rotation.y += 0.1 * delta;

    // Animate Primitive Embers rising
    const firePosArr = fireGeom.attributes.position.array;
    for (let i = 0; i < fireCount; i++) {
      firePosArr[i * 3 + 1] += 20 * delta;
      if (firePosArr[i * 3 + 1] > 90) {
        firePosArr[i * 3 + 1] = 0;
      }
    }
    fireGeom.attributes.position.needsUpdate = true;

    // Parallax & Smooth Camera Motion
    targetCameraX = mouseX;
    targetCameraY = 40 - mouseY;

    camera.position.x += (targetCameraX - camera.position.x) * 0.05;
    camera.position.y += (targetCameraY - camera.position.y) * 0.05;
    camera.position.z += (targetCameraZ - camera.position.z) * 0.035;

    camera.lookAt(0, 30, camera.position.z - 300);

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Global Time Era Navigator Hook
  window.navigateToEra = function (eraKey) {
    if (eraPositions[eraKey]) {
      targetCameraZ = eraPositions[eraKey].z + 280;
      targetCameraY = eraPositions[eraKey].y;

      // Update UI active pill
      document.querySelectorAll('.era-pill').forEach((pill) => {
        if (pill.dataset.era === eraKey) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });
    }
  };

  // Wire era pills in the UI
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.era-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        const era = pill.dataset.era;
        window.navigateToEra(era);
      });
    });
  });
})();
