
import {useEffect} from 'react';
import Lenis from 'lenis';
import {gsap} from 'gsap';
// import { Observer } from 'gsap/Observer';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {
  ANNIVERSARYSTORY_IMAGES,
  ANNIVERSARYSTORY_GROUP_COUNTS
} from './constants';
gsap.registerPlugin(ScrollTrigger);


function initVideoBanner(root) {
  const container = root.querySelector('.anniversary-video-banner');
  if (!container) return undefined;

  const video = container.querySelector('.banner-media');
  if (!video) return undefined;

  const pcVideo = container.dataset.pcVideo;
  const mobileVideo = container.dataset.mobileVideo;
  const pcPoster = container.dataset.pcPoster;
  const mobilePoster = container.dataset.mobilePoster;

  const mediaQuery = window.matchMedia('(max-width: 768px)');

  const handleMediaChange = (e) => {
    const isMobile = e.matches;

    const targetPoster = isMobile && mobilePoster ? mobilePoster : pcPoster;
    if (targetPoster) video.setAttribute('poster', targetPoster);

    const targetVideo = isMobile && mobileVideo ? mobileVideo : pcVideo;
    if (targetVideo && video.src !== targetVideo) {
      video.src = targetVideo;
      video.load();
      video.play().catch(err => console.warn("自动播放受限:", err));
    }
  };

  handleMediaChange(mediaQuery);

  mediaQuery.addEventListener('change', handleMediaChange);

  return () => {
    mediaQuery.removeEventListener('change', handleMediaChange);
    if (video) {
      video.pause();
      video.src = ''; 
      video.load();
    }
  };
}



 function initPhotoWall(rootContainer) {
  if (!rootContainer) return () => {};

  const stage = rootContainer.querySelector('.ui-v4-photo-wall__stage');
  if (!stage) return () => {};

  stage.innerHTML = '';

  let imageIndex = 0;
  const fragment = document.createDocumentFragment();

  ANNIVERSARYSTORY_GROUP_COUNTS.forEach((count, groupIndex) => {
    const group = document.createElement('div');
    group.className = 'ui-v4-photo-wall__group';
    group.dataset.group = String(groupIndex);

    for (let i = 0; i < count; i++) {
      const imageItem = document.createElement('div');
      imageItem.className = 'ui-v4-photo-wall__item';
      
      const src = ANNIVERSARYSTORY_IMAGES[imageIndex % ANNIVERSARYSTORY_IMAGES.length];
      imageItem.innerHTML = `<img src="${src}" alt="Photo ${imageIndex + 1}">`;
      group.appendChild(imageItem);
      imageIndex += 1;
    }
    fragment.appendChild(group);
  });

  stage.appendChild(fragment);
  gsap.config({ force3D: true });

  let rotationTimeline = null;
  const groupTimelines = [];
  const groups = stage.querySelectorAll('.ui-v4-photo-wall__group');
  const isMobileView = window.matchMedia('(max-width: 1023px)').matches;

  groups.forEach((group, groupIndex) => {
    const items = group.querySelectorAll('.ui-v4-photo-wall__item');
    items.forEach((item, i) => {
      gsap.set(item, { opacity: 0, transformOrigin: '50% 50%' });
      gsap.to(item, {
        opacity: 1,
        duration: 1.8,
        delay: 0.1 * (groupIndex * 3 + i),
        ease: 'back.out(1.4)',
      });
    });
  });

  gsap.set(stage, {
    rotationX: 0,
    rotationY: -30,
    rotationZ: 0,
    transformOrigin: '50% 50% 0px',
  });

  rotationTimeline = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.1 });
  rotationTimeline.to(stage, { rotationY: 30, duration: 3, ease: 'power2.inOut' });

  groups.forEach((group, groupIndex) => {
    const groupTimeline = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.1 });
    groupTimelines.push(groupTimeline);

    let minZ = 0, maxZ = 0;
    if (!isMobileView) {
      if (groupIndex === 0) { minZ = 100; maxZ = 300; } 
      else if (groupIndex === 1) { minZ = 30; maxZ = 130; } 
      else if (groupIndex === 2) { minZ = 0; maxZ = 0; } 
      else if (groupIndex === 3) { minZ = -100; maxZ = -200; } 
      else if (groupIndex === 4) { minZ = -200; maxZ = -500; }
    } else {
      if (groupIndex === 0) { minZ = 80; maxZ = 150; } 
      else if (groupIndex === 1) { minZ = 15; maxZ = 60; } 
      else if (groupIndex === 2) { minZ = 0; maxZ = 0; } 
      else if (groupIndex === 3) { minZ = -10; maxZ = -50; } 
      else if (groupIndex === 4) { minZ = -60; maxZ = -100; }
    }

    gsap.set(group, { z: maxZ });

    if (groupIndex === 2) {
      groupTimeline.set(group, { z: 0 }, 0);
      groupTimeline.set(group, { z: 0 }, 1.5);
      groupTimeline.set(group, { z: 0 }, 3);
    } else {
      groupTimeline.to(group, { z: minZ, duration: 1.5, ease: 'power2.inOut' }, 0);
      groupTimeline.to(group, { z: maxZ, duration: 1.5, ease: 'power2.inOut' }, 1.5);
    }
    let maxY = 0, centerY = 0;
    if (groupIndex === 0) { maxY = -60; centerY = -45; } 
    else if (groupIndex === 1) { maxY = -20; centerY = -15; } 
    else if (groupIndex === 3) { maxY = 20; centerY = 15; } 
    else if (groupIndex === 4) { maxY = 60; centerY = 45; }

    if (groupIndex !== 2) {
      gsap.set(group, { y: maxY });
      groupTimeline.to(group, { y: centerY, duration: 1.5, ease: 'power2.inOut' }, 0);
      groupTimeline.to(group, { y: maxY, duration: 1.5, ease: 'power2.inOut' }, 1.5);
    }
  });

  const handleResize = () => {
    gsap.set(stage, { transformOrigin: '50% 50%' });
  };
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    rotationTimeline?.kill();
    groupTimelines.forEach((tl) => tl.kill());
    stage.innerHTML = '';
  };
}

 function  initYearHighlightAnimation(root) {
  if (!root) return () => {};

  const cards = gsap.utils.toArray('.year-highlight__card', root);
  if (cards.length === 0) return () => {};

  const config = {
    maxRotateX: 88,
  };

  let width, height, spacing, cardWidth, cardHeight;
  let leftBound, rightBound, visibleWidth, startOffset, endOffset;

  const state = { offset: 0 }; 

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (edge0, edge1, value) => {
    const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return x * x * (3 - 2 * x);
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;

    cardWidth = cards[0].offsetWidth || 480; 
    cardHeight = cards[0].offsetHeight || 620;
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const gapPx = 10 * rootFontSize; 
    spacing = cardWidth + gapPx; 

    leftBound = -cardWidth * 1.5;
    rightBound = width + cardWidth * 1.5;
    visibleWidth = rightBound - leftBound;

    startOffset = leftBound;

    endOffset = rightBound + (cards.length - 1) * spacing;

//     const lastIndex = cards.length - 1;
//     const targetCenterX = width * 0.5;
//     endOffset = targetCenterX + lastIndex * spacing;

// // 获取标题和 header 的高度（如果存在的话）
//     const headerEl = root.querySelector('.year-highlight__header');
//     const headerHeight = headerEl ? headerEl.offsetHeight : 0;

//     // 获取 .year-highlight 的 padding-top（通过计算样式获取，或者直接写固定的数字如 200）
//     const highlightEl = root.querySelector('.year-highlight');
//     const computedStyle = highlightEl ? getComputedStyle(highlightEl) : null;
//     const paddingTop = computedStyle ? parseFloat(computedStyle.paddingTop) || 0 : 200;

//     // 【关键修改】总滚动距离 = 卡片动画需要的滚动量 + header高度 + padding-top + 视口高度
//     const cardScrollDistance = endOffset - startOffset;
//     const totalScrollDistance = cardScrollDistance + headerHeight + paddingTop + height;

//     const wrapper = root.querySelector('.year-highlight__wrapper');
//     if (wrapper) {
//       wrapper.style.height = `${totalScrollDistance}px`;
//     }
  };

  const renderCards = () => {
    cards.forEach((card, index) => {
      const x = state.offset - index * spacing;

      const progress = clamp((x - leftBound) / visibleWidth, 0, 1);

      const rotationX = -Math.cos(progress * Math.PI) * config.maxRotateX;
      const centerY = lerp(height * 0.84, height * 0.18, progress);
      const upright = Math.sin(progress * Math.PI);
      const z = upright * 72;
      
      const opacity = smoothstep(0.005, 0.045, progress) * (1 - smoothstep(0.955, 0.995, progress));

      const translateX = x - cardWidth * 0.5;
      const translateY = centerY - cardHeight * 0.5;

      gsap.set(card, {
        x: translateX,
        y: translateY,
        z,
        rotationX,
        opacity,
        zIndex: Math.round(progress * 1000 + upright * 100)
      });
    });
  };

  resize();
  state.offset = startOffset;
  renderCards();

  const tl = gsap.to(state, {
    offset: endOffset, 
    ease: "none",
    scrollTrigger: {
      trigger: root.querySelector('.year-highlight'),
      start: "top bottom", 
      end: "bottom top", 
      scrub: 1,
      onUpdate: renderCards,
      invalidateOnRefresh: true
    }
  });

  const handleResize = () => {
    resize();
    renderCards();
  };
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    if (tl.scrollTrigger) {
      tl.scrollTrigger.kill();
    }
    tl.kill();
    gsap.killTweensOf(cards);
  };
}
function initializeAnimation(root) {
  const section = root.querySelector('.reward-list');
  const cardWrapper = section?.querySelector('.reward-list__content__wrp');
  const mainHeader = section?.querySelector('.reward-list__header');
  
  const cards = section
    ? Array.from(section.querySelectorAll('.reward-list__card'))
    : [];



  if (!section || !cardWrapper || cards.length < 2) {
    return () => {};
  }

  const media = gsap.matchMedia();
  const imageCleanups = [];
    let rewardScrollTrigger = null;


  media.add('(min-width: 768px)', () => {
    // gsap.set(cardWrapper, { position: 'relative' });

    const headers = cards.map((card) =>
      card.querySelector('.reward-card__header')
    );

    let timeline = null;
    let mainHeaderHeight = 0;
    let moveUpDistance = 0;

    const setLayout = () => {

      const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 10;
      const extraOffset = 5 * rootFontSize;

      const sectionStyle = window.getComputedStyle(section);
      const safePadding = parseFloat(sectionStyle.paddingTop || 0) || 40;

      if (mainHeader) {
        const style = window.getComputedStyle(mainHeader);
        mainHeaderHeight = mainHeader.offsetHeight + parseFloat(style.marginBottom || 0);
        moveUpDistance = Math.max(0, mainHeaderHeight - safePadding - extraOffset);
        gsap.set(mainHeader, { 
          y: 0, 
          willChange: 'transform' 
        });
      } else {
        mainHeaderHeight = 0;
        moveUpDistance = 0;
      }
      const headerHeight = Math.max(
        0,
        ...headers.map((header) => header?.offsetHeight || 0)
      );

      const firstCard = cards[0];
      const paddingTop = firstCard ? parseFloat(window.getComputedStyle(firstCard).paddingTop) || 0 : 0;
      const stackOffset = headerHeight + paddingTop;

      gsap.set(cardWrapper, { 
        position: 'relative',
        paddingBottom: stackOffset * (cards.length - 1),
        y: 0, 
        willChange: 'transform'
      });

      cards.forEach((card, index) => {
        const isFirst = index === 0;
        const direction = index % 2 === 1 ? 1 : -1;

        if (isFirst) {
          gsap.set(card, {
            position: 'relative',
            zIndex: 1,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            transformOrigin: '50% 50%',
            force3D: true,
            willChange: 'transform',
          });
        } else {
          const extraY = index === 2 ? 25 : 0;
          gsap.set(card, {
            position: 'absolute',
            top: index * stackOffset,
            left: 0,
            right: 0,
            margin: '0 auto',
            zIndex: index + 1,
            xPercent: direction * 20, 
            yPercent: index * 75 + extraY,
            rotation: direction * -5, 
            x: 0,
              y: 0,
            transformOrigin: '50% 50%',
            force3D: true,
            willChange: 'transform',
          });
        }
      });
    };

    setLayout();

    timeline = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        trigger: section, 
        start: 'top top',
        end: 'bottom bottom', 
        scrub: 1.2,
        invalidateOnRefresh: true,
        onRefreshInit: setLayout,
      },
    });
    rewardScrollTrigger = timeline.scrollTrigger;

    const wrapperMoveDuration = 0.5;
    
    if (mainHeaderHeight > 0) {
      timeline.to(
        mainHeader,
        {
          y: -mainHeaderHeight,
          duration: wrapperMoveDuration,
          ease: 'none',
        },
        0 
      );
      timeline.to(
        cardWrapper,
        {
          y: -moveUpDistance,
          duration: wrapperMoveDuration,
          ease: 'none',
        },
        0 
      );
    }


    cards.slice(1).forEach((card, i) => {
      const cardOffset = i === 1 ? 0.7 : i * 0.7;
      const startTime = wrapperMoveDuration + cardOffset;
      timeline.to(
        card,
        {
          xPercent: 0,
          yPercent: 0, 
          rotation: 0,
          duration: 1, 
          ease: 'none',
        },
       startTime
      );
    });

    timeline.to({}, { duration: 0.15 });

    return () => {
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      timeline = null;
       rewardScrollTrigger = null;

      gsap.set(cards, {
        clearProps:
          'position,top,left,right,margin,zIndex,transform,willChange',
      });

      gsap.set(cardWrapper, {
        clearProps: 'position,paddingBottom,y,transform,willChange',
      });
      if (mainHeader) {
        gsap.set(mainHeader, {
          clearProps: 'y,transform,willChange'
        });
      }
    };
  });

  const refreshScroll = () => {
    rewardScrollTrigger?.refresh();
  };

  section.querySelectorAll('img').forEach((image) => {
    if (image.complete) return;

    image.addEventListener('load', refreshScroll);
    imageCleanups.push(() => {
      image.removeEventListener('load', refreshScroll);
    });
  });

  return () => {
    imageCleanups.forEach((cleanup) => cleanup());
    media.revert();
  };
}


