import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// TODO: 调好初始位置后改回 false，恢复滚动播放
const PREVIEW_INITIAL_ONLY = false;

// 每个 container 相对最终布局的初始 translate
// GATHER_SHIFT_X: 整体水平偏移（负值向左），不改变彼此相对位置
const GATHER_SHIFT_X = -124;
const GATHER_TRANSFORMS = [
  {x: 76.4, y: 97.7}, // container-1
  {x: 125.73, y: 11.74}, // container-2
  {x: 153, y: -62.72}, // container-3
  {x: 185.61, y: -137.68}, // container-4
].map(({x, y}) => ({x: x + GATHER_SHIFT_X, y}));

// 移动端单独配置（rem），按当前 html font-size 换算为 px
const MOB_GATHER_SHIFT_X = -1.1;
const MOB_GATHER_TRANSFORMS = [
  {x: 0.69, y: 0.88}, // container-1
  {x: 1, y: 0.11}, // container-2
  {x: 1.24, y: -0.56}, // container-3
  {x: 1.46, y: -1.24}, // container-4
].map(({x, y}) => ({x: x + MOB_GATHER_SHIFT_X, y}));

function remToPx(value) {
  const rootFontSize =
    parseFloat(getComputedStyle(document.documentElement).fontSize) || 50;
  return value * rootFontSize;
}

function buildAntiLeakingAnimation(
  section,
  containers,
  scrollStart,
  {transforms, unit = 'px'} = {},
) {
  const setGatheredPositions = () => {
    containers.forEach((el, i) => {
      const pos = transforms[i] || transforms.at(-1);
      gsap.set(el, {
        x: unit === 'rem' ? remToPx(pos.x) : pos.x,
        y: unit === 'rem' ? remToPx(pos.y) : pos.y,
      });
    });
  };

  const circles = section.querySelectorAll('.xros-mini-retro-anti__circle');
  const lines = section.querySelectorAll('.xros-mini-retro-anti__line');
  const texts = section.querySelectorAll(
    '.xros-mini-retro-anti__annotation-text',
  );

  setGatheredPositions();

  gsap.set(circles, {opacity: 0});
  gsap.set(texts, {opacity: 0, y: 16});
  lines.forEach((line) => {
    const annotation = line.closest('.xros-mini-retro-anti-container-2');
    gsap.set(line, {
      scaleX: 0,
      transformOrigin: annotation ? 'right center' : 'left center',
    });
  });

  if (PREVIEW_INITIAL_ONLY) {
    window.addEventListener('resize', setGatheredPositions);
    return () => {
      window.removeEventListener('resize', setGatheredPositions);
    };
  }

  let tl;
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: scrollStart,
      toggleActions: 'play none none none',
      invalidateOnRefresh: true,
      onRefreshInit: () => {
        if (!tl || tl.progress() === 0) {
          setGatheredPositions();
        }
      },
    },
  });

  tl.to(containers, {
    x: 0,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.04,
  });

  tl.to(
    circles,
    {
      opacity: 1,
      duration: 0.2,
      ease: 'power1.out',
      stagger: 0.05,
    },
    '-=0.12',
  );

  tl.to(
    lines,
    {
      scaleX: 1,
      duration: 0.35,
      ease: 'power2.out',
      stagger: 0.05,
    },
    '-=0.06',
  );

  tl.to(
    texts,
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.05,
    },
    '-=0.15',
  );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}

export function AntiLeaking({title, description}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const content = section.querySelector('.xros-mini-retro-anti-content');
    const containers = gsap.utils.toArray(
      section.querySelectorAll('.xros-mini-retro-anti-container'),
    );
    if (!content || containers.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () =>
        buildAntiLeakingAnimation(section, containers, 'top 50%', {
          transforms: GATHER_TRANSFORMS,
          unit: 'px',
        }),
      );

      mm.add('(max-width: 1023px)', () =>
        buildAntiLeakingAnimation(section, containers, 'bottom bottom', {
          transforms: MOB_GATHER_TRANSFORMS,
          unit: 'rem',
        }),
      );
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
    <div className="xros-mini-retro-anti ui-v4-flex" ref={sectionRef}>
      <div className="xros-mini-retro-anti-text to-top">
        <img
          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-icon-SSS.svg"
          alt=""
          className="xros-mini-retro-anti__logo"
        />
        <p className="xros-mini-retro-anti-subtitle">SSS Tech</p>
        <h3 className="ui-v4-title">{title}</h3>
        <p className="ui-v4-description">{description}</p>
      </div>
      <div className="xros-mini-retro-anti-content">
        <div className="xros-mini-retro-anti-container xros-mini-retro-anti-container-1 ui-v4-flex">
          <img
            src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-5_1.webp"
            alt=""
            className="xros-mini-retro-anti__image xros-mini-retro-anti__image-1"
          />
        </div>
        <div className="xros-mini-retro-anti-container xros-mini-retro-anti-container-2 ui-v4-flex">
          <div className="xros-mini-retro-anti__annotation">
            <div className="xros-mini-retro-anti__line"></div>
            <div className="xros-mini-retro-anti__circle"></div>
            <div className="xros-mini-retro-anti__annotation-text">
              Double Sealed Comprehensicely
            </div>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-5_2.webp"
            alt=""
            className="xros-mini-retro-anti__image xros-mini-retro-anti__image-2"
          />
        </div>
        <div className="xros-mini-retro-anti-container xros-mini-retro-anti-container-3 ui-v4-flex">
          <img
            src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-5_3.webp"
            alt=""
            className="xros-mini-retro-anti__image xros-mini-retro-anti__image-3"
          />
          <div className="xros-mini-retro-anti__annotation">
            <div className="xros-mini-retro-anti__line"></div>
            <div className="xros-mini-retro-anti__circle"></div>
            <div className="xros-mini-retro-anti__annotation-text">
              Saturate More Properly
            </div>
          </div>
        </div>
        <div className="xros-mini-retro-anti-container xros-mini-retro-anti-container-4 ui-v4-flex">
          <img
            src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-5_4.webp"
            alt=""
            className="xros-mini-retro-anti__image xros-mini-retro-anti__image-4"
          />
          <div className="xros-mini-retro-anti__annotation">
            <div className="xros-mini-retro-anti__line"></div>
            <div className="xros-mini-retro-anti__circle"></div>
            <div className="xros-mini-retro-anti__annotation-text">
              45% Store Safely
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
