/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type AllProductCollectionsPageQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  identifiers:
    | Array<StorefrontAPI.HasMetafieldsIdentifier>
    | StorefrontAPI.HasMetafieldsIdentifier;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type AllProductCollectionsPageQuery = {
  page?: StorefrontAPI.Maybe<{
    metafields: Array<
      StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'namespace' | 'key' | 'value'> & {
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              | ({__typename: 'Collection'} & Pick<
                  StorefrontAPI.Collection,
                  'id'
                >)
              | {
                  __typename:
                    | 'GenericFile'
                    | 'MediaImage'
                    | 'Metaobject'
                    | 'Model3d'
                    | 'Page'
                    | 'Product'
                    | 'ProductVariant'
                    | 'Video';
                }
            >;
          }>;
        }
      >
    >;
  }>;
};

export type ProductHighlightItemFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title'
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
  >;
  metafields: Array<
    StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metafield, 'namespace' | 'key' | 'value' | 'type'>
    >
  >;
};

export type CollectionsWithProductsQueryVariables = StorefrontAPI.Exact<{
  ids:
    | Array<StorefrontAPI.Scalars['ID']['input']>
    | StorefrontAPI.Scalars['ID']['input'];
  productMetafieldIdentifiers:
    | Array<StorefrontAPI.HasMetafieldsIdentifier>
    | StorefrontAPI.HasMetafieldsIdentifier;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CollectionsWithProductsQuery = {
  nodes: Array<
    StorefrontAPI.Maybe<
      | {
          __typename:
            | 'AppliedGiftCard'
            | 'Article'
            | 'Blog'
            | 'Cart'
            | 'CartLine'
            | 'Comment'
            | 'Company'
            | 'CompanyContact'
            | 'CompanyLocation'
            | 'ComponentizableCartLine'
            | 'ExternalVideo'
            | 'GenericFile'
            | 'Location'
            | 'MailingAddress'
            | 'Market'
            | 'MediaImage'
            | 'MediaPresentation'
            | 'Menu'
            | 'MenuItem'
            | 'Metafield';
        }
      | {
          __typename:
            | 'Metaobject'
            | 'Model3d'
            | 'Order'
            | 'Page'
            | 'Product'
            | 'ProductOption'
            | 'ProductOptionValue'
            | 'ProductVariant'
            | 'Shop'
            | 'ShopPayInstallmentsFinancingPlan'
            | 'ShopPayInstallmentsFinancingPlanTerm'
            | 'ShopPayInstallmentsProductVariantPricing'
            | 'ShopPolicy'
            | 'TaxonomyCategory'
            | 'UrlRedirect'
            | 'Video';
        }
      | ({__typename: 'Collection'} & Pick<
          StorefrontAPI.Collection,
          'id' | 'handle' | 'title'
        > & {
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
            >;
            products: {
              nodes: Array<
                Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        'namespace' | 'key' | 'value' | 'type'
                      >
                    >
                  >;
                }
              >;
            };
          })
    >
  >;
};

export type MoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'currencyCode' | 'amount'
>;

export type CartLineFragment = Pick<
  StorefrontAPI.CartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
};

export type CartLineComponentFragment = Pick<
  StorefrontAPI.ComponentizableCartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  'updatedAt' | 'id' | 'checkoutUrl' | 'totalQuantity' | 'note'
> & {
  appliedGiftCards: Array<
    Pick<StorefrontAPI.AppliedGiftCard, 'id' | 'lastCharacters'> & {
      amountUsed: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    }
  >;
  buyerIdentity: Pick<
    StorefrontAPI.CartBuyerIdentity,
    'countryCode' | 'email' | 'phone'
  > & {
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'id' | 'email' | 'firstName' | 'lastName' | 'displayName'
      >
    >;
  };
  lines: {
    nodes: Array<
      | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
        })
      | (Pick<StorefrontAPI.ComponentizableCartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
        })
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalDutyAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    totalTaxAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  discountCodes: Array<
    Pick<StorefrontAPI.CartDiscountCode, 'code' | 'applicable'>
  >;
};

export type MetafieldFragment = Pick<
  StorefrontAPI.Metafield,
  'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
> & {
  reference?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MediaImage, 'id'> & {
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
      >;
    }
  >;
};

export type MenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  resource?: StorefrontAPI.Maybe<
    | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
    | ({__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'handle' | 'title'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          metafields: Array<
            StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
              > & {
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  }
                >;
              }
            >
          >;
        })
    | ({__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'handle' | 'title'
      >)
    | ({__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        'id' | 'handle' | 'title'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          metafields: Array<
            StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
              > & {
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  }
                >;
              }
            >
          >;
        })
  >;
};

export type GrandChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      resource?: StorefrontAPI.Maybe<
        | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
        | ({__typename: 'Collection'} & Pick<
            StorefrontAPI.Collection,
            'id' | 'handle' | 'title'
          > & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              metafields: Array<
                StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    | 'id'
                    | 'namespace'
                    | 'key'
                    | 'value'
                    | 'type'
                    | 'description'
                  > & {
                    reference?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    >;
                  }
                >
              >;
            })
        | ({__typename: 'Page'} & Pick<
            StorefrontAPI.Page,
            'id' | 'handle' | 'title'
          >)
        | ({__typename: 'Product'} & Pick<
            StorefrontAPI.Product,
            'id' | 'handle' | 'title'
          > & {
              featuredImage?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              metafields: Array<
                StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    | 'id'
                    | 'namespace'
                    | 'key'
                    | 'value'
                    | 'type'
                    | 'description'
                  > & {
                    reference?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    >;
                  }
                >
              >;
            })
      >;
    }
  >;
  resource?: StorefrontAPI.Maybe<
    | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
    | ({__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'handle' | 'title'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          metafields: Array<
            StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
              > & {
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  }
                >;
              }
            >
          >;
        })
    | ({__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'handle' | 'title'
      >)
    | ({__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        'id' | 'handle' | 'title'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          metafields: Array<
            StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
              > & {
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  }
                >;
              }
            >
          >;
        })
  >;
};

export type ChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          resource?: StorefrontAPI.Maybe<
            | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
            | ({__typename: 'Collection'} & Pick<
                StorefrontAPI.Collection,
                'id' | 'handle' | 'title'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
            | ({__typename: 'Page'} & Pick<
                StorefrontAPI.Page,
                'id' | 'handle' | 'title'
              >)
            | ({__typename: 'Product'} & Pick<
                StorefrontAPI.Product,
                'id' | 'handle' | 'title'
              > & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
          >;
        }
      >;
      resource?: StorefrontAPI.Maybe<
        | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
        | ({__typename: 'Collection'} & Pick<
            StorefrontAPI.Collection,
            'id' | 'handle' | 'title'
          > & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              metafields: Array<
                StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    | 'id'
                    | 'namespace'
                    | 'key'
                    | 'value'
                    | 'type'
                    | 'description'
                  > & {
                    reference?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    >;
                  }
                >
              >;
            })
        | ({__typename: 'Page'} & Pick<
            StorefrontAPI.Page,
            'id' | 'handle' | 'title'
          >)
        | ({__typename: 'Product'} & Pick<
            StorefrontAPI.Product,
            'id' | 'handle' | 'title'
          > & {
              featuredImage?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              metafields: Array<
                StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    | 'id'
                    | 'namespace'
                    | 'key'
                    | 'value'
                    | 'type'
                    | 'description'
                  > & {
                    reference?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    >;
                  }
                >
              >;
            })
      >;
    }
  >;
  resource?: StorefrontAPI.Maybe<
    | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
    | ({__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'handle' | 'title'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          metafields: Array<
            StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
              > & {
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  }
                >;
              }
            >
          >;
        })
    | ({__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'handle' | 'title'
      >)
    | ({__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        'id' | 'handle' | 'title'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          metafields: Array<
            StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
              > & {
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  }
                >;
              }
            >
          >;
        })
  >;
};

