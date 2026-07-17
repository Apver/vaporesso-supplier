import {useEffect} from 'react';
import Lenis from 'lenis';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {MotionPathPlugin} from 'gsap/MotionPathPlugin';
import {XROS6_WORLDCUP_QUESTIONS} from '~/data/xros6-worldcup-questions';
import {
  XWC_FIELD_WAYPOINTS,
  XWC_GALLERY_ITEMS,
  XWC_MOB_FIELD_WAYPOINTS,
  XWC_PRIZE_NAMES,
  XWC_RUN_FRAMES,
} from './constants';
import {initScrollAppear} from './initScrollAppear';
import {
  openNoWinModal,
  openQesSucessModal,
  openQeserrorModal,
  openTimeEndModal,
  openWinModal,
} from './modals';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function isMobileWidth() {
  return window.innerWidth < 1024;
}

function getRandomQuestions(n, pool) {
  if (!Array.isArray(pool) || pool.length === 0) return [];
  const count = Math.max(0, Math.min(Math.floor(n), pool.length));
  const shuffled = pool.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function playFrameAnimation(imgElement, framesArray, totalDurationMs) {
  if (imgElement.animationFrameId) {
    cancelAnimationFrame(imgElement.animationFrameId);
  }

  const totalFrames = framesArray.length;
  let startTimestamp = null;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const elapsed = timestamp - startTimestamp;
    let frameIndex = Math.floor((elapsed / totalDurationMs) * totalFrames);
    if (frameIndex >= totalFrames) frameIndex = totalFrames - 1;
    imgElement.src = framesArray[frameIndex];

    if (elapsed < totalDurationMs) {
      imgElement.animationFrameId = requestAnimationFrame(step);
    } else {
      imgElement.animationFrameId = null;
    }
  }

  imgElement.animationFrameId = requestAnimationFrame(step);
}

