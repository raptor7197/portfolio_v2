
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedGlobe() {
  const globeRef = useRef<THREE.Points>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3); 
    
    for (let i = 0; i < 2000; i++) {
      const phi = Math.acos(-1 + (2 * i) / 2000);
      const theta = Math.sqrt(2000 * Math.PI) * phi;
      
      const radius = 3;
      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      globeRef.current.rotation.z = 0.4;
    }
    
    if (ringRef1.current) {
      ringRef1.current.rotation.y = state.clock.elapsedTime * 0.3;
      ringRef1.current.rotation.x = Math.PI / 6; // Tilted
    }
    
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -state.clock.elapsedTime * 0.25;
      ringRef2.current.rotation.x = Math.PI / 4; // Different tilt
    }
    
    if (ringRef3.current) {
      ringRef3.current.rotation.y = state.clock.elapsedTime * 0.2;
      ringRef3.current.rotation.x = -Math.PI / 8; // Opposite tilt
    }
  });

  return (
    <group>
      <Points ref={globeRef} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.04} 
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      
      <mesh ref={ringRef1}>
        <torusGeometry args={[4.2, 0.02, 4, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>
      
      <mesh ref={ringRef2}>
        <torusGeometry args={[4.8, 0.015, 4, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
      </mesh>
      
      <mesh ref={ringRef3}>
        <torusGeometry args={[5.4, 0.01, 4, 64]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.4} />
      </mesh>
      
      <Points positions={useMemo(() => {
        const positions = new Float32Array(400 * 3); 
        for (let i = 0; i < 400; i++) {
          const radius = 6 + Math.random() * 3;
          const phi = Math.random() * Math.PI * 2;
          const theta = Math.random() * Math.PI;
          
          positions[i * 3] = radius * Math.cos(phi) * Math.sin(theta);
          positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i * 3 + 2] = radius * Math.cos(theta);
        }
        return positions;
      }, [])} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ec4899"
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

const ContactGlobe = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.2} color="#1a1a2e" />
        <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.3} />
        
        <AnimatedGlobe />
      </Canvas>
    </div>
  );
};

export default ContactGlobe;
