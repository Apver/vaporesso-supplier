export function SizeSection({title, description}) {
  return (
    <div className="xros-mini-retro-size">
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
      <video
        className="xros-mini-retro-size-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          media="(max-width: 1023px)"
          src="https://cdn.shopify.com/videos/c/o/v/019cbc16a1da446c8f687421003364e9.mp4"
          type="video/mp4"
        />
        <source
          media="(min-width: 1024px)"
          src="https://cdn.shopify.com/videos/c/o/v/2b6c7295a12e4faf8cb846a18b930b45.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
