export function SizeSection({title, description}) {
  return (
    <div className="xros-mini-retro-size">
      <div className="xros-mini-retro-size-content">
        <h3 className="ui-v4-title to-top">{title}</h3>
        <p className="ui-v4-description to-top">{description}</p>
        <div className="xros-mini-retro-size-content-list">
          <div className="xros-mini-retro-size-content-list-item to-left">
            <p className="xros-mini-retro-size-content-list-item-title">
              1000<span>mAh</span>
            </p>
            <p className="xros-mini-retro-size-content-list-item-description">
              Battery Capacity
            </p>
          </div>
          <div className="xros-mini-retro-size-content-list-item to-left">
            <p className="xros-mini-retro-size-content-list-item-title">
              5V/1A
            </p>
            <p className="xros-mini-retro-size-content-list-item-description">
              Charging
            </p>
          </div>
          <div className="xros-mini-retro-size-content-list-item to-left">
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
        src="https://cdn.shopify.com/videos/c/o/v/2b6c7295a12e4faf8cb846a18b930b45.mp4"
        className="xros-mini-retro-size-video s-hide"
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <video
        src="https://cdn.shopify.com/videos/c/o/v/019cbc16a1da446c8f687421003364e9.mp4"
        className="xros-mini-retro-size-video x-hide"
        poster="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_8_1.webp?v=1785138660"
        autoPlay
        loop
        muted
        playsInline
      ></video>
    </div>
  );
}
