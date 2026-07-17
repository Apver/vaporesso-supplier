export function PodCompatible({title, description, podList, className}) {
  return (
    <div className={`ui_v3-pod_compatible ${className || ''}`}>
      <h3 className="ui_v3-pod_compatible-title to-top">{title}</h3>
      {description && (
        <p className="ui_v3-pod_compatible-description to-top">{description}</p>
      )}
      {podList && (
        <div className="ui_v3-pod_compatible-list">
          {podList.map((pod) => (
            <div
              className={`ui_v3-pod_compatible-item to-top ${pod.isDouble ? 'ui_v3-pod_compatible-double_item' : ''}`}
              key={pod.id}
            >
              <p
                className={`ui_v3-pod_compatible-item-version ${pod.topTag ? 'ui_v3-pod_compatible-item-version-with-tag' : ''}`}
              >
                {pod.topTag && (
                  <span className="ui_v3-pod_compatible-item-version-tag">
                    {pod.topTag}
                    <br />
                  </span>
                )}
                {pod.version}
              </p>
              <div className="ui_v3-pod_compatible-item-line" />
              <img
                className="ui_v3-pod_compatible-item-img"
                src={pod.imgUrl}
                alt={pod.imgAlt || ''}
              />
              <p className="ui_v3-pod_compatible-item-ohm">{pod.ohm}</p>
              <p className="ui_v3-pod_compatible-item-type">{pod.type}</p>
              <p className="ui_v3-pod_compatible-item-tag">{pod.tag}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
