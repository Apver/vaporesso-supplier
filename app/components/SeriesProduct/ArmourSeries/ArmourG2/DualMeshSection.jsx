/**
 * ARMOUR G2 — Dual Mesh（True-To-Life Flavor）
 * 设计稿：PC 1:271（全屏星空背景 + 左侧文案与数据）
 *        MOB 1:1036（黑底文案在上，芯网图在下，数据叠在图片顶部）
 * 两端差异用 CSS 处理：移动端 section 转 grid，媒体与数据同格叠放，
 * &-body 用 display: contents 拆组，让文案与数据各自落到对应的格子。
 * 背景上的三段黑色渐变（顶/底压黑 + 左侧 70% 压暗）全部交给 CSS，不烧进素材。
 */
export function DualMeshSection({
  logo,
  title,
  description,
  tips,
  imgPc,
  imgMob,
  arrowPc,
  arrowMob,
  stats,
  className,
}) {
  return (
    <section className={`product-armour-g2-mesh ${className || ''}`}>
      <picture className="product-armour-g2-mesh-media">
        <source media="(max-width: 1023px)" srcSet={imgMob} />
        <source media="(min-width: 1024px)" srcSet={imgPc} />
        <img className="product-armour-g2-mesh-bg" src={imgPc} alt="" />
      </picture>

      <div className="product-armour-g2-mesh-body">
        <div className="product-armour-g2-mesh-text to-top">
          <img
            className="product-armour-g2-mesh-logo"
            src={logo}
            alt="Dual Mesh"
          />
          <h2 className="product-armour-g2-mesh-title">{title}</h2>
          <p className="product-armour-g2-mesh-desc">{description}</p>
          {tips && <p className="product-armour-g2-mesh-tips">{tips}</p>}
        </div>

        <div className="product-armour-g2-mesh-stats to-top">
          {stats?.map((item) => (
            <div className="product-armour-g2-mesh-stat" key={item.id}>
              <div className="product-armour-g2-mesh-stat-value">
                <p className="product-armour-g2-mesh-stat-num">
                  <span className="product-armour-g2-mesh-stat-int">
                    {item.num}
                  </span>
                  <span className="product-armour-g2-mesh-stat-unit">
                    {item.unit}
                  </span>
                </p>
                <picture className="product-armour-g2-mesh-stat-arrow">
                  <source media="(max-width: 1023px)" srcSet={arrowMob} />
                  <source media="(min-width: 1024px)" srcSet={arrowPc} />
                  <img
                    className="product-armour-g2-mesh-stat-arrow-img"
                    src={arrowPc}
                    alt=""
                  />
                </picture>
              </div>
              <p className="product-armour-g2-mesh-stat-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
