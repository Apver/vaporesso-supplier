import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';

const paginationConfig = {
  clickable: true,
  el: '#bannerPage',
  renderBullet: (_, className) =>
    `<div class="${className}"><span class="banner-action"></span></div>`,
};

const navigationConfig = {
  nextEl: '.banner .swiper-button-next',
  prevEl: '.banner .swiper-button-prev',
};

const autoplayConfig = {
  delay: 6000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
};

const defaultVideoProps = {
  muted: true,
  loop: false,
  autoPlay: true,
  playsInline: true,
  preload: 'none',
  'x-webkit-airplay': 'allow',
  'x5-video-player-type': 'h5',
  'x5-playsinline': 'true',
  'webkit-playsinline': 'true',
};

const isDesktop = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(min-width: 1024px)').matches;

const isSafari = () =>
  typeof navigator !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const hasVideoSource = (video) => {
  if (!video) return false;
  if (video.currentSrc || video.src) return true;

  const sourceChild = video.querySelector('source');
  return Boolean(sourceChild?.src);
};

function detachVideoEndListener(video) {
  if (!video || !video._swiperVideoEndedHandler) return;

  video.removeEventListener('ended', video._swiperVideoEndedHandler);
  video._swiperVideoEndedHandler = null;
}

function attachVideoEndListener(swiperInstance, video) {
  if (!swiperInstance || !video || video._swiperVideoEndedHandler) return;

  const handler = () => {
    video._swiperVideoEndedHandler = null;
    swiperInstance.slideNext?.();
    swiperInstance.autoplay?.start?.();
  };

  video._swiperVideoEndedHandler = handler;
  video.addEventListener('ended', handler, {once: true});
}

function manageSwiperAutoplay(swiperInstance, activeSlideHasVideo) {
  if (!swiperInstance || !swiperInstance.autoplay) return;

  if (activeSlideHasVideo) {
    swiperInstance.autoplay.stop?.();
    return;
  }

  if (!swiperInstance.autoplay.running) {
    swiperInstance.autoplay.start?.();
  }
}

function handleSlideChange(swiperInstance, slidesData) {
  if (typeof document === 'undefined') return;
  if (!swiperInstance) return;

  const {slides, activeIndex} = swiperInstance;
  if (!slides || typeof activeIndex !== 'number') return;

  const slideElements = Array.from(slides);
  const deviceKey = isDesktop() ? 'pc' : 'mob';
  const selector =
    deviceKey === 'pc'
      ? 'video[id^="banner_video_pc_"]'
      : 'video[id^="banner_video_mob_"]';

  let activeSlideHasVideo = false;

  slideElements.forEach((slideElement, index) => {
    if (!slideElement) return;
    const videos = slideElement.querySelectorAll(selector);
    if (!videos.length) return;

    videos.forEach((video) => {
      if (!video) return;

      if (index === activeIndex) {
        activeSlideHasVideo = true;
        if (!hasVideoSource(video)) return;

        video.pause?.();
        video.load?.();
        try {
          video.currentTime = 0;
        } catch {
          /* noop */
        }
        if (isSafari()) {
          video.setAttribute('autoplay', 'true');
        }

        const playPromise = video.play?.();
        if (playPromise?.catch) {
          playPromise.catch(() => {});
        }

        attachVideoEndListener(swiperInstance, video);
      } else {
        video.pause?.();
        detachVideoEndListener(video);
      }
    });
  });

  manageSwiperAutoplay(swiperInstance, activeSlideHasVideo);
}

function scheduleSlideVideoUpdate(swiperInstance, slides) {
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    window.requestAnimationFrame(() =>
      handleSlideChange(swiperInstance, slides),
    );
    return;
  }

  handleSlideChange(swiperInstance, slides);
}

