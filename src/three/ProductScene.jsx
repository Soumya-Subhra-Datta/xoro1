import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
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
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-3, 3, 2]} intensity={0.4} color="#4a90f0" />
        <pointLight position={[0, -2, 3]} intensity={0.3} color="#2d7aed" />

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
          position={[0, -2, 0]}
          opacity={0.4}
          scale={8}
          blur={2.5}
          far={4}
          color="#000000"
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
