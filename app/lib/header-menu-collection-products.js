import {filterSeriesListByCategoryPage} from '~/lib/series-list';

/** 下拉菜单从 collection 动态拉取产品的分类（不依赖 Navigation 子项配置） */
export const HEADER_MENU_DYNAMIC_PRODUCT_CATEGORIES = ['pen-style'];

const COLLECTION_METAFIELD_IDENTIFIERS = [
  {namespace: 'custom', key: 'subcollections'},
];

const PRODUCT_METAFIELD_IDENTIFIERS = [
  {namespace: 'custom', key: 'newimg'},
  {namespace: 'custom', key: 'newdesc'},
];

const HEADER_MENU_PRODUCT_FRAGMENT = `#graphql
  fragment HeaderMenuProduct on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    metafields(identifiers: $productMetafieldIdentifiers) {
      namespace
      key
      value
      type
      reference {
        __typename
        ... on MediaImage {
          id
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    collections(first: 20) {
      nodes {
        handle
      }
    }
  }
`;

const HEADER_MENU_CATEGORY_COLLECTION_QUERY = `#graphql
  query HeaderMenuCategoryCollection(
    $handle: String!
    $collectionMetafieldIdentifiers: [HasMetafieldsIdentifier!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      metafields(identifiers: $collectionMetafieldIdentifiers) {
        namespace
        key
        value
      }
    }
  }
`;

const HEADER_MENU_SUB_COLLECTIONS_QUERY = `#graphql
  ${HEADER_MENU_PRODUCT_FRAGMENT}
  query HeaderMenuSubCollections(
    $ids: [ID!]!
    $productMetafieldIdentifiers: [HasMetafieldsIdentifier!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    nodes(ids: $ids) {
      __typename
      ... on Collection {
        id
        handle
        title
        products(first: 50, sortKey: MANUAL) {
          nodes {
            ...HeaderMenuProduct
          }
        }
      }
    }
  }
`;

/**
 * @param {unknown} metafield
 * @returns {string[]}
 */
function parseSubCollectionIds(metafield) {
  if (!metafield?.value) return [];

  try {
    const parsed = JSON.parse(metafield.value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * @param {Record<string, unknown>} product
 * @param {string} seriesHandle
 */
export function buildHeaderMenuProductItem(product, seriesHandle) {
  return {
    id: `header-menu-product-${product.id}`,
    title: product.title,
    url: `/series-product/${seriesHandle}/${product.handle}`,
    resource: {
      __typename: 'Product',
      ...product,
    },
  };
}

/**
 * @param {Record<string, unknown>} menuChild
 * @param {string | null | undefined} parentCategoryHandle
 * @param {Record<string, Array<Record<string, unknown>>> | null | undefined} headerMenuCollectionProducts
 */
export function getMegaMenuChildItems(
  menuChild,
  parentCategoryHandle,
  headerMenuCollectionProducts,
) {
  const dynamicItems =
    parentCategoryHandle &&
    headerMenuCollectionProducts?.[parentCategoryHandle];

  if (dynamicItems?.length) {
    return dynamicItems;
  }

  return menuChild?.items ?? [];
}

/**
 * @param {import('@shopify/hydrogen').Storefront} storefront
 * @param {string} categoryHandle
 * @param {{language: string; country: string}} context
 */
async function fetchCategoryMegaMenuProducts(
  storefront,
  categoryHandle,
  {language, country},
) {
  const {collection} = await storefront.query(
    HEADER_MENU_CATEGORY_COLLECTION_QUERY,
    {
      cache: storefront.CacheNone(),
      variables: {
        handle: categoryHandle,
        collectionMetafieldIdentifiers: COLLECTION_METAFIELD_IDENTIFIERS,
        language,
        country,
      },
    },
  );

  if (!collection) return [];

  const subCollectionIds = parseSubCollectionIds(
    collection.metafields?.find(
      (metafield) =>
        metafield?.namespace === 'custom' &&
        metafield?.key === 'subcollections',
    ),
  );

  if (!subCollectionIds.length) return [];

  const {nodes} = await storefront.query(HEADER_MENU_SUB_COLLECTIONS_QUERY, {
    cache: storefront.CacheNone(),
    variables: {
      ids: subCollectionIds,
      productMetafieldIdentifiers: PRODUCT_METAFIELD_IDENTIFIERS,
      language,
      country,
    },
  });

  const seriesList =
    nodes
      ?.filter((node) => node?.__typename === 'Collection')
      ?.map((node) => ({
        id: node.id,
        handle: node.handle,
        products: node.products?.nodes ?? [],
      })) ?? [];

  const filteredSeriesList = filterSeriesListByCategoryPage(
    seriesList,
    categoryHandle,
  );

  const seenProductIds = new Set();
  const menuItems = [];

  for (const series of filteredSeriesList) {
    for (const product of series.products ?? []) {
      if (!product?.id || seenProductIds.has(product.id)) continue;

      seenProductIds.add(product.id);
      menuItems.push(buildHeaderMenuProductItem(product, series.handle));
    }
  }

  return menuItems;
}

/**
 * @param {import('@shopify/hydrogen').Storefront} storefront
 * @param {{language: string; country: string}} context
 */
export async function loadHeaderMenuCollectionProducts(
  storefront,
  {language, country},
) {
  const entries = await Promise.all(
    HEADER_MENU_DYNAMIC_PRODUCT_CATEGORIES.map(async (categoryHandle) => {
      try {
        const items = await fetchCategoryMegaMenuProducts(
          storefront,
          categoryHandle,
          {language, country},
        );
        return [categoryHandle, items];
      } catch (error) {
        console.error(
          `Failed to load header menu products for ${categoryHandle}`,
          error,
        );
        return [categoryHandle, []];
      }
    }),
  );

  return Object.fromEntries(entries);
}
