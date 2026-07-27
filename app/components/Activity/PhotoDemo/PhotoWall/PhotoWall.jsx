import {useEffect, useRef} from 'react';
import {initPhotoWall} from './initPhotoWall';

/**
 * 3D photo wall (left stage + optional right content).
 *
 * @param {{
 *   images: string[],
 *   groupCounts?: number[],
 *   backgroundPc?: string,
 *   backgroundMob?: string,
 *   className?: string,
 *   children?: import('react').ReactNode,
 * }} props
 */
export function PhotoWall({
  images,
  groupCounts,
  backgroundPc,
  backgroundMob,
  className,
  children,
}) {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !images?.length) return undefined;
    return initPhotoWall(stage, {images, groupCounts});
  }, [images, groupCounts]);

  const style = {
    ...(backgroundPc
      ? {'--ui-v4-photo-wall-bg-pc': `url(${backgroundPc})`}
      : {}),
    ...(backgroundMob
      ? {'--ui-v4-photo-wall-bg-mob': `url(${backgroundMob})`}
      : {}),
  };

  return (
    <section
      className={`ui-v4-photo-wall${className ? ` ${className}` : ''}`}
      style={style}
    >
      <div className="ui-v4-photo-wall__split">
        <div className="ui-v4-photo-wall__left">
          <div className="ui-v4-photo-wall__stage" ref={stageRef} />
        </div>
        {children ? (
          <div className="ui-v4-photo-wall__right">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
