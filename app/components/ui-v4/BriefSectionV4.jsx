import '~/styles/ui-v4/brief.scss';
export function BriefSectionV4({data, className, children}) {
  const {
    pcVideoUrl,
    mobVideoUrl,
    pcImageUrl,
    mobImageUrl,
    title,
    desc,
    btnLink,
    btnText,
  } = data;
  return (
    <div className={`ui-v4-brief ${className || ''}`}>
      {title && <p className="ui-v4-brief__title to-top">{title}</p>}
      {pcVideoUrl && (
        <video
          className="ui-v4-brief__media to-top"
          src={pcVideoUrl}
          poster={pcImageUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      {mobVideoUrl && (
        <video
          className="ui-v4-brief__media to-top"
          src={mobVideoUrl}
          poster={mobImageUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      )}

      {!pcVideoUrl && (
        <picture>
          {pcImageUrl ? (
            <source media="(min-width: 1024px)" srcSet={pcImageUrl} />
          ) : null}
          <img
            className="ui-v4-brief__media to-top"
            src={mobImageUrl || pcImageUrl}
            alt=""
          />
        </picture>
      )}
      <div>
        {desc && <p className="ui-v4-brief__description to-top">{desc}</p>}
        {btnLink && (
          <a
            className="ui-v4-brief__button to-top"
            href={btnLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {btnText || 'Watch the video'}
            <img
              className="ui-v4-brief-button__icon"
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/icon_video_play_black.svg?v=1765434405"
              alt=""
            ></img>
          </a>
        )}
      </div>
      {children}
    </div>
  );
}
