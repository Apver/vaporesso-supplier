import {SearchHighlight} from '~/components/Search/SearchHighlight';

const DEFAULT_STORE_URL = 'https://store.vaporesso.com/';
const LOAD_MORE_ICON =
  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/icon_load_more.svg';

/**
 * @param {{item: Record<string, unknown>, query: string}}
 */
export function SearchResultItem({item, query}) {
  const isNews = Boolean(item.title);
  const name = String(item.name || item.title || '');
  const info = String(item.info || '');
  const link = String(item.link || '#');
  const storeUrl = String(item.storeUrl || DEFAULT_STORE_URL);

  if (isNews) {
    return (
      <li className="news">
        <div>
          <a href={link}>
            <h3 className="f_15 f-d-bold notranslate">
              <SearchHighlight text={name} query={query} />
            </h3>
          </a>
          <p className="f_14">
            <SearchHighlight text={info} query={query} />
            <br />
            <a href={link} target="_blank" rel="noreferrer">
              {link}
            </a>
          </p>
          <div className="action f_15">
            <span className="f_13 date">
              by {item.source}, {item.date}
            </span>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="pro">
      <div>
        <a href={link}>
          <h3 className="f_15 f-d-bold notranslate">
            <SearchHighlight text={name} query={query} />
          </h3>
        </a>
        <p className="f_14">
          <SearchHighlight text={info} query={query} />
        </p>
        <div className="action f_15">
          <a href={link} className="more">
            Learn More
          </a>
          <a href={storeUrl} className="more" target="_blank" rel="noreferrer">
            Buy
          </a>
          {item.downUrl ? (
            <a
              href={String(item.downUrl)}
              target="_blank"
              rel="noreferrer"
              className="down-btn"
              download
            >
              Download
            </a>
          ) : null}
        </div>
      </div>
      <a href={link}>
        <div className="pro-img">
          <img src={String(item.imgUrl || '')} alt={name} />
        </div>
      </a>
    </li>
  );
}

/**
 * @param {{visible: boolean, hasMore: boolean, onLoadMore: () => void}}
 */
export function SearchLoadMore({visible, hasMore, onLoadMore}) {
  if (!visible) return null;

  return (
    <div className="load-more" onClick={hasMore ? onLoadMore : undefined}>
      <span className="f_13">
        {hasMore ? 'Load more' : 'All results are displayed'}
      </span>
      {hasMore ? <img src={LOAD_MORE_ICON} alt="Load more" /> : null}
    </div>
  );
}
