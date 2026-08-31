import { useState, useCallback } from 'react';
import { DemoModalContext } from './demoModalContext';

export function DemoModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 300);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <DemoModalContext.Provider value={{ open, close }}>
      {children}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            padding: '20px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Request a demo"
        >
          <div style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            padding: '48px 40px',
            maxWidth: 420,
            width: '100%',
            position: 'relative',
          }}>
            <button
              onClick={close}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                color: 'var(--color-text-muted)',
                borderRadius: 4,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-text)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
            >
              ×
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'var(--color-accent-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <span style={{ color: 'var(--color-accent)', fontSize: '1.4rem' }}>✓</span>
                </div>
                <h3 className="heading-md" style={{ marginBottom: 8 }}>Request received</h3>
                <p className="body-sm">We'll be in touch shortly.</p>
              </div>
            ) : (
              <div>
                <h3 className="heading-md" style={{ marginBottom: 8 }}>Request a demo</h3>
                <p className="body-sm" style={{ marginBottom: 28 }}>
                  Enter your email and our team will reach out.
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 6,
                      color: 'var(--color-text)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                      marginBottom: 16,
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'var(--color-accent)',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      borderRadius: 6,
                      textTransform: 'uppercase',
                      transition: 'background 0.3s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--color-accent-light)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--color-accent)'}
                  >
                    SUBMIT REQUEST
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </DemoModalContext.Provider>
  );
}
