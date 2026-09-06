import '~/styles/ui-v4/text-media.scss';
export function TextMediaSection({
  techIcon,
  subtitle,
  title,
  description,
  tips,
  imgBgPc,
  imgBgMob,
  videoBgPc,
  videoBgMob,
  children,
  className,
}) {
  return (
    <div className={`ui-v4-text-media ${className || ''}`}>
      <div className="ui-v4-text-media__content">
        {techIcon && (
          <img
            src={techIcon}
            alt={title}
            className="ui-v4-text-media__tech-icon"
          />
        )}
        {subtitle && <h3 className="ui-v4-subtitle to-top">{subtitle}</h3>}
        {title && <h2 className="ui-v4-title to-top">{title}</h2>}
        {description && (
          <p className="ui-v4-description to-top">{description}</p>
        )}
        {tips && <ul className="ui-v4-tips x-hide to-top">{tips}</ul>}

        {imgBgPc || imgBgMob ? (
          <picture>
            {imgBgPc ? (
              <source media="(min-width: 1024px)" srcSet={imgBgPc} />
            ) : null}
            <img
              src={imgBgMob}
              alt={title}
              className="ui-v4-text-media__media"
            />
          </picture>
        ) : (
          <video
            src={videoBgPc}
            className="ui-v4-text-media__media"
            autoPlay
            muted
            loop
          >
            {videoBgMob ? <source src={videoBgMob} type="video/mp4" /> : null}
          </video>
        )}
        {tips && <ul className="ui-v4-tips s-hide to-top">{tips}</ul>}
      </div>
      {children}
    </div>
  );
}
