export const OctaOverheatProtection = ({ data }) => {
  const {
    title,
    subtitle,
    image,
    temperature,
    temperatureUnit,
    temperatureDesc,
    note,
  } = data;

  return (
    <section className="octa-overheat">
      <div className="octa-overheat__header">
        <h2 className="octa-overheat__title">
          {title}
        </h2>

        {subtitle && (
          <p className="octa-overheat__subtitle">
            {subtitle}
          </p>
        )}
      </div>

      <div className="octa-overheat__media">
        <picture className="octa-overheat__picture">
          <source
            media="(max-width: 1023px)"
            srcSet={image.mobile}
          />

          <img
            className="octa-overheat__image"
            src={image.pc}
            alt=""
            loading="lazy"
          />
        </picture>

        <div className="octa-overheat__temperature">
          <div className="octa-overheat__temperature-value">
            {temperature}

            <span className="octa-overheat__temperature-unit">
              {temperatureUnit}
            </span>
          </div>

          <p className="octa-overheat__temperature-desc">
            {temperatureDesc}
          </p>
        </div>

        {note && (
          <p className="octa-overheat__note">
            {note}
          </p>
        )}
      </div>
    </section>
  );
};