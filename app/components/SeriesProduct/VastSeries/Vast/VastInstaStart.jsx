const STEP_TEXT = [
  'Fill E-juice to the minimum line.',
  'Remove the silicone.',
  'Push together right after filling.',
  'Enjoy it.',
];

export const VastInstaStart = ({ data = {} }) => {
  const { title = '4 Steps to Insta Start', slides = [] } = data;

  if (!slides.length) return null;

  return (
    <section className="vast-insta-start">
      <div className="vast-insta-start__container">
        <h2 className="vast-insta-start__title">{title}</h2>
        <ol className="vast-insta-start__grid">
          {slides.map((item, index) => (
            <li className="vast-insta-start__card" key={item.key || index}>
              <div className="vast-insta-start__content">
                <span className="vast-insta-start__number" aria-hidden="true">{index + 1}</span>
                <p className="vast-insta-start__text">{item.text || STEP_TEXT[index]}</p>
              </div>
              <picture className="vast-insta-start__media">
                {item.mobileImage && (
                  <source media="(max-width: 767px)" srcSet={item.mobileImage} />
                )}
                <img
                  src={item.image}
                  alt={item.alt || item.text || STEP_TEXT[index] || `Step ${index + 1}`}
                  width="247"
                  height="247"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default VastInstaStart;
