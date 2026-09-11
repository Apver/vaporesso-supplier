/**
 * ARMOUR G2 — Dual Safety Lock | No Accidental Firing
 * 设计稿：PC 1:349（标题描述居中，左右双卡）／MOB 1:1100（左对齐，上下堆叠）
 *
 * 左卡是**两帧轮播**：解锁态 ↔ LOCKED 态。两帧绝对定位叠放、第二帧在上层，
 * 纯 CSS @keyframes 交替 opacity（6s 周期：各停 2.5s、淡入淡出 0.5s），不引 GSAP。
 * 第二帧的 animation-play-state 默认 paused，靠卡片上的 to-top/appear
 * （复用全局 initToTopAnimate 的 IntersectionObserver）在进入视口时切 running。
 * 两帧都正常渲染（第二帧 opacity: 0），避免首次切换才发请求导致闪白。
 */
export function SafetyLockSection({title, description, cards, className}) {
  return (
    <section className={`product-armour-g2-lock ${className || ''}`}>
      <div className="product-armour-g2-lock-inner">
        <div className="product-armour-g2-lock-head to-top">
          <h2 className="product-armour-g2-lock-title">{title}</h2>
          <p className="product-armour-g2-lock-desc">{description}</p>
        </div>

        <div className="product-armour-g2-lock-cards">
          {cards?.map((card) => (
            <div className="product-armour-g2-lock-card to-top" key={card.id}>
              <div className="product-armour-g2-lock-frames">
                <picture className="product-armour-g2-lock-frame">
                  <source media="(max-width: 1023px)" srcSet={card.imgMob} />
                  <source media="(min-width: 1024px)" srcSet={card.imgPc} />
                  <img
                    className="product-armour-g2-lock-frame-img"
                    src={card.imgPc}
                    alt={card.label}
                  />
                </picture>

                {card.altImgPc && (
                  <picture className="product-armour-g2-lock-frame product-armour-g2-lock-frame-2">
                    <source media="(max-width: 1023px)" srcSet={card.altImgMob} />
                    <source media="(min-width: 1024px)" srcSet={card.altImgPc} />
                    <img
                      className="product-armour-g2-lock-frame-img"
                      src={card.altImgPc}
                      alt=""
                    />
                  </picture>
                )}
              </div>

              <div className="product-armour-g2-lock-caption">
                <p className="product-armour-g2-lock-note">{card.note}</p>
                <p className="product-armour-g2-lock-label">{card.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
