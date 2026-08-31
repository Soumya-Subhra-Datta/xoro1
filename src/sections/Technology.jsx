import { useRef, useEffect } from 'react';
import useReveal from '../animations/useReveal';

function VideoBlock({ src, className }) {
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
    <div
      ref={containerRef}
      className={`media-block ${className || ''}`}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="media-block__video"
      />
      <div className="media-block__shade" aria-hidden="true" />
    </div>
  );
}

export default function Technology() {
  const [ref1, vis1] = useReveal();
  const [ref2, vis2] = useReveal();
  const [ref3, vis3] = useReveal(0.2);

  return (
    <section id="technology" style={{
      padding: 'var(--section-pad) 0',
      position: 'relative',
    }}>
      <div className="content-wrapper">
        <div ref={ref1} className={`reveal ${vis1 ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-label">TECHNOLOGY</div>
          <h2 className="heading-lg">Built for precision.</h2>
        </div>

        {/* Deliberate editorial grid: large left media + right column (media over text) */}
        <div className="tech-grid">
          <div ref={ref2} className={`reveal reveal-left tech-left ${vis2 ? 'visible' : ''}`}>
            <VideoBlock src="/xoro1/videos/medical technology laboratory 4k stock video.mp4" className="tech-media tech-media--large" />
          </div>

          <div ref={ref3} className={`reveal reveal-right tech-right ${vis3 ? 'visible' : ''}`}>
            <VideoBlock src="/xoro1/videos/medical laboratory close up 4k.mp4" className="tech-media tech-media--small" />
            <p className="body-lg" style={{ marginTop: 28 }}>
              Developed through rigorous research and precision engineering, PulseOne represents
              a new standard in connected health technology. Every component is designed to deliver
              reliability and accuracy.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .tech-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: clamp(24px, 3vw, 48px);
          align-items: start;
        }
        .tech-right {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .media-block {
          position: relative;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          background: var(--color-bg-card);
        }
        .media-block__video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .media-block__shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(8,9,12,0.4), rgba(8,9,12,0.6));
          pointer-events: none;
        }

        .tech-media--large {
          aspect-ratio: 4 / 3;
        }
        .tech-media--small {
          aspect-ratio: 16 / 9;
        }

        @media (max-width: 900px) {
          .tech-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