function initKvBanner(root) {
  const el = root.querySelector('[data-xwc="kv-banner"]');
  if (!el) return;

  const section = el.querySelector('.banner-section');
  const image = section?.querySelector('.banner-image');
  const textWrapper = section?.querySelector('.banner_content-wrapper');
  const image1 = section?.querySelector('.banner_bg2-wrapper');
  if (!image || !textWrapper || !image1) return;

  gsap.set(image, {clipPath: 'inset(0 0 0 100%)'});
  gsap.set(image1, {clipPath: 'inset(0 0 0 100%)'});
  gsap.set(textWrapper, {clipPath: 'inset(100% 0 0 0)'});

  gsap
    .timeline()
    .to(image, {clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.out'})
    .to(
      image1,
      {clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.out'},
      '<',
    )
    .to(textWrapper, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.3,
      ease: 'power2.out',
    });
}

function initCampaignTimeline(root, isMobile) {
  const el = root.querySelector('[data-xwc="campaign-timeline"]');
  if (!el) return null;

  const track = el.querySelector('.timeline-track');
  const trackFill = el.querySelector('.track-fill');
  const ball = el.querySelector('.soccer-ball');
  const nodeElements = Array.from(el.querySelectorAll('.node-item'));
  if (!track || !trackFill || !ball || nodeElements.length === 0) return null;

  const getRelativePos = (element) => {
    let offsetLeft = 0;
    let currentElement = element;
    while (currentElement && currentElement !== track) {
      offsetLeft += currentElement.offsetLeft;
      currentElement = currentElement.offsetParent;
    }
    return offsetLeft + element.offsetWidth / 2;
  };

  const nodesData = nodeElements.map((node) => {
    const dateStr = node.dataset.date.replace(/-/g, '/');
    return {
      element: node,
      time: new Date(dateStr).getTime(),
      posPx: getRelativePos(node),
    };
  });

  const currentTime = Date.now();
  let targetPx = 0;
  const numNodes = nodesData.length;
  const firstDate = nodesData[0].time;
  const lastDate = nodesData[numNodes - 1].time;

  if (currentTime < firstDate) {
    targetPx = 0;
  } else if (currentTime >= lastDate) {
    targetPx = track.offsetWidth;
  } else {
    for (let i = 0; i < numNodes - 1; i++) {
      const t1 = nodesData[i].time;
      const t2 = nodesData[i + 1].time;
      if (currentTime >= t1 && currentTime < t2) {
        const timeRatio = (currentTime - t1) / (t2 - t1);
        targetPx =
          nodesData[i].posPx + timeRatio * (nodesData[i + 1].posPx - nodesData[i].posPx);
        break;
      }
    }
  }

  return ScrollTrigger.create({
    trigger: el,
    start: 'top 90%',
    onEnter: () => {
      const wrapper = el.querySelector('.timeline-wrapper');
      const wrapperStyles = window.getComputedStyle(wrapper);
      const paddingLeftPx = parseFloat(wrapperStyles.paddingLeft) || 0;

      let scrollTarget = targetPx + paddingLeftPx - window.innerWidth / 2 + 50;
      if (scrollTarget < 0) scrollTarget = 0;

      gsap.to(wrapper, {scrollLeft: scrollTarget, duration: 2, ease: 'power2.out'});
      gsap.to(trackFill, {width: `${targetPx}px`, duration: 2, ease: 'power2.out'});

      const trackWidth = track.offsetWidth;
      const progressRatio = targetPx / trackWidth;
      const rotationDegree = progressRatio * 1080;
      const rootFontSize =
        parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
      const offsetPx = 0.4 * rootFontSize;

      gsap.to(ball, {
        x: isMobile ? targetPx - offsetPx : targetPx,
        rotation: rotationDegree,
        duration: 2,
        ease: 'power2.out',
        onUpdate() {
          const currentX = gsap.getProperty(ball, 'x');
          nodesData.forEach((nodeData) => {
            if (currentX >= nodeData.posPx - 1) {
              nodeData.element.classList.add('active');
            }
          });
        },
      });
    },
    once: true,
  });
}

function initPersonalizedApp(root) {
  const el = root.querySelector('[data-xwc="personalized-app"]');
  if (!el) return null;

  const stick = el.querySelector('.prize-section');
  const moveTarget = el.querySelector('.prize-cards-container');
  if (!stick || !moveTarget) return null;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 991px)', () => {
    const startX = window.innerWidth;
    gsap.fromTo(
      moveTarget,
      {x: startX},
      {
        x: '20rem',
        ease: 'none',
        scrollTrigger: {
          trigger: stick,
          pin: false,
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  return () => mm.revert();
}

function initGallery(root) {
  const el = root.querySelector('[data-xwc="world-cup-gallery"]');
  if (!el) return () => {};

  const galleryContainer = el.querySelector('.gallery-grid');
  const paginationContainer = el.querySelector('.pagination');
  if (!galleryContainer || !paginationContainer) return () => {};

  const itemsPerPage = 6;
  let currentPage = 1;
  const totalPages = Math.ceil(XWC_GALLERY_ITEMS.length / itemsPerPage);

  const leftSvg = `<svg width="" height="" viewBox="0 0 13 22" fill="none"><path d="M11.2969 20.7988L1.41452 10.8993L11.2969 0.999837" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>`;
  const rightSvg = `<svg width="" height="" viewBox="0 0 13 22" fill="none"><path d="M1 20.7988L10.8824 10.8993L1 0.999837" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>`;

  const renderGalleryGrid = (items) => {
    galleryContainer.innerHTML = '';
    items.forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'gallery-item';
      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = `Moment ${item.id}`;
      img.loading = 'lazy';
      itemDiv.appendChild(img);
      galleryContainer.appendChild(itemDiv);
    });
  };

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    currentPage = newPage;
    loadGalleryData(currentPage);
  };

  const renderPaginationControls = (total, current) => {
    paginationContainer.innerHTML = '';
    if (total <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'nav-arrow';
    prevBtn.innerHTML = leftSvg;
    prevBtn.disabled = current === 1;
    prevBtn.onclick = () => changePage(current - 1);
    paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= total; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = `page-btn ${i === current ? 'active' : ''}`;
      pageBtn.innerText = String(i);
      pageBtn.onclick = () => changePage(i);
      paginationContainer.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav-arrow';
    nextBtn.innerHTML = rightSvg;
    nextBtn.disabled = current === total;
    nextBtn.onclick = () => changePage(current + 1);
    paginationContainer.appendChild(nextBtn);
  };

  const loadGalleryData = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    renderGalleryGrid(XWC_GALLERY_ITEMS.slice(startIndex, endIndex));
    renderPaginationControls(totalPages, page);
  };

  loadGalleryData(currentPage);
  return () => {};
}

function initCopyButtons(root) {
  const els = root.querySelectorAll('[data-xwc="copy-button"]');
  const cleanups = [];

  els.forEach((el) => {
    const textToCopy = el.getAttribute('data-copy-text') || '#XROSWORLDCUP';
    const successMessage = document.createElement('div');
    successMessage.className = 'copy-success';
    successMessage.innerText = 'Copied!';
    successMessage.style.display = 'none';
    el.appendChild(successMessage);

    const button = el.querySelector('.js-copy');
    let timeoutId = null;

    const onClick = (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(textToCopy).then(() => {
        successMessage.style.display = 'block';
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          successMessage.style.display = 'none';
        }, 1500);
      });
    };

    button?.addEventListener('click', onClick);
    cleanups.push(() => {
      button?.removeEventListener('click', onClick);
      if (timeoutId) clearTimeout(timeoutId);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

function initLazyVideos(root) {
  const els = root.querySelectorAll('[data-xwc="lazy-video"]');
  const cleanups = [];

  els.forEach((el) => {
    const video = el.querySelector('video');
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.controls = el.hasAttribute('controls');

    const enableOn = el.getAttribute('data-enable-on') || 'all';
    const shouldEnable =
      enableOn === 'all' ||
      (enableOn === 'mobile' && isMobileWidth()) ||
      (enableOn === 'pc' && !isMobileWidth());

    if (!shouldEnable) return;

    video.load();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (video.paused) {
              video.muted = true;
              video.play()?.catch(() => undefined);
            }
          } else if (!video.paused) {
            video.pause();
          }
        });
      },
      {threshold: 0.1},
    );

    observer.observe(el);
    cleanups.push(() => observer.disconnect());
  });

  return () => cleanups.forEach((fn) => fn());
}

