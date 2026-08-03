
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
  media.add('(min-width: 1024px)', () => {
    const state = { offset: 0 };
    const maxRotateX = 88;

    let width = 0;
    let height = 0;
    let spacing = 0;
    let cardWidth = 0;
    let cardHeight = 0;
    let leftBound = 0;
    let visibleWidth = 0;
    let startOffset = 0;
    let endOffset = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      cardWidth = cards[0].offsetWidth || 480;
      cardHeight = cards[0].offsetHeight || 620;

      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );

      spacing = cardWidth + 10 * rootFontSize;
      leftBound = -cardWidth * 0.5;

      const rightBound = width + cardWidth * 0.5;

      visibleWidth = rightBound - leftBound;
      startOffset = leftBound;
      endOffset = rightBound + (cards.length - 1) * spacing;
    };

    const render = () => {
      cards.forEach((card, index) => {
        const x = state.offset - index * spacing;
        const progress = clamp(0, 1, (x - leftBound) / visibleWidth);
        const upright = Math.sin(progress * Math.PI);
        const opacity =
          smoothstep(0.005, 0.02, progress) *
          (1 - smoothstep(0.98, 0.995, progress));

        gsap.set(card, {
          x: x - cardWidth * 0.5,
          y: lerp(height * 0.84, height * 0.18, progress) - cardHeight * 0.5,
          z: upright * 72,
          rotationX: -Math.cos(progress * Math.PI) * maxRotateX,
          rotationZ: 0,
          scale: 1,
          opacity,
          visibility: opacity > 0.001 ? 'visible' : 'hidden',
          transformOrigin: '50% 50%',
          zIndex: Math.round(progress * 1000 + upright * 100),
          force3D: true
        });
      });
    };

    resize();
    state.offset = startOffset;
    render();

    const tween = gsap.to(state, {
      offset: endOffset,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        onRefreshInit: resize,
        onUpdate: render
      }
    });

    const handleResize = () => {
      resize();
      render();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tween.scrollTrigger?.kill();
      tween.kill();

      gsap.set(cards, {
        clearProps: 'transform,opacity,visibility,zIndex,transformOrigin'
      });
    };
  });

  // =========================
  // 移动端纵向翻牌动画
  // =========================
  // media.add('(max-width: 1023px)', () => {
  //   const state = { step: 0 };
  //   const lastIndex = cards.length - 1;

  //   let stageWidth = 0;
  //   // let stageHeight = 0;
  //   let cardWidth = 0;
  //   let cardHeight = 0;
  //   let centerX = 0;
  //   let centerY = 0;

  //   // const resize = () => {
  //   //   stageWidth = content.clientWidth || window.innerWidth;
  //   //   stageHeight = content.clientHeight || window.innerHeight;
  //   //   cardWidth = cards[0].offsetWidth || 335;
  //   //   cardHeight = cards[0].offsetHeight || 500;
  //   //   centerX = stageWidth * 0.5;
  //   //   centerY = stageHeight * 0.5;
  //   // };
  //     const resize = () => {
  //       stageWidth = content.clientWidth || window.innerWidth;
  //       cardWidth =cards[0].offsetWidth || 335;
  //       cardHeight = cards[0].offsetHeight || 500;
  //       const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 10;
  //       centerX = stageWidth * 0.5;
  //       centerY = cardHeight * 0.5 + 1.2 * rootFontSize;
  //     };

  //   const render = () => {
  //     const currentIndex = Math.floor(state.step);
  //     const progress = state.step - currentIndex;

  //     const baseX = centerX - cardWidth * 0.5;
  //     const baseY = centerY - cardHeight * 0.5;

  //     cards.forEach((card, index) => {
  //       let rotationX = 0;
  //       let opacity = 1;
  //       let visibility = 'visible';
  //       let zIndex = cards.length - index;
  //       if (index < currentIndex) {
  //         opacity = 0;
  //         visibility = 'hidden';
  //         zIndex = 0;
  //       }
  //       // 当前卡片向外翻
  //       if (index === currentIndex) {
  //         rotationX = lerp(0, -88, progress * progress);
  //         opacity = 1 - smoothstep(0.85, 1, progress);
  //         visibility = opacity > 0.001 ? 'visible' : 'hidden';
  //         zIndex = 1000;
  //       }

  //       // 后面的卡片全部保持原位叠放
  //       if (index > currentIndex) {
  //         rotationX = 0;
  //         opacity = 1;
  //         visibility = 'visible';
  //         zIndex = cards.length - index;
  //       }

  //       gsap.set(card, {
  //         x: baseX,
  //         y: baseY,
  //         z: 0,
  //         scale: 1,
  //         rotationX,
  //         rotationY: 0,
  //         rotationZ: 0,
  //         opacity,
  //         visibility,
  //         zIndex,
  //         transformOrigin: '50% 100%',
  //         force3D: true
  //       });
  //     });
  //   };

  //   resize();
  //   render();

  //   const tween = gsap.to(state, {
  //     step: lastIndex,
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: content,
  //       start: 'top top',
  //       endTrigger: wrapper,
  //       end: 'bottom bottom',
  //       scrub: true,
  //       invalidateOnRefresh: true,
  //       onRefreshInit: resize,
  //       onRefresh: () => {
  //         resize();
  //         render();
  //       },
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

  media.add('(max-width: 1023px)', () => {
  const header = section.querySelector(
    '.year-highlight__header'
  );

  if (!header) {
    return () => {};
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
  const cardWrapper = section?.querySelector('.reward-list__content__wrp');
  const mainHeader = section?.querySelector('.reward-list__header');

  const cards = section
    ? Array.from(section.querySelectorAll('.reward-list__card'))
    : [];



  if (!section || !cardWrapper || cards.length < 2) {
    return () => { };
  }

  const media = gsap.matchMedia();
  const imageCleanups = [];
  let rewardScrollTrigger = null;


  media.add('all', () => {
    // gsap.set(cardWrapper, { position: 'relative' });

    const headers = cards.map((card) =>
      card.querySelector('.reward-card__header')
    );

    let timeline = null;
    let mainHeaderHeight = 0;
    let moveUpDistance = 0;


    const setLayout = () => {
      const isMobile = window.matchMedia('(max-width: 1023px)').matches;

      const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 10;
      const extraOffset = 5 * rootFontSize;

      const sectionStyle = window.getComputedStyle(section);
      const safePadding = parseFloat(sectionStyle.paddingTop || 0) || 40;

      if (mainHeader) {
        const style = window.getComputedStyle(mainHeader);
        const sectionRect = section.getBoundingClientRect();
        const wrapperRect = cardWrapper.getBoundingClientRect();
        mainHeaderHeight = mainHeader.offsetHeight + parseFloat(style.marginBottom || 0);
        moveUpDistance = isMobile ? Math.max(0, wrapperRect.top - sectionRect.top - safePadding) : Math.max(0, mainHeaderHeight - safePadding - extraOffset);
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
        scrub: true,
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


// function initAppreciationRewardsAnimation(root) {
//   const section =
//     typeof root === 'string'
//       ? document.querySelector(root)
//       : root?.matches?.('.appreciation-reward')
//         ? root
//         : root?.querySelector?.('.appreciation-reward');

//   if (!section) {
//     console.warn(
//       '[AppreciationRewards] 未找到 .appreciation-reward'
//     );

//     return () => { };
//   }

//   const stick = section.querySelector(
//     '.appreciation-reward__stick'
//   );

//   const header = section.querySelector(
//     '.appreciation-reward__header'
//   );

//   const content = section.querySelector(
//     '.appreciation-reward__content'
//   );

//   // const note = section.querySelector(
//   //   '.appreciation-reward__note'
//   // );

//   const cards = gsap.utils.toArray(
//     '.appreciation-reward__card',
//     section
//   );

//   if (!stick || !cards.length) {
//     console.warn(
//       '[AppreciationRewards] 未找到 stick 或 card'
//     );

//     return () => { };
//   }

//   if (!header) {
//     console.warn(
//       '[AppreciationRewards] 未找到 .appreciation-reward__header'
//     );
//   }

//   let timeline = null;
//   let scrollTrigger = null;
//   let stepTween = null;

//   const ctx = gsap.context(() => {
//     const totalCards = cards.length;

//     /**
//      * 找出需要单独移动的元素。
//      *
//      * 如果 note 在 content 里面，
//      * 只移动 content，note 会跟着移动，
//      * 避免 note 被重复偏移。
//      */
//     const moveCandidates = [
//       header,
//       content,
//       // note
//     ].filter(Boolean);

//     const movingElements =
//       moveCandidates.filter((element, index, elements) => {
//         return !elements.some(
//           (parent, parentIndex) =>
//             parentIndex !== index &&
//             parent.contains(element)
//         );
//       });

//     /**
//      * 必须存在 header，
//      * 才能获取最后向上移动的距离。
//      */
//     const hasFinalMove =
//       Boolean(header) &&
//       movingElements.length > 0;

//     /**
//      * 卡片步骤 + 最后的整体上移步骤。
//      *
//      * 5 张卡片：
//      * step-0 到 step-5 是卡片动画
//      * step-6 是整体向上移动
//      */
//     const totalSteps =
//       totalCards + (hasFinalMove ? 1 : 0);

//     const isMobile = () =>
//       window.matchMedia(
//         '(max-width: 1023px)'
//       ).matches;

//     const getCardWidth = () =>
//       cards[0].getBoundingClientRect().width ||
//       260;

//     const getHiddenY = () => {
//       const cardHeight =
//         cards[0].getBoundingClientRect().height ||
//         300;

//       return Math.max(
//         stick.clientHeight * 0.75,
//         cardHeight * 1.5
//       );
//     };

//     /**
//      * 获取 header 高度。
//      * header、content、note 都会向上移动这个距离。
//      */
//     const getHeaderHeight = () =>
//       header?.getBoundingClientRect().height || 0;
//     const getSpacing = count => {
//       const cardWidth = getCardWidth();

//       // 卡片中心之间的间距
//       const desiredSpacing =
//         cardWidth *
//         (isMobile() ? 0.56 : 0.7);

//       // 整组卡片允许占据的最大宽度
//       const maxGroupWidth =
//         stick.clientWidth *
//         (isMobile() ? 0.94 : 0.78);

//       const availableSpacing =
//         count > 1
//           ? (maxGroupWidth - cardWidth) /
//           (count - 1)
//           : desiredSpacing;

//       return gsap.utils.clamp(
//         cardWidth *
//         (isMobile() ? 0.4 : 0.58),
//         desiredSpacing,
//         availableSpacing
//       );
//     };
//     const getCardState = (
//       index,
//       visibleCount
//     ) => {
//       const cardRect =
//         cards[0].getBoundingClientRect();

//       const cardWidth =
//         cardRect.width || 260;

//       const cardHeight =
//         cardRect.height || 360;

//       /**
//        * 移动端：
//        * 最新出现的卡片在最上面，
//        * 其他卡片只露出边缘。
//        */
//       if (isMobile()) {
//         /**
//          * depth:
//          * 0 = 当前最上面的卡片
//          * 1 = 上面卡片的下一层
//          * 以此类推
//          */
//         const depth =
//           visibleCount - 1 - index;

//         const stackStates = [
//           {
//             x: 0,
//             y: 0,
//             rotation: 5,
//             scale: 1
//           },
//           {
//             x: cardWidth * 0.035,
//             y: -cardHeight * 0.006,
//             rotation: 3,
//             scale: 1
//           },
//           {
//             x: cardWidth * 0.06,
//             y: -cardHeight * 0.012,
//             rotation: 1,
//             scale: 1
//           },
//           {
//             x: -cardWidth * 0.04,
//             y: cardHeight * 0.008,
//             rotation: -3,
//             scale: 1
//           },
//           {
//             x: -cardWidth * 0.065,
//             y: cardHeight * 0.016,
//             rotation: -6,
//             scale: 1
//           }
//         ];

//         const state =
//           stackStates[
//           Math.min(
//             depth,
//             stackStates.length - 1
//           )
//           ];

//         return {
//           ...state,

//           /**
//            * DOM 越靠后的卡片层级越高，
//            * 确保 Creative Desk Set 在最上面。
//            */
//           zIndex: index + 1
//         };
//       }

//       /**
//        * PC 端继续使用原来的扇形排列。
//        */
//       const visibleCenterIndex =
//         (visibleCount - 1) / 2;

//       const distance =
//         index - visibleCenterIndex;

//       const finalRadius = Math.max(
//         (totalCards - 1) / 2,
//         1
//       );

//       const ratio =
//         distance / finalRadius;

//       const absoluteRatio =
//         Math.abs(ratio);

//       const maxDrop = 82;
//       const maxRotation = 14;

//       const spacingProgress =
//         totalCards <= 1
//           ? 1
//           : gsap.utils.mapRange(
//             1,
//             totalCards,
//             0.72,
//             1,
//             visibleCount
//           );

//       const scale =
//         absoluteRatio >= 0.9
//           ? 0.94
//           : 1;

//       return {
//         x:
//           distance *
//           getSpacing(visibleCount) *
//           spacingProgress,

//         y:
//           Math.pow(
//             absoluteRatio,
//             1.8
//           ) * maxDrop,

//         rotation:
//           ratio * maxRotation,

//         scale,

//         zIndex: Math.round(
//           100 -
//           Math.abs(distance) * 10
//         )
//       };
//     };

//     /**
//      * 初始化所有卡片。
//      */
//     cards.forEach((card, index) => {
//       gsap.set(card, {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',

//         xPercent: -50,
//         yPercent: -50,

//         x: 0,
//         y: getHiddenY(),

//         rotation:
//           isMobile() ? 6 : 10,

//         scale: 0.92,
//         autoAlpha: 0,

//         zIndex: index + 1,

//         transformOrigin: isMobile() ? '50% 50%' : '50% 110%',

//         force3D: true,
//         willChange:
//           'transform, opacity'
//       });
//     });

//     /**
//      * 初始化最后需要整体移动的元素。
//      */
//     if (hasFinalMove) {
//       gsap.set(movingElements, {
//         y: 0,
//         force3D: true,
//         willChange: 'transform'
//       });
//     }

//     timeline = gsap.timeline({
//       paused: true,

//       defaults: {
//         overwrite: 'auto'
//       }
//     });

//     timeline.addLabel('step-0', 0);

//     /**
//      * 卡片依次从底部进入。
//      */
//     for (
//       let visibleCount = 1;
//       visibleCount <= totalCards;
//       visibleCount += 1
//     ) {
//       const enteringIndex =
//         visibleCount - 1;

//       const enteringCard =
//         cards[enteringIndex];

//       const segmentStart =
//         visibleCount - 1;

//       /**
//        * 已经出现的卡片重新组成扇形。
//        */
//       cards
//         .slice(0, enteringIndex)
//         .forEach((card, index) => {
//           const targetState =
//             getCardState(
//               index,
//               visibleCount
//             );

//           timeline.to(
//             card,
//             {
//               x: targetState.x,
//               y: targetState.y,

//               rotation:
//                 targetState.rotation,

//               scale:
//                 targetState.scale,

//               zIndex:
//                 targetState.zIndex,

//               autoAlpha: 1,

//               duration: 0.65,
//               ease: 'back.out(1.8)'
//             },
//             segmentStart
//           );
//         });

//       /**
//        * 当前卡片从底部进入。
//        */
//       const enteringState =
//         getCardState(
//           enteringIndex,
//           visibleCount
//         );

//       timeline.fromTo(
//         enteringCard,
//         {
//           x: enteringState.x,

//           y: getHiddenY(),

//           rotation:
//             enteringState.rotation +
//             (isMobile() ? 6 : 10),

//           scale: 0.92,
//           autoAlpha: 0
//         },
//         {
//           x: enteringState.x,
//           y: enteringState.y,

//           rotation:
//             enteringState.rotation,

//           scale:
//             enteringState.scale,

//           zIndex:
//             enteringState.zIndex,

//           autoAlpha: 1,

//           duration: 0.8,
//           ease: 'back.out(2.2)',

//           immediateRender: false
//         },
//         segmentStart
//       );

//       timeline.addLabel(
//         `step-${visibleCount}`,
//         visibleCount
//       );
//     }

//     /**
//      * 卡片全部完成后：
//      *
//      * header、content、note
//      * 一起向上移动一个 header 的高度。
//      */
//     if (hasFinalMove) {
//       const finalStep =
//         totalCards + 1;

//       timeline.to(
//         movingElements,
//         {
//           y: () =>
//             -getHeaderHeight() * 0.3,

//           duration: 0.8,
//           ease: 'power2.inOut'
//         },
//         totalCards
//       );

//       timeline.addLabel(
//         `step-${finalStep}`,
//         finalStep
//       );
//     }

//     let currentStep = -1;

//     const goToStep = (
//       step,
//       immediate = false
//     ) => {
//       const targetStep =
//         gsap.utils.clamp(
//           0,
//           totalSteps,
//           step
//         );

//       if (
//         targetStep === currentStep &&
//         !immediate
//       ) {
//         return;
//       }

//       currentStep = targetStep;

//       stepTween?.kill();
//       stepTween = null;

//       if (immediate) {
//         timeline.time(
//           targetStep,
//           false
//         );

//         return;
//       }

//       stepTween = timeline.tweenTo(
//         `step-${targetStep}`,
//         {
//           duration: 0.55,
//           ease: 'power2.out',
//           overwrite: true,

//           onComplete() {
//             stepTween = null;
//           }
//         }
//       );
//     };

//     scrollTrigger =
//       ScrollTrigger.create({
//         id: 'appreciation-reward-animation',

//         trigger: section,

//         /**
//          * 使用你已有的 CSS sticky。
//          * 这里不要增加 pin。
//          */
//         start: 'top top',
//         end: 'bottom bottom',

//         invalidateOnRefresh: false,

//         onUpdate(self) {
//           const nextStep =
//             Math.round(
//               self.progress *
//               totalSteps
//             );

//           if (
//             nextStep !== currentStep
//           ) {
//             goToStep(nextStep);
//           }
//         }
//       });

//     /**
//      * 根据当前滚动位置初始化状态。
//      */
//     const initialStep = Math.round(
//       scrollTrigger.progress *
//       totalSteps
//     );

//     goToStep(initialStep, true);
//   }, section);

//   return () => {
//     stepTween?.kill();
//     stepTween = null;

//     scrollTrigger?.kill();
//     scrollTrigger = null;

//     timeline?.kill();
//     timeline = null;

//     ctx.revert();
//   };
// }

function initAppreciationRewardsAnimation(root) {
  const section =
    typeof root === 'string'
      ? document.querySelector(root)
      : root?.matches?.('.appreciation-reward')
        ? root
        : root?.querySelector?.(
            '.appreciation-reward'
          );

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

  const originalTitleHTML =
    title.innerHTML;

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
  let impactTarget = false;
  let scatterStates = [];
  let destroyed = false;

  /**
   * 将标题中的所有 span 拆成单个字符。
   *
   * 黑色文字和强调色文字都会拆分。
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

      /*
       * 取消旧的文字渐变，改为纯色。
       */
      span.style.background = 'none';
      span.style.backgroundImage = 'none';
      span.style.backgroundClip = 'border-box';
      span.style.webkitBackgroundClip =
        'border-box';

      span.style.webkitTextFillColor =
        'currentColor';

      /*
       * Appreciation 的纯色。
       * 需要更换颜色只改这里。
       */
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
          display: 'inline-block',
          overflow: 'visible',
          verticalAlign: 'baseline',
          whiteSpace: 'pre'
        });

        Object.assign(
          charInner.style,
          {
            position: 'relative',
            display: 'inline-block',
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

    const isMobile = () =>
      window.matchMedia(
        '(max-width: 1023px)'
      ).matches;

    /**
     * 卡片整体向下偏移。
     *
     * 数字越大，卡片越靠下。
     */
    const getCardDownOffset = () =>
      isMobile() ? 200 : 10;

    /**
     * 第一张卡片开始进入后，
     * 经过多少秒触发文字散开。
     *
     * 这不是滚动进度。
     */
    const getImpactDelay = () =>
      isMobile() ? 0.05 : 0.05;

    const randomValue = (
      index,
      salt = 1
    ) => {
      const value =
        Math.sin(
          (index + 1) * 12.9898 +
            salt * 78.233
        ) * 43758.5453;

      return value - Math.floor(value);
    };

    const randomRange = (
      index,
      salt,
      min,
      max
    ) => {
      return gsap.utils.interpolate(
        min,
        max,
        randomValue(index, salt)
      );
    };

    /**
     * 使用 offsetWidth / offsetHeight，
     * 避免卡片 transform 后尺寸变化。
     */
    const getCardSize = () => {
      const card = cards[0];

      return {
        width:
          card.offsetWidth ||
          card.getBoundingClientRect().width ||
          260,

        height:
          card.offsetHeight ||
          card.getBoundingClientRect().height ||
          360
      };
    };

    const getHiddenY = () => {
      const {height} = getCardSize();

      return Math.max(
        stick.clientHeight * 0.82,
        height * 1.65
      );
    };

    /**
     * 计算卡片组移动到标题附近的基础位置。
     */
    const getStackBasePosition = () => {
      const wrapperRect =
        cardWrapper.getBoundingClientRect();

      const titleRect =
        title.getBoundingClientRect();

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

      return {
        x:
          titleCenterX -
          wrapperCenterX,

        y:
          titleCenterY -
          wrapperCenterY +
          getCardDownOffset()
      };
    };

    const getSpacing = count => {
      const {width: cardWidth} =
        getCardSize();

      const desiredSpacing =
        cardWidth *
        (isMobile() ? 0.56 : 0.7);

      const maxGroupWidth =
        stick.clientWidth *
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
     * 计算每张卡片在当前步骤的位置。
     */
    const getCardState = (
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
       * 移动端堆叠效果。
       */
      if (isMobile()) {
        const depth =
          visibleCount - 1 - index;

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
            state.scale,

          zIndex:
            index + 1
        };
      }

      /**
       * PC 扇形效果。
       */
      const visibleCenterIndex =
        (visibleCount - 1) / 2;

      const distance =
        index - visibleCenterIndex;

      const finalRadius = Math.max(
        (totalCards - 1) / 2,
        1
      );

      const ratio =
        distance / finalRadius;

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
          ratio * maxRotation,

        scale:
          absoluteRatio >= 0.9
            ? 0.94
            : 1,

        zIndex: Math.round(
          100 -
            Math.abs(distance) * 10
        )
      };
    };

    /**
     * 计算每个字符的飞散方向。
     *
     * 撞击点位于标题下方中心。
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
            characterX - impactX;

          let directionY =
            characterY - impactY;

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
      force3D: false
    });

    /**
     * 独立的文字撞散动画。
     *
     * 它没有 ScrollTrigger，
     * 不会跟随滚动进度。
     */
    impactTimeline = gsap.timeline({
      paused: true,

      defaults: {
        overwrite: 'auto'
      }
    });

    /**
     * 第一段：碰撞瞬间先向外顶开一点。
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
              ?.rotation || 0
          ) * 0.08,

        scaleX: 1.03,
        scaleY: 0.96,

        autoAlpha: 1,
        duration: 0.1,

        stagger: {
          amount: 0.06,
          from: 'center'
        },

        ease: 'power2.out'
      },
      0
    );

    /**
     * 第二段：完整飞散并淡出。
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
            ?.rotation || 0,

        scaleX: index =>
          scatterStates[index]
            ?.scale || 0.82,

        scaleY: index =>
          scatterStates[index]
            ?.scale || 0.82,

        autoAlpha: 0,
        duration: 0.52,

        stagger: {
          amount: 0.18,
          from: 'center'
        },

        ease: 'power3.out'
      },
      0.08
    );

    /**
     * 控制文字完整散开或完整恢复。
     *
     * 通过 tween timeline.progress，
     * 快速上下滚动时不会卡在中间。
     */
    const setImpactTarget = (
      opened,
      immediate = false
    ) => {
      impactDelayCall?.kill();
      impactDelayCall = null;

      impactProgressTween?.kill();
      impactProgressTween = null;

      impactTarget = opened;

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

      if (progressDistance < 0.001) {
        impactTimeline
          .progress(targetProgress)
          .pause();

        return;
      }

      impactTimeline.pause();

      const baseDuration =
        opened ? 0.72 : 0.5;

      impactProgressTween = gsap.to(
        impactTimeline,
        {
          progress: targetProgress,

          /*
           * 根据剩余距离计算时间。
           * 中途反向时不会拖很久。
           */
          duration: Math.max(
            0.12,
            baseDuration *
              progressDistance
          ),

          ease: opened
            ? 'power3.out'
            : 'power2.inOut',

          overwrite: true,

          onComplete() {
            impactTimeline
              .progress(targetProgress)
              .pause();

            impactProgressTween = null;
          },

          onInterrupt() {
            impactProgressTween = null;
          }
        }
      );
    };

    /**
     * 第一张卡片开始上升后，
     * 延迟触发文字散开。
     */
    const scheduleImpactOpen = () => {
      impactDelayCall?.kill();

      impactDelayCall =
        gsap.delayedCall(
          getImpactDelay(),
          () => {
            impactDelayCall = null;

            /*
             * 延迟期间已经回滚，
             * 就不再执行散开。
             */
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
    cards.forEach((card, index) => {
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
          index + 1,

        transformOrigin:
          isMobile()
            ? '50% 50%'
            : '50% 110%',

        force3D: true,

        willChange:
          'transform, opacity'
      });
    });

    /**
     * 卡片主时间轴。
     *
     * 文字动画不放在这里面。
     */
    cardTimeline = gsap.timeline({
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
       * 已出现卡片重新排列。
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

              zIndex: () =>
                getCardState(
                  index,
                  visibleCount
                ).zIndex,

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
            (isMobile() ? 6 : 10),

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

          zIndex: () =>
            getCardState(
              enteringIndex,
              visibleCount
            ).zIndex,

          autoAlpha: 1,

          duration: 0.8,
          ease: 'back.out(2.2)',

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

      currentStep = targetStep;

      stepTween?.kill();
      stepTween = null;

      /**
       * 初始化、刷新时直接设置最终状态。
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
       * 第一张卡片从下面进入。
       */
      if (
        previousStep === 0 &&
        targetStep > 0
      ) {
        scheduleImpactOpen();
      }

      /**
       * 回滚到第一张卡片之前。
       *
       * 取消散开等待，
       * 并从当前进度完整恢复文字。
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
            duration: 0.58,
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
            Math.round(
              self.progress *
              totalCards
            );

          if (
            nextStep !== currentStep
          ) {
            goToStep(nextStep);
          }
        },

        onRefresh(self) {
          scatterStates =
            createScatterStates();

          cardTimeline.invalidate();
          impactTimeline.invalidate();

          const refreshStep =
            Math.round(
              self.progress *
              totalCards
            );

          goToStep(
            refreshStep,
            true
          );
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

    document.fonts?.ready.then(() => {
      if (destroyed) {
        return;
      }

      ScrollTrigger.refresh();
    });
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

    if (originalAriaLabel === null) {
      title.removeAttribute(
        'aria-label'
      );
    } else {
      title.setAttribute(
        'aria-label',
        originalAriaLabel
      );
    }

    if (originalTitleStyle === null) {
      title.removeAttribute('style');
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

  // 核心优化点：通过原生 scrollHeight 和 clientHeight 判断是否溢出
  const measureCard = (card) => {
    if (isDestroyed) return;

    const { text, toggle } = getCardElements(card);
    if (!text || !toggle) return;

    // 如果当前是展开状态，为了准确测量，先临时移除展开状态的影响
    const wasExpanded = card.classList.contains('story-card--expanded');
    if (wasExpanded) {
      card.classList.remove('story-card--expanded');
    }

    // scrollHeight 是文本实际总高度，clientHeight 是被 CSS line-clamp 限制后的可视高度
    // 增加 2px 的容差，防止浏览器渲染子像素精度导致的误判
    const isOverflowing = text.scrollHeight > text.clientHeight + 2;

    card.classList.toggle('story-card--overflowing', isOverflowing);
    toggle.hidden = !isOverflowing;

    // 恢复之前的展开状态，或者如果不再溢出了则强制收起
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

  // 优化 ResizeObserver：只重新计算尺寸发生变化的卡片
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
    measureCard(card); // 初始测量
  });

  // 字体加载完成后重新测量
  document.fonts?.ready
    .then(() => {
      if (!isDestroyed) cards.forEach(measureCard);
    })
    .catch(() => undefined);

  // 返回清理函数
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
    '(max-width: 767px)',
  );

  let currentSrc = '';
  let destroyed = false;

  const playVideo = () => {
    if (destroyed) return;

    video.play().catch(() => {
      // 自动播放被浏览器拦截时，不影响页面动画
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
        '[ExtraordinaryHero] 当前设备没有配置视频地址',
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
    return () => {};
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
      '[ExtraordinaryHero] 模块内部元素不完整',
    );

    return () => {};
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
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduceMotion:
          '(prefers-reduced-motion: reduce)',
      },
      (matchMediaContext) => {
        const {
          mobile,
          reduceMotion,
        } = matchMediaContext.conditions;

        /*
         * 清除上一次响应式切换时，
         * GSAP 给 media 添加的行内宽高。
         *
         * 初始宽高继续读取原来的 CSS。
         */
        gsapInstance.set(media, {
          clearProps: 'width,height',
        });

        /*
         * 移动端增加滚动距离。
         * 桌面端继续使用原来的 CSS 高度。
         */
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
            backgroundColor: '#071019',
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
            backgroundColor: '#071019',
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
            autoAlpha: 1,
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
    const root = document.documentElement;
    root.classList.add('anniversary-11th-page');

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
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
