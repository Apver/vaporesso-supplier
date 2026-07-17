import {useCallback} from 'react';
import {ProductCard} from '~/components/ProductCard';
import {
  SearchFormPredictive,
  SEARCH_ENDPOINT,
} from '~/components/SearchFormPredictive';
import {CloseIcon, SearchMobileIcon} from '~/components/Icons';
import {
  getEmptyPredictiveSearchResult,
  urlWithTrackingParams,
} from '~/lib/search';

const POPULAR_SEARCH_TERMS = [
  'XROS 5',
  'XROS 5 Mini',
  'ARMOUR MAX | S',
  'XROS Pro',
];

const createPopularProductFallback = ({id, title, handle, href, image}) => ({
  href,
  product: {
    id,
    title,
    handle,
    featuredImage: {
      id: `${id}-image`,
      url: image,
      altText: title,
      width: 800,
      height: 800,
    },
    metafields: [],
  },
});

export const POPULAR_PRODUCT_FALLBACK = [
  createPopularProductFallback({
    id: 'popular-fallback-eco-nano-plus',
    title: 'ECO NANO PLUS',
    handle: 'eco-nano-plus',
    href: 'https://www.vaporesso.com/vape-kits/xros5',
    image:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/PhotoshopExtension_Image.png?v=1763626841',
  }),
  createPopularProductFallback({
    id: 'popular-fallback-armour-ultra',
    title: 'ARMOUR ULTRA',
    handle: 'armour-ultra',
    href: 'https://www.vaporesso.com/series-product/xros-series/xros5-mini',
    image:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/PhotoshopExtension_Image_1.png?v=1763626841',
  }),
  createPopularProductFallback({
    id: 'popular-fallback-xros-pro-2',
    title: 'XROS PRO 2',
    handle: 'xros-pro-2',
    href: 'https://www.vaporesso.com/vape-kits/armour-max',
    image:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/PhotoshopExtension_Image_2.png?v=1763626841',
  }),
  createPopularProductFallback({
    id: 'popular-fallback-eco-one-pro',
    title: 'ECO ONE PRO',
    handle: 'eco-one-pro',
    href: 'https://www.vaporesso.com/vape-kits/luxe-xr-max',
    image:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/product.webp?v=1763603679',
  }),
];

const MAX_HEADER_SUGGESTIONS = 6;
const EMPTY_PREDICTIVE_RESULT = getEmptyPredictiveSearchResult();

function buildHeaderSuggestionItems(items, term) {
  if (!items) return [];

  const normalizedTerm = term?.trim() ?? '';
  const suggestions = [];

  const pushSuggestion = (key, label, href) => {
    if (!key || !label || !href) return;
    suggestions.push({key, label, href});
  };

  items.queries?.forEach((suggestion) => {
    if (!suggestion?.text) return;
    pushSuggestion(
      `query-${suggestion.text}`,
      suggestion.text,
      `${SEARCH_ENDPOINT}?q=${encodeURIComponent(suggestion.text)}`,
    );
  });

  items.products?.forEach((product) => {
    if (!product?.handle) return;
    const href = urlWithTrackingParams({
      baseUrl: `/products/${product.handle}`,
      trackingParams: product.trackingParameters,
      term: normalizedTerm || product.title || '',
    });
    pushSuggestion(product.id, product.title, href);
  });

  items.collections?.forEach((collection) => {
    if (!collection?.handle) return;
    const href = urlWithTrackingParams({
      baseUrl: `/collections/${collection.handle}`,
      trackingParams: collection.trackingParameters,
      term: normalizedTerm || collection.title || '',
    });
    pushSuggestion(collection.id, collection.title, href);
  });

  items.pages?.forEach((page) => {
    if (!page?.handle) return;
    const href = urlWithTrackingParams({
      baseUrl: `/pages/${page.handle}`,
      trackingParams: page.trackingParameters,
      term: normalizedTerm || page.title || '',
    });
    pushSuggestion(page.id, page.title, href);
  });

  items.articles?.forEach((article) => {
    const blogHandle = article?.blog?.handle;
    if (!article?.handle || !blogHandle) return;
    const href = urlWithTrackingParams({
      baseUrl: `/blogs/${blogHandle}/${article.handle}`,
      trackingParams: article.trackingParameters,
      term: normalizedTerm || article.title || '',
    });
    pushSuggestion(article.id, article.title, href);
  });

  return suggestions.slice(0, MAX_HEADER_SUGGESTIONS);
}