export type ParentMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            > & {
              resource?: StorefrontAPI.Maybe<
                | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
                | ({__typename: 'Collection'} & Pick<
                    StorefrontAPI.Collection,
                    'id' | 'handle' | 'title'
                  > & {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      metafields: Array<
                        StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Metafield,
                            | 'id'
                            | 'namespace'
                            | 'key'
                            | 'value'
                            | 'type'
                            | 'description'
                          > & {
                            reference?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MediaImage, 'id'> & {
                                image?: StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Image,
                                    'url' | 'altText' | 'width' | 'height'
                                  >
                                >;
                              }
                            >;
                          }
                        >
                      >;
                    })
                | ({__typename: 'Page'} & Pick<
                    StorefrontAPI.Page,
                    'id' | 'handle' | 'title'
                  >)
                | ({__typename: 'Product'} & Pick<
                    StorefrontAPI.Product,
                    'id' | 'handle' | 'title'
                  > & {
                      featuredImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      metafields: Array<
                        StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Metafield,
                            | 'id'
                            | 'namespace'
                            | 'key'
                            | 'value'
                            | 'type'
                            | 'description'
                          > & {
                            reference?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MediaImage, 'id'> & {
                                image?: StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Image,
                                    'url' | 'altText' | 'width' | 'height'
                                  >
                                >;
                              }
                            >;
                          }
                        >
                      >;
                    })
              >;
            }
          >;
          resource?: StorefrontAPI.Maybe<
            | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
            | ({__typename: 'Collection'} & Pick<
                StorefrontAPI.Collection,
                'id' | 'handle' | 'title'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
            | ({__typename: 'Page'} & Pick<
                StorefrontAPI.Page,
                'id' | 'handle' | 'title'
              >)
            | ({__typename: 'Product'} & Pick<
                StorefrontAPI.Product,
                'id' | 'handle' | 'title'
              > & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
          >;
        }
      >;
      resource?: StorefrontAPI.Maybe<
        | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
        | ({__typename: 'Collection'} & Pick<
            StorefrontAPI.Collection,
            'id' | 'handle' | 'title'
          > & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              metafields: Array<
                StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    | 'id'
                    | 'namespace'
                    | 'key'
                    | 'value'
                    | 'type'
                    | 'description'
                  > & {
                    reference?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    >;
                  }
                >
              >;
            })
        | ({__typename: 'Page'} & Pick<
            StorefrontAPI.Page,
            'id' | 'handle' | 'title'
          >)
        | ({__typename: 'Product'} & Pick<
            StorefrontAPI.Product,
            'id' | 'handle' | 'title'
          > & {
              featuredImage?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              metafields: Array<
                StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    | 'id'
                    | 'namespace'
                    | 'key'
                    | 'value'
                    | 'type'
                    | 'description'
                  > & {
                    reference?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    >;
                  }
                >
              >;
            })
      >;
    }
  >;
  resource?: StorefrontAPI.Maybe<
    | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
    | ({__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'handle' | 'title'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          metafields: Array<
            StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
              > & {
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  }
                >;
              }
            >
          >;
        })
    | ({__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'handle' | 'title'
      >)
    | ({__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        'id' | 'handle' | 'title'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          metafields: Array<
            StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
              > & {
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  }
                >;
              }
            >
          >;
        })
  >;
};

export type MenuFragment = Pick<
  StorefrontAPI.Menu,
  'id' | 'handle' | 'title'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            > & {
              items: Array<
                Pick<
                  StorefrontAPI.MenuItem,
                  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
                > & {
                  resource?: StorefrontAPI.Maybe<
                    | {
                        __typename:
                          | 'Article'
                          | 'Blog'
                          | 'Metaobject'
                          | 'ShopPolicy';
                      }
                    | ({__typename: 'Collection'} & Pick<
                        StorefrontAPI.Collection,
                        'id' | 'handle' | 'title'
                      > & {
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'url' | 'altText' | 'width' | 'height'
                            >
                          >;
                          metafields: Array<
                            StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                | 'id'
                                | 'namespace'
                                | 'key'
                                | 'value'
                                | 'type'
                                | 'description'
                              > & {
                                reference?: StorefrontAPI.Maybe<
                                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                                    image?: StorefrontAPI.Maybe<
                                      Pick<
                                        StorefrontAPI.Image,
                                        'url' | 'altText' | 'width' | 'height'
                                      >
                                    >;
                                  }
                                >;
                              }
                            >
                          >;
                        })
                    | ({__typename: 'Page'} & Pick<
                        StorefrontAPI.Page,
                        'id' | 'handle' | 'title'
                      >)
                    | ({__typename: 'Product'} & Pick<
                        StorefrontAPI.Product,
                        'id' | 'handle' | 'title'
                      > & {
                          featuredImage?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'url' | 'altText' | 'width' | 'height'
                            >
                          >;
                          metafields: Array<
                            StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                | 'id'
                                | 'namespace'
                                | 'key'
                                | 'value'
                                | 'type'
                                | 'description'
                              > & {
                                reference?: StorefrontAPI.Maybe<
                                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                                    image?: StorefrontAPI.Maybe<
                                      Pick<
                                        StorefrontAPI.Image,
                                        'url' | 'altText' | 'width' | 'height'
                                      >
                                    >;
                                  }
                                >;
                              }
                            >
                          >;
                        })
                  >;
                }
              >;
              resource?: StorefrontAPI.Maybe<
                | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
                | ({__typename: 'Collection'} & Pick<
                    StorefrontAPI.Collection,
                    'id' | 'handle' | 'title'
                  > & {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      metafields: Array<
                        StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Metafield,
                            | 'id'
                            | 'namespace'
                            | 'key'
                            | 'value'
                            | 'type'
                            | 'description'
                          > & {
                            reference?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MediaImage, 'id'> & {
                                image?: StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Image,
                                    'url' | 'altText' | 'width' | 'height'
                                  >
                                >;
                              }
                            >;
                          }
                        >
                      >;
                    })
                | ({__typename: 'Page'} & Pick<
                    StorefrontAPI.Page,
                    'id' | 'handle' | 'title'
                  >)
                | ({__typename: 'Product'} & Pick<
                    StorefrontAPI.Product,
                    'id' | 'handle' | 'title'
                  > & {
                      featuredImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      metafields: Array<
                        StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Metafield,
                            | 'id'
                            | 'namespace'
                            | 'key'
                            | 'value'
                            | 'type'
                            | 'description'
                          > & {
                            reference?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MediaImage, 'id'> & {
                                image?: StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Image,
                                    'url' | 'altText' | 'width' | 'height'
                                  >
                                >;
                              }
                            >;
                          }
                        >
                      >;
                    })
              >;
            }
          >;
          resource?: StorefrontAPI.Maybe<
            | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
            | ({__typename: 'Collection'} & Pick<
                StorefrontAPI.Collection,
                'id' | 'handle' | 'title'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
            | ({__typename: 'Page'} & Pick<
                StorefrontAPI.Page,
                'id' | 'handle' | 'title'
              >)
            | ({__typename: 'Product'} & Pick<
                StorefrontAPI.Product,
                'id' | 'handle' | 'title'
              > & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
          >;
        }
      >;
      resource?: StorefrontAPI.Maybe<
        | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
        | ({__typename: 'Collection'} & Pick<
            StorefrontAPI.Collection,
            'id' | 'handle' | 'title'
          > & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              metafields: Array<
                StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    | 'id'
                    | 'namespace'
                    | 'key'
                    | 'value'
                    | 'type'
                    | 'description'
                  > & {
                    reference?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    >;
                  }
                >
              >;
            })
        | ({__typename: 'Page'} & Pick<
            StorefrontAPI.Page,
            'id' | 'handle' | 'title'
          >)
        | ({__typename: 'Product'} & Pick<
            StorefrontAPI.Product,
            'id' | 'handle' | 'title'
          > & {
              featuredImage?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              metafields: Array<
                StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    | 'id'
                    | 'namespace'
                    | 'key'
                    | 'value'
                    | 'type'
                    | 'description'
                  > & {
                    reference?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                      }
                    >;
                  }
                >
              >;
            })
      >;
    }
  >;
};

