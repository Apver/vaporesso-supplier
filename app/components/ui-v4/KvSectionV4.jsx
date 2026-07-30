import '~/styles/ui-v4/kv.scss';
export function KvSectionV4({data, className, textChildren, children}) {
  const {name, subname, slogan, mobBanner, pcBanner} = data;
  return (
    <div className={`ui-v4-kv ${className || ''}`}>
      <picture>
        {pcBanner ? (
          <source media="(min-width: 1024px)" srcSet={pcBanner} />
        ) : null}
        <img src={mobBanner} alt={name} className="ui-v4-kv__image" />
      </picture>
      <div className="ui-v4-kv-content">
        <h1 className="ui-v4-kv-content__title to-top">
          {name}
          {subname && (
            <span className="ui-v4-kv-content__subtitle to-top">{subname}</span>
          )}
        </h1>
        <p className="ui-v4-kv-content__slogan to-top">{slogan}</p>
        {textChildren}
      </div>
      {children}
    </div>
  );
}
