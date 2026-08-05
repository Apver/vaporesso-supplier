import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const POWER_LIST = [
  {
    id: 1,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-07-1.webp',
    title: '2600mAh',
    description: 'battery',
  },
  {
    id: 2,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-07-2.webp',
    title: '5.5ml',
    description: 'Top-filling Capacity',
  },
  {
    id: 3,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-07-3.webp',
    title: '0.87"HD',
    description: 'TFT Screen',
  },
  {
    id: 4,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-07-4.webp',
    title: '40W',
    description: 'Maximum Output',
  },
];

/** title 接近视口左侧时的淡出区间（px） */
const TITLE_FADE_START = 220;
const TITLE_FADE_END = 32;

function updateTitleFade(title) {
  const left = title.getBoundingClientRect().left;
  const opacity = gsap.utils.clamp(
    0,
    1,
    (left - TITLE_FADE_END) / (TITLE_FADE_START - TITLE_FADE_END),
  );
  gsap.set(title, {opacity});
}

export const PowerSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const track = section.querySelector('.product-prix-power-track');
    const title = section.querySelector('.product-prix-power__title');
    const list = section.querySelector('.product-prix-power-list');
    if (!track || !title || !list) return;

    const getSlideX = () => {
      const currentX = Number(gsap.getProperty(track, 'x')) || 0;
      const rect = list.getBoundingClientRect();
      const listCenter = rect.left + rect.width / 2;
      return currentX + (window.innerWidth / 2 - listCenter);
    };

    /** 移动端：list 右缘对齐视口右缘所需位移 */
    const getMobSlideX = () => {
      const currentX = Number(gsap.getProperty(list, 'x')) || 0;
      const rect = list.getBoundingClientRect();
      return currentX + (window.innerWidth - rect.right);
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        gsap.set(title, {opacity: 1});
        gsap.set(track, {x: 0});

        const tween = gsap.to(track, {
          x: () => getSlideX(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 50px',
            end: () => `+=${Math.max(Math.abs(getSlideX()) * 1.15, 600)}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: () => updateTitleFade(title),
            onRefresh: () => updateTitleFade(title),
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, {clearProps: 'x'});
          gsap.set(title, {clearProps: 'opacity'});
        };
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.set(list, {x: 0});

        const tween = gsap.to(list, {
          x: () => getMobSlideX(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 50px',
            end: () => `+=${Math.max(Math.abs(getMobSlideX()) * 1.15, 400)}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(list, {clearProps: 'x'});
        };
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh(true);
    const rafId = requestAnimationFrame(refresh);
    const timer = window.setTimeout(refresh, 400);
    window.addEventListener('load', refresh);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timer);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div className="product-prix-power" ref={sectionRef}>
      <div className="product-prix-power-track">
        <h3 className="product-prix-power__title">
          Big Power. <br /> Big Capacity
        </h3>
        <div className="product-prix-power-list">
          {POWER_LIST.map((item) => (
            <div key={item.id} className="product-prix-power-list-item">
              <img src={item.imageUrl} alt={item.description} />
              <div className="product-prix-power-list-item-data">
                <h4 className="product-prix-power-list-item-data-title">
                  {item.title}
                </h4>
                <p className="product-prix-power-list-item-data-description">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
