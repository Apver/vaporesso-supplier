import {useEffect, useRef} from 'react';
import {CountUp} from 'countup.js';
import '~/styles/ui-v4/media-overlay.scss';

function CountUpNum({value}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const endVal = Number(value);
    if (Number.isNaN(endVal)) {
      el.textContent = String(value ?? '');
      return undefined;
    }

    const decimalPlaces = String(value).includes('.')
      ? String(value).split('.')[1].length
      : 0;

    const instance = new CountUp(el, endVal, {
      useEasing: true,
      useGrouping: true,
      startVal: 0,
      duration: 0.8,
      decimalPlaces,
      enableScrollSpy: true,
      scrollSpyOnce: true,
    });

    return () => instance.reset();
  }, [value]);

  return (
    <span ref={ref} className="ui-v4-media-overlay__data-item-num">
      {value}
    </span>
  );
}

export function MediaOverlaySection({
  techIcon,
  subtitle,
  title,
  description,
  tips,
  imgBgPc,
  imgBgMob,
  videoBgPc,
  videoBgMob,
  isMobDataOnMedia,
  dataList,
  children,
  className,
}) {
  return (
    <div className={`ui-v4-media-overlay ${className || ''}`}>
      <div className="ui-v4-media-overlay__content">
        {techIcon && (
          <img
            src={techIcon}
            alt={title}
            className="ui-v4-media-overlay__tech-icon"
          />
        )}
        {subtitle && <h3 className="ui-v4-subtitle to-top">{subtitle}</h3>}
        {title && <h2 className="ui-v4-title to-top">{title}</h2>}
        {description && (
          <p className="ui-v4-description to-top">{description}</p>
        )}
        {tips && <ul className="ui-v4-tips to-top">{tips}</ul>}
        {dataList && (
          <div
            className={`ui-v4-media-overlay__data ${isMobDataOnMedia ? 's-hide' : ''}`}
          >
            {dataList.map((item, index) => (
              <div
                key={index}
                className="ui-v4-media-overlay__data-item to-top"
              >
                <div className="ui-v4-media-overlay__data-item-top">
                  <CountUpNum value={item.num} />
                  {item.unit && (
                    <span className="ui-v4-media-overlay__data-item-unit">
                      {item.unit}
                    </span>
                  )}
                  {item.icon && (
                    <img
                      className="ui-v4-media-overlay__data-item-icon"
                      src={item.icon}
                      alt=""
                    />
                  )}
                </div>
                <p className="ui-v4-media-overlay__data-item-description">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ui-v4-media-overlay__media-container">
        {imgBgPc || imgBgMob ? (
          <picture>
            {imgBgPc ? (
              <source media="(min-width: 1024px)" srcSet={imgBgPc} />
            ) : null}
            <img
              src={imgBgMob}
              alt={title}
              className="ui-v4-media-overlay__media"
            />
          </picture>
        ) : (
          <video
            src={videoBgPc}
            className="ui-v4-media-overlay__media"
            autoPlay
            muted
            loop
          >
            {videoBgMob ? <source src={videoBgMob} type="video/mp4" /> : null}
          </video>
        )}
        {isMobDataOnMedia && (
          <div className="ui-v4-media-overlay__data ui-v4-media-overlay__data-mob-pos x-hide">
            {dataList.map((item, index) => (
              <div
                key={index}
                className="ui-v4-media-overlay__data-item to-top"
              >
                <div className="ui-v4-media-overlay__data-item-top">
                  <span className="ui-v4-media-overlay__data-item-num">
                    {item.num}
                  </span>
                  {item.unit && (
                    <span className="ui-v4-media-overlay__data-item-unit">
                      {item.unit}
                    </span>
                  )}
                  {item.icon && (
                    <img
                      className="ui-v4-media-overlay__data-item-icon"
                      src={item.icon}
                      alt=""
                    />
                  )}
                </div>
                <p className="ui-v4-media-overlay__data-item-description">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
