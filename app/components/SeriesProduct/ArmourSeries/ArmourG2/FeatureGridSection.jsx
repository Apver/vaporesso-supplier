/**
 * ARMOUR G2 — 卖点合集（6 张卡片网格）
 * 设计稿：PC 1:190（内容宽 980，3 列 Grid）／MOB 1:957（宽 345，2 列 Grid）
 * 两端卡片顺序不同，由 CSS 的 grid-row/column 显式排布，DOM 保持单套。
 */
const CardMedia = ({imgPc, imgMob, className}) => (
  <picture>
    <source media="(max-width: 1023px)" srcSet={imgMob} />
    <source media="(min-width: 1024px)" srcSet={imgPc} />
    <img className={className} src={imgPc} alt="" />
  </picture>
);

const Card = ({name, title, subtitle, imgPc, imgMob, children}) => (
  <div className={`product-armour-g2-grid-card product-armour-g2-grid-${name}`}>
    {imgPc && (
      <CardMedia
        imgPc={imgPc}
        imgMob={imgMob}
        className="product-armour-g2-grid-card-bg"
      />
    )}
    <div className="product-armour-g2-grid-card-text to-top">
      <p className="product-armour-g2-grid-card-title">{title}</p>
      {subtitle && (
        <p className="product-armour-g2-grid-card-subtitle">{subtitle}</p>
      )}
    </div>
    {children}
  </div>
);

export function FeatureGridSection({
  mtl,
  gtx,
  batt,
  safety,
  airflow,
  charge,
  className,
}) {
  return (
    <section className={`product-armour-g2-grid ${className || ''}`}>
      <Card name="mtl" {...mtl}>
        {/* 两条气流指示（左弱右强），矢量素材两端共用，尺寸与位置由 CSS 控制 */}
        <img
          className="product-armour-g2-grid-mtl-flow-l"
          src={mtl.flowLeft}
          alt=""
        />
        <img
          className="product-armour-g2-grid-mtl-flow-r"
          src={mtl.flowRight}
          alt=""
        />
      </Card>
      <Card name="gtx" {...gtx} />
      <Card name="batt" {...batt} />
      <Card name="safety" {...safety}>
        <div className="product-armour-g2-grid-safety-imgs to-top">
          {safety.images?.map((item) => (
            <CardMedia
              key={item.id}
              imgPc={item.imgPc}
              imgMob={item.imgMob}
              className="product-armour-g2-grid-safety-img"
            />
          ))}
        </div>
      </Card>
      <Card name="airflow" {...airflow} />
      <Card name="charge" {...charge} />
    </section>
  );
}