function initQuizGame(root, isMobile) {
  const TOTAL_QUESTIONS = 6;
  const GAME_TIME = 60;
  const WAIT_TIME = 3;

  let currentQuestions = [];
  let currentIndex = 0;
  let timeLeft = GAME_TIME;
  let timerInterval = null;
  let isGameOver = false;
  let isGameStarted = false;

  const timerText = root.querySelector('#timeLeft');
  const timerProgress = root.querySelector('.timer-progress');
  const statusText = root.querySelector('#statusText');
  const qNumberBadge = root.querySelector('#qNumberBadge');
  const questionText = root.querySelector('#questionText');
  const optionsContainer = root.querySelector('#optionsContainer');
  const currentQNum = root.querySelector('#currentQNum');
  const progressDots = root.querySelector('#progressDots');
  const startBtn = root.querySelector('#quiz-start-button');

  if (!timerText || !optionsContainer || !startBtn) return () => {};

  const renderDots = () => {
    if (!progressDots) return;
    progressDots.innerHTML = '';
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      progressDots.appendChild(dot);
    }
  };

  const renderQuestion = () => {
    const qData = currentQuestions[currentIndex];
    if (!qData) return;

    if (currentQNum) currentQNum.innerText = String(currentIndex + 1);
    if (qNumberBadge)
      qNumberBadge.innerText = String(currentIndex + 1).padStart(2, '0');
    if (questionText) questionText.innerText = qData.question;

    if (progressDots) {
      Array.from(progressDots.children).forEach((dot, index) => {
        dot.className = index <= currentIndex ? 'dot active' : 'dot';
      });
    }

    const goalkeeper = root.querySelector('#goalkeeper-img');
    if (goalkeeper) {
      if (currentIndex === TOTAL_QUESTIONS - 1) {
        goalkeeper.classList.add('show-goalkeeper');
      } else {
        goalkeeper.classList.remove('show-goalkeeper');
      }
    }

    optionsContainer.innerHTML = '';
    Object.entries(qData.options).forEach(([key, value]) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span>${key.toUpperCase()}.   </span> ${value}`;
      if (!isGameStarted) btn.style.pointerEvents = 'none';
      btn.onclick = () => handleAnswer(key, btn);
      optionsContainer.appendChild(btn);
    });
  };

  const startTimer = () => {
    if (isMobile) {
      root.querySelector('.quize-md-lt')?.classList.add('is-visible');
    }
    timerInterval = window.setInterval(() => {
      if (isGameOver) {
        clearInterval(timerInterval);
        return;
      }
      timeLeft--;
      timerText.innerText = String(timeLeft);
      if (timerProgress) {
        timerProgress.style.strokeDashoffset = String(283 - (timeLeft / GAME_TIME) * 283);
      }
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame('timeup');
      }
    }, 1000);
  };

  const handleAnswer = (selectedKey, btnElement) => {
    if (isGameOver || !isGameStarted) return;

    const currentQ = currentQuestions[currentIndex];
    const isCorrect = selectedKey === currentQ.answer;
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach((b) => {
      b.style.pointerEvents = 'none';
    });

    if (isCorrect) {
      btnElement.classList.add('correct');

      const fieldBg = root.querySelector('#quize-cnt-lt-field-bg');
      const player = root.querySelector('#player-character');
      const football = root.querySelector('#player-bast-img');
      const ballShadow = root.querySelector('#player-box-shadow');
      const waypoints = isMobile ? XWC_MOB_FIELD_WAYPOINTS : XWC_FIELD_WAYPOINTS;
      const targetPoint = waypoints[currentIndex + 1];

      if (fieldBg && targetPoint) {
        fieldBg.style.transform = `translate(${targetPoint.x}, ${targetPoint.y})`;
      }
      if (player) playFrameAnimation(player, XWC_RUN_FRAMES, 800);
      if (football) football.classList.add('rotating');

      window.setTimeout(() => {
        if (player) player.src = XWC_RUN_FRAMES[0];
        if (football) football.classList.remove('rotating');

        if (currentIndex === TOTAL_QUESTIONS - 1) {
          if (football) {
            football.classList.add('shoot-goal');
            ballShadow?.classList.add('shoot-shadow-goal');
          }
          window.setTimeout(() => endGame('win'), 600);
        } else {
          currentIndex++;
          renderQuestion();
        }
      }, 850);
    } else {
      isGameOver = true;
      btnElement.classList.add('wrong');
      window.setTimeout(() => endGame('wrong'), 500);
    }
  };

  const resetGame = () => {
    isGameOver = false;
    isGameStarted = false;
    currentIndex = 0;
    timeLeft = GAME_TIME;
    clearInterval(timerInterval);

    startBtn.style.display = 'flex';
    timerText.innerText = String(GAME_TIME);
    if (statusText) statusText.innerText = `${WAIT_TIME}S`;
    if (timerProgress) timerProgress.style.strokeDashoffset = '0';

    const fieldBg = root.querySelector('#quize-cnt-lt-field-bg');
    const waypoints = isMobile ? XWC_MOB_FIELD_WAYPOINTS : XWC_FIELD_WAYPOINTS;
    if (fieldBg && waypoints.length > 0) {
      const startPoint = waypoints[0];
      fieldBg.style.transform = `translate(${startPoint.x}, ${startPoint.y})`;
    }

    const player = root.querySelector('#player-character');
    if (player) player.src = XWC_RUN_FRAMES[0];

    const football = root.querySelector('#player-bast-img');
    if (football) {
      football.classList.remove('shoot-goal', 'rotating');
    }

    const ballShadow = root.querySelector('#player-box-shadow');
    ballShadow?.classList.remove('shoot-shadow-goal');

    const goalkeeper = root.querySelector('#goalkeeper-img');
    goalkeeper?.classList.remove('show-goalkeeper');

    root.querySelector('.quize-md-lt')?.classList.remove('is-visible');
    initGame();
  };

  const endGame = (reason) => {
    isGameOver = true;
    clearInterval(timerInterval);
    resetGame();
    if (reason === 'timeup') openTimeEndModal();
    else if (reason === 'wrong') openQeserrorModal();
    else if (reason === 'win') openQesSucessModal();
  };

  const initGame = () => {
    currentQuestions = getRandomQuestions(TOTAL_QUESTIONS, XROS6_WORLDCUP_QUESTIONS);
    if (currentQuestions.length < TOTAL_QUESTIONS) return;
    renderDots();
    renderQuestion();
    XWC_RUN_FRAMES.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  };

  const onStartClick = () => {
    startBtn.style.display = 'none';
    let prepareTime = 3;
    if (statusText) statusText.innerText = `${prepareTime}S`;
    isGameStarted = false;
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach((b) => {
      b.style.pointerEvents = 'none';
    });

    const prepareInterval = window.setInterval(() => {
      prepareTime--;
      if (statusText) statusText.innerText = `${prepareTime}S`;
      if (prepareTime === 0) {
        clearInterval(prepareInterval);
        isGameStarted = true;
        allBtns.forEach((b) => {
          b.style.pointerEvents = 'auto';
        });
        timerText.innerText = String(GAME_TIME);
        startTimer();
      }
    }, 1000);
  };

  startBtn.addEventListener('click', onStartClick);
  initGame();

  return () => {
    clearInterval(timerInterval);
    startBtn.removeEventListener('click', onStartClick);
  };
}

function initSpinWheel(root, isMobile) {
  const wheelGroup = root.querySelector('#wheel-group');
  const startBtn = root.querySelector('#startBtn');
  if (!wheelGroup || !startBtn) return () => {};

  const center = {x: 500, y: 500};
  const outerRadius = 500;
  const innerRadius = 120;
  let currentAngle = -45;
  let spinning = false;
  let idleFrameId = null;

  const setWheelRotation = (deg) => {
    wheelGroup.setAttribute('transform', `rotate(${deg} ${center.x} ${center.y})`);
  };

  const drawWheel = () => {
    const NS = 'http://www.w3.org/2000/svg';
    const n = XWC_PRIZE_NAMES.length;
    const slice = 360 / n;
    const gapAngle = 2;
    const effectiveSlice = slice - gapAngle;
    wheelGroup.innerHTML = '';

    const colorPalette = [
      '#FFF',
      '#004C99',
      '#109400',
      '#34B3EF',
      '#FFF',
      '#004C99',
      '#109400',
      '#34B3EF',
    ];
    const textColorPalette = [
      '#222B53',
      '#FFF',
      '#FFF',
      '#222B53',
      '#222B53',
      '#FFF',
      '#FFF',
      '#222B53',
    ];

    for (let i = 0; i < n; i++) {
      const start = i * slice + gapAngle / 2;
      const end = start + effectiveSlice;
      const largeArc = effectiveSlice > 180 ? 1 : 0;
      const x1 = center.x + outerRadius * Math.cos((Math.PI / 180) * start);
      const y1 = center.y + outerRadius * Math.sin((Math.PI / 180) * start);
      const x2 = center.x + outerRadius * Math.cos((Math.PI / 180) * end);
      const y2 = center.y + outerRadius * Math.sin((Math.PI / 180) * end);

      const path = document.createElementNS(NS, 'path');
      path.setAttribute(
        'd',
        `M ${center.x} ${center.y} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      );
      path.setAttribute('fill', colorPalette[i % colorPalette.length]);
      wheelGroup.appendChild(path);

      const midAngle = start + effectiveSlice / 2;
      const midRad = (Math.PI / 180) * midAngle;
      const imgRadius = (outerRadius + innerRadius) / 1.7;
      const imgX = center.x + imgRadius * Math.cos(midRad);
      const imgY = center.y + imgRadius * Math.sin(midRad);
      const imgSize = 160;

      const image = document.createElementNS(NS, 'image');
      image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', XWC_PRIZE_NAMES[i].image);
      image.setAttribute('x', String(imgX - imgSize / 2));
      image.setAttribute('y', String(imgY - imgSize / 2));
      image.setAttribute('width', String(imgSize));
      image.setAttribute('height', String(imgSize));
      image.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      image.setAttribute('transform', `rotate(${midAngle + 90} ${imgX} ${imgY})`);
      wheelGroup.appendChild(image);

      const textRadius = imgRadius - imgSize / 2 - 80;
      const tx = center.x + textRadius * Math.cos(midRad);
      const ty = center.y + textRadius * Math.sin(midRad);
      const text = document.createElementNS(NS, 'text');
      text.setAttribute('x', String(tx));
      text.setAttribute('y', String(ty));
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', textColorPalette[i % textColorPalette.length]);
      text.setAttribute('class', 'wheel-prize-text');

      const lines = XWC_PRIZE_NAMES[i].name.split('\n');
      const lineHeight = 30;
      const startOffset = -((lines.length - 1) / 2) * lineHeight;
      lines.forEach((line, j) => {
        const tspan = document.createElementNS(NS, 'tspan');
        tspan.setAttribute('x', String(tx));
        tspan.setAttribute('y', String(ty + startOffset + j * lineHeight));
        tspan.textContent = line;
        text.appendChild(tspan);
      });
      text.setAttribute('transform', `rotate(${midAngle + 90} ${tx} ${ty})`);
      wheelGroup.appendChild(text);
    }
    setWheelRotation(currentAngle);
  };

  const animateRotation = (fromDeg, toDeg, durationMs, callback) => {
    const start = performance.now();
    const diff = toDeg - fromDeg;
    const easeOutQuart = (t) => 1 - (1 - t) ** 4;

    const frame = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      setWheelRotation(fromDeg + diff * easeOutQuart(t));
      if (t < 1) requestAnimationFrame(frame);
      else {
        setWheelRotation(toDeg);
        callback?.();
      }
    };
    requestAnimationFrame(frame);
  };

  const spinRandom = (targetIndex, data) => {
    if (spinning) return;
    spinning = true;
    const n = XWC_PRIZE_NAMES.length;
    const slice = 360 / n;
    const targetMid = targetIndex * slice + slice / 2;
    const pointerAngle = isMobile ? 270 : 360;
    let needed = pointerAngle - currentAngle - targetMid;
    needed = ((needed % 360) + 360) % 360;
    const extra = (Math.floor(Math.random() * 3) + 4) * 360;
    const finalDelta = extra + needed;
    const from = currentAngle;
    const to = currentAngle + finalDelta;
    const duration = 4200 + Math.random() * 1400;

    animateRotation(from, to, duration, () => {
      currentAngle = (currentAngle + finalDelta) % 360;
      spinning = false;
      startBtn.disabled = false;
      if (data.isLottery) {
        root.querySelector('.win-sucess-modal-content .js-sucess-tip-num').textContent =
          data.num;
        root.querySelector('.win-sucess-modal-content .js-sucess-tip').textContent =
          data.txt;
        const img = root.querySelector('.win-sucess-modal-content .qes-error-pic img');
        if (img) {
          img.src = isMobile
            ? XWC_PRIZE_NAMES[targetIndex].mobpopupImage
            : XWC_PRIZE_NAMES[targetIndex].popupImage;
        }
        openWinModal();
      } else {
        openNoWinModal();
      }
    });
  };

  const idleStart = performance.now();
  const idleAmplitude = 10;
  const idleFrequency = 0.00025;
  const idleRotateSmooth = (now) => {
    if (spinning) return;
    const elapsed = now - idleStart;
    const offset = Math.sin(elapsed * idleFrequency * 2 * Math.PI) * idleAmplitude;
    setWheelRotation(currentAngle + offset);
    idleFrameId = requestAnimationFrame(idleRotateSmooth);
  };

  drawWheel();
  idleFrameId = requestAnimationFrame(idleRotateSmooth);

  const onSpinClick = () => {
    root.querySelector('.email-valid-ces').style.display = 'none';
    root.querySelector('.que-sucess-modal-content .qes-modal-btn').style.display =
      'none';
    const emailTip = root.querySelector('#email-tip-txt');
    if (emailTip)
      emailTip.textContent = '*The email will only be used for winners contact';

    const emailInput = root.querySelector('#email');
    const email = emailInput?.value.trim() ?? '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      if (emailInput) {
        emailInput.value = '';
        emailInput.placeholder = 'Enter Your Email';
        emailInput.classList.add('error-placeholder');
        emailInput.focus();
      }
      return;
    }

    emailInput.classList.remove('error-placeholder');
    emailInput.placeholder = 'Email Start';

    const formData = new FormData();
    formData.append('email', email);
    formData.append('activityType', '20260611');

    fetch('https://brand.vaporesso.com/vaporesso/java/data/lottery/activity/done/single', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.hasParticipated) {
          root.querySelector('.email-valid-ces').style.display = 'block';
          root.querySelector('.que-sucess-modal-content .qes-modal-btn').style.display =
            'flex';
          if (emailTip)
            emailTip.textContent =
              'Try a different email address, or head over to Instagram to join the social campaign.';
          return;
        }

        let targetIndex = 0;
        if (data.data?.isLottery) {
          targetIndex = XWC_PRIZE_NAMES.findIndex((p) => p.type === data.data.prizeType);
          if (targetIndex === -1) targetIndex = 1;
        } else {
          const randomIndex = [0, 4];
          targetIndex = randomIndex[Math.floor(Math.random() * randomIndex.length)];
        }
        spinRandom(targetIndex, data.data);
      })
      .catch(() => {
        startBtn.disabled = false;
      });
  };

  startBtn.addEventListener('click', onSpinClick);

  return () => {
    if (idleFrameId) cancelAnimationFrame(idleFrameId);
    startBtn.removeEventListener('click', onSpinClick);
  };
}

