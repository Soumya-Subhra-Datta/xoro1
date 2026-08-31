import { useState } from 'react';
import useReveal from '../animations/useReveal';
import { productData } from '../data/product';

export default function ExplodedView() {
  const [isExploded, setIsExploded] = useState(false);
  const [activePart, setActivePart] = useState(null);
  const [ref1, vis1] = useReveal();
  const [ref2, vis2] = useReveal(0.2);

  const parts = productData.explodedParts;
  const spacing = isExploded ? 80 : 72;
  const active = parts.find((p) => p.id === activePart);

  const togglePart = (id) => setActivePart((prev) => (prev === id ? null : id));

  return (
    <section style={{
      padding: 'var(--section-pad) 0',
      position: 'relative',
    }}>
      <div className="content-wrapper">
        {/* Dedicated header row — owns its own horizontal space, never shares it with the nav */}
        <div ref={ref1} className={`reveal ${vis1 ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-label">ENGINEERING</div>
          <h2 className="heading-lg">Engineering beneath the surface.</h2>
        </div>

        <div
          ref={ref2}
          className={`reveal exploded-layout ${vis2 ? 'visible' : ''}`}
        >
          {/* Left rail — component navigation list */}
          <nav className="exploded-nav" aria-label="Product components">
            <div className="exploded-nav-label">05 COMPONENTS</div>
            {parts.map((part, i) => {
              const isActive = activePart === part.id;
              return (
                <button
                  key={part.id}
                  className={`exploded-nav-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => togglePart(part.id)}
                  aria-pressed={isActive}
                >
                  <span className="exploded-nav-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="exploded-nav-name">{part.label}</span>
                  <span className="exploded-nav-icon" aria-hidden="true">›</span>
                </button>
              );
            })}
          </nav>

          {/* Right — visualization + info */}
          <div className="exploded-stage">
            {/* Buttons */}
            <div className="exploded-actions">
              <button
                onClick={() => setIsExploded(true)}
                className={`exploded-btn ${isExploded ? 'is-primary' : ''}`}
              >
                EXPLORE COMPONENTS
              </button>
              <button
                onClick={() => { setIsExploded(false); setActivePart(null); }}
                className={isExploded ? 'exploded-btn' : 'exploded-btn is-primary'}
              >
                ASSEMBLE PRODUCT
              </button>
            </div>

            {/* Visualization */}
            <div className="exploded-visual">
              {parts.map((part, index) => {
                const isActive = activePart === part.id;
                const relY = isExploded ? (-150 + index * spacing) : (-150 + index * 80);
                const centerRel = -150 + 2 * (isExploded ? spacing : 80);
                const offset = relY - centerRel - 30;

                return (
                  <div
                    key={part.id}
                    onClick={() => togglePart(part.id)}
                    className={`exploded-part ${isActive ? 'is-active' : ''}`}
                    style={{
                      top: '50%',
                      transform: `translateX(-50%) translateY(${offset}px)`,
                      zIndex: isActive ? 10 : 1,
                    }}
                  >
                    <span className="exploded-part-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="exploded-part-label">
                      {part.label}
                    </span>
                  </div>
                );
              })}

              {/* Connecting spine when exploded */}
              {isExploded && (
                <div className="exploded-spine" aria-hidden="true" />
              )}
            </div>

            {/* Info panel */}
            <div className="exploded-info">
              <h3 className="heading-md" style={{ marginBottom: 12 }}>
                {active
                  ? active.label
                  : (isExploded ? 'Select a component' : 'Five integrated layers')}
              </h3>
              <p className="body-lg" style={{ maxWidth: 440 }}>
                {active
                  ? active.description
                  : (isExploded
                    ? 'Click any component in the navigation or the visualization to learn more about its engineering.'
                    : 'PulseOne integrates five core systems into a single, seamless form factor. Each component is precision-engineered to work in harmony.')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .exploded-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: clamp(40px, 5vw, 80px);
          align-items: start;
        }

        /* Left rail */
        .exploded-nav {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--color-border);
        }
        .exploded-nav-label {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          padding: 0 16px 12px;
        }
        .exploded-nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--color-border);
          background: transparent;
          text-align: left;
          transition: background 0.3s, border-color 0.3s;
          border-left: 2px solid transparent;
        }
        .exploded-nav-item:hover {
          background: var(--color-bg-card);
        }
        .exploded-nav-item.is-active {
          background: var(--color-accent-dim);
          border-left-color: var(--color-accent);
        }
        .exploded-nav-num {
          font-family: var(--font-display);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--color-text-muted);
          min-width: 18px;
          transition: color 0.3s;
        }
        .exploded-nav-item.is-active .exploded-nav-num {
          color: var(--color-accent);
        }
        .exploded-nav-name {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: color 0.3s;
        }
        .exploded-nav-item.is-active .exploded-nav-name {
          color: var(--color-text);
        }
        .exploded-nav-icon {
          margin-left: auto;
          color: var(--color-text-muted);
          font-size: 0.9rem;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.3s, transform 0.3s;
        }
        .exploded-nav-item.is-active .exploded-nav-icon {
          opacity: 1;
          transform: translateX(0);
          color: var(--color-accent);
        }

        /* Right stage */
        .exploded-stage {
          display: flex;
          flex-direction: column;
        }

        .exploded-actions {
          display: flex;
          gap: 12;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .exploded-btn {
          padding: 12px 24px;
          background: var(--color-surface);
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s;
        }
        .exploded-btn:hover {
          border-color: var(--color-accent);
          color: var(--color-text);
        }
        .exploded-btn.is-primary {
          background: var(--color-accent);
          color: #fff;
          border-color: var(--color-accent);
        }
        .exploded-btn.is-primary:hover {
          background: var(--color-accent-light);
          color: #fff;
        }

        .exploded-visual {
          position: relative;
          height: 420px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          overflow: hidden;
        }

        .exploded-part {
          position: absolute;
          width: 190px;
          height: 60px;
          left: 50%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 16px;
          background: var(--color-bg-elevated);
          border: 1px solid var(--color-border);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .exploded-part.is-active {
          background: linear-gradient(135deg, rgba(45, 122, 237, 0.15), rgba(45, 122, 237, 0.05));
          border-color: var(--color-accent);
        }
        .exploded-part-num {
          font-size: 0.6rem;
          font-weight: 600;
          color: var(--color-text-muted);
          letter-spacing: 0.1em;
        }
        .exploded-part-label {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--color-text-secondary);
        }
        .exploded-part.is-active .exploded-part-label {
          color: var(--color-accent);
        }

        .exploded-spine {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--color-accent), transparent);
          opacity: 0.2;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .exploded-info {
          margin-top: 28px;
        }

        @media (max-width: 900px) {
          .exploded-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .exploded-visual {
            height: 380px;
          }
        }
      `}</style>
    </section>
  );
}
