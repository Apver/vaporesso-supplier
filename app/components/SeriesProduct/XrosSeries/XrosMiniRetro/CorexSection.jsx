import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {
  CorexLineMob,
  CorexLinePc,
} from '~/components/SeriesProduct/XrosSeries/XrosMiniRetro/CorexConnectingLine';

gsap.registerPlugin(ScrollTrigger);

const LOGO_SCALE_FROM = 3.45;
/** 与 xros-mini-retro.scss 移动端 &__logo width 一致 */
const MOB_LOGO_FINAL_REM = 1.62;

/**
 * @param {SVGPathElement} path
 */
function prepStrokeDraw(path) {
  const length = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });
}

function remToPx(value) {
  const rootFontSize =
    parseFloat(getComputedStyle(document.documentElement).fontSize) || 50;
  return value * rootFontSize;
}

/**
 * logo：随滚动 scrub，可反复；线段 + item：到达触发点后只播一次
 * @param {Element} section
 * @param {SVGElement} lineSvg
 * @param {{ logoStart?: string, logoEnd?: string, onceStart?: string, logoFinalRem?: number }} [options]
 */
function buildCorexAnimations(section, lineSvg, options = {}) {
  const {
    logoStart = 'top 80%',
    logoEnd = 'top top',
    onceStart = 'top top',
    logoFinalRem,
  } = options;

  const logo = section.querySelector('.xros-mini-retro-corex__logo');
  const items = gsap.utils.toArray(
    section.querySelectorAll('.xros-mini-retro-corex-item'),
  );
  const paths = gsap.utils.toArray(
    lineSvg.querySelectorAll('.xros-mini-retro-corex-line__path'),
  );
  const horizontalPaths = gsap.utils.toArray(
    lineSvg.querySelectorAll(
      '.xros-mini-retro-corex-line__path--h-right, .xros-mini-retro-corex-line__path--h-left-top, .xros-mini-retro-corex-line__path--h-left-bottom, .xros-mini-retro-corex-line__path--elbow-h',
    ),
  );
  const elbowV = lineSvg.querySelector(
    '.xros-mini-retro-corex-line__path--elbow-v',
  );

  if (!logo || !paths.length) return null;

  // 清掉内联 width，避免读到 PC 动画残留或覆盖 SCSS 目标尺寸
  gsap.set(logo, {clearProps: 'width'});
  const finalWidth =
    logoFinalRem != null
      ? remToPx(logoFinalRem)
      : Number.parseFloat(getComputedStyle(logo).width) || 122;
  const fromWidth = finalWidth * LOGO_SCALE_FROM;

  gsap.set(logo, {
    width: fromWidth,
    height: 'auto',
  });
  gsap.set(lineSvg, {autoAlpha: 0});
  gsap.set(items, {autoAlpha: 0, y: 28});
  paths.forEach(prepStrokeDraw);

  // logo 随滚动缩小/放大，可反复
  const logoTween = gsap.fromTo(
    logo,
    {width: fromWidth},
    {
      width: finalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: logoStart,
        end: logoEnd,
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );

  // 线段 + item：仅播放一次
  const onceTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: onceStart,
      toggleActions: 'play none none none',
      once: true,
      invalidateOnRefresh: true,
    },
  });

  onceTl.set(lineSvg, {autoAlpha: 1});
  onceTl.to(
    horizontalPaths,
    {
      strokeDashoffset: 0,
      duration: 0.55,
      ease: 'power1.inOut',
    },
    'lines',
  );

  if (elbowV) {
    onceTl.to(
      elbowV,
      {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: 'power1.inOut',
      },
      'lines+=0.35',
    );
  }

  onceTl.to(
    items,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
      ease: 'power2.out',
    },
    '-=0.08',
  );

  return {logoTween, onceTl};
}

