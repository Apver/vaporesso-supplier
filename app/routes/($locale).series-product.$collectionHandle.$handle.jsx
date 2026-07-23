import {redirect, useLoaderData} from 'react-router';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Analytics} from '@shopify/hydrogen';
import {ProductNav} from '~/components/SeriesProduct/ArmourSeries/ProductNav';
import {SpecSection} from '~/components/SeriesProduct/ArmourSeries/SpecSection';
import {SpecSectionJsData} from '~/components/SeriesProduct/XrosSeries/Xros5Mini/SpecSectionJsData';
import {Product3DViewer} from '~/components/SeriesProduct/ArmourSeries/Product3DViewer';
import {
  SERIES_PRODUCT_LAYOUT_ENTRIES,
  SERIES_PRODUCT_NO_NAV_TEMPLATES,
  SERIES_PRODUCT_SPEC_DATA_BY_TEMPLATE,
  SERIES_PRODUCT_SPEC_DATA_IN_JS,
} from '~/config/series-product-layouts';
import {resolveSeriesProductTemplate} from '~/config/series-product-links';
import {redirectIfHandleIsLocalized, redirectToHome} from '~/lib/redirect';
import {getShopifyLanguageCode} from '~/lib/i18n';
import {parseExcelFromUrl} from '~/lib/excel';
import {getLocalizedDataset, buildSheetTranslationStatus} from '~/lib/localization';
import {useLocaleAutoTranslate} from '~/lib/useLocaleAutoTranslate';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [
    {
      title: data?.product?.seo?.title
        ? `${data?.product.seo.title}`
        : `${data?.collection.title ?? ''} | ${data?.product.title ?? ''}`,
    },
    {
      name: 'description',
      content:
        data?.product?.seo?.description ?? data?.product.description ?? '',
    },
    {
      rel: 'canonical',
      href: `/series-product/${data?.canonicalCollectionHandle ?? data?.collection?.handle}/${data?.product?.handle}`,
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Await the critical data required to render initial state of the page.
  const criticalData = await loadCriticalData(args);

  return criticalData;
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context, params, request}) {
  const {collectionHandle, handle, locale} = params;
  const {storefront} = context;

  const language = getShopifyLanguageCode(locale, storefront.i18n.language);
  const country = storefront.i18n.country;

  if (!handle || !collectionHandle) {
    redirectToHome(locale);
  }

  const HANDLE_ALIAS_MAP = {
    'vibe-se': 'vibe-se-vibe-nano',
    vibe: 'vibe-vibe-nano-pro',
  };
  const shopifyHandle = HANDLE_ALIAS_MAP[handle] || handle;
  const isHandleAliasUsed = shopifyHandle !== handle;

  const [{collection, product}] = await Promise.all([
    storefront.query(SERIES_PRODUCT_QUERY, {
      cache: storefront.CacheNone(),
      variables: {
        collectionHandle,
        handle: shopifyHandle,
        country,
        language,
        productMetafieldIdentifiers: [
          {namespace: 'custom', key: 'template'},
          {namespace: 'custom', key: 'productinfo'},
        ],
      },
    }),
  ]);

  if (!product?.id) {
    redirectToHome(locale);
  }

  const productCollectionHandles =
    product.collections?.nodes?.map((node) => node?.handle).filter(Boolean) ??
    [];
  const canonicalCollectionHandle = resolveCanonicalCollectionHandle(
    productCollectionHandles,
    collectionHandle,
  );

  if (!canonicalCollectionHandle) {
    redirectToHome(locale);
  }

  if (collectionHandle !== canonicalCollectionHandle) {
    throw redirect(
      buildSeriesProductUrl(request, locale, canonicalCollectionHandle, handle),
      {status: 301},
    );
  }

  if (!collection) {
    redirectToHome(locale);
  }

  // The API handle might be localized, so redirect to the localized handle
  if (isHandleAliasUsed) {
    redirectIfHandleIsLocalized(request, {
      handle: collectionHandle,
      data: collection,
    });
  } else {
    redirectIfHandleIsLocalized(
      request,
      {
        handle: collectionHandle,
        data: collection,
      },
      {
        handle: shopifyHandle,
        data: product,
      },
    );
  }

  const productInfoMetafield = product?.metafields?.find(
    (metafield) =>
      metafield?.namespace === 'custom' && metafield?.key === 'productinfo',
  );

  const productInfoFileRef =
    productInfoMetafield?.reference?.__typename === 'GenericFile'
      ? productInfoMetafield.reference
      : null;

  let productInfoExcelData = {
    firstSheetName: null,
    sheetOrder: [],
    sheets: {},
  };

  if (productInfoFileRef?.url) {
    productInfoExcelData = await parseExcelFromUrl(
      productInfoFileRef.url,
    ).catch((error) => {
      console.error('解析 productinfo Excel 失败', error);
      return productInfoExcelData;
    });
  }

  return {
    collection,
    product,
    canonicalCollectionHandle,
    requestedHandle: handle,
    productInfoFileUrl: productInfoFileRef?.url ?? null,
    productInfoExcelData,
    locale,
    seriesProductTemplate: resolveSeriesProductTemplate(product, handle),
  };
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const {product, productInfoExcelData, locale, seriesProductTemplate} =
    useLoaderData();


  const sheets = useMemo(
    () => productInfoExcelData?.sheets ?? {},
    [productInfoExcelData?.sheets],
  );

  const componentTranslationStatus = useMemo(
    () => buildSheetTranslationStatus(sheets, locale),
    [sheets, locale],
  );

  useLocaleAutoTranslate({
    locale,
    componentTranslationStatus,
    rootElementId: 'series-product-page',
  });

  const templateValue = seriesProductTemplate;

  const overviewLayoutEntry = templateValue
    ? SERIES_PRODUCT_LAYOUT_ENTRIES[templateValue]
    : null;
  const show3DExhibit = overviewLayoutEntry?.show3DExhibit !== false;

  const localizedProductNavRows = useMemo(
    () => getLocalizedDataset(sheets?.productnav ?? [], locale),
    [sheets?.productnav, locale],
  );

  const resolvedProductNav = useMemo(() => {
    const navRow = localizedProductNavRows?.[0];
    if (!navRow) {
      return filterProductNavTabs(PRODUCT_NAV_CONTENT, show3DExhibit);
    }

    return {
      name: navRow.name || PRODUCT_NAV_CONTENT.name,
      heroHref: navRow.heroHref || '#overview',
      buyHref: navRow.buyHref || PRODUCT_NAV_CONTENT.buyHref,
      buyLabel: navRow.buyLabel || PRODUCT_NAV_CONTENT.buyLabel,
      tabs: buildNavTabs(navRow.tabs, show3DExhibit),
    };
  }, [localizedProductNavRows, show3DExhibit]);

  const localized3DRows = useMemo(
    () => getLocalizedDataset(sheets?.product3dviewer ?? [], locale),
    [sheets?.product3dviewer, locale],
  );

  const resolvedProduct3DData = useMemo(() => {
    const pictureFormat = localized3DRows?.[0]?.pictureFormat || 'png';

    const items =
      localized3DRows?.map((row, index) => {
        // 处理 filenameX 和 filenameY，如果包含格式则使用，否则添加 pictureFormat
        const filenameX = row.filenameX || `rotate-x{index}.${pictureFormat}`;
        const filenameY = row.filenameY || `rotate-y{index}.${pictureFormat}`;

        return {
          id: row.id || `pro${index + 1}`,
          label:
            row.label || row.name || PRODUCT_3D_DEFAULT.items[index]?.label,
          folder: row.folder || PRODUCT_3D_DEFAULT.items[index]?.folder,
          filenameX,
          amountX: Number(row.amountX) || 36,
          filenameY,
          amountY: Number(row.amountY) || 60,
        };
      }) ?? [];

    const filteredItems = items.filter((item) => item.folder);
    if (filteredItems.length === 0) {
      return PRODUCT_3D_DEFAULT;
    }

    return {
      title:
        localized3DRows?.[0]?.title ||
        localized3DRows?.[0]?.heading ||
        PRODUCT_3D_DEFAULT.title,
      pictureFormat,
      color: localized3DRows?.[0]?.color || '',
      items: filteredItems,
    };
  }, [localized3DRows]);

  const localizedProductSpecRows = useMemo(
    () => getLocalizedDataset(sheets?.productspec ?? [], locale),
    [sheets?.productspec, locale],
  );

  const productSpecDataFromExcel = useMemo(() => {
    const headingRow =
      localizedProductSpecRows?.find((item) => item?.id === 'global') ?? null;
    const items =
      localizedProductSpecRows
        ?.filter((item) => item?.id !== 'global')
        ?.map((row, index) => ({
          id: row.id || `productdesc-${index + 1}`,
          itemTitle: row.itemTitle,
          primaryTextWithImage: row.primaryTextWithImage,
          secondaryTextWithImage: row.secondaryTextWithImage,
          primaryColorTitle: row.primaryColorTitle,
          primaryColorImages: row.primaryColorImages,
          primaryColorLabel: row.primaryColorLabel,
          primaryColorTitleMobile: row.primaryColorTitleMobile,
          primaryColorImagesMobile: row.primaryColorImagesMobile,
          primaryColorLabelMobile: row.primaryColorLabelMobile,
          secondaryColorTitle: row.secondaryColorTitle,
          secondaryColorImages: row.secondaryColorImages,
          secondaryColorLabel: row.secondaryColorLabel,
          secondaryColorTitleMobile: row.secondaryColorTitleMobile,
          secondaryColorImagesMobile: row.secondaryColorImagesMobile,
          secondaryColorLabelMobile: row.secondaryColorLabelMobile,
          itemType: row.itemType,
        })) ?? [];

    if (!headingRow && !items.length) return null;

    return {
      primaryProductTitle: headingRow?.primaryProductTitle,
      secondaryProductTitle: headingRow?.secondaryProductTitle,
      items,
    };
  }, [localizedProductSpecRows]);

  const productSpecData = useMemo(() => {
    if (
      templateValue &&
      SERIES_PRODUCT_SPEC_DATA_IN_JS.includes(templateValue)
    ) {
      return SERIES_PRODUCT_SPEC_DATA_BY_TEMPLATE[templateValue] ?? null;
    }
    return productSpecDataFromExcel;
  }, [templateValue, productSpecDataFromExcel]);

  // collection is available for use, similar to blog in blogs.$blogHandle.$articleHandle

  const productNavRef = useRef(null);
  // 导航高亮的 tab
  const [activeNavId, setActiveNavId] = useState('overview');
  // 实际控制 Overview / Specs 区域显隐的内容 tab（3D 点击时不改变这个）
  const [activeContentId, setActiveContentId] = useState('overview');
  const [is3DOpen, setIs3DOpen] = useState(false);

  const handleSectionChange = (id) => {
    // 点击 3D 只打开 3D 弹层，不改变导航高亮和 Overview / Specs 的内容显隐
    if (id === '3d') {
      setIs3DOpen(true);
      return;
    }

    // Overview / Specs：切换导航高亮 + 内容显隐，并关闭 3D 弹层
    setIs3DOpen(false);
    setActiveNavId(id);
    setActiveContentId(id);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 无导航模板不挂载 ProductNav，ref 恒为 null，不能解构
    if (SERIES_PRODUCT_NO_NAV_TEMPLATES.includes(templateValue)) return;

    const navApi = productNavRef.current;
    if (!navApi) return;

    const proNav = navApi.navEl;
    const header = document.querySelector('.header-acc');

    if (!proNav || !header) return;

    let ticking = false;
    let lastScrollY = window.scrollY;
    let isSticky = false;

    const SHOW_THRESHOLD = 140; // 显示吸顶的滚动高度阈值（略大一点，避免抖动）
    const HIDE_THRESHOLD = 100; // 隐藏吸顶的滚动高度阈值（略小一点，形成“回弹区”）

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const navRect = proNav.getBoundingClientRect();
          const headerRect = header.getBoundingClientRect();
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY;
          const isScrollingUp = currentScrollY < lastScrollY;
          lastScrollY = currentScrollY;

          // 吸顶出现条件：
          // - 向下滑动
          // - 产品导航到达顶部（navRect.top <= 0）
          // - 并且滚动高度超过 SHOW_THRESHOLD，避免在临界区频繁触发
          const shouldShowStickyNav =
            !isSticky &&
            isScrollingDown &&
            navRect.top <= 0 &&
            currentScrollY > SHOW_THRESHOLD;

          // 吸顶消失条件：
          // - 向上滑动
          // - 且 header 重新露出来（headerRect.bottom > 0）
          //   或者滚动位置回到 HIDE_THRESHOLD 以内
          const shouldResetNav =
            isSticky &&
            isScrollingUp &&
            (headerRect.bottom > 0 || currentScrollY < HIDE_THRESHOLD);

          if (shouldShowStickyNav) {
            isSticky = true;
            proNav.classList.add('active');
            header.classList.add('header-hidden');
          } else if (shouldResetNav) {
            isSticky = false;
            proNav.classList.remove('active');
            header.classList.remove('header-hidden');
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    const handleResize = () => {
      handleScroll();
    };

    // 使用 passive 选项提升移动端滚动性能
    window.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('resize', handleResize);

    // 初始检查
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      header.classList.remove('header-hidden');
      proNav.classList.remove('active');
    };
  }, [templateValue]);

  const OverviewLayout = overviewLayoutEntry?.Layout;
  const overviewPassesSheetsLocale =
    overviewLayoutEntry?.withSheetsLocale !== false;
  const {
    nav: productNavTheme = 'white',
    cnt: productCntTheme = 'black',
    spec: productNavSpecTheme,
    bannerThemeSwitch: productNavBannerThemeSwitch = true,
  } = overviewLayoutEntry?.productNavTheme ?? {};
  const productNavSpecNavTheme = productNavSpecTheme?.nav ?? productNavTheme;
  const productNavSpecCntTheme = productNavSpecTheme?.cnt ?? productCntTheme;
  const specTheme = overviewLayoutEntry?.specTheme ?? 'white';
  const rootClassName = [
    'product',
    templateValue ? `product-${templateValue}` : '',
    overviewLayoutEntry?.extraProductClass,
  ]
    .filter(Boolean)
    .join(' ');

  const useJsSpecSection =
    templateValue && SERIES_PRODUCT_SPEC_DATA_IN_JS.includes(templateValue);
  const SpecSectionComponent = useJsSpecSection
    ? SpecSectionJsData
    : SpecSection;

  return (
    <div id="series-product-page" className={rootClassName}>
      {!SERIES_PRODUCT_NO_NAV_TEMPLATES.includes(templateValue) && (
        <ProductNav
          ref={productNavRef}
          nav={resolvedProductNav}
          activeSectionId={activeNavId}
          onSectionChange={handleSectionChange}
          navTheme={productNavTheme}
          cntTheme={productCntTheme}
          specNavTheme={productNavSpecNavTheme}
          specCntTheme={productNavSpecCntTheme}
          bannerThemeSwitch={productNavBannerThemeSwitch}
          show3DExhibit={show3DExhibit}
        />
      )}
      {!SERIES_PRODUCT_NO_NAV_TEMPLATES.includes(templateValue) && (
        <SpecSectionComponent
          isActive={activeContentId === 'spec'}
          data={productSpecData}
          {...(!useJsSpecSection ? {theme: specTheme} : {})}
        />
      )}
      {show3DExhibit &&
        !SERIES_PRODUCT_NO_NAV_TEMPLATES.includes(templateValue) && (
          <Product3DViewer
            isOpen={is3DOpen}
            data={resolvedProduct3DData}
            onClose={() => {
              setIs3DOpen(false);
            }}
          />
        )}
      {OverviewLayout ? (
        <div
          className="product-main"
          style={{display: activeContentId === 'overview' ? 'block' : 'none'}}
        >
          <OverviewLayout
            {...(overviewPassesSheetsLocale ? {sheets, locale} : {})}
            {...(overviewLayoutEntry?.passActiveSectionId
              ? {activeSectionId: activeContentId}
              : {})}
            onCheckSpecs={() => {
              handleSectionChange('spec');
            }}
          />
        </div>
      ) : null}

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              vendor: product.vendor,
            },
          ],
        }}
      />
    </div>
  );
}

