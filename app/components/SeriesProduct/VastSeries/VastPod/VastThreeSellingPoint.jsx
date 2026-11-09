import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import { PRIX_CDN } from './constants';

const FRAME_COUNT = 198;
const LAST_FRAME = FRAME_COUNT - 1;
const STARTS = [0, 52, 140];
const ENDS = STARTS.map((_, index) => (STARTS[index + 1] ?? FRAME_COUNT) - 1);

const ANCHORS = [...STARTS, LAST_FRAME];

const SCENES = [
  {
    word: 'VAST', value: '10', unit: 'mL',
    eyebrow: 'One Fill, One Week',
    title: ['No More', 'Frequent Filling'],
  },
  {
    word: 'FAST', value: '1', unit: 'Second',
    eyebrow: 'Insta Juiced, Insta Start',
    title: ['No More', 'Unnecessary Waiting'],
  },
  {
    word: 'LAST', value: '6', unit: 'Refills',
    eyebrow: 'Up To 150K Puffs',
    title: ['No More', 'Frequent Replacing'],
  },
];


const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const sceneOf = (frame) => (frame >= STARTS[2] ? 2 : frame >= STARTS[1] ? 1 : 0);


const splitLetters = (value) => Array.from(value).map((letter, index) => (
  <span className="vast-sequence__char-mask" key={`${index}-${letter}`}>
    <span className="vast-sequence__char">{letter === ' ' ? '\u00a0' : letter}</span>
  </span>
));