function initAppreciationRewardsAnimation(root) {
  const section =
    typeof root === 'string'
      ? document.querySelector(root)
      : root?.matches?.('.appreciation-reward')
        ? root
        : root?.querySelector?.('.appreciation-reward');

  if (!section) {
    console.warn(
      '[AppreciationRewards] 未找到 .appreciation-reward'
    );

    return () => {};
  }

  const stick = section.querySelector(
    '.appreciation-reward__stick'
  );

  const header = section.querySelector(
    '.appreciation-reward__header'
  );

  const content = section.querySelector(
    '.appreciation-reward__content'
  );

  // const note = section.querySelector(
  //   '.appreciation-reward__note'
  // );

  const cards = gsap.utils.toArray(
    '.appreciation-reward__card',
    section
  );

  if (!stick || !cards.length) {
    console.warn(
      '[AppreciationRewards] 未找到 stick 或 card'
    );

    return () => {};
  }

  if (!header) {
    console.warn(
      '[AppreciationRewards] 未找到 .appreciation-reward__header'
    );
  }

  let timeline = null;
  let scrollTrigger = null;
  let stepTween = null;

  const ctx = gsap.context(() => {
    const totalCards = cards.length;

    /**
     * 找出需要单独移动的元素。
     *
     * 如果 note 在 content 里面，
     * 只移动 content，note 会跟着移动，
     * 避免 note 被重复偏移。
     */
    const moveCandidates = [
      header,
      content,
      // note
    ].filter(Boolean);

    const movingElements =
      moveCandidates.filter((element, index, elements) => {
        return !elements.some(
          (parent, parentIndex) =>
            parentIndex !== index &&
            parent.contains(element)
        );
      });

    /**
     * 必须存在 header，
     * 才能获取最后向上移动的距离。
     */
    const hasFinalMove =
      Boolean(header) &&
      movingElements.length > 0;

    /**
     * 卡片步骤 + 最后的整体上移步骤。
     *
     * 5 张卡片：
     * step-0 到 step-5 是卡片动画
     * step-6 是整体向上移动
     */
    const totalSteps =
      totalCards + (hasFinalMove ? 1 : 0);

    const isMobile = () =>
      window.matchMedia(
        '(max-width: 767px)'
      ).matches;

    const getCardWidth = () =>
      cards[0].getBoundingClientRect().width ||
      260;

    const getHiddenY = () => {
      const cardHeight =
        cards[0].getBoundingClientRect().height ||
        300;

      return Math.max(
        stick.clientHeight * 0.75,
        cardHeight * 1.5
      );
    };

    /**
     * 获取 header 高度。
     * header、content、note 都会向上移动这个距离。
     */
    const getHeaderHeight = () =>
      header?.getBoundingClientRect().height || 0;

    const getSpacing = count => {
      const cardWidth = getCardWidth();

      // 卡片中心之间的间距
      const desiredSpacing =
        cardWidth *
        (isMobile() ? 0.56 : 0.7);

      // 整组卡片允许占据的最大宽度
      const maxGroupWidth =
        stick.clientWidth *
        (isMobile() ? 0.94 : 0.78);

      const availableSpacing =
        count > 1
          ? (maxGroupWidth - cardWidth) /
            (count - 1)
          : desiredSpacing;

      return gsap.utils.clamp(
        cardWidth *
          (isMobile() ? 0.4 : 0.58),
        desiredSpacing,
        availableSpacing
      );
    };

    const getCardState = (
      index,
      visibleCount
    ) => {
      /**
       * 当前已显示卡片的中心位置。
       */
      const visibleCenterIndex =
        (visibleCount - 1) / 2;

      const distance =
        index - visibleCenterIndex;

      /**
       * 使用最终全部卡片的半径计算扇形强度。
       *
       * 避免只有两张卡片时，
       * 两张卡片直接使用最大旋转角度。
       */
      const finalRadius = Math.max(
        (totalCards - 1) / 2,
        1
      );

      const ratio =
        distance / finalRadius;

      const absoluteRatio =
        Math.abs(ratio);

      /**
       * 最外侧卡片最大下降距离。
       */
      const maxDrop =
        isMobile() ? 50 : 82;

      /**
       * 最外侧卡片最大旋转角度。
       */
      const maxRotation =
        isMobile() ? 10 : 14;

      /**
       * 卡片较少时，整体间距稍微收紧。
       * 卡片全部出现后恢复完整间距。
       */
      const spacingProgress =
        totalCards <= 1
          ? 1
          : gsap.utils.mapRange(
              1,
              totalCards,
              0.72,
              1,
              visibleCount
            );

      /**
       * 最外侧卡片稍微缩小。
       *
       * 5 张卡片最终为：
       * [0.94, 1, 1, 1, 0.94]
       */
      const scale =
        absoluteRatio >= 0.9
          ? isMobile()
            ? 0.96
            : 0.94
          : 1;

      return {
        x:
          distance *
          getSpacing(visibleCount) *
          spacingProgress,

        /**
         * 中间卡片最高。
         * 第二、第四张比第一、第五张高。
         */
        y:
          Math.pow(
            absoluteRatio,
            1.8
          ) * maxDrop,

        rotation:
          ratio * maxRotation,

        scale,

        /**
         * 中间卡片层级最高。
         */
        zIndex: Math.round(
          100 -
            Math.abs(distance) * 10
        )
      };
    };

    /**
     * 初始化所有卡片。
     */
    cards.forEach((card, index) => {
      gsap.set(card, {
        position: 'absolute',
        top: '50%',
        left: '50%',

        xPercent: -50,
        yPercent: -50,

        x: 0,
        y: getHiddenY(),

        rotation:
          isMobile() ? 6 : 10,

        scale: 0.92,
        autoAlpha: 0,

        zIndex: index + 1,

        transformOrigin: '50% 110%',

        force3D: true,
        willChange:
          'transform, opacity'
      });
    });

    /**
     * 初始化最后需要整体移动的元素。
     */
    if (hasFinalMove) {
      gsap.set(movingElements, {
        y: 0,
        force3D: true,
        willChange: 'transform'
      });
    }

    timeline = gsap.timeline({
      paused: true,

      defaults: {
        overwrite: 'auto'
      }
    });

    timeline.addLabel('step-0', 0);

    /**
     * 卡片依次从底部进入。
     */
    for (
      let visibleCount = 1;
      visibleCount <= totalCards;
      visibleCount += 1
    ) {
      const enteringIndex =
        visibleCount - 1;

      const enteringCard =
        cards[enteringIndex];

      const segmentStart =
        visibleCount - 1;

      /**
       * 已经出现的卡片重新组成扇形。
       */
      cards
        .slice(0, enteringIndex)
        .forEach((card, index) => {
          const targetState =
            getCardState(
              index,
              visibleCount
            );

          timeline.to(
            card,
            {
              x: targetState.x,
              y: targetState.y,

              rotation:
                targetState.rotation,

              scale:
                targetState.scale,

              zIndex:
                targetState.zIndex,

              autoAlpha: 1,

              duration: 0.65,
              ease: 'back.out(1.8)'
            },
            segmentStart
          );
        });

      /**
       * 当前卡片从底部进入。
       */
      const enteringState =
        getCardState(
          enteringIndex,
          visibleCount
        );

      timeline.fromTo(
        enteringCard,
        {
          x: enteringState.x,

          y: getHiddenY(),

          rotation:
            enteringState.rotation +
            (isMobile() ? 6 : 10),

          scale: 0.92,
          autoAlpha: 0
        },
        {
          x: enteringState.x,
          y: enteringState.y,

          rotation:
            enteringState.rotation,

          scale:
            enteringState.scale,

          zIndex:
            enteringState.zIndex,

          autoAlpha: 1,

          duration: 0.8,
          ease: 'back.out(2.2)',

          immediateRender: false
        },
        segmentStart
      );

      timeline.addLabel(
        `step-${visibleCount}`,
        visibleCount
      );
    }

    /**
     * 卡片全部完成后：
     *
     * header、content、note
     * 一起向上移动一个 header 的高度。
     */
    if (hasFinalMove) {
      const finalStep =
        totalCards + 1;

      timeline.to(
        movingElements,
        {
          y: () =>
            -getHeaderHeight() * 0.3,

          duration: 0.8,
          ease: 'power2.inOut'
        },
        totalCards
      );

      timeline.addLabel(
        `step-${finalStep}`,
        finalStep
      );
    }

    let currentStep = -1;

    const goToStep = (
      step,
      immediate = false
    ) => {
      const targetStep =
        gsap.utils.clamp(
          0,
          totalSteps,
          step
        );

      if (
        targetStep === currentStep &&
        !immediate
      ) {
        return;
      }

      currentStep = targetStep;

      stepTween?.kill();
      stepTween = null;

      if (immediate) {
        timeline.time(
          targetStep,
          false
        );

        return;
      }

      stepTween = timeline.tweenTo(
        `step-${targetStep}`,
        {
          duration: 0.55,
          ease: 'power2.out',
          overwrite: true,

          onComplete() {
            stepTween = null;
          }
        }
      );
    };

    scrollTrigger =
      ScrollTrigger.create({
        id: 'appreciation-reward-animation',

        trigger: section,

        /**
         * 使用你已有的 CSS sticky。
         * 这里不要增加 pin。
         */
        start: 'top top',
        end: 'bottom bottom',

        invalidateOnRefresh: false,

        onUpdate(self) {
          const nextStep =
            Math.round(
              self.progress *
                totalSteps
            );

          if (
            nextStep !== currentStep
          ) {
            goToStep(nextStep);
          }
        }
      });

    /**
     * 根据当前滚动位置初始化状态。
     */
    const initialStep = Math.round(
      scrollTrigger.progress *
        totalSteps
    );

    goToStep(initialStep, true);
  }, section);

  return () => {
    stepTween?.kill();
    stepTween = null;

    scrollTrigger?.kill();
    scrollTrigger = null;

    timeline?.kill();
    timeline = null;

    ctx.revert();
  };
}

