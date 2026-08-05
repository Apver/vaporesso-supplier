import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OPERATION_LIST = [
  {times: 2, desc: 'Menu'},
  {times: 3, desc: 'Watt/Level'},
  {times: 4, desc: 'Lock/Unlock'},
  {times: 5, desc: 'On/Off'},
];

export const OperationSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const list = section.querySelector('.product-prix-operation-list');
    if (!list) return;

    const ctx = gsap.context(() => {
      gsap.set(list, {
        clipPath: 'inset(0 100% 0 0)',
        webkitClipPath: 'inset(0 100% 0 0)',
        autoAlpha: 1,
      });

      const tween = gsap.to(list, {
        clipPath: 'inset(0 0% 0 0)',
        webkitClipPath: 'inset(0 0% 0 0)',
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'bottom bottom',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(list, {clearProps: 'clipPath,webkitClipPath,opacity,visibility'});
      };
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
    <div className="product-prix-operation ui-v4-flex" ref={sectionRef}>
      <h3 className="product-prix-operation__title">
        One Button <br />
        For All
      </h3>
      <picture>
        <source
          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-12-1.webp"
          media="(max-width: 1023px)"
        />
        <img
          className="product-prix-operation__img"
          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-12-1.webp"
          alt="One Button For All"
        />
      </picture>
      <div className="product-prix-operation-list">
        {OPERATION_LIST.map((item) => (
          <div className="product-prix-operation-list-item" key={item.times}>
            <div className="product-prix-operation-list-item__title">
              {item.desc}
            </div>
            <div className="product-prix-operation-list-item-box">
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-12-2.svg"
                alt=""
              />
              <div className="product-prix-operation-list-item-box__number">
                {item.times}
              </div>
              <div className="product-prix-operation-list-item-box__text">
                Press
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
