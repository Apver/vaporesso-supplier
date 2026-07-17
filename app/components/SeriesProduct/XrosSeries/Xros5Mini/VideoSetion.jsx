export function VideoSection({data, className, children}) {
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
    <div className={`ui_v3-video_section ${className || ''}`}>
      {title && <p className="ui_v3-video_section-title to-top">{title}</p>}
      {pcVideoUrl && (
        <video
          className="ui_v3-video_section_media ui_v3-video_section-video_pc to-top"
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
          className="ui_v3-video_section_media ui_v3-video_section-video_mob to-top"
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
            className="ui_v3-video_section_media ui_v3-video_section_image to-top"
            src={mobImageUrl || pcImageUrl}
            alt=""
          />
        </picture>
      )}
      <div>
        {desc && (
          <p className="ui_v3-video_section-description to-top">{desc}</p>
        )}
        {btnLink && (
          <a
            className="ui_v3-video_section-button to-top"
            href={btnLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {btnText || 'Watch the video'}
            <img
              className="ui_v3-video_section-button-icon"
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
