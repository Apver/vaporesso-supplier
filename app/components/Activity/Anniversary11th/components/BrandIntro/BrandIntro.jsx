import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import BrandLogo from './BrandLogo';
import styles from './BrandIntro.module.scss';

const SHAPE_PATH =
  'M758.081 0H214.902C189.797 0 166.605 13.3951 154.062 35.1469L0 302.286H135.347V561.06C135.347 599.85 166.79 631.292 205.579 631.292H758.081C796.871 631.292 828.313 599.85 828.313 561.06V70.2323C828.313 31.4426 796.871 0 758.081 0Z';

const DEFAULT_COLORS = {
  page: '#ffffff',
  first: '#B6F3FD',
  second: '#6200A3',
  third: '#00ff00',
  final: '#046A38',
  logo: '#ffffff',
};

/**
 * 锁定页面滚动。
 */
function lockPageScroll(scrollStateRef) {
  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    scrollStateRef.current.locked
  ) {
    return;
  }

  const html = document.documentElement;
  const body = document.body;

  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const scrollbarWidth =
    window.innerWidth - html.clientWidth;

  scrollStateRef.current = {
    locked: true,
    scrollX,
    scrollY,

    bodyStyles: {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    },

    htmlStyles: {
      overflow: html.style.overflow,
      scrollBehavior: html.style.scrollBehavior,
    },
  };

  html.classList.add(
    'anniversary-intro-playing',
  );

  body.classList.add(
    'anniversary-intro-playing',
  );

  html.style.overflow = 'hidden';

  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.left = `-${scrollX}px`;
  body.style.right = '0';
  body.style.width = '100%';
  body.style.overflow = 'hidden';

  if (scrollbarWidth > 0) {
    body.style.paddingRight =
      `${scrollbarWidth}px`;
  }
}

/**
 * 解除页面滚动锁定，并恢复锁定前的位置和样式。
 */
function unlockPageScroll(scrollStateRef) {
  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    !scrollStateRef.current.locked
  ) {
    return;
  }

  const html = document.documentElement;
  const body = document.body;

  const {
    scrollX = 0,
    scrollY = 0,
    bodyStyles = {},
    htmlStyles = {},
  } = scrollStateRef.current;

  html.classList.remove(
    'anniversary-intro-playing',
  );

  body.classList.remove(
    'anniversary-intro-playing',
  );

  body.style.position = bodyStyles.position || '';
  body.style.top = bodyStyles.top || '';
  body.style.left = bodyStyles.left || '';
  body.style.right = bodyStyles.right || '';
  body.style.width = bodyStyles.width || '';
  body.style.overflow = bodyStyles.overflow || '';
  body.style.paddingRight = bodyStyles.paddingRight || '';
  html.style.overflow = htmlStyles.overflow || '';

  html.style.scrollBehavior = 'auto';
  window.scrollTo(scrollX, scrollY);
  html.style.scrollBehavior = htmlStyles.scrollBehavior || '';

  scrollStateRef.current = {
    locked: false,
  };
}

function IntroShape({ className }) {
  return (
    <div
      className={`${styles.shape} ${className}`}
      data-intro-shape
    >
      <svg
        viewBox="0 0 829 632"
        aria-hidden="true"
        focusable="false"
      >
        <path d={SHAPE_PATH} />
      </svg>
    </div>
  );
}

