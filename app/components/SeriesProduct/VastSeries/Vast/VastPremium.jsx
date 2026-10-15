export const VastPremium = ({ data = {} }) => {
  const {
    title = 'Simply Premium.',
    description = "Engineered with the same obsessive attention to material and finish you'd expect from the world's finest devices.",
    pcImage,
    mobileImage,
    imageAlt = 'VAST premium finish',
  } = data;

  return (
    <section className="vast-premium">
      <picture className="vast-premium__background">
        {mobileImage && (
          <source media="(max-width: 767px)" srcSet={mobileImage} />
        )}
        <img
          src={pcImage || mobileImage}
          alt={imageAlt}
          width="1920"
          height="1050"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="vast-premium__container">
        <div className="vast-premium__content">
          <h2 className="vast-premium__title">{title}</h2>
          <p className="vast-premium__description">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default VastPremium;
