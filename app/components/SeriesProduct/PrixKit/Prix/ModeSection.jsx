export const ModeSection = ({
  title,
  description,
  isChoice = false,
  list,
  className,
}) => {
  return (
    <div className={`product-prix-mode ui-v4-flex ${className || ''}`}>
      {title && <h3 className="product-prix-mode__title to-top">{title}</h3>}
      {description && (
        <p className="product-prix-mode__description to-top">
          {description}
          <br />
          {isChoice && (
            <>
              <span>Dual:</span> Auto-draw + button
            </>
          )}
        </p>
      )}
      <div className="product-prix-mode-list">
        {list.map((item, index) => (
          <div className="product-prix-mode-list-item to-left" key={index}>
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