function revealQuizLeftPanel(el) {
  el.querySelector('.quize-md-lt-wrapper.to-top')?.classList.add('appear');
}

function initQuizScrollSection(root) {
  const el = root.querySelector('[data-xwc="quiz-scroll-section"]');
  if (!el) return null;

  const lt = el.querySelector('.quize-md-lt');
  const ltVideo = el.querySelector('.quize-md-lt-video');
  const ltCntBox = el.querySelector('.quize-md-lt-cnt-box');
  const ltCntBox1 = el.querySelector('.quize-md-lt-cnt-box1');
  const rt = el.querySelector('.quize-md-rt');
  const quizSection = el.querySelector('.quiz-section');

  if (!lt || !ltVideo || !ltCntBox || !ltCntBox1 || !rt || !quizSection) {
    return null;
  }

  const scroller = document.documentElement;

  const appearSt = ScrollTrigger.create({
    trigger: el,
    scroller,
    start: 'top 85%',
    once: true,
    onEnter: () => revealQuizLeftPanel(el),
  });

  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    revealQuizLeftPanel(el);
  }

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => revealQuizLeftPanel(el),
          onEnterBack: () => revealQuizLeftPanel(el),
        },
      })
      .fromTo(rt, {xPercent: 100}, {xPercent: 0, ease: 'none', duration: 1}, 0)
      .fromTo(
        ltCntBox,
        {opacity: 1},
        {opacity: 0, ease: 'none', duration: 0.5},
        0,
      )
      .fromTo(
        lt,
        {clipPath: 'inset(0 0% 0 0%)', x: '0rem'},
        {
          clipPath: 'inset(0 27% 0 37%)',
          x: '-49.06rem',
          ease: 'none',
          duration: 1,
        },
        0,
      )
      .fromTo(
        ltCntBox1,
        {opacity: 0, x: '0rem'},
        {opacity: 1, x: '-28rem', ease: 'none', duration: 1},
        0,
      );
  });

  mm.add('(max-width: 1023px)', () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: quizSection,
          scroller,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => revealQuizLeftPanel(el),
          onEnterBack: () => revealQuizLeftPanel(el),
        },
      })
      .fromTo(rt, {xPercent: 100}, {xPercent: 0, ease: 'none', duration: 1}, 0)
      .fromTo(
        ltCntBox,
        {opacity: 1},
        {opacity: 0, ease: 'none', duration: 0.5},
        0,
      )
      .fromTo(
        ltVideo,
        {clipPath: 'inset(0 0% 0 0%)', x: '0rem'},
        {clipPath: 'inset(0 0% 0 0%)', x: '-4rem', ease: 'none', duration: 1},
        0,
      )
      .fromTo(
        ltCntBox1,
        {opacity: 0, x: '5rem'},
        {opacity: 1, x: '1rem', ease: 'none', duration: 1},
        0,
      );
  });

  return () => {
    appearSt.kill();
    mm.revert();
  };
}

