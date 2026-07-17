export function EndProduct({data, className, onCheckSpecs}) {
  const {title, subtitle, imgUrl, imgUrlMob, salesList, btnText} = data;
  const handleCheckSpecs = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
    if (onCheckSpecs) {
      onCheckSpecs();
    }
  };
  return (
    <div className={`ui_v3-end_product ${className || ''}`}>
      <p className="ui_v3-end_product-title to-top">
        {title}
        {subtitle ? (
          <span className="ui_v3-end_product-subtitle">{subtitle}</span>
        ) : null}
      </p>
      {imgUrl && (
        <picture>
          {imgUrlMob && (
            <source media="(max-width: 1023px)" srcSet={imgUrlMob} />
          )}
          <source media="(min-width: 1024px)" srcSet={imgUrl} />
          <img className="ui_v3-end_product-img to-top" src={imgUrl} alt="" />
        </picture>
      )}
      {salesList && (
        <div className="ui_v3-end_product-sales-list to-top">
          {salesList.map((sale) => (
            <div className="ui_v3-end_product-sales-item" key={sale.id}>
              {sale.text}
            </div>
          ))}
        </div>
      )}
      <div
        className="ui_v3-end_product-btn to-top"
        role="button"
        tabIndex={0}
        onClick={handleCheckSpecs}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCheckSpecs();
          }
        }}
      >
        {btnText || 'Check Specs'}
      </div>
    </div>
  );
}
