export const BatterySection = () => {
  return (
    <div className="product-prix-battery ui-v4-flex">
      <h3 className="product-prix-battery__title">Battery</h3>
      <p className="product-prix-battery__description">
        The powerful 2600mAh battery delivers long-lasting power, ensuring you
        can enjoy your device for hours on end.
      </p>
      <div className="product-prix-battery-content">
        <picture>
          <source
            srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-08-1.webp"
            media="(min-width: 1024px)"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-08-1.webp"
            alt="Battery"
          />
        </picture>
        <p className="product-prix-battery-content-mah">2600mAh</p>
        <div className="product-prix-battery-content-list">
          <div className="product-prix-battery-content-list-item">
            <p className="product-prix-battery-content-list-item-title">
              5V/2A
            </p>
            <p className="product-prix-battery-content-list-item-description">
              Fast Charging
            </p>
          </div>
          <div className="product-prix-battery-content-list-item">
            <p className="product-prix-battery-content-list-item-title">
              45 Mins
            </p>
            <p className="product-prix-battery-content-list-item-description">
              Full Charged
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
