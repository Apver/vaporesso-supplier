/**
 * ARMOUR G2 — MTL & DTL Compatible
 * 设计稿：PC 1:299（标题居中，两张卡片并排）／MOB 1:1058（标题左对齐，卡片上下堆叠）
 * 设计师 2026-09-11 换图后，两端用同一张源图但裁切与旋转不同，故 PC/MOB 各出一张，用 <picture> 分端。
 * 卡片左下的压黑渐变与条目之间的分隔线都由 CSS 实现，不烧进素材；
 * 各卡渐变可能不同（移动端 DTL 与其余不同），卡片带 --{id} 修饰类供 CSS 区分。
 */
export function ModeSection({title, cards, className}) {
  return (
    <section className={`product-armour-g2-mode ${className || ''}`}>
      <div className="product-armour-g2-mode-inner">
        <h2 className="product-armour-g2-mode-title to-top">{title}</h2>

        <div className="product-armour-g2-mode-cards">
          {cards?.map((card) => (
            <div
              className={`product-armour-g2-mode-card product-armour-g2-mode-card--${card.id} to-top`}
              key={card.id}
            >
              <picture>
                <source media="(max-width: 1023px)" srcSet={card.imgMob} />
                <source media="(min-width: 1024px)" srcSet={card.imgPc} />
                <img
                  className="product-armour-g2-mode-card-bg"
                  src={card.imgPc}
                  alt=""
                />
              </picture>

              <div className="product-armour-g2-mode-card-head">
                <span className="product-armour-g2-mode-card-name">
                  {card.name}
                </span>
                <img
                  className="product-armour-g2-mode-card-slider"
                  src={card.slider}
                  alt=""
                />
              </div>

              <ul className="product-armour-g2-mode-card-list">
                {card.features?.map((item) => (
                  <li
                    className="product-armour-g2-mode-card-item"
                    key={item.id}
                  >
                    <span className="product-armour-g2-mode-card-item-key">
                      {item.key}
                    </span>{' '}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
