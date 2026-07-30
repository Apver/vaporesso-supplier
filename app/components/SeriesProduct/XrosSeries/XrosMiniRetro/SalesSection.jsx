import '~/styles/ui-v4/kv.scss';
export function SalesSection({salesList}) {
  return (
    <div className={'xros-mini-retro-sales ui-v4-flex'}>
      <div className="xros-mini-retro-sales-content ui-v4-flex">
        <div className="xros-mini-retro-sales-item xros-mini-retro-sales-item-3 x-hide to-top">
          <h3 className="xros-mini-retro-sales__title">{salesList[2].title}</h3>
          <img
            src={salesList[2].mobImageUrl}
            alt={salesList[2].title}
            className="xros-mini-retro-sales__image"
          />
        </div>
        <div className="xros-mini-retro-sales-item xros-mini-retro-sales-item-1 s-hide to-top">
          <h3 className="xros-mini-retro-sales__title">{salesList[0].title}</h3>
          <img
            src={salesList[0].pcImageUrl}
            alt={salesList[0].title}
            className="xros-mini-retro-sales__image"
          />
        </div>
        <div className="xros-mini-retro-sales-content xros-mini-retro-sales-box ui-v4-flex">
          <div className="xros-mini-retro-sales-item xros-mini-retro-sales-item-1 x-hide to-top">
            <h3 className="xros-mini-retro-sales__title">
              {salesList[0].title}
            </h3>
            <img
              src={salesList[0].mobImageUrl}
              alt={salesList[0].title}
              className="xros-mini-retro-sales__image"
            />
          </div>
          <div className="xros-mini-retro-sales-item xros-mini-retro-sales-item-2 to-top">
            <h3 className="xros-mini-retro-sales__title">
              {salesList[1].title}
            </h3>
            <picture>
              <source
                media="(max-width: 1023px)"
                srcSet={salesList[1].mobImageUrl}
              />
              <img
                src={salesList[1].pcImageUrl}
                alt={salesList[1].title}
                className="xros-mini-retro-sales__image"
              />
            </picture>
          </div>
          <div className="xros-mini-retro-sales-item xros-mini-retro-sales-item-3 s-hide to-top">
            <h3 className="xros-mini-retro-sales__title">
              {salesList[2].title}
            </h3>
            <img
              src={salesList[2].pcImageUrl}
              alt={salesList[2].title}
              className="xros-mini-retro-sales__image"
            />
          </div>
          <div className="xros-mini-retro-sales-item xros-mini-retro-sales-item-4 to-top">
            <h3 className="xros-mini-retro-sales__title">
              {salesList[3].title}
            </h3>
            <picture>
              <source
                media="(max-width: 1023px)"
                srcSet={salesList[3].mobImageUrl}
              />
              <img
                src={salesList[3].pcImageUrl}
                alt={salesList[3].title}
                className="xros-mini-retro-sales__image"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}
