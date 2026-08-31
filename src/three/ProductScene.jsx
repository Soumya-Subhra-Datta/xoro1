import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float, Lightformer } from '@react-three/drei';
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
        <ambientLight intensity={1.1} />
        <hemisphereLight args={['#ffffff', '#2d7aed', 0.7]} />
        <directionalLight position={[5, 6, 6]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-4, 3, 4]} intensity={1.1} color="#4a90f0" />
        <directionalLight position={[0, 0, -5]} intensity={0.8} color="#ffffff" />
        <spotLight position={[0, 5, 8]} intensity={1.6} angle={0.6} penumbra={1} color="#ffffff" />
        <pointLight position={[0, -2, 3]} intensity={0.6} color="#2d7aed" />

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
          opacity={0.35}
          scale={8}
          blur={2.5}
          far={4}
          color="#000000"
        />

        <Environment resolution={256}>
          <group rotation={[0, Math.PI / 4, 0]}>
            <Lightformer form="rect" intensity={4} position={[0, 2, 4]} scale={[4, 2, 1]} color="#ffffff" />
            <Lightformer form="rect" intensity={2} position={[-4, 0, 2]} scale={[2, 3, 1]} color="#4a90f0" />
            <Lightformer form="rect" intensity={2} position={[4, 0, 2]} scale={[2, 3, 1]} color="#2d7aed" />
            <Lightformer form="rect" intensity={1.2} position={[0, -2, 4]} scale={[3, 1, 1]} color="#ffffff" />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
}
