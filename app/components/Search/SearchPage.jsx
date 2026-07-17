import {SearchResultSection} from '~/components/Search/SearchResultSection';

/**
 * @param {{productImageMap?: Record<string, string>}}
 */
export function SearchPage({productImageMap = {}}) {
  return (
    <div className="search">
      <SearchResultSection productImageMap={productImageMap} />
    </div>
  );
}
