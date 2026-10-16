import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const DEFAULT_CALLOUTS = [
  { text: 'Innovative Cotton\nBuffer Design', x: 32, y: 96, points: [[32, 144], [151, 144], [236, 255]] },
  { text: 'Bigger Wicking\nCotton', x: 32, y: 279, points: [[32, 326], [153, 326], [194, 370]] },
  { text: 'Bigger Condensation\nStorage', x: 433, y: 415, align: 'end', points: [[433, 407], [288, 407], [236, 445]] },
  { text: 'Liquid Self-\ncirculation System', x: 433, y: 503, align: 'end', points: [[433, 491], [289, 491], [236, 530]] },
];

const Image = ({ image, mobileImage, alt = '', className = '' }) => (
  <picture className={className}>
    {mobileImage && <source media="(max-width: 1023px)" srcSet={mobileImage} />}
    {(image || mobileImage) && <img src={image || mobileImage} alt={alt} loading="eager" decoding="async" />}
  </picture>
);

const SceneCard = ({ item, className }) => (
  <article className={`vast-leak-resistance__side mobile-to-top ${className}`}>
    <div className="vast-leak-resistance__photo">
      <Image image={item.image} mobileImage={item.mobileImage} alt={item.alt || ''} />

    </div>
    <div className="vast-leak-resistance__body">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  </article>
);

