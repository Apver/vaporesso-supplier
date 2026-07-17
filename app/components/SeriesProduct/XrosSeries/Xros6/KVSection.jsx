import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';

export function Xros6KVSection() {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const textWrapperRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const image = imageRef.current;
    const textWrapper = textWrapperRef.current;
    if (!root || !image || !textWrapper) return;

    const ctx = gsap.context(() => {
      gsap.set(image, {clipPath: 'inset(0 0 0 100%)'});
      gsap.set(textWrapper, {clipPath: 'inset(100% 0 0 0)'});

      gsap
        .timeline()
        .to(image, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power2.out',
        })
        .to(textWrapper, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'power2.out',
        });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="banner-section" ref={rootRef}>
      <div className="banner__inner">
        <picture className="banner__image-wrapper">
          <source
            media="(min-width: 1024px)"
            srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-01-1.webp"
          />
          <source
            media="(max-width: 1023px)"
            srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-01-1.webp"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-01-1.webp"
            className="banner-image"
            alt="XROS 6"
            ref={imageRef}
          />
        </picture>
        <div className="banner_content-inner" ref={textWrapperRef}>
          <div className="">
            <div className="banner_content">
              <h1 className="banner-h1">XROS 6</h1>
              <div className="banner-txt">Instantly Yours, Constantly XROS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
