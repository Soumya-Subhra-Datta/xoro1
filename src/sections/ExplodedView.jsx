import { useState } from 'react';
import useReveal from '../animations/useReveal';
import { productData } from '../data/product';

export default function ExplodedView() {
  const [isExploded, setIsExploded] = useState(false);
  const [activePart, setActivePart] = useState(null);
  const [ref1, vis1] = useReveal();

  const parts = productData.explodedParts;
  const spacing = isExploded ? 100 : 16;

  return (
    <section style={{
      padding: 'var(--section-pad) 0',
      position: 'relative',
    }}>
      <div className="content-wrapper">
        <div ref={ref1} className={`reveal ${vis1 ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-label">ENGINEERING</div>
          <h2 className="heading-lg">Engineering beneath the surface.</h2>
        </div>

        <div className="exploded-grid">
          {/* Exploded visualization */}
          <div className="exploded-visual">
            <div style={{ position: 'relative', width: 200, height: 400 }}>
              {parts.map((part, index) => {
                const isActive = activePart === part.id;
                const baseY = -150 + index * 80;
                const explodedY = -180 + index * spacing;

                return (
                  <div
                    key={part.id}
                    onClick={() => setActivePart(isActive ? null : part.id)}
                    style={{
                      position: 'absolute',
                      width: 180,
                      height: isExploded ? 60 : 65,
                      left: '50%',
                      transform: `translateX(-50%) translateY(${isExploded ? explodedY : baseY}px)`,
                      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: `${index * 0.05}s`,
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(45, 122, 237, 0.15), rgba(45, 122, 237, 0.05))'
                        : 'var(--color-bg-card)',
                      border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      borderRadius: 6,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      padding: '0 16px',
                      zIndex: isActive ? 10 : 1,
                    }}
                  >
                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.1em',
                    }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    }}>
                      {part.label}
                    </span>
                  </div>
                );
              })}

              {/* Connecting lines when exploded */}
              {isExploded && (
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: 1,
                  background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)',
                  opacity: 0.2,
                  transform: 'translateX(-50%)',
                  pointerEvents: 'none',
                }} />
              )}
            </div>
          </div>

          {/* Info panel */}
          <div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
              <button
                onClick={() => setIsExploded(true)}
                style={{
                  padding: '12px 24px',
                  background: isExploded ? 'var(--color-accent)' : 'var(--color-surface)',
                  color: isExploded ? '#fff' : 'var(--color-text-secondary)',
                  border: `1px solid ${isExploded ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 4,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s',
                }}
              >
                EXPLORE COMPONENTS
              </button>
              <button
                onClick={() => { setIsExploded(false); setActivePart(null); }}
                style={{
                  padding: '12px 24px',
                  background: !isExploded ? 'var(--color-surface)' : 'transparent',
                  color: 'var(--color-text-secondary)',
                  border: `1px solid var(--color-border)`,
                  borderRadius: 4,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s',
                }}
              >
                ASSEMBLE PRODUCT
              </button>
            </div>

            {activePart ? (
              <div>
                <h3 className="heading-md" style={{ marginBottom: 12 }}>
                  {parts.find((p) => p.id === activePart)?.label}
                </h3>
                <p className="body-lg" style={{ maxWidth: 400 }}>
                  {parts.find((p) => p.id === activePart)?.description}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="heading-md" style={{ marginBottom: 12 }}>
                  {isExploded ? 'Select a component' : 'Five integrated layers'}
                </h3>
                <p className="body-lg" style={{ maxWidth: 400 }}>
                  {isExploded
                    ? 'Click any component to learn more about its engineering.'
                    : 'PulseOne integrates five core systems into a single, seamless form factor. Each component is precision-engineered to work in harmony.'}
                </p>
              </div>
            )}

            {/* Parts list */}
            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {parts.map((part, i) => (
                <div
                  key={part.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 0',
                    borderBottom: '1px solid var(--color-border)',
                    opacity: activePart && activePart !== part.id ? 0.4 : 1,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    color: activePart === part.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    letterSpacing: '0.08em',
                    minWidth: 20,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: activePart === part.id ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  }}>
                    {part.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .exploded-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          min-height: 500px;
        }
        .exploded-visual {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .exploded-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .exploded-visual {
            height: 420px;
          }
        }
      `}</style>
    </section>
  );
}
