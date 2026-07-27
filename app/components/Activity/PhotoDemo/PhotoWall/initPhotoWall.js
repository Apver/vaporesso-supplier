import {gsap} from 'gsap';

const DEFAULT_GROUP_COUNTS = [6, 6, 6, 5, 6];

/**
 * Build the 3D photo-wall stage and start GSAP timelines.
 * @param {HTMLElement} stage
 * @param {{
 *   images?: string[],
 *   groupCounts?: number[],
 * }} [options]
 * @returns {() => void} cleanup
 */
export function initPhotoWall(stage, options = {}) {
  if (!stage) return () => {};

  const images = options.images?.length ? options.images : [];
  if (!images.length) return () => {};

  const groupCounts = options.groupCounts?.length
    ? options.groupCounts
    : DEFAULT_GROUP_COUNTS;

  let rotationTimeline = null;
  const groupTimelines = [];
  let imageIndex = 0;

  groupCounts.forEach((count, groupIndex) => {
    const group = document.createElement('div');
    group.className = 'ui-v4-photo-wall__group';
    group.dataset.group = String(groupIndex);
    stage.appendChild(group);

    for (let i = 0; i < count; i++) {
      const imageItem = document.createElement('div');
      imageItem.className = 'ui-v4-photo-wall__item';
      const src = images[imageIndex % images.length];
      imageItem.innerHTML = `<img src="${src}" alt="Photo ${imageIndex + 1}">`;
      group.appendChild(imageItem);
      imageIndex += 1;

      gsap.set(imageItem, {opacity: 0, transformOrigin: '50% 50%'});
      gsap.to(imageItem, {
        opacity: 1,
        duration: 1.8,
        delay: 0.1 * (groupIndex * 3 + i),
        ease: 'back.out(1.4)',
      });
    }
  });

  gsap.set(stage, {
    rotationX: 0,
    rotationY: -30,
    rotationZ: 0,
    transformOrigin: '50% 50% 0px',
  });

  rotationTimeline = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.1,
  });
  rotationTimeline.to(stage, {
    rotationY: 30,
    duration: 3,
    ease: 'power2.inOut',
  });

  const groups = stage.querySelectorAll('.ui-v4-photo-wall__group');
  const isMobileView = window.matchMedia('(max-width: 1023px)').matches;

  groups.forEach((group, groupIndex) => {
    const groupTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.1,
    });
    groupTimelines.push(groupTimeline);

    let minZ = 0;
    let maxZ = 0;
    if (!isMobileView) {
      if (groupIndex === 0) {
        minZ = 100;
        maxZ = 300;
      } else if (groupIndex === 1) {
        minZ = 30;
        maxZ = 130;
      } else if (groupIndex === 2) {
        minZ = 0;
        maxZ = 0;
      } else if (groupIndex === 3) {
        minZ = -100;
        maxZ = -200;
      } else if (groupIndex === 4) {
        minZ = -200;
        maxZ = -500;
      }
    } else if (groupIndex === 0) {
      minZ = 80;
      maxZ = 150;
    } else if (groupIndex === 1) {
      minZ = 15;
      maxZ = 60;
    } else if (groupIndex === 2) {
      minZ = 0;
      maxZ = 0;
    } else if (groupIndex === 3) {
      minZ = -10;
      maxZ = -50;
    } else if (groupIndex === 4) {
      minZ = -60;
      maxZ = -100;
    }

    gsap.set(group, {z: maxZ});

    if (groupIndex === 2) {
      groupTimeline.set(group, {z: 0}, 0);
      groupTimeline.set(group, {z: 0}, 1.5);
      groupTimeline.set(group, {z: 0}, 3);
    } else {
      groupTimeline.to(group, {z: minZ, duration: 1.5, ease: 'power2.inOut'});
      groupTimeline.to(group, {z: maxZ, duration: 1.5, ease: 'power2.inOut'});
    }

    let maxY = 0;
    let centerY = 0;
    if (groupIndex === 0) {
      maxY = -60;
      centerY = -45;
    } else if (groupIndex === 1) {
      maxY = -20;
      centerY = -15;
    } else if (groupIndex === 3) {
      maxY = 20;
      centerY = 15;
    } else if (groupIndex === 4) {
      maxY = 60;
      centerY = 45;
    }

    gsap.set(group, {y: maxY});
    groupTimeline.to(
      group,
      {y: centerY, duration: 1.5, ease: 'power2.inOut'},
      0,
    );
    groupTimeline.to(
      group,
      {y: maxY, duration: 1.5, ease: 'power2.inOut'},
      1.5,
    );
  });

  const handleResize = () => {
    gsap.set(stage, {transformOrigin: '50% 50%'});
  };

  handleResize();
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    rotationTimeline?.kill();
    groupTimelines.forEach((tl) => tl.kill());
    stage.innerHTML = '';
  };
}
