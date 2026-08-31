import { Html } from '@react-three/drei';
import { productData } from '../data/product';

export default function Hotspots({ activeHotspot, onHotspotClick }) {
  return (
    <group>
      {productData.hotspots.map((hotspot) => {
        const isActive = activeHotspot === hotspot.id;
        return (
          <group key={hotspot.id} position={hotspot.position}>
            <Html center distanceFactor={5}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <button
                  type="button"
                  onClick={() => onHotspotClick?.(hotspot.id)}
                  aria-label={`Explore ${hotspot.title}`}
                  style={{
                    position: 'relative',
                    width: 14,
                    height: 14,
                    margin: 0,
                    padding: 0,
                    borderRadius: '50%',
                    background: isActive ? 'var(--color-accent)' : 'rgba(45, 122, 237, 0.55)',
                    border: '2px solid rgba(45, 122, 237, 0.9)',
                    boxShadow: isActive
                      ? '0 0 20px rgba(45, 122, 237, 0.8)'
                      : '0 0 12px rgba(45, 122, 237, 0.45)',
                    cursor: 'pointer',
                    animation: 'pulse 2s infinite',
                    transition: 'all 0.3s',
                    transform: isActive ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
                {isActive && (
                  <span style={{
                    fontSize: '0.55rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    background: 'rgba(8,9,12,0.85)',
                    padding: '4px 8px',
                    borderRadius: 3,
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(4px)',
                  }}>
                    {hotspot.label}
                  </span>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