const PRODUCT_NAV_CONTENT = {
  name: 'ARMOUR G ❘ GS',
  heroHref: '#overview',
  buyHref: 'https://store.vaporesso.com/products/armour-gs',
  buyLabel: 'Buy',
  tabs: [
    {id: 'overview', label: 'Overview', isActive: true, href: '#overview'},
    {id: 'spec', label: 'Specs', isActive: false, href: '#spec'},
    {id: '3d', label: '3D Exhibit', isActive: false, href: '#pro3D'},
  ],
};

const PRODUCT_3D_DEFAULT = {
  title: 'Take a look at the 3D view of ARMOUR',
  items: [
    {
      id: 'pro1',
      label: 'ARMOUR G',
      folder: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/',
      filenameX: 'armour-g_rotate-y{index}.png',
      amountX: 36,
      filenameY: 'armour-g_rotate-y{index}.png',
      amountY: 60,
    },
    {
      id: 'pro2',
      label: 'ARMOUR GS',
      folder: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/',
      filenameX: 'armour-gs_rotate-x{index}.png',
      amountX: 36,
      filenameY: 'armour-gs_rotate-y{index}.png',
      amountY: 60,
    },
  ],
};

function buildNavTabs(tabsValue, show3DExhibit = true) {
  const defaultTabs = filterProductNavTabs(
    PRODUCT_NAV_CONTENT,
    show3DExhibit,
  ).tabs;
  const labels = Array.isArray(tabsValue)
    ? tabsValue
    : String(tabsValue || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);

  const ids = show3DExhibit ? ['overview', 'spec', '3d'] : ['overview', 'spec'];
  return ids.map((id, index) => ({
    id,
    label: labels[index] || defaultTabs[index]?.label || id,
    isActive: id === 'overview',
    href: defaultTabs[index]?.href || `#${id}`,
  }));
}

