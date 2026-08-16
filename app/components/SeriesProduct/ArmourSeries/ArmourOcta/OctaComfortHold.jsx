import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const OctaComfortHold = ({ data }) => {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const backgroundRef = useRef(null);
  const handRef = useRef(null);

  const {
    eyebrow,
    title,
    description,
    image,
  } = data;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const background = backgroundRef.current;
    const hand = handRef.current;

    if (!section || !media || !background || !hand) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // 手的移动幅度
        const HAND_X = 28;
        const HAND_Y = 10;
        const HAND_ROTATE = 1.2;

        // 背景反方向移动幅度
        const BG_X = 14;
        const BG_Y = 10;

        // 两层稍微放大，防止移动时露出边缘
        gsap.set(hand, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1.06,
          transformOrigin: '50% 70%',
        });

        gsap.set(background, {
          x: 0,
          y: 0,
          scale: 1.06,
          transformOrigin: '50% 50%',
        });

        const handX = gsap.quickTo(hand, 'x', {
          duration: 0.65,
          ease: 'power3.out',
        });

        const handY = gsap.quickTo(hand, 'y', {
          duration: 0.65,
          ease: 'power3.out',
        });

        const handRotate = gsap.quickTo(hand, 'rotation', {
          duration: 0.75,
          ease: 'power3.out',
        });

        const bgX = gsap.quickTo(background, 'x', {
          duration: 0.9,
          ease: 'power3.out',
        });

        const bgY = gsap.quickTo(background, 'y', {
          duration: 0.9,
          ease: 'power3.out',
        });

        const handlePointerMove = (event) => {
          if (event.pointerType === 'touch') return;

          const rect = media.getBoundingClientRect();

          // 鼠标位置映射为 -1 ~ 1
          const x = gsap.utils.clamp(
            -1,
            1,
            ((event.clientX - rect.left) / rect.width - 0.5) * 2
          );

          const y = gsap.utils.clamp(
            -1,
            1,
            ((event.clientY - rect.top) / rect.height - 0.5) * 2
          );

          // 手跟随鼠标
          handX(x * HAND_X);
          handY(y * HAND_Y);
          handRotate(x * HAND_ROTATE);

          // 背景反方向移动
          bgX(x * -BG_X);
          bgY(y * -BG_Y);
        };

        const handlePointerLeave = () => {
          handX(0);
          handY(0);
          handRotate(0);

          bgX(0);
          bgY(0);
        };

        media.addEventListener(
          'pointermove',
          handlePointerMove
        );

        media.addEventListener(
          'pointerleave',
          handlePointerLeave
        );

        return () => {
          media.removeEventListener(
            'pointermove',
            handlePointerMove
          );

          media.removeEventListener(
            'pointerleave',
            handlePointerLeave
          );
        };
      });

      // mobile 不做鼠标视差，同时重置 transform
      mm.add('(max-width: 1023px)', () => {
        gsap.set([background, hand], {
          clearProps: 'transform',
        });
      });

      return () => {
        mm.revert();
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

        <div
          ref={mediaRef}
          className="octa-comfort__media to-top"
        >
          <picture
            ref={backgroundRef}
            className="octa-comfort__background"
          >
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