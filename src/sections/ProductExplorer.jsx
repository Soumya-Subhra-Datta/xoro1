import { useState, useCallback } from 'react';
import useReveal from '../animations/useReveal';
import ProductScene from '../three/ProductScene';
import { productData } from '../data/product';

export default function ProductExplorer() {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [ref1, vis1] = useReveal();

  const handleHotspotClick = useCallback((id) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
  }, []);

  const activeData = productData.hotspots.find((h) => h.id === activeHotspot);

  return (
    <section id="experience" style={{
      padding: 'var(--section-pad) 0',
      position: 'relative',
    }}>
      <div className="content-wrapper">
        <div ref={ref1} className={`reveal ${vis1 ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-label">INTERACTIVE EXPLORATION</div>
          <h2 className="heading-lg">Explore what's inside.</h2>
        </div>

        <div className="explorer-grid">
          {/* 3D View */}
          <div className="explorer-visual">
            <ProductScene
              activeHotspot={activeHotspot}
              onHotspotClick={handleHotspotClick}
              style={{ width: '100%', height: '100%' }}
            />

            {/* Instruction overlay */}
            {!activeHotspot && (
              <div style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.72rem',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                background: 'rgba(8,9,12,0.8)',
                borderRadius: 4,
                backdropFilter: 'blur(8px)',
              }}>
                Select a component to explore
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {productData.hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={() => handleHotspotClick(hotspot.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 20px',
                  background: activeHotspot === hotspot.id ? 'var(--color-accent-dim)' : 'var(--color-bg-elevated)',
                  border: `1px solid ${activeHotspot === hotspot.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 6,
                  textAlign: 'left',
                  transition: 'all 0.3s',
                  width: '100%',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: activeHotspot === hotspot.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  minWidth: 24,
                }}>
                  {String(hotspot.id).padStart(2, '0')}
                </span>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  color: activeHotspot === hotspot.id ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  textTransform: 'uppercase',
                }}>
                  {hotspot.label}
                </span>
              </button>
            ))}

            {/* Info panel */}
            {activeData && (
              <div style={{
                marginTop: 16,
                padding: 20,
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                borderRadius: 6,
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: 8,
                }}>
                  {activeData.title}
                </h4>
                <p className="body-sm" style={{ lineHeight: 1.7 }}>
                  {activeData.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .explorer-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 48px;
          align-items: start;
          min-height: 500px;
        }
        .explorer-visual {
          position: relative;
          height: 500px;
          background: var(--color-bg-elevated);
          border-radius: 8px;
          border: 1px solid var(--color-border);
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .explorer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .explorer-visual {
            height: 60vh;
            min-height: 400px;
          }
        }
      `}</style>
    </section>
  );
}