function filterProductNavTabs(nav, show3DExhibit) {
  if (show3DExhibit) return nav;
  return {
    ...nav,
    tabs: nav.tabs.filter((tab) => tab.id !== '3d'),
  };
}

/** 产品可能同时归属系列 collection 与分类 collection，URL 应使用系列 handle。 */
const EXCLUDED_SERIES_PRODUCT_COLLECTION_HANDLES = new Set([
  'platform',
  'pod',
  'pod-mod',
  'tank-mod',
  'pen-style',
]);

/**
 * 从产品的 collection 列表中解析 canonical handle，排除分类 collection。
 * 若当前 URL 中的 handle 属于有效系列，则保留该 handle。
 *
 * @param {string[]} productCollectionHandles
 * @param {string | undefined} requestedCollectionHandle
 * @returns {string | null}
 */
function resolveCanonicalCollectionHandle(
  productCollectionHandles,
  requestedCollectionHandle,
) {
  const eligibleHandles = productCollectionHandles.filter(
    (handle) => !EXCLUDED_SERIES_PRODUCT_COLLECTION_HANDLES.has(handle),
  );

  if (!eligibleHandles.length) return null;

  if (
    requestedCollectionHandle &&
    eligibleHandles.includes(requestedCollectionHandle)
  ) {
    return requestedCollectionHandle;
  }

  return eligibleHandles[0];
}

