import { useState } from 'react';
import useReveal from '../animations/useReveal';
import { productData } from '../data/product';

export default function Context() {
  const [activeContext, setActiveContext] = useState(0);
  const [ref1, vis1] = useReveal();

  const contexts = productData.contexts;
  const active = contexts[activeContext];

  return (
    <section style={{
      padding: 'var(--section-pad) 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="content-wrapper">
        <div ref={ref1} className={`reveal ${vis1 ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-label">REAL-WORLD CONTEXT</div>
          <h2 className="heading-lg">Designed for real environments.</h2>
        </div>

        {/* Segmented control */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 48,
        }}>
          <div style={{
            display: 'flex',
            background: 'var(--color-bg-elevated)',
            borderRadius: 6,
            border: '1px solid var(--color-border)',
            padding: 4,
          }}>
            {contexts.map((ctx, index) => (
              <button
                key={ctx.id}
                onClick={() => setActiveContext(index)}
                style={{
                  padding: '10px 28px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: 4,
                  transition: 'all 0.3s',
                  background: activeContext === index ? 'var(--color-accent)' : 'transparent',
                  color: activeContext === index ? '#fff' : 'var(--color-text-muted)',
                }}
              >
                {ctx.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="context-grid">
          {/* Image */}
          <div className="context-image">
            <img
              src={active.image}
              alt={`${active.label} environment`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.5s',
              }}
              loading="lazy"
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(8,9,12,0.2), rgba(8,9,12,0.4))',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Info */}
          <div>
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 16,
            }}>
              {active.label}
            </div>
            <h3 className="heading-md" style={{ marginBottom: 20 }}>
              {active.label === 'HOME' && 'Personal wellness, simplified.'}
              {active.label === 'CLINICAL' && 'Professional-grade accuracy.'}
              {active.label === 'PROFESSIONAL' && 'Enterprise-ready deployment.'}
            </h3>
            <p className="body-lg">
              {active.description}
            </p>

            {/* Context-specific features */}
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {active.label === 'HOME' && [
                'Daily wellness tracking',
                'Family sharing',
                'Intuitive interface',
              ].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{f}</span>
                </div>
              ))}
              {active.label === 'CLINICAL' && [
                'FDA-cleared pathway',
                'EHR integration',
                'Multi-patient monitoring',
              ].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{f}</span>
                </div>
              ))}
              {active.label === 'PROFESSIONAL' && [
                'Centralized dashboard',
                'Compliance reporting',
                'Scalable deployment',
              ].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .context-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          min-height: 400px;
        }
        .context-image {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 16/10;
          background: var(--color-bg-card);
        }
        @media (max-width: 900px) {
          .context-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
