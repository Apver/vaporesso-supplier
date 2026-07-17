const defaultAccessCards = [
  {
    id: 'our-brand-card',
    groupId: 'our-brand',
    href: 'https://www.vaporesso.com/about-us',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/6-1.jpg?v=1.2',
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-Mob-6-1.jpg',
    alt: 'VAPORESSO – a pioneering vape manufacturer committed to innovation, quality, and excellence in the vaping industry.',
    title: 'Our Brand',
    description: 'All About VAPORESSO',
    descriptionClassName: 'f_16',
    linkLabel: 'Learn More',
  },
  {
    id: 'news-blog-card',
    groupId: 'news-and-compliance',
    href: '/blog',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/6-2.jpg?v=1.2',
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-Mob-6-2.jpg',
    alt: "Stay updated with VAPORESSO's latest news and blogs – insights from a leading vape company and manufacturer.",
    title: 'News & Blog',
    description: 'Latest Innovations and Updates',
    descriptionClassName: 'f_16',
    linkLabel: 'Learn More',
  },
  {
    id: 'compliance-card',
    groupId: 'news-and-compliance',
    href: 'https://www.vaporesso.com/pmta',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/6-3.jpg?v=1.2',
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-Mob-6-3.jpg',
    alt: "VAPORESSO's compliance with international standards – ensuring safe and reliable vape products from a trusted manufacturer.",
    title: 'Compliance',
    description: 'Regulation and Responsibility',
    descriptionClassName: 'f_16',
    linkLabel: 'Learn More',
  },
  {
    id: 'support-card',
    groupId: 'support',
    href: 'https://www.vaporesso.com/contact-us',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/6-4.jpg?v=1.2',
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-Mob-6-4.jpg',
    alt: 'VAPORESSO customer support – dedicated assistance for all your vape kit and supply needs.',
    title: 'Support',
    description: '24/7 Customer Service',
    descriptionClassName: 'f_16 mb_16',
    linkLabel: 'Learn More',
  },
];

function createAccessItems(cards) {
  if (!Array.isArray(cards)) return [];

  const groups = [];
  const groupIndexById = new Map();

  cards.forEach((card) => {
    if (!card) return;
    const groupId = card.groupId || card.id;

    if (!groupIndexById.has(groupId)) {
      groupIndexById.set(groupId, groups.length);
      groups.push({id: groupId, cards: []});
    }

    const groupIndex = groupIndexById.get(groupId);
    groups[groupIndex].cards.push(card);
  });

  return groups;
}

function AccessCard({
  href,
  desktopImage,
  mobileImage,
  alt,
  title,
  description,
  descriptionClassName,
  linkLabel,
  onButtonClick,
}) {
  return (
    <>
      <a
        href={href}
        className="a-jump"
        onClick={() => {
          if (onButtonClick) {
            onButtonClick({
              elementInfo: {
                type: 'link',
                text: title,
                url: href,
                id: 'image-link',
                className: 'access-image-link',
              },
            });
          }
        }}
      >
        <picture>
          <source media="(max-width: 1023px)" srcSet={mobileImage} />
          <source media="(min-width: 1024px)" srcSet={desktopImage} />
          <img
            src={desktopImage}
            alt={alt}
            className="lazyload"
            loading="lazy"
          />
        </picture>
      </a>
      <div className="info">
        <h3 className="f_22 f-d-bold mb_4">{title}</h3>
        <p className={descriptionClassName}>{description}</p>
        <a
          href={href}
          className="f_16 learn-link"
          onClick={() => {
            if (onButtonClick) {
              onButtonClick({
                elementInfo: {
                  type: 'link',
                  text: linkLabel,
                  url: href,
                  id: 'text-link',
                  className: 'access-text-link',
                },
              });
            }
          }}
        >
          {linkLabel}
        </a>
      </div>
    </>
  );
}

export function AccessSection({accessDataset = [], onButtonClick}) {
  const cards =
    Array.isArray(accessDataset) && accessDataset.length > 0
      ? accessDataset
      : defaultAccessCards;
  const accessItems = createAccessItems(cards);

  return (
    <section className="access">
      {accessItems.map((item) => (
        <div className="item" key={item.id}>
          {item.cards.length > 1 ? (
            item.cards.map((card) => (
              <div className="b" key={card.id}>
                <AccessCard {...card} onButtonClick={onButtonClick} />
              </div>
            ))
          ) : (
            <AccessCard {...item.cards[0]} onButtonClick={onButtonClick} />
          )}
        </div>
      ))}
    </section>
  );
}
