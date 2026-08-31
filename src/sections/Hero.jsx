import { useEffect, useState } from 'react';
import ProductScene from '../three/ProductScene';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      id="product"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, rgba(45, 122, 237, 0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="content-wrapper" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
        paddingTop: 100,
      }}>
        <div className="hero-grid">
          {/* Left: Text */}
          <div>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: 24,
            }}>
              NEXORA
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 5.5vw, 5rem)',
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              marginBottom: 20,
            }}>
              PULSE<br />ONE<span style={{ color: 'var(--color-accent)' }}>™</span>
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
              maxWidth: 420,
              marginBottom: 12,
            }}>
              The future of connected diagnostics.
            </p>
            <p style={{
              fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              maxWidth: 380,
              marginBottom: 48,
            }}>
              Precision technology designed around the way people live, work and care.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#experience" style={{
                padding: '14px 32px',
                background: 'var(--color-text)',
                color: 'var(--color-bg)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                borderRadius: 4,
                transition: 'all 0.3s',
                textTransform: 'uppercase',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--color-accent)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--color-text)';
                e.target.style.transform = 'translateY(0)';
              }}
              >
                EXPLORE PULSEONE
              </a>
              <a href="#technology" style={{
                padding: '14px 32px',
                border: '1px solid var(--color-border-hover)',
                color: 'var(--color-text-secondary)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                borderRadius: 4,
                transition: 'all 0.3s',
                textTransform: 'uppercase',
                display: 'inline-block',
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
                DISCOVER THE TECHNOLOGY
              </a>
            </div>
          </div>

          {/* Right: 3D Product */}
          <div className="hero-visual">
            <ProductScene
              style={{ width: '100%', height: '100%' }}
              mouse={mousePos}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        zIndex: 2,
      }}>
        <div style={{
          width: 1,
          height: 40,
          background: 'linear-gradient(to bottom, var(--color-text-muted), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.2); }
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
          min-height: calc(100vh - 100px);
        }
        .hero-visual {
          height: 70vh;
          min-height: 500px;
          position: relative;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            min-height: auto;
            padding-top: 80px;
            padding-bottom: 60px;
          }
          .hero-visual {
            height: 60vh;
            min-height: 380px;
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
