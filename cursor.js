(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = window.matchMedia('(hover: none)').matches;
  if (reduce || touch) return;

  document.body.classList.add('custom-cursor-ready');

  const root = document.querySelector('.cursor, .custom-cursor');
  const dot = document.querySelector('.cursor-dot');
  let ring = document.querySelector('.cursor-ring');

  if (!dot) {
    document.body.classList.remove('custom-cursor-ready');
    return;
  }

  if (!root && ring) return;

  if (!ring && root) {
    ring = document.createElement('div');
    ring.className = 'cursor-ring';
    root.appendChild(ring);
  }

  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let rx = x;
  let ry = y;

  addEventListener('mousemove', (event) => {
    x = event.clientX;
    y = event.clientY;
  }, { passive: true });

  function tick() {
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

    if (ring) {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  const interactive = 'a,button,input,textarea,select,label,.project-card,.skill-card,[role="button"]';

  document.addEventListener('mouseover', (event) => {
    if (event.target.closest(interactive)) {
      dot.classList.add('hover-state');
      ring?.classList.add('hover-state');
    }
  });

  document.addEventListener('mouseout', (event) => {
    if (event.target.closest(interactive)) {
      dot.classList.remove('hover-state');
      ring?.classList.remove('hover-state');
    }
  });

  document.addEventListener('mousedown', () => {
    dot.classList.add('click-state');
  });

  document.addEventListener('mouseup', () => {
    dot.classList.remove('click-state');
  });
})();
