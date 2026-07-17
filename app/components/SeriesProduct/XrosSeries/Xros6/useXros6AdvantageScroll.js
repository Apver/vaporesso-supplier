import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * XROS 6 产品优势区 ScrollTrigger 时间轴（源自 a.js）
 * @param {HTMLElement} root
 * @returns {() => void}
 */
function getAdvantagePinTop() {
  const nav = document.querySelector('#proNav');
  if (nav) return Math.round(nav.getBoundingClientRect().height);
  return window.innerWidth < 992 ? 44 : 52;
}

export function initXros6AdvantageScroll(root) {
  if (!root) return () => {};
  const isMobile = window.innerWidth < 992;
  const q = (sel) => root.querySelector(sel);
  const pinEl = q('.product__advantage');
  const pinTop = getAdvantagePinTop();

  root.style.setProperty('--xros6-advantage-pin-top', `${pinTop}px`);

  const ctx = gsap.context(() => {
    const containers = gsap.utils.toArray('.projects__content-container');

    gsap.set(containers, {
      autoAlpha: 0,
      yPercent: (index) => (isMobile || index === 1 ? 0 : 60),
    });
    gsap.set('.projects__content-container3-box2', {autoAlpha: 0});

    const getBox1 = () => q('.projects__container2-box1');

    /** box1 激活：避免 onStart 时 autoAlpha 仍为 0，且移动端提前显示 js-pc-opacity1 */
    const setContainer2Box1Visible = (visible) => {
      const el = getBox1();
      if (!el) return;

      if (visible) {
        el.classList.add('is-active');
        gsap.set(el, {autoAlpha: 1, opacity: 1, visibility: 'visible'});
        if (isMobile) {
          el.querySelectorAll('.js-pc-opacity1, .js-container2-cnt').forEach(
            (node) => {
              gsap.set(node, {opacity: 1, visibility: 'visible'});
            },
          );
        }
        return;
      }

      el.classList.remove('is-active');
      if (isMobile) {
        gsap.set(el, {opacity: 0});
      } else {
        gsap.set(el, {autoAlpha: 0});
      }
    };
    const scrollTriggerConfig = {
      // 用 root 作为 trigger，避免因选择器命中/布局变动导致起点漂移
      trigger: root,
      start: isMobile ? `top top+=${pinTop}` : 'top top',
      // 以真实高度计算滚动区间，确保三段动效能完整播完
      end: () => `+=${Math.max(root.offsetHeight - window.innerHeight, 0)}`,
      scrub: 1,
      invalidateOnRefresh: true,
    };

    // 移动端不用 sticky（易失效），由 GSAP pin 固定视口，避免滚过 1500vh 空白
    if (isMobile && pinEl) {
      Object.assign(scrollTriggerConfig, {
        pin: pinEl,
        pinSpacing: true,
        pinType: 'fixed',
        anticipatePin: 1,
        onToggle: (self) => {
          root.classList.toggle('is-advantage-scrolling', self.isActive);
        },
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
    });

    tl.to('.product__advantage-cards', {
      x: () => (isMobile ? '0rem' : '58.4rem'),
      duration: 1,
      ease: 'power2.inOut',
    });

    // ==============================
    // 章节一：第一张卡片进场
    // ==============================
    const syncLabel = 'step1';
    const delayStart = '+=0.4';

    tl.to('.product-advantage-card:nth-child(1)', {zIndex: 10}, syncLabel)
      .to(
        '.product-advantage-card:nth-child(1) .product-advantage-card__container',
        {
          width: '400%',
          height: '400%',
          duration: 1,
          '--zoom': 4,
          zIndex: 10,
          ease: 'none',
        },
        syncLabel,
      )
      .to(
        '.product-advantage-card:not(:nth-child(1))',
        {
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: 'none',
        },
        syncLabel,
      )
      .to(
        '.product-advantage-card__content:nth-child(1)',
        {
          yPercent: 100,
          duration: 1,
          ease: 'none',
        },
        syncLabel + delayStart,
      )
      .to(
        '.product-advantage-card:nth-child(1) .product-advantage-card__image',
        {
          yPercent: -100,
          duration: 1,
          ease: 'none',
        },
        syncLabel + delayStart,
      )
      .to(
        '.product-advantage-bg1',
        {
          opacity: 1,
          ease: 'none',
        },
        syncLabel + delayStart,
      )

      // 2. 容器 1 和内部第一段内容 进场
      .to(
        containers[0],
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'none',
          onStart: () => {
            containers[0].classList.add('is-active');
            void containers[0].offsetWidth;
            document
              .querySelector('.projects-clock-content1')
              ?.classList.add('is-active');
          },
          onReverseComplete: () => {
            containers[0].classList.remove('is-active');
            document
              .querySelector('.projects-clock-content1')
              ?.classList.remove('is-active');
          },
        },
        syncLabel + '+=0.5',
      )
      .to(
        '.projects__clock-container',
        {
          background:
            'linear-gradient(0deg, #FEF7DB 0%, #FFF6D7 18.27%, #FFDDA0 53.37%, #FFB538 100%)',
          duration: 0.01,
          onStart: () => {
            gsap.fromTo(
              '.js-clock-tle-box1',
              {width: 0},
              {
                width: 'auto',
                duration: 0.8,
                ease: 'none',
              },
            );
          },
          onReverseComplete: () => {
            gsap.to('.js-clock-tle-box1', {
              width: 0,
              duration: 0,
              ease: 'none',
              overwrite: true,
            });
          },
        },
        '>',
      );
    // ==============================
    // 章节一内部：旋转与内容切换
    // ==============================
    tl.to('.indicator-line-top', {
      rotation: 360,
      svgOrigin: '450 450',
      duration: 1,
      ease: 'none',
    })
      .add('step2')
      .to(
        {},
        {
          duration: 1,
          onStart: () => {
            document
              .querySelector('.projects-clock-content1')
              ?.classList.remove('is-active');
            document
              .querySelector('.projects-clock-content.projects-clock-content2')
              ?.classList.add('is-active');
            document
              .querySelector(
                '.projects-clock-full__pic.projects-clock-full__pic1',
              )
              ?.classList.add('is-active');
          },
          onReverseComplete: () => {
            document
              .querySelector('.projects-clock-content1')
              ?.classList.add('is-active');
            document
              .querySelector('.projects-clock-content.projects-clock-content2')
              ?.classList.remove('is-active');
            document
              .querySelector(
                '.projects-clock-full__pic.projects-clock-full__pic1',
              )
              ?.classList.remove('is-active');
          },
        },
        'step2',
      )
      .to(
        '.projects__clock-container',
        {
          background: '#F6FAFF',
          duration: 0.01,
          onStart: () => {
            gsap.fromTo(
              '.js-clock-tle-box2',
              {width: 0},
              {
                width: 'auto',
                duration: 0.8,
                ease: 'none',
              },
            );
          },
          onReverseComplete: () => {
            gsap.to('.js-clock-tle-box2', {
              width: 0,
              duration: 0,
              ease: 'none',
              overwrite: true,
            });
          },
        },
        'step2',
      )
      .to(
        '.projects-clock-svg',
        {
          '--clock-bg': '#2185DB',
          '--clock-line': '#2185DB',
          '--clock-center': '#2185DB',
          duration: 0.01,
        },
        'step2',
      )

      .to(
        '.product-advantage-bg1',
        {background: '#F6FAFF', duration: 0.01},
        'step2',
      )

      .to('.indicator-line-top', {
        rotation: 720,
        svgOrigin: '450 450',
        duration: 1,
        ease: 'none',
      })
      .to(
        '.indicator-line-bottom',
        {rotation: 200, svgOrigin: '450 450', duration: 1, ease: 'none'},
        '<',
      )

      .add('step3')
      .to(
        {},
        {
          duration: 1,
          onStart: () => {
            document
              .querySelector('.projects-clock-content.projects-clock-content2')
              ?.classList.remove('is-active');
            document
              .querySelector(
                '.projects-clock-full__pic.projects-clock-full__pic1',
              )
              ?.classList.remove('is-active');
            document
              .querySelector('.projects-clock-content.projects-clock-content3')
              ?.classList.add('is-active');
            document
              .querySelector(
                '.projects-clock-full__pic.projects-clock-full__pic2',
              )
              ?.classList.add('is-active');
          },
          onReverseComplete: () => {
            document
              .querySelector('.projects-clock-content.projects-clock-content2')
              ?.classList.add('is-active');
            document
              .querySelector(
                '.projects-clock-full__pic.projects-clock-full__pic1',
              )
              ?.classList.add('is-active');
            document
              .querySelector('.projects-clock-content.projects-clock-content3')
              ?.classList.remove('is-active');
            document
              .querySelector(
                '.projects-clock-full__pic.projects-clock-full__pic2',
              )
              ?.classList.remove('is-active');
          },
        },
        'step3',
      )
      .to(
        '.projects__clock-container',
        {
          background: '#000',
          duration: 0.01,
          onStart: () => {
            gsap.fromTo(
              '.js-clock-tle-box3',
              {width: 0},
              {
                width: 'auto',
                duration: 0.8,
                ease: 'none',
              },
            );
          },
          onReverseComplete: () => {
            gsap.to('.js-clock-tle-box3', {
              width: 0,
              duration: 0,
              ease: 'none',
              overwrite: true,
            });
          },
        },
        'step3',
      )
      .to(
        '.product-advantage-bg1',
        {background: '#000', duration: 0.01},
        'step3',
      )
      .to(
        '.projects-clock-svg',
        {
          '--clock-bg': '#75E68E',
          '--clock-line': '#75E68E',
          '--clock-center': '#75E68E',
          duration: 0.01,
        },
        'step3',
      );

    // ==============================
    // 章节二：镜头平移，卡片 1 还原
    // ==============================
    const chap2Label = 'chap2_start';
    tl.add(chap2Label)
      .to(
        '.projects__clock-container',
        {
          background: 'transparent',
          duration: 0.01,
        },
        chap2Label,
      )
      // 3. 容器 1 退场
      .to(
        containers[0],
        {
          yPercent: 100,
          autoAlpha: 0,
          duration: 1,
          ease: 'none',
          onStart: () => {
            containers[0].classList.remove('is-active');
          },
          onReverseComplete: () => {
            containers[0].classList.add('is-active');
          },
        },
        chap2Label,
      )

      // 卡片 1 的还原
      .to('.product-advantage-card:nth-child(1)', {zIndex: 1}, chap2Label)
      .to(
        '.product-advantage-card:nth-child(1) .product-advantage-card__container',
        {
          width: '100%',
          height: '100%',
          duration: 1,
          '--zoom': 1,
          ease: 'none',
        },
        chap2Label,
      )
      .to(
        '.product-advantage-card__content:nth-child(1)',
        {yPercent: 0, duration: 1, ease: 'none'},
        chap2Label,
      )
      .to(
        '.product-advantage-card:nth-child(1) .product-advantage-card__image',
        {yPercent: 0, duration: 1, ease: 'none'},
        chap2Label,
      )
      .to(
        '.product-advantage-bg1',
        {opacity: 0, duration: 1, ease: 'none'},
        chap2Label,
      )
      .to(
        '.product-advantage-card:not(:nth-child(1))',
        {scale: 1, opacity: 1, duration: 1, ease: 'none'},
        chap2Label,
      );

    // ==============================
    // 章节二：机位回正
    // ==============================
    const chap2Move = 'chap2_move';
    tl.add(chap2Move, chap2Label + '+=1').to(
      '.product__advantage-cards',
      {x: () => (isMobile ? '-6.5rem' : '0rem'), duration: 1, ease: 'none'},
      chap2Move,
    );

    // ==============================
    // 章节二：卡片 2 放大进场
    // ==============================
    const chap2Expand = 'chap2_expand';
    tl.add(chap2Expand, chap2Move + '+=1')

      .to(
        '.product-advantage-card:not(:nth-child(2))',
        {scale: 0.95, opacity: 0, duration: 0.5, ease: 'none'},
        chap2Expand,
      )
      .to('.product-advantage-card:nth-child(2)', {zIndex: 10}, chap2Expand)
      .to(
        '.product-advantage-card:nth-child(2) .product-advantage-card__container',
        {width: '400%', height: '400%', duration: 1, '--zoom': 4, ease: 'none'},
        chap2Expand,
      )
      .to(
        '.product-advantage-card:nth-child(2) .product-advantage-card__content',
        {yPercent: 100, duration: 1, ease: 'none'},
        chap2Expand + delayStart,
      )
      .to(
        '.product-advantage-card:nth-child(2) .product-advantage-card__image',
        {yPercent: -100, duration: 1, ease: 'none'},
        chap2Expand + delayStart,
      )
      .to(
        '.product-advantage-bg2',
        {opacity: 1, ease: 'none'},
        chap2Expand + delayStart,
      )

      //  4. 容器 2 进场
      .to(
        containers[1],
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'none',
          onStart: () => {
            gsap.set(containers[1], {autoAlpha: 1});
            containers[1].classList.add('is-active');
            setContainer2Box1Visible(true);
          },
          onReverseComplete: () => {
            containers[1].classList.remove('is-active');
            setContainer2Box1Visible(false);
          },
        },
        chap2Expand + '+=0.7',
      )

      .to(
        {},
        {
          duration: 0.01,
          onStart: () => {
            gsap.fromTo(
              '.js__num1',
              {textContent: 0},
              {
                textContent: 20,
                duration: 1.3,
                snap: {textContent: 1},
                ease: 'none',
                overwrite: true,
              },
            );
            gsap.fromTo(
              '.js__num2',
              {textContent: 0},
              {
                textContent: 30,
                duration: 1.3,
                snap: {textContent: 1},
                ease: 'none',
                overwrite: true,
              },
            );
          },
          onReverseComplete: () => {
            gsap.set('.js__num1', {textContent: 0});
            gsap.set('.js__num2', {textContent: 0});
          },
        },
        '>',
      );

    const readMoreOffset = 'read_more_offset';
    tl.add(readMoreOffset, chap2Expand + '+=1.5')

      .to(
        '.projects__container2-box1 .js-container2-cnt',
        {
          y: () => {
            if (!isMobile) return 0;

            const box = q('.projects__container2-box1');
            if (!box) return 0;
            const overflowHeight = box.scrollHeight - window.innerHeight + 50;

            return overflowHeight > 0 ? -overflowHeight : 0;
          },
          duration: 1.5,
          ease: 'none',
        },
        readMoreOffset,
      )

      .to({}, {duration: isMobile ? 1 : 0.5});

    // 2. 滚轮继续向下：Box1 渐渐消失，Box2 随滚动从 scale 0 放大到 1
    const showBox2 = 'show_box2';
    tl.add(showBox2)
      .fromTo(
        '.projects__container2-box2',
        {scale: isMobile ? 1 : 0, opacity: isMobile ? 0 : 1},
        {
          scale: 1,
          duration: 1,
          opacity: isMobile ? 1 : 1,
          ease: 'power4.out',
          transformOrigin: isMobile ? '70% 0%' : '30% center',
        },
        showBox2 + (isMobile ? '+=0' : '+=0.65'),
      )
      .to(
        '.js-pc-opacity1',
        {opacity: isMobile ? 1 : 0, duration: 0.5, ease: 'none'},
        showBox2,
      )
      .to(
        '.projects__container2-highlight',
        {
          scale: isMobile ? 1 : 500,
          duration: 1,
          ease: 'expo.in',
          force3D: false,
          transformOrigin: isMobile ? '50% 45%' : '46.8% 75%',
        },
        showBox2,
      )
      .to(
        {},
        {
          duration: 0.01,
          onStart: () => {
            // 往下滚：当 scale 放大到 1 结束的瞬间，加上 class
            document
              .querySelector('.projects__container2-box2')
              ?.classList.add('is-active');
            gsap.fromTo(
              '.js__num4',
              {textContent: 0},
              {
                textContent: 45,
                duration: 1.3,
                snap: {textContent: 1},
                ease: 'none',
                overwrite: true,
              },
            );
          },
          onReverseComplete: () => {
            document
              .querySelector('.projects__container2-box2')
              ?.classList.remove('is-active');
            gsap.set('.js__num4', {textContent: 0});
          },
        },
        '>',
      );

    const readMoreOffset2 = 'read_more_offset2';
    tl.add(readMoreOffset2, showBox2 + '+=1.5')

      .to(
        '.projects__container2-box2 .js-container2-cnt',
        {
          y: () => {
            if (!isMobile) return 0;

            const box = q('.projects__container2-box2');
            if (!box) return 0;

            // 计算 Box2 的溢出高度
            const overflowHeight = box.scrollHeight - window.innerHeight + 100;
            return overflowHeight > 0 ? -overflowHeight : 0;
          },
          duration: 1.5,
          ease: 'none',
        },
        readMoreOffset2,
      )

      .to({}, {duration: isMobile ? 1 : 0.5});
    const showBox3 = 'show_box3';
    tl.add(showBox3, '>+=1')
      .fromTo(
        '.projects__container2-box3',
        {scale: isMobile ? 1 : 0, opacity: isMobile ? 0 : 1},
        {
          scale: 1,
          duration: 1,
          opacity: isMobile ? 1 : 1,
          ease: 'power4.out',
          transformOrigin: isMobile ? '60% 5%' : '40% center',
        },
        showBox3 + (isMobile ? '+=0' : '+=0.65'),
      )
      .to(
        '.js-pc-opacity2',
        {opacity: isMobile ? 1 : 0, duration: 0.5, ease: 'none'},
        showBox3,
      )
      .to(
        '.projects__container3-highlight',
        {
          scale: isMobile ? 1 : 500,
          duration: 1,
          ease: 'expo.in',
          force3D: false,
          transformOrigin: isMobile ? '47% 40%' : '72.7% 74%',
          zIndex: 10,
        },
        showBox3,
      )
      .to(
        '.projects__container2-box2',
        {
          autoAlpha: 0,
          zIndex: 1,
          duration: 0.1,
        },
        '>',
      )
      .to(
        '.projects__container2-box1',
        {
          // 移动端不用 autoAlpha，避免留下 visibility:hidden 盖住 is-active
          ...(isMobile ? {opacity: 0} : {autoAlpha: 0}),
          zIndex: 1,
          duration: 0.1,
          onStart: () => getBox1()?.classList.remove('is-active'),
          onReverseComplete: () => {
            if (containers[1].classList.contains('is-active')) {
              setContainer2Box1Visible(true);
            }
          },
        },
        '<',
      );
    // ==============================
    // 章节三 阶段 1：镜头平移准备，卡片 2 原位还原
    // ==============================
    const chap3Label = 'chap3_start';
    tl.add(chap3Label, '>+=1')

      //  5. 容器 2 退场 (跟随滚轮退回 100%)
      .to(
        containers[1],
        {
          yPercent: 100,
          autoAlpha: 0,
          duration: 1,
          ease: 'none',
          onStart: () => {
            containers[1].classList.remove('is-active');
            document
              .querySelector('.projects__container2-box2')
              ?.classList.remove('is-active');
            document
              .querySelector('.projects__container2-box3')
              ?.classList.remove('is-active');
          },
          onReverseComplete: () => {
            containers[1].classList.add('is-active');
            document
              .querySelector('.projects__container2-box3')
              ?.classList.add('is-active');
          },
        },
        chap3Label,
      )

      .to(
        ['.projects__container2-highlight', '.projects__container3-highlight'],
        {
          autoAlpha: 0,
          zIndex: 1,
          duration: 0.1,
        },
        chap3Label,
      )

      // 卡片 2 的还原
      .to('.product-advantage-card:nth-child(2)', {zIndex: 1}, chap3Label)
      .to(
        '.product-advantage-card:nth-child(2) .product-advantage-card__container',
        {
          width: '100%',
          height: '100%',
          duration: 1,
          '--zoom': 1,
          ease: 'none',
        },
        chap3Label,
      )
      .to(
        '.product-advantage-card__content:nth-child(2)',
        {yPercent: 0, duration: 1, ease: 'none'},
        chap3Label,
      )
      .to(
        '.product-advantage-card:nth-child(2) .product-advantage-card__content',
        {yPercent: 0, duration: 1, ease: 'none'},
        chap3Label,
      )
      .to(
        '.product-advantage-card:nth-child(2) .product-advantage-card__image',
        {
          yPercent: 0,
          duration: 1,
          ease: 'none',
        },
        chap3Label,
      )
      .to(
        '.product-advantage-bg2',
        {opacity: 0, duration: 1, ease: 'none'},
        chap3Label,
      )
      .to(
        '.product-advantage-card:not(:nth-child(2))',
        {scale: 1, opacity: 1, duration: 1, ease: 'none'},
        chap3Label,
      );

    // ==============================
    // 章节三 阶段 2：机位向左平移
    // ==============================
    const chap3Move = 'chap3_move';
    tl.add(chap3Move, chap3Label + '+=1').to(
      '.product__advantage-cards',
      {x: () => (isMobile ? '-13rem' : '-58.4rem'), duration: 1, ease: 'none'},
      chap3Move,
    );

    // ==============================
    // 章节三 阶段 3：卡片 3 原位放大进场
    // ==============================
    const chap3Expand = 'chap3_expand';
    tl.add(chap3Expand, chap3Move + '+=1')

      // 1. 非卡片 3（即卡片1和2）压暗缩小
      .to(
        '.product-advantage-card:not(:nth-child(3))',
        {scale: 0.95, opacity: 0, duration: 0.5, ease: 'none'},
        chap3Expand,
      )

      // 2. 卡片 3 放大 4 倍
      .to('.product-advantage-card:nth-child(3)', {zIndex: 10}, chap3Expand)
      .to(
        '.product-advantage-card:nth-child(3) .product-advantage-card__container',
        {
          width: '400%',
          height: '400%',
          duration: 1,
          '--zoom': 4,
          ease: 'none',
        },
        chap3Expand,
      )

      // 3. 卡片 3 内容分离特效 (文字下移、图片上移)
      .to(
        '.product-advantage-card:nth-child(3) .product-advantage-card__content',
        {
          yPercent: 100,
          duration: 1,
          ease: 'none',
        },
        chap3Expand + delayStart,
      )
      .to(
        '.product-advantage-card:nth-child(3) .product-advantage-card__image',
        {
          yPercent: -100,
          duration: 1,
          ease: 'none',
        },
        chap3Expand + delayStart,
      )

      .to(
        '.product-advantage-bg3',
        {opacity: 1, ease: 'none'},
        chap3Expand + delayStart,
      )

      //  6. 容器 3 整体激活 (跟随滚轮从 100% 滑入 0)
      .to(
        containers[2],
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'none',
          onStart: () => {
            containers[2].classList.add('is-active');
          },
          onReverseComplete: () => {
            containers[2].classList.remove('is-active');
          },
        },
        chap3Expand + '+=0.4',
      )
      .to(
        '.projects__container3-box1',
        {
          background:
            'linear-gradient(0deg, #F1F7FD 0%, #F0F6FD 20.67%, #E2F1FB 42.79%, #C4E3F6 71.63%, #B5DEF5 85.58%, #9ACFEF 100%)',
          duration: 0.01,
          onStart: () => {
            document
              .querySelector('.projects__content-container3-box1')
              ?.classList.add('enter-active');
          },
          onReverseComplete: () => {
            document
              .querySelector('.projects__content-container3-box1')
              ?.classList.remove('enter-active');
          },
        },
        '>',
      )
      .to(
        '.projects__content-container3-box2',
        {
          autoAlpha: 1,
          duration: 0.01,
          ease: 'none',
        },
        '<',
      );
    // ==============================
    // 章节三内部进展：功能菜单层叠轮播 + 焦点激活
    // ==============================

    tl.to({}, {duration: 0.5});

    const panel = q('.projects__container3-panel');
    const containerBox = q('.projects__container3-box1');
    const items = gsap.utils.toArray('.o-homeProjects_item');

    if (panel && containerBox && items.length > 0) {
      const getPanelTarget = (targetItem) => {
        const deviceCenter = containerBox.offsetWidth / 2;
        const itemCenterLocal =
          panel.offsetLeft + targetItem.offsetLeft + targetItem.offsetWidth / 2;
        return deviceCenter - itemCenterLocal;
      };

      const device = q('.projects__container3-device');
      const mbgetPanelTarget = (targetItem) => {
        // if (isMobile && index === 0) {
        //   return 0;
        // }
        const deviceCenter = device.offsetLeft + device.offsetWidth / 2;
        const itemCenterLocal =
          panel.offsetLeft + targetItem.offsetLeft + targetItem.offsetWidth / 2;
        return deviceCenter - itemCenterLocal;
      };

      items.forEach((item, index) => {
        const stepLabel = 'stack_step_' + index;
        tl.add(stepLabel);

        // a. 面板向左推
        tl.to(
          panel,
          {
            x: () =>
              isMobile ? mbgetPanelTarget(item, index) : getPanelTarget(item),
            ease: 'none',
            duration: 1,
          },
          stepLabel,
        );

        // b. 向右的反向补偿
        for (let i = 0; i < index; i++) {
          const prevItem = items[i];
          tl.to(
            prevItem,
            {
              x: () => {
                const targetPrev = isMobile
                  ? mbgetPanelTarget(prevItem, i)
                  : getPanelTarget(prevItem);
                const targetCurrent = isMobile
                  ? mbgetPanelTarget(item, index)
                  : getPanelTarget(item);
                return targetPrev - targetCurrent;
              },
              ease: 'none',
              duration: 1,
            },
            stepLabel,
          );
        }

        tl.to(
          {},
          {
            duration: 0.01,
            onStart: () => {
              item.classList.add('is-active');
            },
            onReverseComplete: () => {
              item.classList.remove('is-active');
            },
          },
          stepLabel + '+=0.15',
        );
      });
    }

    // ==============================
    // 章节三尾声：Box2 执行 0 到 -100% 的推移动画
    // ==============================

    tl.to({}, {duration: 1});

    const chap3Box2Move = 'chap3_box2_move';
    tl.add(chap3Box2Move);

    // 2.  让 Box2 开始滑动
    tl.fromTo(
      '.projects__content-container3-box1',
      {
        yPercent: 0,
      },
      {
        yPercent: -100,
        duration: 1,
        ease: 'none',
      },
      chap3Box2Move,
    ).to(
      '.projects__content-container3-bg',
      {opacity: 0, duration: 0.7, ease: 'power1.out'},
      chap3Box2Move,
    );
    tl.to({}, {duration: 1});
  }, root);

  // 图片/字体加载会改变布局；主动 refresh，确保 start 点在模块顶到视口顶时才触发
  const refresh = () => {
    root.style.setProperty(
      '--xros6-advantage-pin-top',
      `${getAdvantagePinTop()}px`,
    );
    ScrollTrigger.refresh();
  };
  const rafId = requestAnimationFrame(refresh);
  window.addEventListener('load', refresh, {once: true});
  const imgs = Array.from(root.querySelectorAll('img'));
  const onImg = () => refresh();
  imgs.forEach((img) => {
    if (img.complete) return;
    img.addEventListener('load', onImg, {once: true});
    img.addEventListener('error', onImg, {once: true});
  });

  return () => {
    cancelAnimationFrame(rafId);
    imgs.forEach((img) => {
      img.removeEventListener('load', onImg);
      img.removeEventListener('error', onImg);
    });
    ctx.revert();
  };
}