// function initStoriesBeyondOrdinary(root) {
//   if (!root) {
//     return () => {};
//   }

//   const section = root.matches?.('.stories-beyond')
//     ? root
//     : root.querySelector('.stories-beyond');

//   if (!section) {
//     return () => {};
//   }

//   const cards = Array.from(
//     section.querySelectorAll('.story-card')
//   );

//   if (cards.length === 0) {
//     return () => {};
//   }

//   let resizeFrame = null;
//   let isDestroyed = false;

//   const getCardElements = (card) => ({
//     text: card.querySelector('.story-card__text'),
//     toggle: card.querySelector('.story-card__toggle')
//   });

//   const setExpanded = (card, expanded) => {
//     const { toggle } = getCardElements(card);

//     if (!toggle) {
//       return;
//     }

//     const canExpand = card.classList.contains(
//       'story-card--overflowing'
//     );

//     const nextExpanded = canExpand && expanded;

//     card.classList.toggle(
//       'story-card--expanded',
//       nextExpanded
//     );

//     toggle.setAttribute(
//       'aria-expanded',
//       String(nextExpanded)
//     );

//     const storyName = card
//       .querySelector('.story-card__name')
//       ?.textContent?.trim();

//     if (storyName) {
//       toggle.setAttribute(
//         'aria-label',
//         nextExpanded
//           ? `Collapse ${storyName}'s story`
//           : `Read ${storyName}'s full story`
//       );
//     }
//   };

