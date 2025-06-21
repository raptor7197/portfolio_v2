
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MatrixRain() {
  const groupRef = useRef<THREE.Group>(null);
  
  const streams = useMemo(() => {
    const streamCount = 60;
    const streams = [];
    
    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: (Math.random() - 0.5) * 200,
        characters: Array.from({ length: 20 }, (_, j) => ({
          char: String.fromCharCode(0x30A0 + Math.random() * 96),
          y: Math.random() * 100 + 50,
          opacity: Math.max(0.1, 1 - j * 0.1),
          speed: 0.5 + Math.random() * 1
        }))
      });
    }
    
    return streams;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      streams.forEach((stream, streamIndex) => {
        stream.characters.forEach((char, charIndex) => {
          char.y -= char.speed;
          
          // Reset character when it goes off screen
          if (char.y < -50) {
            char.y = 50 + Math.random() * 20;
            char.char = String.fromCharCode(0x30A0 + Math.random() * 96);
          }
          
          const meshIndex = streamIndex * 20 + charIndex;
          const mesh = groupRef.current?.children[meshIndex] as THREE.Mesh;
          
          if (mesh) {
            mesh.position.set(stream.x, char.y, -20 + Math.random() * 40);
            const material = mesh.material as THREE.MeshBasicMaterial;
            material.opacity = char.opacity * (0.3 + Math.sin(Date.now() * 0.001 + charIndex) * 0.2);
          }
        });
      });
    }
  });

  return (
    <group ref={groupRef}>
      {streams.map((stream, streamIndex) =>
        stream.characters.map((char, charIndex) => (
          <mesh
            key={`${streamIndex}-${charIndex}`}
            position={[stream.x, char.y, -20]}
          >
            <planeGeometry args={[1.5, 2]} />
            <meshBasicMaterial
              color="#00ff41"
              transparent
              opacity={char.opacity}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

function StarField() {
  const meshRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={meshRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={1}
      />
    </Points>
  );
}

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <ambientLight intensity={0.1} color="#001100" />
        <pointLight position={[20, 20, 20]} color="#00ff41" intensity={0.6} />
        
        <StarField />
        <MatrixRain />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-green-900/20 to-black/90 pointer-events-none" />
    </div>
  );
};

export default ThreeBackground;