export type ShopFragment = Pick<
  StorefrontAPI.Shop,
  'id' | 'name' | 'description'
> & {
  primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
    }>;
  }>;
};

export type HeaderQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  headerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  productMetafieldIdentifiers?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.HasMetafieldsIdentifier>
    | StorefrontAPI.HasMetafieldsIdentifier
  >;
  collectionMetafieldIdentifiers?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.HasMetafieldsIdentifier>
    | StorefrontAPI.HasMetafieldsIdentifier
  >;
}>;

export type HeaderQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name' | 'description'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
      }>;
    }>;
  };
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id' | 'handle' | 'title'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            > & {
              items: Array<
                Pick<
                  StorefrontAPI.MenuItem,
                  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
                > & {
                  items: Array<
                    Pick<
                      StorefrontAPI.MenuItem,
                      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
                    > & {
                      resource?: StorefrontAPI.Maybe<
                        | {
                            __typename:
                              | 'Article'
                              | 'Blog'
                              | 'Metaobject'
                              | 'ShopPolicy';
                          }
                        | ({__typename: 'Collection'} & Pick<
                            StorefrontAPI.Collection,
                            'id' | 'handle' | 'title'
                          > & {
                              image?: StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Image,
                                  'url' | 'altText' | 'width' | 'height'
                                >
                              >;
                              metafields: Array<
                                StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Metafield,
                                    | 'id'
                                    | 'namespace'
                                    | 'key'
                                    | 'value'
                                    | 'type'
                                    | 'description'
                                  > & {
                                    reference?: StorefrontAPI.Maybe<
                                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                                        image?: StorefrontAPI.Maybe<
                                          Pick<
                                            StorefrontAPI.Image,
                                            | 'url'
                                            | 'altText'
                                            | 'width'
                                            | 'height'
                                          >
                                        >;
                                      }
                                    >;
                                  }
                                >
                              >;
                            })
                        | ({__typename: 'Page'} & Pick<
                            StorefrontAPI.Page,
                            'id' | 'handle' | 'title'
                          >)
                        | ({__typename: 'Product'} & Pick<
                            StorefrontAPI.Product,
                            'id' | 'handle' | 'title'
                          > & {
                              featuredImage?: StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Image,
                                  'url' | 'altText' | 'width' | 'height'
                                >
                              >;
                              metafields: Array<
                                StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Metafield,
                                    | 'id'
                                    | 'namespace'
                                    | 'key'
                                    | 'value'
                                    | 'type'
                                    | 'description'
                                  > & {
                                    reference?: StorefrontAPI.Maybe<
                                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                                        image?: StorefrontAPI.Maybe<
                                          Pick<
                                            StorefrontAPI.Image,
                                            | 'url'
                                            | 'altText'
                                            | 'width'
                                            | 'height'
                                          >
                                        >;
                                      }
                                    >;
                                  }
                                >
                              >;
                            })
                      >;
                    }
                  >;
                  resource?: StorefrontAPI.Maybe<
                    | {
                        __typename:
                          | 'Article'
                          | 'Blog'
                          | 'Metaobject'
                          | 'ShopPolicy';
                      }
                    | ({__typename: 'Collection'} & Pick<
                        StorefrontAPI.Collection,
                        'id' | 'handle' | 'title'
                      > & {
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'url' | 'altText' | 'width' | 'height'
                            >
                          >;
                          metafields: Array<
                            StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                | 'id'
                                | 'namespace'
                                | 'key'
                                | 'value'
                                | 'type'
                                | 'description'
                              > & {
                                reference?: StorefrontAPI.Maybe<
                                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                                    image?: StorefrontAPI.Maybe<
                                      Pick<
                                        StorefrontAPI.Image,
                                        'url' | 'altText' | 'width' | 'height'
                                      >
                                    >;
                                  }
                                >;
                              }
                            >
                          >;
                        })
                    | ({__typename: 'Page'} & Pick<
                        StorefrontAPI.Page,
                        'id' | 'handle' | 'title'
                      >)
                    | ({__typename: 'Product'} & Pick<
                        StorefrontAPI.Product,
                        'id' | 'handle' | 'title'
                      > & {
                          featuredImage?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'url' | 'altText' | 'width' | 'height'
                            >
                          >;
                          metafields: Array<
                            StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                | 'id'
                                | 'namespace'
                                | 'key'
                                | 'value'
                                | 'type'
                                | 'description'
                              > & {
                                reference?: StorefrontAPI.Maybe<
                                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                                    image?: StorefrontAPI.Maybe<
                                      Pick<
                                        StorefrontAPI.Image,
                                        'url' | 'altText' | 'width' | 'height'
                                      >
                                    >;
                                  }
                                >;
                              }
                            >
                          >;
                        })
                  >;
                }
              >;
              resource?: StorefrontAPI.Maybe<
                | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
                | ({__typename: 'Collection'} & Pick<
                    StorefrontAPI.Collection,
                    'id' | 'handle' | 'title'
                  > & {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      metafields: Array<
                        StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Metafield,
                            | 'id'
                            | 'namespace'
                            | 'key'
                            | 'value'
                            | 'type'
                            | 'description'
                          > & {
                            reference?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MediaImage, 'id'> & {
                                image?: StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Image,
                                    'url' | 'altText' | 'width' | 'height'
                                  >
                                >;
                              }
                            >;
                          }
                        >
                      >;
                    })
                | ({__typename: 'Page'} & Pick<
                    StorefrontAPI.Page,
                    'id' | 'handle' | 'title'
                  >)
                | ({__typename: 'Product'} & Pick<
                    StorefrontAPI.Product,
                    'id' | 'handle' | 'title'
                  > & {
                      featuredImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      metafields: Array<
                        StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Metafield,
                            | 'id'
                            | 'namespace'
                            | 'key'
                            | 'value'
                            | 'type'
                            | 'description'
                          > & {
                            reference?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MediaImage, 'id'> & {
                                image?: StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Image,
                                    'url' | 'altText' | 'width' | 'height'
                                  >
                                >;
                              }
                            >;
                          }
                        >
                      >;
                    })
              >;
            }
          >;
          resource?: StorefrontAPI.Maybe<
            | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
            | ({__typename: 'Collection'} & Pick<
                StorefrontAPI.Collection,
                'id' | 'handle' | 'title'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
            | ({__typename: 'Page'} & Pick<
                StorefrontAPI.Page,
                'id' | 'handle' | 'title'
              >)
            | ({__typename: 'Product'} & Pick<
                StorefrontAPI.Product,
                'id' | 'handle' | 'title'
              > & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
          >;
        }
      >;
    }
  >;
};

export type FooterQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  footerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  productMetafieldIdentifiers?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.HasMetafieldsIdentifier>
    | StorefrontAPI.HasMetafieldsIdentifier
  >;
  collectionMetafieldIdentifiers?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.HasMetafieldsIdentifier>
    | StorefrontAPI.HasMetafieldsIdentifier
  >;
}>;

