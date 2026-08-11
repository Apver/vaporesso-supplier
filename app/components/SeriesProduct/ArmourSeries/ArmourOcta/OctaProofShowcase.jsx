import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OctaProofShowcase = ({ data }) => {
  const sectionRef = useRef(null);

  const {
    title,
    subtitle,
    note,
    slides = [],
  } = data;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || slides.length <= 1) return;

    const ctx = gsap.context(() => {
      const slideEls = gsap.utils.toArray(
        '.octa-proof-showcase__slide'
      );

      const dotEls = gsap.utils.toArray(
        '.octa-proof-showcase__dot'
      );

      gsap.set(slideEls, {
        autoAlpha: 0,
        yPercent: 105,
        rotationX: -72,
        z: -40,
        transformOrigin: '50% 0%',
        transformPerspective: 1800,
        transformStyle: 'preserve-3d',
      });

      gsap.set(slideEls[0], {
        autoAlpha: 1,
        yPercent: 0,
        rotationX: 0,
        z: 0,
      });

      slideEls.forEach((slide, index) => {
        gsap.set(slide, {
          zIndex: slides.length - index,
        });
      });

      const setActiveDot = (index) => {
        dotEls.forEach((dot, dotIndex) => {
          dot.classList.toggle(
            'is-active',
            dotIndex === index
          );
        });
      };

      const HOLD = 0.35;
      const OUT_DURATION = 0.7;
      const IN_DURATION = 0.75;
      const IN_DELAY = 0.03;

      const tl = gsap.timeline();

      tl.to({}, { duration: HOLD });

      for (let i = 1; i < slideEls.length; i += 1) {
        const current = slideEls[i - 1];
        const next = slideEls[i];

        const transitionStart = tl.duration();

        tl.set(
          next,
          {
            autoAlpha: 1,
            yPercent: 100,
            rotationX: -72,
            z: -40,
            opacity: 0.75,
            transformOrigin: '50% 0%',
            zIndex: slides.length + i,
          },
          transitionStart
        );

        tl.to(
          current,
          {
            yPercent: -100,
            rotationX: 72,
            z: -40,
            opacity: 0.75,
            transformOrigin: '50% 100%',
            duration: OUT_DURATION,
            ease: 'none',
          },
          transitionStart
        );

        tl.to(
          next,
          {
            yPercent: 0,
            rotationX: 0,
            z: 0,
            opacity: 1,
            duration: IN_DURATION,
            ease: 'none',
          },
          transitionStart + IN_DELAY
        );

        tl.set(
          current,
          {
            autoAlpha: 0,
          },
          transitionStart + OUT_DURATION
        );

        tl.set(
          next,
          {
            yPercent: 0,
            rotationX: 0,
            z: 0,
            opacity: 1,
          },
          transitionStart + IN_DELAY + IN_DURATION
        );

        tl.to({}, {
          duration: HOLD,
        });
      }

      const totalDuration = tl.duration();

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () =>
          `+=${window.innerHeight * (slides.length * 1.15)}`,
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        animation: tl,

        onUpdate: (self) => {
          const time = self.progress * totalDuration;

          const segmentDuration =
            HOLD +
            Math.max(
              OUT_DURATION,
              IN_DELAY + IN_DURATION
            );

          let index = Math.floor(
            (time + HOLD * 0.5) / segmentDuration
          );

          index = Math.max(
            0,
            Math.min(slides.length - 1, index)
          );

          setActiveDot(index);
        },
      });

      setActiveDot(0);
    }, section);

    return () => ctx.revert();
  }, [slides]);

  return (
    <section
      ref={sectionRef}
      className="octa-proof-showcase"
    >
      <div className="octa-proof-showcase__inner">
        <div className="octa-proof-showcase__header">
          <h2 className="octa-proof-showcase__title">
            {title?.before}

            {title?.highlight && (
              <>
                {' '}
                <span>{title.highlight}</span>
              </>
            )}

            {title?.after && (
              <> {title.after}</>
            )}
          </h2>

          {subtitle && (
            <p className="octa-proof-showcase__subtitle">
              {subtitle}
            </p>
          )}
        </div>

        <div className="octa-proof-showcase__stage">
          {slides.map((item, index) => (
            <div
              key={item.key}
              className="octa-proof-showcase__slide"
            >
              <picture className="octa-proof-showcase__picture">
                <source
                  media="(max-width: 1023px)"
                  srcSet={item.image.mobile}
                />

                <img
                  className="octa-proof-showcase__image"
                  src={item.image.pc}
                  alt={item.alt || ''}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </picture>

              <div className="octa-proof-showcase__slide-content">
                <h3 className="octa-proof-showcase__slide-title">
                  <span>{item.title.highlight}</span>
                  {item.title.text}
                </h3>

                {item.desc && (
                  <p className="octa-proof-showcase__slide-desc">
                    {item.desc}
                  </p>
                )}

                {item.metrics?.length > 0 && (
                  <div className="octa-proof-showcase__metrics">
                    {item.metrics.map((metric, metricIndex) => (
                      <div
                        key={`${item.key}-${metricIndex}`}
                        className="octa-proof-showcase__metric"
                      >
                        <div className="octa-proof-showcase__metric-value">
                          {metric.value}

                          {metric.suffix && (
                            <span>{metric.suffix}</span>
                          )}
                        </div>

                        <div className="octa-proof-showcase__metric-label">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="octa-proof-showcase__dots">
            {slides.map((item, index) => (
              <span
                key={item.key}
                className={[
                  'octa-proof-showcase__dot',
                  index === 0 ? 'is-active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            ))}
          </div>
        </div>

        {note && (
          <p className="octa-proof-showcase__note">
            {note}
          </p>
        )}
      </div>
    </section>
  );
};