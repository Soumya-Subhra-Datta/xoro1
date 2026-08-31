import { useState, useEffect, useRef } from 'react';
import useReveal from '../animations/useReveal';
import { productData } from '../data/product';

function StepIndicator({ step, label, isActive }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      width: 96,
      flex: 1,
      padding: '0 4px',
    }}>
      <div className="step-indicator" style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isActive ? 'var(--color-accent)' : 'var(--color-surface)',
        border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: isActive ? '#fff' : 'var(--color-text-muted)',
        }}>
          {step}
        </span>
      </div>
      <span style={{
        fontSize: '0.68rem',
        fontWeight: 600,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
        transition: 'color 0.4s',
        textAlign: 'center',
        lineHeight: 1.4,
      }}>
        {label}
      </span>
    </div>
  );
}

function Connector({ isActive }) {
  return (
    <div className={`step-connector ${isActive ? 'is-active' : ''}`} />
  );
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [ref1, vis1] = useReveal();
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % productData.howItWorks.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} data-slide="split" style={{
      padding: 'var(--section-pad) 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background accent */}
      <div className="howitworks-accent" aria-hidden="true" />

      <div className="content-wrapper">
        <div ref={ref1} className={`reveal ${vis1 ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-label">HOW IT WORKS</div>
          <h2 className="heading-lg">From signal to insight.</h2>
        </div>

        {/* Step visualization */}
        <div className="step-track">
          {productData.howItWorks.map((item, index) => (
            <div key={item.step} className="step-item">
              <StepIndicator
                step={item.step}
                label={item.label}
                isActive={index <= activeStep}
              />
              {index < productData.howItWorks.length - 1 && (
                <Connector isActive={index < activeStep} />
              )}
            </div>
          ))}
        </div>

        {/* Active step detail */}
        <div style={{
          maxWidth: 600,
          margin: '0 auto',
          textAlign: 'center',
          minHeight: 120,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 16,
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3rem',
              fontWeight: 700,
              color: 'var(--color-accent)',
              opacity: 0.3,
              lineHeight: 1,
            }}>
              {String(activeStep + 1).padStart(2, '0')}
            </span>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}>
              {productData.howItWorks[activeStep].label}
            </h3>
          </div>
          <p className="body-lg" style={{ maxWidth: 500, margin: '0 auto' }}>
            {productData.howItWorks[activeStep].description}
          </p>
        </div>

        {/* Step dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginTop: 48,
        }}>
          {productData.howItWorks.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              aria-label={`Go to step ${index + 1}`}
              style={{
                width: activeStep === index ? 24 : 6,
                height: 6,
                borderRadius: 3,
                background: activeStep === index ? 'var(--color-accent)' : 'var(--color-surface)',
                border: 'none',
                transition: 'all 0.4s',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .howitworks-accent {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(600px, 100vw);
          height: min(600px, 100vw);
          max-width: 600px;
          max-height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(45, 122, 237, 0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .step-track {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          margin-bottom: 80px;
          width: 100%;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }
        .step-item {
          display: flex;
          align-items: flex-start;
          flex: 1;
          min-width: 0;
        }
        .step-connector {
          flex: 1;
          align-self: flex-start;
          height: 1px;
          margin-top: 24px;
          background: var(--color-border);
          transition: background 0.6s;
        }
        .step-connector.is-active {
          background: var(--color-accent);
        }
        @media (max-width: 768px) {
          .step-track {
            margin-bottom: 60px;
            max-width: 520px;
          }
          .step-item {
            align-items: center;
          }
          .step-item .step-indicator {
            width: 40px;
            height: 40px;
          }
          .step-item .step-indicator span {
            font-size: 0.7rem;
          }
          .step-connector {
            margin-top: 20px;
          }
        }
      `}</style>
    </section>
  );
}