export function CorexSection({title, description}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const lineSvg = section.querySelector(
          '.xros-mini-retro-corex-line[data-corex-line="pc"]',
        );
        if (!lineSvg) return;
        const anim = buildCorexAnimations(section, lineSvg, {
          logoStart: 'top 80%',
          logoEnd: 'top top',
          onceStart: 'top top',
        });
        return () => {
          anim?.logoTween?.scrollTrigger?.kill();
          anim?.logoTween?.kill();
          anim?.onceTl?.scrollTrigger?.kill();
          anim?.onceTl?.kill();
        };
      });

      mm.add('(max-width: 1023px)', () => {
        const lineSvg = section.querySelector(
          '.xros-mini-retro-corex-line[data-corex-line="mob"]',
        );
        if (!lineSvg) return;
        const anim = buildCorexAnimations(section, lineSvg, {
          logoStart: 'top 90%',
          logoEnd: 'top 40%',
          onceStart: 'top 40%',
          logoFinalRem: MOB_LOGO_FINAL_REM,
        });
        return () => {
          anim?.logoTween?.scrollTrigger?.kill();
          anim?.logoTween?.kill();
          anim?.onceTl?.scrollTrigger?.kill();
          anim?.onceTl?.kill();
        };
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh(true);
    const rafId = requestAnimationFrame(refresh);
    const timer = window.setTimeout(refresh, 400);
    window.addEventListener('load', refresh);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timer);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div className="xros-mini-retro-corex ui-v4-flex" ref={sectionRef}>
      <img
        src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_pro_2-pc-08-1.svg?v=1779352729"
        alt=""
        className="xros-mini-retro-corex__logo"
      />
      <div className="xros-mini-retro-corex-content">
        <picture>
          <source
            media="(max-width: 1023px)"
            srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-Mob-13-2.webp"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-13-2.webp"
            alt=""
            className="xros-mini-retro-corex__image"
          />
        </picture>
        <CorexLinePc className="xros-mini-retro-corex-line s-hide" />
        <CorexLineMob className="xros-mini-retro-corex-line x-hide" />
        <div className="xros-mini-retro-corex-item xros-mini-retro-corex-item-1">
          <div className="xros-mini-retro-corex-item-text">
            <div className="xros-mini-retro-corex-item-text-value">
              40%
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-13-7.svg"
                alt=""
                className="xros-mini-retro-corex-item-text-value-img"
              />
            </div>
            <p>Flavor Delicacy</p>
          </div>
          <picture>
            <source
              media="(max-width: 1023px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-Mob-13-3.webp"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-13-3.webp"
              alt=""
              className="xros-mini-retro-corex-item-1-image"
            />
          </picture>
        </div>
        <div className="xros-mini-retro-corex-item xros-mini-retro-corex-item-2">
          <div className="xros-mini-retro-corex-item-text">
            <div className="xros-mini-retro-corex-item-text-value">
              30%
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-13-7.svg"
                alt=""
                className="xros-mini-retro-corex-item-text-value-img"
              />
            </div>
            <p>
              Performance <br />
              Stability
            </p>
          </div>
          <picture>
            <source
              media="(max-width: 1023px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-Mob-13-4.webp"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-13-4.webp"
              alt=""
              className="xros-mini-retro-corex-item-2-image"
            />
          </picture>
        </div>
        <div className="xros-mini-retro-corex-item xros-mini-retro-corex-item-3">
          <picture>
            <source
              media="(max-width: 1023px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-Mob-13-5.webp"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-13-5.webp"
              alt=""
              className="xros-mini-retro-corex-item-3-image"
            />
          </picture>
          <div className="xros-mini-retro-corex-item-text">
            <div className="xros-mini-retro-corex-item-text-value">
              30%
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-13-7.svg"
                alt=""
                className="xros-mini-retro-corex-item-text-value-img"
              />
            </div>
            <p>
              Aroma <br />
              Reproduction
            </p>
          </div>
        </div>
        <div className="xros-mini-retro-corex-item xros-mini-retro-corex-item-4">
          <picture>
            <source
              media="(max-width: 1023px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-Mob-13-6.webp"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-13-6.webp"
              alt=""
              className="xros-mini-retro-corex-item-4-image"
            />
          </picture>
          <div className="xros-mini-retro-corex-item-text">
            <div className="xros-mini-retro-corex-item-text-value">
              30%
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-13-7.svg"
                alt=""
                className="xros-mini-retro-corex-item-text-value-img"
              />
            </div>
            <p>
              Airflow <br />
              Smoothness
            </p>
          </div>
        </div>
      </div>
      <h3 className="ui-v4-title x-hide">{title}</h3>
      <p className="ui-v4-description">{description}</p>
      <p className="ui-v4-tips">
        * The data is based on testing results from VAPORESSO LAB
      </p>
    </div>
  );
}