//   const collapseOtherCards = (currentCard) => {
//     cards.forEach((card) => {
//       if (card !== currentCard) {
//         setExpanded(card, false);
//       }
//     });
//   };

//   const createMeasurementElement = (
//     textElement,
//     width
//   ) => {
//     const clone = textElement.cloneNode(true);

//     clone.removeAttribute('id');
//     clone.removeAttribute('aria-describedby');

//     clone.classList.remove('story-card__text');
//     clone.classList.add('story-card__measurement');

//     Object.assign(clone.style, {
//       position: 'fixed',
//       top: '-10000px',
//       left: '-10000px',
//       zIndex: '-1',
//       display: 'block',
//       width: `${width}px`,
//       height: 'auto',
//       minHeight: '0',
//       maxHeight: 'none',
//       margin: '0',
//       overflow: 'visible',
//       visibility: 'hidden',
//       pointerEvents: 'none',
//       whiteSpace: 'normal'
//     });

//     clone.style.setProperty(
//       '-webkit-line-clamp',
//       'unset'
//     );

//     clone.style.setProperty(
//       '-webkit-box-orient',
//       'initial'
//     );

//     return clone;
//   };

//   const measureCard = (card) => {
//     const { text, toggle } = getCardElements(card);

//     if (!text || !toggle) {
//       return;
//     }

