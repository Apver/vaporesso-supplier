import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BatterySection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const content = section.querySelector('.product-prix-battery-content');
    const mah = section.querySelector('.product-prix-battery-content-mah');
    const list = section.querySelector('.product-prix-battery-content-list');
    const img = content?.querySelector('img');
    if (!content || !mah || !list) return;

    const getHideY = () => {
      const h = img?.offsetHeight || content.offsetHeight || 400;
      return Math.max(h * 0.5, 160);
    };

    const ctx = gsap.context(() => {
      const hideY = getHideY();
      gsap.set(mah, {y: hideY, autoAlpha: 0});
      gsap.set(list, {y: hideY, autoAlpha: 0});

      let tl;
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 50px',
          end: () => `+=${Math.max(window.innerHeight * 1.2, 800)}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            if (!tl || tl.progress() === 0) {
              const y = getHideY();
              gsap.set(mah, {y, autoAlpha: 0});
              gsap.set(list, {y, autoAlpha: 0});
            }
          },
        },
      });

      // 1. mah 上移到最终位置并显现
      tl.fromTo(
        mah,
        {y: () => getHideY(), autoAlpha: 0},
        {y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out'},
      );

      // 2. mah 淡出
      tl.to(mah, {
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power1.in',
      });

      // 3. list 上移到最终位置并显现
      tl.fromTo(
        list,
        {y: () => getHideY(), autoAlpha: 0},
        {y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out'},
      );

      // 结束稍作停留，避免松 pin 过快
      tl.to({}, {duration: 0.25});
    }, section);

    const refresh = () => ScrollTrigger.refresh(true);
    const rafId = requestAnimationFrame(refresh);
    const timer = window.setTimeout(refresh, 400);
    window.addEventListener('load', refresh);
    img?.addEventListener('load', refresh);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timer);
      window.removeEventListener('load', refresh);
      img?.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div className="product-prix-battery ui-v4-flex" ref={sectionRef}>
      <h3 className="product-prix-battery__title">
        Large Battery, <br className="x-hide" />
        Fast Charging, <br />
        Ready to Go
      </h3>
      {/* <p className="product-prix-battery__description">
        The powerful 2600mAh battery delivers long-lasting power, ensuring you
        can enjoy your device for hours on end.
      </p> */}
      <div className="product-prix-battery-content">
        <picture>
          <source
            srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-08-1.webp"
            media="(min-width: 1024px)"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-08-1.webp"
            alt="Battery"
          />
        </picture>
        <p className="product-prix-battery-content-mah">2600mAh</p>
        <div className="product-prix-battery-content-list">
          <div className="product-prix-battery-content-list-item">
            <p className="product-prix-battery-content-list-item-title">
              5V/2A
            </p>
            <p className="product-prix-battery-content-list-item-description">
              Fast Charging
            </p>
          </div>
          <div className="product-prix-battery-content-list-item">
            <p className="product-prix-battery-content-list-item-title">
              45 Mins
            </p>
            <p className="product-prix-battery-content-list-item-description">
              Full Charged
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
