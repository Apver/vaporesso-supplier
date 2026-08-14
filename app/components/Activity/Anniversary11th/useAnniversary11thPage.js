
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
// import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  const mediaQuery = window.matchMedia('(max-width: 1023px)');

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
  if (!rootContainer) return () => { };

  const stage = rootContainer.querySelector('.ui-v4-photo-wall__stage');
  if (!stage) return () => { };

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


function initYearHighlightAnimation(root) {
  if (!root) return () => { };

  const section = root.matches?.('.year-highlight')
    ? root
    : root.querySelector('.year-highlight');

  if (!section) return () => { };

  const wrapper = section.querySelector('.year-highlight__wrapper');
  const content = section.querySelector('.year-highlight__content');
  const cards = gsap.utils.toArray('.year-highlight__card', section);

  if (!wrapper || !content || !cards.length) return () => { };

  const clamp = gsap.utils.clamp;
  const lerp = (start, end, progress) => start + (end - start) * progress;
  const smoothstep = (start, end, value) => {
    const progress = clamp(0, 1, (value - start) / (end - start));
    return progress * progress * (3 - 2 * progress);
  };

  const media = gsap.matchMedia();
  // =========================
  // PC 端横向 3D 动画
  // =========================
  // media.add('(min-width: 1024px)', () => {
  //   const state = { offset: 0 };
  //   const maxRotateX = 88;

  //   let width = 0;
  //   let height = 0;
  //   let spacing = 0;
  //   let cardWidth = 0;
  //   let cardHeight = 0;
  //   let leftBound = 0;
  //   let visibleWidth = 0;
  //   let startOffset = 0;
  //   let endOffset = 0;

  //   const resize = () => {
  //     width = window.innerWidth;
  //     height = window.innerHeight;
  //     cardWidth = cards[0].offsetWidth || 480;
  //     cardHeight = cards[0].offsetHeight || 620;

  //     const rootFontSize = parseFloat(
  //       getComputedStyle(document.documentElement).fontSize
  //     );

  //     spacing = cardWidth + 10 * rootFontSize;
  //     leftBound = -cardWidth * 0.5;

  //     const rightBound = width + cardWidth * 0.5;

  //     visibleWidth = rightBound - leftBound;
  //     startOffset = leftBound;
  //     endOffset = rightBound + (cards.length - 1) * spacing;
  //   };

  //   const render = () => {
  //     cards.forEach((card, index) => {
  //       const x = state.offset - index * spacing;
  //       const progress = clamp(0, 1, (x - leftBound) / visibleWidth);
  //       const upright = Math.sin(progress * Math.PI);
  //       const opacity =
  //         smoothstep(0.005, 0.02, progress) *
  //         (1 - smoothstep(0.98, 0.995, progress));

  //       gsap.set(card, {
  //         x: x - cardWidth * 0.5,
  //         y: lerp(height * 0.84, height * 0.18, progress) - cardHeight * 0.5,
  //         z: upright * 72,
  //         rotationX: -Math.cos(progress * Math.PI) * maxRotateX,
  //         rotationZ: 0,
  //         scale: 1,
  //         opacity,
  //         visibility: opacity > 0.001 ? 'visible' : 'hidden',
  //         transformOrigin: '50% 50%',
  //         zIndex: Math.round(progress * 1000 + upright * 100),
  //         force3D: true
  //       });
  //     });
  //   };

  //   resize();
  //   state.offset = startOffset;
  //   render();

  //   const tween = gsap.to(state, {
  //     offset: endOffset,
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: section,
  //       start: 'top bottom',
  //       end: 'bottom top',
  //       scrub: true,
  //       invalidateOnRefresh: true,
  //       onRefreshInit: resize,
  //       onUpdate: render
  //     }
  //   });

  //   const handleResize = () => {
  //     resize();
  //     render();
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     tween.scrollTrigger?.kill();
  //     tween.kill();

  //     gsap.set(cards, {
  //       clearProps: 'transform,opacity,visibility,zIndex,transformOrigin'
  //     });
  //   };
  // });

// =========================
// PC 端：header + content 先上移，再从右向左平移
// =========================
media.add('(min-width: 1024px)', () => {
  const header = section.querySelector('.year-highlight__header');

  if (!header) {
    return () => {};
  }

  const state = {
    headerProgress: 0,
    offset: 0
  };

  const lastIndex = cards.length - 1;

  let viewportWidth = 0;
  let viewportHeight = 0;

  let cardWidth = 0;
  let cardHeight = 0;
  let spacing = 0;

  let leftBound = 0;
  let rightBound = 0;
  let visibleWidth = 0;

  let startOffset = 0;
  let endOffset = 0;

  let headerMoveY = 0;
  let contentMoveY = 0;

  const resize = () => {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    cardWidth = cards[0].offsetWidth || 480;
    cardHeight = cards[0].offsetHeight || 620;

    const rootFontSize =
      parseFloat(
        getComputedStyle(document.documentElement).fontSize
      ) || 10;

    const headerStyle = getComputedStyle(header);
    const headerMarginBottom =
      parseFloat(headerStyle.marginBottom) || 0;

    // 卡片之间的间距
    spacing = cardWidth + 4 * rootFontSize;

    // 左右可视边界
    leftBound = -cardWidth * 0.5;

    rightBound = viewportWidth + cardWidth * 0.5;

    visibleWidth = rightBound - leftBound;

    /*
     * 第一张初始已经露出约 75%。
     * 数值越大，初始露出的部分越多。
     */
    startOffset = viewportWidth - cardWidth * 1.86;

    /*
     * 最后一张卡片最终停在屏幕中间。
     */
    endOffset = viewportWidth * 0.5 - lastIndex * spacing;

    /*
     * header 向上移出屏幕。
     */
    headerMoveY = -(
      header.offsetTop +
      header.offsetHeight +
      2 * rootFontSize
    );

    /*
     * content 向上补掉 header + margin-bottom 的空间。
     * 想上移更多/更少。
     */
    contentMoveY = -(
      header.offsetHeight +
      headerMarginBottom
    );
  };

  const render = () => {
    const headerProgress = state.headerProgress;

    const headerOpacity =
      1 - smoothstep(0.7, 1, headerProgress);

    // header 上移并淡出
    gsap.set(header, {
      y: headerMoveY * headerProgress,
      opacity: headerOpacity,
      visibility: headerOpacity > 0.001 ? 'visible' : 'hidden',
      force3D: true
    });

    // year-highlight__content 同步向上移动
    gsap.set(content, {
      y: contentMoveY * headerProgress,
      force3D: true
    });

    // content 自己已经被整体上移，所以卡片内部 y 保持为 0
    const cardY = 0;

    cards.forEach((card, index) => {
      /*
       * 每一张卡片依次排列在右侧。
       * offset 减小时，整组从右向左移动。
       */
      const cardCenterX =
        state.offset +
        index * spacing;

      const progress = clamp(
        0,
        1,
        (
          rightBound -
          cardCenterX
        ) / visibleWidth
      );

      /*
       * 右侧进入时渐显，
       * 左侧离开时渐隐。
       */
      const opacity =
        smoothstep(
          0.001,
          0.025,
          progress
        ) *
        (
          1 -
          smoothstep(
            0.975,
            0.999,
            progress
          )
        );

      gsap.set(card, {
        x: cardCenterX - cardWidth * 0.5,
        y: cardY,
        z: 0,

        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,

        scale: 1,

        opacity,

        visibility:
          opacity > 0.001
            ? 'visible'
            : 'hidden',

        zIndex: cards.length - index,

        transformOrigin: '50% 50%',
        force3D: true
      });
    });
  };

  resize();

  state.headerProgress = 0;
  state.offset = startOffset;

  render();

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,

      // 和移动端一样：进入 sticky 后开始动画
      start: 'top top',
      end: 'bottom bottom',

      scrub: true,
      invalidateOnRefresh: true,

      onRefreshInit: resize,

      onRefresh: () => {
        resize();
        render();
      },

      onUpdate: render
    }
  });

  // 第一段：header 和 content 一起往上移
  timeline.to(state, {
    headerProgress: 1,
    duration: 1,
    ease: 'none',
    onUpdate: render
  });

  // 第二段：PC 卡片从右往左移动
  timeline.fromTo(
    state,
    {
      offset: () => startOffset
    },
    {
      offset: () => endOffset,
      duration: Math.max(lastIndex, 1),
      ease: 'none',
      immediateRender: false,
      onUpdate: render
    }
  );

  const handleResize = () => {
    resize();
    render();
    timeline.scrollTrigger?.refresh();
  };

  window.addEventListener(
    'resize',
    handleResize
  );

  return () => {
    window.removeEventListener(
      'resize',
      handleResize
    );

    timeline.scrollTrigger?.kill();
    timeline.kill();

    gsap.set(header, {
      clearProps: 'transform,opacity,visibility'
    });

    gsap.set(content, {
      clearProps: 'transform'
    });

    gsap.set(cards, {
      clearProps:
        'transform,opacity,visibility,zIndex,transformOrigin'
    });
  };
});

  media.add('(max-width: 1023px)', () => {
    const header = section.querySelector(
      '.year-highlight__header'
    );

    if (!header) {
      return () => { };
    }

    const state = {
      headerProgress: 0,
      step: 0
    };

    const lastIndex = cards.length - 1;

    let stageWidth = 0;
    let stageHeight = 0;
    let cardWidth = 0;
    let cardHeight = 0;

    let centerX = 0;
    let startCardY = 0;
    let endCardY = 0;
    let headerMoveY = 0;

    const resize = () => {
      stageWidth =
        wrapper.clientWidth ||
        window.innerWidth;

      stageHeight =
        wrapper.clientHeight ||
        window.innerHeight;

      cardWidth =
        cards[0].offsetWidth || 335;

      cardHeight =
        cards[0].offsetHeight || 500;

      const rootFontSize =
        parseFloat(
          getComputedStyle(
            document.documentElement
          ).fontSize
        ) || 10;

      const cardGap =
        0.72 * rootFontSize;

      centerX =
        stageWidth * 0.5;

      // 卡片初始位置：
      // header 底部再加 0.72rem
      startCardY =
        header.offsetTop +
        header.offsetHeight +
        cardGap;

      // header 离开后，卡片移动到屏幕中间
      endCardY =
        Math.max(
          0,
          (stageHeight - cardHeight) * 0.5
        );

      // header 向上完全移出屏幕
      headerMoveY =
        -(
          header.offsetTop +
          header.offsetHeight +
          cardGap
        );
    };

    const render = () => {
      const headerProgress =
        state.headerProgress;

      const currentIndex =
        Math.min(
          lastIndex,
          Math.floor(state.step)
        );

      const cardProgress =
        state.step - currentIndex;

      const baseX =
        centerX - cardWidth * 0.5;

      // header 上移时，卡片同步移动到屏幕中间
      const baseY = lerp(
        startCardY,
        endCardY,
        headerProgress
      );

      const headerOpacity =
        1 -
        smoothstep(
          0.7,
          1,
          headerProgress
        );

      gsap.set(header, {
        y: headerMoveY * headerProgress,
        opacity: headerOpacity,
        visibility:
          headerOpacity > 0.001
            ? 'visible'
            : 'hidden',
        force3D: true
      });

      cards.forEach((card, index) => {
        let rotationX = 0;
        let opacity = 1;
        let visibility = 'visible';
        let zIndex = cards.length - index;

        // 已经翻走的卡片
        if (index < currentIndex) {
          opacity = 0;
          visibility = 'hidden';
          zIndex = 0;
        }

        // 当前卡片从底部向外翻
        if (index === currentIndex) {
          rotationX = lerp(
            0,
            -88,
            cardProgress * cardProgress
          );

          opacity =
            1 -
            smoothstep(
              0.85,
              1,
              cardProgress
            );

          visibility =
            opacity > 0.001
              ? 'visible'
              : 'hidden';

          zIndex = 1000;
        }

        // 后面的卡片保持叠放
        if (index > currentIndex) {
          rotationX = 0;
          opacity = 1;
          visibility = 'visible';
          zIndex = cards.length - index;
        }

        gsap.set(card, {
          x: baseX,
          y: baseY,
          z: 0,

          scale: 1,

          rotationX,
          rotationY: 0,
          rotationZ: 0,

          opacity,
          visibility,
          zIndex,

          transformOrigin: '50% 100%',
          force3D: true
        });
      });
    };

    resize();
    render();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,

        onRefreshInit: resize,

        onRefresh: () => {
          resize();
          render();
        },

        onUpdate: render
      }
    });

    // 第一段：header 向上移出，card 移到中间
    timeline.to(state, {
      headerProgress: 1,
      duration: 1,
      ease: 'none',
      onUpdate: render
    });

    // 第二段：开始逐张翻牌
    timeline.to(state, {
      step: lastIndex,
      duration: lastIndex,
      ease: 'none',
      onUpdate: render
    });

    const handleResize = () => {
      resize();
      render();
    };

    window.addEventListener(
      'resize',
      handleResize
    );

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      );

      timeline.scrollTrigger?.kill();
      timeline.kill();

      gsap.set(header, {
        clearProps:
          'transform,opacity,visibility'
      });

      gsap.set(cards, {
        clearProps:
          'transform,opacity,visibility,zIndex,transformOrigin'
      });
    };
  });

  return () => {
    media.revert();
    gsap.killTweensOf(cards);

    gsap.set(cards, {
      clearProps: 'transform,opacity,visibility,zIndex,transformOrigin'
    });
  };
}


