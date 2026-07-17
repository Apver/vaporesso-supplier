export function initScrollAppear(root) {
  const animationClassNames = [
    'to-top',
    'mobile-to-top',
    'cricle-animate',
  ];
  const classSelector = animationClassNames.map((cls) => `.${cls}`).join(',');
  const animateElements = root.querySelectorAll(classSelector);

  if (animateElements.length === 0) return () => {};

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 50px 0px',
    threshold: 0.4,
  };

  const shakeIntervals = [];

  const handleIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      if (el.classList.contains('shake-once')) {
        const intervalId = window.setInterval(() => {
          el.classList.remove('appear');
          void el.offsetWidth;
          el.classList.add('appear');
        }, 3000);
        shakeIntervals.push(intervalId);
      } else {
        requestAnimationFrame(() => {
          el.classList.add('appear');
        });
      }

      observer.unobserve(el);
    });
  };

  const observer = new IntersectionObserver(handleIntersect, observerOptions);

  const observeInBatches = (elements, batchSize = 20) => {
    let index = 0;

    const observeNextBatch = () => {
      const batch = Array.from(elements).slice(index, index + batchSize);
      batch.forEach((el) => observer.observe(el));
      index += batchSize;

      if (index < elements.length) {
        (window.requestIdleCallback || ((cb) => window.setTimeout(cb, 150)))(
          observeNextBatch,
        );
      }
    };

    observeNextBatch();
  };

  observeInBatches(animateElements);

  return () => {
    observer.disconnect();
    shakeIntervals.forEach((id) => window.clearInterval(id));
  };
}
