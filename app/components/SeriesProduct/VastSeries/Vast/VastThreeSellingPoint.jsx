import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DEFAULT_SLIDES = [
  { word: 'VAST', value: '10', unit: 'mL', subtitle: 'One Fill, One Week', title: 'No More Frequent Filling', background: 'linear-gradient(110deg, #f6f6f6, #e5e5e5)', wordColor: '#c78db8', accent: '#951d70', valueBackground: 'linear-gradient(#620544, #922671)', titleColor: '#000' },
  { word: 'FAST', value: '1', unit: 'Second', subtitle: 'Insta Juiced, Insta Start', title: 'No More Unnecessary Waiting', background: 'linear-gradient(110deg, #323232, #060606)', wordColor: '#694d23', accent: '#e29400', valueBackground: 'linear-gradient(#e0a600, #a06308)', titleColor: '#fff' },
  { word: 'LAST', value: '6', unit: 'Refills', subtitle: 'Up To 150K Puffs', title: 'No More Frequent Replacing', background: 'linear-gradient(110deg, #eff6ff, #c8d7e7)', wordColor: '#86b0d5', accent: '#075698', valueBackground: 'linear-gradient(#003965, #085ba5)', titleColor: '#000' },
];

/**
 * 全屏透明帧图：vast_04_000.webp ～ vast_04_164.webp。
 * frameBase：图片所在目录，不包含文件名。
 * switchFrames 使用从 0 开始的文件编号，默认 040 / 120 切屏。
 * slides 可覆盖三屏文案、背景和颜色；样式在 vast.scss。
 */
