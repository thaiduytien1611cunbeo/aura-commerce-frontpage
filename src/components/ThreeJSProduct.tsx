
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeJSProduct: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const phoneRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create phone model (simplified)
    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);
    phoneRef.current = phoneGroup;
    
    // Phone body
    const bodyGeometry = new THREE.BoxGeometry(1.5, 3, 0.2);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x111111,
      specular: 0x333333,
      shininess: 100 
    });
    const phoneBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    phoneGroup.add(phoneBody);
    
    // Screen
    const screenGeometry = new THREE.BoxGeometry(1.4, 2.8, 0.05);
    const screenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x3498db,
      emissive: 0x3498db,
      emissiveIntensity: 0.2
    });
    const phoneScreen = new THREE.Mesh(screenGeometry, screenMaterial);
    phoneScreen.position.z = 0.1;
    phoneGroup.add(phoneScreen);
    
    // Camera bump
    const cameraBumpGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.1);
    const cameraBumpMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const cameraBump = new THREE.Mesh(cameraBumpGeometry, cameraBumpMaterial);
    cameraBump.position.z = -0.15;
    cameraBump.position.x = 0;
    cameraBump.position.y = 1;
    phoneGroup.add(cameraBump);
    
    // Animation loop
    const animate = () => {
      if (!phoneRef.current) return;
      
      // Gentle floating animation
      phoneRef.current.rotation.y += 0.01;
      phoneRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      
      rendererRef.current?.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current?.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      rendererRef.current?.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className="w-full h-full" />;
};

export default ThreeJSProduct;
