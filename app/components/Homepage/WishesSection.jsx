const defaultWishesData = {
  logoAlt: 'Logo',
  logoSrc:
    'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_icon-icon_logo.svg',
  logoClassName: 'lazyload',
  logoLoading: 'lazy',
  paragraph1:
    "Established in 2015, VAPORESSO's goal has been to establish a smoke-free world while raising the quality of life for our users through innovation and experience. We want to make a difference in the lives of our users, and create products that can fit all levels and styles of vapers, to help as many as possible.",
  paragraph2: 'MOVE BEYOND ORDINARY.',
};

export function WishesSection({wishesDataset = []}) {
  const wishesData =
    Array.isArray(wishesDataset) && wishesDataset.length > 0
      ? wishesDataset[0]
      : defaultWishesData;

  return (
    <section className="wishes">
      <img
        alt={wishesData.logoAlt}
        src={wishesData.logoSrc}
        data-src={wishesData.logoSrc}
        className="lazyload"
        loading="lazy"
      />
      <p className="f_18 mb_28">{wishesData.paragraph1}</p>
      <p className="f_18">{wishesData.paragraph2}</p>
    </section>
  );
}
