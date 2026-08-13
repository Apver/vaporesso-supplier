import { useEffect, useRef } from 'react';

export const OctaDetailShowcase = ({ data }) => {
  const videoRef = useRef(null);

  const {
    title,
    items = {},
  } = data;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn('Video autoplay failed:', error);
      }
    };

    playVideo();
  }, []);

  const renderImage = (item) => (
    <picture className="octa-detail__picture">
      {item?.image?.mobile && (
        <source
          media="(max-width: 1023px)"
          srcSet={item.image.mobile}
        />
      )}

      <img
        className="octa-detail__image"
        src={item?.image?.pc}
        alt={item?.alt || ''}
        loading="lazy"
      />
    </picture>
  );

  return (
    <section className="octa-detail">
      <div className="octa-detail__container">
        <h2 className="octa-detail__title to-top">
          {title}
        </h2>

        <div className="octa-detail__grid to-top">
          <div className="octa-detail__item octa-detail__item--tank">
            {renderImage(items.tank)}

            <div className="octa-detail__content">
              <h3 className="octa-detail__item-title">
                {items.tank?.title}
              </h3>

              {items.tank?.description && (
                <p className="octa-detail__desc">
                  {items.tank.description}
                </p>
              )}
            </div>
          </div>

          {/* 视频 */}
          <div className="octa-detail__item octa-detail__item--lock">
            <video
              ref={videoRef}
              className="octa-detail__video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              {items.lock?.video?.mobile && (
                <source
                  media="(max-width: 1023px)"
                  src={items.lock.video.mobile}
                  type="video/mp4"
                />
              )}

              {items.lock?.video?.pc && (
                <source
                  media="(min-width: 1024px)"
                  src={items.lock.video.pc}
                  type="video/mp4"
                />
              )}
            </video>

            <div className="octa-detail__content">
              <h3 className="octa-detail__item-title">
                {items.lock?.title}
              </h3>
            </div>
          </div>

          <div className="octa-detail__item octa-detail__item--cage">
            {renderImage(items.cage)}

            <div className="octa-detail__content">
              <h3 className="octa-detail__item-title">
                {items.cage?.title}
              </h3>

              {items.cage?.description && (
                <p className="octa-detail__desc">
                  {items.cage.description}
                </p>
              )}
            </div>
          </div>

          <div className="octa-detail__item octa-detail__item--usb">
            {renderImage(items.usb)}

            <div className="octa-detail__content">
              <h3 className="octa-detail__item-title">
                {items.usb?.title}
              </h3>

              {items.usb?.description && (
                <p className="octa-detail__desc">
                  {items.usb.description}
                </p>
              )}
            </div>
          </div>

          <div className="octa-detail__item octa-detail__item--collision">
            {renderImage(items.collision)}

            <div className="octa-detail__content">
              <h3 className="octa-detail__item-title">
                {items.collision?.title}
              </h3>

              {items.collision?.description && (
                <p className="octa-detail__desc">
                  {items.collision.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};