const heroSlidesFlat = [
  {
    id: 'armour-ultra',
    locale: 'en',
    mediaType: 'video',
    src: 'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/armour-ultra/public/Web-ARMOUR-ULTRA.mp4',
    poster:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/KV-mid.webp?v=1763723300',
    mobileSrc:
      'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/armour-ultra/public/Mob-ARMOUR-ULTRA.mp4',
    mobilePoster:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/KV-mid.webp?v=1763723300',
    color: '#fff',
    title: 'ARMOUR ULTRA',
    subTitle: 'New',
    content: 'Beyond The Norm, Ultra Redefined',
    link: 'https://www.vaporesso.com/series-product/armour-series/armour-ultra',
    button1Label: 'Learn More',
    button1Link:
      'https://www.vaporesso.com/series-product/armour-series/armour-ultra',
  },
  {
    id: 'xros-pro-2',
    locale: 'en',
    mediaType: 'video',
    src: 'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/xros-pro2/basic/home-web.mp4',
    poster:
      'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/xros-pro2/basic/home-web-poster.webp',
    mobileSrc:
      'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/xros-pro2/basic/home-mob.mp4',
    mobilePoster:
      'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/xros-pro2/basic/home-mob-poster.webp',
    color: '#fff',
    title: 'XROS PRO 2',
    subTitle: 'New',
    content: 'The lightest 2000mAh pod',
    link: 'https://www.vaporesso.com/series-product/xros-series/xros-pro2',
    button1Label: 'Learn More',
    button1Link:
      'https://www.vaporesso.com/series-product/xros-series/xros-pro2',
  },
  {
    id: 'xros-5',
    locale: 'en',
    mediaType: 'picture',
    src: 'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/xros-5-mini/public/XROS-5-home.webp',
    mobileSrc:
      'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/xros-5-mini/public/Mob-XROS-5-home.webp',
    alt: 'XROS 5 and XROS 5 MINI – advanced refillable vape kits from a leading vape brand, featuring COREX 3.0 technology and 1500mAh battery.',
    color: '#fff',
    title: 'XROS 5 & XROS 5 MINI',
    subTitle: 'Leather Version',
    content: 'Cross the limits, Cross super charging',
    link: 'https://www.vaporesso.com/vape-kits/xros5',
    button1Label: 'XROS 5',
    button1Link: 'https://www.vaporesso.com/vape-kits/xros5',
    button2Label: 'XROS 5 MINI',
    button2Link:
      'https://www.vaporesso.com/series-product/xros-series/xros5-mini',
    linksWrapperClassName: 'banner-info-link-group',
  },
  {
    id: 'armour-g',
    locale: 'en',
    mediaType: 'picture',
    src: 'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/armour-g/ARMOUR_G_banner.webp',
    mobileSrc:
      'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/armour-g/ARMOUR_G_banner_mob.webp',
    alt: 'ARMOUR G banner',
    color: '#fff',
    title: 'ARMOUR G&GS',
    subTitle: 'New',
    content: 'New Colors',
    link: 'https://www.vaporesso.com/series-product/armour-g-series/armour-g',
    button1Label: 'Learn More',
    button1Link:
      'https://www.vaporesso.com/series-product/armour-g-series/armour-g',
  },
  {
    id: 'innovation-x',
    locale: 'en',
    wrapperClassName: 'innovation-x-banner',
    mediaType: 'picture',
    src: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/innovation-x-818-home-banner-web.webp',
    mobileSrc:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/innovation-x-818-home-banner-mob.webp',
    sources: [
      {
        media: '(max-width: 1023px)',
        srcSet:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/innovation-x-818-home-banner-mob.webp',
      },
      {
        media: '(min-width: 1024px) and (max-width: 1559px)',
        srcSet:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/innovation-x-KV-mid.webp',
      },
      {
        media: '(min-width: 1560px)',
        srcSet:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/innovation-x-818-home-banner-web.webp',
      },
    ],
    alt: "From 2015 to 2025, VAPORESSO has been relentlessly chasing the zenith of performance under three core values – innovation, style and reliability, striving to build excellence into every product. Indeed, true brilliance never stops.Having endured a decade of unwavering dedication, VAPORESSO's innovation engine continues to hum with power. In the relentless pursuit of groundbreaking innovation and the redefinition of exceptional experiences, an endless journey of brilliance has been forged.",
    color: '#fff',
    link: 'https://www.vaporesso.com/activity/innovation-x',
    extraContentSrc:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/innovation-x-award_web.png',
    extraContentAlt: 'INNOVATION X - VAPORESSO 10th Anniversary Awards',
    extraContentClassName: 'innovation-x-banner-award',
    extraContentImgClassName: 'lazyload banner_award_img',
  },
  {
    id: 'eco-one-pro',
    locale: 'en',
    mediaType: 'picture',
    src: 'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/eco-one-pro/public/eco-one-pro-banner-web.webp',
    mobileSrc:
      'https://www.vaporesso.com/com/vaporesso/www/assets/img/2025/eco-one-pro/public/eco-one-pro-banner-mob.webp',
    alt: 'ECO ONE PRO is a next-gen pen-style pod designed for those who seek simplicity without compromising performance.',
    color: '#fff',
    title: 'ECO ONE PRO',
    subTitle: 'New',
    content: 'TOP FILL, TOP POWER',
    link: 'https://www.vaporesso.com/series-product/pen-style-others/eco-one-pro',
    button1Label: 'Learn More',
    button1Link:
      'https://www.vaporesso.com/series-product/pen-style-others/eco-one-pro',
  },
  {
    id: 'vibe-se',
    locale: 'en',
    mediaType: 'picture',
    src: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/banner-vibe-se-pc.webp?v=1767923206',
    mobileSrc:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/Mob-banner-VIBE-SE.webp?v=1767923205',
    alt: 'VAPORESSO VIBE SE and VIBE NANO – stylish and portable refillable vapes offering vibrant colors and smooth vaping experience.',
    color: '#fff',
    title: 'VIBE SE & VIBE NANO',
    subTitle: 'New',
    content: 'Super Vibe, Easy Life',
    link: 'https://www.vaporesso.com/vape-kits/vibe-se',
    button1Label: 'Learn More',
    button1Link: 'https://www.vaporesso.com/vape-kits/vibe-se',
  },
];

