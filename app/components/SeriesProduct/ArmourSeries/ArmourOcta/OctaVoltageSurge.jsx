import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heartbeatPath = `
  M0 108
  H28
  L40 76
  L52 142
  L64 42
  L77 150
  L90 82
  L104 108
  H170
  L190 84
  L210 126
  L232 56
  L252 138
  L272 108
  H338
  L350 82
  L360 134
  L370 30
  L380 152
  L390 64
  L402 108
  H500
  L524 58
  L550 144
  L578 74
  L604 108
  H668
  L684 72
  L698 138
  L712 22
  L726 152
  L740 70
  L756 108
  H824
  L844 84
  L864 132
  L886 64
  L906 108
  H968
  L982 82
  L992 136
  L1002 34
  L1012 150
  L1022 68
  L1036 108
  H1110
  L1128 78
  L1148 132
  L1168 60
  L1188 108
  H1258
  L1270 78
  L1282 140
  L1294 28
  L1306 150
  L1318 72
  L1332 108
  H1416
  L1438 54
  L1462 142
  L1490 70
  L1516 108
  H1592
  L1608 74
  L1620 138
  L1632 18
  L1644 152
  L1656 72
  L1670 108
  H1760
  L1780 84
  L1800 128
  L1820 62
  L1840 108
  H1920
`;

export const OctaVoltageSurge = ({ data }) => {
  const sectionRef = useRef(null);
  const pulsePathRef = useRef(null);

  const {
    image,
    title,
    description,
    threshold,
    note,
  } = data;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pulsePath = pulsePathRef.current;

    if (!section || !pulsePath) return;

    const ctx = gsap.context(() => {
      const pathLength = pulsePath.getTotalLength();

      gsap.set(pulsePath, {
        strokeDasharray: `${pathLength * 0.5} ${pathLength * 0.5}`,
        strokeDashoffset: 0,
        opacity: 0,
      });

      gsap.set('.octa-voltage-surge__copy', {
        y: 50,
        opacity: 0,
      });

      gsap.set('.octa-voltage-surge__device-picture', {
        y: 70,
        scale: 0.94,
        opacity: 0,
      });

      gsap.set('.octa-voltage-surge__threshold', {
        y: 40,
        opacity: 0,
      });

      gsap.set('.octa-voltage-surge__note', {
        y: 20,
        opacity: 0,
      });
      const pulseTween = gsap.to(pulsePath, {
        strokeDashoffset: -pathLength,
        duration: 2.5,
        ease: 'none',
        repeat: -1,
        paused: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            pulseTween.play();
          },
        },
      });

      tl.to(
        pulsePath,
        {
          opacity: 1,
          duration: 0.4,
          ease: 'none',
        },
        0
      );

      tl.to(
        '.octa-voltage-surge__copy',
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
        0.15
      );

      tl.to(
        '.octa-voltage-surge__device-picture',
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        },
        0.2
      );

      tl.to(
        '.octa-voltage-surge__threshold',
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
        0.35
      );

      tl.to(
        '.octa-voltage-surge__note',
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.5
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="octa-voltage-surge"
    >
      <svg
        className="octa-voltage-surge__wave"
        viewBox="0 0 1920 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pulsePathRef}
          className="octa-voltage-surge__wave-pulse"
          d={heartbeatPath}
          fill="none"
        />
      </svg>

      <div className="octa-voltage-surge__inner to-top">
        <div className="octa-voltage-surge__copy">
          <h2 className="octa-voltage-surge__title">
            {title}
          </h2>

          {description && (
            <p className="octa-voltage-surge__desc">
              {description}
            </p>
          )}
        </div>

        <picture className="octa-voltage-surge__device-picture">
          <source
            media="(max-width: 1023px)"
            srcSet={image.mobile}
          />

          <img
            className="octa-voltage-surge__device"
            src={image.pc}
            alt=""
          />
        </picture>

        <div className="octa-voltage-surge__threshold">
          <div className="octa-voltage-surge__threshold-value">
            {threshold.operator && (
              <span className="octa-voltage-surge__threshold-operator">
                {threshold.operator}
              </span>
            )}

            <span className="octa-voltage-surge__threshold-number">
              {threshold.value}
            </span>

            {threshold.unit && (
              <span className="octa-voltage-surge__threshold-unit">
                {threshold.unit}
              </span>
            )}
          </div>

          {threshold.description && (
            <p className="octa-voltage-surge__threshold-desc">
              {threshold.description}
            </p>
          )}
        </div>

        {note && (
          <p className="octa-voltage-surge__note">
            {note}
          </p>
        )}
      </div>
    </section>
  );
};