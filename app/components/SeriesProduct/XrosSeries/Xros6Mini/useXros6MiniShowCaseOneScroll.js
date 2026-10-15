import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function getShowcase1PinTop() {
  const nav = document.querySelector('#proNav');
  if (nav) return Math.round(nav.getBoundingClientRect().height);
  return window.innerWidth < 1024 ? 44 : 52;
}

function revealClockTitle(root, selector) {
  const el = root.querySelector(selector);
  if (!el) return;
  gsap.fromTo(
    el,
    {width: 0},
    {width: 'auto', duration: 0.5, ease: 'none', overwrite: true},
  );
}

function hideClockTitle(root, selector) {
  const el = root.querySelector(selector);
  if (!el) return;
  gsap.to(el, {width: 0, duration: 0.5, ease: 'none', overwrite: true});
}

function switchToContent2(stickContainer, containers) {
  stickContainer?.classList.add('stick-bg-white');
  containers[0]?.classList.remove('is-active');
  containers[1]?.classList.add('is-active');
  if (containers[1]) void containers[1].offsetWidth;
}

function switchToContent1(stickContainer, containers) {
  stickContainer?.classList.remove('stick-bg-white');
  containers[0]?.classList.add('is-active');
  containers[1]?.classList.remove('is-active');
}

/** 桌面端：文案切换与原版 a.js 一致，表针单独 ScrollTrigger */
function buildShowcase1DesktopTimeline(root, stickContainer, scrollTriggerConfig) {
  const containers = gsap.utils.toArray(
    root.querySelectorAll('.spec-showcase1-content'),
  );

  const tl = gsap.timeline({scrollTrigger: scrollTriggerConfig});

  tl.to(
    {},
    {
      duration: 0.01,
      onStart: () => revealClockTitle(root, '.js-clock-tle-box1'),
      onReverseComplete: () => hideClockTitle(root, '.js-clock-tle-box1'),
    },
  )
    .to({}, {duration: 1})
    .to(
      {},
      {
        duration: 0.01,
        onStart: () => {
          switchToContent2(stickContainer, containers);
          revealClockTitle(root, '.js-clock-tle-box2');
        },
        onReverseComplete: () => {
          switchToContent1(stickContainer, containers);
          hideClockTitle(root, '.js-clock-tle-box2');
        },
      },
    )
    .to({}, {duration: 1});

  return tl;
}

/**
 * 移动端：1 Min → 表针转动 → 转动过程中 4 Days
 */
function buildShowcase1MobileTimeline(
  root,
  stickContainer,
  scrollTriggerConfig,
) {
  const containers = gsap.utils.toArray(
    root.querySelectorAll('.spec-showcase1-content'),
  );
  const indicatorTop = root.querySelector('.indicator-line-top');
  const indicatorBottom = root.querySelector('.indicator-line-bottom');

  gsap.set([indicatorTop, indicatorBottom].filter(Boolean), {rotation: 0});

  const tl = gsap.timeline({scrollTrigger: scrollTriggerConfig});

  // 1. 先展示 1 Min
  tl.to(
    {},
    {
      duration: 0.01,
      onStart: () => revealClockTitle(root, '.js-clock-tle-box1'),
      onReverseComplete: () => hideClockTitle(root, '.js-clock-tle-box1'),
    },
  ).to({}, {duration: 1});

  // 2. 表针开始转动
  const rotateLabel = 'clock-rotate';
  if (indicatorTop) {
    tl.to(
      indicatorTop,
      {rotation: 360 * 2, svgOrigin: '450 450', ease: 'none', duration: 2},
      rotateLabel,
    );
  }
  if (indicatorBottom) {
    tl.to(
      indicatorBottom,
      {rotation: 200 * 2, svgOrigin: '450 450', ease: 'none', duration: 2},
      rotateLabel,
    );
  }

  // 3. 转动到一半时切换 4 Days
  tl.to(
    {},
    {
      duration: 0.01,
      onStart: () => {
        switchToContent2(stickContainer, containers);
        revealClockTitle(root, '.js-clock-tle-box2');
      },
      onReverseComplete: () => {
        switchToContent1(stickContainer, containers);
        hideClockTitle(root, '.js-clock-tle-box2');
      },
    },
    `${rotateLabel}+=1`,
  ).to({}, {duration: 1});

  return tl;
}

/**
 * spec-showcase1 滚动时间轴（源自 a.js SpecShowcase1）
 * @param {HTMLElement | null} root
 * @returns {() => void}
 */
export function initXros6MiniShowCaseOneScroll(root) {
  if (!root) return () => {};

  const showcase = root.querySelector('.spec-showcase1');
  const stickContainer = root.querySelector('.spec-showcase1__stick');
  if (!showcase || !stickContainer) return () => {};

  ScrollTrigger.config({ignoreMobileResize: true});

  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px)', () => {
    const ctx = gsap.context(() => {
      buildShowcase1DesktopTimeline(root, stickContainer, {
        trigger: showcase,
        start: 'top center',
        end: 'bottom bottom',
        scrub: 1,
      });

      gsap.to(root.querySelector('.indicator-line-top'), {
        rotation: 360 * 2,
        svgOrigin: '450 450',
        ease: 'none',
        scrollTrigger: {
          trigger: showcase,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(root.querySelector('.indicator-line-bottom'), {
        rotation: 200 * 2,
        svgOrigin: '450 450',
        ease: 'none',
        scrollTrigger: {
          trigger: showcase,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, root);

    return () => ctx.revert();
  });

  mm.add('(max-width: 1023px)', () => {
    const pinTop = getShowcase1PinTop();
    root.style.setProperty('--xros6-mini-showcase1-pin-top', `${pinTop}px`);

    const ctx = gsap.context(() => {
      buildShowcase1MobileTimeline(root, stickContainer, {
        trigger: showcase,
        start: `top top+=${pinTop}`,
        end: () =>
          `+=${Math.max(showcase.offsetHeight - window.innerHeight, 0)}`,
        scrub: 1,
        pin: stickContainer,
        pinSpacing: true,
        pinType: 'fixed',
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          root.classList.toggle('is-showcase1-scrolling', self.isActive);
        },
      });
    }, root);

    return () => ctx.revert();
  });

  return () => mm.revert();
}
