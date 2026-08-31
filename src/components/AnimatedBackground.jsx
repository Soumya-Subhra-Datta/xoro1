import { useEffect, useRef } from 'react';
import { animate, createTimeline, utils } from 'animejs';

/**
 * AnimatedBackground
 * A full-viewport, fixed canvas layer with a futuristic particle constellation
 * and a subtle perspective grid. Drifts continuously, reacts to mouse movement
 * (nodes repel/brighten near the cursor and a glow follows it) and responds to
 * scroll (gentle parallax drift).
 *
 * Rendered behind all page content (z-index 0) and ignores pointer events.
 * Respects prefers-reduced-motion by rendering a static, subdued field.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ACCENT = '45, 122, 237';
    const FADED = '90, 118, 160';

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles = [];
    let raf = 0;
    let mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    let scrollOffset = 0;

    const COLORS = [ACCENT, '120, 200, 255', '255, 255, 255', FADED];

    const rand = (min, max) => min + Math.random() * (max - min);

    const countForWidth = () => {
      if (w <= 480) return 46;
      if (w <= 768) return 68;
      if (w <= 1200) return 96;
      return 130;
    };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    }

    function spawn() {
      const count = countForWidth();
      particles = new Array(count).fill(null).map((_, i) => {
        const size = Math.random() < 0.18 ? rand(1.4, 2.4) : rand(0.5, 1.5);
        return {
          x: rand(0, w),
          y: rand(-h * 0.15, h * 1.15),
          vx: rand(-0.12, 0.12),
          vy: rand(-0.16, 0.16) - 0.06,
          r: size,
          baseR: size,
          opacity: rand(0.25, 0.85),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          phase: rand(0, Math.PI * 2),
          depth: rand(0.4, 1),
          seed: i,
        };
      });
    }

    // ---- anime.js: staggered entrance of the field ----
    if (!reduce) {
      // Fade/scale the whole background container in smoothly.
      canvas.style.opacity = '0';
      animate(canvas, {
        opacity: 1,
        duration: 1400,
        delay: 200,
        ease: 'outExpo',
      });
    } else {
      canvas.style.opacity = '1';
    }

    // ---- anime.js: looping scan glow that sweeps the canvas ----
    let scanTimeline;
    if (!reduce) {
      const scan = { progress: 0 };
      scanTimeline = createTimeline({ loop: true, autoplay: true });
      scanTimeline
        .add(scan, {
          progress: [0, 1],
          duration: 6000,
          ease: 'linear',
        })
        .add(scan, {
          progress: [1, 0],
          duration: 6000,
          ease: 'linear',
        });
      // Re-run the scan draw each frame via an anime "time" object isn't direct,
      // so the scan value is read inside the rAF draw loop below.
      scan.value = scan;
      window.__scan = scan;
    }

    function onMove(e) {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      if (!mouse.active) {
        mouse.active = true;
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    }
    function onTouch(e) {
      if (e.touches && e.touches[0]) {
        mouse.tx = e.touches[0].clientX;
        mouse.ty = e.touches[0].clientY;
        if (!mouse.active) {
          mouse.active = true;
          mouse.x = mouse.tx;
          mouse.y = mouse.ty;
        }
      }
    }
    function onLeave() {
      mouse.active = false;
      mouse.x = mouse.tx = -9999;
      mouse.y = mouse.ty = -9999;
    }
    function onScroll() {
      scrollOffset = window.scrollY || window.pageYOffset || 0;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    function drawGrid() {
      const spacing = 56;
      const horizon = h * 0.62;
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(45, 122, 237, 0.06)';
      // horizontal perspective lines below horizon
      for (let i = 0; i < 7; i++) {
        const t = (i + 1) / 8;
        const yy = horizon + (h - horizon) * t * t * 0.9;
        ctx.globalAlpha = 0.05 + (1 - t) * 0.12;
        ctx.beginPath();
        ctx.moveTo(0, yy + scrollOffset % 1);
        ctx.lineTo(w, yy);
        ctx.stroke();
      }
      // vertical lines converging to center
      for (let i = -8; i <= 8; i++) {
        const cx = w / 2;
        ctx.globalAlpha = 0.05;
        ctx.beginPath();
        ctx.moveTo(cx, horizon);
        ctx.lineTo(cx + i * spacing * 1.6, h);
        ctx.stroke();
      }
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Scroll parallax: drift whole field upward slightly as you scroll.
      const parallax = scrollOffset * 0.06;

      // ---- grid ----
      drawGrid();

      // ---- connection lines ----
      const linkDist = reduce ? 0 : 120;
      if (!reduce) {
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < linkDist) {
              const alpha = (1 - dist / linkDist) * 0.28;
              ctx.strokeStyle = `rgba(${ACCENT}, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y + parallax);
              ctx.lineTo(b.x, b.y + parallax);
              ctx.stroke();
            }
          }
        }
      }

      // ---- nodes ----
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let px = p.x;
        let py = p.y + parallax;

        if (!reduce) {
          // integrate velocity
          p.x += p.vx;
          p.y += p.vy;
          // gentle sine wobble
          p.x += Math.sin(p.phase) * 0.04;
          p.y += Math.cos(p.phase * 0.7) * 0.04;

          // soft drifting — animate individually by giving each its own phase rate
          p.phase += 0.004 * p.depth;

          // wrap edges
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -50) p.y = h + 50;
          if (p.y > h + 50) p.y = -50;

          // mouse interaction
          const mx = mouse.x;
          const my = mouse.y;
          if (p.active === undefined) p.active = 0;
          if (mouse.active) {
            const dx = px - mx;
            const dy = py - my;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 150) {
              const push = (1 - d / 150) * 0.35;
              p.x += (dx / (d || 1)) * push;
              p.y += (dy / (d || 1)) * push;
              p.active = utils.damp(p.active || 0, 1, 0.08);
            } else {
              p.active = utils.damp(p.active || 0, 0, 0.08);
            }
          } else {
            p.active = utils.damp(p.active || 0, 0, 0.08);
          }
          px = p.x;
          py = p.y + parallax;
        }

        // pulse radius
        const pulseR = reduce ? p.r : p.r + Math.sin(p.phase * 3) * 0.3;
        ctx.beginPath();
        ctx.arc(px, py, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${(p.opacity + p.active * 0.5).toFixed(3)})`;
        ctx.fill();
      }

      // ---- cursor glow ----
      if (mouse.active && !reduce) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        g.addColorStop(0, 'rgba(45, 122, 237, 0.10)');
        g.addColorStop(1, 'rgba(45, 122, 237, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 180, mouse.y - 180, 360, 360);
      }

      raf = requestAnimationFrame(draw);
    }

    // ---- start ----
    resize();
    if (reduce) {
      // static render only
      function staticDraw() {
        ctx.clearRect(0, 0, w, h);
        drawGrid();
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.opacity.toFixed(3)})`;
          ctx.fill();
        }
      }
      staticDraw();
      // still update on resize
      function staticResize() {
        resize();
        staticDraw();
      }
      window.addEventListener('resize', staticResize);
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('resize', staticResize);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onTouch);
        document.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('scroll', onScroll);
        if (scanTimeline) scanTimeline.pause();
        animate(canvas, { opacity: 0, duration: 0 });
      };
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      if (scanTimeline) scanTimeline.pause();
      animate(canvas, { opacity: 0, duration: 0 });
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="animated-bg"
        aria-hidden="true"
      />
      <style>{`
        .animated-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          display: block;
        }
      `}</style>
    </>
  );
}