export function VastThreeSellingPoint({ data = {}, className = '' }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    frameBase = PRIX_CDN,
    framePrefix = 'vast_04_new_',
    mobileFramePrefix = '',
    scrollDistance = 5200,
    mobileScrollDistance = 4200,
    scrub = 1,
    fit = 'cover',
    mobileFit = 'cover',
    mobileFrameScale = 0.75,
    mobilePositionY = 0.1,
    endHold = 0.2
  } = data;

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const root = rootRef.current;
    const pin = root?.querySelector('.vast-sequence__pin');
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!root || !pin || !context) return undefined;
    function initialize(gsap, ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add({
        desktop: '(min-width: 1024px)',
        mobile: '(max-width: 1023px)',
        reducedMotion: '(prefers-reduced-motion: reduce)',
      }, (mediaContext) => {
        const { mobile, reducedMotion } = mediaContext.conditions;
        const headlines = [...root.querySelectorAll('.vast-sequence__headline')];
        const captions = [...root.querySelectorAll('.vast-sequence__caption')];
        const backgrounds = [...root.querySelectorAll('.vast-sequence__background')];
        const headlineInners = headlines.map((node) => node.querySelector('.vast-sequence__headline-inner'));
        const captionTimelines = captions.map((caption) => {
          const letters = gsap.utils.toArray('.vast-sequence__char', caption);
          return gsap.timeline({ paused: true })
            .fromTo(caption,
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, y: 0, duration: 0.48, ease: 'power3.out' }, 0)
            .fromTo(letters,
              { yPercent: 115, opacity: 0, rotate: 4 },
              {
                yPercent: 0, opacity: 1, rotate: 0, duration: 0.7,
                stagger: { each: 0.018, from: 'start' }, ease: 'power3.out'
              }, 0.12);
        });
        // 三组 PC 大字共用同一套入场参数。
        function addDesktopEntrance(timeline, word, metric) {
          return timeline.fromTo(
            [word, metric],
            { x: (index) => index === 0 ? 120 : 160, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
            0,
          );
        }

        const firstWord = headlines[0].querySelector('.vast-sequence__word');
        const firstMetric = headlines[0].querySelector('.vast-sequence__metric');

        const firstHeadlineChars = gsap.utils.toArray(
          '.vast-sequence__headline--1 .vast-sequence__word .vast-sequence__char',
          root,
        );

        const firstHeadlineTimeline = gsap.timeline({ paused: true });

        if (mobile) {
          firstHeadlineTimeline.fromTo(
            [...firstHeadlineChars, firstMetric],
            {
              yPercent: 120,
              autoAlpha: 0,
              rotate: 6,
            },
            {
              yPercent: 0,
              autoAlpha: 1,
              rotate: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
            },
            0,
          );
        } else {
          addDesktopEntrance(firstHeadlineTimeline, firstWord, firstMetric);
        }
        let firstEntered = false;
        let activeCaption = -1;
        let firstEntranceTrigger;
        function setActiveCaption(index) {
          if (activeCaption === index) return;
          activeCaption = index;
          captionTimelines.forEach((timeline, i) => {
            if (i === index) {
              if (reducedMotion) timeline.progress(1).pause();
              else timeline.timeScale(1).restart();
            } else if (reducedMotion) {
              timeline.progress(0).pause();
            } else {
              // 离场快速收起，约为入场倒放的 4 倍速度；再次入场恢复正常速度。
              timeline.timeScale(4).reverse();
            }
          });
        }

        function enterFirstScene() {
          if (dead || firstEntered) return;
          firstEntered = true;
          if (reducedMotion) firstHeadlineTimeline.progress(1).pause();
          else if (mobile) firstHeadlineTimeline.play(0);
          // 仅在第一屏时显示第一组小字；越过第一屏不会抢回当前字幕。
          if (activeScene <= 0) setActiveCaption(0);
          updateVisuals();
        }

        function resetFirstScene() {
          firstEntered = false;
          firstHeadlineTimeline.pause(0);
          if (activeScene === 0) setActiveCaption(-1);
          updateVisuals();
        }
        gsap.set(backgrounds, { autoAlpha: (index) => index === 0 ? 1 : 0 });
        const smooth = { frame: 0 };
        const smoothFrame = gsap.quickTo(smooth, 'frame', {
          duration: 0.48,
          ease: 'power2.out',
          onUpdate: () => updateVisuals(),
        });
        const ready = new Map();
        const pending = new Map();
        const attempts = new Map();
        const model = { frame: 0 };
        let queue = [];
        let dead = false;
        let nearby = false;
        let generation = 0;
        let target = 0;
        let direction = 1;
        let width = 0;
        let height = 0;
        let dpr = 1;
        let painted = -1;
        let activeScene = -1;
        let raf = 0;
        let resizeObserver;
        let intersectionObserver;
        // PC：位置计算与自动播放动画分开，滚动只负责切换场景。
        const desktopOffsets = headlines.map(() => ({ x: 0 }));
        const desktopExits = headlines.map(() => null);
        let desktopHeadline = -1;
        let desktopVisible = -1;
        let desktopExiting = false;
        const desktopEntries = [];

        if (!mobile && !reducedMotion) {
          headlines.forEach((headline, index) => {
            if (index === 0) {
              // 复用第一句现有的先左后右出场，不修改它的参数。
              desktopEntries.push(firstHeadlineTimeline);
              return;
            }
            const word = headline.querySelector('.vast-sequence__word');
            const metric = headline.querySelector('.vast-sequence__metric');
            const entrance = gsap.timeline({ paused: true });
            addDesktopEntrance(entrance, word, metric);
            desktopEntries.push(entrance);
          });
          gsap.set(headlines, { autoAlpha: 0 });
        }

        function positionDesktopHeadlines() {
          if (!width || mobile || reducedMotion) return;
          headlines.forEach((headline, index) => {
            const visualWidth = headlineInners[index].getBoundingClientRect().width;
            const correction = index === 1 ? width * 0.06 : index === 2 ? width * 0.1 : 0;
            gsap.set(headline, {
              x: (width - visualWidth) / 2 - correction + desktopOffsets[index].x,
              force3D: true,
            });
          });
        }

        function showDesktopHeadline(index) {
          if (desktopHeadline === index) return;
          desktopHeadline = index;
          advanceDesktopHeadline();
        }

        function advanceDesktopHeadline() {
          if (dead || desktopExiting || desktopVisible === desktopHeadline) return;

          if (desktopVisible >= 0) {
            const previous = desktopVisible;
            desktopExiting = true;
            desktopEntries[previous].pause();
            desktopExits[previous]?.kill();
            // 完全退场后才允许下一组入场，快速滚动只保留最新目标。
            desktopExits[previous] = gsap.timeline({
              onComplete: () => {
                if (dead) return;
                gsap.set(headlines[previous], { autoAlpha: 0 });
                desktopVisible = -1;
                desktopExiting = false;
                desktopExits[previous] = null;
                advanceDesktopHeadline();
              },
            })
              .to(desktopOffsets[previous], {
                x: -width * 0.3, duration: 1.1,
                ease: 'power1.inOut', onUpdate: positionDesktopHeadlines,
              }, 0)
              .to(headlines[previous], {
                autoAlpha: 0, duration: 1.1, ease: 'power1.inOut',
              }, 0);
            return;
          }

          const index = desktopHeadline;
          if (index < 0) return;
          // 父级保持隐藏，先重置子级，再显示并播放，防止重放时闪现。
          gsap.set(headlines, { autoAlpha: 0 });
          desktopOffsets[index].x = 0;
          desktopEntries[index].pause(0).invalidate();
          // 父级显示之前显式复位，右侧等待期间始终保持隐藏。
          gsap.set(headlines[index].querySelector('.vast-sequence__word'), {
            x: 120, autoAlpha: 0,
          });
          gsap.set(headlines[index].querySelector('.vast-sequence__metric'), {
            x: 160, autoAlpha: 0,
          });
          positionDesktopHeadlines();
          desktopVisible = index;
          gsap.set(headlines[index], { autoAlpha: 1 });
          desktopEntries[index].restart();
        }

        function frameUrl(index) {
          const prefix = mobile && mobileFramePrefix ? mobileFramePrefix : framePrefix;
          return `${frameBase.replace(/\/$/, '')}/${prefix}${String(index).padStart(3, '0')}.webp`;
        }
        function activateScene(index) {
          if (index === activeScene) return;
          activeScene = index;
          root.dataset.scene = String(index + 1);
          captions.forEach((caption, i) => caption.setAttribute('aria-hidden', String(i !== index)));
          // 第 1 屏等视口中线触发；第 2/3 屏在进入对应帧区间时自动播放。
          if (index === 0 && !firstEntered) setActiveCaption(-1);
          else setActiveCaption(index);
        }

        function updateVisuals() {
          if (dead || !width) return;
          const frame = reducedMotion ? 0 : smooth.frame;
          const ease = (value) => {
            const t = clamp(value, 0, 1);
            return t * t * (3 - 2 * t);
          };
          const transition = mobile ? 9 : 12;

          // 整屏背景叠层淡入：保留底层，下一层只改变透明度。
          // 不同时降低上一层透明度，避免过渡时露出页面底色。
          backgrounds.forEach((background, index) => {
            if (index === 0) return;
            const boundary = STARTS[index];
            const phase = reducedMotion ? 0 : ease((frame - (boundary - transition)) / (transition * 2));
            gsap.set(background, { autoAlpha: phase });
          });

          // PC 大字只在场景改变时触发，停止滚动后仍会自动播放完。
          if (!mobile && !reducedMotion) {
            let desktopScene = 0;
            STARTS.forEach((start, index) => {
              if (frame >= start) desktopScene = index;
            });
            activateScene(desktopScene);
            showDesktopHeadline(
              desktopScene === 0 && !firstEntered ? -1 : desktopScene,
            );
            positionDesktopHeadlines();
            return;
          }

          let dominant = 0;
          headlines.forEach((headline, i) => {
            const start = STARTS[i];
            const end = ENDS[i];
            const duration = Math.max(1, end - start);
            const local = clamp((frame - start) / duration, 0, 1);

            const inner = headlineInners[i];


            const entry = i === 0
              ? 1
              : ease(
                (frame - (start - transition * 0.4)) /
                (transition * 1.2),
              );

            const exit = i === 2
              ? 1
              : 1 - ease(
                (frame - (STARTS[i + 1] - transition * 0.8)) /
                (transition * 1.35),
              );

            const scale =
              Number(root.style.getPropertyValue('--vast-letter-scale')) || 0.65;

            const visualWidth = inner.offsetWidth * scale;
            const centeredX = (width - visualWidth) / 2;

            const from = i === 0 ? centeredX : width * 1.04;
            const to = i === 2 ? centeredX : -visualWidth - width * 0.08;

            gsap.set(headline, {
              x: reducedMotion
                ? centeredX
                : from + (to - from) * ease(local),
              autoAlpha:
                entry * exit * (i === 0 && !firstEntered ? 0 : 1),
              force3D: true,
            });

            if (frame >= start) dominant = i;
          });
          activateScene(dominant);
        }
        function nearestReady() {
          if (ready.has(target)) return target;
          const scene = sceneOf(target);
          let best = -1;
          let distance = Infinity;
          for (const index of ready.keys()) {
            if (sceneOf(index) !== scene) continue;
            const delta = Math.abs(index - target);
            if (delta < distance) { best = index; distance = delta; }
          }
          return best;
        }
        function render(force = false) {
          if (dead || !width || !height) return;
          let index = nearestReady();
          if (index < 0 && force && ready.has(painted)) index = painted;
          if (index < 0) {
            updateVisuals();
            return;
          }
          updateVisuals();
          if (painted === index && !force) return;
          const img = ready.get(index);
          const objectFit = mobile ? mobileFit : fit;
          const ratio = objectFit === 'contain' ? Math.min(width / img.naturalWidth, height / img.naturalHeight) : Math.max(width / img.naturalWidth, height / img.naturalHeight);
          const scale = ratio * (mobile && !mobileFramePrefix ? mobileFrameScale : 1);
          const drawWidth = img.naturalWidth * scale;
          const drawHeight = img.naturalHeight * scale;
          const x = (width - drawWidth) / 2;
          const y = (height - drawHeight) * (mobile && !mobileFramePrefix ? mobilePositionY : 0.5);
          context.setTransform(dpr, 0, 0, dpr, 0, 0);
          context.clearRect(0, 0, width, height);
          context.drawImage(img, x, y, drawWidth, drawHeight);
          painted = index;
          root.dataset.frame = String(index);
        }
        function fitTypography() {
          const naturalWidth = headlines[0].querySelector('.vast-sequence__word').offsetWidth;
          if (naturalWidth) {
            const desiredWidth = width * (mobile ? 0.48 : 0.38);
            root.style.setProperty('--vast-letter-scale', String(desiredWidth / naturalWidth));
          }
        }
        function resize() {
          if (dead) return;
          const nextWidth = pin.clientWidth;
          const nextHeight = pin.clientHeight;
          const nextDpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
          if (nextWidth === width && nextHeight === height && nextDpr === dpr) return;
          width = nextWidth;
          height = nextHeight;
          dpr = nextDpr;
          canvas.width = Math.max(1, Math.round(width * dpr));
          canvas.height = Math.max(1, Math.round(height * dpr));
          fitTypography();
          render(true);
        }
        function trimCache() {
          const limit = mobile ? 28 : 40;
          if (ready.size <= limit) return;
          const removable = [...ready.keys()].filter((index) => !ANCHORS.includes(index) && index !== painted && index !== target).sort((a, b) => Math.abs(b - target) - Math.abs(a - target));
          while (ready.size > limit && removable.length) ready.delete(removable.shift());
        }

        function pump() {
          if (dead) return;
          const concurrent = mobile ? 3 : 4;
          while (pending.size < concurrent && queue.length) {
            const index = queue.shift();
            if (ready.has(index) || pending.has(index) || (attempts.get(index) || 0) >= 2) continue;
            const image = new Image();
            const token = generation;
            attempts.set(index, (attempts.get(index) || 0) + 1);
            image.decoding = 'async';
            const entry = { image, timer: 0 };
            pending.set(index, entry);
            const finish = (success) => {
              if (dead || token !== generation || pending.get(index) !== entry) return;
              clearTimeout(entry.timer);
              image.onload = null;
              image.onerror = null;
              pending.delete(index);
              if (success && image.naturalWidth) {
                ready.set(index, image);
                attempts.delete(index);
                render();
                trimCache();
              } else if ((attempts.get(index) || 0) < 2) {
                queue.push(index);

              }
              pump();
            };
            image.onload = () => finish(true);
            image.onerror = () => finish(false);
            entry.timer = window.setTimeout(() => {
              finish(false);
              image.src = '';
            }, 15000);
            image.src = frameUrl(index);
          }
        }
        function planLoads() {
          const candidates = reducedMotion ? [0] : [target, STARTS[sceneOf(target)]];
          if (nearby && !reducedMotion) {
            for (let offset = 1; offset <= 16; offset += 1) {
              candidates.push(target + offset * direction);
              if (offset <= 6) candidates.push(target - offset * direction);
            }
          }
          if (!reducedMotion) candidates.push(...ANCHORS);
          queue = [...new Set(candidates)].filter((index) => (
            index >= 0 && index < FRAME_COUNT && !ready.has(index) && !pending.has(index) && (attempts.get(index) || 0) < 2
          ));
          pump();
        }
        function update() {
          if (dead) return;
          // floor 保证到 040 / 120 才切屏，不在 039.5 / 119.5 提前切换。
          const next = clamp(Math.floor(model.frame + 0.00001), 0, LAST_FRAME);
          if (next !== target) {
            direction = next > target ? 1 : -1;
            target = next;
            planLoads();
          }
          smoothFrame(model.frame);
          render();
        }
        function buildAnimation() {
          model.frame = 0;
          target = 0;
          if (!reducedMotion) {
            const hold = Math.max(0, Number(endHold) || 0);

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: root,
                start: () => `top top+=${mobile ? 44 : 52}`,
                end: () => `+=${(mobile ? mobileScrollDistance : scrollDistance) * (1 + hold)}`,
                pin,
                pinSpacing: true,
                scrub,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onRefresh: () => {
                  resize();
                  update();
                },
                onEnter: () => {
                  nearby = true;
                  planLoads();
                },
                onEnterBack: () => {
                  nearby = true;
                  planLoads();
                },
              },
            });

            timeline.to(model, {
              frame: LAST_FRAME,
              duration: 1,
              ease: 'none',
              onUpdate: update,
            });

            // 最后追加空动画，保持最终画面继续定屏
            if (hold > 0) {
              timeline.to({}, { duration: hold });
            }
          }

          planLoads();
          render(true);
        }
        function discardImages() {
          generation += 1;
          for (const { image, timer } of pending.values()) {
            clearTimeout(timer);
            image.onload = null;
            image.onerror = null;
            image.src = '';
          }
          pending.clear(); ready.clear(); attempts.clear(); queue = []; painted = -1;
        }
        function refreshLayout() {
          if (dead) return;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            if (dead) return;
            resize();
            fitTypography();
            ScrollTrigger.refresh();
          });
        }
        activateScene(0);
        resize();
        buildAnimation();
        if (reducedMotion) {
          enterFirstScene();
        } else {
          // top center：模块顶部到达视口中线时立即播放，不需要继续滚动才能显示完。
          firstEntranceTrigger = ScrollTrigger.create({
            trigger: root,
            start: 'top center',
            end: 'bottom top',
            onEnter: enterFirstScene,
            onEnterBack: enterFirstScene,
            onLeaveBack: resetFirstScene,
            invalidateOnRefresh: true,
          });
          // 处理从中间帧刷新、浏览器恢复滚动位置等情况。
          if (firstEntranceTrigger.isActive || firstEntranceTrigger.scroll() >= firstEntranceTrigger.start) {
            enterFirstScene();
          }
        }
        if ('ResizeObserver' in window) {
          resizeObserver = new ResizeObserver(resize);
          resizeObserver.observe(pin);
        } else {
          window.addEventListener('resize', resize);
        }
        if ('IntersectionObserver' in window) {
          intersectionObserver = new IntersectionObserver(([entry]) => {
            nearby = entry.isIntersecting;
            planLoads();
          }, { rootMargin: '150% 0px' });
          intersectionObserver.observe(root);
        } else {
          nearby = true;
          planLoads();
        }
        window.addEventListener('load', refreshLayout);
        document.fonts?.ready.then(refreshLayout);
        refreshLayout();
        return () => {
          dead = true;
          cancelAnimationFrame(raf);
          intersectionObserver?.disconnect();
          resizeObserver?.disconnect();
          window.removeEventListener('resize', resize);
          window.removeEventListener('load', refreshLayout);
          firstEntranceTrigger?.kill();
          firstHeadlineTimeline.kill();
          desktopEntries.forEach((timeline) => {
            if (timeline !== firstHeadlineTimeline) timeline.kill();
          });
          desktopExits.forEach((timeline) => timeline?.kill());
          captionTimelines.forEach((timeline) => timeline.kill());
          smoothFrame.tween?.kill();
          discardImages();
          headlines.forEach((headline) => { headline.style.transform = ''; });
          root.style.removeProperty('--vast-letter-scale');
          root.removeAttribute('data-frame');
        };
      }, root);
      return () => media.revert();
    }
    return initialize(gsap, ScrollTrigger);
  }, [frameBase, framePrefix, mobileFramePrefix, scrollDistance, mobileScrollDistance, scrub, endHold, fit, mobileFit, mobileFrameScale, mobilePositionY,]);
  return (
    <section ref={rootRef} className={`vast-sequence ${className}`.trim()} data-scene="1" aria-label="VAST product details">
      <div className="vast-sequence__pin">
        <div className="vast-sequence__backgrounds" aria-hidden="true">
          {SCENES.map((scene, index) => (
            <div key={scene.word} className={`vast-sequence__background vast-sequence__background--${index + 1}`} />
          ))}
        </div>
        <div className="vast-sequence__headlines" aria-hidden="true">
          {SCENES.map((scene, index) => (
            <div key={scene.word} className={`vast-sequence__headline vast-sequence__headline--${index + 1}`}>
              <span className="vast-sequence__headline-inner">
                <span className="vast-sequence__word">{index === 0 ? splitLetters(scene.word) : scene.word}</span>
                <span className="vast-sequence__metric">
                  <span className="vast-sequence__value">{scene.value}</span>
                  <span className="vast-sequence__unit">{scene.unit}</span>
                </span>
              </span>
            </div>
          ))}
        </div>
        <canvas ref={canvasRef} className="vast-sequence__canvas" aria-hidden="true" />
        <div className="vast-sequence__captions">
          {SCENES.map((scene, index) => (
            <div key={scene.word} className={`vast-sequence__caption vast-sequence__caption--${index + 1}`} aria-hidden={index !== 0}>
              <p className="vast-sequence__eyebrow" aria-label={scene.eyebrow}>
                <span className="vast-sequence__eyebrow__spanbox" aria-hidden="true">{splitLetters(scene.eyebrow)}</span>
              </p>
              <h2 className="vast-sequence__title" aria-label={scene.title.join(' ')}>
                <span aria-hidden="true">{splitLetters(scene.title[0])}</span>
                <span className="vast-sequence__title-break" aria-hidden="true"> </span>
                <span aria-hidden="true">{splitLetters(scene.title[1])}</span>
              </h2>
            </div>
          ))}
        </div>
        <span className="vast-sequence__sr-only">
          {SCENES.map((scene) => `${scene.word}: ${scene.value} ${scene.unit}. ${scene.eyebrow}. ${scene.title.join(' ')}.`).join(' ')}
        </span>
      </div>
    </section>
  );
}


export default VastThreeSellingPoint;
