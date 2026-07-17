import {useCallback} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';

const VAPORESSO_DOMAIN = 'https://www.vaporesso.com';

const vaporessoAsset = (path) => `${VAPORESSO_DOMAIN}${path}`;

const defaultMediaSlides = [
  {
    id: 'xros-5',
    title: 'XROS 5 & XROS 5 MINI',
    description: 'Cross the limits, Cross super charging',
    link1Href: 'https://www.vaporesso.com/vape-kits/xros5',
    link1Label: 'XROS 5',
    link2Href:
      'https://www.vaporesso.com/series-product/xros-series/xros5-mini',
    link2Label: 'XROS 5 MINI',
    mediaHref: 'https://www.vaporesso.com/vape-kits/xros5',
    mediaSrc:
      'https://cdn.shopify.com/videos/c/o/v/28df8aa25f6147518ed6b5213ef3fa89.mp4',
    mediaPoster:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/video_11_XROS_5_XROS_5_MINI_PC.jpg?v=1783503128',
    mediaSrcMobile:
      'https://cdn.shopify.com/videos/c/o/v/18adb3655bda496b90b38d8eadec4040.mp4',
    mediaPosterMobile:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/video_11_XROS_5_XROS_5_MINI_mob.webp?v=1783503127',
    anchorId: 'video4',
    anchorClass: 'v-box v5',
    videoId: 'media_video_4',
  },
  {
    id: 'luxe-xr-max-2',
    title: 'LUXE XR MAX 2',
    description: 'The MAX Got Mightier',
    link1Href: 'https://www.vaporesso.com/vape-kits/luxe-xr-max-2',
    link1Label: 'Learn More',
    mediaHref: 'https://www.vaporesso.com/vape-kits/luxe-xr-max-2',
    mediaSrc:
      'https://cdn.shopify.com/videos/c/o/v/971bd6eb70784ef2854736c607a781d0.mp4',
    mediaPoster:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe-xr-max-2-video-poster-web.jpg?v=1783503361',
    mediaSrcMobile:
      'https://cdn.shopify.com/videos/c/o/v/5b274de75d0342cd9a050a6345e587bd.mp4',
    mediaPosterMobile:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe-xr-max-2-video-poster-mob.jpg?v=1783503361',
    anchorId: 'video1',
    anchorClass: 'v-box v6',
    videoId: 'media_video_1',
  },
  {
    id: 'pure-power',
    title: 'PURE POWER FOR ALL',
    description: 'VAPORESSO CARE',
    link1Href:
      'https://www.vaporesso.com/activity/pure_power_for_all#pure-power-for-all',
    link1Label: 'Learn More',
    mediaHref:
      'https://www.vaporesso.com/activity/pure_power_for_all#pure-power-for-all',
    mediaSrc:
      'https://cdn.shopify.com/videos/c/o/v/3221af472ef24de1ac00fad5230517cf.mp4',
    mediaPoster:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/home-media-0408_3840x2160_bcc6eb14-5d2f-426d-a79f-0bfe9c763059.jpg?v=1783503803',
    mediaSrcMobile:
      'https://cdn.shopify.com/videos/c/o/v/07bc10a161394461b34633096eea2ea9.mp4',
    mediaPosterMobile:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/home-media-0408_2200x1800_8aa782ad-a1c9-4b44-a7e9-55726d6f266e.jpg?v=1783503803',
    anchorId: 'video9',
    anchorClass: 'v-box v6',
    videoId: 'media_video_9',
  },
  {
    id: 'vibe-se',
    title: 'Vibe Se & Vibe Nano',
    description: 'Super Vibe, Easy Life',
    link1Href: 'https://www.vaporesso.com/vape-kits/vibe-se',
    link1Label: 'Learn More',
    mediaHref: 'https://www.vaporesso.com/vape-kits/vibe-se',
    mediaSrc:
      'https://cdn.shopify.com/videos/c/o/v/acb3d304bd824c14b7d037c7416313f7.mp4',
    mediaPoster:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/VIBE_SE-VIBE_NANO_pc_d16d10a9-55a7-47cb-a59c-2a493b44c1f9.webp?v=1783503863',
    mediaSrcMobile:
      'https://cdn.shopify.com/videos/c/o/v/451f7ecf45ba4d17bfc7b051034d0c82.mp4',
    mediaPosterMobile:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/VIBE_SE_VIBE_NANO_mob_30b621a4-cf3e-4acd-903b-d01d1e93bdc8.webp?v=1783503863',
    anchorId: 'video8',
    anchorClass: 'v-box v6',
    videoId: 'media_video_8',
  },
  {
    id: 'vibe-pro',
    title: 'Vibe & Vibe Nano Pro',
    description: 'Super Vibe, Easy Life',
    link1Href: 'https://www.vaporesso.com/vape-kits/vibe',
    link1Label: 'Learn More',
    mediaHref: 'https://www.vaporesso.com/vape-kits/vibe',
    mediaSrc:
      'https://cdn.shopify.com/videos/c/o/v/82e6a8bd99284f66a25c5117babd7aa0.mp4',
    mediaPoster:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/swiper-vibe-pc.png?v=1783504136',
    mediaSrcMobile:
      'https://cdn.shopify.com/videos/c/o/v/82e6a8bd99284f66a25c5117babd7aa0.mp4',
    mediaPosterMobile:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/swiper-vibe-mob.png?v=1783504118',
    anchorId: 'video6',
    anchorClass: 'v-box v6',
    videoId: 'media_video_6',
  },
  {
    id: 'xros-4-nano',
    title: 'XROS 4 NANO',
    description: 'CROSS The Limits',
    link1Href:
      'https://www.vaporesso.com/series-product/xros-series/xros4-nano',
    link1Label: 'Learn More',
    mediaHref: 'https://www.vaporesso.com/vape-kits/xros4-nano',
    mediaSrc:
      'https://cdn.shopify.com/videos/c/o/v/e89758c8c7e54aae9e0c63ed76e0cfeb.mp4',
    mediaPoster:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-4-nano-band-poster-pc_06abbbeb-eac8-4457-89d3-becdafc0dddd.webp?v=1783504150',
    mediaSrcMobile:
      'https://cdn.shopify.com/videos/c/o/v/5c84aa4d542c4b2880448ecd4c0514b9.mp4',
    mediaPosterMobile:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-4-nano-band-poster-mob.webp?v=1783504150',
    anchorId: 'video7',
    anchorClass: 'v-box v6',
    videoId: 'media_video_7',
  },
  {
    id: 'armour-g',
    title: 'Armour G | GS',
    description: 'Go With Power, Glow With Innovation',
    link1Href: 'https://www.vaporesso.com/vape-kits/armour-g',
    link1Label: 'Learn More',
    mediaHref: 'https://www.vaporesso.com/vape-kits/armour-g',
    mediaSrc:
      'https://cdn.shopify.com/videos/c/o/v/0ddeaea1e1fe43a0bf2443f36bfe5fc7.mp4',
    mediaPoster:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/4KFinal_Amour_PC_0acd070b-500e-4a69-b637-d3904d25a359.jpg?v=1783504405',
    mediaSrcMobile:
      'https://cdn.shopify.com/videos/c/o/v/6a7044c10e964c7996f960d6492ba2a5.mp4',
    mediaPosterMobile:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/4KFinal_Amour_MOB.jpg?v=1783504403',
    anchorId: 'video3',
    anchorClass: 'v-box v2',
    videoId: 'media_video_3',
    mediaTarget: '_blank',
  },
  {
    id: 'limitless',
    title: 'Limitless',
    description: 'Move Beyond Ordinary',
    link1Href: 'https://www.vaporesso.com/about-us',
    link1Label: 'Learn More',
    mediaHref: 'https://www.vaporesso.com/about-us',
    mediaSrc:
      'https://cdn.shopify.com/videos/c/o/v/1f30a44909c949359061a141a50b6c5f.mp4',
    mediaPoster:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-brand_poster_7f3df38a-5945-464b-ad6c-8a4a5c4bac50.png?v=1783504488',
    mediaSrcMobile:
      'https://cdn.shopify.com/videos/c/o/v/8cca012c926349a0b74f54fa696be07c.mp4',
    mediaPosterMobile:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/brand_poster_mob.png?v=1783504489',
    anchorId: 'video5',
    anchorClass: 'v-box v1',
    videoId: 'media_video_5',
  },
];

