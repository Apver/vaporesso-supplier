export function KvBanner() {
  return (
    <div data-xwc="kv-banner">
      <section className="banner-section">
        <div className="banner__inner">
          <picture className="banner__image-wrapper">
            <source
              media="(min-width: 2440px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-01-1.webp"
            />
            <source
              media="(min-width: 1024px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-01-1.webp"
            />
            <source
              media="(max-width: 1023px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-Mob-01-1.webp"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-01-1.webp"
              className="banner-image"
              alt=""
            />
          </picture>

          <picture className="banner_content-wrapper">
            <source
              media="(min-width: 2440px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-01-2.svg"
            />
            <source
              media="(min-width: 1024px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-01-2.svg"
            />
            <source
              media="(max-width: 1023px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-Mob-01-2.webp"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-01-2.svg"
              className=""
              alt=""
            />
          </picture>
          <picture className="banner_bg2-wrapper">
            <source
              media="(min-width: 2440px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-01-3.webp"
            />
            <source
              media="(min-width: 1024px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-01-3.webp"
            />
            <source
              media="(max-width: 1023px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-Mob-01-3.webp"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-01-3.webp"
              className=""
              alt=""
            />
          </picture>
        </div>
      </section>
    </div>
  );
}