function initializeAnimation(root) {
  const section = root.querySelector('.reward-list');
  const cardWrapper = section?.querySelector(
    '.reward-list__content__wrp'
  );
  const mainHeader = section?.querySelector(
    '.reward-list__header'
  );

  const cards = section
    ? Array.from(
        section.querySelectorAll('.reward-list__card')
      )
    : [];

  if (!section || !cardWrapper || cards.length < 2) {
    return () => {};
  }

  const media = gsap.matchMedia();
  const imageCleanups = [];

  let rewardScrollTrigger = null;
  let refreshFrame = null;

  media.add(
    {
      isMobile: '(max-width: 1023px)',
      isDesktop: '(min-width: 1024px)',
    },
    (context) => {
      const {isMobile} = context.conditions;

      const headers = cards.map((card) =>
        card.querySelector('.reward-card__header')
      );

      let timeline = null;
      let mainHeaderHeight = 0;
      let moveUpDistance = 0;

      const setLayout = () => {
        const rootFontSize =
          parseFloat(
            window.getComputedStyle(
              document.documentElement
            ).fontSize
          ) || 10;

        const extraOffset = 5 * rootFontSize;

        gsap.set(cardWrapper, {
          y: 0,
          x: 0,
        });

        if (mainHeader) {
          gsap.set(mainHeader, {
            y: 0,
            x: 0,
          });
        }

        const sectionStyle =
          window.getComputedStyle(section);

        const safePadding =
          parseFloat(sectionStyle.paddingTop) || 40;

        if (mainHeader) {
          const headerStyle =
            window.getComputedStyle(mainHeader);

          const sectionRect =
            section.getBoundingClientRect();

          const wrapperRect =
            cardWrapper.getBoundingClientRect();

          const marginBottom =
            parseFloat(headerStyle.marginBottom) || 0;

          mainHeaderHeight =
            mainHeader.offsetHeight + marginBottom;

          if (isMobile) {
            moveUpDistance = Math.max(
              0,
              wrapperRect.top -
                sectionRect.top -
                safePadding
            );
          } else {
            moveUpDistance = Math.max(
              0,
              mainHeaderHeight -
                safePadding -
                extraOffset
            );
          }

          gsap.set(mainHeader, {
            y: 0,
            // force3D: isMobile ? false : 'auto',
          });
        } else {
          mainHeaderHeight = 0;
          moveUpDistance = 0;
        }

        const headerHeight = Math.max(
          0,
          ...headers.map(
            (header) => header?.offsetHeight || 0
          )
        );

        const firstCard = cards[0];

        const paddingTop = firstCard
          ? parseFloat(
              window.getComputedStyle(firstCard).paddingTop
            ) || 0
          : 0;

        const stackOffset =
          headerHeight + paddingTop;

        gsap.set(cardWrapper, {
          position: 'relative',
          paddingBottom:
            stackOffset * (cards.length - 1),
          y: 0,

          // force3D: isMobile ? false : 'auto',
        });

        cards.forEach((card, index) => {
          const isFirst = index === 0;
          const direction =
            index % 2 === 1 ? 1 : -1;

          if (isFirst) {
            gsap.set(card, {
              position: 'relative',
              zIndex: 1,

              x: 0,
              y: 0,
              xPercent: 0,
              yPercent: 0,
              rotation: 0,

              transformOrigin: '50% 50%',
              // force3D: isMobile ? false : 'auto',
            });

            return;
          }

          const extraY = index === 2 ? 25 : 0;

         const extraY1 = isMobile && index === 1 ? 16 : 0;

          // const mobileCardUpOffset = isMobile
          //   ? 0.1 * index * rootFontSize
          //   : 0;

          gsap.set(card, {
            position: 'absolute',
            top:
              index * stackOffset,
            left: 0,
            right: 0,
            margin: '0 auto',
            zIndex: index + 1,

            x: 0,
            y: 0,
            xPercent: direction * 20,
            yPercent: index * 75 + extraY + extraY1,
            rotation: direction * -5,

            transformOrigin: '50% 50%',
            // force3D: isMobile ? false : 'auto',
          });
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

          scrub: isMobile ? 0.3 : true,


          invalidateOnRefresh: true,
          onRefreshInit: setLayout,
        },
      });

      rewardScrollTrigger =
        timeline.scrollTrigger;

      const wrapperMoveDuration = 0.5;

      if (mainHeader && mainHeaderHeight > 0) {
        timeline.to(
          mainHeader,
          {
            y: () => -mainHeaderHeight,
            duration: wrapperMoveDuration,
            ease: 'none',
          },
          0
        );

        timeline.to(
          cardWrapper,
          {
            y: () => -moveUpDistance,
            duration: wrapperMoveDuration,
            ease: 'none',
          },
          0
        );
      }

      cards.slice(1).forEach((card, index) => {
        const cardOffset =
          index === 1 ? 0.7 : index * 0.7;

        const startTime =
          wrapperMoveDuration + cardOffset;

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

      timeline.to({}, {duration: 0.15});

      return () => {
          const scrollTrigger = timeline?.scrollTrigger;
        timeline?.scrollTrigger?.kill();
        timeline?.kill();

        timeline = null;

        // if (
        //   rewardScrollTrigger ===
        //   timeline?.scrollTrigger
        // ) {
        //   rewardScrollTrigger = null;
        // }
        if (rewardScrollTrigger === scrollTrigger) { rewardScrollTrigger = null; }

        gsap.set(cards, {
          clearProps: [
            'position',
            'top',
            'left',
            'right',
            'margin',
            'zIndex',
            'transform',
            'willChange',
          ].join(','),
        });

        gsap.set(cardWrapper, {
          clearProps: [
            'position',
            'paddingBottom',
            'transform',
            'willChange',
          ].join(','),
        });

        if (mainHeader) {
          gsap.set(mainHeader, {
            clearProps: 'transform,willChange',
          });
        }
      };
    }
  );

  /*
   * 多张图片同时加载时，只在下一帧刷新一次，
   * 避免连续 refresh 导致页面重排。
   */
  const refreshScroll = () => {
    if (refreshFrame) {
      cancelAnimationFrame(refreshFrame);
    }

    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = null;
      rewardScrollTrigger?.refresh();
    });
  };

  section
    .querySelectorAll('img')
    .forEach((image) => {
      if (image.complete) return;

      image.addEventListener('load', refreshScroll);
      image.addEventListener('error', refreshScroll);

      imageCleanups.push(() => {
        image.removeEventListener(
          'load',
          refreshScroll
        );

        image.removeEventListener(
          'error',
          refreshScroll
        );
      });
    });

  return () => {
    if (refreshFrame) {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = null;
    }

    imageCleanups.forEach((cleanup) =>
      cleanup()
    );

    media.revert();
    rewardScrollTrigger = null;
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

  const title = section.querySelector(
    '.appreciation-reward__header__title'
  );

  const cardWrapper = section.querySelector(
    '.appreciation-reward__content__wrp'
  );

  const cards = gsap.utils.toArray(
    '.appreciation-reward__card',
    section
  );

  if (
    !stick ||
    !title ||
    !cardWrapper ||
    !cards.length
  ) {
    console.warn(
      '[AppreciationRewards] 缺少动画所需元素'
    );

    return () => {};
  }

  const originalTitleHTML = title.innerHTML;
  const originalAriaLabel =
    title.getAttribute('aria-label');
  const originalTitleStyle =
    title.getAttribute('style');

  let cardTimeline = null;
  let impactTimeline = null;
  let scrollTrigger = null;
  let stepTween = null;

  let impactProgressTween = null;
  let impactDelayCall = null;

  let currentStep = -1;
  let scatterStates = [];
  let destroyed = false;

  /**
   * 将标题拆分成单个字符。
   */
  const splitTitleIntoChars = () => {
    const titleSpans = Array.from(
      title.querySelectorAll(
        '.appreciation-reward__header__title_span'
      )
    );

    const fullText = titleSpans
      .map(span => span.textContent)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    title.setAttribute(
      'aria-label',
      fullText
    );

    title.style.overflow = 'visible';

    const characterElements = [];
    const characterInners = [];

    titleSpans.forEach(span => {
      const text = span.textContent;

      const fragment =
        document.createDocumentFragment();

      span.textContent = '';
      span.style.overflow = 'visible';

      span.style.background = 'none';
      span.style.backgroundImage = 'none';
      span.style.backgroundClip =
        'border-box';
      span.style.webkitBackgroundClip =
        'border-box';
      span.style.webkitTextFillColor =
        'currentColor';

      if (
        span.classList.contains(
          'appreciation-reward__header__title_span1'
        )
      ) {
        span.style.color = '#d44cff';
      }

      Array.from(text).forEach(character => {
        const char =
          document.createElement('span');

        const charInner =
          document.createElement('span');

        char.className = 'char';
        charInner.className = 'char-inner';

        char.setAttribute(
          'aria-hidden',
          'true'
        );

        Object.assign(char.style, {
          position: 'relative',
          display: 'inline-flex',
          overflow: 'visible',
          verticalAlign: 'baseline',
          whiteSpace: 'pre'
        });

        Object.assign(
          charInner.style,
          {
            position: 'relative',
            display: 'inline-flex',
            overflow: 'visible',

            color: 'inherit',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',

            webkitTextFillColor:
              'currentColor',

            transformOrigin: '50% 50%',
            backfaceVisibility: 'visible'
          }
        );

        if (character === ' ') {
          char.classList.add(
            'char--space'
          );

          charInner.textContent =
            '\u00a0';
        } else {
          charInner.textContent =
            character;
        }

        char.appendChild(charInner);
        fragment.appendChild(char);

        characterElements.push(char);
        characterInners.push(charInner);
      });

      span.appendChild(fragment);
    });

    return {
      characterElements,
      characterInners
    };
  };

  const {
    characterElements,
    characterInners
  } = splitTitleIntoChars();

  const ctx = gsap.context(() => {
    const totalCards = cards.length;

    const mobileMedia =
      window.matchMedia(
        '(max-width: 1023px)'
      );

    const isMobile = () =>
      mobileMedia.matches;

    /**
     * 布局缓存。
     *
     * 避免卡片动画过程中反复执行：
     * getBoundingClientRect、
     * offsetWidth、
     * offsetHeight。
     */
    let layoutCache = null;

    const cardStateCache =
      new Map();

    /**
     * 卡片整体上下位置。
     *
     * 数字越大，卡片越靠下。
     */
    const getCardDownOffset = () =>
      isMobile() ? 120 : 10;

    /**
     * 第一张卡片进入后，
     * 延迟触发文字散开。
     */
    const getImpactDelay = () =>
      0.05;

    const randomValue = (
      index,
      salt = 1
    ) => {
      const value =
        Math.sin(
          (index + 1) * 12.9898 +
          salt * 78.233
        ) * 43758.5453;

      return value -
        Math.floor(value);
    };

    const randomRange = (
      index,
      salt,
      min,
      max
    ) =>
      gsap.utils.interpolate(
        min,
        max,
        randomValue(index, salt)
      );

    /**
     * 清除所有布局缓存。
     */
    const clearLayoutCache = () => {
      layoutCache = null;
      cardStateCache.clear();
    };

    /**
     * 统一读取一次布局。
     */
    const measureLayout = () => {
      const firstCard = cards[0];

      const cardRect =
        firstCard.getBoundingClientRect();

      const wrapperRect =
        cardWrapper.getBoundingClientRect();

      const titleRect =
        title.getBoundingClientRect();

      const cardWidth =
        firstCard.offsetWidth ||
        cardRect.width ||
        260;

      const cardHeight =
        firstCard.offsetHeight ||
        cardRect.height ||
        360;

      const wrapperCenterX =
        wrapperRect.left +
        wrapperRect.width / 2;

      const wrapperCenterY =
        wrapperRect.top +
        wrapperRect.height / 2;

      const titleCenterX =
        titleRect.left +
        titleRect.width / 2;

      const titleCenterY =
        titleRect.top +
        titleRect.height / 2;

      layoutCache = {
        cardWidth,
        cardHeight,

        stickWidth:
          stick.clientWidth,

        stickHeight:
          stick.clientHeight,

        baseX:
          titleCenterX -
          wrapperCenterX,

        baseY:
          titleCenterY -
          wrapperCenterY +
          getCardDownOffset(),

        hiddenY: Math.max(
          stick.clientHeight * 0.82,
          cardHeight * 1.65
        )
      };

      cardStateCache.clear();
    };

    const getLayout = () => {
      if (!layoutCache) {
        measureLayout();
      }

      return layoutCache;
    };

    const getCardSize = () => {
      const {
        cardWidth,
        cardHeight
      } = getLayout();

      return {
        width: cardWidth,
        height: cardHeight
      };
    };

    const getHiddenY = () =>
      getLayout().hiddenY;

    const getStackBasePosition = () => {
      const {
        baseX,
        baseY
      } = getLayout();

      return {
        x: baseX,
        y: baseY
      };
    };

    const getSpacing = count => {
      const {
        cardWidth,
        stickWidth
      } = getLayout();

      const desiredSpacing =
        cardWidth *
        (isMobile() ? 0.56 : 0.7);

      const maxGroupWidth =
        stickWidth *
        (isMobile() ? 0.94 : 0.78);

      const availableSpacing =
        count > 1
          ? (
            maxGroupWidth -
            cardWidth
          ) /
          (count - 1)
          : desiredSpacing;

      return gsap.utils.clamp(
        cardWidth *
        (isMobile() ? 0.4 : 0.58),

        desiredSpacing,

        availableSpacing
      );
    };

    /**
     * 固定卡片层级。
     *
     * 第三张卡片出现后，
     * 始终保持最上层。
     */
    const getCardZIndex = index => {
       if (isMobile()) {
    return index + 1;
  }
      if (index === 2) {
        return totalCards + 100;
      }
      
      if (index === totalCards - 1) {
        return Math.max(1, index - 1);
      }

      return index + 1;
    };

    /**
     * 实际计算卡片位置。
     */
    const calculateCardState = (
      index,
      visibleCount
    ) => {
      const basePosition =
        getStackBasePosition();

      const {
        width: cardWidth,
        height: cardHeight
      } = getCardSize();

      /**
       * 移动端堆叠布局。
       */
      if (isMobile()) {
        const depth =
          visibleCount -
          1 -
          index;

        const stackStates = [
          {
            x: 0,
            y: 0,
            rotation: 5,
            scale: 1
          },
          {
            x: cardWidth * 0.035,
            y: -cardHeight * 0.006,
            rotation: 3,
            scale: 1
          },
          {
            x: cardWidth * 0.06,
            y: -cardHeight * 0.012,
            rotation: 1,
            scale: 1
          },
          {
            x: -cardWidth * 0.04,
            y: cardHeight * 0.008,
            rotation: -3,
            scale: 1
          },
          {
            x: -cardWidth * 0.065,
            y: cardHeight * 0.016,
            rotation: -6,
            scale: 1
          }
        ];

        const state =
          stackStates[
            Math.min(
              Math.max(depth, 0),
              stackStates.length - 1
            )
          ];

        return {
          x:
            basePosition.x +
            state.x,

          y:
            basePosition.y +
            state.y,

          rotation:
            state.rotation,

          scale:
            state.scale
        };
      }

      /**
       * PC 扇形布局。
       */
      const visibleCenterIndex =
        (visibleCount - 1) / 2;

      const distance =
        index -
        visibleCenterIndex;

      const finalRadius = Math.max(
        (totalCards - 1) / 2,
        1
      );

      const ratio =
        distance /
        finalRadius;

      const absoluteRatio =
        Math.abs(ratio);

      const maxDrop = 82;
      const maxRotation = 14;

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

      return {
        x:
          basePosition.x +
          distance *
          getSpacing(visibleCount) *
          spacingProgress,

        y:
          basePosition.y +
          Math.pow(
            absoluteRatio,
            1.8
          ) *
          maxDrop,

        rotation:
          ratio *
          maxRotation,

        scale:
          absoluteRatio >= 0.9
            ? 0.94
            : 1
      };
    };

    /**
     * 获取卡片位置。
     *
     * 同一个步骤中的同一张卡片
     * 只计算一次。
     */
    const getCardState = (
      index,
      visibleCount
    ) => {
      const cacheKey =
        `${index}-${visibleCount}`;

      if (
        !cardStateCache.has(
          cacheKey
        )
      ) {
        cardStateCache.set(
          cacheKey,
          calculateCardState(
            index,
            visibleCount
          )
        );
      }

      return cardStateCache.get(
        cacheKey
      );
    };

    /**
     * 计算文字飞散方向。
     */
    const createScatterStates = () => {
      const titleRect =
        title.getBoundingClientRect();

      const impactX =
        titleRect.left +
        titleRect.width / 2;

      const impactY =
        titleRect.bottom;

      return characterElements.map(
        (
          characterElement,
          index
        ) => {
          const rect =
            characterElement
              .getBoundingClientRect();

          const characterX =
            rect.left +
            rect.width / 2;

          const characterY =
            rect.top +
            rect.height / 2;

          let directionX =
            characterX -
            impactX;

          let directionY =
            characterY -
            impactY;

          const length = Math.max(
            Math.hypot(
              directionX,
              directionY
            ),
            1
          );

          directionX /= length;
          directionY /= length;

          const distance =
            randomRange(
              index,
              2,
              isMobile() ? 35 : 120,
              isMobile() ? 90 : 300
            );

          const extraX =
            randomRange(
              index,
              3,
              isMobile() ? -12 : -38,
              isMobile() ? 12 : 38
            );

          const upwardForce =
            randomRange(
              index,
              4,
              isMobile() ? 18 : 45,
              isMobile() ? 48 : 115
            );

          return {
            x:
              directionX *
              distance +
              extraX,

            y:
              directionY *
              distance -
              upwardForce,

            rotation:
              randomRange(
                index,
                5,
                -120,
                120
              ),

            scale:
              randomRange(
                index,
                6,
                0.74,
                0.92
              )
          };
        }
      );
    };

    /**
     * 初始化测量。
     */
    measureLayout();

    scatterStates =
      createScatterStates();

    /**
     * 初始化文字。
     */
    gsap.set(characterInners, {
      x: 0,
      y: 0,

      rotation: 0,

      scaleX: 1,
      scaleY: 1,

      autoAlpha: 1,

      transformOrigin: '50% 50%',

      force3D: true,

      willChange:
        'transform, opacity'
    });

    /**
     * 文字撞散动画。
     */
    impactTimeline =
      gsap.timeline({
        paused: true,

        defaults: {
          overwrite: 'auto'
        }
      });

    /**
     * 第一段：
     * 撞击瞬间稍微顶开。
     */
    impactTimeline.to(
      characterInners,
      {
        x: index =>
          (
            scatterStates[index]?.x ||
            0
          ) * 0.1,

        y: index =>
          (
            scatterStates[index]?.y ||
            0
          ) * 0.1,

        rotation: index =>
          (
            scatterStates[index]
              ?.rotation ||
            0
          ) * 0.08,

        scaleX: 1.03,
        scaleY: 0.96,

        autoAlpha: 1,

        duration: 0.18,

        stagger: {
          amount:
            isMobile()
              ? 0.05
              : 0.08,

          from: 'center'
        },

        ease: 'power2.out'
      },
      0
    );

    /**
     * 第二段：
     * 文字完整散开。
     */
    impactTimeline.to(
      characterInners,
      {
        x: index =>
          scatterStates[index]?.x ||
          0,

        y: index =>
          scatterStates[index]?.y ||
          0,

        rotation: index =>
          scatterStates[index]
            ?.rotation ||
          0,

        scaleX: index =>
          scatterStates[index]
            ?.scale ||
          0.82,

        scaleY: index =>
          scatterStates[index]
            ?.scale ||
          0.82,

        autoAlpha: 1,

        duration: 0.78,

        stagger: {
          amount:
            isMobile()
              ? 0.16
              : 0.24,

          from: 'center'
        },

        ease: 'power2.out'
      },
      0.12
    );

    /**
     * 第三段：
     * 继续扩散并慢慢淡出。
     */
    impactTimeline.to(
      characterInners,
      {
        x: index =>
          (
            scatterStates[index]?.x ||
            0
          ) * 1.15,

        y: index =>
          (
            scatterStates[index]?.y ||
            0
          ) * 1.15,

        rotation: index =>
          (
            scatterStates[index]
              ?.rotation ||
            0
          ) * 1.12,

        scaleX: index =>
          (
            scatterStates[index]
              ?.scale ||
            0.82
          ) * 0.92,

        scaleY: index =>
          (
            scatterStates[index]
              ?.scale ||
            0.82
          ) * 0.92,

        autoAlpha: 0,

        duration: 0.55,

        stagger: {
          amount:
            isMobile()
              ? 0.09
              : 0.14,

          from: 'center'
        },

        ease: 'power1.out'
      },
      1.08
    );

    /**
     * 控制文字散开或恢复。
     */
    const setImpactTarget = (
      opened,
      immediate = false
    ) => {
      impactDelayCall?.kill();
      impactDelayCall = null;

      impactProgressTween?.kill();
      impactProgressTween = null;

      const targetProgress =
        opened ? 1 : 0;

      if (immediate) {
        impactTimeline
          .progress(targetProgress)
          .pause();

        return;
      }

      const currentProgress =
        impactTimeline.progress();

      const progressDistance =
        Math.abs(
          targetProgress -
          currentProgress
        );

      if (
        progressDistance <
        0.001
      ) {
        impactTimeline
          .progress(targetProgress)
          .pause();

        return;
      }

      impactTimeline.pause();

      const baseDuration =
        opened ? 1.5 : 0.62;

      impactProgressTween =
        gsap.to(
          impactTimeline,
          {
            progress:
              targetProgress,

            duration: Math.max(
              0.12,
              baseDuration *
              progressDistance
            ),

            ease: opened
              ? 'power2.out'
              : 'power2.inOut',

            overwrite: true,

            onComplete() {
              impactTimeline
                .progress(
                  targetProgress
                )
                .pause();

              impactProgressTween =
                null;
            },

            onInterrupt() {
              impactProgressTween =
                null;
            }
          }
        );
    };

    /**
     * 延迟执行文字散开。
     */
    const scheduleImpactOpen = () => {
      impactDelayCall?.kill();

      impactDelayCall =
        gsap.delayedCall(
          getImpactDelay(),
          () => {
            impactDelayCall = null;

            if (currentStep <= 0) {
              return;
            }

            setImpactTarget(true);
          }
        );
    };

    /**
     * 初始化所有卡片。
     */
    cards.forEach(
      (card, index) => {
        gsap.set(card, {
          position: 'absolute',
          top: '50%',
          left: '50%',

          xPercent: -50,
          yPercent: -50,

          x: () =>
            getStackBasePosition().x,

          y: () =>
            getHiddenY(),

          rotation:
            isMobile() ? 6 : 10,

          scale: 0.92,
          autoAlpha: 0,

          zIndex:
            getCardZIndex(index),

          transformOrigin:
            isMobile()
              ? '50% 50%'
              : '50% 110%',

          force3D: true,

          willChange:
            'transform, opacity'
        });
      }
    );

    /**
     * 卡片主时间轴。
     */
    cardTimeline =
      gsap.timeline({
        paused: true,

        defaults: {
          overwrite: 'auto'
        }
      });

    cardTimeline.addLabel(
      'step-0',
      0
    );

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
       * 已经出现的卡片重新排列。
       *
       * 移动端不再让所有旧卡片
       * 强烈反弹，降低动画压力。
       */
      cards
        .slice(0, enteringIndex)
        .forEach((card, index) => {
          cardTimeline.to(
            card,
            {
              x: () =>
                getCardState(
                  index,
                  visibleCount
                ).x,

              y: () =>
                getCardState(
                  index,
                  visibleCount
                ).y,

              rotation: () =>
                getCardState(
                  index,
                  visibleCount
                ).rotation,

              scale: () =>
                getCardState(
                  index,
                  visibleCount
                ).scale,

              autoAlpha: 1,

              duration:
                isMobile()
                  ? 0.42
                  : 0.65,

              ease:
                isMobile()
                  ? 'power3.out'
                  : 'back.out(1.8)'
            },
            segmentStart
          );
        });

      /**
       * 当前卡片从底部进入。
       */
      cardTimeline.fromTo(
        enteringCard,
        {
          x: () =>
            getCardState(
              enteringIndex,
              visibleCount
            ).x,

          y: () =>
            getHiddenY(),

          rotation: () =>
            getCardState(
              enteringIndex,
              visibleCount
            ).rotation +
            (
              isMobile()
                ? 6
                : 10
            ),

          scale: 0.92,
          autoAlpha: 0
        },
        {
          x: () =>
            getCardState(
              enteringIndex,
              visibleCount
            ).x,

          y: () =>
            getCardState(
              enteringIndex,
              visibleCount
            ).y,

          rotation: () =>
            getCardState(
              enteringIndex,
              visibleCount
            ).rotation,

          scale: () =>
            getCardState(
              enteringIndex,
              visibleCount
            ).scale,

          autoAlpha: 1,

          duration:
            isMobile()
              ? 0.56
              : 0.8,

          ease:
            isMobile()
              ? 'power3.out'
              : 'back.out(2.2)',

          immediateRender: false
        },
        segmentStart
      );

      cardTimeline.addLabel(
        `step-${visibleCount}`,
        visibleCount
      );
    }

    /**
     * 切换卡片步骤。
     */
    const goToStep = (
      step,
      immediate = false
    ) => {
      const targetStep =
        gsap.utils.clamp(
          0,
          totalCards,
          step
        );

      if (
        targetStep === currentStep &&
        !immediate
      ) {
        return;
      }

      const previousStep =
        currentStep < 0
          ? targetStep
          : currentStep;

      currentStep =
        targetStep;

      stepTween?.kill();
      stepTween = null;

      /**
       * 初始化或刷新时，
       * 直接设置到对应状态。
       */
      if (immediate) {
        cardTimeline.time(
          targetStep,
          false
        );

        setImpactTarget(
          targetStep > 0,
          true
        );

        return;
      }

      /**
       * 第一张卡片进入时，
       * 撞散标题文字。
       */
      if (
        previousStep === 0 &&
        targetStep > 0
      ) {
        scheduleImpactOpen();
      }

      /**
       * 回滚到第一张卡片之前，
       * 恢复标题文字。
       */
      if (
        previousStep > 0 &&
        targetStep === 0
      ) {
        setImpactTarget(false);
      }

      stepTween =
        cardTimeline.tweenTo(
          `step-${targetStep}`,
          {
            duration:
              isMobile()
                ? 0.46
                : 0.58,

            ease: 'power2.out',
            overwrite: true,

            onComplete() {
              stepTween = null;
            },

            onInterrupt() {
              stepTween = null;
            }
          }
        );
    };

    const getStableStep = self => {
      const rawStep =
        self.progress *
        totalCards;

      if (currentStep < 0) {
        return Math.round(rawStep);
      }

      /**
       * PC 继续使用直接计算，
       * 只对移动端增加缓冲区。
       */
      if (!isMobile()) {
        return Math.round(rawStep);
      }

      let nextStep =
        currentStep;

      if (self.direction > 0) {
        while (
          nextStep < totalCards &&
          rawStep >=
            nextStep + 0.62
        ) {
          nextStep += 1;
        }
      } else if (
        self.direction < 0
      ) {
        while (
          nextStep > 0 &&
          rawStep <=
            nextStep - 0.62
        ) {
          nextStep -= 1;
        }
      } else {
        nextStep =
          Math.round(rawStep);
      }

      return gsap.utils.clamp(
        0,
        totalCards,
        nextStep
      );
    };

    scrollTrigger =
      ScrollTrigger.create({
        id:
          'appreciation-reward-animation',

        trigger: section,

        start: 'top top',
        end: 'bottom bottom',

        invalidateOnRefresh: true,

        onUpdate(self) {
          const nextStep =
            getStableStep(self);

          if (
            nextStep !== currentStep
          ) {
            goToStep(nextStep);
          }
        },

        // onRefresh(self) {
        //   /**
        //    * 尺寸变化后，
        //    * 重新测量一次布局。
        //    */
        //   clearLayoutCache();
        //   measureLayout();

        //   scatterStates =
        //     createScatterStates();

        //   cardTimeline.invalidate();
        //   impactTimeline.invalidate();

        //   /**
        //    * 刷新后重新固定层级。
        //    */
        //   cards.forEach(
        //     (card, index) => {
        //       gsap.set(card, {
        //         zIndex:
        //           getCardZIndex(index)
        //       });
        //     }
        //   );

        //   const refreshStep =
        //     Math.round(
        //       self.progress *
        //       totalCards
        //     );

        //   goToStep(
        //     refreshStep,
        //     true
        //   );
        // }
        onRefresh(self) {
            clearLayoutCache();
            measureLayout();

            scatterStates = createScatterStates();

            cardTimeline.invalidate();
            impactTimeline.invalidate();

            cards.forEach((card, index) => {
              gsap.set(card, {
                zIndex: getCardZIndex(index),
              });
            });

            const refreshStep =
              currentStep >= 0
                ? currentStep
                : Math.round(self.progress * totalCards);

            goToStep(refreshStep, true);
          }
      });

    const initialStep =
      Math.round(
        scrollTrigger.progress *
        totalCards
      );

    goToStep(
      initialStep,
      true
    );

    document.fonts?.ready
      .then(() => {
        if (destroyed) {
          return;
        }

        clearLayoutCache();
        ScrollTrigger.refresh();
      })
      .catch(() => {});
  }, section);

  return () => {
    destroyed = true;

    impactDelayCall?.kill();
    impactDelayCall = null;

    impactProgressTween?.kill();
    impactProgressTween = null;

    stepTween?.kill();
    stepTween = null;

    impactTimeline?.kill();
    impactTimeline = null;

    scrollTrigger?.kill();
    scrollTrigger = null;

    cardTimeline?.kill();
    cardTimeline = null;

    ctx.revert();

    title.innerHTML =
      originalTitleHTML;

    if (
      originalAriaLabel === null
    ) {
      title.removeAttribute(
        'aria-label'
      );
    } else {
      title.setAttribute(
        'aria-label',
        originalAriaLabel
      );
    }

    if (
      originalTitleStyle === null
    ) {
      title.removeAttribute(
        'style'
      );
    } else {
      title.setAttribute(
        'style',
        originalTitleStyle
      );
    }
  };
}

