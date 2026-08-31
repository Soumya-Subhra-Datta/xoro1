import { useRef, useEffect } from 'react';
import useReveal from '../animations/useReveal';

export default function Future() {
  const [ref1, vis1] = useReveal();
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Full background video */}
      <video
        ref={videoRef}
        src="/xoro1/videos/futuristic healthcare technology stock video.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(8,9,12,0.7), rgba(8,9,12,0.85))',
      }} />

      <div ref={ref1} className={`content-wrapper reveal ${vis1 ? 'visible' : ''}`} style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        maxWidth: 700,
      }}>
        <div className="section-label">FUTURE EXPERIENCE</div>
        <h2 className="heading-xl" style={{ marginBottom: 28 }}>
          Technology should feel human.
        </h2>
        <p className="body-lg" style={{ maxWidth: 520, margin: '0 auto' }}>
          PulseOne brings complex technology into a simpler, more intuitive experience.
        </p>
      </div>
    </section>
  );
}
