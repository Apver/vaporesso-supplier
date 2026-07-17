import {useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from 'swiper/modules';

const technologyItems = [
  {
    id: 'corex-3',
    href: 'https://www.vaporesso.com/tech/corex-3.0',
    mobileImage:
      'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/corex3/home/corex-3.0-mod.webp?v=1.1',
    desktopImage:
      'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/corex3/home/corex-3.0-web.webp',
    alt: 'VAPORESSO COREX heating technology – delivering consistent flavor and vapor production in refillable vapes.',
    title: 'COREX 3.0 Heating TECH',
    description: 'Delicate Flavor, Smooth Savor',
  },
  {
    id: 'sss-leak',
    href: 'https://www.vaporesso.com',
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-Mob-4-2.jpg',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/4-2.jpg?v=1.2',
    alt: 'VAPORESSO SSS leak-resistant technology – ensuring clean and efficient vaping experience with refillable vape kits.',
    title: 'SSS Leak Resistant Tech',
    description: 'No Leaking, No Messing',
  },
  {
    id: 'axon-chip',
    href: 'https://www.vaporesso.com',
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-Mob-4-3.jpg',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-/4-3.jpg?v=1.2',
    alt: 'VAPORESSO AXON Chip – intelligent chipset providing optimized performance and user-friendly interface in vape kits.',
    title: 'AXON CHIP',
    description: 'Power Boosting Flavor Consistency',
  },
];

const paginationConfig = {
  clickable: true,
  el: '.tech-page',
  renderBullet(index, className) {
    return `<div class="${className}"><span class="banner-action"></span></div>`;
  },
};

const sliderBreakpoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
  },
  1024: {
    slidesPerView: 2.5,
    spaceBetween: 20,
  },
  1260: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
};

const MOBILE_MEDIA_QUERY = '(max-width: 1023px)';
const autoplayConfig = {
  delay: 5000,
  disableOnInteraction: false,
};

export function TechnologySection({technologyDataset = [], onButtonClick}) {
  const items =
    Array.isArray(technologyDataset) && technologyDataset.length > 0
      ? technologyDataset
      : technologyItems;
  const swiperRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const updateMatch = (event) => setIsMobileView(event.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMatch);
      return () => mediaQuery.removeEventListener('change', updateMatch);
    }

    mediaQuery.addListener(updateMatch);
    return () => mediaQuery.removeListener(updateMatch);
  }, []);

  useEffect(() => {
    const swiperInstance = swiperRef.current;
    if (!swiperInstance) return;

    if (isMobileView) {
      swiperInstance.params.autoplay = autoplayConfig;
      swiperInstance.autoplay?.start();
    } else {
      swiperInstance.autoplay?.stop();
      swiperInstance.params.autoplay = false;
    }
  }, [isMobileView]);

  return (
    <section className="tech">
      <h2 className="f_40 f-d-bold text-center s-hide">Technology</h2>
      <div className="tech-swiper">
        <h4 className="f-d-bold text-center x-hide">Technology</h4>
        <Swiper
          key={isMobileView ? 'tech-mobile' : 'tech-desktop'}
          modules={[Pagination, Autoplay]}
          className="swiper-container tech-slides"
          wrapperClass="swiper-wrapper tech-list"
          pagination={paginationConfig}
          breakpoints={sliderBreakpoints}
          loop={isMobileView}
          autoplay={isMobileView ? autoplayConfig : false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id ?? index}>
              <a
                className="item"
                href={item.href}
                onClick={(event) => {
                  if (onButtonClick) {
                    onButtonClick({
                      elementInfo: {
                        type: 'link',
                        text: item.title,
                        url: item.href,
                        id: item.id,
                        className: 'tech-item-link',
                      },
                    });
                  }
                }}
              >
                <div className="m">
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
                      className="lazyload"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <div className="info">
                  <h3 className="f_24 f-d-bold mb_7">{item.title}</h3>
                  <p className="f_16">{item.description}</p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination tech-page x-hide" />
      </div>
    </section>
  );
}