//     const textWidth = text.getBoundingClientRect().width;

//     if (textWidth <= 0) {
//       return;
//     }

//     const computedStyle = window.getComputedStyle(text);

//     let lineHeight = Number.parseFloat(
//       computedStyle.lineHeight
//     );

//     if (!Number.isFinite(lineHeight)) {
//       const fontSize = Number.parseFloat(
//         computedStyle.fontSize
//       );

//       lineHeight = Number.isFinite(fontSize)
//         ? fontSize * 1.35
//         : 16;
//     }

//     const measurementElement =
//       createMeasurementElement(text, textWidth);

//     document.body.appendChild(measurementElement);

//     const fullTextHeight =
//       measurementElement.getBoundingClientRect().height;

//     measurementElement.remove();

//     const maximumHeight = lineHeight * 6;

//     const isOverflowing =
//       fullTextHeight > maximumHeight + 1;

//     card.classList.toggle(
//       'story-card--overflowing',
//       isOverflowing
//     );

//     toggle.hidden = !isOverflowing;

//     if (!isOverflowing) {
//       setExpanded(card, false);
//     }
//   };

//   const measureAllCards = () => {
//     if (isDestroyed) {
//       return;
//     }

//     cards.forEach(measureCard);
//   };

//   const scheduleMeasure = () => {
//     if (resizeFrame !== null) {
//       cancelAnimationFrame(resizeFrame);
//     }

