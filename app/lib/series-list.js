/**
 * 系列列表页顶部分类 collection（/series-product/pod 等）。
 * 与子系列 collection（如 luxe-x-series）不同；产品需同时归属分类与子系列。
 */
export const SERIES_LIST_CATEGORY_COLLECTION_HANDLES = new Set([
  'platform',
  'pod',
  'pod-mod',
  'tank-mod',
  'pen-style',
]);

/**
 * 分类页子系列覆盖（共享子系列无法为不同父系列单独配置 Shopify 元字段时使用）。
 * 结构：{ [pageHandle]: { [seriesHandle]: { img?, enableWhiteColor?, layoutVariant? } } }
 */
const SERIES_CATEGORY_OVERRIDES = {
  'pod-mod': {
    'luxe-x-series': {
      img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe-xr-max-2-nav_1.webp?v=1783301570',
      enableWhiteColor: true,
    },
  },
  'tank-mod': {
    'gen-series': {
      img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/gen-max_a98876b3-ac61-405d-9927-458a767bedb3.png?v=1783308220',
      enableWhiteColor: false,
      layoutVariant: 'layout3',
    },
  },
};

/**
 * @param {Array<{handle?: string, img?: string, enableWhiteColor?: boolean, layoutVariant?: string}>} seriesList
 * @param {string} pageCollectionHandle
 */
export function applySeriesCategoryOverrides(seriesList, pageCollectionHandle) {
  const overrides = SERIES_CATEGORY_OVERRIDES[pageCollectionHandle];
  if (!overrides) return seriesList;

  return seriesList.map((series) => {
    const override = overrides[series.handle];
    if (!override) return series;

    return {
      ...series,
      ...(override.img ? {img: override.img} : {}),
      ...(override.enableWhiteColor != null
        ? {enableWhiteColor: override.enableWhiteColor}
        : {}),
      ...(override.layoutVariant ? {layoutVariant: override.layoutVariant} : {}),
    };
  });
}

/** @param {Record<string, unknown> | null | undefined} product */
export function getProductCollectionHandles(product) {
  const nodes = product?.collections?.nodes;
  if (!Array.isArray(nodes)) return [];
  return nodes.map((node) => node?.handle).filter(Boolean);
}

/**
 * 判断产品是否属于当前分类列表页（如 pod / pod-mod）。
 * @param {Record<string, unknown> | null | undefined} product
 * @param {string} categoryHandle
 */
export function productBelongsToCategoryPage(product, categoryHandle) {
  return getProductCollectionHandles(product).includes(categoryHandle);
}

/**
 * 在分类列表页按产品所属分类 collection 过滤各子系列商品。
 * 非分类页（无重叠子系列场景）原样返回。
 *
 * @param {Array<{products?: unknown[]}>} seriesList
 * @param {string} pageCollectionHandle — 当前 /series-product/:handle
 */
export function filterSeriesListByCategoryPage(seriesList, pageCollectionHandle) {
  if (!SERIES_LIST_CATEGORY_COLLECTION_HANDLES.has(pageCollectionHandle)) {
    return seriesList;
  }

  return seriesList
    .map((series) => ({
      ...series,
      products: (series.products ?? []).filter((product) =>
        productBelongsToCategoryPage(product, pageCollectionHandle),
      ),
    }))
    .filter((series) => series.products.length > 0);
}
