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
    const items = gsap.utils.toArray(
      section.querySelectorAll('.product-prix-operation-list-item'),
    );
    if (!list || items.length === 0) return;

    let releaseLock = null;

    const ctx = gsap.context(() => {
      gsap.set(list, {
        clipPath: 'inset(0 100% 0 0)',
        webkitClipPath: 'inset(0 100% 0 0)',
      });
      gsap.set(items, {autoAlpha: 0, y: 28});

      let unlockScroll = null;
      let pinTrigger = null;

      const lockScroll = () => {
        const scrollY = window.scrollY;
        const html = document.documentElement;
        const body = document.body;
        const prev = {
          htmlOverflow: html.style.overflow,
          bodyOverflow: body.style.overflow,
        };
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';

        const prevent = (e) => e.preventDefault();
        const preventKey = (e) => {
          if (
            [
              'ArrowUp',
              'ArrowDown',
              'PageUp',
              'PageDown',
              'Home',
              'End',
              ' ',
            ].includes(e.key)
          ) {
            e.preventDefault();
          }
        };

        window.addEventListener('wheel', prevent, {passive: false});
        window.addEventListener('touchmove', prevent, {passive: false});
        window.addEventListener('keydown', preventKey);

        return () => {
          html.style.overflow = prev.htmlOverflow;
          body.style.overflow = prev.bodyOverflow;
          window.removeEventListener('wheel', prevent);
          window.removeEventListener('touchmove', prevent);
          window.removeEventListener('keydown', preventKey);
          window.scrollTo(0, scrollY);
        };
      };

      const release = () => {
        unlockScroll?.();
        unlockScroll = null;
        if (pinTrigger) {
          pinTrigger.kill(true);
          pinTrigger = null;
          ScrollTrigger.refresh();
        }
        releaseLock = null;
      };
      releaseLock = release;

      const tl = gsap.timeline({
        paused: true,
        onComplete: release,
      });

      tl.to(list, {
        clipPath: 'inset(0 0% 0 0)',
        webkitClipPath: 'inset(0 0% 0 0)',
        duration: 0.85,
        ease: 'power2.inOut',
      });

      tl.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 50px',
        once: true,
        onEnter: () => {
          unlockScroll = lockScroll();
          pinTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'top 50px',
            end: 'max',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          });
          tl.play(0);
        },
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
      releaseLock?.();
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
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-12-2_converted.webp?v=1785986168"
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
