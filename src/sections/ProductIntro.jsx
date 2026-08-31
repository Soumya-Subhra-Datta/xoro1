import useReveal from '../animations/useReveal';
import { productData } from '../data/product';

export default function ProductIntro() {
  const [ref1, vis1] = useReveal();
  const [ref2, vis2] = useReveal(0.2);

  return (
    <section style={{
      padding: 'var(--section-pad) 0',
      position: 'relative',
    }}>
      <div className="content-wrapper">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 100px)',
          alignItems: 'center',
        }}>
          {/* Text side */}
          <div ref={ref1} className={`reveal ${vis1 ? 'visible' : ''}`}>
            <div className="section-label">PRODUCT INTRODUCTION</div>
            <h2 className="heading-lg" style={{ marginBottom: 28 }}>
              {productData.intro.heading}
            </h2>
            <p className="body-lg" style={{ maxWidth: 480 }}>
              {productData.intro.body}
            </p>
          </div>

          {/* Image side */}
          <div
            ref={ref2}
            className={`reveal ${vis2 ? 'visible' : ''}`}
            style={{
              position: 'relative',
              borderRadius: 8,
              overflow: 'hidden',
              aspectRatio: '4/3',
              background: 'var(--color-bg-card)',
            }}
          >
            <img
              src="/xoro1/product/img1.jpg"
              alt="PulseOne device"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              loading="lazy"
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(8,9,12,0.3) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
