/**
 * ARMOUR G2 — 3+3 UI Dynamic Themes
 * 设计稿：PC 1:771（标题描述居中，两张图并排）／MOB 1:1517（左对齐，两张图上下堆叠）
 * 说明文字里的分隔符是设计稿原样的全角竖线「｜」，直接写在数据里，不额外拆标签。
 */
export function ThemeSection({title, description, cards, className}) {
  return (
    <section className={`product-armour-g2-theme ${className || ''}`}>
      <div className="product-armour-g2-theme-inner">
        <div className="product-armour-g2-theme-head to-top">
          <h2 className="product-armour-g2-theme-title">{title}</h2>
          <p className="product-armour-g2-theme-desc">{description}</p>
        </div>

        <div className="product-armour-g2-theme-cards">
          {cards?.map((card) => (
            <div className="product-armour-g2-theme-card to-top" key={card.id}>
              <picture className="product-armour-g2-theme-card-media">
                <source media="(max-width: 1023px)" srcSet={card.imgMob} />
                <source media="(min-width: 1024px)" srcSet={card.imgPc} />
                <img
                  className="product-armour-g2-theme-card-img"
                  src={card.imgPc}
                  alt={card.caption}
                />
              </picture>
              <p className="product-armour-g2-theme-card-caption">
                {card.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