export function HeaderSearchContent({
  query,
  setQuery,
  activeLabel,
  setActiveLabel,
  inputRef,
  handleClear,
  closeSearch,
  isShowingRecommendations,
  productsToRender,
}) {

  const handlePopularTermClick = useCallback(
    (term, submitPredictiveQuery) => {
      setQuery(term);
      setActiveLabel(term);
      submitPredictiveQuery(term);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    },
    [inputRef, setActiveLabel, setQuery],
  );

  return (
    <SearchFormPredictive id="headerForm" className="header-search-form">
      {({fetchResults, goToSearch, inputRef: predictiveInputRef, fetcher}) => {
        const submitPredictiveQuery = (value) => {
          fetcher.submit(
            {q: value || '', limit: 10, predictive: true},
            {method: 'GET', action: SEARCH_ENDPOINT},
          );
        };


        const handleInputChange = (event) => {
          const newValue = event.target.value;
          setQuery(newValue);

          fetchResults(event);
        };

        const handleInputKeyDown = (event) => {
          if (event.key !== 'Enter') return;
          event.preventDefault();
          const searchTerm = event.currentTarget.value.trim();
          if (!searchTerm) return;

          goToSearch();
          closeSearch();
        };

        const assignInputRef = (node) => {
          if (predictiveInputRef) {
            predictiveInputRef.current = node;
          }
          inputRef.current = node;
        };

        const predictiveResult =
          fetcher?.data?.result ?? EMPTY_PREDICTIVE_RESULT;
        const predictiveItems =
          predictiveResult.items ?? EMPTY_PREDICTIVE_RESULT.items;
        const suggestionItems = isShowingRecommendations
          ? buildHeaderSuggestionItems(predictiveItems, query)
          : [];
        const isLoadingSuggestions = fetcher?.state === 'loading';

        return (
          <>
            <div className="search-box-inner">
              <span className="search-btns" aria-hidden="true">
                <SearchMobileIcon />
              </span>
              <input
                id="headerSearch"
                type="search"
                name="query"
                placeholder="Search vaporesso.com"
                autoComplete="off"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                ref={assignInputRef}
              />
              <button
                type="button"
                className="search-clear"
                aria-label="Clear search"
                style={query ? undefined : {display: 'none'}}
                onClick={() => {
                  handleClear();
                  requestAnimationFrame(() => {
                    inputRef.current?.focus();
                  });
                }}
              />
              <button
                type="button"
                className="search-close f-d-bold x-hide"
                onClick={closeSearch}
              >
                Cancel
              </button>
              <button
                type="button"
                className="search-close s-hide"
                onClick={closeSearch}
                aria-label="Close search"
              >
                <CloseIcon />
              </button>
            </div>
            <div
              className="pop-list"
              style={{
                display: isShowingRecommendations ? 'none' : 'block',
              }}
            >
              <div className="label">
                {POPULAR_SEARCH_TERMS.map((term) => (
                  <button
                    type="button"
                    key={term}
                    className={`item f_12 notranslate${
                      activeLabel === term ? ' active' : ''
                    }`}
                    onClick={() =>
                      handlePopularTermClick(term, submitPredictiveQuery)
                    }
                  >
                    {term}
                  </button>
                ))}
              </div>
              <h3 className="f_13 mb_20">Popular Products</h3>
              <ul className="pro" id="popList">
                {productsToRender.map(({product, href}) => {
                  if (!product) return null;
                  const targetHref = href ?? `/products/${product.handle}`;
                  return (
                    <li key={product.id} className="f_13">
                      <a
                        href={targetHref}
                        aria-label={product.title}
                        onClick={closeSearch}
                      >
                        <ProductCard product={product} type="small" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <ul
              className="rec-list"
              style={{
                display: isShowingRecommendations ? 'flex' : 'none',
              }}
            >
              <p className="f_12">Suggested results</p>
              <div id="recList" className="content">
                {isLoadingSuggestions ? (
                  <li className="f_17 f-d-bold notranslate">Searching…</li>
                ) : suggestionItems.length ? (
                  suggestionItems.map((item) => (
                    <li key={item.key} className="f_17 f-d-bold notranslate">
                      <a href={item.href} onClick={closeSearch}>
                        {item.label}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="f_17 f-d-bold notranslate">
                    No matching results
                  </li>
                )}
              </div>
            </ul>
          </>
        );
      }}
    </SearchFormPredictive>
  );
}
