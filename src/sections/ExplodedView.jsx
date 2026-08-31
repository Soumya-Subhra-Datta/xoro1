import useReveal from '../animations/useReveal';

export default function ExplodedView() {
  const [ref1, vis1] = useReveal();
  const [ref2, vis2] = useReveal(0.15);

  return (
    <section data-slide="slideright" style={{
      padding: 'var(--section-pad) 0',
      position: 'relative',
    }}>
      <div className="content-wrapper">
        {/* Section heading — its own dedicated row */}
        <div ref={ref1} className={`reveal ${vis1 ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="section-label">ENGINEERING</div>
          <h2 className="heading-lg">Engineering beneath the surface.</h2>
        </div>

        {/* Nano image instead of component buttons */}
        <div ref={ref2} className={`reveal exploded-frame ${vis2 ? 'visible' : ''}`} data-tilt>
          <img
            className="exploded-img"
            src="/xoro1/nano.jpg"
            alt="PULSE ONE™ in a medical clinical environment"
            loading="lazy"
          />
        </div>
      </div>

      <style>{`
        .exploded-frame {
          position: relative;
          max-width: 960px;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--color-border);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
          background: var(--color-bg-elevated);
        }
        .exploded-img {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 1.5;
          object-fit: cover;
        }
      `}</style>
    </section>
  );
}
