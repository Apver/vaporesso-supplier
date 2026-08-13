export const OctaTextureShowcase = ({ data }) => {
  const {
    title,
    items = [],
  } = data;

  return (
    <section className="octa-texture">
      <div className="octa-texture__inner">
        <h2 className="octa-texture__title">
          {title}
        </h2>

        <div className="octa-texture__list">
          {items.map((item) => (
            <div
              key={item.key}
              className="octa-texture__item"
            >
              <div className="octa-texture__card">
                <picture className="octa-texture__picture">
                  {item.image.mobile && (
                    <source
                      media="(max-width: 1023px)"
                      srcSet={item.image.mobile}
                    />
                  )}

                  <img
                    className="octa-texture__image"
                    src={item.image.pc}
                    alt={item.alt || item.name}
                    loading="lazy"
                  />
                </picture>
              </div>

              <div
                className="octa-texture__name"
                style={{
                  '--texture-color': item.color,
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};