import useReveal from '../animations/useReveal';
import { productData } from '../data/product';

export default function Specifications() {
  const [ref1, vis1] = useReveal();
  const [ref2, vis2] = useReveal();

  return (
    <section style={{
      padding: 'var(--section-pad) 0',
      position: 'relative',
    }}>
      <div className="content-wrapper">
        <div ref={ref1} className={`reveal ${vis1 ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-label">SPECIFICATIONS</div>
          <h2 className="heading-lg">Designed down to the detail.</h2>
        </div>

        <div
          ref={ref2}
          className={`reveal specs-grid ${vis2 ? 'visible' : ''}`}
        >
          {/* Product image */}
          <div className="specs-image" data-tilt>
            <img
              src="/xoro1/product/img2.jpg"
              alt="PulseOne specifications"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              loading="lazy"
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(8,9,12,0.6), transparent 50%)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Specs */}
          <div>
            {productData.specs.map((spec) => (
              <div
                key={spec.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '24px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}>
                  {spec.label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                }}>
                  {spec.value}
                </span>
              </div>
            ))}

            {/* Additional note */}
            <p style={{
              marginTop: 32,
              fontSize: '0.78rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
            }}>
              Conceptual specifications for design demonstration purposes.
              PulseOne is a fictional product created for the XORO Story UI/UX Design Challenge.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .specs-image {
          position: relative;
          aspect-ratio: 3/4;
          border-radius: 8px;
          overflow: hidden;
          background: var(--color-bg-card);
        }
        @media (max-width: 900px) {
          .specs-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .specs-image {
            max-width: 420px;
            margin: 0 auto;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
