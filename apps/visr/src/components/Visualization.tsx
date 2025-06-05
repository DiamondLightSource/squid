import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { StageState } from './StageState';

const Scene = ({ state }: { state: StageState }) => {
  const rectangleRef = useRef<any>(null);

  console.log("rendering scene");
  useFrame(() => {
    if (rectangleRef.current) {
      rectangleRef.current.position.set(state.x, state.y, state.z);
    }
  });
  const elevation = 10;

  return (
    <>
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.01]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#888888" />
      </mesh>

      {/* Moving Rectangle */}
      {/* <mesh ref={rectangleRef} position={[0, 0, 0]}> */}
      <mesh position={[0, elevation + state.y, 0.9 * state.x]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 10, 1]} />
        {/* <meshStandardMaterial color="#00ff00" transparent opacity={0.5} /> */}
        <meshStandardMaterial color="#00ff00" />
      </mesh>
      {/* Cylindrical Beam */}
      <mesh position={[0, elevation * 1.4, 5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1, 1, 50, 32]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Camera Controls */}
      <OrbitControls maxPolarAngle={Math.PI / 2 - 0.01} />
    </>
  );
};

type ThreeDVisualizationProps = {
  state: StageState;
};

export default function ThreeDVisualization({ state }: ThreeDVisualizationProps) {
  return (
    <div style={{ border: '2px solid blue', height: '200px' }}>
      <h3> below the canvas</h3>

      <Canvas camera={{ position: [150, 150, 15], fov: 20 }}>
        <Scene state={state} />
      </Canvas>
    </div>
  );
};

