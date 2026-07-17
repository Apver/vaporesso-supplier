import {useLoaderData} from 'react-router';
import {useMemo} from 'react';
import {parseExcelFromUrl} from '~/lib/excel';
import {
  getLocalizedDataset,
  hasManualTranslation,
} from '~/lib/localization';
import {useLocaleAutoTranslate} from '~/lib/useLocaleAutoTranslate';
import {SlideBanner} from '~/components/Homepage/SlideBanner';
import {ActivityBanner} from '~/components/Homepage/ActivityBanner';
import {ProductsBanner} from '~/components/Homepage/ProductsBanner';
import {TechnologySection} from '~/components/Homepage/TechnologySection';
import {MediaSection} from '~/components/Homepage/MediaSection';
import {AccessSection} from '~/components/Homepage/AccessSection';
import {WishesSection} from '~/components/Homepage/WishesSection';
import homePageStyles from '~/styles/homepage.css?url';
import {useAutoLanguage} from '~/lib/useLanguageChange';

const DEFAULT_SECTION_ORDER = [
  'slidebanner',
  'activebanner',
  'productsbanner',
  'technologysection',
  'mediasection',
  'accesssection',
  'wishessection',
];

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  const shopName =
    data?.shop?.name || 'VAPORESSO » Premium Vape Brand Manufacture';
  const description =
    data?.shop?.description ||
    'VAPORESSO - Leading vape brand specializing in refillable vape kits. Pioneering vape innovation since 2015, serving worldwide distributors, retailers & consumers.';

  return [{title: `${shopName}`}, {name: 'description', content: description}];
};