const BrandIntro = forwardRef(
  function BrandIntro(
    {
      autoplay = true,
      durationScale = 2,
      colors,
      onComplete,
    },
    ref,
  ) {
    const rootRef = useRef(null);
    const overlayRef = useRef(null);

    const gsapRef = useRef(null);
    const timelineRef = useRef(null);

    const playRef = useRef(() => { });
    const onCompleteRef = useRef(onComplete);

    const scrollStateRef = useRef({
      locked: false,
    });

    useEffect(() => {
      onCompleteRef.current = onComplete;
    }, [onComplete]);

    useImperativeHandle(
      ref,
      () => ({
        play() {
          playRef.current?.();
        },

        stop() {
          timelineRef.current?.kill();
          timelineRef.current = null;

          const gsap = gsapRef.current;
          const overlay = overlayRef.current;

          if (gsap && overlay) {
            gsap.set(overlay, {
              autoAlpha: 0,
              display: 'none',
            });

            overlay.setAttribute(
              'aria-hidden',
              'true',
            );
          }

          unlockPageScroll(
            scrollStateRef,
          );
        },
      }),
      [],
    );

    useEffect(() => {
      let cancelled = false;
      let frameId = 0;

      if (autoplay) {
        lockPageScroll(
          scrollStateRef,
        );
      }

      async function initializeAnimation() {
        const gsapModule = await import('gsap');

        if (cancelled) {
          return;
        }

        const gsap =
          gsapModule.gsap ||
          gsapModule.default?.gsap ||
          gsapModule.default;

        if (!gsap) {
          console.error('[BrandIntro] 无法加载 GSAP');
          unlockPageScroll(scrollStateRef);
          return;
        }

        gsapRef.current = gsap;

        const root = rootRef.current;
        const overlay = overlayRef.current;

        if (!root || !overlay) {
          unlockPageScroll(scrollStateRef);
          return;
        }

        const wrapper = root.querySelector('[data-intro-wrapper]');
        const shapes = gsap.utils.toArray('[data-intro-shape]', root);
        const logo = root.querySelector('[data-intro-logo]');
        const logoParts = gsap.utils.toArray('[data-logo-part]', root);

        if (!wrapper || !logo || shapes.length !== 4) {
          console.warn('[BrandIntro] 动画元素不完整');
          gsap.set(overlay, { autoAlpha: 0, display: 'none' });
          unlockPageScroll(scrollStateRef);
          return;
        }

        const logoEntryTargets =
          logoParts.length > 0
            ? logoParts
            : [logo.querySelector('svg') || logo];

        const finish = () => {
          timelineRef.current = null;
          gsap.set(overlay, {
            autoAlpha: 0,
            display: 'none',
          });
          overlay.setAttribute('aria-hidden', 'true');
          unlockPageScroll(scrollStateRef);
          onCompleteRef.current?.();
        };

        const play = () => {
          timelineRef.current?.kill();
          timelineRef.current = null;

          lockPageScroll(scrollStateRef);

          const speed = Math.max(0.5, Number(durationScale) || 2);
          const t = (value) => value * speed;

          overlay.setAttribute('aria-hidden', 'false');

          gsap.set(overlay, {
            display: 'block',
            autoAlpha: 1,
          });

          // 【修改点1】：删除了之前的 --mask-hole 重置，改为确保 wrapper 完全可见
          gsap.set(wrapper, {
            autoAlpha: 1, 
          });

          gsap.set(shapes, {
            scale: 0,
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            force3D: true,
            transformOrigin: '50% 50%',
          });

          gsap.set(logo, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            force3D: true,
            transformOrigin: '50% 50%',
          });

          gsap.set(logoEntryTargets, {
            y: 0,
            scale: 0.3,
            rotation: 0,
            autoAlpha: 0,
            force3D: true,
            transformOrigin: '50% 50%',
          });

          const timeline = gsap.timeline({
            defaults: { overwrite: 'auto' },
            onComplete: finish,
          });

          timelineRef.current = timeline;

          timeline
            .to(shapes[0], { scale: 1, duration: t(0.92), ease: 'power4.inOut' }, 0)
            .to(shapes[1], { scale: 1, duration: t(0.92), ease: 'power4.inOut' }, t(0.08))
            .to(shapes[2], { scale: 1, duration: t(0.92), ease: 'power4.inOut' }, t(0.16))
            .to(shapes[3], { scale: 1, duration: t(1), ease: 'power4.inOut' }, t(0.24))

            .to(
              logoEntryTargets,
              {
                y: 0,
                scale: 1,
                rotation: 0,
                autoAlpha: 1,
                duration: t(1),
                stagger: logoParts.length > 0 ? t(0.055) : 0,
                ease: 'power4.inOut',
              },
              t(0.24),
            )

            .add('exit', t(1.8))

            /*
             * Logo 放大并变透明穿透
             */
            .to(
              logo,
              {
                y: 0, 
                scale: 30, 
                rotation: 0,
                autoAlpha: 0, 
                filter: 'blur(0px)', 
                duration: t(0.6),
                ease: 'power2.in',
              },
              'exit',
            )

            /*
             * 【修改点2】：移除了原来的圆孔放大效果（--mask-hole: 150%）
             * 改为让背景容器 (wrapper) 与 Logo 同步淡出，直接露出视频。
             */
            .to(
              wrapper,
              {
                autoAlpha: 0, // 直接淡出背景色块
                duration: t(0.6),
                ease: 'power2.in', 
              },
              'exit', 
            )

            .to(
              overlay,
              {
                autoAlpha: 0,
                duration: t(0.18),
                ease: 'none',
              },
              `exit+=${t(0.6)}`, 
            );
        };

        playRef.current = play;

        if (!autoplay) {
          gsap.set(overlay, { autoAlpha: 0, display: 'none' });
          overlay.setAttribute('aria-hidden', 'true');
          return;
        }

        frameId = window.requestAnimationFrame(play);
      }

      initializeAnimation().catch((error) => {
        console.error('[BrandIntro] 动画初始化失败：', error);
        const gsap = gsapRef.current;
        const overlay = overlayRef.current;
        if (gsap && overlay) {
          gsap.set(overlay, { autoAlpha: 0, display: 'none' });
        }
        unlockPageScroll(scrollStateRef);
      });

      return () => {
        cancelled = true;
        if (frameId) {
          window.cancelAnimationFrame(frameId);
        }
        timelineRef.current?.kill();
        timelineRef.current = null;
        playRef.current = () => { };
        gsapRef.current = null;
        unlockPageScroll(scrollStateRef);
      };
    }, [autoplay, durationScale]);

    const mergedColors = {
      ...DEFAULT_COLORS,
      ...(colors || {}),
    };

    const cssVariables = {
      '--intro-page': mergedColors.page,
      '--intro-first': mergedColors.first,
      '--intro-second': mergedColors.second,
      '--intro-third': mergedColors.third,
      '--intro-final': mergedColors.final,
      '--intro-logo': mergedColors.logo,
    };

    return (
      <div ref={rootRef} className={styles.root} style={cssVariables}>
        <div
          ref={overlayRef}
          className={styles.overlay}
          aria-hidden="true"
          style={
            autoplay
              ? undefined
              : {
                display: 'none',
                opacity: 0,
                visibility: 'hidden',
              }
          }
        >
          <div className={styles.wrapper} data-intro-wrapper>
            <IntroShape className={styles.first} />
            <IntroShape className={styles.second} />
            <IntroShape className={styles.third} />
            <IntroShape className={styles.final} />
          </div>

          <div className={styles.logo} data-intro-logo>
            <BrandLogo />
          </div>

          <div className={styles.grain} aria-hidden="true" />
        </div>
      </div>
    );
  },
);

export default BrandIntro;