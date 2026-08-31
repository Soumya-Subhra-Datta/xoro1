import { useEffect } from 'react';
import { animate, stagger, utils } from 'animejs';

/**
 * anime.js powered interactions shared across the app.
 *
 * [data-reveal]      scroll into view -> fades/slides the element (stagger children of [data-reveal-grid])
 * [data-tilt]        mouse move -> 3D perspective tilt; leave -> reset
 * [data-hover-glow]  hover -> lift + glow (for buttons / cards / links)
 */

let revealObserver = null;

// ---------- Focus a section heading into view ----------
function revealTarget(el, onDone) {
  if (el.dataset.done === '1') return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.transition = 'none';
    el.dataset.done = '1';
    if (onDone) onDone();
    return;
  }

  const items = el.querySelectorAll('[data-reveal-item]');
  const staggeredGrandChildren = el.querySelectorAll('[data-reveal-grid] > *');

  if (staggeredGrandChildren.length) {
    animate(staggeredGrandChildren, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 900,
      delay: stagger(60),
      ease: 'outExpo',
      complete: onDone,
    });
  } else if (items.length) {
    animate(items, {
      opacity: [0, 1],
      translateY: [26, 0],
      duration: 900,
      delay: stagger(70),
      ease: 'outExpo',
      complete: onDone,
    });
  } else {
    animate(el, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 900,
      ease: 'outExpo',
      complete: onDone,
    });
  }
}

function initReveals(scope = document) {
  const els = scope.querySelectorAll('[data-reveal]');
  els.forEach((el) => {
    if (el.dataset.revealBound === '1') return;
    el.dataset.revealBound = '1';
    if (!el.dataset.done) {
      el.dataset.notDone = '1';
      // hide immediately unless reduced motion
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const targets = el.querySelectorAll('[data-reveal-item]');
        if (targets.length) {
          targets.forEach((t) => {
            t.style.opacity = '0';
            t.style.transform = 'translateY(26px)';
          });
        } else if (el.querySelectorAll('[data-reveal-grid]').length) {
          el.querySelectorAll('[data-reveal-grid] > *').forEach((c) => {
            c.style.opacity = '0';
            c.style.transform = 'translateY(24px)';
          });
        } else {
          el.style.opacity = '0';
          el.style.transform = 'translateY(24px)';
        }
      }
    }
  });

  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target;
          revealTarget(el, () => {
            el.dataset.done = '1';
            delete el.dataset.notDone;
            revealObserver.unobserve(el);
          });
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => revealObserver.observe(el));
}

