/**
 * ARMOUR G2 — 3A 快充
 * 设计稿：PC 1:235（左对齐，注释在图下方）／MOB 1:999（居中，注释在描述下方）
 * 两端注释与图的先后顺序不同，用 CSS order 重排，DOM 保持单套扁平结构。
 */
export function ChargingSection({
  title,
  description,
  tips,
  imgPc,
  imgMob,
  className,
}) {
  return (
    <section className={`product-armour-g2-charging ${className || ''}`}>
      <h2 className="product-armour-g2-charging-title to-top">{title}</h2>
      <p className="product-armour-g2-charging-desc to-top">{description}</p>
      {tips && (
        <p className="product-armour-g2-charging-tips to-top">{tips}</p>
      )}
      <picture className="product-armour-g2-charging-media to-top">
        <source media="(max-width: 1023px)" srcSet={imgMob} />
        <source media="(min-width: 1024px)" srcSet={imgPc} />
        <img
          className="product-armour-g2-charging-img"
          src={imgPc}
          alt={title}
        />
      </picture>
    </section>
  );
}
