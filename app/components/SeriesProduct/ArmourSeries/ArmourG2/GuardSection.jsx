/**
 * ARMOUR G2 — Advanced Battery Guard
 * 设计稿：PC 1:365（3 张大卡一行 + 5 张小卡一行）
 *        MOB 1:1115（3 张大卡堆叠 + 5 张小卡两列网格，最后一张独占左列）
 * 卡片底色 #161616，大卡底部有一道橙色椭圆辉光、四周有橙色内阴影，全部用 CSS 渐变实现。
 * 8 个图标是矢量线稿，已统一封装成「画框即 viewBox」的 SVG，组件只需给宽高。
 * 最后一张小卡（Battery Low）图标是竖长比例、位置也与另四张不同，用 --tall 变体处理。
 */
export function GuardSection({title, tips, cards, minis, className}) {
  return (
    <section className={`product-armour-g2-guard ${className || ''}`}>
      <div className="product-armour-g2-guard-inner">
        <h2 className="product-armour-g2-guard-title to-top">{title}</h2>

        <div className="product-armour-g2-guard-cards to-top">
          {cards?.map((card) => (
            <div className="product-armour-g2-guard-card" key={card.id}>
              <img
                className="product-armour-g2-guard-card-icon"
                src={card.icon}
                alt=""
              />
              <div className="product-armour-g2-guard-card-text">
                <p className="product-armour-g2-guard-card-title">
                  {card.title}
                </p>
                <p className="product-armour-g2-guard-card-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="product-armour-g2-guard-minis to-top">
          {minis?.map((mini) => (
            <div
              className={`product-armour-g2-guard-mini${
                mini.tall ? ' product-armour-g2-guard-mini--tall' : ''
              }`}
              key={mini.id}
            >
              <img
                className="product-armour-g2-guard-mini-icon"
                src={mini.icon}
                alt=""
              />
              <p className="product-armour-g2-guard-mini-label">{mini.label}</p>
            </div>
          ))}
        </div>

        {tips && <p className="product-armour-g2-guard-tips to-top">{tips}</p>}
      </div>
    </section>
  );
}
