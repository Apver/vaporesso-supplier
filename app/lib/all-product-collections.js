import {getShopifyLanguageCode} from '~/lib/i18n';

export const ALL_PRODUCT_PAGE_HANDLE = 'all-products';

export const ALL_PRODUCT_PAGE_METAFIELD_IDENTIFIERS = [
  {namespace: 'custom', key: 'collections'},
];

export const ALL_PRODUCT_METAFIELD_IDENTIFIERS = [
  {namespace: 'custom', key: 'highlight'},
  {namespace: 'custom', key: 'new'},
  {namespace: 'custom', key: 'hot'},
  {namespace: 'custom', key: 'recommend'},
];

const PAGE_QUERY = `#graphql
  query AllProductCollectionsPage(
    $handle: String!
    $identifiers: [HasMetafieldsIdentifier!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    page(handle: $handle) {
      metafields(identifiers: $identifiers) {
        namespace
        key
        value
        references(first: 50) {
          nodes {
            __typename
            ... on Collection {
              id
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_HIGHLIGHTS_FRAGMENT = `#graphql
  fragment ProductHighlightItem on Product {
    id
    handle
    title
    featuredImage {
      url
      altText
      width
      height
    }
    metafields(identifiers: $productMetafieldIdentifiers) {
      namespace
      key
      value
      type
    }
  }
`;

const COLLECTIONS_WITH_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_HIGHLIGHTS_FRAGMENT}
  query CollectionsWithProducts(
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
        image {
          url
          altText
          width
          height
        }
        products(first: 80) {
          nodes {
            ...ProductHighlightItem
          }
        }
      }
    }
  }
`;

function parseHighlights(product) {
  const meta = product?.metafields?.find(
    (m) => m?.namespace === 'custom' && m?.key === 'highlight',
  );
  if (!meta?.value) return [];
  try {
    const parsed = JSON.parse(meta.value);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function getCollectionIds(page) {
  const collectionsMeta = page?.metafields?.find(
    (meta) => meta?.namespace === 'custom' && meta?.key === 'collections',
  );
  const collectionRefs =
    collectionsMeta?.references?.nodes?.filter(
      (ref) => ref?.__typename === 'Collection',
    ) ?? [];
  const parsedFromValue = (() => {
    if (!collectionsMeta?.value) return [];
    try {
      const parsed = JSON.parse(collectionsMeta.value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  return collectionRefs.map((c) => c.id).filter(Boolean) || parsedFromValue;
}

/**
 * @param {{ storefront: import('@shopify/hydrogen').Storefront; locale?: string }} args
 */
export async function loadAllProductCollections({storefront, locale}) {
  const language = getShopifyLanguageCode(locale, storefront.i18n.language);
  const country = storefront.i18n.country;

  const {page} = await storefront.query(PAGE_QUERY, {
    cache: storefront.CacheNone(),
    variables: {
      handle: ALL_PRODUCT_PAGE_HANDLE,
      identifiers: ALL_PRODUCT_PAGE_METAFIELD_IDENTIFIERS,
      language,
      country,
    },
  });

  const collectionIds = getCollectionIds(page);
  if (!collectionIds.length) return [];

  const {nodes} = await storefront.query(COLLECTIONS_WITH_PRODUCTS_QUERY, {
    cache: storefront.CacheNone(),
    variables: {
      ids: collectionIds,
      productMetafieldIdentifiers: ALL_PRODUCT_METAFIELD_IDENTIFIERS,
      language,
      country,
    },
  });

  return (
    nodes
      ?.filter((node) => node?.__typename === 'Collection')
      ?.map((collection) => ({
        id: collection.id,
        handle: collection.handle,
        title: collection.title,
        image: collection.image,
        products:
          collection.products?.nodes?.map((product) => ({
            ...product,
            highlights: parseHighlights(product),
          })) || [],
      })) ?? []
  );
}

export function buildProductImageMap(collections = []) {
  /** @type {Record<string, string>} */
  const map = {};

  for (const collection of collections) {
    for (const product of collection.products || []) {
      const key = normalizeProductName(product.title);
      const url = product.featuredImage?.url;
      if (key && url && !map[key]) {
        map[key] = url;
      }
    }
  }

  return map;
}

export function normalizeProductName(name) {
  if (typeof name !== 'string') return '';
  return name
    .replace(/&nbsp;/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}