export type FooterQuery = {
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id' | 'handle' | 'title'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            > & {
              items: Array<
                Pick<
                  StorefrontAPI.MenuItem,
                  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
                > & {
                  items: Array<
                    Pick<
                      StorefrontAPI.MenuItem,
                      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
                    > & {
                      resource?: StorefrontAPI.Maybe<
                        | {
                            __typename:
                              | 'Article'
                              | 'Blog'
                              | 'Metaobject'
                              | 'ShopPolicy';
                          }
                        | ({__typename: 'Collection'} & Pick<
                            StorefrontAPI.Collection,
                            'id' | 'handle' | 'title'
                          > & {
                              image?: StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Image,
                                  'url' | 'altText' | 'width' | 'height'
                                >
                              >;
                              metafields: Array<
                                StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Metafield,
                                    | 'id'
                                    | 'namespace'
                                    | 'key'
                                    | 'value'
                                    | 'type'
                                    | 'description'
                                  > & {
                                    reference?: StorefrontAPI.Maybe<
                                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                                        image?: StorefrontAPI.Maybe<
                                          Pick<
                                            StorefrontAPI.Image,
                                            | 'url'
                                            | 'altText'
                                            | 'width'
                                            | 'height'
                                          >
                                        >;
                                      }
                                    >;
                                  }
                                >
                              >;
                            })
                        | ({__typename: 'Page'} & Pick<
                            StorefrontAPI.Page,
                            'id' | 'handle' | 'title'
                          >)
                        | ({__typename: 'Product'} & Pick<
                            StorefrontAPI.Product,
                            'id' | 'handle' | 'title'
                          > & {
                              featuredImage?: StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Image,
                                  'url' | 'altText' | 'width' | 'height'
                                >
                              >;
                              metafields: Array<
                                StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Metafield,
                                    | 'id'
                                    | 'namespace'
                                    | 'key'
                                    | 'value'
                                    | 'type'
                                    | 'description'
                                  > & {
                                    reference?: StorefrontAPI.Maybe<
                                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                                        image?: StorefrontAPI.Maybe<
                                          Pick<
                                            StorefrontAPI.Image,
                                            | 'url'
                                            | 'altText'
                                            | 'width'
                                            | 'height'
                                          >
                                        >;
                                      }
                                    >;
                                  }
                                >
                              >;
                            })
                      >;
                    }
                  >;
                  resource?: StorefrontAPI.Maybe<
                    | {
                        __typename:
                          | 'Article'
                          | 'Blog'
                          | 'Metaobject'
                          | 'ShopPolicy';
                      }
                    | ({__typename: 'Collection'} & Pick<
                        StorefrontAPI.Collection,
                        'id' | 'handle' | 'title'
                      > & {
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'url' | 'altText' | 'width' | 'height'
                            >
                          >;
                          metafields: Array<
                            StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                | 'id'
                                | 'namespace'
                                | 'key'
                                | 'value'
                                | 'type'
                                | 'description'
                              > & {
                                reference?: StorefrontAPI.Maybe<
                                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                                    image?: StorefrontAPI.Maybe<
                                      Pick<
                                        StorefrontAPI.Image,
                                        'url' | 'altText' | 'width' | 'height'
                                      >
                                    >;
                                  }
                                >;
                              }
                            >
                          >;
                        })
                    | ({__typename: 'Page'} & Pick<
                        StorefrontAPI.Page,
                        'id' | 'handle' | 'title'
                      >)
                    | ({__typename: 'Product'} & Pick<
                        StorefrontAPI.Product,
                        'id' | 'handle' | 'title'
                      > & {
                          featuredImage?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'url' | 'altText' | 'width' | 'height'
                            >
                          >;
                          metafields: Array<
                            StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                | 'id'
                                | 'namespace'
                                | 'key'
                                | 'value'
                                | 'type'
                                | 'description'
                              > & {
                                reference?: StorefrontAPI.Maybe<
                                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                                    image?: StorefrontAPI.Maybe<
                                      Pick<
                                        StorefrontAPI.Image,
                                        'url' | 'altText' | 'width' | 'height'
                                      >
                                    >;
                                  }
                                >;
                              }
                            >
                          >;
                        })
                  >;
                }
              >;
              resource?: StorefrontAPI.Maybe<
                | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
                | ({__typename: 'Collection'} & Pick<
                    StorefrontAPI.Collection,
                    'id' | 'handle' | 'title'
                  > & {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      metafields: Array<
                        StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Metafield,
                            | 'id'
                            | 'namespace'
                            | 'key'
                            | 'value'
                            | 'type'
                            | 'description'
                          > & {
                            reference?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MediaImage, 'id'> & {
                                image?: StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Image,
                                    'url' | 'altText' | 'width' | 'height'
                                  >
                                >;
                              }
                            >;
                          }
                        >
                      >;
                    })
                | ({__typename: 'Page'} & Pick<
                    StorefrontAPI.Page,
                    'id' | 'handle' | 'title'
                  >)
                | ({__typename: 'Product'} & Pick<
                    StorefrontAPI.Product,
                    'id' | 'handle' | 'title'
                  > & {
                      featuredImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      metafields: Array<
                        StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Metafield,
                            | 'id'
                            | 'namespace'
                            | 'key'
                            | 'value'
                            | 'type'
                            | 'description'
                          > & {
                            reference?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MediaImage, 'id'> & {
                                image?: StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Image,
                                    'url' | 'altText' | 'width' | 'height'
                                  >
                                >;
                              }
                            >;
                          }
                        >
                      >;
                    })
              >;
            }
          >;
          resource?: StorefrontAPI.Maybe<
            | {__typename: 'Article' | 'Blog' | 'Metaobject' | 'ShopPolicy'}
            | ({__typename: 'Collection'} & Pick<
                StorefrontAPI.Collection,
                'id' | 'handle' | 'title'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
            | ({__typename: 'Page'} & Pick<
                StorefrontAPI.Page,
                'id' | 'handle' | 'title'
              >)
            | ({__typename: 'Product'} & Pick<
                StorefrontAPI.Product,
                'id' | 'handle' | 'title'
              > & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
          >;
        }
      >;
    }
  >;
};

export type ShopMetafieldFragment = Pick<
  StorefrontAPI.Metafield,
  'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
> & {
  reference?: StorefrontAPI.Maybe<
    | (Pick<
        StorefrontAPI.GenericFile,
        'id' | 'mimeType' | 'originalFileSize' | 'url'
      > & {
        previewImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText'>
        >;
      })
    | (Pick<StorefrontAPI.MediaImage, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
      })
    | (Pick<StorefrontAPI.Metaobject, 'id' | 'type' | 'handle'> & {
        fields: Array<
          Pick<StorefrontAPI.MetaobjectField, 'key' | 'type' | 'value'> & {
            reference?: StorefrontAPI.Maybe<
              | (Pick<
                  StorefrontAPI.GenericFile,
                  'id' | 'mimeType' | 'originalFileSize' | 'url'
                > & {
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url' | 'altText'>
                  >;
                })
              | (Pick<StorefrontAPI.MediaImage, 'id'> & {
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                })
              | (Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
            >;
            references?: StorefrontAPI.Maybe<{
              nodes: Array<
                | (Pick<
                    StorefrontAPI.GenericFile,
                    'id' | 'mimeType' | 'originalFileSize' | 'url'
                  > & {
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url' | 'altText'>
                    >;
                  })
                | (Pick<StorefrontAPI.MediaImage, 'id'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  })
                | (Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
                    featuredImage?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                    metafields: Array<
                      StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Metafield,
                          | 'id'
                          | 'namespace'
                          | 'key'
                          | 'value'
                          | 'type'
                          | 'description'
                        > & {
                          reference?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MediaImage, 'id'> & {
                              image?: StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Image,
                                  'url' | 'altText' | 'width' | 'height'
                                >
                              >;
                            }
                          >;
                        }
                      >
                    >;
                  })
              >;
            }>;
          }
        >;
      })
  >;
  references?: StorefrontAPI.Maybe<{
    nodes: Array<
      | (Pick<StorefrontAPI.Metaobject, 'id' | 'type' | 'handle'> & {
          fields: Array<
            Pick<StorefrontAPI.MetaobjectField, 'key' | 'type' | 'value'> & {
              reference?: StorefrontAPI.Maybe<
                | (Pick<
                    StorefrontAPI.GenericFile,
                    'id' | 'mimeType' | 'originalFileSize' | 'url'
                  > & {
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url' | 'altText'>
                    >;
                  })
                | (Pick<StorefrontAPI.MediaImage, 'id'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  })
                | (Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
                    featuredImage?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                    metafields: Array<
                      StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Metafield,
                          | 'id'
                          | 'namespace'
                          | 'key'
                          | 'value'
                          | 'type'
                          | 'description'
                        > & {
                          reference?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MediaImage, 'id'> & {
                              image?: StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Image,
                                  'url' | 'altText' | 'width' | 'height'
                                >
                              >;
                            }
                          >;
                        }
                      >
                    >;
                  })
              >;
              references?: StorefrontAPI.Maybe<{
                nodes: Array<
                  | (Pick<
                      StorefrontAPI.GenericFile,
                      'id' | 'mimeType' | 'originalFileSize' | 'url'
                    > & {
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url' | 'altText'>
                      >;
                    })
                  | (Pick<StorefrontAPI.MediaImage, 'id'> & {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                    })
                  | (Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
                      featuredImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      metafields: Array<
                        StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Metafield,
                            | 'id'
                            | 'namespace'
                            | 'key'
                            | 'value'
                            | 'type'
                            | 'description'
                          > & {
                            reference?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MediaImage, 'id'> & {
                                image?: StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Image,
                                    'url' | 'altText' | 'width' | 'height'
                                  >
                                >;
                              }
                            >;
                          }
                        >
                      >;
                    })
                >;
              }>;
            }
          >;
        })
      | (Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          metafields: Array<
            StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
              > & {
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  }
                >;
              }
            >
          >;
        })
    >;
  }>;
};

