import '~/styles/ui-v4/pod-compatible.scss';
const CoilItem = ({coil}) => {
  return (
    <div className="product-armour-g2-pod-compatible-coil">
      <p className="product-armour-g2-pod-compatible-coil-tag">
        {coil.coilTag || '\u00A0'}
      </p>
      <picture>
        <source media="(max-width: 1023px)" srcSet={coil.coilImgMob} />
        <source media="(min-width: 1024px)" srcSet={coil.coilImgPc} />
        <img
          className="product-armour-g2-pod-compatible-coil-img"
          src={coil.coilImgPc}
          alt=""
        />
      </picture>
      <p className="product-armour-g2-pod-compatible-coil-ohm">
        {coil.coilOhm}
      </p>
      <p className="product-armour-g2-pod-compatible-coil-tech">
        {coil.coilTech}
      </p>
    </div>
  );
};
export function PodCompatible({title, description, podList, className}) {
  return (
    <div className={`product-armour-g2-pod-compatible ${className || ''}`}>
      {title && <h3 className="ui-v4-title to-top">{title}</h3>}
      {description && <p className="ui-v4-description to-top">{description}</p>}
      {podList && (
        <div className="product-armour-g2-pod-compatible-list">
          {podList.map((pod) => (
            <div
              className="product-armour-g2-pod-compatible-item to-top"
              key={pod.id}
            >
              <div className="product-armour-g2-pod-compatible-pod">
                <picture>
                  <source media="(max-width: 1023px)" srcSet={pod.podImgMob} />
                  <source media="(min-width: 1024px)" srcSet={pod.podImgPc} />
                  <img
                    className="product-armour-g2-pod-compatible-pod-img"
                    src={pod.podImgPc}
                    alt={pod.podImgAlt || ''}
                  />
                </picture>
                <p className="product-armour-g2-pod-compatible-pod-title">
                  {pod.podName}
                </p>
              </div>
              {pod.coilList && (
                <>
                  {pod.coilList.map((coil) => (
                    <div
                      className="product-armour-g2-pod-compatible-coil-container"
                      key={coil.id}
                    >
                      <div className="product-armour-g2-pod-compatible-coil-box">
                        {coil.data.map((coilData) => (
                          <CoilItem key={coilData.id} coil={coilData} />
                        ))}
                      </div>
                      <p className="product-armour-g2-pod-compatible-coil-watt">
                        {coil.watt}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
