/**
 * ============================================================================
 * PREMIUM HOSPITAL & CLINIC — THREE.JS 3D MEDICAL VISUALIZATION
 * Interactive Holographic Medical Sphere & DNA Particle Helix
 * ============================================================================
 */

(function () {
  'use strict';

  // Check if THREE is available
  if (typeof THREE === 'undefined') {
    console.warn('Three.js library is not loaded.');
    return;
  }

  const container = document.getElementById('three-medical-canvas');
  if (!container) return;

  // Check reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scene Setup
  let scene, camera, renderer;
  let dnaGroup, outerSphereGroup, particleSystem;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let windowHalfX = container.clientWidth / 2;
  let windowHalfY = container.clientHeight / 2;
  let isVisible = true;
  let animationFrameId;

  // Detect mobile
  const isMobile = window.innerWidth <= 768;
  const particleMultiplier = isMobile ? 0.35 : 1.0;

  function init() {
    // 1. Scene
    scene = new THREE.Scene();

    // 2. Camera
    camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    camera.position.z = 260;

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1128, 2.5);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x0052ff, 4, 300);
    blueLight.position.set(100, 100, 100);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00d2ff, 3.5, 300);
    cyanLight.position.set(-100, -80, 80);
    scene.add(cyanLight);

    // 5. Build Medical 3D Objects
    createDnaHelix();
    createMedicalSphere();
    createAmbientParticles();

    // 6. Event Listeners
    window.addEventListener('resize', onWindowResize, { passive: true });
    if (!isMobile && !prefersReducedMotion) {
      document.addEventListener('mousemove', onDocumentMouseMove, { passive: true });
    }

    // 7. Visibility Observer for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animate();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(container);

    animate();
  }

  // Create Holographic DNA Double-Helix
  function createDnaHelix() {
    dnaGroup = new THREE.Group();
    const count = Math.floor(45 * particleMultiplier);
    const radius = 32;
    const height = 110;
    const step = height / count;

    // Glowing Sphere Geometry & Materials
    const sphereGeo = new THREE.SphereGeometry(1.6, 12, 12);
    const matCyan = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      emissive: 0x00a3cc,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8
    });
    const matSapphire = new THREE.MeshStandardMaterial({
      color: 0x0052ff,
      emissive: 0x0033aa,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8
    });

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.35
    });

    for (let i = 0; i < count; i++) {
      const angle = (i * 0.35);
      const y = -height / 2 + i * step;

      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;

      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      // Node 1
      const node1 = new THREE.Mesh(sphereGeo, matCyan);
      node1.position.set(x1, y, z1);
      dnaGroup.add(node1);

      // Node 2
      const node2 = new THREE.Mesh(sphereGeo, matSapphire);
      node2.position.set(x2, y, z2);
      dnaGroup.add(node2);

      // Connecting Hydrogen Bond
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1, y, z1),
        new THREE.Vector3(x2, y, z2)
      ]);
      const line = new THREE.Line(lineGeo, lineMat);
      dnaGroup.add(line);
    }

    dnaGroup.rotation.z = Math.PI / 6;
    dnaGroup.rotation.x = Math.PI / 12;
    scene.add(dnaGroup);
  }

  // Create Abstract Medical Cage Sphere
  function createMedicalSphere() {
    outerSphereGroup = new THREE.Group();

    // Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(70, isMobile ? 1 : 2);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x0052ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    outerSphereGroup.add(icoMesh);

    // Outer Glow Ring
    const ringGeo = new THREE.TorusGeometry(85, 0.6, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      emissive: 0x00d2ff,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.4
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    outerSphereGroup.add(ringMesh);

    scene.add(outerSphereGroup);
  }

  // Ambient Floating Medical Particles
  function createAmbientParticles() {
    const particleCount = Math.floor(180 * particleMultiplier);
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x0052ff);
    const color2 = new THREE.Color(0x00d2ff);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 320;
      positions[i + 1] = (Math.random() - 0.5) * 320;
      positions[i + 2] = (Math.random() - 0.5) * 200;

      const mixedColor = Math.random() > 0.5 ? color1 : color2;
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
  }

  function onWindowResize() {
    if (!container) return;
    windowHalfX = container.clientWidth / 2;
    windowHalfY = container.clientHeight / 2;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  // Animation Loop
  function animate() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    animationFrameId = requestAnimationFrame(animate);

    if (!prefersReducedMotion) {
      // Smooth Mouse Parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 0.8;
      camera.position.y = -targetY * 0.8;
      camera.lookAt(scene.position);

      // Rotations
      if (dnaGroup) {
        dnaGroup.rotation.y += 0.008;
      }
      if (outerSphereGroup) {
        outerSphereGroup.rotation.y -= 0.004;
        outerSphereGroup.rotation.x += 0.002;
      }
      if (particleSystem) {
        particleSystem.rotation.y += 0.001;
      }
    }

    renderer.render(scene, camera);
  }

  // Start initialization on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