export type ShopQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  identifiers:
    | Array<StorefrontAPI.HasMetafieldsIdentifier>
    | StorefrontAPI.HasMetafieldsIdentifier;
  productMetafieldIdentifiers?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.HasMetafieldsIdentifier>
    | StorefrontAPI.HasMetafieldsIdentifier
  >;
}>;

export type ShopQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name'> & {
    metafields: Array<
      StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.Metafield,
          'id' | 'namespace' | 'key' | 'value' | 'type' | 'description'
        > & {
          reference?: StorefrontAPI.Maybe<
            | (Pick<
                StorefrontAPI.GenericFile,
                'id' | 'mimeType' | 'originalFileSize' | 'url'
              > & {
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url' | 'altText'>
                >;
              })
            | (Pick<StorefrontAPI.MediaImage, 'id'> & {
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
              })
            | (Pick<StorefrontAPI.Metaobject, 'id' | 'type' | 'handle'> & {
                fields: Array<
                  Pick<
                    StorefrontAPI.MetaobjectField,
                    'key' | 'type' | 'value'
                  > & {
                    reference?: StorefrontAPI.Maybe<
                      | (Pick<
                          StorefrontAPI.GenericFile,
                          'id' | 'mimeType' | 'originalFileSize' | 'url'
                        > & {
                          previewImage?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.Image, 'url' | 'altText'>
                          >;
                        })
                      | (Pick<StorefrontAPI.MediaImage, 'id'> & {
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'url' | 'altText' | 'width' | 'height'
                            >
                          >;
                        })
                      | (Pick<
                          StorefrontAPI.Product,
                          'id' | 'handle' | 'title'
                        > & {
                          featuredImage?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'url' | 'altText' | 'width' | 'height'
                            >
                          >;
                          metafields: Array<
                            StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                | 'id'
                                | 'namespace'
                                | 'key'
                                | 'value'
                                | 'type'
                                | 'description'
                              > & {
                                reference?: StorefrontAPI.Maybe<
                                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                                    image?: StorefrontAPI.Maybe<
                                      Pick<
                                        StorefrontAPI.Image,
                                        'url' | 'altText' | 'width' | 'height'
                                      >
                                    >;
                                  }
                                >;
                              }
                            >
                          >;
                        })
                    >;
                    references?: StorefrontAPI.Maybe<{
                      nodes: Array<
                        | (Pick<
                            StorefrontAPI.GenericFile,
                            'id' | 'mimeType' | 'originalFileSize' | 'url'
                          > & {
                            previewImage?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.Image, 'url' | 'altText'>
                            >;
                          })
                        | (Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          })
                        | (Pick<
                            StorefrontAPI.Product,
                            'id' | 'handle' | 'title'
                          > & {
                            featuredImage?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                            metafields: Array<
                              StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Metafield,
                                  | 'id'
                                  | 'namespace'
                                  | 'key'
                                  | 'value'
                                  | 'type'
                                  | 'description'
                                > & {
                                  reference?: StorefrontAPI.Maybe<
                                    Pick<StorefrontAPI.MediaImage, 'id'> & {
                                      image?: StorefrontAPI.Maybe<
                                        Pick<
                                          StorefrontAPI.Image,
                                          'url' | 'altText' | 'width' | 'height'
                                        >
                                      >;
                                    }
                                  >;
                                }
                              >
                            >;
                          })
                      >;
                    }>;
                  }
                >;
              })
          >;
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              | (Pick<StorefrontAPI.Metaobject, 'id' | 'type' | 'handle'> & {
                  fields: Array<
                    Pick<
                      StorefrontAPI.MetaobjectField,
                      'key' | 'type' | 'value'
                    > & {
                      reference?: StorefrontAPI.Maybe<
                        | (Pick<
                            StorefrontAPI.GenericFile,
                            'id' | 'mimeType' | 'originalFileSize' | 'url'
                          > & {
                            previewImage?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.Image, 'url' | 'altText'>
                            >;
                          })
                        | (Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          })
                        | (Pick<
                            StorefrontAPI.Product,
                            'id' | 'handle' | 'title'
                          > & {
                            featuredImage?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                            metafields: Array<
                              StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Metafield,
                                  | 'id'
                                  | 'namespace'
                                  | 'key'
                                  | 'value'
                                  | 'type'
                                  | 'description'
                                > & {
                                  reference?: StorefrontAPI.Maybe<
                                    Pick<StorefrontAPI.MediaImage, 'id'> & {
                                      image?: StorefrontAPI.Maybe<
                                        Pick<
                                          StorefrontAPI.Image,
                                          'url' | 'altText' | 'width' | 'height'
                                        >
                                      >;
                                    }
                                  >;
                                }
                              >
                            >;
                          })
                      >;
                      references?: StorefrontAPI.Maybe<{
                        nodes: Array<
                          | (Pick<
                              StorefrontAPI.GenericFile,
                              'id' | 'mimeType' | 'originalFileSize' | 'url'
                            > & {
                              previewImage?: StorefrontAPI.Maybe<
                                Pick<StorefrontAPI.Image, 'url' | 'altText'>
                              >;
                            })
                          | (Pick<StorefrontAPI.MediaImage, 'id'> & {
                              image?: StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Image,
                                  'url' | 'altText' | 'width' | 'height'
                                >
                              >;
                            })
                          | (Pick<
                              StorefrontAPI.Product,
                              'id' | 'handle' | 'title'
                            > & {
                              featuredImage?: StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Image,
                                  'url' | 'altText' | 'width' | 'height'
                                >
                              >;
                              metafields: Array<
                                StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Metafield,
                                    | 'id'
                                    | 'namespace'
                                    | 'key'
                                    | 'value'
                                    | 'type'
                                    | 'description'
                                  > & {
                                    reference?: StorefrontAPI.Maybe<
                                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                                        image?: StorefrontAPI.Maybe<
                                          Pick<
                                            StorefrontAPI.Image,
                                            | 'url'
                                            | 'altText'
                                            | 'width'
                                            | 'height'
                                          >
                                        >;
                                      }
                                    >;
                                  }
                                >
                              >;
                            })
                        >;
                      }>;
                    }
                  >;
                })
              | (Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        | 'id'
                        | 'namespace'
                        | 'key'
                        | 'value'
                        | 'type'
                        | 'description'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          }
                        >;
                      }
                    >
                  >;
                })
            >;
          }>;
        }
      >
    >;
  };
};

export type HeaderMenuProductFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title'
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  metafields: Array<
    StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metafield, 'namespace' | 'key' | 'value' | 'type'> & {
        reference?: StorefrontAPI.Maybe<
          | {
              __typename:
                | 'Collection'
                | 'GenericFile'
                | 'Metaobject'
                | 'Model3d'
                | 'Page'
                | 'Product'
                | 'ProductVariant'
                | 'Video';
            }
          | ({__typename: 'MediaImage'} & Pick<
              StorefrontAPI.MediaImage,
              'id'
            > & {
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
              })
        >;
      }
    >
  >;
  collections: {nodes: Array<Pick<StorefrontAPI.Collection, 'handle'>>};
};

export type HeaderMenuCategoryCollectionQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  collectionMetafieldIdentifiers:
    | Array<StorefrontAPI.HasMetafieldsIdentifier>
    | StorefrontAPI.HasMetafieldsIdentifier;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HeaderMenuCategoryCollectionQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Collection, 'id' | 'handle'> & {
      metafields: Array<
        StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'namespace' | 'key' | 'value'>
        >
      >;
    }
  >;
};

export type HeaderMenuSubCollectionsQueryVariables = StorefrontAPI.Exact<{
  ids:
    | Array<StorefrontAPI.Scalars['ID']['input']>
    | StorefrontAPI.Scalars['ID']['input'];
  productMetafieldIdentifiers:
    | Array<StorefrontAPI.HasMetafieldsIdentifier>
    | StorefrontAPI.HasMetafieldsIdentifier;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HeaderMenuSubCollectionsQuery = {
  nodes: Array<
    StorefrontAPI.Maybe<
      | {
          __typename:
            | 'AppliedGiftCard'
            | 'Article'
            | 'Blog'
            | 'Cart'
            | 'CartLine'
            | 'Comment'
            | 'Company'
            | 'CompanyContact'
            | 'CompanyLocation'
            | 'ComponentizableCartLine'
            | 'ExternalVideo'
            | 'GenericFile'
            | 'Location'
            | 'MailingAddress'
            | 'Market'
            | 'MediaImage'
            | 'MediaPresentation'
            | 'Menu'
            | 'MenuItem'
            | 'Metafield';
        }
      | {
          __typename:
            | 'Metaobject'
            | 'Model3d'
            | 'Order'
            | 'Page'
            | 'Product'
            | 'ProductOption'
            | 'ProductOptionValue'
            | 'ProductVariant'
            | 'Shop'
            | 'ShopPayInstallmentsFinancingPlan'
            | 'ShopPayInstallmentsFinancingPlanTerm'
            | 'ShopPayInstallmentsProductVariantPricing'
            | 'ShopPolicy'
            | 'TaxonomyCategory'
            | 'UrlRedirect'
            | 'Video';
        }
      | ({__typename: 'Collection'} & Pick<
          StorefrontAPI.Collection,
          'id' | 'handle' | 'title'
        > & {
            products: {
              nodes: Array<
                Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'id' | 'altText' | 'url' | 'width' | 'height'
                    >
                  >;
                  metafields: Array<
                    StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Metafield,
                        'namespace' | 'key' | 'value' | 'type'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          | {
                              __typename:
                                | 'Collection'
                                | 'GenericFile'
                                | 'Metaobject'
                                | 'Model3d'
                                | 'Page'
                                | 'Product'
                                | 'ProductVariant'
                                | 'Video';
                            }
                          | ({__typename: 'MediaImage'} & Pick<
                              StorefrontAPI.MediaImage,
                              'id'
                            > & {
                                image?: StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Image,
                                    'url' | 'altText' | 'width' | 'height'
                                  >
                                >;
                              })
                        >;
                      }
                    >
                  >;
                  collections: {
                    nodes: Array<Pick<StorefrontAPI.Collection, 'handle'>>;
                  };
                }
              >;
            };
          })
    >
  >;
};

export type HomepageFragment = {
  metafield?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Metafield,
      'id' | 'namespace' | 'key' | 'type' | 'value'
    > & {
      reference?: StorefrontAPI.Maybe<
        | {
            __typename:
              | 'Collection'
              | 'MediaImage'
              | 'Metaobject'
              | 'Model3d'
              | 'Page'
              | 'Product'
              | 'ProductVariant'
              | 'Video';
          }
        | ({__typename: 'GenericFile'} & Pick<
            StorefrontAPI.GenericFile,
            'id' | 'url' | 'mimeType'
          >)
      >;
    }
  >;
};

export type HomepageQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HomepageQuery = {
  shop: {
    metafield?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Metafield,
        'id' | 'namespace' | 'key' | 'type' | 'value'
      > & {
        reference?: StorefrontAPI.Maybe<
          | {
              __typename:
                | 'Collection'
                | 'MediaImage'
                | 'Metaobject'
                | 'Model3d'
                | 'Page'
                | 'Product'
                | 'ProductVariant'
                | 'Video';
            }
          | ({__typename: 'GenericFile'} & Pick<
              StorefrontAPI.GenericFile,
              'id' | 'url' | 'mimeType'
            >)
        >;
      }
    >;
  };
};

export type PredictiveArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    blog: Pick<StorefrontAPI.Blog, 'handle'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictiveCollectionFragment = {__typename: 'Collection'} & Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictivePageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'id' | 'title' | 'handle' | 'trackingParameters'
>;

export type PredictiveProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      }
    >;
  };

export type PredictiveQueryFragment = {
  __typename: 'SearchQuerySuggestion';
} & Pick<
  StorefrontAPI.SearchQuerySuggestion,
  'text' | 'styledText' | 'trackingParameters'
>;

export type PredictiveSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  limit: StorefrontAPI.Scalars['Int']['input'];
  limitScope: StorefrontAPI.PredictiveSearchLimitScope;
  term: StorefrontAPI.Scalars['String']['input'];
  types?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.PredictiveSearchType>
    | StorefrontAPI.PredictiveSearchType
  >;
}>;

export type PredictiveSearchQuery = {
  predictiveSearch?: StorefrontAPI.Maybe<{
    articles: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          blog: Pick<StorefrontAPI.Blog, 'handle'>;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    collections: Array<
      {__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    pages: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'title' | 'handle' | 'trackingParameters'
      >
    >;
    products: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            }
          >;
        }
    >;
    queries: Array<
      {__typename: 'SearchQuerySuggestion'} & Pick<
        StorefrontAPI.SearchQuerySuggestion,
        'text' | 'styledText' | 'trackingParameters'
      >
    >;
  }>;
};

export type ArmourSeriesProductFragment = Pick<
  StorefrontAPI.Product,
  | 'id'
  | 'title'
  | 'vendor'
  | 'handle'
  | 'descriptionHtml'
  | 'description'
  | 'encodedVariantExistence'
  | 'encodedVariantAvailability'
> & {
  metafields: Array<
    StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Metafield,
        'namespace' | 'key' | 'value' | 'type' | 'description'
      > & {
        reference?: StorefrontAPI.Maybe<
          | {
              __typename:
                | 'Collection'
                | 'Model3d'
                | 'Page'
                | 'Product'
                | 'ProductVariant'
                | 'Video';
            }
          | ({__typename: 'GenericFile'} & Pick<
              StorefrontAPI.GenericFile,
              'id' | 'url' | 'mimeType'
            >)
          | ({__typename: 'MediaImage'} & Pick<
              StorefrontAPI.MediaImage,
              'id'
            > & {
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
              })
          | ({__typename: 'Metaobject'} & Pick<
              StorefrontAPI.Metaobject,
              'id' | 'type' | 'handle'
            > & {
                fields: Array<
                  Pick<
                    StorefrontAPI.MetaobjectField,
                    'key' | 'value' | 'type'
                  > & {
                    reference?: StorefrontAPI.Maybe<
                      | {
                          __typename:
                            | 'Collection'
                            | 'Metaobject'
                            | 'Model3d'
                            | 'Page'
                            | 'Product'
                            | 'ProductVariant'
                            | 'Video';
                        }
                      | ({__typename: 'GenericFile'} & Pick<
                          StorefrontAPI.GenericFile,
                          'id' | 'url' | 'mimeType'
                        >)
                      | ({__typename: 'MediaImage'} & Pick<
                          StorefrontAPI.MediaImage,
                          'id'
                        > & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                          })
                    >;
                  }
                >;
              })
        >;
      }
    >
  >;
  seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
  collections: {nodes: Array<Pick<StorefrontAPI.Collection, 'handle'>>};
};

