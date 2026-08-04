export const PodSection = () => {
  const PodList = [
    {
      id: '8',
      title: '0.8Ω',
      impact: '30W, 0.4Ω',
      pwr: '15W, 0.8Ω',
      img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-10-1.webp',
    },
    {
      id: '6',
      title: '0.6Ω',
      impact: '40W, 0.3Ω',
      pwr: '25W, 0.6Ω',
      img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-10-2.webp',
    },
  ];
  return (
    <div className="product-prix-pod ui-v4-flex">
      <h3 className="product-prix-pod__title">One Pod, Two Experiences</h3>
      <p className="product-prix-pod__description">
        EASY setup | 2 exclusive experiences unlocked
      </p>
      <div className="product-prix-pod-list">
        {PodList.map((item) => (
          <div className="product-prix-pod-list-item" key={item.id}>
            <img src={item.img} alt={item.title} />
            <p className="product-prix-pod-list-item__title">{item.title}</p>
            <div className="product-prix-pod-list-item-content">
              <div className="product-prix-pod-list-item-content-mode">
                <p className="product-prix-pod-list-item-content-mode__title">
                  IMPACT MODE:
                </p>
                <p className="product-prix-pod-list-item-content-mode__value">
                  {item.impact}
                </p>
              </div>
              <div className="product-prix-pod-list-item-content-divider"></div>
              <div className="product-prix-pod-list-item-content-mode">
                <p className="product-prix-pod-list-item-content-mode__title">
                  POWER SETTING:
                </p>
                <p className="product-prix-pod-list-item-content-mode__value">
                  {item.pwr}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
