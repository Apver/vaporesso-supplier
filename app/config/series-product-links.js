import productStyles from '~/styles/series-product/product.css?url';
import uiV3Styles from '~/styles/series-product/ui-v3.scss?url';
import uiV4Styles from '~/styles/ui-v4/common.scss?url';
import xros6Styles from '~/styles/series-product/xros-6.scss?url';
import xrosMiniRetroStyles from '~/styles/series-product/xros-mini-retro.scss?url';

/** URL / Shopify handle → template（metafield 缺失时的回退） */
export const SERIES_PRODUCT_HANDLE_TEMPLATE_MAP = {
  xros6: 'xros6',
};

/**
 * 将 Shopify metafield / handle 解析出的 template 规范化为布局与样式表键。
 * @param {string | null | undefined} template
 */
export function normalizeSeriesProductTemplate(template) {
  if (!template) return null;
  return SERIES_PRODUCT_HANDLE_TEMPLATE_MAP[template] ?? template;
}

/**
 * 从产品 metafields 解析 `custom.template`；缺失时按 handle 回退。
 * @param {Record<string, unknown> | null | undefined} product
 * @param {string | undefined} [requestedHandle]
 */
export function resolveSeriesProductTemplate(product, requestedHandle) {
  let template = null;
  const metafields = product?.metafields;
  if (Array.isArray(metafields)) {
    const templateMetafield = metafields.find(
      (metafield) =>
        metafield?.namespace === 'custom' && metafield?.key === 'template',
    );
    if (templateMetafield) {
      if (templateMetafield.reference?.__typename === 'Metaobject') {
        const field = templateMetafield.reference.fields?.find(
          (f) => f?.key === 'template',
        );
        if (field?.value) template = field.value;
      } else if (templateMetafield.value) {
        template = templateMetafield.value;
      }
    }
  }

  const productHandle = product?.handle;
  if (
    !template &&
    requestedHandle &&
    SERIES_PRODUCT_HANDLE_TEMPLATE_MAP[requestedHandle]
  ) {
    template = SERIES_PRODUCT_HANDLE_TEMPLATE_MAP[requestedHandle];
  }
  if (
    !template &&
    productHandle &&
    SERIES_PRODUCT_HANDLE_TEMPLATE_MAP[productHandle]
  ) {
    template = SERIES_PRODUCT_HANDLE_TEMPLATE_MAP[productHandle];
  }
  return normalizeSeriesProductTemplate(template);
}

/** template 未知时回退到 demo 产品样式 */
const SERIES_PRODUCT_FALLBACK_STYLE_HREFS = [
  productStyles,
  uiV3Styles,
  xros6Styles,
];

/** @type {Record<string, string[]>} */
const SERIES_PRODUCT_STYLESHEETS_BY_TEMPLATE = {
  xros6: [productStyles, uiV3Styles, xros6Styles],
  'xros-mini-retro': [productStyles, uiV4Styles, xrosMiniRetroStyles],
};

function hrefsToStylesheetDescriptors(hrefs) {
  return hrefs.map((href) => ({rel: 'stylesheet', href}));
}

/**
 * 系列产品详情页在 `<head>` 中应输出的 stylesheet。
 * 注意：React Router 7 里 route 的 `links()` **不会**传入 loader `data`，不能在此根据 template 分叉；
 * 应在 root 中用 `useMatches()` 读到本页 loader 后调用本函数。
 *
 * @param {string | null | undefined} seriesProductTemplate
 * @param {boolean} isSeriesProductDetailPage — loader 中包含 `seriesProductTemplate` 的那条系列产品详情路由
 */
export function getSeriesProductStylesheetLinkDescriptors(
  seriesProductTemplate,
  isSeriesProductDetailPage,
) {
  if (!isSeriesProductDetailPage) return [];
  const hrefs =
    seriesProductTemplate &&
    SERIES_PRODUCT_STYLESHEETS_BY_TEMPLATE[seriesProductTemplate]
      ? SERIES_PRODUCT_STYLESHEETS_BY_TEMPLATE[seriesProductTemplate]
      : SERIES_PRODUCT_FALLBACK_STYLE_HREFS;
  return hrefsToStylesheetDescriptors(hrefs);
}