function initStoriesBeyondOrdinary(root) {

  const section = root.matches('.stories-beyond')
    ? root
    : root.querySelector('.stories-beyond');

  if (!section) return () => { };

  const cards = Array.from(section.querySelectorAll('.story-card'));
  if (cards.length === 0) return () => { };

  let isDestroyed = false;
  const toggleHandlers = [];

  const getCardElements = (card) => ({
    text: card.querySelector('.story-card__text'),
    toggle: card.querySelector('.story-card__toggle')
  });

  const setExpanded = (card, expanded) => {
    const { toggle } = getCardElements(card);
    if (!toggle) return;

    // 只有在内容确实溢出的情况下才允许展开
    const canExpand = card.classList.contains('story-card--overflowing');
    const nextExpanded = canExpand && expanded;

    card.classList.toggle('story-card--expanded', nextExpanded);
    toggle.setAttribute('aria-expanded', String(nextExpanded));

    const storyName = card.querySelector('.story-card__name')?.textContent?.trim();
    if (storyName) {
      toggle.setAttribute(
        'aria-label',
        nextExpanded ? `Collapse ${storyName}'s story` : `Read ${storyName}'s full story`
      );
    }
  };

  const collapseOtherCards = (currentCard) => {
    cards.forEach((card) => {
      if (card !== currentCard) setExpanded(card, false);
    });
  };

  // 判断是否溢出
  const measureCard = (card) => {
    if (isDestroyed) return;

    const { text, toggle } = getCardElements(card);
    if (!text || !toggle) return;

    // 如果当前是展开状态，先临时移除展开状态的影响
    const wasExpanded = card.classList.contains('story-card--expanded');
    if (wasExpanded) {
      card.classList.remove('story-card--expanded');
    }

    const isOverflowing = text.scrollHeight > text.clientHeight + 2;

    card.classList.toggle('story-card--overflowing', isOverflowing);
    toggle.hidden = !isOverflowing;

    // 恢复之前的展开状态
    if (isOverflowing && wasExpanded) {
      card.classList.add('story-card--expanded');
    } else if (!isOverflowing) {
      setExpanded(card, false);
    }
  };

  // 初始化所有卡片的事件
  cards.forEach((card) => {
    const { toggle } = getCardElements(card);
    if (!toggle) return;

    const handleClick = () => {
      const isExpanded = card.classList.contains('story-card--expanded');
      collapseOtherCards(card);
      setExpanded(card, !isExpanded);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setExpanded(card, false);
        toggle.blur();
      }
    };

    toggle.addEventListener('click', handleClick);
    toggle.addEventListener('keydown', handleKeyDown);

    toggleHandlers.push({ toggle, handleClick, handleKeyDown });
  });

  // 点击外部收起
  const handleDocumentPointerDown = (event) => {
    if (!section.contains(event.target)) {
      cards.forEach((card) => setExpanded(card, false));
    }
  };
  document.addEventListener('pointerdown', handleDocumentPointerDown);

  // 只重新计算尺寸发生变化的卡片
  let resizeFrame = null;
  const resizeObserver = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver((entries) => {
      if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        entries.forEach((entry) => measureCard(entry.target));
        resizeFrame = null;
      });
    })
    : null;

  cards.forEach((card) => {
    resizeObserver?.observe(card);
    measureCard(card); 
  });

  // 字体加载完成后重新测量
  document.fonts?.ready
    .then(() => {
      if (!isDestroyed) cards.forEach(measureCard);
    })
    .catch(() => undefined);

  return () => {
    isDestroyed = true;
    if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);

    resizeObserver?.disconnect();
    document.removeEventListener('pointerdown', handleDocumentPointerDown);

    toggleHandlers.forEach(({ toggle, handleClick, handleKeyDown }) => {
      toggle.removeEventListener('click', handleClick);
      toggle.removeEventListener('keydown', handleKeyDown);
    });

    cards.forEach((card) => {
      card.classList.remove('story-card--overflowing', 'story-card--expanded');
      const { toggle } = getCardElements(card);
      if (toggle) {
        toggle.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  };
}

function initExtraordinaryHeroVideo(section) {
  const video = section.querySelector(
    '.extraordinary-hero__video',
  );

  if (!video) {
    return () => { };
  }

  const mobileMedia = window.matchMedia(
    '(max-width: 1023px)',
  );

  let currentSrc = '';
  let destroyed = false;

  const playVideo = () => {
    if (destroyed) return;

    video.play().catch(() => {
    });
  };

  const updateVideo = () => {
    if (destroyed) return;

    const isMobile = mobileMedia.matches;

    const nextSrc = isMobile
      ? video.dataset.mobileSrc
      : video.dataset.pcSrc;

    const nextPoster = isMobile
      ? video.dataset.mobilePoster
      : video.dataset.pcPoster;

    if (!nextSrc) {
      console.warn(
        '当前设备没有配置视频地址',
      );

      return;
    }

    if (nextPoster) {
      video.poster = nextPoster;
    } else {
      video.removeAttribute('poster');
    }

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    if (currentSrc === nextSrc) {
      playVideo();
      return;
    }

    currentSrc = nextSrc;

    video.pause();
    video.src = nextSrc;
    video.load();

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo, {
        once: true,
      });
    }
  };

  updateVideo();

  if (mobileMedia.addEventListener) {
    mobileMedia.addEventListener(
      'change',
      updateVideo,
    );
  } else {
    mobileMedia.addListener(updateVideo);
  }

  return () => {
    destroyed = true;

    if (mobileMedia.removeEventListener) {
      mobileMedia.removeEventListener(
        'change',
        updateVideo,
      );
    } else {
      mobileMedia.removeListener(updateVideo);
    }

    video.removeEventListener(
      'loadeddata',
      playVideo,
    );

    video.pause();
  };
}

