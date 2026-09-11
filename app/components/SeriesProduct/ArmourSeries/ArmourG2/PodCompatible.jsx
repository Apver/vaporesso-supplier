/**
 * ARMOUR G2 — Compatible With Multiple GTX Coils
 * 设计稿：PC 1:787（两张深灰卡，Pod 在左、线圈横排在右）
 *        MOB 1:1530（同两张卡，线圈换行绕排到 Pod 右侧与下方）
 *
 * Pod 与线圈是**同一个 flex 容器的兄弟节点**——移动端靠 flex-wrap 让线圈组
 * 先排在 Pod 右侧、排不下再整行换行，PC 端则是一条不换行的横排。
 * 线圈按「组」分（一组 1~2 个：Mesh / Dual Mesh 成对），组内间距与组间间距不同。
 */
const CoilItem = ({coil}) => (
  <div className="product-armour-g2-pod-compatible-coil">
    {/* 无 NEW 标记的也占位，保证同排线圈顶对齐 */}
    <p className="product-armour-g2-pod-compatible-coil-tag">
      {coil.tag || ' '}
    </p>
    <img
      className="product-armour-g2-pod-compatible-coil-img"
      src={coil.img}
      alt=""
    />
    <p className="product-armour-g2-pod-compatible-coil-ohm">{coil.ohm}</p>
    <p className="product-armour-g2-pod-compatible-coil-tech">{coil.tech}</p>
  </div>
);

export function PodCompatible({title, podList, className}) {
  return (
    <section className={`product-armour-g2-pod-compatible ${className || ''}`}>
      {title && (
        <h2 className="product-armour-g2-pod-compatible-title to-top">
          {title}
        </h2>
      )}

      <div className="product-armour-g2-pod-compatible-list">
        {podList?.map((pod) => (
          <div
            className="product-armour-g2-pod-compatible-item to-top"
            key={pod.id}
          >
            <div className="product-armour-g2-pod-compatible-pod">
              <picture className="product-armour-g2-pod-compatible-pod-media">
                <source media="(max-width: 1023px)" srcSet={pod.podImgMob} />
                <source media="(min-width: 1024px)" srcSet={pod.podImgPc} />
                <img
                  className="product-armour-g2-pod-compatible-pod-img"
                  src={pod.podImgPc}
                  alt={pod.podName}
                />
              </picture>
              <p className="product-armour-g2-pod-compatible-pod-title">
                {pod.podName}
              </p>
            </div>

            {pod.coilGroups?.map((group) => (
              <div
                className="product-armour-g2-pod-compatible-coil-group"
                key={group.id}
              >
                {group.items.map((coil) => (
                  <CoilItem key={coil.id} coil={coil} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
