/**
 * 按顺序传入六张卡片：容量、启动、续航、防漏、三芯、电池。
 * 图片卡片配置 image，logo + 文字卡片配置 type: 'logo'。
 */
export const VastFeatures = ({ data = {} }) => {
  const { title = 'VAST Features', slides = [] } = data;

  if (!slides.length) return null;

  const renderCard = (item, index) => (
    <div
      key={item.key || index}
      className={`vast-features__card vast-features__card--${index + 1}${item.type === 'logo' ? ' vast-features__card--logo' : ''}${item.key === 'battery' ? ' vast-features__card--battery' : ''}`}
      style={item.color ? { '--vast-feature-color': item.color } : undefined}
    >
      {item.type === 'logo' ? (
        <div className="vast-features__content">
          {item.logo && (
            <img
              className="vast-features__logo"
              src={item.logo}
              alt={item.logoAlt || ''}
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="vast-features__text">
            <h3 className="vast-features__title">
              {item.title}
              {item.suffix && <span className="vast-features__suffix">{item.suffix}</span>}
            </h3>
            {item.desc && <p className="vast-features__desc">{item.desc}</p>}
          </div>
        </div>
      ) : (
        <div className="vast-features__media">
          <picture className="vast-features__picture">
            {item.image?.mobile && (
              <source
                media="(max-width: 1023px)"
                srcSet={item.image.mobile}
              />
            )}
            <img
              className="vast-features__image"
              src={item.image?.pc || item.image?.mobile}
              alt={item.alt || ''}
              loading="lazy"
              decoding="async"
            />
          </picture>

          {(item.title || item.desc) && (
            <div className="vast-features__overlay">
              {item.title && (
                <h3 className="vast-features__image-title">
                  {item.title}
                </h3>
              )}
              {item.desc && (
                <p className="vast-features__image-desc">
                  {item.desc}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section className="vast-features" aria-label={title}>
      <div className="vast-features__grid">
        <div className="vast-features__row vast-features__row--top">
          {slides.slice(0, 3).map((item, index) => renderCard(item, index))}
        </div>
        <div className="vast-features__row vast-features__row--bottom">
          {slides.slice(3).map((item, index) => renderCard(item, index + 3))}
        </div>
      </div>
    </section>
  );
};