//     resizeFrame = requestAnimationFrame(() => {
//       resizeFrame = null;
//       measureAllCards();
//     });
//   };

//   const toggleHandlers = cards
//     .map((card) => {
//       const { toggle } = getCardElements(card);

//       if (!toggle) {
//         return null;
//       }

//       const handleClick = () => {
//         const isExpanded = card.classList.contains(
//           'story-card--expanded'
//         );

//         collapseOtherCards(card);
//         setExpanded(card, !isExpanded);
//       };

//       const handleKeyDown = (event) => {
//         if (event.key !== 'Escape') {
//           return;
//         }

//         setExpanded(card, false);
//         toggle.blur();
//       };

//       toggle.addEventListener('click', handleClick);
//       toggle.addEventListener(
//         'keydown',
//         handleKeyDown
//       );

//       return () => {
//         toggle.removeEventListener(
//           'click',
//           handleClick
//         );

//         toggle.removeEventListener(
//           'keydown',
//           handleKeyDown
//         );
//       };
//     })
//     .filter(Boolean);

//   const handleDocumentPointerDown = (event) => {
//     if (section.contains(event.target)) {
//       return;
//     }

//     cards.forEach((card) => {
//       setExpanded(card, false);
//     });
//   };

//   document.addEventListener(
//     'pointerdown',
//     handleDocumentPointerDown
//   );

