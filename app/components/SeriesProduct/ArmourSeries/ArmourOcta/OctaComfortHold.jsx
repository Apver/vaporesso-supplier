import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const OctaComfortHold = ({ data }) => {
  const sectionRef = useRef(null);
  const handRef = useRef(null);

  const {
    eyebrow,
    title,
    description,
    image,
  } = data;

useLayoutEffect(() => {
  const section = sectionRef.current;
  const hand = handRef.current;

  if (!section || !hand) return;

  const ctx = gsap.context(() => {
    const MAX_X = 16;
    const MAX_Y = 10;
    const MAX_ROTATE = 0.8;

    gsap.set(hand, {
      x: 0,
      y: 0,
      rotation: 0,
      transformOrigin: '50% 70%',
    });

    const moveX = gsap.quickTo(hand, 'x', {
      duration: 0.65,
      ease: 'power3.out',
    });

    const moveY = gsap.quickTo(hand, 'y', {
      duration: 0.65,
      ease: 'power3.out',
    });

    const rotate = gsap.quickTo(hand, 'rotation', {
      duration: 0.75,
      ease: 'power3.out',
    });

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return;

      const rect = section.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) / rect.width - 0.5) * 2;

      const y =
        ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      moveX(x * MAX_X);
      moveY(y * MAX_Y);
      rotate(x * MAX_ROTATE);
    };

    const handlePointerLeave = () => {
      moveX(0);
      moveY(0);
      rotate(0);
    };

    section.addEventListener(
      'pointermove',
      handlePointerMove
    );

    section.addEventListener(
      'pointerleave',
      handlePointerLeave
    );

    return () => {
      section.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      section.removeEventListener(
        'pointerleave',
        handlePointerLeave
      );
    };
  }, section);

  return () => {
    ctx.revert();
  };
}, []);

  return (
    <section
      ref={sectionRef}
      className="octa-comfort"
    >
      <div className="octa-comfort__container">

        <div className="octa-comfort__header">
          {eyebrow && (
            <div className="octa-comfort__eyebrow to-top">
              {eyebrow}
            </div>
          )}

          <h2 className="octa-comfort__title to-top">
            {title}
          </h2>
        </div>

        <div className="octa-comfort__media to-top">
          <picture className="octa-comfort__background">
            {image?.background?.mobile && (
              <source
                media="(max-width: 1023px)"
                srcSet={image.background.mobile}
              />
            )}

            <img
              src={image?.background?.pc}
              alt=""
              className="octa-comfort__background-image"
            />
          </picture>

          <picture
            ref={handRef}
            className="octa-comfort__hand"
          >
            {image?.hand?.mobile && (
              <source
                media="(max-width: 1023px)"
                srcSet={image.hand.mobile}
              />
            )}

            <img
              src={image?.hand?.pc}
              alt=""
              className="octa-comfort__hand-image"
            />
          </picture>
        </div>

        {description && (
          <p className="octa-comfort__description to-top">
            {description}
          </p>
        )}

      </div>
    </section>
  );
};