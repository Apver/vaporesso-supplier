import {useState} from 'react';
export const ReplaceableSection = () => {
  const BaseUrl = 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/';
  const PableList = [
    {
      id: 1,
      image: `${BaseUrl}prix-05-1.webp?v=1785744917`,
    },
    {
      id: 2,
      image: `${BaseUrl}prix-05-2.webp`,
    },
    {
      id: 3,
      image: `${BaseUrl}prix-05-3.webp`,
    },
    {
      id: 4,
      image: `${BaseUrl}prix-05-4.webp`,
    },
    {
      id: 5,
      image: `${BaseUrl}prix-05-5.webp`,
    },
    {
      id: 6,
      image: `${BaseUrl}prix-05-6.webp`,
    },
    {
      id: 7,
      image: `${BaseUrl}prix-05-7.webp`,
    },
  ];
  const KitList = [
    {
      id: 1,
      image: `${BaseUrl}prix-05-8.webp`,
      desc: 'WHITE',
    },
    {
      id: 2,
      image: `${BaseUrl}prix-05-9.webp`,
      desc: 'CHROME',
    },
    {
      id: 3,
      image: `${BaseUrl}prix-05-10.webp`,
      desc: 'BLACK',
    },
  ];
  const CombinedList = {
    '1-1': `${BaseUrl}prix-05-23.webp`,
    '1-2': `${BaseUrl}prix-05-20.webp`,
    '1-3': `${BaseUrl}prix-05-21.webp`,
    '1-4': `${BaseUrl}prix-05-22.webp`,
    '1-5': `${BaseUrl}prix-05-24.webp`,
    '1-6': `${BaseUrl}prix-05-26.webp`,
    '1-7': `${BaseUrl}prix-05-25.webp`,
    '2-1': `${BaseUrl}prix-05-30.webp`,
    '2-2': `${BaseUrl}prix-05-27.webp`,
    '2-3': `${BaseUrl}prix-05-28.webp`,
    '2-4': `${BaseUrl}prix-05-29.webp`,
    '2-5': `${BaseUrl}prix-05-31.webp`,
    '2-6': `${BaseUrl}prix-05-33.webp`,
    '2-7': `${BaseUrl}prix-05-32.webp`,
    '3-1': `${BaseUrl}prix-05-15.webp`,
    '3-2': `${BaseUrl}prix-05-12.webp`,
    '3-3': `${BaseUrl}prix-05-13.webp`,
    '3-4': `${BaseUrl}prix-05-14.webp`,
    '3-5': `${BaseUrl}prix-05-16.webp`,
    '3-6': `${BaseUrl}prix-05-18.webp`,
    '3-7': `${BaseUrl}prix-05-17.webp`,
  };
  const [activePanelId, setActivePanelId] = useState(1);
  const [activeKitId, setActiveKitId] = useState(1);
  return (
    <div className="product-prix-replaceable ui-v4-flex">
      <h3 className="product-prix-replaceable__title to-top">
        Replaceable Magnetic Panel, <br />
        Show Your Style
      </h3>
      <p className="product-prix-replaceable__description to-top">
        Choose a device and panel to see how they look together.
      </p>
      <div className="product-prix-replaceable-content to-top">
        <div className="product-prix-replaceable-content-combined">
          <img
            className="product-prix-replaceable-content-combined__product"
            src={CombinedList[`${activeKitId}-${activePanelId}`]}
            alt="Combined"
          />
          <picture>
            <source
              srcSet={`${BaseUrl}prix-Mob-05-11.svg`}
              media="(max-width: 1023px)"
            />
            <img
              className="product-prix-replaceable-content-combined__bg"
              src={`${BaseUrl}prix-05-11.svg`}
              alt="Combined"
            />
          </picture>
        </div>
        <div className="product-prix-replaceable-content-operation">
          <h4 className="product-prix-replaceable-content-operation__title">
            PANEL COLOR:
          </h4>
          <div className="product-prix-replaceable-content-operation__list">
            {PableList.map((item) => (
              <div
                key={item.id}
                className={`product-prix-replaceable-content-operation__item product-prix-replaceable-content-operation__panel-item ${activePanelId === item.id ? 'active' : ''}`}
                onClick={() => setActivePanelId(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActivePanelId(item.id);
                  }
                }}
              >
                <img src={item.image} alt={item.id} />
              </div>
            ))}
          </div>
          <h4 className="product-prix-replaceable-content-operation__title kit-title">
            KIT COLOR:
          </h4>
          <div className="product-prix-replaceable-content-operation__list">
            {KitList.map((item) => (
              <div
                key={item.id}
                className={`product-prix-replaceable-content-operation__item product-prix-replaceable-content-operation__kit-item ${activeKitId === item.id ? 'active' : ''}`}
                onClick={() => setActiveKitId(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveKitId(item.id);
                  }
                }}
              >
                <img src={item.image} alt={item.id} />
                <p className="product-prix-replaceable-content-operation__kit-item-desc">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
