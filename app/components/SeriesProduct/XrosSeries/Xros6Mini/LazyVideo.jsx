import {useEffect, useRef} from 'react';

/**
 * 视口内自动播放、离开暂停（源自 a.js lazy-video）
 */
export function LazyVideo({children, className, enableOn = 'all'}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = root?.querySelector('video');
    if (!root || !video) return;

    video.muted = true;
    video.playsInline = true;
    video.controls = video.hasAttribute('controls');

    const isMobileWidth = () => window.innerWidth <= 1024;
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
              video.play()?.catch(() => {});
            }
          } else if (!video.paused) {
            video.pause();
          }
        });
      },
      {threshold: 0.1},
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [enableOn]);

  return (
    <div className={className} ref={rootRef}>
      {children}
    </div>
  );
}