export type SeriesCollectionFragment = Pick<
  StorefrontAPI.Collection,
  'id' | 'handle' | 'title' | 'description'
>;

export type SeriesProductPageQueryVariables = StorefrontAPI.Exact<{
  collectionHandle: StorefrontAPI.Scalars['String']['input'];
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  productMetafieldIdentifiers:
    | Array<StorefrontAPI.HasMetafieldsIdentifier>
    | StorefrontAPI.HasMetafieldsIdentifier;
}>;

export type SeriesProductPageQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Collection, 'id' | 'handle' | 'title' | 'description'>
  >;
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      | 'id'
      | 'title'
      | 'vendor'
      | 'handle'
      | 'descriptionHtml'
      | 'description'
      | 'encodedVariantExistence'
      | 'encodedVariantAvailability'
    > & {
      metafields: Array<
        StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'namespace' | 'key' | 'value' | 'type' | 'description'
          > & {
            reference?: StorefrontAPI.Maybe<
              | {
                  __typename:
                    | 'Collection'
                    | 'Model3d'
                    | 'Page'
                    | 'Product'
                    | 'ProductVariant'
                    | 'Video';
                }
              | ({__typename: 'GenericFile'} & Pick<
                  StorefrontAPI.GenericFile,
                  'id' | 'url' | 'mimeType'
                >)
              | ({__typename: 'MediaImage'} & Pick<
                  StorefrontAPI.MediaImage,
                  'id'
                > & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  })
              | ({__typename: 'Metaobject'} & Pick<
                  StorefrontAPI.Metaobject,
                  'id' | 'type' | 'handle'
                > & {
                    fields: Array<
                      Pick<
                        StorefrontAPI.MetaobjectField,
                        'key' | 'value' | 'type'
                      > & {
                        reference?: StorefrontAPI.Maybe<
                          | {
                              __typename:
                                | 'Collection'
                                | 'Metaobject'
                                | 'Model3d'
                                | 'Page'
                                | 'Product'
                                | 'ProductVariant'
                                | 'Video';
                            }
                          | ({__typename: 'GenericFile'} & Pick<
                              StorefrontAPI.GenericFile,
                              'id' | 'url' | 'mimeType'
                            >)
                          | ({__typename: 'MediaImage'} & Pick<
                              StorefrontAPI.MediaImage,
                              'id'
                            > & {
                                image?: StorefrontAPI.Maybe<
                                  Pick<
                                    StorefrontAPI.Image,
                                    'url' | 'altText' | 'width' | 'height'
                                  >
                                >;
                              })
                        >;
                      }
                    >;
                  })
            >;
          }
        >
      >;
      seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
      collections: {nodes: Array<Pick<StorefrontAPI.Collection, 'handle'>>};
    }
  >;
};

export type StoreRobotsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type StoreRobotsQuery = {shop: Pick<StorefrontAPI.Shop, 'id'>};

