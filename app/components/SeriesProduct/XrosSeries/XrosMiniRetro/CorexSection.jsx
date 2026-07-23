export function CorexSection({title, description}) {
  return (
    <div className="xros-mini-retro-corex ui-v4-flex">
      <img
        src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_pro_2-pc-08-1.svg?v=1779352729"
        alt=""
        className="xros-mini-retro-corex__logo"
      />
      <picture>
        <source
          media="(max-width: 1023px)"
          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_04_2.webp"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-4_1.webp"
          alt=""
          className="xros-mini-retro-corex__image"
        />
      </picture>
      <h3 className="ui-v4-title x-hide">{title}</h3>
      <p className="ui-v4-description">{description}</p>
      <p className="ui-v4-tips">
        * The data is based on testing results from VAPORESSO LAB
      </p>
    </div>
  );
}
