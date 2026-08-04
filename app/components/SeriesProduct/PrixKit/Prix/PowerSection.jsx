export const PowerSection = () => {
  const PowerList = [
    {
      id: 1,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-07-1.webp',
      title: '2600mAh',
      description: 'battery',
    },
    {
      id: 2,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-07-2.webp',
      title: '5.5ml',
      description: 'Top-filling Capacity',
    },
    {
      id: 3,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-07-3.webp',
      title: '0.87"HD',
      description: 'TFT Screen',
    },
    {
      id: 4,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-07-4.webp',
      title: '40W',
      description: 'Maximum Output',
    },
  ];
  return (
    <div className="product-prix-power">
      <h3 className="product-prix-power__title">
        Big Power. <br /> Big Capacity
      </h3>
      <div className="product-prix-power-list">
        {PowerList.map((item) => (
          <div key={item.id} className="product-prix-power-list-item">
            <img src={item.imageUrl} alt={item.description} />
            <div className="product-prix-power-list-item-data">
              <h4 className="product-prix-power-list-item-data-title">
                {item.title}
              </h4>
              <p className="product-prix-power-list-item-data-description">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
