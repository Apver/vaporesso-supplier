/**
 * ARMOUR G2 — 视频区（封面图 + 描述 + 播放按钮）
 * 设计稿：PC 1:179（图 980x580）／MOB 1:947（图 325x340，文案与按钮左对齐）
 * 按钮只在有 btnLink 时渲染：视频链接（YouTube）还没给，先不显示，拿到后在数据里填上即可。
 */
const VIDEO_ICON =
  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/icon_video_play_black.svg';

export function VideoSection({
  imgPc,
  imgMob,
  description,
  btnText,
  btnLink,
  iconUrl,
  className,
}) {
  return (
    <section className={`product-armour-g2-video ${className || ''}`}>
      <div className="product-armour-g2-video-body">
        <picture>
          <source media="(max-width: 1023px)" srcSet={imgMob} />
          <source media="(min-width: 1024px)" srcSet={imgPc} />
          <img
            className="product-armour-g2-video-cover to-top"
            src={imgPc}
            alt=""
          />
        </picture>
        {description && (
          <p className="product-armour-g2-video-desc to-top">{description}</p>
        )}
      </div>
      {btnLink && (
        <a
          className="product-armour-g2-video-btn to-top"
          href={btnLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="product-armour-g2-video-btn-text">
            {btnText || 'Watch the video'}
          </span>
          <img
            className="product-armour-g2-video-btn-icon"
            src={iconUrl || VIDEO_ICON}
            alt=""
          />
        </a>
      )}
    </section>
  );
}
