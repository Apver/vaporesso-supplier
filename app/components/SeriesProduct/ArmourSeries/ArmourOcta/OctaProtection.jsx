const proofCards = [
  {
    key: 'water',
    type: 'water',
    imagePc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-03-1-2x.webp',
    imageMobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-03-1-3x.webp',
    title: 'WATER-PROOF',
    desc: '1M depth for 30+ minutes',
  },
  {
    key: 'shock',
    type: 'shock',
    imagePc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-03-2-2x.webp',
    imageMobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-03-2-3x.webp',
    title: 'SHOCK-PROOF',
    desc: '1.2M 26-Angle Drop Resistant',
  },
  {
    key: 'dust',
    type: 'dust',
    imagePc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-03-3-2x.webp',
    imageMobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-03-3-3x.webp',
    title: 'DUST-PROOF',
    desc: 'IP69K-rated dust-tight',
  },
  {
    key: 'waterjet',
    type: 'waterjet',
    imagePc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-03-4-2x.webp',
    imageMobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-03-4-3x.webp',
    title: 'WATERJET-PROOF',
    desc: '100 bar High-Pressure Wash Down',
  },
];

const safetyItems = [
  {
    key: 'overheat',
    icon: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour_octa-03-5.svg',
    title: 'Charging Overheat Protection',
    desc: 'Once Beyond 75°C, Stop Charging',
  },
  {
    key: 'voltage',
    icon: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour_octa-03-6.svg',
    title: 'Voltage Surge Protection',
    desc: 'Reduce External Battery Risks, Increase Safety',
  },
  {
    key: 'overtime',
    icon: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour_octa-03-7.svg',
    title: 'OVERTIME 2.0',
    desc: 'Prevent Accidental 10s Long-Press',
  },
  {
    key: 'tpu',
    icon: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour_octa-03-8.svg',
    title: 'TPU Protection',
    desc: 'Full Tank Cover + Charging Port',
  },
];

function ProofCard({
  type,
  imagePc,
  imageMobile,
  title,
  desc,
}) {
  return (
    <article
      className={[
        'octa-protection__proof-card',
        `octa-protection__proof-card--${type}`,
      ].join(' ')}
    >
      <picture className="octa-protection__proof-picture">
        <source
          media="(max-width: 1023px)"
          srcSet={imageMobile}
        />

        <img
          className="octa-protection__proof-image"
          src={imagePc}
          alt={title}
          loading="lazy"
        />
      </picture>

      <div className="octa-protection__proof-info">
        <h3 className="octa-protection__proof-title">
          {title}
        </h3>

        <p className="octa-protection__proof-desc">
          {desc}
        </p>
      </div>
    </article>
  );
}

function SafetyCard({
  icon,
  title,
  desc,
}) {
  return (
    <article className="octa-protection__safety-card">
      <img
        className="octa-protection__safety-icon"
        src={icon}
        alt={title}
      />

      <h3 className="octa-protection__safety-title">
        {title}
      </h3>

      <p className="octa-protection__safety-desc">
        {desc}
      </p>
    </article>
  );
}

export  function OctaProtection() {
  return (
    <div className="octa-protection">
      <div className="octa-protection__header">
        <h2 className="octa-protection__title">
          Inside-Out, 8 Ways To Stay Armoured
        </h2>

        <p className="octa-protection__subtitle">
          Battery Guard Inside, 4X Proof Outside—
          Octa Cover All
        </p>
      </div>

      <div className="octa-protection__content">
        <div className="octa-protection__proof-grid">
          {proofCards.map((item) => (
            <ProofCard
              key={item.key}
              {...item}
            />
          ))}
        </div>

        <div className="octa-protection__safety-grid">
          {safetyItems.map((item) => (
            <SafetyCard
              key={item.key}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}