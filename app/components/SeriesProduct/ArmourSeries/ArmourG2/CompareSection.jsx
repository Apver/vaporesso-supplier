/**
 * ARMOUR G2 — What's New In ARMOUR G2&GS2?
 * 设计稿：PC 1:820（四列并排对比）／MOB 1:1603（2×2 两行两列）
 * 第 2、4 列底色 #f2f2f2，用 alt 变体标记；升级项右侧带橙色上箭头。
 * 四张设备图两端共用：设计稿里 PC 与移动端的图片裁切百分比一致，
 * 只是画框尺寸不同，PC 锁宽、移动端锁高即可各自得到正确高度。
 */
export function CompareSection({title, arrow, columns, className}) {
  return (
    <section className={`product-armour-g2-compare ${className || ''}`}>
      <h2 className="product-armour-g2-compare-title to-top">{title}</h2>

      <div className="product-armour-g2-compare-cols to-top">
        {columns?.map((col) => (
          <div
            className={`product-armour-g2-compare-col${
              col.alt ? ' product-armour-g2-compare-col--alt' : ''
            }`}
            key={col.id}
          >
            <div className="product-armour-g2-compare-info">
              <img
                className="product-armour-g2-compare-device"
                src={col.img}
                alt={col.name}
              />
              <p className="product-armour-g2-compare-name">{col.name}</p>
            </div>

            <div className="product-armour-g2-compare-features">
              {col.features?.map((item) => (
                <div
                  className="product-armour-g2-compare-feature"
                  key={item.id}
                >
                  <p className="product-armour-g2-compare-feature-text">
                    {item.text}
                  </p>
                  {item.up && (
                    <img
                      className="product-armour-g2-compare-feature-icon"
                      src={arrow}
                      alt=""
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
