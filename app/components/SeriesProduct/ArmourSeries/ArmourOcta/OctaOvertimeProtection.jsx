import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OctaOvertimeProtection = ({ data }) => {
  const sectionRef = useRef(null);

  const {
    title,
    image,
    level1,
    level2,
  } = data;

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const l1Image = section.querySelector(
        '.octa-overtime__device--l1'
      );

      const l2Image = section.querySelector(
        '.octa-overtime__device--l2'
      );

      const l1 = section.querySelector(
        '.octa-overtime__level--l1'
      );

      const l2 = section.querySelector(
        '.octa-overtime__level--l2'
      );

      const l1Name = section.querySelector(
        '.octa-overtime__level--l1 .octa-overtime__level-name'
      );

      const l2Name = section.querySelector(
        '.octa-overtime__level--l2 .octa-overtime__level-name'
      );

      const l1Accent = section.querySelector(
        '.octa-overtime__level--l1 .octa-overtime__level-accent'
      );

      const l2Accent = section.querySelector(
        '.octa-overtime__level--l2 .octa-overtime__level-accent'
      );

      if (
        !l1Image ||
        !l2Image ||
        !l1 ||
        !l2 ||
        !l1Name ||
        !l2Name
      ) {
        return;
      }

      let currentState = null;

      const setL1 = () => {
        if (currentState === 'l1') return;

        currentState = 'l1';

        gsap.set(l1Image, {
          autoAlpha: 1,
        });

        gsap.set(l2Image, {
          autoAlpha: 0,
        });

        gsap.set(l1, {
          opacity: 1,
        });

        gsap.set(l2, {
          opacity: 0.45,
        });

        gsap.set(l1Name, {
          color: '#FE5A11',
        });

        gsap.set(l2Name, {
          color: '#FFFFFF',
        });

        if (l1Accent) {
          gsap.set(l1Accent, {
            color: '#FE5A11',
          });
        }

        if (l2Accent) {
          gsap.set(l2Accent, {
            color: '#FFFFFF',
          });
        }
      };

      const setL2 = () => {
        if (currentState === 'l2') return;

        currentState = 'l2';

        gsap.set(l1Image, {
          autoAlpha: 0,
        });

        gsap.set(l2Image, {
          autoAlpha: 1,
        });

        gsap.set(l1, {
          opacity: 0.45,
        });

        gsap.set(l2, {
          opacity: 1,
        });

        gsap.set(l1Name, {
          color: '#FFFFFF',
        });

        gsap.set(l2Name, {
          color: '#FE5A11',
        });

        if (l1Accent) {
          gsap.set(l1Accent, {
            color: '#FFFFFF',
          });
        }

        if (l2Accent) {
          gsap.set(l2Accent, {
            color: '#FE5A11',
          });
        }
      };

      setL1();

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        refreshPriority: 0,

        onUpdate: (self) => {
          if (self.progress >= 0.5) {
            setL2();
          } else {
            setL1();
          }
        },

        onEnter: (self) => {
          if (self.progress >= 0.5) {
            setL2();
          } else {
            setL1();
          }
        },

        onEnterBack: (self) => {
          if (self.progress >= 0.5) {
            setL2();
          } else {
            setL1();
          }
        },

        onLeaveBack: () => {
          setL1();
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="octa-overtime-scroll"
    >
      <div className="octa-overtime">
        <div className="octa-overtime__inner">
          <div className="octa-overtime__content">
            <h2 className="octa-overtime__title">
              {title}
            </h2>

            <div className="octa-overtime__levels">
              <div className="octa-overtime__level octa-overtime__level--l1">
                <div className="octa-overtime__level-name">
                  {level1.name}
                </div>

                {level1.description && (
                  <div className="octa-overtime__level-desc">
                    {level1.description}
                  </div>
                )}

                {level1.accent && (
                  <div className="octa-overtime__level-accent">
                    {level1.accent}
                  </div>
                )}
              </div>

              <div className="octa-overtime__level octa-overtime__level--l2">
                <div className="octa-overtime__level-name">
                  {level2.name}
                </div>

                {level2.description && (
                  <div className="octa-overtime__level-desc">
                    {level2.description}
                  </div>
                )}

                {level2.accent && (
                  <div className="octa-overtime__level-accent">
                    {level2.accent}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="octa-overtime__device-wrap">
            <picture className="octa-overtime__device-picture octa-overtime__device--l1">
              <source
                media="(max-width: 1023px)"
                srcSet={image.l1.mobile}
              />

              <img
                className="octa-overtime__device-image"
                src={image.l1.pc}
                alt=""
                loading="eager"
              />
            </picture>

            <picture className="octa-overtime__device-picture octa-overtime__device--l2">
              <source
                media="(max-width: 1023px)"
                srcSet={image.l2.mobile}
              />

              <img
                className="octa-overtime__device-image"
                src={image.l2.pc}
                alt=""
                loading="eager"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
};