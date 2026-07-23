import '~/styles/ui-v4/pod-compatible.scss';
export function PodCompatible({title, description, podList, className}) {
  return (
    <div className={`ui-v4-pod-compatible ${className || ''}`}>
      <h3 className="ui-v4-pod-compatible-title to-top">{title}</h3>
      {description && (
        <p className="ui-v4-pod-compatible-description to-top">{description}</p>
      )}
      {podList && (
        <div className="ui-v4-pod-compatible-list">
          {podList.map((pod) => (
            <div
              className={`ui-v4-pod-compatible-item to-top ${pod.isDouble ? 'ui-v4-pod-compatible-double_item' : ''}`}
              key={pod.id}
            >
              <p
                className={`ui-v4-pod-compatible-item-version ${pod.topTag ? 'ui-v4-pod-compatible-item-version-with-tag' : ''}`}
              >
                {pod.topTag && (
                  <span className="ui-v4-pod-compatible-item-version-tag">
                    {pod.topTag}
                    <br />
                  </span>
                )}
                {pod.version}
              </p>
              <div className="ui-v4-pod-compatible-item-line" />
              <img
                className="ui-v4-pod-compatible-item-img"
                src={pod.imgUrl}
                alt={pod.imgAlt || ''}
              />
              <p className="ui-v4-pod-compatible-item-ohm">{pod.ohm}</p>
              <p className="ui-v4-pod-compatible-item-type">{pod.type}</p>
              <p className="ui-v4-pod-compatible-item-tag">{pod.tag}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