const DEFAULT_LOCALE = 'en';

/**
 * Extract language part from locale (e.g., 'en-US' -> 'en', 'zh-CN' -> 'zh')
 * @param {string} locale - Locale string like 'en-US' or 'zh-CN'
 * @returns {string} Language code (e.g., 'en', 'zh')
 */
function extractLanguageFromLocale(locale) {
  if (!locale || typeof locale !== 'string') return DEFAULT_LOCALE;

  // Extract language part before the hyphen
  const parts = locale.toLowerCase().split('-');
  return parts[0] || DEFAULT_LOCALE;
}

function normalizeLocale(locale) {
  return (locale || DEFAULT_LOCALE).toLowerCase();
}

/**
 * Filter slides by locale with fallback logic:
 * 1. Extract language part from locale (e.g., 'en-US' -> 'en')
 * 2. Group slides by id
 * 3. For each id, prefer current language, fallback to 'en', then any locale
 * @param {Array} slides - Array of slide objects
 * @param {string} locale - Locale string like 'en-US' or 'zh-CN'
 * @returns {Array} Filtered slides with locale preference
 */
function filterSlidesByLocale(slides, locale) {
  if (!Array.isArray(slides)) return [];

  // Extract language part from locale (e.g., 'en-US' -> 'en')
  const targetLanguage = extractLanguageFromLocale(locale);
  const normalizedTargetLanguage = normalizeLocale(targetLanguage);
  const normalizedDefaultLocale = normalizeLocale(DEFAULT_LOCALE);

  // Group slides by id
  const slidesById = new Map();

  slides.forEach((slide) => {
    if (!slide || !slide.id) return;

    const slideId = slide.id;
    if (!slidesById.has(slideId)) {
      slidesById.set(slideId, []);
    }
    slidesById.get(slideId).push(slide);
  });

  // For each id, select the best matching slide
  const result = [];

  slidesById.forEach((slidesForId) => {
    // Priority order:
    // 1. Exact language match (e.g., 'zh' when target is 'zh')
    // 2. Default locale ('en')
    // 3. Any slide without locale
    // 4. First available slide

    let selectedSlide = null;

    // Try to find exact language match
    selectedSlide = slidesForId.find((slide) => {
      const slideLanguage = extractLanguageFromLocale(slide.locale);
      return normalizeLocale(slideLanguage) === normalizedTargetLanguage;
    });

    // Fallback to 'en' if no exact match
    if (!selectedSlide) {
      selectedSlide = slidesForId.find((slide) => {
        const slideLanguage = extractLanguageFromLocale(slide.locale);
        return normalizeLocale(slideLanguage) === normalizedDefaultLocale;
      });
    }

    // Fallback to any slide without locale
    if (!selectedSlide) {
      selectedSlide = slidesForId.find((slide) => !slide.locale);
    }

    // Fallback to first available slide
    if (!selectedSlide && slidesForId.length > 0) {
      selectedSlide = slidesForId[0];
    }

    if (selectedSlide) {
      result.push(selectedSlide);
    }
  });

  return result;
}

function buildSlides(slides) {
  return slides
    .map((slide, index) => createSlideFromDataset(slide, index))
    .filter(Boolean);
}

