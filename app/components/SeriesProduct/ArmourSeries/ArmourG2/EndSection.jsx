/**
 * ARMOUR G2 — 结尾产品区（ARMOUR G2&GS2 + 卖点标签）
 * 设计稿：PC 1:918（997 高）／MOB 1:1698（872 高）
 * 两端的产品图画框与裁切百分比完全一致（340×480），故只出一份素材，
 * 且两台设备已在素材里合成为一张，组件里只有一个 <img>。
 *
 * 注意：设计稿这一版**没有画「Check Specs」按钮**（其他产品页的结尾区都有，
 * 它是页内跳到 Specs 页签的唯一入口）。此处按设计稿实现，暂不渲染按钮，
 * 路由传入的 onCheckSpecs 因此未被使用——待产品/设计确认后再定。
 */
export function EndSection({title, img, features, className}) {
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
      </div>
    </section>
  );
}