function initParallaxSection(root, isMobile) {
  const el = root.querySelector('[data-xwc="parallax-section"]');
  if (!el) return null;

  const rightElement = el.querySelector('.features-right-column');
  const leftElement = el.querySelector('.features-left-column');
  const rightYOffset = isMobile ? '-1.2rem' : '-10rem';
  const leftYOffset = isMobile ? '-1.2rem' : '-38rem';

  if (!rightElement && !leftElement) return null;

  const animation = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom center',
      scrub: 1,
    },
  });

  if (rightElement) animation.to(rightElement, {y: rightYOffset, ease: 'none'}, 0);
  if (leftElement) animation.to(leftElement, {y: leftYOffset, ease: 'none'}, 0);

  return () => {
    animation.scrollTrigger?.kill();
    animation.kill();
  };
}

function initSharePhotosScroll(root, isMobile) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root.querySelector('.share-win-photos-box'),
      start: 'top 75%',
      end: 'top 25%',
      scrub: 1,
    },
  });

  tl.fromTo(
    '.share-photo1',
    {x: '0rem', y: '0rem', rotation: -5},
    {
      x: isMobile ? '-2rem' : '-25rem',
      y: isMobile ? '0.5rem' : '5.7rem',
      rotation: -19,
      ease: 'power1.out',
    },
    0,
  )
    .fromTo(
      '.share-photo2',
      {x: '0rem', y: '0rem', rotation: 0},
      {x: '0rem', y: '0rem', rotation: 8, ease: 'power1.out'},
      0,
    )
    .fromTo(
      '.share-photo3',
      {x: '0rem', y: '0rem', rotation: 5},
      {
        x: isMobile ? '2.4rem' : '28rem',
        y: isMobile ? '0.6rem' : '5.5rem',
        rotation: isMobile ? 23 : 26,
        ease: 'power1.out',
      },
      0,
    );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}

