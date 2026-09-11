/**
 * ARMOUR G2 — KV 首屏
 * 设计稿：PC 1:173（1920x720，底图 2560 出血）／MOB 1:939（375x600）
 */
export function KvSection({name, slogan, bannerPc, bannerMob, className}) {
  return (
    <section className={`product-armour-g2-kv ${className || ''}`}>
      <picture>
        <source media="(max-width: 1023px)" srcSet={bannerMob} />
        <source media="(min-width: 1024px)" srcSet={bannerPc} />
        <img className="product-armour-g2-kv-bg" src={bannerPc} alt={name} />
      </picture>
      <div className="product-armour-g2-kv-content">
        <h1 className="product-armour-g2-kv-title to-top">{name}</h1>
        {slogan && (
          <p className="product-armour-g2-kv-slogan to-top">{slogan}</p>
        )}
      </div>
    </section>
  );
}
