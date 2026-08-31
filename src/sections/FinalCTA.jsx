import useReveal from '../animations/useReveal';
import { useDemoModal } from '../components/demoModalContext';

export default function FinalCTA() {
  const [ref1, vis1] = useReveal();
  const [ref2, vis2] = useReveal();
  const { open } = useDemoModal();

  return (
    <section style={{
      padding: 'var(--section-pad) 0',
      paddingBottom: 'calc(var(--section-pad) + 40px)',
      position: 'relative',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(to top, rgba(45, 122, 237, 0.03), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="content-wrapper">
        <div ref={ref1} className={`reveal ${vis1 ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-label">EXPERIENCE</div>
          <h2 className="heading-xl" style={{ marginBottom: 20 }}>
            See the technology.
          </h2>
          <h2 className="heading-xl" style={{
            color: 'var(--color-text-secondary)',
            marginBottom: 48,
          }}>
            Understand the experience.
          </h2>
          <p className="body-lg" style={{
            maxWidth: 500,
            margin: '0 auto 60px',
            fontSize: '1.15rem',
          }}>
            Experience PulseOne.
          </p>

          <div ref={ref2} className={`reveal ${vis2 ? 'visible' : ''}`} style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            <button
              data-ripple
              onClick={open}
              style={{
                padding: '16px 40px',
                background: 'var(--color-accent)',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                borderRadius: 4,
                transition: 'all 0.3s',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--color-accent-light)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--color-accent)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              REQUEST A DEMO
            </button>
            <button
              data-ripple
              style={{
                padding: '16px 40px',
                border: '1px solid var(--color-border-hover)',
                color: 'var(--color-text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                borderRadius: 4,
                transition: 'all 0.3s',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--color-accent)';
                e.target.style.color = 'var(--color-text)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--color-border-hover)';
                e.target.style.color = 'var(--color-text-secondary)';
              }}
            >
              EXPERIENCE IN AR
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 40,
          borderTop: '1px solid var(--color-border)',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}>
              NEXORA
            </div>
            <div style={{
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              marginTop: 4,
            }}>
              PULSEONE™
            </div>
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
          }}>
            Conceptual product demonstration. Not a real medical device.
          </div>
        </div>
      </div>
    </section>
  );
}
