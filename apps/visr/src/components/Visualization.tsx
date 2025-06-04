import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Scene = ({ state }) => {
  const rectangleRef = useRef();

  useFrame(() => {
    if (rectangleRef.current) {
      rectangleRef.current.position.set(state.x.value, state.y.value, state.z.value);
    }
  });

  return (
    <>
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.01]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#888888" />
      </mesh>

      {/* Moving Rectangle */}
      <mesh ref={rectangleRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="#00ff00" transparent opacity={0.5} />
      </mesh>

      {/* Cylindrical Beam */}
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 10, 32]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Camera Controls */}
      <OrbitControls />
    </>
  );
};

export default function ThreeDVisualization({ state }: { state: any }) {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>

      <Scene state={state} />
    </Canvas>
  );
};