function initBallMotion(root, isMobile) {
  const centerBall = root.querySelector('.center-ball');
  const pathBall = root.querySelector('.path-ball');
  const shootBall = root.querySelector('.shoot-ball');
  if (!centerBall || !pathBall || !shootBall) return () => {};

  gsap.set([centerBall, shootBall], {xPercent: -50, yPercent: -50});

  const centerImg = centerBall.querySelector('img');
  const pathImg = pathBall.querySelector('img');
  const shootImg = shootBall.querySelector('img');
  const staticBall = root.querySelector('.static-ball');
  const staticImg = staticBall?.querySelector('img');
  const imgsToRotate = staticImg ? [centerImg, pathImg, staticImg] : [centerImg, pathImg];

  const rotateTween = gsap.to(imgsToRotate, {
    rotation: 360 * 15,
    ease: 'none',
    scrollTrigger: {
      trigger: root.querySelector('.uv-main'),
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
    },
  });

  gsap.set('.jersey-img', {x: '-30vw', opacity: 0});
  gsap.set(centerBall, {x: 0, opacity: 0});

  const kickTl = gsap.timeline({
    scrollTrigger: {
      trigger: root.querySelector('.golden-goal-module'),
      start: 'center center',
      end: isMobile ? '+=400' : '+=800',
      scrub: 1,
      pin: false,
      onEnter: () => {
        if (staticBall) gsap.set(staticBall, {opacity: 0});
        gsap.set(centerBall, {opacity: 1});
      },
      onLeaveBack: () => {
        gsap.set(centerBall, {opacity: 0});
        if (staticBall) gsap.set(staticBall, {opacity: 1});
      },
    },
  });

  kickTl
    .to('.jersey-img', {x: '0vw', opacity: 1, duration: 0.4})
    .to(centerBall, {x: isMobile ? '3rem' : '80.225rem', duration: 0.5}, '-=0.15');

  const solidPath = isMobile
    ? root.querySelector('#ball-path-mobile')
    : root.querySelector('#ball-path-desktop');

  let pathTl = null;
  if (solidPath) {
    const pathLength = solidPath.getTotalLength();
    gsap.set(solidPath, {strokeDasharray: pathLength, strokeDashoffset: pathLength});

    pathTl = gsap.timeline({
      scrollTrigger: {
        trigger: root.querySelector('.match-day-partner-section'),
        start: 'top 50%',
        end: 'bottom 50%',
        scrub: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.set(centerBall, {opacity: 0});
          gsap.set(pathBall, {opacity: 1});
        },
        onLeaveBack: () => {
          gsap.set(centerBall, {opacity: 1});
          gsap.set(pathBall, {opacity: 0});
        },
      },
    });

    pathTl.to(
      pathBall,
      {
        motionPath: {
          path: solidPath,
          align: solidPath,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        rotation: 2080,
        ease: 'none',
      },
      0,
    );
    pathTl.to(solidPath, {strokeDashoffset: 0, ease: 'none'}, 0);
  }

  const netBall = root.querySelector('.net-ball');
  const netImg = netBall?.querySelector('img');
  if (netBall) gsap.set(netBall, {opacity: 0});

  const shootTrigger = ScrollTrigger.create({
    trigger: root.querySelector('.match-day-partner-section'),
    start: 'bottom 50%',
    endTrigger: root.querySelector('.prize-announcement'),
    end: 'bottom center',
    onEnter: () => {
      gsap.set(pathBall, {opacity: 0});
      gsap.set(centerBall, {opacity: 1});
      if (netBall) gsap.set(netBall, {opacity: 0});
    },
    onLeaveBack: () => {
      gsap.set(pathBall, {opacity: 1});
      gsap.set(centerBall, {opacity: 0});
    },
    onLeave: () => {
      const startRect = centerBall.getBoundingClientRect();
      const targetRect = netBall?.getBoundingClientRect();
      if (!targetRect) return;

      const currentRot = gsap.getProperty(centerImg, 'rotation') || 0;
      gsap.set(centerBall, {opacity: 0});
      gsap.set(shootBall, {opacity: 1});
      if (netBall) gsap.set(netBall, {opacity: 0});

      gsap.set(shootBall, {
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
        left: startRect.left,
        top: startRect.top,
      });

      const moveX = targetRect.left - startRect.left;
      const moveY = targetRect.top - startRect.top;

      gsap.fromTo(
        shootBall,
        {x: 0, y: 0},
        {
          duration: 0.8,
          x: moveX,
          y: moveY,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(shootBall, {opacity: 0});
            if (netBall) {
              gsap.set(netBall, {opacity: 1});
              gsap.set(netImg, {rotation: currentRot + 360});
            }
          },
        },
      );

      gsap.fromTo(
        shootImg,
        {rotation: currentRot},
        {rotation: currentRot + 1080, duration: 0.8, ease: 'power2.in'},
      );
    },
    onEnterBack: () => {
      gsap.killTweensOf(shootBall);
      gsap.killTweensOf(shootImg);
      gsap.set(shootBall, {opacity: 0});
      if (netBall) gsap.set(netBall, {opacity: 0});
      gsap.set(centerBall, {opacity: 1});
    },
  });

  const disclaimerTween = gsap.fromTo(
    root.querySelector('.campaign-disclaimer__tran'),
    {y: '-100%'},
    {
      y: '0',
      ease: 'none',
      scrollTrigger: {
        trigger: root.querySelector('.prize-announcement'),
        start: 'bottom bottom',
        end: 'bottom center',
        scrub: 1,
      },
    },
  );

  return () => {
    rotateTween.scrollTrigger?.kill();
    rotateTween.kill();
    kickTl.scrollTrigger?.kill();
    kickTl.kill();
    pathTl?.scrollTrigger?.kill();
    pathTl?.kill();
    shootTrigger.kill();
    disclaimerTween.scrollTrigger?.kill();
    disclaimerTween.kill();
  };
}

export function useXros6WorldcupPage(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const isMobile = isMobileWidth();
    const cleanups = [];

    cleanups.push(initScrollAppear(root));
    initKvBanner(root);
    const timelineSt = initCampaignTimeline(root, isMobile);
    if (timelineSt) cleanups.push(() => timelineSt.kill());
    cleanups.push(initPersonalizedApp(root));
    cleanups.push(initGallery(root));
    cleanups.push(initCopyButtons(root));
    cleanups.push(initLazyVideos(root));
    cleanups.push(initQuizGame(root, isMobile));
    cleanups.push(initSpinWheel(root, isMobile));
    cleanups.push(initQuizScrollSection(root));
    cleanups.push(initParallaxSection(root, isMobile));
    cleanups.push(initSharePhotosScroll(root, isMobile));
    cleanups.push(initBallMotion(root, isMobile));

    const refreshScroll = () => ScrollTrigger.refresh();
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

export function useXros6WorldcupLenis() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('xros6-worldcup-page');

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
      root.classList.remove('xros6-worldcup-page');
    };
  }, []);
}
