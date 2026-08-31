import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import ProductModel from './ProductModel';
import Hotspots from './Hotspots';

export default function ProductScene({ scrollProgress = 0, activeHotspot = null, onHotspotClick, interactive = true, mouse = { x: 0, y: 0 }, style = {} }) {
  return (
    <div style={{ width: '100%', height: '100%', ...style }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.5} />
        <hemisphereLight args={['#ffffff', '#2d7aed', 0.9]} />
        <directionalLight position={[5, 6, 6]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-4, 3, 4]} intensity={1.3} color="#4a90f0" />
        <directionalLight position={[0, 0, -5]} intensity={1.0} color="#ffffff" />
        <spotLight position={[0, 5, 8]} intensity={2.0} angle={0.6} penumbra={1} color="#ffffff" />
        <pointLight position={[0, -2, 3]} intensity={0.8} color="#2d7aed" />

        {/* Soft radial backdrop so the product area is never pure black against the dark page */}
        <mesh position={[0, 0, -1.5]}>
          <planeGeometry args={[8, 8]} />
          <meshBasicMaterial color="#0f1622" transparent opacity={0.5} />
        </mesh>

        {/* Glowing pedestal under the product */}
        <mesh position={[0, -1.7, 0]}>
          <cylinderGeometry args={[1.6, 1.9, 0.12, 48]} />
          <meshStandardMaterial
            color="#1a2636"
            roughness={0.6}
            metalness={0.3}
            emissive="#2d7aed"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0, -1.6, 0.05]}>
          <ringGeometry args={[1.2, 1.5, 48]} />
          <meshBasicMaterial color="#2d7aed" transparent opacity={0.6} />
        </mesh>

        <Float
          speed={1}
          rotationIntensity={0}
          floatIntensity={0.4}
          floatingRange={[-0.06, 0.06]}
        >
          <ProductModel
            scrollProgress={scrollProgress}
            activeHotspot={activeHotspot}
            mouse={mouse}
          />
          {interactive && (
            <Hotspots
              activeHotspot={activeHotspot}
              onHotspotClick={onHotspotClick}
            />
          )}
        </Float>

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.35}
          scale={8}
          blur={2.5}
          far={4}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