//   const resizeObserver =
//     typeof ResizeObserver !== 'undefined'
//       ? new ResizeObserver(scheduleMeasure)
//       : null;

//   cards.forEach((card) => {
//     resizeObserver?.observe(card);
//   });

//   window.addEventListener('resize', scheduleMeasure);

//   scheduleMeasure();

//   document.fonts?.ready
//     .then(() => {
//       if (!isDestroyed) {
//         scheduleMeasure();
//       }
//     })
//     .catch(() => undefined);

//   return () => {
//     isDestroyed = true;

//     if (resizeFrame !== null) {
//       cancelAnimationFrame(resizeFrame);
//     }

//     resizeObserver?.disconnect();

//     window.removeEventListener(
//       'resize',
//       scheduleMeasure
//     );

//     document.removeEventListener(
//       'pointerdown',
//       handleDocumentPointerDown
//     );

//     toggleHandlers.forEach((cleanup) => {
//       cleanup();
//     });

//     cards.forEach((card) => {
//       card.classList.remove(
//         'story-card--overflowing',
//         'story-card--expanded'
//       );

//       const { toggle } = getCardElements(card);

//       if (toggle) {
//         toggle.hidden = true;
//         toggle.setAttribute(
//           'aria-expanded',
//           'false'
//         );
//       }
//     });
//   };
// }
export function useAnniversary11thPage(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const cleanups = [];
    cleanups.push(initVideoBanner(root));
    cleanups.push(initPhotoWall(root));
    cleanups.push(initYearHighlightAnimation(root));

    
      cleanups.push(initializeAnimation(root));
       cleanups.push(initAppreciationRewardsAnimation(root));
  // cleanups.push(initStoriesBeyondOrdinary(root));
       

      
    const refreshScroll = () => window.ScrollTrigger?.refresh();
    const refreshFrame = requestAnimationFrame(refreshScroll);
    const refreshTimer = window.setTimeout(refreshScroll, 300);
    const fontsReady = document.fonts?.ready.then(refreshScroll);

    return () => {
      cancelAnimationFrame(refreshFrame);
      window.clearTimeout(refreshTimer);
      fontsReady?.catch(() => undefined);
      cleanups.forEach((fn) => fn?.());
    };
  }, [rootRef]);
}
export function useAnniversary11thLenis() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('anniversary-11th-page');

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, {immediate: true});
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: root.style.transform ? 'transform' : 'fixed',
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onRefresh);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(root, {});
      root.classList.remove('anniversary-11th-page');
    };
  }, []);
}
