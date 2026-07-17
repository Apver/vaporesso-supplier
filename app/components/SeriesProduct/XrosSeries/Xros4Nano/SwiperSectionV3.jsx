import {useMemo, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';

/**
 * Swiper 12 loop + slidesPerView:'auto' + centeredSlides 时，最少幻灯片数约为：
 *   slidesPerViewDynamic() + Math.ceil(slidesPerViewDynamic() / 2)
 * 980px 宽 slide 在常见视口下 slidesPerViewDynamic ≈ 2，最少需要 3 张；
 * 视口更宽时可能算到 3，最少需要 5 张。恰好 3 张处于临界值，loop 无法补全右侧克隆。
 * 6 张及以上可稳定满足 loop 要求（Xros4Nano 等 >3 张的产品无此问题）。
 */
const LOOP_SAFE_MIN = 6;

function buildRenderableSlides(dataList) {
  const originalCount = dataList?.length ?? 0;
  if (originalCount === 0) {
    return {slides: [], originalCount: 0, useCustomPagination: false};
  }

  if (originalCount >= LOOP_SAFE_MIN) {
    return {
      slides: dataList.map((item, index) => ({
        item,
        key: item.id || `slide-${index}`,
      })),
      originalCount,
      useCustomPagination: false,
    };
  }

  const slides = [];
  let index = 0;
  while (slides.length < LOOP_SAFE_MIN) {
    const item = dataList[index % originalCount];
    slides.push({
      item,
      key: `${item.id || index % originalCount}-loop-${slides.length}`,
    });
    index += 1;
  }

  return {slides, originalCount, useCustomPagination: true};
}

export function SwiperSectionV3({
  title,
  description,
  dataList,
  autoPlay,
  delay,
  className,
}) {
  const {slides, originalCount, useCustomPagination} = useMemo(
    () => buildRenderableSlides(dataList),
    [dataList],
  );
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const autoplayConfig = autoPlay
    ? {delay: delay || 5000, disableOnInteraction: false}
    : false;

  const swiperModules = useCustomPagination
    ? [Navigation, Autoplay]
    : [Navigation, Pagination, Autoplay];

  return (
    <section className={`ui_v3-swiper_section ${className || ''}`}>
      <h3 className="ui_v3-swiper_section-title">{title}</h3>
      <p className="ui_v3-swiper_section-description">{description}</p>
      <div className="ui_v3-swiper_section-content">
        {originalCount > 0 ? (
          <>
            <Swiper
              className="ui_v3-swiper_section-content-swiper"
              modules={swiperModules}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex % originalCount);
              }}
              slidesPerView="auto"
              centeredSlides
              loop={originalCount > 1}
              grabCursor
              autoplay={autoplayConfig}
              pagination={useCustomPagination ? undefined : {clickable: true}}
              navigation
            >
              {slides.map(({item, key}) => {
                const fallback = item.pcUrl || item.mobUrl || item.imgUrl;
                return (
                  <SwiperSlide key={key}>
                    <picture>
                      {item.mobUrl ? (
                        <source
                          media="(max-width: 1023px)"
                          srcSet={item.mobUrl}
                        />
                      ) : null}
                      {item.pcUrl ? (
                        <source
                          media="(min-width: 1024px)"
                          srcSet={item.pcUrl}
                        />
                      ) : null}
                      <img src={fallback} alt={item.imgAlt || ''} />
                    </picture>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {useCustomPagination ? (
              <div className="ui_v3-swiper_section-content-custom-pagination swiper-pagination">
                {dataList.map((item, index) => (
                  <span
                    key={item.id || index}
                    role="button"
                    tabIndex={0}
                    className={`swiper-pagination-bullet${
                      activeIndex === index
                        ? ' swiper-pagination-bullet-active'
                        : ''
                    }`}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        swiperRef.current?.slideToLoop(index);
                      }
                    }}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}
