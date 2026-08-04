export const ModeSection = () => {
  const ModeList = [
    {
      id: 'easy',
      title: 'EASY',
      desc_title: 'Portrait, ',
      description:
        'Switch between IMPACT and PWR, with a 4W output difference.',
      img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-09-1.webp',
    },
    {
      id: 'pro',
      title: 'PRO',
      desc_title: 'Landscape,',
      description: 'Precisely adjust wattage in 0.5W steps.',
      img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-09-2.webp',
    },
  ];
  const ChoiceList = [
    {
      id: 'auto',
      title: 'AUTO',
      description: 'Auto-draw mode',
      img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-11-1.webp',
    },
    {
      id: 'btn',
      title: 'BTN',
      description: 'Button mode',
      img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-11-2.webp',
    },
  ];
  return (
    <div className="product-prix-mode ui-v4-flex">
      <h3 className="product-prix-mode__title">
        Easy or Pro, Setup As You Like
      </h3>
      <div className="product-prix-mode-list">
        {ModeList.map((item, index) => (
          <div className="product-prix-mode-list-item" key={index}>
            <img src={item.img} alt={item.title} />
            <div className="product-prix-mode-list-item-text">
              <p className="product-prix-mode-list-item__title">{item.title}</p>
              <p className="product-prix-mode-list-item__description">
                <span className="product-prix-mode-list-item__description-title">
                  {item.desc_title}
                </span>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
