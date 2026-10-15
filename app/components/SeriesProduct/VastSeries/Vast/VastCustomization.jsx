const DEFAULT_FEATURES = [
  { title: 'Adjustable\nAirflow', description: 'Loose - Tight' },
  { title: 'Adjustable\nPower Modes', description: 'ECO - NOR - PWR' },
];

const renderLines = (text) =>
  String(text).split('\n').map((line, index) => <span key={index}>{line}</span>);

const FeatureImage = ({ image, mobileImage, alt = '', width, height }) => (
  <picture className="vast-customization__picture">
    {mobileImage && <source media="(max-width: 767px)" srcSet={mobileImage} />}
    {image && (
      <img src={image} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
    )}
  </picture>
);

export const VastCustomization = ({ data = {} }) => {
  const {
    title = 'Effortlessly\nCustomized',
    image,
    mobileImage,
    imageAlt = 'VAST adjustable airflow and power controls',
    features = DEFAULT_FEATURES,
  } = data;

  return (
    <section className="vast-customization">
      <div className="vast-customization__container">
        <h2 className="vast-customization__title">{renderLines(title)}</h2>
        <div className="vast-customization__grid">
          <div className="vast-customization__overview">
            <FeatureImage image={image} mobileImage={mobileImage} alt={imageAlt} width={515} height={515} />
          </div>
          <div className="vast-customization__features">
            {features.map((item, index) => (
              <div className="vast-customization__card" key={item.key || index}>
                <FeatureImage image={item.image} mobileImage={item.mobileImage} alt={item.alt || ''} width={515} height={250} />
                <div className="vast-customization__copy">
                  <h3 className="vast-customization__feature-title">{renderLines(item.title || '')}</h3>
                  {item.description && <p className="vast-customization__description">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VastCustomization;
