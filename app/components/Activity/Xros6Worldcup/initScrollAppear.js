export function initScrollAppear(root) {
  if (!root || typeof window === 'undefined') return () => { };

  const elements = [...root.querySelectorAll(
    '.to-top, .mobile-to-top, .cricle-animate',
  )].filter((el) => !el.classList.contains('appear'));

  if (!elements.length) return () => { };

  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    elements.forEach((el) => el.classList.add('appear'));
    return () => { };
  }

  const isMobile = window.matchMedia('(max-width: 1023px)').matches;
  const intervals = new Set();
  const frames = new Set();
  let disposed = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || disposed) return;

        const el = entry.target;
        observer.unobserve(el);

        const frame = requestAnimationFrame(() => {
          frames.delete(frame);
          if (disposed) return;

          el.classList.add('appear');

          if (el.classList.contains('shake-once')) {
            const interval = window.setInterval(() => {
              el.classList.remove('appear');
              void el.offsetWidth;
              el.classList.add('appear');
            }, 3000);

            intervals.add(interval);
          }
        });

        frames.add(frame);
      });
    },
    {
      root: null,
      rootMargin: isMobile
        ? `0px 0px -${Math.round(window.innerHeight * 0.2)}px 0px`
        : '0px 0px 50px 0px',
      threshold: isMobile ? 0 : 0.4,
    },
  );

  elements.forEach((el) => observer.observe(el));

  return () => {
    disposed = true;
    observer.disconnect();
    frames.forEach((id) => cancelAnimationFrame(id));
    intervals.forEach((id) => window.clearInterval(id));
  };
}
