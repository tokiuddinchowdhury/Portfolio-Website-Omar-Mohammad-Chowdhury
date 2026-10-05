(function () {
  const KEY = 'omar-portfolio-theme';
  const getPreferred = () => {
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  function updateUI(theme) {
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      const active = btn.dataset.mode === theme;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }
  function applyTheme(theme, persist = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) localStorage.setItem(KEY, theme);
    updateUI(theme);
  }
  applyTheme(getPreferred(), false);
  window.ThemeSystem = {
    toggle() { applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); },
    getTheme: () => document.documentElement.getAttribute('data-theme'),
    applyTheme,
    updateUI,
    init() {
      applyTheme(getPreferred(), false);
      document.querySelectorAll('.theme-toggle-btn').forEach((btn) => btn.addEventListener('click', () => applyTheme(btn.dataset.mode === 'dark' ? 'dark' : 'light')));
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', (e) => {
        if (!localStorage.getItem(KEY)) applyTheme(e.matches ? 'dark' : 'light', false);
      });
    }
  };
})();
