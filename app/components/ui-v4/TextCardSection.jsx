import '~/styles/ui-v4/text-card.scss';
export function TextCardSection({
  techIcon,
  subtitle,
  title,
  description,
  tips,
  cardList,
  isTextOnCard,
  children,
  className,
}) {
  return (
    <div className={`ui-v4-text-card ${className || ''}`}>
      {techIcon && (
        <img
          src={techIcon}
          alt={title}
          className="ui-v4-text-card__tech-icon"
        />
      )}
      {subtitle && <h3 className="ui-v4-subtitle to-top">{subtitle}</h3>}
      {title && <h2 className="ui-v4-title to-top">{title}</h2>}
      {description && <p className="ui-v4-description to-top">{description}</p>}
      {tips && <ul className="ui-v4-tips x-hide to-top">{tips}</ul>}
      {cardList && (
        <div className="ui-v4-text-card__card-list">
          {cardList.map((item, index) => (
            <div key={index} className="ui-v4-text-card__card-item">
              {item.imgPc || item.imgMob ? (
                <picture>
                  {item.imgPc ? (
                    <source media="(min-width: 1024px)" srcSet={item.imgPc} />
                  ) : null}
                  <img
                    src={item.imgMob}
                    alt={title}
                    className="ui-v4-text-card__media"
                  />
                </picture>
              ) : (
                <video
                  src={item.videoPc}
                  className="ui-v4-text-card__media"
                  autoPlay
                  muted
                  loop
                >
                  {item.videoMob ? (
                    <source src={item.videoMob} type="video/mp4" />
                  ) : null}
                </video>
              )}
              <div
                className={`ui-v4-text-card__card-item-content ${isTextOnCard ? 'ui-v4-text-card__card-item-content-pos' : ''}`}
              >
                {item.title && (
                  <h3 className="ui-v4-text-card__card-item-title to-top">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="ui-v4-text-card__card-item-description to-top">
                    {item.description}
                  </p>
                )}
                {item.dataList && (
                  <div className="ui-v4-text-card__card-item-data-list">
                    {item.dataList.map((data, index) => (
                      <div
                        key={index}
                        className="ui-v4-text-card__card-item-data-text"
                      >
                        {data.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tips && <ul className="ui-v4-tips s-hide to-top">{tips}</ul>}
      {children}
    </div>
  );
}