function createVideoMedia(slide, index) {
  if (!slide.src && !slide.mobileSrc) return null;

  const containerId = `banner_video_box_${index + 1}`;
  const videos = [];

  if (slide.src) {
    videos.push({
      id: `banner_video_pc_${index + 1}`,
      className: 'banner-new-year-video s-hide',
      height: '100%',
      src: slide.src,
      poster: slide.poster || slide.mobilePoster,
    });
  }

  if (slide.mobileSrc) {
    videos.push({
      id: `banner_video_mob_${index + 1}`,
      className: 'x-hide',
      style: {width: '100%', height: '100%', objectFit: 'cover'},
      src: slide.mobileSrc,
      poster: slide.mobilePoster || slide.poster,
    });
  }

  if (videos.length === 0) return null;

  return {
    type: 'video',
    containerId,
    videos,
  };
}

function createPictureMedia(slide) {
  const desktopSrc = slide.src || slide.poster || slide.imgSrc;
  const hasCustomSources = Array.isArray(slide.sources) && slide.sources.length;

  if (!desktopSrc && !hasCustomSources) return null;

  const sources = hasCustomSources
    ? slide.sources
    : [
        ...(slide.mobileSrc
          ? [
              {
                media: '(max-width: 1023px)',
                srcSet: slide.mobileSrc,
              },
            ]
          : []),
        {
          media: '(min-width: 1024px)',
          srcSet: desktopSrc,
        },
      ];

  const imgSrc = desktopSrc || slide.mobileSrc;

  return {
    type: 'picture',
    sources,
    img: {
      src: imgSrc,
      alt: slide.alt ?? '',
      className: slide.imgClassName ?? 'lazyload banner_swiper_img',
    },
  };
}

function createLinks(slide, color) {
  const links = [];

  if (slide.button1Label && slide.button1Link) {
    links.push({
      href: slide.button1Link,
      className: 'f_16 learn-link learn-link',
      buttonClass: slide.buttonClass,
      style: {color},
      label: slide.button1Label,
    });
  }

  if (slide.button2Label && slide.button2Link) {
    links.push({
      href: slide.button2Link,
      className: 'f_16 learn-link learn-link-right',
      buttonClass: slide.buttonClass,
      style: {color},
      label: slide.button2Label,
    });
  }

  return links;
}

function createExtraContent(slide) {
  if (!slide.extraContentSrc) return null;

  const wrapperClassName =
    slide.extraContentClassName ?? 'innovation-x-banner-award';
  const imgClassName = slide.extraContentImgClassName;

  return (
    <div className={wrapperClassName}>
      <img
        src={slide.extraContentSrc}
        alt={slide.extraContentAlt ?? ''}
        className={imgClassName}
      />
    </div>
  );
}

function createSlideFromDataset(slide, index) {
  const media =
    slide.mediaType === 'video'
      ? createVideoMedia(slide, index)
      : createPictureMedia(slide);

  if (!media) return null;

  const link = slide.link || slide.button1Link || slide.button2Link;
  const color = slide.color || '#fff';
  const links = createLinks(slide, color);
  const enforcedWrapperClassName =
    slide.id === 'innovation-x' ? 'innovation-x-banner' : undefined;
  const wrapperClassName =
    [slide.wrapperClassName, enforcedWrapperClassName]
      .filter(Boolean)
      .join(' ') || undefined;

  const wrapperProps = {};
  if (link) {
    wrapperProps.href = link;
    wrapperProps.target = slide.linkTarget || '_blank';
    wrapperProps.rel = slide.linkRel || 'noreferrer';
  }
  if (wrapperClassName) {
    wrapperProps.className = wrapperClassName;
  }

  return {
    id: slide.id ?? `slide-${index}`,
    wrapperProps:
      Object.keys(wrapperProps).length > 0 ? wrapperProps : undefined,
    media,
    info: {
      className: 'banner-info b new',
      badge: slide.subTitle
        ? {text: slide.subTitle, className: 'xros-new-color'}
        : undefined,
      linkHref: link,
      title: slide.title,
      titleProps: {
        className: 'f_52 f-d-bold notranslate',
        style: {color},
      },
      subtitle: slide.content,
      subtitleProps: {
        className: 'f_20 text-cap',
        style: {color},
      },
      links,
      linksWrapperClassName: slide.linksWrapperClassName,
    },
    extraContent: createExtraContent(slide),
  };
}