// ---------- 3D tilt on hover ----------
function initTilt(scope = document) {
  const els = scope.querySelectorAll('[data-tilt]');
  els.forEach((el) => {
    if (el.dataset.tiltBound === '1') return;
    el.dataset.tiltBound = '1';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const max = parseFloat(el.dataset.tilt || '8');
    const enter = () => {};
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`;
      el.style.transition = 'transform 0.1s ease-out';
      // shine position
      const shine = el.querySelector('[data-tilt-shine]');
      if (shine) {
        shine.style.background = `radial-gradient(360px circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.10), transparent 60%)`;
      }
    };
    const leave = () => {
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      const shine = el.querySelector('[data-tilt-shine]');
      if (shine) shine.style.background = 'transparent';
    };
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mousemove', move, { passive: true });
    el.addEventListener('mouseleave', leave);
    el._animeTilt = { enter, move, leave };
    el._animeTiltHandlerAdded = true;
  });
}

// ---------- generic hover glow / lift ----------
function initHover(scope = document) {
  const els = scope.querySelectorAll('[data-hover-glow]');
  els.forEach((el) => {
    if (el.dataset.hoverBound === '1') return;
    el.dataset.hoverBound = '1';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dims = () => ({ w: el.offsetWidth, h: el.offsetHeight });
    const enter = () => {
      el.style.position = 'relative';
      el.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = 'translateY(-3px)';
      const c = el.querySelector('[data-hover-glow-fill]');
      if (c) {
        const { w, h } = dims();
        c.style.opacity = '1';
        c.style.left = '50%';
        c.style.top = '50%';
        c.style.width = w * 1.6 + 'px';
        c.style.height = h * 1.6 + 'px';
      }
    };
    const move = (e) => {
      const c = el.querySelector('[data-hover-glow-fill]');
      if (c) {
        const r = el.getBoundingClientRect();
        c.style.left = (e.clientX - r.left) + 'px';
        c.style.top = (e.clientY - r.top) + 'px';
      }
    };
    const leave = () => {
      el.style.transform = 'translateY(0)';
      const c = el.querySelector('[data-hover-glow-fill]');
      if (c) c.style.opacity = '0';
    };
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mousemove', move, { passive: true });
    el.addEventListener('mouseleave', leave);
  });
}

// ---------- click pulse on buttons ----------
function initClickPulse(scope = document) {
  scope.querySelectorAll('[data-ripple]').forEach((el) => {
    if (el.dataset.rippleBound === '1') return;
    el.dataset.rippleBound = '1';
    el.addEventListener('click', (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const size = Math.max(r.width, r.height) * 0.5;
      const span = document.createElement('span');
      span.className = 'ripple-ink';
      span.style.width = span.style.height = size + 'px';
      span.style.left = x - size / 2 + 'px';
      span.style.top = y - size / 2 + 'px';
      el.appendChild(span);
      animate(span, {
        scale: [0, 2.4],
        opacity: [0.5, 0],
        duration: 700,
        ease: 'outQuad',
        complete: () => span.remove(),
      });
    });
  });
}

// ---------- per-section distinct slide-deck animations ----------
// Each [data-slide="VAR"] section plays a different entrance animation.
// Variants: slideup | pop | split | slideright | flipx | zoom | clip | rolldown
const SECTION_VARIANTS = {
  slideup(el) {
    el.style.transform = 'translateY(90px)';
    el.style.opacity = '0';
    return { opacity: [0, 1], translateY: [90, 0], scale: [0.99, 1], duration: 1000, ease: 'outCubic' };
  },
  pop(el) {
    el.style.transform = 'scale(0.92)';
    el.style.opacity = '0';
    return { opacity: [0, 1], scale: [0.92, 1], translateY: [30, 0], duration: 800, ease: 'outBack' };
  },
  slideright(el) {
    el.style.transform = 'translateX(-110px)';
    el.style.opacity = '0';
    return { opacity: [0, 1], translateX: [-110, 0], duration: 950, ease: 'outCubic' };
  },
  flipx(el) {
    el.style.transform = 'perspective(1400px) rotateX(-18deg)';
    el.style.opacity = '0';
    return { opacity: [0, 1], rotateX: [-18, 0], duration: 1000, ease: 'outExpo' };
  },
  zoom(el) {
    el.style.transform = 'scale(0.86)';
    el.style.opacity = '0';
    return { opacity: [0, 1], scale: [0.86, 1], duration: 1100, ease: 'outExpo' };
  },
  clip(el) {
    el.style.transform = 'none';
    el.style.opacity = '1';
    el.style.clipPath = 'inset(0 0 100% 0)';
    return {
      clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'],
      translateY: [40, 0],
      duration: 1000,
      ease: 'outCubic',
      complete: () => { el.style.clipPath = ''; },
    };
  },
  rolldown(el) {
    el.style.transform = 'translateY(-90px)';
    el.style.opacity = '0';
    return { opacity: [0, 1], translateY: [-90, 0], duration: 950, ease: 'outCubic' };
  },
  wipeup(el) {
    el.style.transform = 'none';
    el.style.opacity = '1';
    el.style.clipPath = 'inset(100% 0 0 0)';
    return {
      clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
      translateY: [60, 0],
      duration: 1000,
      ease: 'outCubic',
      complete: () => { el.style.clipPath = ''; },
    };
  },
  // "two slides joining into one page": sibling columns converge from left/right
  split(el) {
    const cols = Array.from(el.children).filter((c) => c.childElementCount > 0);
    const targets = cols.length > 1 ? cols.slice(0, 2) : [el];
    targets.forEach((c, i) => {
      if (c === el) return;
      const dir = i % 2 === 0 ? -1 : 1;
      c.style.transform = `translateX(${dir * 90}px)`;
      c.style.opacity = '0';
    });
    el.style.opacity = '1';
    return {
      opacity: [el === targets[0] ? 0 : 1, 1],
      translateX: 0,
      duration: 1000,
      ease: 'outCubic',
      complete() {
        targets.forEach((c) => { c.style.transform = 'none'; c.style.opacity = '1'; });
      },
    };
  },
};

function initSectionSlides(scope = document) {
  const els = scope.querySelectorAll('[data-slide]');
  if (!els.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  els.forEach((el) => {
    if (el.dataset.slideBound === '1') return;
    el.dataset.slideBound = '1';

    if (reduce) {
      el.dataset.done = '1';
      return;
    }

    el.style.willChange = 'transform, opacity';

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && run()),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);

    function run() {
      if (el.dataset.done === '1') return;
      el.dataset.done = '1';
      const variant = SECTION_VARIANTS[el.dataset.slide] || SECTION_VARIANTS.slideup;
      const params = variant(el);
      animate(el, {
        ...params,
        delay: 40,
        complete: () => {
          el.style.transform = 'none';
          el.style.opacity = '1';
          el.style.willChange = 'auto';
          if (params.complete) params.complete();
        },
      });
      obs.unobserve(el);
    }
  });
}

export function useAnimeInteractions() {
  useEffect(() => {
    initReveals();
    initSectionSlides();
    initTilt();
    initHover();
    initClickPulse();

    // Re-bind anything added later (e.g., dynamic content / context switches)
    const re = () => {
      initTilt(document);
      initHover(document);
    };
    window.addEventListener('mouseover', re, { passive: true });

    return () => {
      window.removeEventListener('mouseover', re);
      if (revealObserver) revealObserver.disconnect();
    };
  }, []);
}

export { utils };