function initExtraordinaryHeroAnimation(root) {
  const section = root.matches?.('.extraordinary-hero')
    ? root
    : root.querySelector('.extraordinary-hero');

  if (!section) {
    return () => { };
  }

  const sticky = section.querySelector(
    '.extraordinary-hero__sticky',
  );

  const media = section.querySelector(
    '.extraordinary-hero__media',
  );

  const video = section.querySelector(
    '.extraordinary-hero__video',
  );

  const overlay = section.querySelector(
    '.extraordinary-hero__overlay',
  );

  const content = section.querySelector(
    '.extraordinary-hero__content',
  );

  const title = section.querySelector(
    '.extraordinary-hero__title',
  );

  const titleScript = section.querySelector(
    '.extraordinary-hero__title-script',
  );

  const titleSides = gsap.utils.toArray(
    '.extraordinary-hero__title-side',
    section,
  );

  const meta = section.querySelector(
    '.extraordinary-hero__meta',
  );

  if (
    !sticky ||
    !media ||
    !video ||
    !overlay ||
    !content ||
    !title ||
    !titleScript ||
    titleSides.length === 0 ||
    !meta
  ) {
    console.warn(
      '模块内部元素不完整',
    );

    return () => { };
  }

  const gsapInstance = gsap;
  const ScrollTriggerInstance = ScrollTrigger;

  gsapInstance.registerPlugin(
    ScrollTriggerInstance,
  );

  const cleanupVideo =
    initExtraordinaryHeroVideo(section);

  let gsapMatchMedia = null;

  const context = gsapInstance.context(() => {
    gsapMatchMedia = gsapInstance.matchMedia();

    gsapMatchMedia.add(
      {
        desktop: '(min-width: 1024px)',
        mobile: '(max-width: 1023px)',
        reduceMotion:
          '(prefers-reduced-motion: reduce)',
      },
      (matchMediaContext) => {
        const {
          mobile,
          reduceMotion,
        } = matchMediaContext.conditions;

        gsapInstance.set(media, {
          clearProps: 'width,height',
        });

        if (mobile) {
          gsapInstance.set(section, {
            height: '240svh',
          });
        }

        gsapInstance.set(sticky, {
          backgroundColor: '#ffffff',
        });

        gsapInstance.set(overlay, {
          autoAlpha: 0,
        });

        gsapInstance.set(content, {
          autoAlpha: 1,
        });

        gsapInstance.set(title, {
          autoAlpha: 1,
        });

        gsapInstance.set(titleSides, {
          autoAlpha: 0,
          y: 16,
        });

        gsapInstance.set(titleScript, {
          scale: 1.18,
          transformOrigin: 'center center',
        });

        gsapInstance.set(meta, {
          autoAlpha: 0,
          y: 24,
        });

        /*
         * 开启减少动态效果时，
         * 直接显示最终状态。
         */
        if (reduceMotion) {
          gsapInstance.set(section, {
            height: '100svh',
          });

          gsapInstance.set(media, {
            width: '100%',
            height: '100%',
          });

          gsapInstance.set(sticky, {
            backgroundColor: '#fff',
          });

          gsapInstance.set(overlay, {
            autoAlpha: 1,
          });

          gsapInstance.set(titleSides, {
            autoAlpha: 1,
            y: 0,
          });

          gsapInstance.set(titleScript, {
            scale: 1,
          });

          gsapInstance.set(meta, {
            autoAlpha: 1,
            y: 0,
          });

          return undefined;
        }

        const timeline = gsapInstance.timeline({
          defaults: {
            ease: 'none',
          },

          scrollTrigger: {
            id: 'extraordinary-hero-animation',
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        /*
         * 视频从 CSS 设置的初始尺寸，
         * 扩展到全屏。
         */
        timeline.to(
          media,
          {
            width: '100%',
            height: '100%',
            duration: 1.4,
            ease: 'power2.inOut',
          },
          0,
        );

        /*
         * 背景由白色切换为深色。
         */
        timeline.to(
          sticky,
          {
            backgroundColor: '#fff',
            duration: 0.35,
            ease: 'none',
          },
          0,
        );

        /*
         * 视频遮罩出现。
         */
        timeline.to(
          overlay,
          {
            autoAlpha: 0.25,
            duration: 0.45,
            ease: 'none',
          },
          0.42,
        );

        /*
         * Extraordinary 缩放到最终尺寸。
         */
        timeline.to(
          titleScript,
          {
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
          },
          0.58,
        );

        /*
         * 显示左右两侧标题。
         */
        timeline.to(
          titleSides,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.04,
          },
          0.64,
        );

        /*
         * 显示描述和按钮。
         */
        timeline.to(
          meta,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          0.72,
        );

        /*
         * 保留最终全屏状态。
         */
        timeline.to(
          {},
          {
            duration: 0.35,
          },
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      },
    );
  }, section);

  const refreshScrollTrigger = () => {
    ScrollTriggerInstance.refresh();
  };

  video.addEventListener(
    'loadedmetadata',
    refreshScrollTrigger,
  );

  const refreshFrame = requestAnimationFrame(
    refreshScrollTrigger,
  );

  return () => {
    cancelAnimationFrame(refreshFrame);

    video.removeEventListener(
      'loadedmetadata',
      refreshScrollTrigger,
    );

    cleanupVideo?.();
    gsapMatchMedia?.revert();
    context.revert();
  };
}
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
    cleanups.push(initStoriesBeyondOrdinary(root));
    cleanups.push(initExtraordinaryHeroAnimation(root));

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
    const html = document.documentElement;

    html.classList.add('anniversary-11th-page');

    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true,
    });

    const lenis = new Lenis({
      autoRaf: false,
      autoResize: true,
      smoothWheel: true,
      syncTouch: false,
    });

    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };

    const handleGsapTick = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', handleLenisScroll);

    gsap.ticker.add(handleGsapTick);
    gsap.ticker.lagSmoothing(0);

    let refreshFrame = requestAnimationFrame(() => {
      refreshFrame = null;
      ScrollTrigger.refresh();
    });

    const handlePageShow = (event) => {
      if (!event.persisted) return;

      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      if (refreshFrame) {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = null;
      }

      window.removeEventListener(
        'pageshow',
        handlePageShow
      );

      lenis.off?.('scroll', handleLenisScroll);

      gsap.ticker.remove(handleGsapTick);

      lenis.destroy();

      html.classList.remove(
        'anniversary-11th-page'
      );
    };
  }, []);
}
