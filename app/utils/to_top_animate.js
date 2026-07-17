import {useEffect} from 'react';

const DEFAULT_CLASS_NAMES = ['to-top'];

/**
 * 为 .to-top 元素绑定进入视口时的 appear 动画（与 xros-pro2 component.js 一致）
 * @param {object} [options]
 * @param {ParentNode} [options.root]
 * @param {string[]} [options.classNames]
 * @param {string} [options.rootMargin]
 * @param {number} [options.threshold]
 * @returns {() => void} cleanup
 */
export function initToTopAnimate(options = {}) {
  const {
    root = document,
    classNames = DEFAULT_CLASS_NAMES,
    rootMargin = '0px 0px 20px 0px',
    threshold = 0.2,
  } = options;

  const classSelector = classNames.map((cls) => `.${cls}`).join(',');
  const animateElements = root.querySelectorAll(classSelector);

  if (!animateElements.length) {
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        requestAnimationFrame(() => {
          entry.target.classList.add('appear');
        });
        obs.unobserve(entry.target);
      });
    },
    {root: null, rootMargin, threshold},
  );

  const observeInBatches = (elements, batchSize = 20) => {
    let index = 0;

    const observeNextBatch = () => {
      const batch = Array.from(elements).slice(index, index + batchSize);
      batch.forEach((el) => observer.observe(el));
      index += batchSize;

      if (index < elements.length) {
        (window.requestIdleCallback || ((cb) => setTimeout(cb, 150)))(
          observeNextBatch,
        );
      }
    };

    observeNextBatch();
  };

  observeInBatches(animateElements);

  return () => observer.disconnect();
}

/** @param {object} [options] 同 initToTopAnimate */
export function useToTopAnimate(options = {}) {
  useEffect(() => {
    const cleanup = initToTopAnimate(options);
    return cleanup;
  }, []);
}
