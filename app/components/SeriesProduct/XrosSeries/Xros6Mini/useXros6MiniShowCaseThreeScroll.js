import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function getShowcasePinTop() {
  const nav = document.querySelector('#proNav');
  if (nav) return Math.round(nav.getBoundingClientRect().height);
  return window.innerWidth < 1024 ? 44 : 52;
}

function buildShowcase3Timeline(root, scrollTriggerConfig) {
  const item1 = root.querySelector('.spec-showcase3-item1');
  const item2Bg = root.querySelector('.showcase3-item2-bg');
  const item2Box = root.querySelector(
    '.spec-showcase3-item2 .showcase3-item2-box',
  );

  gsap.set(item1, {yPercent: 0});
  if (item2Bg) gsap.set(item2Bg, {opacity: 1});
  if (item2Box) gsap.set(item2Box, {scale: 1.3});

  const isMobile = scrollTriggerConfig.pin != null;
  const leadDuration = isMobile ? 0.9 : 0.5;
  const tailDuration = isMobile ? 0.5 : 0.5;

  const tl = gsap.timeline({scrollTrigger: scrollTriggerConfig});

  tl.to({}, {duration: leadDuration})
    .fromTo(
      item1,
      {yPercent: 0},
      {yPercent: -100, duration: 1, ease: 'none'},
    )
    .to(item2Bg, {opacity: 0, duration: 0.9, ease: 'power1.out'}, '<')
    .to(item2Box, {scale: 1, duration: 0.9, ease: 'power1.out'}, '<')
    .to({}, {duration: tailDuration});

  return tl;
}

/**
 * spec-showcase3 滚动过渡（源自 a.js SpecShowcase3）
 * 移动端使用 GSAP pin，避免 sticky 在祖先 overflow 下失效
 * @param {HTMLElement | null} root
 * @returns {() => void}
 */
export function initXros6MiniShowCaseThreeScroll(root) {
  if (!root) return () => {};

  const showcase = root.querySelector('.spec-showcase3');
  const stickContainer = root.querySelector('.spec-showcase3__stick');
  if (!showcase || !stickContainer) return () => {};

  ScrollTrigger.config({ignoreMobileResize: true});

  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px)', () => {
    const ctx = gsap.context(() => {
      buildShowcase3Timeline(root, {
        trigger: stickContainer,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
      });
    }, root);

    return () => ctx.revert();
  });

  mm.add('(max-width: 1023px)', () => {
    const pinTop = getShowcasePinTop();
    root.style.setProperty('--xros6-mini-showcase3-pin-top', `${pinTop}px`);

    const ctx = gsap.context(() => {
      buildShowcase3Timeline(root, {
        trigger: showcase,
        start: `top top+=${pinTop}`,
        end: '+=150%',
        scrub: 1,
        pin: stickContainer,
        pinSpacing: true,
        pinType: 'fixed',
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          root.classList.toggle('is-showcase3-scrolling', self.isActive);
        },
      });
    }, root);

    return () => ctx.revert();
  });

  return () => mm.revert();
}