interface GeneratedQueryTypes {
  '#graphql\n  query AllProductCollectionsPage(\n    $handle: String!\n    $identifiers: [HasMetafieldsIdentifier!]!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    page(handle: $handle) {\n      metafields(identifiers: $identifiers) {\n        namespace\n        key\n        value\n        references(first: 50) {\n          nodes {\n            __typename\n            ... on Collection {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: AllProductCollectionsPageQuery;
    variables: AllProductCollectionsPageQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment ProductHighlightItem on Product {\n    id\n    handle\n    title\n    featuredImage {\n      url\n      altText\n      width\n      height\n    }\n    metafields(identifiers: $productMetafieldIdentifiers) {\n      namespace\n      key\n      value\n      type\n    }\n  }\n\n  query CollectionsWithProducts(\n    $ids: [ID!]!\n    $productMetafieldIdentifiers: [HasMetafieldsIdentifier!]!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    nodes(ids: $ids) {\n      __typename\n      ... on Collection {\n        id\n        handle\n        title\n        image {\n          url\n          altText\n          width\n          height\n        }\n        products(first: 80) {\n          nodes {\n            ...ProductHighlightItem\n          }\n        }\n      }\n    }\n  }\n': {
    return: CollectionsWithProductsQuery;
    variables: CollectionsWithProductsQueryVariables;
  };
  '#graphql\n  fragment Shop on Shop {\n    id\n    name\n    description\n    primaryDomain {\n      url\n    }\n    brand {\n      logo {\n        image {\n          url\n        }\n      }\n    }\n  }\n  query Header(\n    $country: CountryCode\n    $headerMenuHandle: String!\n    $language: LanguageCode\n    $productMetafieldIdentifiers: [HasMetafieldsIdentifier!] = []\n    $collectionMetafieldIdentifiers: [HasMetafieldsIdentifier!] = []\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      ...Shop\n    }\n    menu(handle: $headerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment Metafield on Metafield {\n    id\n    namespace\n    key\n    value\n    type\n    description\n    reference {\n      ... on MediaImage {\n        id\n        image {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n\n    resource {\n      __typename\n      ... on Product {\n        id\n        handle\n        title\n        featuredImage {\n          url\n          altText\n          width\n          height\n        }\n        metafields(identifiers: $productMetafieldIdentifiers) {\n          ...Metafield\n        }\n      }\n      ... on Collection {\n        id\n        handle\n        title\n        image {\n          url\n          altText\n          width\n          height\n        }\n        metafields(identifiers: $collectionMetafieldIdentifiers) {\n          ...Metafield\n        }\n      }\n      ... on Page {\n        id\n        handle\n        title\n      }\n    }\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment GrandChildMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...MenuItem\n    }\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...GrandChildMenuItem\n    }\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    handle\n    title\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: HeaderQuery;
    variables: HeaderQueryVariables;
  };
  '#graphql\n  query Footer(\n    $country: CountryCode\n    $footerMenuHandle: String!\n    $language: LanguageCode\n    $productMetafieldIdentifiers: [HasMetafieldsIdentifier!] = []\n    $collectionMetafieldIdentifiers: [HasMetafieldsIdentifier!] = []\n  ) @inContext(language: $language, country: $country) {\n    menu(handle: $footerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment Metafield on Metafield {\n    id\n    namespace\n    key\n    value\n    type\n    description\n    reference {\n      ... on MediaImage {\n        id\n        image {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n\n    resource {\n      __typename\n      ... on Product {\n        id\n        handle\n        title\n        featuredImage {\n          url\n          altText\n          width\n          height\n        }\n        metafields(identifiers: $productMetafieldIdentifiers) {\n          ...Metafield\n        }\n      }\n      ... on Collection {\n        id\n        handle\n        title\n        image {\n          url\n          altText\n          width\n          height\n        }\n        metafields(identifiers: $collectionMetafieldIdentifiers) {\n          ...Metafield\n        }\n      }\n      ... on Page {\n        id\n        handle\n        title\n      }\n    }\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment GrandChildMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...MenuItem\n    }\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...GrandChildMenuItem\n    }\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    handle\n    title\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: FooterQuery;
    variables: FooterQueryVariables;
  };
  '#graphql\n  query Shop(\n    $country: CountryCode\n    $language: LanguageCode\n    $identifiers: [HasMetafieldsIdentifier!]!\n    $productMetafieldIdentifiers: [HasMetafieldsIdentifier!] = []\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      id\n      name\n      metafields(identifiers: $identifiers) {\n        ...ShopMetafield\n      }\n    }\n  }\n  #graphql\n  fragment ShopMetafield on Metafield {\n    id\n    namespace\n    key\n    value\n    type\n    description\n    reference {\n      ... on MediaImage {\n        id\n        image {\n          url\n          altText\n          width\n          height\n        }\n      }\n      ... on GenericFile {\n        id\n        mimeType\n        originalFileSize\n        url\n        previewImage {\n          url\n          altText\n        }\n      }\n      ... on Metaobject {\n        id\n        type\n        handle\n        fields {\n          key\n          type\n          value\n          reference {\n            ... on Product {\n              id\n              handle\n              title\n              featuredImage {\n                url\n                altText\n                width\n                height\n              }\n              metafields(identifiers: $productMetafieldIdentifiers) {\n                ...Metafield\n              }\n            }\n            ... on MediaImage {\n              id\n              image {\n                url\n                altText\n                width\n                height\n              }\n            }\n            ... on GenericFile {\n              id\n              mimeType\n              originalFileSize\n              url\n              previewImage {\n                url\n                altText\n              }\n            }\n          }\n          references(first: 50) {\n            nodes {\n              ... on Product {\n                id\n                handle\n                title\n                featuredImage {\n                  url\n                  altText\n                  width\n                  height\n                }\n                metafields(identifiers: $productMetafieldIdentifiers) {\n                  ...Metafield\n                }\n              }\n              ... on MediaImage {\n                id\n                image {\n                  url\n                  altText\n                  width\n                  height\n                }\n              }\n              ... on GenericFile {\n                id\n                mimeType\n                originalFileSize\n                url\n                previewImage {\n                  url\n                  altText\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    references(first: 50) {\n      nodes {\n        ... on Product {\n          id\n          handle\n          title\n          featuredImage {\n            url\n            altText\n            width\n            height\n          }\n          metafields(identifiers: $productMetafieldIdentifiers) {\n            ...Metafield\n          }\n        }\n        ... on Metaobject {\n          id\n          type\n          handle\n          fields {\n            key\n            type\n            value\n            reference {\n              ... on Product {\n                id\n                handle\n                title\n                featuredImage {\n                  url\n                  altText\n                  width\n                  height\n                }\n                metafields(identifiers: $productMetafieldIdentifiers) {\n                  ...Metafield\n                }\n              }\n              ... on MediaImage {\n                id\n                image {\n                  url\n                  altText\n                  width\n                  height\n                }\n              }\n              ... on GenericFile {\n                id\n                mimeType\n                originalFileSize\n                url\n                previewImage {\n                  url\n                  altText\n                }\n              }\n            }\n            references(first: 50) {\n              nodes {\n                ... on Product {\n                  id\n                  handle\n                  title\n                  featuredImage {\n                    url\n                    altText\n                    width\n                    height\n                  }\n                  metafields(identifiers: $productMetafieldIdentifiers) {\n                    ...Metafield\n                  }\n                }\n                ... on MediaImage {\n                  id\n                  image {\n                    url\n                    altText\n                    width\n                    height\n                  }\n                }\n                ... on GenericFile {\n                  id\n                  mimeType\n                  originalFileSize\n                  url\n                  previewImage {\n                    url\n                    altText\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment Metafield on Metafield {\n    id\n    namespace\n    key\n    value\n    type\n    description\n    reference {\n      ... on MediaImage {\n        id\n        image {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n  }\n\n': {
    return: ShopQuery;
    variables: ShopQueryVariables;
  };
  '#graphql\n  query HeaderMenuCategoryCollection(\n    $handle: String!\n    $collectionMetafieldIdentifiers: [HasMetafieldsIdentifier!]!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $handle) {\n      id\n      handle\n      metafields(identifiers: $collectionMetafieldIdentifiers) {\n        namespace\n        key\n        value\n      }\n    }\n  }\n': {
    return: HeaderMenuCategoryCollectionQuery;
    variables: HeaderMenuCategoryCollectionQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment HeaderMenuProduct on Product {\n    id\n    handle\n    title\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    metafields(identifiers: $productMetafieldIdentifiers) {\n      namespace\n      key\n      value\n      type\n      reference {\n        __typename\n        ... on MediaImage {\n          id\n          image {\n            url\n            altText\n            width\n            height\n          }\n        }\n      }\n    }\n    collections(first: 20) {\n      nodes {\n        handle\n      }\n    }\n  }\n\n  query HeaderMenuSubCollections(\n    $ids: [ID!]!\n    $productMetafieldIdentifiers: [HasMetafieldsIdentifier!]!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    nodes(ids: $ids) {\n      __typename\n      ... on Collection {\n        id\n        handle\n        title\n        products(first: 50, sortKey: MANUAL) {\n          nodes {\n            ...HeaderMenuProduct\n          }\n        }\n      }\n    }\n  }\n': {
    return: HeaderMenuSubCollectionsQuery;
    variables: HeaderMenuSubCollectionsQueryVariables;
  };
  '#graphql\n query Homepage($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {\n  shop {\n    ...Homepage\n  }\n }\n#graphql\n  fragment Homepage on Shop {\n    metafield(namespace: "custom", key: "homepage") {\n      id\n      namespace\n      key\n      type\n      value\n      reference {\n        __typename\n        ... on GenericFile {\n          id\n          url\n          mimeType\n        }\n      }\n    }\n  }\n\n': {
    return: HomepageQuery;
    variables: HomepageQueryVariables;
  };
  '#graphql\n  query PredictiveSearch(\n    $country: CountryCode\n    $language: LanguageCode\n    $limit: Int!\n    $limitScope: PredictiveSearchLimitScope!\n    $term: String!\n    $types: [PredictiveSearchType!]\n  ) @inContext(country: $country, language: $language) {\n    predictiveSearch(\n      limit: $limit,\n      limitScope: $limitScope,\n      query: $term,\n      types: $types,\n    ) {\n      articles {\n        ...PredictiveArticle\n      }\n      collections {\n        ...PredictiveCollection\n      }\n      pages {\n        ...PredictivePage\n      }\n      products {\n        ...PredictiveProduct\n      }\n      queries {\n        ...PredictiveQuery\n      }\n    }\n  }\n  #graphql\n  fragment PredictiveArticle on Article {\n    __typename\n    id\n    title\n    handle\n    blog {\n      handle\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveCollection on Collection {\n    __typename\n    id\n    title\n    handle\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictivePage on Page {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveProduct on Product {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n    }\n  }\n\n  #graphql\n  fragment PredictiveQuery on SearchQuerySuggestion {\n    __typename\n    text\n    styledText\n    trackingParameters\n  }\n\n': {
    return: PredictiveSearchQuery;
    variables: PredictiveSearchQueryVariables;
  };
  '#graphql\n  query SeriesProductPage(\n    $collectionHandle: String!\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n    $productMetafieldIdentifiers: [HasMetafieldsIdentifier!]!\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $collectionHandle) {\n      ...SeriesCollection\n    }\n    product(handle: $handle) {\n      ...ArmourSeriesProduct\n    }\n  }\n  #graphql\n  fragment SeriesCollection on Collection {\n    id\n    handle\n    title\n    description\n  }\n\n  #graphql\n  fragment ArmourSeriesProduct on Product {\n    id\n    title\n    vendor\n    handle\n    descriptionHtml\n    description\n    encodedVariantExistence\n    encodedVariantAvailability\n    metafields(identifiers: $productMetafieldIdentifiers) {\n      namespace\n      key\n      value\n      type\n      description\n      reference {\n        __typename\n        ... on MediaImage {\n          id\n          image {\n            url\n            altText\n            width\n            height\n          }\n        }\n        ... on GenericFile {\n          id\n          url\n          mimeType\n        }\n        ... on Metaobject {\n          id\n          type\n          handle\n          fields {\n            key\n            value\n            type\n            reference {\n              __typename\n              ... on MediaImage {\n                id\n                image {\n                  url\n                  altText\n                  width\n                  height\n                }\n              }\n              ... on GenericFile {\n                id\n                url\n                mimeType\n              }\n            }\n          }\n        }\n      }\n    }\n    seo {\n      description\n      title\n    }\n    collections(first: 20) {\n      nodes {\n        handle\n      }\n    }\n  }\n\n': {
    return: SeriesProductPageQuery;
    variables: SeriesProductPageQueryVariables;
  };
  '#graphql\n  query StoreRobots($country: CountryCode, $language: LanguageCode)\n   @inContext(country: $country, language: $language) {\n    shop {\n      id\n    }\n  }\n': {
    return: StoreRobotsQuery;
    variables: StoreRobotsQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