export const VastLeakResistance = ({ data = {} }) => {
  const rootRef = useRef(null);
  const {
    eyebrow = 'SSS 3.0 Leak Resistance Tech',
    title = '10mL In. Mess Out.\nKeep Every Drop Inside',
    tripImage,
    mobileTripImage,
    flightImage,
    mobileFlightImage,
    techImage,
    mobileTechImage,
    trip = {},
    flight = {},
    callouts = DEFAULT_CALLOUTS,
    scrollDistance = 2,
    scrub = 0.7,
    pinOffset = 0,
  } = data;

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const root = rootRef.current;
    if (!root) return undefined;
    let disposed = false;
    let frame;
    let media;

    const queueRefresh = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
    };

    try {
      // 静态导入，插件注册与 DOM 操作只在客户端 layout effect 内执行。
      gsap.registerPlugin(ScrollTrigger);
      media = gsap.matchMedia();
      media.add({ desktop: '(min-width: 768px)', reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
        // 移动端使用 CSS 静态布局，不创建动画或 ScrollTrigger。
        if (!context.conditions.desktop || context.conditions.reduced) return;
        const pin = root.querySelector('.vast-leak-resistance__pin');
        const left = root.querySelector('.vast-leak-resistance__side--trip');
        const right = root.querySelector('.vast-leak-resistance__side--flight');
        const tech = root.querySelector('.vast-leak-resistance__tech');
        const lines = Array.from(root.querySelectorAll('[data-leak-line]'));
        const dots = root.querySelectorAll('[data-leak-dot]');
        const labels = root.querySelectorAll('[data-leak-label]');
        const startOffset = () => {
          const gap = tech.offsetLeft - left.offsetLeft - left.offsetWidth;
          return (tech.offsetWidth + gap) / 2;
        };

        gsap.set(left, { xPercent: 0, x: startOffset });
        gsap.set(right, { xPercent: 0, x: () => -startOffset() });
        // 卡片整体先藏在舞台下方，通过 stage 的 overflow:hidden 裁切。
        gsap.set(tech, { autoAlpha: 1, yPercent: 105 });
        gsap.set([...dots, ...labels], { autoAlpha: 0 });
        lines.forEach((line) => {
          const length = line.getTotalLength();
          gsap.set(line, { autoAlpha: 1, strokeDasharray: length, strokeDashoffset: length });
        });

        const offset = Math.max(0, Number(pinOffset) || 0);
        // 第一段：模块从视口底部进入，到顶部时两张场景卡片完全展开。
        const spread = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: () => `top top+=${offset}`,
            scrub: Math.max(0, Number(scrub) || 0),
            invalidateOnRefresh: true,
          },
        });
        spread.fromTo(left, { x: startOffset }, { x: 0, duration: 1, ease: 'none' }, 0);
        spread.fromTo(right, { x: () => -startOffset() }, { x: 0, duration: 1, ease: 'none' }, 0);

        // 标注只使用独立时间线。它不绑定 ScrollTrigger，也没有 scrub。
        let annotationsPlayed = false;
        const annotations = gsap.timeline({ paused: true });
        if (lines.length) {
          annotations.to(lines, {
            strokeDashoffset: 0,
            duration: 0.45,
            stagger: 0.07,
            ease: 'power1.inOut',
          });
        }
        if (dots.length) annotations.to(dots, { autoAlpha: 1, duration: 0.1 });
        // 不写重叠时间位置：全部线条画完后，才开始显示文字。
        if (labels.length) {
          annotations.to(labels, {
            autoAlpha: 1,
            duration: 0.25,
            stagger: 0.05,
            ease: 'power1.out',
          });
        }
        const resetAnnotations = () => {
          annotations.pause(0);
          annotationsPlayed = false;
        };
        const finishSpread = () => {
          const smoothing = spread.scrollTrigger.getTween();
          if (smoothing) smoothing.progress(1);
          spread.progress(1);
        };

        // 第二段：top top 定屏，中间卡片随滚动从下方移出。
        // 上移占定屏距离的 65%，剩余 35% 留给完整卡片的展示。
        const riseEnd = 0.65;
        const rise = gsap.timeline({
          onUpdate: function updateRise() {
            const trigger = this.scrollTrigger;
            if (this.time() >= riseEnd && trigger && trigger.scroll() >= trigger.start) {
              if (!annotationsPlayed) {
                annotationsPlayed = true;
                annotations.restart();
              }
            } else if (this.time() < riseEnd - 0.02 && annotationsPlayed) {
              resetAnnotations();
            }
          },
          scrollTrigger: {
            trigger: root,
            start: () => `top top+=${offset}`,
            end: () => `+=${window.innerHeight * Math.max(1, Number(scrollDistance) || 1)}`,
            pin,
            pinSpacing: true,
            scrub: Math.max(0, Number(scrub) || 0),
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: finishSpread,
            onEnterBack: finishSpread,
            onLeave: (self) => {
              // 快速滚出时只收齐上移，不快进标注的独立动画。
              const smoothing = self.getTween();
              if (smoothing) smoothing.progress(1);
            },
            onLeaveBack: (self) => {
              const smoothing = self.getTween();
              if (smoothing) smoothing.progress(1);
              resetAnnotations();
            },
          },
        });
        rise.to(tech, { yPercent: 0, duration: riseEnd, ease: 'none' }, 0);
        rise.to({}, { duration: 1 - riseEnd }, riseEnd);
      }, root);

      root.querySelectorAll('img').forEach((image) => {
        if (!image.complete) image.addEventListener('load', queueRefresh);
      });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(queueRefresh);
      queueRefresh();
    } catch (error) {
      if (media) media.revert();
      root.classList.add('is-static');
      console.error('[VastLeakResistance] Animation initialization failed:', error);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      root.querySelectorAll('img').forEach((image) => image.removeEventListener('load', queueRefresh));
      if (media) media.revert();
      root.classList.remove('is-static');
    };
  }, [scrollDistance, scrub, pinOffset, tripImage, flightImage, techImage, mobileTripImage, mobileFlightImage, mobileTechImage, callouts]);

  const tripData = {
    image: tripImage,
    mobileImage: mobileTripImage,
    title: 'Leak-Free Through the Trip',
    description: 'Separate e-liquid chamber with leak-proof sealing delivers a cleaner, smoother every puff',
    ...trip,
  };
  const flightData = {
    image: flightImage,
    mobileImage: mobileFlightImage,
    title: 'Leak-Free Through the Flight',
    description: 'Worry-free in your hand, bag or pocket',
    ...flight,
  };

  return (
    <section className="vast-leak-resistance" ref={rootRef}>
      <div className="vast-leak-resistance__pin">
        <header className="vast-leak-resistance__header">
          <p className="vast-leak-resistance__eyebrow to-top">{eyebrow}</p>
          <h2 className="vast-leak-resistance__title to-top">
            {String(title).split('\n').map((line, index) => <span key={index}>{line}</span>)}
          </h2>
        </header>
        <div className="vast-leak-resistance__stage">
          <SceneCard item={tripData} className="vast-leak-resistance__side--trip" />
          <article className="vast-leak-resistance__tech mobile-to-top" aria-label="SSS 3.0 leak resistance structure">
            <Image image={techImage} mobileImage={mobileTechImage} alt="Exploded view of the leak-resistant pod" />
            <svg className="vast-leak-resistance__annotations" viewBox="0 0 472 650" aria-label="Leak resistance technical features" role="img">
              {callouts.map((item, index) => {
                const last = item.points[item.points.length - 1];
                return (
                  <g key={index}>
                    <polyline data-leak-line="" points={item.points.map((point) => point.join(',')).join(' ')} fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle data-leak-dot="" cx={last[0]} cy={last[1]} r="2.5" fill="currentColor" />
                    <text data-leak-label="" x={item.x} y={item.y} textAnchor={item.align || 'start'} dominantBaseline="hanging" fill="currentColor">
                      {item.text.split('\n').map((line, lineIndex) => <tspan x={item.x} dy={lineIndex ? 20 : 0} key={lineIndex}>{line}</tspan>)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </article>
          <SceneCard item={flightData} className="vast-leak-resistance__side--flight" />
        </div>
      </div>
    </section>
  );
};

export default VastLeakResistance;
