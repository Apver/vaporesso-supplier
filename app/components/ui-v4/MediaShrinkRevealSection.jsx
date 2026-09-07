import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import '~/styles/ui-v4/media-shrink-reveal.scss';

gsap.registerPlugin(ScrollTrigger);

const BG_POSITION_MAP = {
  left: 'left center',
  right: 'right center',
  middle: 'center center',
};

export function MediaShrinkRevealSection({
  imgPc,
  imgMob,
  bgPosition = 'left', // left | right | middle
  subtitle,
  title,
  description,
  tips,
  chartImgMob,
  chartImgPc,
  className,
}) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const objectPosition = BG_POSITION_MAP[bgPosition] || BG_POSITION_MAP.left;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const container = root.querySelector(
          '.ui-v4-media-shrink-reveal__container',
        );
        const img = root.querySelector('.ui-v4-media-shrink-reveal__img');
        const media = img?.closest('picture');
        const box = root.querySelector('.ui-v4-media-shrink-reveal__box');
        const content = root.querySelector(
          '.ui-v4-media-shrink-reveal__content',
        );

        if (!container || !media || !img || !box || !content) return;

        gsap.set(media, {width: '100%', flexShrink: 0});
        gsap.set(img, {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
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

        timeline.addLabel('showBox');
        timeline.to(media, {width: '50vw', duration: 1}, 'showBox');
        timeline.to(
          box,
          {opacity: 1, x: 0, duration: 0.9, ease: 'power2.out'},
          'showBox',
        );
        timeline.to(
          content,
          {opacity: 1, x: 0, duration: 0.8, ease: 'power2.out'},
          'showBox+=0.7',
        );
        timeline.to({}, {duration: 0.4});

        return () => timeline.scrollTrigger?.kill();
      });

      mm.add('(max-width: 1023px)', () => {
        const container = root.querySelector(
          '.ui-v4-media-shrink-reveal__container',
        );
        const img = root.querySelector('.ui-v4-media-shrink-reveal__img');
        const content = root.querySelector(
          '.ui-v4-media-shrink-reveal__content',
        );
        const contentItems = content
          ? Array.from(content.children).reverse()
          : [];

        if (!container || !img || !content) return;

        gsap.set(contentItems, {opacity: 0, y: '20%'});
        gsap.set(img, {opacity: 0, y: '20%'});

        const timeline = gsap.timeline({
          defaults: {
            duration: 0.7,
            ease: 'power2.out',
          },
          scrollTrigger: {
            trigger: container,
            start: 'top 70%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        timeline.to(contentItems, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
        });
        timeline.to(img, {opacity: 1, y: 0}, '-=0.35');

        return () => timeline.scrollTrigger?.kill();
      });
    }, root);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [bgPosition]);

  return (
    <media-shrink-reveal-animation
      ref={wrapRef}
      className={`ui-v4-media-shrink-reveal${className ? ` ${className}` : ''}`}
    >
      <section className="ui-v4-media-shrink-reveal__container">
        <picture>
          <source media="(max-width: 1023px)" srcSet={imgMob} />
          <source media="(min-width: 1024px)" srcSet={imgPc} />
          <img className="ui-v4-media-shrink-reveal__img" src={imgPc} alt="" />
        </picture>
        <div className="ui-v4-media-shrink-reveal__box">
          <div className="ui-v4-media-shrink-reveal__content">
            {subtitle && <h4 className="ui-v4-subtitle">{subtitle}</h4>}
            {title && <h3 className="ui-v4-title">{title}</h3>}
            {description && (
              <p className="ui-v4-description s-hide">{description}</p>
            )}
            {(chartImgMob || chartImgPc) && (
              <picture>
                <source media="(max-width: 1023px)" srcSet={chartImgMob} />
                <source media="(min-width: 1024px)" srcSet={chartImgPc} />
                <img
                  className="ui-v4-media-shrink-reveal__chart"
                  src={chartImgPc}
                  alt=""
                />
              </picture>
            )}

            {description && (
              <p className="ui-v4-description x-hide">{description}</p>
            )}
            {tips && <p className="ui-v4-tips">{tips}</p>}
          </div>
        </div>
      </section>
    </media-shrink-reveal-animation>
  );
}
