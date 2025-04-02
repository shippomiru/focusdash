import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Sphere, Box, useGLTF, Environment, ContactShadows, Effects } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Pet() {
  const ref = useRef();
  const particlesRef = useRef();
  
  // Create particles for the fur effect
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.random() * Math.PI;
      const r = 0.55;
      temp.push({
        x: r * Math.cos(t) * Math.sin(p),
        y: r * Math.sin(t) * Math.sin(p),
        z: r * Math.cos(p),
        scale: Math.random() * 0.3 + 0.1
      });
    }
    return temp;
  }, []);

  const { position, rotation } = useSpring({
    from: { position: [0, 0, 0], rotation: [0, 0, 0] },
    to: [
      { position: [0, 0.2, 0], rotation: [0, Math.PI / 8, 0] },
      { position: [0, 0, 0], rotation: [0, -Math.PI / 8, 0] }
    ],
    config: { mass: 1, tension: 180, friction: 12 },
    loop: true
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <animated.group ref={ref} position={position} rotation={rotation}>
      {/* Main body */}
      <Sphere args={[0.5, 64, 64]}>
        <meshPhysicalMaterial
          color="#f4a261"
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.1}
          roughness={0.4}
          emissive="#f4a261"
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Eyes */}
      <group position={[0, 0.1, 0.4]}>
        <Box args={[0.08, 0.12, 0.05]} position={[0.15, 0, 0]}>
          <meshStandardMaterial color="black" />
        </Box>
        <Box args={[0.08, 0.12, 0.05]} position={[-0.15, 0, 0]}>
          <meshStandardMaterial color="black" />
        </Box>
      </group>

      {/* Fur particles */}
      <group ref={particlesRef}>
        {particles.map((particle, i) => (
          <mesh key={i} position={[particle.x, particle.y, particle.z]}>
            <sphereGeometry args={[particle.scale / 8]} />
            <meshStandardMaterial
              color="#f4a261"
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
    </animated.group>
  );
}

export function Pet3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ height: '100%' }}
    >
      <color attach="background" args={['#f8f9fa']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[0, 5, 0]}
        intensity={0.8}
        angle={0.5}
        penumbra={1}
      />
      
      <Pet />
      
      <ContactShadows
        opacity={0.4}
        scale={5}
        blur={2.4}
        far={4}
        resolution={256}
      />
      
      <Environment preset="sunset" />
      
      <EffectComposer>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.025}
        />
      </EffectComposer>
    </Canvas>
  );
}