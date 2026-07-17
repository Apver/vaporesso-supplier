/**
 * ProductsBanner Component
 * Displays a grid of product/lifestyle banners
 */
const defaultBannerItems = [
  {
    href: 'https://www.dojovape.com/',
    isExternal: true,
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/Mob-3-2-DOJO.webp',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-3-2-DOJO3.webp?v=1782972556',
    alt: 'Dojo Vape',
    infoClass: 'dojo',
    logo: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/dojo-4.png?v=1782972556',
    title: null,
    description: 'Create & Share',
    linkClass: 'b',
  },
  {
    href: 'https://www.deliciujuice.com/',
    isExternal: true,
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/Mob-3-2-Deliciu.webp',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/3-2Deliciu.webp',
    alt: 'DELICIU – a range of flavorful e-liquids complementing refillable vape kits for a rich vaping experience.',
    infoClass: '',
    logo: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/DELICIU.svg',
    title: null,
    description: 'A Good Fit For All Vapers',
    linkClass: 'b',
  },
  {
    href: 'https://www.vaporesso.com/community',
    isExternal: false,
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/Mob-3-5.jpg',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/3-5.jpg?v=1.2',
    alt: 'VAPORESSO lifestyle visuals showcasing modern vaping culture and the integration of vape kits into daily life.',
    infoClass: 'w',
    logo: null,
    title: 'Community',
    description: 'Born to Defy the Norm',
    linkClass: '',
  },
  {
    href: 'https://www.vaporesso.com/lifestyle',
    isExternal: false,
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-Mob-3-4.jpg',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/3-4.jpg?v=1.2',
    alt: 'VAPORESSO lifestyle visuals showcasing modern vaping culture and the integration of vape kits into daily life.',
    infoClass: '',
    logo: null,
    title: 'Lifestyle',
    description: 'Be You, Be Unique',
    linkClass: 'b',
  },
];

function getBannerLinkProps(item) {
  if (item.isExternal) {
    return {href: item.href, target: '_blank', rel: 'noopener noreferrer'};
  }

  return {href: item.href};
}

export function ProductsBanner({productsDataset = [], onProductClick}) {
  const bannerItems =
    Array.isArray(productsDataset) && productsDataset.length > 0
      ? productsDataset
      : defaultBannerItems;

  return (
    <section className="products-banner">
      <ul className="products-banner-list">
        {bannerItems.map((item, index) => {
          const linkProps = getBannerLinkProps(item);

          const handleBannerClick = () => {
            if (onProductClick) {
              onProductClick(
                {
                  id: `banner-${index}`,
                  title:
                    item.title ||
                    item.description ||
                    item.alt ||
                    'Product Banner',
                  handle: item.href,
                  href: item.href,
                  isExternal: item.isExternal,
                  bannerIndex: index,
                },
                'products_banner',
              );
            }
          };

          return (
            <li key={index}>
              <a {...linkProps} onClick={handleBannerClick}>
                <picture>
                  <source
                    media="(max-width: 1023px)"
                    srcSet={item.mobileImage}
                  />
                  <source
                    media="(min-width: 1024px)"
                    srcSet={item.desktopImage}
                  />
                  <img
                    src={item.desktopImage}
                    alt={item.alt}
                    className="lazyload products-banner-list-img"
                    loading="lazy"
                  />
                </picture>
                <div className={`list-info ${item.infoClass}`}>
                  <div className="list-info-copy">
                    {item.logo && (
                      <img
                        src={item.logo}
                        alt=""
                        className="slogan"
                        loading="lazy"
                      />
                    )}
                    {item.title && (
                      <h3 className="f_32 f-d-bold mb_6">{item.title}</h3>
                    )}
                    <p className="f_17 mb_16 text-cap">{item.description}</p>
                  </div>
                  <span className={`f_16 learn-link ${item.linkClass}`}>
                    Learn More
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
