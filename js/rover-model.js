document.addEventListener('DOMContentLoaded', function() {
    const roverCanvas = document.getElementById('rover-model');
    if (!roverCanvas) return;
    
    // Get rover ID from data attribute
    const roverId = roverCanvas.getAttribute('data-rover-id');
    
    // Initialize Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, roverCanvas.clientWidth / roverCanvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: roverCanvas, antialias: true });
    
    renderer.setSize(roverCanvas.clientWidth, roverCanvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Load rover model
    const loader = new THREE.GLTFLoader();
    
    // In a real application, you would have different models for each rover
    // For this example, we'll use a placeholder model
    loader.load('/assets/3d/duck.glb', function(gltf) {
      const model = gltf.scene;
      model.scale.set(2, 2, 2);
      model.position.set(0, -1, 0);
      scene.add(model);
      
      // Animate model rotation
      function animate() {
        requestAnimationFrame(animate);
        model.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      
      animate();
    });
    
    // Set camera position
    camera.position.z = 10;
    
    // Handle window resize
    window.addEventListener('resize', function() {
      camera.aspect = roverCanvas.clientWidth / roverCanvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(roverCanvas.clientWidth, roverCanvas.clientHeight);
    });
    
    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 2;
    
    // Initial render
    renderer.render(scene, camera);
  });