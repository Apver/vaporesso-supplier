import {useEffect, useMemo, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router';
import {
  SEARCH_PRODUCTS,
  SEARCH_STORES,
  VAPE_NEWS,
} from '~/data/search-data';
import {SearchLoadMore, SearchResultItem} from '~/components/Search/SearchResultItem';
import {
  SEARCH_PAGE_SIZE,
  SEARCH_TABS,
  filterSearchItems,
  getSearchTabList,
  mergeSearchProducts,
} from '~/lib/search-page';

/**
 * @param {{productImageMap?: Record<string, string>}}
 */
export function SearchResultSection({productImageMap = {}}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState('all');
  const [inputValue, setInputValue] = useState(
    () => searchParams.get('q') || '',
  );
  const [page, setPage] = useState(1);

  const products = useMemo(
    () => mergeSearchProducts(SEARCH_PRODUCTS, SEARCH_STORES, productImageMap),
    [productImageMap],
  );

  const tabList = useMemo(
    () => getSearchTabList(activeTab, products, VAPE_NEWS),
    [activeTab, products],
  );

  const filteredList = useMemo(
    () => filterSearchItems(tabList, inputValue),
    [tabList, inputValue],
  );

  const visibleList = useMemo(
    () => filteredList.slice(0, page * SEARCH_PAGE_SIZE),
    [filteredList, page],
  );

  const hasQuery = inputValue.trim().length > 0;
  const hasMore = visibleList.length < filteredList.length;

  useEffect(() => {
    setPage(1);
  }, [activeTab, inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="search-result main">
      <div className="result-cnt">
        <button
          type="button"
          className="go-back x-hide"
          onClick={handleGoBack}
          aria-label="Go back"
        />
        <form
          id="searchForm"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            id="searchInput"
            type="text"
            name="q"
            value={inputValue}
            placeholder="Search vaporesso.com"
            autoComplete="off"
            className="f_14 f-d-bold"
            onChange={handleInputChange}
          />
        </form>
      </div>

      <ul className="res-tab">
        {SEARCH_TABS.map((tab) => (
          <li
            key={tab.id}
            data-name={tab.id}
            className={`f_14 f-d-bold${activeTab === tab.id ? ' active' : ''}${
              tab.id === 'all' ? ' all-list' : ''
            }`}
          >
            <button type="button" onClick={() => handleTabChange(tab.id)}>
              {tab.label}
            </button>
          </li>
        ))}
        <li className="total f_13">
          <span>
            <span id="totalNum">{hasQuery ? filteredList.length : 0}</span>{' '}
            Results Found
          </span>
        </li>
      </ul>

      <ul className="search-list">
        {!hasQuery ? (
          <li>
            <div className="f_24 f-d-bold text-center no-text">
              <div className="bg-result" />
              No results:-(
            </div>
          </li>
        ) : visibleList.length === 0 ? (
          <li>
            <div className="f_24 f-d-bold text-center no-text">
              <div className="bg-result" />
              No results found “{inputValue.trim()}”:-(
            </div>
          </li>
        ) : (
          visibleList.map((item, index) => (
            <SearchResultItem
              key={`${item.name || item.title}-${index}`}
              item={item}
              query={inputValue.trim()}
            />
          ))
        )}
      </ul>

      <SearchLoadMore
        visible={hasQuery && visibleList.length > 0}
        hasMore={hasMore}
        onLoadMore={() => setPage((current) => current + 1)}
      />
    </div>
  );
}
