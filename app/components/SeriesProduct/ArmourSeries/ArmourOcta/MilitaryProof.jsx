import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MilitaryProof = ({ data }) => {
  const sectionRef = useRef(null);

  const {
    mark,
    background,
    foreground,
    title,
    subtitle,
  } = data;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: false,
        },
      });

      tl.fromTo(
        '.military-proof__mark',
        {
          yPercent: 65,
          scale: 0.94,
          opacity: 0,
        },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: 'power3.out',
        }
      ).fromTo(
        '.military-proof__copy',
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.75'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="military-proof">
      <picture className="military-proof__background-picture">
        <source
          media="(max-width: 1023px)"
          srcSet={background.mobile}
        />

        <img
          className="military-proof__background"
          src={background.pc}
          alt=""
        />
      </picture>

      <div className="military-proof__mark">
        {mark}
      </div>

      {foreground && (
        <picture className="military-proof__foreground-picture">
          <source
            media="(max-width: 1023px)"
            srcSet={foreground.mobile}
          />

          <img
            className="military-proof__foreground"
            src={foreground.pc}
            alt=""
          />
        </picture>
      )}

      <div className="military-proof__copy">
        <h2 className="military-proof__title">
          {title.before}{' '}

          {title.highlight && (
            <span>{title.highlight}</span>
          )}

          {title.after && (
            <> {title.after}</>
          )}
        </h2>

        {subtitle && (
          <p className="military-proof__subtitle">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};