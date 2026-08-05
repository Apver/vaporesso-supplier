export const DualMesh = () => {
  return (
    <div className="product-prix-dual ui-v4-flex">
      <div className="product-prix-dual-left">
        <img
          className="product-prix-dual-left__icon to-top"
          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-06-1.svg"
          alt=""
        />
        <h3 className="product-prix-dual-left__title to-top">
          Better Flavor, <br className="x-hide" /> Longer Lifespan
        </h3>
        <p className="product-prix-dual-left__description to-top">
          Delivers a smooth, consistent MTL experience, while upgraded CF 2.0
          cotton ensures longer-lasting performance.
        </p>
        <div className="product-prix-dual-left__image to-top">
          <picture>
            <source
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-06-2.webp"
              media="(max-width: 1023px)"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-06-2.webp"
              alt=""
            />
          </picture>
          <p className="product-prix-dual-left__image-description">
            One Pod= <span>60ml</span> Of E-liquid
          </p>
        </div>
      </div>
      <div className="product-prix-dual-right to-left">
        <img
          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-06-3.webp"
          alt=""
        />
        <div className="product-prix-dual-right-list">
          <div className="product-prix-dual-right-list-item">
            <div className="product-prix-dual-right-list-data">
              50
              <span className="product-prix-dual-right-list-data-percent">
                %
              </span>
              <img
                className="product-prix-dual-right-list-data-icon"
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-06-4.svg"
                alt=""
              />
            </div>
            <p>More Flavor</p>
          </div>
          <div className="product-prix-dual-right-list-item">
            <div className="product-prix-dual-right-list-data">
              30
              <span className="product-prix-dual-right-list-data-percent">
                %
              </span>
              <img
                className="product-prix-dual-right-list-data-icon"
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-06-4.svg"
                alt=""
              />
            </div>
            <p>Longer Lifespan</p>
          </div>
        </div>
      </div>
    </div>
  );
};
