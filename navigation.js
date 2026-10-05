(function () {
  function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('#hamburger, .nav-hamburger');
    const overlay = document.querySelector('#mobileMenuOverlay, .mobile-nav-overlay');
    const panel = document.querySelector('#mobileMenu, .mobile-nav-panel');
    const closeBtn = document.querySelector('#mobileMenuClose, .mobile-nav-close');

    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const normalize = (value) => {
      const path = value.replace(/\\/g, '/').replace(/\/+$/, '');
      return path || '/';
    };

    const currentPath = normalize(window.location.pathname);

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      let target;
      try {
        target = normalize(new URL(href, window.location.href).pathname);
      } catch {
        return;
      }

      const isHome = target.endsWith('/index.html') && (currentPath === '/' || currentPath.endsWith('/index.html'));
      const active = currentPath === target || isHome;

      link.classList.toggle('active', active);
      if (active) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    function handleScroll() {
      navbar?.classList.toggle('scrolled', window.scrollY > 40);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    function openMenu() {
      if (!overlay || !panel || !hamburger) return;

      overlay.style.display = 'block';

      requestAnimationFrame(() => {
        overlay.classList.add('open');
        panel.classList.add('open');
      });

      overlay.setAttribute('aria-hidden', 'false');
      panel.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (!overlay || !panel || !hamburger) {
        document.body.style.overflow = '';
        return;
      }

      overlay.classList.remove('open');
      panel.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      panel.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';

      window.setTimeout(() => {
        if (!panel.classList.contains('open')) {
          overlay.style.display = '';
        }
      }, 420);
    }

    hamburger?.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);

    overlay?.addEventListener('click', (event) => {
      if (event.target === overlay) closeMenu();
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && panel?.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
