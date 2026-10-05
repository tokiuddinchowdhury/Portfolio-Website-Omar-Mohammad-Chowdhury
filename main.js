/**
 * js/main.js
 * Entry point — orchestrates all modules.
 */

(function () {
  // ── Page Transition ──
  function initPageTransition() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const overlay = document.querySelector('.page-transition');
    if (!overlay) return;

    // Fade in on load
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
      document.body.style.transition = 'opacity 300ms ease';
      document.body.style.opacity = '1';
    });

    // Intercept internal link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;

      const isInternal = !href.startsWith('http') &&
                         !href.startsWith('mailto') &&
                         !href.startsWith('tel') &&
                         !href.startsWith('//') &&
                         !href.startsWith('#') &&
                         !href.includes('YOUR_');

      const isSamePage = href === window.location.pathname ||
                         href === window.location.href;

      if (!isInternal || isSamePage) return;
      if (link.target === '_blank') return;

      e.preventDefault();

      overlay.classList.add('entering');

      setTimeout(() => {
        window.location.href = href;
      }, 280);
    });
  }

  // ── Navbar animation class ──
  function initNavbarAnimate() {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.add('navbar-animate');
  }

  // ── Hero animation class ──
  function initHeroAnimate() {
    const hero = document.querySelector('.hero');
    if (hero) {
      requestAnimationFrame(() => {
        hero.classList.add('hero-animate');
      });
    }
  }

  // ── Page hero animate ──
  function initPageHeroAnimate() {
    const ph = document.querySelector('.page-hero-animate');
    if (ph) {
      requestAnimationFrame(() => {
        ph.style.opacity = '1';
      });
    }
  }

  // ── Lazy load images ──
  function initLazyImages() {
    if ('loading' in HTMLImageElement.prototype) return; // native
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          observer.unobserve(img);
        }
      });
    });
    imgs.forEach((img) => observer.observe(img));
  }

  // ── External links — safe attributes ──
  function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach((link) => {
      if (!link.rel) link.rel = 'noopener noreferrer';
      if (!link.target) link.target = '_blank';
    });
  }

  // ── Placeholder links — prevent navigation ──
  function initPlaceholderLinks() {
    document.querySelectorAll('a[href*="YOUR_"], a[data-placeholder-link]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        console.info(
          `[Portfolio] Placeholder link clicked: ${link.href}\nReplace this in the data file or HTML.`
        );
      });
    });
  }

  // ── Discord — copy username to clipboard ──
  function initCopyButtons() {
    document.querySelectorAll('[data-copy-text]').forEach((btn) => {
      const original = btn.getAttribute('data-tooltip') || '';
      let timer;
      btn.addEventListener('click', async () => {
        const text = btn.getAttribute('data-copy-text');
        let ok = false;
        try {
          await navigator.clipboard.writeText(text);
          ok = true;
        } catch (err) {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
          document.body.appendChild(ta);
          ta.select();
          try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
          document.body.removeChild(ta);
        }
        btn.setAttribute('data-tooltip', ok ? 'Username copied!' : 'Discord: ' + text);
        btn.classList.add('is-copied');
        clearTimeout(timer);
        timer = setTimeout(() => {
          btn.classList.remove('is-copied');
          btn.setAttribute('data-tooltip', original);
        }, 1800);
      });
    });
  }

  // ── Init everything on DOM ready ──
  function init() {
    // Theme system
    if (window.ThemeSystem) {
      window.ThemeSystem.init();
    }

    initNavbarAnimate();
    initHeroAnimate();
    initPageHeroAnimate();
    initPageTransition();
    initLazyImages();
    initExternalLinks();
    initPlaceholderLinks();
    initCopyButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();