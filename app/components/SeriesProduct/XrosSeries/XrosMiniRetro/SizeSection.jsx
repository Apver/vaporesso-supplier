export function SizeSection({title, description, mobImageUrl, pcImageUrl}) {
  return (
    <div className="xros-mini-retro-size">
      <div className="xros-mini-retro-size-container ui-v4-flex">
        <div className="xros-mini-retro-size-content">
          <h3 className="ui-v4-title">{title}</h3>
          <p className="ui-v4-description">{description}</p>
          <div className="xros-mini-retro-size-content-list">
            <div className="xros-mini-retro-size-content-list-item">
              <p className="xros-mini-retro-size-content-list-item-title">
                1000<span>mAh</span>
              </p>
              <p className="xros-mini-retro-size-content-list-item-description">
                Battery Capacity
              </p>
            </div>
            <div className="xros-mini-retro-size-content-list-item">
              <p className="xros-mini-retro-size-content-list-item-title">
                5V/1A
              </p>
              <p className="xros-mini-retro-size-content-list-item-description">
                Charging
              </p>
            </div>
            <div className="xros-mini-retro-size-content-list-item">
              <p className="xros-mini-retro-size-content-list-item-title">
                4 LED Lights
              </p>
              <p className="xros-mini-retro-size-content-list-item-description">
                Battery Level
              </p>
            </div>
          </div>
        </div>
        <picture>
          <source media="(max-width: 1023px)" srcSet={mobImageUrl} />
          <source media="(min-width: 1024px)" srcSet={pcImageUrl} />
          <img className="xros-mini-retro-size-image" src={pcImageUrl} alt="" />
        </picture>
      </div>
    </div>
  );
}
