import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * stacked-cards 滚动叠卡（源自 a.js StackedCards）
 * @param {HTMLElement | null} root
 * @returns {() => void}
 */
export function initXros6MiniShowCaseTwoScroll(root) {
  if (!root) return () => {};

  const container = root.querySelector('.spec-showcase2');
  const cards = Array.from(root.querySelectorAll('.spec-showcase2-cnt'));
  if (!container || !cards.length) return () => {};

  let currentIndex = -1;
  let mm;

  const initCards = () => {
    cards.forEach((card, i) => {
      gsap.set(card, {
        transformOrigin: 'center center',
        zIndex: 10 - i,
        y: `${i * 6}vh`,
        scale: 1 - i * 0.1,
        opacity: 1,
      });
      card.classList.remove('is-active', 'enter');
    });
  };

  const switchCard = (index) => {
    currentIndex = index;
    if (index > 0) {
      container.classList.add('has-scrolled');
    }

    if (index === 0) {
      const nums = cards[0].querySelectorAll('.js__num');
      if (nums.length >= 2) {
        gsap.fromTo(
          nums[0],
          {textContent: 0},
          {
            textContent: 20,
            duration: 1.3,
            snap: {textContent: 1},
            ease: 'none',
            overwrite: true,
          },
        );
        gsap.fromTo(
          nums[1],
          {textContent: 0},
          {
            textContent: 30,
            duration: 1.3,
            snap: {textContent: 1},
            ease: 'none',
            overwrite: true,
          },
        );
      }
    }

    cards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('is-active', 'enter');
      } else {
        card.classList.remove('is-active', 'enter');
      }

      const stateOffset = i - index;

      if (stateOffset < 0) {
        gsap.to(card, {
          y: '-64vh',
          scale: 0.85,
          rotation: 8,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.inOut',
          overwrite: 'auto',
        });
      } else {
        gsap.to(card, {
          y: `${stateOffset * 6}vh`,
          scale: 1 - stateOffset * 0.1,
          rotation: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.inOut',
          overwrite: 'auto',
        });
      }
    });
  };

  mm = gsap.matchMedia();
  mm.add('(min-width: 1023px)', () => {
    initCards();

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      onEnter: () => switchCard(0),
      onLeaveBack: () => {
        container.classList.remove('has-scrolled');
        if (cards[0]) {
          cards[0].classList.remove('is-active', 'enter');
          const nums = cards[0].querySelectorAll('.js__num');
          if (nums.length > 0) {
            gsap.killTweensOf(nums);
            gsap.set(nums, {textContent: 0});
          }
        }
        currentIndex = -1;
      },
      onUpdate: (self) => {
        if (!self.isActive) return;
        let targetIndex = Math.floor(self.progress * cards.length);
        if (targetIndex >= cards.length) {
          targetIndex = cards.length - 1;
        }
        if (targetIndex !== currentIndex) {
          switchCard(targetIndex);
        }
      },
    });

    return () => st.kill();
  });

  return () => mm.revert();
}