/* eslint-disable jsx-a11y/media-has-caption -- decorative background videos */
function renderMedia(media, slideId) {
  if (!media) return null;

  if (media.type === 'video') {
    return (
      <div
        id={media.containerId}
        className={media.containerClassName ?? 'swiper_video_container'}
      >
        {media.videos.map((video) => {
          const {extraAttrs, ...videoProps} = video;
          return (
            <video
              key={video.id}
              aria-hidden="true"
              {...defaultVideoProps}
              {...videoProps}
              {...(extraAttrs || {})}
            />
          );
        })}
      </div>
    );
  }

  if (media.type === 'picture') {
    if (!media.img) return null;
    const imgProps = {...media.img};
    const {alt, ...imgRest} = imgProps;
    const safeAlt = alt ?? '';

    return (
      <picture>
        {media.sources?.map((source, index) => (
          <source
            key={`${slideId}-${source?.media || source?.srcSet || index}`}
            {...source}
          />
        ))}
        <img {...imgRest} alt={safeAlt} />
      </picture>
    );
  }

  return media.content ?? null;
}
/* eslint-enable jsx-a11y/media-has-caption */

function renderInfo(info) {
  if (!info) return null;

  const {
    className = 'banner-info',
    badge,
    title,
    titleProps = {},
    subtitle,
    subtitleProps = {},
    linkHref,
    links = [],
    linksWrapperClassName,
    children,
  } = info;

  const hasTextContent = Boolean(
    (badge && badge.text) || title || subtitle || children,
  );
  const hasLinks = Array.isArray(links) && links.length > 0;

  if (!hasTextContent && !hasLinks) {
    return null;
  }

  const linksMarkup = links.map((link) => {
    const {label, className, buttonClass, ...linkProps} = link;
    const combinedClassName =
      [className, buttonClass].filter(Boolean).join(' ') || undefined;

    return (
      <a key={label} {...linkProps} className={combinedClassName}>
        {label}
      </a>
    );
  });

  const linkBlock = linksWrapperClassName ? (
    <div className={linksWrapperClassName}>{linksMarkup}</div>
  ) : (
    linksMarkup
  );

  return (
    <div className={className}>
      {badge && badge.text ? (
        linkHref ? (
          <a href={linkHref}>
            <p className={badge.className ?? 'xros-new-color'}>{badge.text}</p>
          </a>
        ) : (
          <p className={badge.className ?? 'xros-new-color'}>{badge.text}</p>
        )
      ) : null}
      {title || subtitle ? (
        linkHref ? (
          <a href={linkHref}>
            {title ? <h2 {...titleProps}>{title}</h2> : null}
            {subtitle ? <p {...subtitleProps}>{subtitle}</p> : null}
          </a>
        ) : (
          <>
            {title ? <h2 {...titleProps}>{title}</h2> : null}
            {subtitle ? <p {...subtitleProps}>{subtitle}</p> : null}
          </>
        )
      ) : null}
      {children}
      {hasLinks ? linkBlock : null}
    </div>
  );
}

export function SlideBanner({
  slidebannerDataset,
  locale = DEFAULT_LOCALE,
  onBannerClick,
}) {
  const normalizedLocale = normalizeLocale(locale);

  const datasetSlides = buildSlides(
    filterSlidesByLocale(slidebannerDataset, normalizedLocale),
  );

  const fallbackSlides = buildSlides(
    filterSlidesByLocale(heroSlidesFlat, normalizedLocale),
  );

  const slides = datasetSlides.length > 0 ? datasetSlides : fallbackSlides;

  return (
    <section id="banner" className="banner swiper-banner swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        className="swiper-banner swiper-container"
        wrapperTag="ul"
        navigation={navigationConfig}
        pagination={paginationConfig}
        autoplay={autoplayConfig}
        loop
        onSlideChange={(swiper) => scheduleSlideVideoUpdate(swiper, slides)}
        onSwiper={(swiper) => scheduleSlideVideoUpdate(swiper, slides)}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} tag="li" className="swiper-slide">
            <a
              {...slide.wrapperProps}
              onClick={() => {
                if (onBannerClick) {
                  onBannerClick({
                    id: slide.id,
                    title:
                      slide.info?.title || slide.media?.alt || 'Banner Slide',
                    ...slide,
                  });
                }
              }}
            >
              {renderMedia(slide.media, slide.id)}
            </a>
            {renderInfo(slide.info)}
            {slide.extraContent}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
      <div id="bannerPage" className="swiper-pagination" />
    </section>
  );
}