export const VastThreeSellingPoint = ({ data = {} }) => {
  const {
    title = 'VAST Performance',
    frameBase = 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files',
    framePrefix = 'vast_04_',
    frameCount = 165,
    switchFrames = [40, 120],
    scrollScreens = 5,
    scrub = 0.35,
    textTravel = 0.24,
    fit = 'cover',
    slides = [],
  } = data;
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const count = Math.max(3, Math.floor(Number(frameCount) || 165));
  const split1 = Math.min(count - 2, Math.max(1, Math.floor(Number(switchFrames[0]) || 40)));
  const split2 = Math.min(count - 1, Math.max(split1 + 1, Math.floor(Number(switchFrames[1]) || 120)));
  const scenes = DEFAULT_SLIDES.map((item, index) => ({ ...item, ...slides[index] }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context2d = canvas.getContext('2d');
    if (!context2d) return undefined;

    const backgrounds = [...section.querySelectorAll('.vast-sequence__background')];
    const headlines = [...section.querySelectorAll('.vast-sequence__headline')];
    const captions = [...section.querySelectorAll('.vast-sequence__caption')];
    const moveText = headlines.map((item) => gsap.quickSetter(item, 'x', 'px'));
    const playhead = { frame: 0 };
    const cache = new Map();
    const pending = new Map();
    const attempts = new Map();
    const starts = [0, split1, split2];
    const ends = [split1 - 1, split2 - 1, count - 1];
    const maxCache = window.matchMedia('(max-width: 767px)').matches ? 14 : 24;
    const getScene = (frame) => (frame < split1 ? 0 : frame < split2 ? 1 : 2);
    const getUrl = (frame) => `${frameBase.replace(/\/$/, '')}/${framePrefix}${String(frame).padStart(3, '0')}.webp`;
    let disposed = false;
    let loadingEnabled = false;
    let queue = [];
    let target = 0;
    let rendered = -1;
    let activeScene = -1;
    let direction = 1;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dirty = true;

    const trimCache = () => {
      const keys = [...cache.keys()].filter((key) => key !== rendered);
      keys.sort((a, b) => Math.abs(b - target) - Math.abs(a - target));
      while (cache.size > maxCache && keys.length) cache.delete(keys.shift());
    };

    const draw = () => {
      raf = 0;
      if (disposed || !width || !height) return;
      // 优先精确帧；慢网时只选同一屏的最近已加载帧，防止旧请求覆盖新位置。
      const scene = getScene(target);
      let frame = cache.has(target) ? target : -1;
      if (frame < 0) {
        for (const key of cache.keys()) {
          if (getScene(key) === scene && (frame < 0 || Math.abs(key - target) < Math.abs(frame - target))) frame = key;
        }
      }
      if (frame < 0) frame = rendered;
      const img = cache.get(frame);
      if (!img) return;

      if (dirty || frame !== rendered) {
        const scale = (fit === 'contain' ? Math.min : Math.max)(width / img.naturalWidth, height / img.naturalHeight);
        const drawWidth = img.naturalWidth * scale;
        const drawHeight = img.naturalHeight * scale;
        context2d.clearRect(0, 0, width, height);
        context2d.drawImage(img, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
        rendered = frame;
        dirty = false;
        section.dataset.frame = String(frame);
      }

      const nextScene = getScene(frame);
      if (nextScene !== activeScene) {
        activeScene = nextScene;
        // 与实际显示帧同步切换背景、大字和底部文案。
        backgrounds.forEach((item, index) => { item.style.visibility = index === nextScene ? 'visible' : 'hidden'; });
        headlines.forEach((item, index) => { item.style.visibility = index === nextScene ? 'visible' : 'hidden'; });
        captions.forEach((item, index) => {
          item.style.visibility = index === nextScene ? 'visible' : 'hidden';
          item.setAttribute('aria-hidden', String(index !== nextScene));
        });
        section.dataset.scene = String(nextScene + 1);
      }
      const visualFrame = nextScene === scene ? playhead.frame : frame;
      const progress = gsap.utils.clamp(0, 1, (visualFrame - starts[nextScene]) / Math.max(1, ends[nextScene] - starts[nextScene]));
      // 每屏大字从右向左移动；回滚时跟随时间轴反向还原。
      const headlineWidth = headlines[nextScene].scrollWidth;

      moveText[nextScene](
        -progress * (width + headlineWidth)
      );
    };

    const requestDraw = () => {
      if (!disposed && !raf) raf = requestAnimationFrame(draw);
    };

    const pump = () => {
      if (disposed || !loadingEnabled) return;
      while (pending.size < 4 && queue.length) {
        const frame = queue.shift();
        if (cache.has(frame) || pending.has(frame) || (attempts.get(frame) || 0) >= 2) continue;
        attempts.set(frame, (attempts.get(frame) || 0) + 1);
        const img = new Image();
        let settled = false;
        const finish = (success) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          img.onload = null;
          img.onerror = null;
          pending.delete(frame);
          if (disposed) return;
          if (success && img.naturalWidth) {
            attempts.delete(frame);
            cache.set(frame, img);
            trimCache();
            requestDraw();
          } else if ((attempts.get(frame) || 0) < 2) {
            if (Math.abs(frame - target) <= 10) queue.push(frame);
          } else {
            console.warn(`[VastScrollSequence] 帧图加载失败：${getUrl(frame)}`);
          }
          pump();
        };
        const timer = setTimeout(() => { finish(false); img.src = ''; }, 15000);
        pending.set(frame, { img, timer });
        img.decoding = 'async';
        img.onload = () => finish(true);
        img.onerror = () => finish(false);
        img.src = getUrl(frame);
      }
    };

    const updateQueue = () => {
      queue = [target];
      // 当前帧最优先，滚动方向预载 10 帧，反方向保留 3 帧。
      for (let i = 1; i <= 10; i += 1) {
        queue.push(target + i * direction);
        if (i <= 3) queue.push(target - i * direction);
      }
      queue = [...new Set(queue)].filter((frame) => frame >= 0 && frame < count);
      pump();
    };

    const updateFrame = () => {
      // floor 保证 039 尚属第一屏，040 开始第二屏；补偿浮点误差。
      const frame = Math.min(count - 1, Math.max(0, Math.floor(playhead.frame + 0.00001)));
      if (frame !== target) {
        direction = frame > target ? 1 : -1;
        target = frame;
        updateQueue();
      }
      requestDraw();
    };

    const resize = () => {
      width = section.clientWidth;
      height = section.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.max(1, Math.round(width * dpr));
      const pixelHeight = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        context2d.setTransform(dpr, 0, 0, dpr, 0, 0);
        dirty = true;
      }
      requestDraw();
    };

    const gsapContext = gsap.context(() => {
      gsap.fromTo(playhead, { frame: 0 }, {
        frame: count - 1,
        ease: 'none',
        onUpdate: updateFrame,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.round(section.clientHeight * Math.max(1, Number(scrollScreens) || 5))}`,
          pin: true,
          pinSpacing: true,
          scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: resize,
          // 快速滚过边界时同步到首/尾帧，再释放定屏。
          onLeave: (self) => { self.getTween()?.progress(1); self.animation.progress(1); },
          onLeaveBack: (self) => { self.getTween()?.progress(1); self.animation.progress(0); },
        },
      });
    }, section);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);
    const preloadObserver = new IntersectionObserver(([entry]) => {
      loadingEnabled = entry.isIntersecting;
      if (loadingEnabled) updateQueue();
    }, { rootMargin: '100% 0px' });
    // 观察 pin spacer，避免被固定后的元素影响预加载范围。
    preloadObserver.observe(section.parentElement);
    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      preloadObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('load', refresh);
      pending.forEach(({ img, timer }) => {
        clearTimeout(timer);
        img.onload = null;
        img.onerror = null;
        img.src = '';
      });
      pending.clear();
      cache.clear();
      gsapContext.revert();
      // React StrictMode / 配置变化时恢复首屏初始状态。
      [...backgrounds, ...headlines, ...captions].forEach((item) => item.removeAttribute('style'));
      captions.forEach((item, index) => item.setAttribute('aria-hidden', String(index !== 0)));
      delete section.dataset.frame;
      delete section.dataset.scene;
    };
  }, [frameBase, framePrefix, count, split1, split2, scrollScreens, scrub, textTravel, fit]);

  return (
    <section ref={sectionRef} className="vast-sequence" aria-label={title}>
      {scenes.map((item, index) => (
        <div key={`bg-${index}`} className={`vast-sequence__background vast-sequence__background--${index + 1}`} aria-hidden="true">
          <div style={{ background: item.background }} />
        </div>
      ))}

      <div className="vast-sequence__headlines" aria-hidden="true">
        {scenes.map((item, index) => (
          <div key={`headline-${index}`} className={`vast-sequence__headline vast-sequence__headline--${index + 1}`}>
            <span className="vast-sequence__word" style={{ color: item.wordColor }}>{item.word}</span>
            <span className="vast-sequence__metric" style={{ backgroundImage: item.valueBackground }}>
              <strong className="vast-sequence__number">{item.value}</strong>
              <span className="vast-sequence__unit">{item.unit}</span>
            </span>
          </div>
        ))}
      </div>

      <canvas ref={canvasRef} className="vast-sequence__canvas" aria-hidden="true" />

      <div className="vast-sequence__captions">
        {scenes.map((item, index) => (
          <div key={`caption-${index}`} className={`vast-sequence__caption vast-sequence__caption--${index + 1}`} aria-hidden={index !== 0}>
            <span className="vast-sequence__sr-only">{item.word} {item.value} {item.unit}.</span>
            <p className="vast-sequence__subtitle" style={{ color: item.accent }}>{item.subtitle}</p>
            <h2 className="vast-sequence__title" style={{ color: item.titleColor }}>{item.title}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};
