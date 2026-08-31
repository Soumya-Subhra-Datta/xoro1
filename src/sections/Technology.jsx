import { useRef, useEffect } from 'react';
import useReveal from '../animations/useReveal';

function VideoBlock({ src }) {
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
    <div ref={containerRef} style={{
      position: 'relative',
      borderRadius: 8,
      overflow: 'hidden',
      background: 'var(--color-bg-card)',
    }}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(8,9,12,0.4), rgba(8,9,12,0.6))',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

export default function Technology() {
  const [ref1, vis1] = useReveal();
  const [ref2, vis2] = useReveal();

  return (
    <section id="technology" style={{
      padding: 'var(--section-pad) 0',
      position: 'relative',
    }}>
      <div className="content-wrapper">
        <div ref={ref1} className={`reveal ${vis1 ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-label">TECHNOLOGY</div>
          <h2 className="heading-lg">Built for precision.</h2>
        </div>

        <div
          ref={ref2}
          className={`reveal tech-grid ${vis2 ? 'visible' : ''}`}
        >
          <div className="tech-video">
            <VideoBlock
              src="/xoro1/videos/medical technology laboratory 4k stock video.mp4"
              alt="Medical technology laboratory"
            />
          </div>
          <div className="tech-video">
            <VideoBlock
              src="/xoro1/videos/medical laboratory close up 4k.mp4"
              alt="Medical laboratory close-up"
            />
          </div>
        </div>

        <div style={{
          maxWidth: 600,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <p className="body-lg">
            Developed through rigorous research and precision engineering, PulseOne represents
            a new standard in connected health technology. Every component is designed to deliver
            reliability and accuracy.
          </p>
        </div>
      </div>

      <style>{`
        .tech-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 60px;
        }
        .tech-video {
          height: 400px;
        }
        @media (max-width: 900px) {
          .tech-grid {
            grid-template-columns: 1fr;
          }
          .tech-video {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
