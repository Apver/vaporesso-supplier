export function CampaignHero() {
  return (
    <div className="campaign-hero-module">
      <picture className="hero-graphic-section to-top">
        <source
          media="(min-width: 2440px)"
          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-08-1.webp"
        />
        <source
          media="(min-width: 1024px)"
          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-08-1.webp"
        />
        <source
          media="(max-width: 1023px)"
          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-Mob-08-1.webp"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-Mob-08-1.webp"
          className=""
          alt=""
        />
      </picture>
    </div>
  );
}
