import { useEffect, useLayoutEffect, useId, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const CoreGuardArrow = () => {
  const uid = `coreguard-arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg className="vast-core-guard__arrow-svg" viewBox="0 0 20 36" fill="none" aria-hidden="true">
      <path d="M10 36L0 22H5.54444L5.55556 4.76838e-07H14.4444L14.4444 22H20L10 36Z" fill={`url(#${uid}-paint0_linear_4660_834)`} />
      <defs >
        <linearGradient id={`${uid}-paint0_linear_4660_834`} x1="10" y1="36" x2="10" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B13C00" />
          <stop offset="1" stopColor="#B13C00" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const DEFAULT_STATS = [
  { value: '32', suffix: 'x', direction: 'down', label: 'Lower Metal Leaching' },
  { value: '3', suffix: 'x', direction: 'up', label: 'Longer Lifespan' },
];

const ResponsiveImage = ({ image, mobileImage, alt = '', className = '' }) => (
  <picture className={className}>
    {mobileImage && <source media="(max-width: 1023px)" srcSet={mobileImage} />}
    {(image || mobileImage) && (
      <img src={image || mobileImage} alt={alt} loading="eager" decoding="async" />
    )}
  </picture>
);

export const VastCoreGuard = ({ data = {} }) => {
  const rootRef = useRef(null);
  const {
    eyebrow = 'CoreGuard Tech',
    title = 'Keep All 150K Looking\nAnd Tasting The Same',
    description = 'A nano-scale coating protects the heating wire from e-liquid corrosion, improving durability, stability, and flavor.',
    dayImage,
    nightImage,
    mobileDayImage,
    mobileNightImage,
    chartImage,
    mobileChartImage,
    detailImage,
    mobileDetailImage,
    detailAlt = 'CoreGuard coating protects the heating wire',
    stats = DEFAULT_STATS,
    scrollDistance = 2,
    mobileScrollDistance = 1.4,
    scrub = 0.7,
    pinOffset = 0,
    onAnimationError,
  } = data;

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const root = rootRef.current;
    if (!root) return undefined;
    let disposed = false;
    let media;
    let refreshFrame;
    let refreshAfterLoad;

    const init = () => {
      try {
        gsap.registerPlugin(ScrollTrigger);
        media = gsap.matchMedia();

        media.add(
          {
            desktop: '(min-width: 1024px)',
            mobile: '(max-width: 1023px)',
            reduced: '(prefers-reduced-motion: reduce)',
          },
          (context) => {
            const { mobile, reduced } = context.conditions;
            const stage = root.querySelector('.vast-core-guard__pin');
            const scene = root.querySelector('.vast-core-guard__scene');
            const night = root.querySelector('.vast-core-guard__photo--night');
            const chart = root.querySelector('.vast-core-guard__chart');
            if (reduced) {
              gsap.set(night, { autoAlpha: 1 });
              gsap.set(chart, { clipPath: 'inset(0 0% 0 0)', autoAlpha: 1 });
              return;
            }

            gsap.set(night, { autoAlpha: 0 });
            gsap.set(chart, { clipPath: 'inset(0 100% 0 0)', autoAlpha: 1 });

            const offset = () => Math.max(0, Number(pinOffset) || 0);
            const timeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: mobile
                ? {
                  trigger: scene,
                  start: 'top 20%',
                  toggleActions: 'play none none none',
                  once: true,
                }
                : {
                  trigger: stage,
                  start: () => `top top+=${offset()}`,
                  end: () => `+=800`,
                  pin: true,
                  pinSpacing: true,
                  scrub: false,
                  toggleActions: 'play none none reverse',
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
            });

            // 0—0.13 保留初始画面；中段切图与图表揭示；最后停留完整曲线。
            timeline.to({}, { duration: 1 }, 0);
            timeline.to(night, { autoAlpha: 1, duration: 0.46, ease: 'power1.inOut' }, 0.18);
            timeline.to(chart, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power1.out' }, 0.1);
          },
          root,
        );

        refreshAfterLoad = () => {
          if (disposed) return;
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => {
            if (!disposed) ScrollTrigger.refresh();
          });
        };
        root.querySelectorAll('img').forEach((image) => {
          if (!image.complete) image.addEventListener('load', refreshAfterLoad);
        });
        window.addEventListener('load', refreshAfterLoad);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshAfterLoad);
        refreshAfterLoad();
      } catch (error) {
        if (!disposed) {
          if (media) media.revert();
          if (onAnimationError) onAnimationError(error);
          else console.error('[VastCoreGuard] Failed to initialize animation:', error);
        }
      }
    };
    init();

    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      if (refreshAfterLoad) {
        root.querySelectorAll('img').forEach((image) => image.removeEventListener('load', refreshAfterLoad));
        window.removeEventListener('load', refreshAfterLoad);
      }
      if (media) media.revert();
    };
  }, [dayImage, nightImage, mobileDayImage, mobileNightImage, chartImage, mobileChartImage,
    detailImage, mobileDetailImage, scrollDistance, mobileScrollDistance, scrub, pinOffset, onAnimationError]);

  return (
    <section className="vast-core-guard" ref={rootRef}>
      <div className="vast-core-guard__pin">
        <div className="vast-core-guard__scene-slot">
          <div className="vast-core-guard__scene">
            <ResponsiveImage image={dayImage} mobileImage={mobileDayImage} alt="VAST in a daytime cafe" className="vast-core-guard__photo vast-core-guard__photo--day" />
            <ResponsiveImage image={nightImage} mobileImage={mobileNightImage} className="vast-core-guard__photo vast-core-guard__photo--night" />
            <div className="vast-core-guard__shade" />
            <div className="vast-core-guard__chart">
              <ResponsiveImage
                image={chartImage}
                mobileImage={mobileChartImage}
                alt="Flavor comparison between VAST and other devices over 150K puffs"
                className="vast-core-guard__chart-img"
              />
            </div>
          </div>
        </div>
        <div className="vast-core-guard__panel">
          <div className="vast-core-guard__intro">
            <p className="vast-core-guard__eyebrow to-top">{eyebrow}</p>
            <h2 className="vast-core-guard__title to-top">
              {String(title).split('\n').map((line, index) => <span key={index}>{line}</span>)}
            </h2>
            <p className="vast-core-guard__description to-top">{description}</p>
          </div>
          <div className="vast-core-guard__bottom to-top">

            <div className="vast-core-guard__detail">
              <ResponsiveImage image={detailImage} mobileImage={mobileDetailImage} alt={detailAlt} />
            </div>
            <ul className="vast-core-guard__stats">
              {stats.map((stat, index) => (
                <li className="vast-core-guard__stat" key={stat.label || index}>
                  <div className="vast-core-guard__value">
                    <strong>{stat.value}</strong><span>{stat.suffix || 'x'}</span>
                    <span className={`vast-core-guard__arrow${stat.direction === 'up' ? ' vast-core-guard__arrow--up' : ''}`} aria-hidden="true"><CoreGuardArrow /></span>
                    <span className="vast-core-guard__sr-only">{stat.direction === 'up' ? ' increase' : ' decrease'}</span>
                  </div>
                  <p className="vast-core-guard__stat-label">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VastCoreGuard;
