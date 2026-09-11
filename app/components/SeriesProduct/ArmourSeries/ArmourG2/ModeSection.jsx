/**
 * ARMOUR G2 — MTL & DTL Compatible
 * 设计稿：PC 1:299（标题居中，两张卡片并排）／MOB 1:1058（标题左对齐，卡片上下堆叠）
 * 两端卡片内的图片裁切完全一致（设计稿百分比逐位相同），故 PC/MOB 共用一份素材，
 * 不再拆 pc/mob 两张，`<picture>` 也随之省掉。
 * 卡片左下的压黑渐变与条目之间的分隔线都由 CSS 实现，不烧进素材。
 */
export function ModeSection({title, cards, className}) {
  return (
    <section className={`product-armour-g2-mode ${className || ''}`}>
      <div className="product-armour-g2-mode-inner">
        <h2 className="product-armour-g2-mode-title to-top">{title}</h2>

        <div className="product-armour-g2-mode-cards">
          {cards?.map((card) => (
            <div className="product-armour-g2-mode-card to-top" key={card.id}>
              <img
                className="product-armour-g2-mode-card-bg"
                src={card.img}
                alt=""
              />

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
                  <li className="product-armour-g2-mode-card-item" key={item.id}>
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
