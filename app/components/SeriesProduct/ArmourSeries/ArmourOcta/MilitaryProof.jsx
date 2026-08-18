import {
  useLayoutEffect,
  useRef,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MilitaryProof = ({
  data,
  className = '',
  enableBoundaryTextEffect = false,
}) => {
  const sectionRef = useRef(null);

  /*
   * 外层 copy
   * 只负责 absolute 定位
   */
  const copyRef = useRef(null);

  /*
   * 专门负责 ScrollTrigger pin
   */
  const copyPinRef = useRef(null);

  const {
    mark,
    background,
    foreground,
    title,
    subtitle,
  } = data;

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const copy =
      copyRef.current;

    const copyPin =
      copyPinRef.current;

    if (!section) return;

    let refreshHandler = null;

    const ctx = gsap.context(() => {
      /*
       * ======================================
       * 入场动画
       * ======================================
       */
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
      );

      /*
       * 普通模式：
       * 继续动画原来的 copy
       *
       * 特殊模式：
       * 动画 copy-motion
       *
       */
      tl.fromTo(
        enableBoundaryTextEffect
          ? '.military-proof__copy-motion'
          : '.military-proof__copy',
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

      /*
       * ======================================
       * 没开启特殊效果
       *
       * 下面全部不执行
       * ======================================
       */
      if (
        !enableBoundaryTextEffect ||
        !copy ||
        !copyPin
      ) {
        return;
      }

      /*
       * ======================================
       * 计算图片边界穿过文字的位置
       * ======================================
       */
      const updateTextClip = () => {
        const sectionRect =
          section.getBoundingClientRect();

        /*
         * 使用真正被 pin 的元素
         * 获取文字当前视觉位置
         */
        const copyRect =
          copyPin.getBoundingClientRect();

        /*
         * 图片 bottom
         * 相对于文字 top 的距离
         */
        const rawSplit =
          sectionRect.bottom -
          copyRect.top;

        const split =
          gsap.utils.clamp(
            0,
            copyRect.height,
            rawSplit
          );

        /*
         * CSS 变量还是写到 copy
         *
         * 黑白两层都在 copy 里面
         */
        copy.style.setProperty(
          '--proof-split',
          `${split}px`
        );
      };

      updateTextClip();
      const remToPx = (rem) => {
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return rem * rootFontSize;
      };
      const getPinEndGap = () => {
        if (window.innerWidth <= 1023) {
          return -remToPx(1.6);
        }
        if (window.innerWidth <= 1450) {
          return -128;
        }
        return -160;
      };
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom 72%',
        // end: 'bottom 38%',
        end: () => {
          const sectionRect =section.getBoundingClientRect();
          const pinRect =copyPin.getBoundingClientRect();
          const currentGap =sectionRect.bottom - pinRect.top;
          const distance =currentGap - getPinEndGap();
          return `+=${Math.max(0,distance)}`;
        },
        pin: copyPin,
        pinSpacing: false,
        invalidateOnRefresh: true,
        onUpdate:updateTextClip,
        onRefresh:updateTextClip,
        onEnter:updateTextClip,
        onEnterBack:updateTextClip,
        onLeave:updateTextClip,
        onLeaveBack:updateTextClip,
      });
      refreshHandler = () => {
        updateTextClip();
      };

      ScrollTrigger.addEventListener(
        'refresh',
        refreshHandler
      );
    }, section);

    return () => {
      if (refreshHandler) {
        ScrollTrigger.removeEventListener(
          'refresh',
          refreshHandler
        );
      }

      ctx.revert();
    };
  }, [enableBoundaryTextEffect]);

  const renderCopyContent = () => (
    <>
      <h2 className="military-proof__title">
        {title.before}{' '}

        {title.highlight && (
          <span>
            {title.highlight}
          </span>
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
    </>
  );

  return (
    <section
      ref={sectionRef}
      className={[
        'military-proof',
        className,

        enableBoundaryTextEffect
          ? 'military-proof--boundary-text'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <picture className="military-proof__background-picture">
        <source
          media="(max-width: 1023px)"
          srcSet={
            background.mobile
          }
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
            srcSet={
              foreground.mobile
            }
          />

          <img
            className="military-proof__foreground"
            src={foreground.pc}
            alt=""
          />
        </picture>
      )}

      {enableBoundaryTextEffect ? (
        <div
          ref={copyRef}
          className="military-proof__copy military-proof__copy--boundary">
          <div
            ref={copyPinRef}
            className="military-proof__copy-pin"
          >
            <div className="military-proof__copy-motion">
              <div className="military-proof__copy-stack">
                {/* 黑色层 */}
                <div className="military-proof__copy-layer military-proof__copy-layer--black" aria-hidden="true">
                  {renderCopyContent()}
                </div>
                {/* 白色层 */}
                <div className="military-proof__copy-layer military-proof__copy-layer--white">
                  {renderCopyContent()}
                </div>

              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="military-proof__copy">
          {renderCopyContent()}
        </div>
      )}
    </section>
  );
};