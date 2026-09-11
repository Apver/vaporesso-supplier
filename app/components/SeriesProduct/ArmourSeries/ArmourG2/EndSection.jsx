/**
 * ARMOUR G2 — 结尾产品区（ARMOUR G2&GS2 + 卖点标签）
 * 设计稿：PC 1:918（997 高）／MOB 1:1698（872 高）
 * 两端的产品图画框与裁切百分比完全一致（340×480），故只出一份素材，
 * 且两台设备已在素材里合成为一张，组件里只有一个 <img>。
 *
 * 「Check Specs」按钮设计稿上没有画，但它是产品页的固定按钮（页内跳到
 * Specs 页签的入口），样式与其他产品页 ui-v4 EndProduct 的按钮一致。
 * 点击调用路由经 Layout 传入的 onCheckSpecs。
 */
export function EndSection({
  title,
  img,
  features,
  btnText = 'Check Specs',
  onCheckSpecs,
  className,
}) {
  return (
    <section className={`product-armour-g2-end ${className || ''}`}>
      <h2 className="product-armour-g2-end-title to-top">{title}</h2>

      <div className="product-armour-g2-end-body to-top">
        <img className="product-armour-g2-end-img" src={img} alt={title} />

        <div className="product-armour-g2-end-tags">
          {features?.map((item) => (
            <span className="product-armour-g2-end-tag" key={item.id}>
              {item.text}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="product-armour-g2-end-btn"
          onClick={onCheckSpecs}
        >
          {btnText}
        </button>
      </div>
    </section>
  );
}