export const links = () => {
  return [{rel: 'stylesheet', href: homePageStyles}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const {context} = args;
  const {params} = args;
  const locale = params.locale;
  const criticalData = await loadCriticalData({
    context,
  });

  return {
    ...criticalData,
    locale,
  };
}

/**
 * 加载首屏渲染所需的关键数据。这是渲染页面所需的关键数据。
 * 如果数据不可用，整个页面应该返回 400 或 500 错误。
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context}) {
  const [homepageRes] = await Promise.all([
    context.storefront.query(HOMEPAGE_QUERY, {
      cache: context.storefront.CacheNone(),
      variables: {country: 'US', language: 'EN'},
    }),
    // 这里可以继续添加其他 queries
  ]);

  const shop = homepageRes?.data?.shop ?? homepageRes?.shop;
  const homepageMetafield = shop?.metafield;
  const homepageFileRef =
    homepageMetafield?.reference?.__typename === 'GenericFile'
      ? homepageMetafield.reference
      : null;

  let slidebannerDataset = [];
  let homepageExcelData = {
    firstSheetName: null,
    sheetOrder: [],
    sheets: {},
  };
  if (homepageFileRef?.url) {
    homepageExcelData = await parseExcelFromUrl(homepageFileRef.url).catch(
      (error) => {
        console.error('解析 homepage Excel 失败', error);
        return homepageExcelData;
      },
    );
    slidebannerDataset =
      homepageExcelData.sheets?.[homepageExcelData.firstSheetName] ?? [];
  }

  return {slidebannerDataset, homepageExcelData, shop};
}

export default function Homepage() {
  // 页面加载时自动检测浏览器语言并切换（非中文）
  useAutoLanguage();

  // 数据已加载但尚未使用 - 保留用于未来功能
  const {slidebannerDataset, homepageExcelData, locale} = useLoaderData();


  const sheets = useMemo(
    () => homepageExcelData?.sheets ?? {},
    [homepageExcelData?.sheets],
  );
  const orderedSections =
    homepageExcelData?.sheetOrder?.length > 0
      ? homepageExcelData.sheetOrder
      : DEFAULT_SECTION_ORDER;

  const resolvedSlidebannerDataset = useMemo(
    () =>
      slidebannerDataset?.length > 0
        ? slidebannerDataset
        : (sheets?.slidebanner ?? []),
    [slidebannerDataset, sheets?.slidebanner],
  );
  const localizedSlidebannerDataset = getLocalizedDataset(
    resolvedSlidebannerDataset,
    locale,
  );
  const getLocalizedSheet = (sheetKey) =>
    getLocalizedDataset(sheets?.[sheetKey] ?? [], locale);

  // 检查每个组件的手动翻译状态
  const componentTranslationStatus = useMemo(
    () => ({
      slidebanner: hasManualTranslation(resolvedSlidebannerDataset, locale),
      activebanner: hasManualTranslation(sheets?.activebanner ?? [], locale),
      productsbanner: hasManualTranslation(
        sheets?.productsbanner ?? [],
        locale,
      ),
      technologysection: hasManualTranslation(
        sheets?.technologysection ?? [],
        locale,
      ),
      mediasection: hasManualTranslation(sheets?.mediasection ?? [], locale),
      accesssection: hasManualTranslation(sheets?.accesssection ?? [], locale),
      wishessection: hasManualTranslation(sheets?.wishessection ?? [], locale),
    }),
    [resolvedSlidebannerDataset, sheets, locale],
  );

  // 检查是否所有组件都有手动翻译
  const allComponentsHaveManual = useMemo(
    () =>
      Object.values(componentTranslationStatus).every((hasManual) => hasManual),
    [componentTranslationStatus],
  );

  useLocaleAutoTranslate({
    locale,
    componentTranslationStatus,
    rootElementId: 'index',
  });

  const orderedSectionComponents = orderedSections
    .map((sectionKey) => {
      const hasManual = componentTranslationStatus[sectionKey] ?? false;
      const wrapperProps = {
        'data-component': sectionKey,
        className:
          hasManual && !allComponentsHaveManual ? 'notranslate' : undefined,
      };

      switch (sectionKey) {
        case 'slidebanner':
          return (
            <div key="slidebanner" {...wrapperProps}>
              <SlideBanner
                slidebannerDataset={localizedSlidebannerDataset}
                locale={locale}
              />
            </div>
          );
        case 'activebanner':
          return (
            <div key="activebanner" {...wrapperProps}>
              <ActivityBanner
                activityDataset={getLocalizedSheet('activebanner')}
              />
            </div>
          );
        case 'productsbanner':
          return (
            <div key="productsbanner" {...wrapperProps}>
              <ProductsBanner
                productsDataset={getLocalizedSheet('productsbanner')}
              />
            </div>
          );
        case 'technologysection':
          return (
            <div key="technologysection" {...wrapperProps}>
              <TechnologySection
                technologyDataset={getLocalizedSheet('technologysection')}
              />
            </div>
          );
        case 'mediasection':
          return (
            <div key="mediasection" {...wrapperProps}>
              <MediaSection
                mediaDataset={getLocalizedSheet('mediasection')}
              />
            </div>
          );
        case 'accesssection':
          return (
            <div key="accesssection" {...wrapperProps}>
              <AccessSection
                accessDataset={getLocalizedSheet('accesssection')}
              />
            </div>
          );
        case 'wishessection':
          return (
            <div key="wishessection" {...wrapperProps}>
              <WishesSection
                wishesDataset={getLocalizedSheet('wishessection')}
              />
            </div>
          );
        default:
          return null;
      }
    })
    .filter(Boolean);

  return (
    <div id="index" className="index">
      {orderedSectionComponents}
    </div>
  );
}

const HOMEPAGE_FRAGMENTS = `#graphql
  fragment Homepage on Shop {
    metafield(namespace: "custom", key: "homepage") {
      id
      namespace
      key
      type
      value
      reference {
        __typename
        ... on GenericFile {
          id
          url
          mimeType
        }
      }
    }
  }
`;

const HOMEPAGE_QUERY = `#graphql
 query Homepage($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
  shop {
    ...Homepage
  }
 }
${HOMEPAGE_FRAGMENTS}
`;

/**
 * @param {string} url
 */
/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
