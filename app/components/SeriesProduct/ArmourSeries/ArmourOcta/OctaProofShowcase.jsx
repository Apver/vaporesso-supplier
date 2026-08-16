import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OctaProofShowcase = ({ data }) => {
  const sectionRef = useRef(null);
  const boxRef = useRef(null);
  const innerRef = useRef(null);
  const bodyRef = useRef(null);
  const stageRef = useRef(null);

  const {
    title,
    subtitle,
    note,
    slides = [],
  } = data;

useLayoutEffect(() => {
  const section = sectionRef.current;
  const box = boxRef.current;
  const inner = innerRef.current;
  const stage = stageRef.current;

  if (
    !section ||
    !box ||
    !inner ||
    !stage ||
    slides.length <= 1
  ) {
    return;
  }

  const ctx = gsap.context(() => {
    const slideEls = gsap.utils.toArray(
      '.octa-proof-showcase__slide',
      section
    );

    const dotEls = gsap.utils.toArray(
      '.octa-proof-showcase__dot',
      section
    );

    const HOLD = 0.2;
    const OUT_DURATION = 0.7;
    const IN_DURATION = 0.75;
    const IN_DELAY = 0.03;

    const MOBILE_MOVE_DURATION = 1;

    const setActiveDot = (index) => {
      dotEls.forEach((dot, dotIndex) => {
        dot.classList.toggle(
          'is-active',
          dotIndex === index
        );
      });
    };

    const resetSlides = () => {
      gsap.set(slideEls, {
        autoAlpha: 0,
        yPercent: 105,
        rotationX: -72,
        z: -40,
        opacity: 0.75,
        transformOrigin: '50% 0%',
        transformPerspective: 1800,
        transformStyle: 'preserve-3d',
      });

      gsap.set(slideEls[0], {
        autoAlpha: 1,
        yPercent: 0,
        rotationX: 0,
        z: 0,
        opacity: 1,
      });

      slideEls.forEach((slide, index) => {
        gsap.set(slide, {
          zIndex: slides.length - index,
        });
      });

      setActiveDot(0);
    };

    const createTimeline = (isMobile) => {
      resetSlides();
      gsap.set(inner, {
        y: 0,
      });

      const tl = gsap.timeline({
        paused: true,
      });

      if (isMobile) {
        tl.to(inner, {
y: () => {
  const stageRect =
    stage.getBoundingClientRect();

  const currentY =
    Number(
      gsap.getProperty(inner, 'y')
    ) || 0;
  const originalStageTop =
    stageRect.top - currentY;

  const stageCenter =
    originalStageTop +
    stageRect.height / 2;

  const STICKY_TOP = 44;

  const viewportHeight =
    window.innerHeight;

  const visibleCenter =
    STICKY_TOP +
    (viewportHeight - STICKY_TOP) / 2;

  return visibleCenter - stageCenter;
},

          duration: MOBILE_MOVE_DURATION,
          ease: 'power2.inOut',
        });

        tl.to({}, {
          duration: HOLD,
        });
      } else {
        /*
         * PC 不移动
         */
        tl.to({}, {
          duration: HOLD,
        });
      }

      const activeTimes = [
        isMobile
          ? MOBILE_MOVE_DURATION + HOLD
          : 0,
      ];

      for (
        let i = 1;
        i < slideEls.length;
        i += 1
      ) {
        const current = slideEls[i - 1];
        const next = slideEls[i];

        const transitionStart =
          tl.duration();

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
            autoAlpha: 1,
            yPercent: 0,
            rotationX: 0,
            z: 0,
            opacity: 1,
          },
          transitionStart +
            IN_DELAY +
            IN_DURATION
        );

        activeTimes.push(
          transitionStart +
            IN_DELAY +
            IN_DURATION * 0.5
        );

        tl.to({}, {
          duration: HOLD,
        });
      }

      return {
        tl,
        activeTimes,
      };
    };

    const createScrollAnimation = (
      isMobile
    ) => {
      const { tl, activeTimes } =
        createTimeline(isMobile);

      const totalDuration =
        tl.duration();

      const scrollTrigger =
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          endTrigger: section,
          end: 'bottom bottom',

          scrub: 0.7,

          animation: tl,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const currentTime =
              self.progress *
              totalDuration;

            let activeIndex = 0;

            for (
              let i = 1;
              i < activeTimes.length;
              i += 1
            ) {
              if (
                currentTime >=
                activeTimes[i]
              ) {
                activeIndex = i;
              } else {
                break;
              }
            }

            activeIndex = Math.max(
              0,
              Math.min(
                slideEls.length - 1,
                activeIndex
              )
            );

            setActiveDot(
              activeIndex
            );
          },

          onLeaveBack: () => {
            setActiveDot(0);
          },
        });

      return () => {
        scrollTrigger.kill();
        tl.kill();

        gsap.set(inner, {
          clearProps: 'transform',
        });
      };
    };

    const mm = gsap.matchMedia();

    mm.add(
      '(min-width: 1024px)',
      () => {
        return createScrollAnimation(
          false
        );
      }
    );
    mm.add(
      '(max-width: 1023px)',
      () => {
        return createScrollAnimation(
          true
        );
      }
    );

    return () => {
      mm.revert();
    };
  }, section);

  return () => {
    ctx.revert();
  };
}, [slides]);

  const scrollHeight =
    slides.length > 1
      ? `${100 + (slides.length - 1) * 115}svh`
      : '100svh';

  return (
    <section
      ref={sectionRef}
      className="octa-proof-showcase-section"
      style={{
        '--octa-proof-scroll-height': scrollHeight,
      }}
    >
      <div
        ref={boxRef}
        className="octa-proof-showcase"
      >
        <div
          ref={innerRef}
          className="octa-proof-showcase__inner"
        >
          <div className="octa-proof-showcase__header">
            <h2 className="octa-proof-showcase__title">
              {title?.before}

              {title?.highlight && (
                <>
                  {' '}
                  <span>
                    {title.highlight}
                  </span>
                </>
              )}

              {title?.after && (
                <>
                  {' '}
                  {title.after}
                </>
              )}
            </h2>

            {subtitle && (
              <p className="octa-proof-showcase__subtitle">
                {subtitle}
              </p>
            )}
          </div>
          <div
            ref={bodyRef}
            className="octa-proof-showcase__body"
          >
            <div
              ref={stageRef}
              className="octa-proof-showcase__stage"
            >
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
                      loading={
                        index === 0
                          ? 'eager'
                          : 'lazy'
                      }
                    />
                  </picture>

                  <div className="octa-proof-showcase__slide-content">
                    <h3 className="octa-proof-showcase__slide-title">
                      {item.title?.highlight && (
                        <span>
                          {
                            item.title
                              .highlight
                          }
                        </span>
                      )}

                      {item.title?.text}
                    </h3>

                    {item.desc && (
                      <p className="octa-proof-showcase__slide-desc">
                        {item.desc}
                      </p>
                    )}

                    {item.metrics?.length >
                      0 && (
                      <div className="octa-proof-showcase__metrics">
                        {item.metrics.map(
                          (
                            metric,
                            metricIndex
                          ) => (
                            <div
                              key={`${item.key}-${metricIndex}`}
                              className="octa-proof-showcase__metric"
                            >
                              <div className="octa-proof-showcase__metric-value">
                                {
                                  metric.value
                                }

                                {metric.suffix && (
                                  <span>
                                    {
                                      metric.suffix
                                    }
                                  </span>
                                )}
                              </div>

                              <div className="octa-proof-showcase__metric-label">
                                {
                                  metric.label
                                }
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="octa-proof-showcase__dots">
                {slides.map(
                  (item, index) => (
                    <span
                      key={item.key}
                      className={[
                        'octa-proof-showcase__dot',
                        index === 0
                          ? 'is-active'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    />
                  )
                )}
              </div>
            </div>

            {note && (
              <p className="octa-proof-showcase__note">
                {note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};