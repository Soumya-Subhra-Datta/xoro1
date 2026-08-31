import { useEffect, useRef } from 'react';

export default function LoadingScreen({ progress }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = `${Math.min(progress, 100)}%`;
    }
  }, [progress]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '48px',
      opacity: progress >= 100 ? 0 : 1,
      transition: 'opacity 0.4s ease',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.3rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
      }}>
        NEXORA
      </div>
      <div style={{ width: 200, height: 1, background: 'var(--color-surface)', borderRadius: 1, overflow: 'hidden' }}>
        <div
          ref={barRef}
          style={{
            height: '100%',
            background: 'var(--color-text)',
            transition: 'width 0.1s linear',
            borderRadius: 1,
          }}
        />
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.7rem',
        letterSpacing: '0.15em',
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
      }}>
        {progress >= 100 ? 'PULSEONE™' : 'Loading experience'}
      </div>
    </div>
  );
}