/**
 * 构建系列产品详情页路径，保留 locale 前缀。
 * @param {Request} request
 * @param {string | undefined} locale
 * @param {string} collectionHandle
 * @param {string} productHandle
 */
function buildSeriesProductUrl(
  request,
  locale,
  collectionHandle,
  productHandle,
) {
  const url = new URL(request.url);
  const localePrefix =
    locale && /^[a-z]{2}-[a-z]{2}$/i.test(locale) ? `/${locale}` : '';
  url.pathname = `${localePrefix}/series-product/${collectionHandle}/${productHandle}`;
  return url.toString();
}

const PRODUCT_FRAGMENT = `#graphql
  fragment ArmourSeriesProduct on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    metafields(identifiers: $productMetafieldIdentifiers) {
      namespace
      key
      value
      type
      description
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
        ... on GenericFile {
          id
          url
          mimeType
        }
        ... on Metaobject {
          id
          type
          handle
          fields {
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
              ... on GenericFile {
                id
                url
                mimeType
              }
            }
          }
        }
      }
    }
    seo {
      description
      title
    }
    collections(first: 20) {
      nodes {
        handle
      }
    }
  }
`;

const COLLECTION_FRAGMENT = `#graphql
  fragment SeriesCollection on Collection {
    id
    handle
    title
    description
  }
`;

const SERIES_PRODUCT_QUERY = `#graphql
  query SeriesProductPage(
    $collectionHandle: String!
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $productMetafieldIdentifiers: [HasMetafieldsIdentifier!]!
  ) @inContext(country: $country, language: $language) {
    collection(handle: $collectionHandle) {
      ...SeriesCollection
    }
    product(handle: $handle) {
      ...ArmourSeriesProduct
    }
  }
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
