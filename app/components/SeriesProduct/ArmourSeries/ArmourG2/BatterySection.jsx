/**
 * ARMOUR G2 — 电量（A Truly Compact Pod Mod）
 * 设计稿：PC 1:217（全屏背景图 + 左侧单列文字与数据）
 *        MOB 1:981（文字在上白底，图片区 400 高在下，数据叠在图左下）
 * 两端结构差异由 CSS 处理：移动端把背景图压到底部 400 高、数据改为绝对定位。
 * 数字的蓝绿渐变用 background-clip: text 实现，不烧进素材。
 */
export function BatterySection({
  title,
  description,
  tips,
  imgPc,
  imgMob,
  highlights,
  className,
}) {
  return (
    <section className={`product-armour-g2-battery ${className || ''}`}>
      <picture>
        <source media="(max-width: 1023px)" srcSet={imgMob} />
        <source media="(min-width: 1024px)" srcSet={imgPc} />
        <img className="product-armour-g2-battery-bg" src={imgPc} alt="" />
      </picture>

      <div className="product-armour-g2-battery-text to-top">
        <div className="product-armour-g2-battery-text-main">
          <h2 className="product-armour-g2-battery-title">{title}</h2>
          <p className="product-armour-g2-battery-desc">{description}</p>
        </div>
        {tips && <p className="product-armour-g2-battery-tips">{tips}</p>}
      </div>

      <div className="product-armour-g2-battery-highlights to-top">
        {highlights?.map((item) => (
          <div className="product-armour-g2-battery-hl" key={item.id}>
            <p className="product-armour-g2-battery-hl-value">
              <span className="product-armour-g2-battery-hl-num">
                {item.num}
              </span>
              <span className="product-armour-g2-battery-hl-unit">
                {item.unit}
              </span>
            </p>
            <p className="product-armour-g2-battery-hl-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
