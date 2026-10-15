import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * 移动端数字递增（源自 a.js counter-animate）
 * @param {ParentNode} [root]
 * @returns {() => void}
 */
export function initXros6MiniCounterAnimate(root = document) {
  let mm;

  mm = gsap.matchMedia();
  mm.add('(max-width: 1023px)', () => {
    const counters = root.querySelectorAll('.counter-animate');
    const cleanups = [];

    counters.forEach((counter) => {
      const targetValue = counter.getAttribute('data-target');
      if (!targetValue) return;

      const tween = gsap.to(counter, {
        textContent: targetValue,
        duration: 2,
        ease: 'power2.out',
        snap: {textContent: 1},
        scrollTrigger: {
          trigger: counter,
          start: 'top 85%',
          toggleActions: 'restart none restart none',
        },
      });
      cleanups.push(() => tween.scrollTrigger?.kill());
    });

    return () => cleanups.forEach((fn) => fn());
  });

  return () => mm.revert();
}
