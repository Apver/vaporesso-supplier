/**
 * ARMOUR G2 — Double Top | Triple S 2.0 | Quadra Leakproof
 * 设计稿：PC 1:328（标题+描述居中，三张竖版白卡并排）
 *        MOB 1:1081（标题+描述左对齐，三张横版白卡堆叠）
 * PC/MOB 卡片比例差异大（360×520 vs 345×300），裁切不同，故各出一套素材。
 * 标题在移动端于「Double Top |」后强制换行，用数据里的 \n + white-space 切换实现：
 * PC nowrap 把 \n 折成空格排成一行，移动端 pre-line 保留换行。
 */
export function LeakproofSection({title, description, tips, cards, className}) {
  return (
    <section className={`product-armour-g2-leak ${className || ''}`}>
      <div className="product-armour-g2-leak-inner">
        <div className="product-armour-g2-leak-head to-top">
          <h2 className="product-armour-g2-leak-title">{title}</h2>
          <p className="product-armour-g2-leak-desc">{description}</p>
        </div>

        <div className="product-armour-g2-leak-cards">
          {cards?.map((card) => (
            <div className="product-armour-g2-leak-card to-top" key={card.id}>
              <picture className="product-armour-g2-leak-card-media">
                <source media="(max-width: 1023px)" srcSet={card.imgMob} />
                <source media="(min-width: 1024px)" srcSet={card.imgPc} />
                <img
                  className="product-armour-g2-leak-card-bg"
                  src={card.imgPc}
                  alt=""
                />
              </picture>
              <p className="product-armour-g2-leak-card-label">{card.label}</p>
            </div>
          ))}
        </div>

        {tips && <p className="product-armour-g2-leak-tips to-top">{tips}</p>}
      </div>
    </section>
  );
}
