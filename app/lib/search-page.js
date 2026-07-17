import {DOWNLOAD_ITEMS} from '~/data/download-manuals-downloads';
import {normalizeProductName} from '~/lib/all-product-collections';

export const SEARCH_PAGE_SIZE = 20;

export const SEARCH_TABS = [
  {id: 'all', label: 'All'},
  {id: 'products', label: 'Product'},
  {id: 'news', label: 'News'},
];

/**
 * @param {Array<Record<string, unknown>>} products
 * @param {Array<Record<string, unknown>>} stores
 * @param {Record<string, string>} [productImageMap]
 */
export function mergeSearchProducts(products, stores, productImageMap = {}) {
  return products.map((item) => {
    const download = DOWNLOAD_ITEMS.find((entry) => entry.name === item.name);
    const store = stores.find((entry) => entry.name === item.name);
    const imageKey = normalizeProductName(item.name);
    const shopifyImgUrl = productImageMap[imageKey];

    return {
      ...item,
      imgUrl: shopifyImgUrl || '',
      downUrl: download?.manual || item.downUrl,
      storeUrl: store?.storeUrl || 'https://store.vaporesso.com/',
    };
  });
}

/**
 * @param {Array<Record<string, unknown>>} list
 * @param {string} query
 */
export function filterSearchItems(list, query) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const reg = new RegExp(trimmed, 'i');
  return list.filter((item) => reg.test(String(item.name || item.title || '')));
}

/**
 * @param {string} text
 * @param {string} query
 * @returns {Array<{highlight: boolean, text: string}>}
 */
export function splitHighlightedText(text, query) {
  if (!text || !query) return [{highlight: false, text: String(text || '')}];

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = String(text).split(new RegExp(`(${escaped})`, 'gi'));

  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      highlight: part.toLowerCase() === query.toLowerCase(),
      text: part,
    }));
}

/**
 * @param {'all' | 'products' | 'news'} tab
 * @param {Array<Record<string, unknown>>} products
 * @param {Array<Record<string, unknown>>} news
 */
export function getSearchTabList(tab, products, news) {
  if (tab === 'news') return news;
  if (tab === 'products') return products;
  return products.concat(news);
}
