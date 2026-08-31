import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ProductModel({ mouse = { x: 0, y: 0 } }) {
  const groupRef = useRef();
  const displayRef = useRef();
  const sensorRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const baseRotY = Math.sin(t * 0.3) * 0.12;
    const mouseRotY = mouse.x * 0.08;
    const mouseRotX = mouse.y * 0.05;
    groupRef.current.rotation.y = baseRotY + mouseRotY;
    groupRef.current.rotation.x = mouseRotX;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.03;
  });

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 3.2, 0.5, 4, 4, 4]} />
        <meshPhysicalMaterial
          color="#7d8899"
          roughness={0.45}
          metalness={0.15}
          clearcoat={0.7}
          clearcoatRoughness={0.35}
          emissive="#2a3a55"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Screen / Display */}
      <mesh ref={displayRef} position={[0, 0.15, 0.26]}>
        <boxGeometry args={[1.8, 2.2, 0.02]} />
        <meshPhysicalMaterial
          color="#1c3a66"
          roughness={0.05}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive="#1a3a6b"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Screen content - simulated UI */}
      <mesh position={[0, 0.4, 0.28]}>
        <planeGeometry args={[1.5, 0.6]} />
        <meshBasicMaterial color="#1a2744" transparent opacity={0.8} />
      </mesh>

      {/* Heart rate display */}
      <mesh position={[0, 0.4, 0.285]}>
        <planeGeometry args={[1.2, 0.08]} />
        <meshBasicMaterial color="#2d7aed" transparent opacity={0.6} />
      </mesh>

      {/* Pulse wave */}
      <mesh position={[0, 0.2, 0.285]}>
        <planeGeometry args={[1.4, 0.15]} />
        <meshBasicMaterial color="#0d2240" transparent opacity={0.5} />
      </mesh>

      {/* Sensor strip at bottom */}
      <mesh ref={sensorRef} position={[0, -1.2, 0.2]}>
        <boxGeometry args={[1.6, 0.35, 0.08]} />
        <meshPhysicalMaterial
          color="#2b3442"
          roughness={0.4}
          metalness={0.35}
          emissive="#1b2433"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Sensor dots */}
      {[0, 0.3, 0.6].map((x, i) => (
        <mesh key={i} position={[x - 0.3, -1.2, 0.26]}>
          <circleGeometry args={[0.06, 16]} />
          <meshBasicMaterial color="#2d7aed" transparent opacity={0.7} />
        </mesh>
      ))}

      {/* Camera / sensor lens */}
      <mesh position={[0, 1.35, 0.26]}>
        <circleGeometry args={[0.08, 24]} />
        <meshPhysicalMaterial
          color="#2a3442"
          roughness={0.15}
          metalness={0.4}
          clearcoat={1}
          emissive="#1a2433"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Side accent line */}
      <mesh position={[1.12, 0, 0]}>
        <boxGeometry args={[0.02, 2.8, 0.4]} />
        <meshStandardMaterial color="#2d7aed" emissive="#2d7aed" emissiveIntensity={0.9} />
      </mesh>

      {/* Power button */}
      <mesh position={[1.13, 0.6, 0]}>
        <boxGeometry args={[0.03, 0.4, 0.06]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Corner accents */}
      {[[-0.95, 1.45], [0.95, 1.45], [-0.95, -1.45], [0.95, -1.45]].map(([x, y], i) => (
        <mesh key={`corner-${i}`} position={[x, y, 0.26]}>
          <ringGeometry args={[0.04, 0.06, 16]} />
          <meshBasicMaterial color="#2d7aed" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* NEXORA branding on top */}
      <mesh position={[0, 1.15, 0.26]}>
        <planeGeometry args={[0.4, 0.06]} />
        <meshBasicMaterial color="#333" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
