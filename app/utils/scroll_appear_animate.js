import {useEffect} from 'react';

const DEFAULT_CLASS_NAMES = ['to-top', 'to-right', 'to-left'];

/** 相邻动画开始的间隔（ms），形成层次感且不拖沓 */
const DEFAULT_STAGGER_MS = 180;

/**
 * 是否接近视口。对 to-left/to-right 的横向位移留出 slack，
 * 避免 refresh 时 transform 后判定为「不可见」而永远不加 appear。
 * @param {Element} el
 */
function isNearViewport(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  const slackX = Math.max(Math.abs(rect.width) * 0.3, 80);
  const slackY = Math.max(Math.abs(rect.height) * 0.3, 80);
  return (
    rect.bottom > -slackY &&
    rect.top < vh + slackY &&
    rect.right > -slackX &&
    rect.left < vw + slackX
  );
}

/**
 * 按文档顺序排序
 * @param {Element[]} elements
 */
function sortByDocumentOrder(elements) {
  return [...elements].sort((a, b) => {
    if (a === b) return 0;
    const pos = a.compareDocumentPosition(b);
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });
}

/**
 * XrosMiniRetro 专用：为 .to-top / .to-right / .to-left 绑定进入视口的 appear 动画。
 * 同一波元素按 DOM 顺序错峰启动（stagger），不改动 ui-v3 / to_top_animate。
 *
 * @param {object} [options]
 * @param {ParentNode} [options.root]
 * @param {string[]} [options.classNames]
 * @param {string} [options.rootMargin]
 * @param {number} [options.threshold]
 * @param {number} [options.staggerMs] 相邻元素开始播放的间隔
 * @returns {() => void} cleanup
 */
export function initScrollAppearAnimate(options = {}) {
  const {
    root = document,
    classNames = DEFAULT_CLASS_NAMES,
    // 四向放大，覆盖横向滑入位移与滚动位置恢复
    rootMargin = '20% 25% 20% 25%',
    threshold = 0,
    staggerMs = DEFAULT_STAGGER_MS,
  } = options;

  if (typeof window === 'undefined') {
    return () => {};
  }

  const classSelector = classNames.map((cls) => `.${cls}`).join(',');
  const animateElements = Array.from(
    root.querySelectorAll(classSelector),
  ).filter((el) => !el.classList.contains('appear'));

  if (!animateElements.length) {
    return () => {};
  }

  /** @type {Element[]} */
  const queue = [];
  const queued = new Set();
  let playing = false;
  let cancelled = false;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let staggerTimer = null;

  const enqueue = (el) => {
    if (cancelled || el.classList.contains('appear') || queued.has(el)) return;
    queued.add(el);
    queue.push(el);
    queue.sort((a, b) => {
      const pos = a.compareDocumentPosition(b);
      if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });
    playNext();
  };

  const playNext = () => {
    if (cancelled || playing) return;

    while (queue.length) {
      const el = queue.shift();
      if (!el || el.classList.contains('appear')) continue;

      playing = true;

      // 双 rAF：先以初始态绘制一帧，再加 appear
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) {
            // 避免 Strict Mode / 卸载时元素被取出队列后既不加 appear 又占着 playing
            playing = false;
            queued.delete(el);
            return;
          }
          el.classList.add('appear');
          staggerTimer = setTimeout(() => {
            staggerTimer = null;
            playing = false;
            playNext();
          }, staggerMs);
        });
      });
      return;
    }
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      const wave = [];
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        wave.push(entry.target);
        obs.unobserve(entry.target);
      });
      sortByDocumentOrder(wave).forEach(enqueue);
    },
    {root: null, rootMargin, threshold},
  );

  const enqueueVisible = () => {
    if (cancelled) return;
    sortByDocumentOrder(
      animateElements.filter(
        (el) =>
          !el.classList.contains('appear') &&
          !queued.has(el) &&
          isNearViewport(el),
      ),
    ).forEach((el) => {
      observer.unobserve(el);
      enqueue(el);
    });
  };

  animateElements.forEach((el) => {
    if (isNearViewport(el)) {
      enqueue(el);
    } else {
      observer.observe(el);
    }
  });

  let settleRaf2 = 0;
  const settleRaf1 = requestAnimationFrame(() => {
    settleRaf2 = requestAnimationFrame(enqueueVisible);
  });

  // 滚动位置恢复、图片/视频撑开布局后再扫一遍
  const onPageShow = () => enqueueVisible();
  const onLoad = () => enqueueVisible();
  let scrollTimer = null;
  const onScrollOrResize = () => {
    if (scrollTimer != null) return;
    scrollTimer = setTimeout(() => {
      scrollTimer = null;
      enqueueVisible();
    }, 50);
  };

  window.addEventListener('pageshow', onPageShow);
  window.addEventListener('load', onLoad);
  window.addEventListener('scroll', onScrollOrResize, {passive: true});
  window.addEventListener('resize', onScrollOrResize);

  return () => {
    cancelled = true;
    if (staggerTimer != null) clearTimeout(staggerTimer);
    if (scrollTimer != null) clearTimeout(scrollTimer);
    cancelAnimationFrame(settleRaf1);
    cancelAnimationFrame(settleRaf2);
    window.removeEventListener('pageshow', onPageShow);
    window.removeEventListener('load', onLoad);
    window.removeEventListener('scroll', onScrollOrResize);
    window.removeEventListener('resize', onScrollOrResize);
    observer.disconnect();
    queue.length = 0;
    queued.clear();
  };
}

/** @param {object} [options] 同 initScrollAppearAnimate */
export function useScrollAppearAnimate(options = {}) {
  useEffect(() => {
    const cleanup = initScrollAppearAnimate(options);
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
