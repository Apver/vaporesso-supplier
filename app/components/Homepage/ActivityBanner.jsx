import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';

const paginationConfig = {
  clickable: true,
  el: '#activity-banner-page',
  renderBullet: (_, className) =>
    `<div class="${className}"><span class="banner-action"></span></div>`,
};

const navigationConfig = {
  nextEl: '#activity-banner .swiper-button-next',
  prevEl: '#activity-banner .swiper-button-prev',
};

const autoplayConfig = {
  delay: 5000,
  disableOnInteraction: false,
};

const MAX_BANNER_VIDEOS = 11;

const isDesktop = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(min-width: 1024px)').matches;

const isSafari = () =>
  typeof navigator !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

function handleSlideChange(swiperInstance) {
  if (typeof document === 'undefined') return;

  const deviceKey = isDesktop() ? 'pc' : 'mob';

  for (let i = 1; i <= MAX_BANNER_VIDEOS; i += 1) {
    const video = document.getElementById(`banner_video_${deviceKey}_${i}`);
    if (!video) continue;

    if (i === swiperInstance?.activeIndex) {
      video.load();
      if (isSafari()) {
        video.setAttribute('autoplay', 'true');
      }

      const playPromise = video.play?.();
      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause?.();
    }
  }
}

const activitySlides = [
  {
    id: 'xros-weight-challenge',
    href: 'https://www.vaporesso.com/activity/xros-weight-challenge',
    title: '',
    description: '',
    buttonLabel: '',
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-weight-challenge-KV-1_Mob.webp',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-weight-challenge-KV-1_PC.webp',
    alt: 'XROS WEIGHT CHALLENGE',
    locale: 'en',
  },
  {
    id: 'innovation-x',
    href: 'https://www.vaporesso.com/activity/innovation-x',
    title: 'INNOVATION X - VAPORESSO 10th Anniversary',
    description: 'Embark on an exciting journey to unlock grand prizes',
    buttonLabel: 'Learn More',
    mobileImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/innovation-x-10th-anniversary-mob.webp',
    desktopImage:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/innovation-x-10th-anniversary-web.webp',
    alt: "VAPORESSO's 10th anniversary",
    locale: 'en',
  },
];

function renderSlideContent(slide) {
  if (!slide.title || !slide.description || !slide.buttonLabel) return null;
  return (
    <div className="section-content text-center">
      <a href={slide.href}>
        <h2 className="f_44 mb_10 f-d-bold notranslate mob-event-heading">
          {slide.title}
        </h2>
        <p className="f_18 mb_24 text-cap mob-event-content">
          {slide.description}
        </p>
      </a>
      <a href={slide.href} className="f_16 learn-link">
        {slide.buttonLabel}
      </a>
    </div>
  );
}

function renderSlideMedia(slide) {
  if (!slide.mobileImage && !slide.desktopImage) return null;
  return (
    <div className="section-img-box">
      <a href={slide.href} className="a-jump">
        <picture>
          <source
            media="(max-width: 1023px)"
            srcSet={slide.mobileImage ?? slide.desktopImage}
          />
          <source
            media="(min-width: 1024px)"
            srcSet={slide.desktopImage ?? slide.mobileImage}
          />
          <img
            src={slide.desktopImage ?? slide.mobileImage}
            data-src={slide.desktopImage ?? slide.mobileImage}
            className="section-full-img lazyload"
            alt={slide.alt}
            loading="lazy"
          />
        </picture>
        {slide.desktopVideo && (
          <video
            className="activity-video s-hide"
            src={slide.desktopVideo}
            poster={slide.desktopPoster}
            muted
            loop
            autoPlay
            preload="none"
            playsInline
          ></video>
        )}
        {slide.mobileVideo && (
          <video
            className="activity-video m-hide"
            src={slide.mobileVideo}
            poster={slide.mobilePoster}
            muted
            loop
            autoPlay
            preload="none"
            playsInline
          ></video>
        )}
      </a>
    </div>
  );
}

export function ActivityBanner({activityDataset = []}) {
  const slides =
    Array.isArray(activityDataset) && activityDataset.length > 0
      ? activityDataset
      : activitySlides;

  return (
    <section
      id="activity-banner"
      className="events swiper-banner swiper-container"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        className="swiper-container"
        wrapperClass="swiper-wrapper"
        pagination={paginationConfig}
        navigation={navigationConfig}
        // autoplay={autoplayConfig}
        loop
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id ?? index}>
            {renderSlideContent(slide)}
            {renderSlideMedia(slide)}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
      <div id="activity-banner-page" className="swiper-pagination" />
    </section>
  );
}
