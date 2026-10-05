/**
 * js/animations.js
 * Scroll reveal, tilt, magnetic buttons, parallax, scroll progress.
 */

(function () {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Scroll Progress Bar ──
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    function update() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      bar.style.transform = `scaleX(${progress})`;
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ── Intersection Observer — Scroll Reveal ──
  function initReveal() {
    if (prefersReduced) {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
      return;
    }

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  // ── Stagger groups ──
  function initStagger() {
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.stagger-parent').forEach((el) => observer.observe(el));
  }

  // ── Card Tilt (3D) ──
  function initTilt() {
    if (prefersReduced) return;

    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -5;
        const rotY = ((x - cx) / cx) * 5;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      });
    });
  }

  // ── Magnetic Buttons ──
  function initMagnetic() {
    if (prefersReduced) return;

    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const strength = 0.3;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ── Hero Parallax / Ambient Glow ──
  function initHeroParallax() {
    if (prefersReduced) return;

    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    const shapes = heroBg.querySelectorAll('.hero-bg-shape');

    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      shapes.forEach((shape, i) => {
        const depth = (i + 1) * 10;
        shape.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    }, { passive: true });
  }

  // ── Ripple Effect on Buttons ──
  function initRipple() {
    document.querySelectorAll('.btn-primary').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${x - size / 2}px;
          top: ${y - size / 2}px;
        `;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 450);
      });
    });
  }

  // ── Hero Photo Parallax on Scroll ──
  function initPhotoScroll() {
    if (prefersReduced) return;
    const frame = document.querySelector('.hero-photo-frame');
    if (!frame) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      if (scrollY > maxScroll) return;
      const progress = scrollY / maxScroll;
      frame.style.transform = `translateY(${progress * 20}px)`;
    }, { passive: true });
  }

  // ── Init all ──
  function init() {
    initScrollProgress();
    initReveal();
    initStagger();
    initTilt();
    initMagnetic();
    initHeroParallax();
    initRipple();
    initPhotoScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();