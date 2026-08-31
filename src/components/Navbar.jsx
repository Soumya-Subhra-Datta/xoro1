import { useState, useEffect } from 'react';
import { useDemoModal } from './demoModalContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useDemoModal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Product', 'Technology', 'Experience'];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '0 var(--side-pad)',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled || menuOpen ? 'rgba(8, 9, 12, 0.9)' : 'transparent',
      backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
      borderBottom: scrolled || menuOpen ? '1px solid var(--color-border)' : '1px solid transparent',
      transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
    }}>
      <a
        href="#"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}
      >
        NEXORA
      </a>

      {/* Desktop nav */}
      <div className="desktop-nav" style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '2.75rem',
        alignItems: 'center',
        fontSize: '0.72rem',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>
        {links.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              color: 'var(--color-text-secondary)',
              transition: 'color 0.3s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-text)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <button
        className="desktop-cta"
        onClick={open}
        style={{
          padding: '10px 22px',
          border: '1px solid var(--color-border-hover)',
          borderRadius: '4px',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: 'var(--color-text)',
          transition: 'all 0.3s',
          background: 'transparent',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'var(--color-text)';
          e.target.style.color = 'var(--color-bg)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = 'var(--color-text)';
        }}
      >
        REQUEST DEMO
      </button>

      {/* Mobile hamburger */}
      <button
        className="mobile-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        style={{
          display: 'none',
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 5,
        }}
      >
        <span style={{
          width: 22,
          height: 1.5,
          background: 'var(--color-text)',
          transition: 'all 0.3s',
          transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
        }} />
        <span style={{
          width: 22,
          height: 1.5,
          background: 'var(--color-text)',
          transition: 'all 0.3s',
          opacity: menuOpen ? 0 : 1,
        }} />
        <span style={{
          width: 22,
          height: 1.5,
          background: 'var(--color-text)',
          transition: 'all 0.3s',
          transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
        }} />
      </button>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav,
          .desktop-cta {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }

        /* Mobile dropdown */
        ${menuOpen ? `
        .mobile-menu {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          background: rgba(8, 9, 12, 0.96);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--color-border);
          padding: 24px var(--side-pad);
          display: flex;
          flex-direction: column;
          gap: 20px;
          z-index: 999;
        }
        ` : ''}
      `}</style>

      {menuOpen && (
        <div className="mobile-menu">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
                padding: '8px 0',
              }}
            >
              {item}
            </a>
          ))}
          <button
            onClick={open}
            style={{
              padding: '12px 20px',
              border: '1px solid var(--color-border-hover)',
              borderRadius: 4,
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'var(--color-text)',
              background: 'transparent',
              marginTop: 8,
            }}
          >
            REQUEST DEMO
          </button>
        </div>
      )}
    </nav>
  );
}