const hasVideoSource = (video) => {
  if (!video) return false;
  const inlineSrc = video.currentSrc || video.src;
  if (inlineSrc) return true;

  const sourceChild = video.querySelector('source');
  return Boolean(sourceChild?.src);
};

function getActiveSlideVideo(slideEl) {
  if (!slideEl || typeof window === 'undefined') return null;

  const isMobile = window.matchMedia('(max-width: 1023px)').matches;
  const mobileVideo = slideEl.querySelector('.media-video--mobile');
  const desktopVideo = slideEl.querySelector('.media-video--desktop');

  if (isMobile && mobileVideo) return mobileVideo;
  return desktopVideo;
}


const paginationConfig = {
  clickable: true,
  el: '.media .swiper-pagination',
  renderBullet: (_, className) =>
    `<div class="${className}"><span class="banner-action"></span></div>`,
};

const navigationConfig = {
  nextEl: '.vSwiper .swiper-button-next',
  prevEl: '.vSwiper .swiper-button-prev',
};

const autoplayConfig = {
  delay: 10000,
  disableOnInteraction: false,
};

export function MediaSection({mediaDataset = [], onMediaInteraction}) {
  const slides =
    Array.isArray(mediaDataset) && mediaDataset.length > 0
      ? mediaDataset
      : defaultMediaSlides;

  const setVendorVideoAttributes = useCallback((video) => {
    if (!video) return;
    video.setAttribute('x-webkit-airplay', 'allow');
    video.setAttribute('x5-video-player-type', 'h5');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
  }, []);

  const handleSlideChange = useCallback(
    (swiperInstance) => {
      if (!swiperInstance) return;

      const videos = swiperInstance.el?.querySelectorAll('video');
      videos?.forEach((video) => {
        video.pause();
      });

      const activeSlide = swiperInstance.slides?.[swiperInstance.activeIndex];
      const activeVideo = getActiveSlideVideo(activeSlide);
      if (!hasVideoSource(activeVideo)) {
        return;
      }

      const playPromise = activeVideo.play();
      playPromise?.catch((error) => {
        console.warn('Video autoplay failed: ', error);
      });
    },
    [],
  );

  const handleResize = useCallback(
    (swiperInstance) => {
      if (!swiperInstance) return;

      setTimeout(() => {
        swiperInstance.update();
        handleSlideChange(swiperInstance);
      }, 500);
    },
    [handleSlideChange],
  );

  return (
    <section className="media">
      <div className="swiper vSwiper">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          className="swiper-container"
          wrapperClass="swiper-wrapper"
          slidesPerView="auto"
          centeredSlides
          loop
          spaceBetween={0}
          pagination={paginationConfig}
          navigation={navigationConfig}
          autoplay={autoplayConfig}
          updateOnWindowResize
          observer
          observeParents
          observeSlideChildren
          resizeObserver
          onSlideChange={handleSlideChange}
          onResize={handleResize}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="info">
                <h3 className="f_32 f-d-bold mb_7 notranslate">
                  {slide.title}
                </h3>
                <p className="f_16 mb_16 text-cap">{slide.description}</p>
                {slide.link1Href && slide.link1Label && (
                  <a
                    href={slide.link1Href}
                    className="f_16 learn-link"
                    style={slide.link2Href ? {} : undefined}
                    onClick={() => {
                      if (onMediaInteraction) {
                        onMediaInteraction({
                          elementInfo: {
                            type: 'link',
                            text: slide.link1Label,
                            url: slide.link1Href,
                            id: slide.id,
                            className: 'media-link-1',
                          },
                        });
                      }
                    }}
                  >
                    {slide.link1Label}
                  </a>
                )}
                {slide.link2Href && slide.link2Label && (
                  <a
                    href={slide.link2Href}
                    className="f_16 learn-link"
                    style={{marginLeft: '20px'}}
                    onClick={() => {
                      if (onMediaInteraction) {
                        onMediaInteraction({
                          elementInfo: {
                            type: 'link',
                            text: slide.link2Label,
                            url: slide.link2Href,
                            id: slide.id,
                            className: 'media-link-2',
                          },
                        });
                      }
                    }}
                  >
                    {slide.link2Label}
                  </a>
                )}
              </div>
              <a
                id={slide.anchorId}
                className={slide.anchorClass}
                href={slide.mediaHref}
                target={slide.mediaTarget}
                rel={slide.mediaTarget === '_blank' ? 'noreferrer' : undefined}
                onClick={() => {
                  if (onMediaInteraction) {
                    onMediaInteraction({
                      elementInfo: {
                        type: 'video',
                        text: slide.title,
                        url: slide.mediaHref,
                        id: slide.anchorId,
                        className: slide.anchorClass,
                      },
                    });
                  }
                }}
              >
                <video
                  id={slide.videoId}
                  className="media-video media-video--desktop"
                  src={slide.mediaSrc}
                  poster={slide.mediaPoster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  ref={setVendorVideoAttributes}
                />
                {(slide.mediaSrcMobile || slide.mediaPosterMobile) && (
                  <video
                    className="media-video media-video--mobile"
                    src={slide.mediaSrcMobile || slide.mediaSrc}
                    poster={slide.mediaPosterMobile || slide.mediaPoster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    ref={setVendorVideoAttributes}
                  />
                )}
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="media-btn">
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </div>
        <div className="swiper-pagination media-page x-hide" />
      </div>
    </section>
  );
}
