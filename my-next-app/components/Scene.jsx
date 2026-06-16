import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useRef } from 'react';

const AnimatedShape = () => {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 2;
    meshRef.current.rotation.y = Math.sin(t / 4) / 2;
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#4338ca"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const Scene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="indigo" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <AnimatedShape />
      </Canvas>
    </div>
  );
};

export default Scene;