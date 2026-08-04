import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

const VERSION_LIST = [
  {
    id: 1,
    tab: 'NFC Version',
    title: 'Industry-First NFC Animated Panel',
    subtitle: '(Only NFC Version)',
  },
  {
    id: 2,
    tab: 'Filter Version',
    title: 'Filter Tips & Drip Tips | Easy Switch',
    subtitle: '(Only Filter Version)',
  },
];

export const VersionSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const tabBarRef = useRef(null);
  const [indicator, setIndicator] = useState({left: 0, width: 0});

  const updateIndicator = useCallback(() => {
    const tabEl = tabRefs.current[activeIndex];
    const barEl = tabBarRef.current;
    if (!tabEl || !barEl) return;
    setIndicator({
      left: tabEl.offsetLeft,
      width: tabEl.offsetWidth,
    });
  }, [activeIndex]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  return (
    <div className="product-prix-version ui-v4-flex">
      <div className="product-prix-version-tab" ref={tabBarRef}>
        {VERSION_LIST.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className={`product-prix-version-tab__title ${
              activeIndex === index ? 'active' : ''
            }`}
            onClick={() => setActiveIndex(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveIndex(index);
              }
            }}
          >
            {item.tab}
          </div>
        ))}
        <span
          className="product-prix-version-tab__indicator"
          style={{
            width: indicator.width,
            transform: `translateX(${indicator.left}px)`,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="product-prix-version-panels">
        <div
          className={`product-prix-version-content ui-v4-flex ${
            activeIndex === 0 ? 'active' : ''
          }`}
          aria-hidden={activeIndex !== 0}
        >
          <h4 className="product-prix-version-content__title">
            {VERSION_LIST[0].title}
          </h4>
          <p className="product-prix-version-content__subtitle">
            {VERSION_LIST[0].subtitle}
          </p>
          <video
            className="product-prix-version-content__media s-hide"
            src="https://cdn.shopify.com/videos/c/o/v/98f242a9503e4f19b90716e5b5db5d35.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <video
            className="product-prix-version-content__media x-hide"
            src="https://cdn.shopify.com/videos/c/o/v/2585552d3de4412bba9b05d2783b7e24.mp4"
            poster="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-04-1.webp"
            autoPlay
            muted
            loop
            playsInline
          />
          <p className="product-prix-version-content__description">
            Switch panels to unlock matching on-screen animations
          </p>
        </div>

        <div
          className={`product-prix-version-content ui-v4-flex ${
            activeIndex === 1 ? 'active' : ''
          }`}
          aria-hidden={activeIndex !== 1}
        >
          <h4 className="product-prix-version-content__title">
            {VERSION_LIST[1].title}
          </h4>
          <p className="product-prix-version-content__subtitle">
            {VERSION_LIST[1].subtitle}
          </p>
          <div className="product-prix-version-content__media">
            <picture>
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-04-2.webp"
              />
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-04-2.webp"
                alt="Filter Tips & Drip Tips | Easy Switch"
              />
            </picture>
            <p className="product-prix-version-content-filter-tip left">
              Drip Tip
            </p>
            <p className="product-prix-version-content-filter-tip right">
              Filter Tip
            </p>
          </div>
          <p className="product-prix-version-content__description">
            <span className="product-prix-version-content__description-title">
              Drip Tip:{' '}
            </span>
            Rich flavour for an elevated vaping experience.
            <br />
            <span className="product-prix-version-content__description-title">
              Filter Tip:{' '}
            </span>
            Smooth draw for a classic cigarette-like feel.
          </p>
        </div>
      </div>
    </div>
  );
};
