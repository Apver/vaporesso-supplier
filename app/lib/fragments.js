// NOTE: https://shopify.dev/docs/api/storefront/latest/queries/cart
export const CART_QUERY_FRAGMENT = `#graphql
  fragment Money on MoneyV2 {
    currencyCode
    amount
  }
  fragment CartLine on CartLine {
    id
    quantity
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        ...Money
      }
      amountPerQuantity {
        ...Money
      }
      compareAtAmountPerQuantity {
        ...Money
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        availableForSale
        compareAtPrice {
          ...Money
        }
        price {
          ...Money
        }
        requiresShipping
        title
        image {
          id
          url
          altText
          width
          height

        }
        product {
          handle
          title
          id
          vendor
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  fragment CartLineComponent on ComponentizableCartLine {
    id
    quantity
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        ...Money
      }
      amountPerQuantity {
        ...Money
      }
      compareAtAmountPerQuantity {
        ...Money
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        availableForSale
        compareAtPrice {
          ...Money
        }
        price {
          ...Money
        }
        requiresShipping
        title
        image {
          id
          url
          altText
          width
          height
        }
        product {
          handle
          title
          id
          vendor
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  fragment CartApiQuery on Cart {
    updatedAt
    id
    appliedGiftCards {
      id
      lastCharacters
      amountUsed {
        ...Money
      }
    }
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: $numCartLines) {
      nodes {
        ...CartLine
      }
      nodes {
        ...CartLineComponent
      }
    }
    cost {
      subtotalAmount {
        ...Money
      }
      totalAmount {
        ...Money
      }
      totalDutyAmount {
        ...Money
      }
      totalTaxAmount {
        ...Money
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
      applicable
    }
  }
`;

const METAFIELD_FRAGMENT = `#graphql
  fragment Metafield on Metafield {
    id
    namespace
    key
    value
    type
    description
    reference {
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
`;

const MENU_FRAGMENT = `#graphql
  fragment MenuItem on MenuItem {
    id

    resource {
      __typename
      ... on Product {
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
          ...Metafield
        }
      }
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
        metafields(identifiers: $collectionMetafieldIdentifiers) {
          ...Metafield
        }
      }
      ... on Page {
        id
        handle
        title
      }
    }
    resourceId
    tags
    title
    type
    url
  }
  fragment GrandChildMenuItem on MenuItem {
    ...MenuItem
    items {
      ...MenuItem
    }
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
    items {
      ...GrandChildMenuItem
    }
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    handle
    title
    items {
      ...ParentMenuItem
    }
  }
`;

export const HEADER_QUERY = `#graphql
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  query Header(
    $country: CountryCode
    $headerMenuHandle: String!
    $language: LanguageCode
    $productMetafieldIdentifiers: [HasMetafieldsIdentifier!] = []
    $collectionMetafieldIdentifiers: [HasMetafieldsIdentifier!] = []
  ) @inContext(language: $language, country: $country) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
  }
  ${METAFIELD_FRAGMENT}
  ${MENU_FRAGMENT}
`;

export const FOOTER_QUERY = `#graphql
  query Footer(
    $country: CountryCode
    $footerMenuHandle: String!
    $language: LanguageCode
    $productMetafieldIdentifiers: [HasMetafieldsIdentifier!] = []
    $collectionMetafieldIdentifiers: [HasMetafieldsIdentifier!] = []
  ) @inContext(language: $language, country: $country) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  ${METAFIELD_FRAGMENT}
  ${MENU_FRAGMENT}
`;

const SHOP_METAFIELD_FRAGMENT = `#graphql
  fragment ShopMetafield on Metafield {
    id
    namespace
    key
    value
    type
    description
    reference {
      ... on MediaImage {
        id
        image {
          url
          altText
          width
          height
        }
      }
      ... on GenericFile {
        id
        mimeType
        originalFileSize
        url
        previewImage {
          url
          altText
        }
      }
      ... on Metaobject {
        id
        type
        handle
        fields {
          key
          type
          value
          reference {
            ... on Product {
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
                ...Metafield
              }
            }
            ... on MediaImage {
              id
              image {
                url
                altText
                width
                height
              }
            }
            ... on GenericFile {
              id
              mimeType
              originalFileSize
              url
              previewImage {
                url
                altText
              }
            }
          }
          references(first: 50) {
            nodes {
              ... on Product {
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
                  ...Metafield
                }
              }
              ... on MediaImage {
                id
                image {
                  url
                  altText
                  width
                  height
                }
              }
              ... on GenericFile {
                id
                mimeType
                originalFileSize
                url
                previewImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
    references(first: 50) {
      nodes {
        ... on Product {
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
            ...Metafield
          }
        }
        ... on Metaobject {
          id
          type
          handle
          fields {
            key
            type
            value
            reference {
              ... on Product {
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
                  ...Metafield
                }
              }
              ... on MediaImage {
                id
                image {
                  url
                  altText
                  width
                  height
                }
              }
              ... on GenericFile {
                id
                mimeType
                originalFileSize
                url
                previewImage {
                  url
                  altText
                }
              }
            }
            references(first: 50) {
              nodes {
                ... on Product {
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
                    ...Metafield
                  }
                }
                ... on MediaImage {
                  id
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
                ... on GenericFile {
                  id
                  mimeType
                  originalFileSize
                  url
                  previewImage {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SHOP_QUERY = `#graphql
  query Shop(
    $country: CountryCode
    $language: LanguageCode
    $identifiers: [HasMetafieldsIdentifier!]!
    $productMetafieldIdentifiers: [HasMetafieldsIdentifier!] = []
  ) @inContext(language: $language, country: $country) {
    shop {
      id
      name
      metafields(identifiers: $identifiers) {
        ...ShopMetafield
      }
    }
  }
  ${SHOP_METAFIELD_FRAGMENT}
  ${METAFIELD_FRAGMENT}
`;
