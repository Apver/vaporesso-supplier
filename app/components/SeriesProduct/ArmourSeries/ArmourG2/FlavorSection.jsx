/**
 * ARMOUR G2 — Pulse Mode（滚动缩窄揭示）
 * 设计稿：PC 1:242（初态：全屏大图）+ 1:243（终态：图缩至左半屏、右侧白底内容）
 *        MOB 1:1006（无动效：黑底内容在上、芯片图在下）
 *
 * 动效原理：容器为 flex，右侧白底 box 固定 50% 且 flex-shrink:0，初始被挤出视口；
 * GSAP 只把图片容器宽度从 100% 动到 50%，白底即被「腾」进视口——不是位移白底。
 * 仅在 ≥1024px 启用，移动端为静态堆叠。
 */
import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FlavorSection({
  title,
  description,
  tips,
  imgPc,
  imgMob,
  chartPc,
  chartMob,
  className,
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const container = root.querySelector(
          '.product-armour-g2-flavor-container',
        );
        const media = root.querySelector('.product-armour-g2-flavor-media');
        const img = root.querySelector('.product-armour-g2-flavor-img');
        const box = root.querySelector('.product-armour-g2-flavor-box');
        const content = root.querySelector('.product-armour-g2-flavor-content');
        if (!container || !media || !img || !box || !content) return;

        gsap.set(media, {width: '100%', flexShrink: 0});
        gsap.set(img, {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
        });
        gsap.set(box, {opacity: 0, x: 40, flexShrink: 0});
        gsap.set(content, {opacity: 0, x: 60});

        const timeline = gsap.timeline({
          defaults: {ease: 'power2.inOut'},
          scrollTrigger: {
            trigger: container,
            start: 'bottom bottom',
            end: '+=1400',
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.addLabel('reveal');
        timeline.to(media, {width: '50%', duration: 1}, 'reveal');
        timeline.to(
          box,
          {opacity: 1, x: 0, duration: 0.9, ease: 'power2.out'},
          'reveal',
        );
        timeline.to(
          content,
          {opacity: 1, x: 0, duration: 0.8, ease: 'power2.out'},
          'reveal+=0.7',
        );
        timeline.to({}, {duration: 0.4});

        return () => timeline.scrollTrigger?.kill();
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className={`product-armour-g2-flavor ${className || ''}`}
    >
      <div className="product-armour-g2-flavor-container">
        <picture className="product-armour-g2-flavor-media">
          <source media="(max-width: 1023px)" srcSet={imgMob} />
          <source media="(min-width: 1024px)" srcSet={imgPc} />
          <img className="product-armour-g2-flavor-img" src={imgPc} alt="" />
        </picture>

        <div className="product-armour-g2-flavor-box">
          <div className="product-armour-g2-flavor-content">
            <div className="product-armour-g2-flavor-text">
              <h2 className="product-armour-g2-flavor-title">{title}</h2>
              <p className="product-armour-g2-flavor-desc">{description}</p>
            </div>
            <picture className="product-armour-g2-flavor-chart">
              <source media="(max-width: 1023px)" srcSet={chartMob} />
              <source media="(min-width: 1024px)" srcSet={chartPc} />
              <img
                className="product-armour-g2-flavor-chart-img"
                src={chartPc}
                alt=""
              />
            </picture>
            {tips && <p className="product-armour-g2-flavor-tips">{tips}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
