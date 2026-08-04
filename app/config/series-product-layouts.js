import {
  Xros6Layout,
  Xros6ProductSpecData,
} from '~/components/SeriesProduct/XrosSeries/Xros6';
import {
  XrosMiniRetroLayout,
  XrosMiniRetroProductSpecData,
} from '~/components/SeriesProduct/XrosSeries/XrosMiniRetro';
import {
  XrosMiniFreshLayout,
  XrosMiniFreshProductSpecData,
} from '~/components/SeriesProduct/XrosSeries/XrosMiniFresh';
import {
  XrosSeLayout,
  XrosSeProductSpecData,
} from '~/components/SeriesProduct/XrosSeries/XrosSe';
import {
  PrixLayout,
  PrixProductSpecData,
} from '~/components/SeriesProduct/PrixKit/Prix';
import {resolveSeriesProductTemplate} from '~/config/series-product-links';

/** 不展示 ProductNav / SpecSection / Product3DViewer 的 template 值 */
export const SERIES_PRODUCT_NO_NAV_TEMPLATES = [];

/**
 * 系列列表页（/series-product/*）移动端卡片文字强制黑色的 template 白名单。
 * 值必须与 Shopify 商品 metafield `custom.template` 完全一致。
 */
export const SERIES_LIST_MOBILE_BLACK_TEXT_TEMPLATES = new Set(['xros6']);

/** @param {Record<string, unknown> | null | undefined} product */
export function shouldForceSeriesListMobileBlackText(product) {
  const template = resolveSeriesProductTemplate(product);
  return (
    template != null && SERIES_LIST_MOBILE_BLACK_TEXT_TEMPLATES.has(template)
  );
}

/** @param {Record<string, unknown> | null | undefined} product */
export function getSeriesListMobileBlackTextClass(product) {
  return shouldForceSeriesListMobileBlackText(product)
    ? ' mobile-black-text'
    : '';
}

/**
 * 系列列表页（/series-product/*）移动端卡片文字强制白色的 template 白名单。
 * 值必须与 Shopify 商品 metafield `custom.template` 完全一致。
 */
export const SERIES_LIST_MOBILE_WHITE_TEXT_TEMPLATES = new Set([]);

/** @param {Record<string, unknown> | null | undefined} product */
export function shouldForceSeriesListMobileWhiteText(product) {
  const template = resolveSeriesProductTemplate(product);
  return (
    template != null && SERIES_LIST_MOBILE_WHITE_TEXT_TEMPLATES.has(template)
  );
}

/** @param {Record<string, unknown> | null | undefined} product */
export function getSeriesListMobileWhiteTextClass(product) {
  return shouldForceSeriesListMobileWhiteText(product)
    ? ' mobile-white-text'
    : '';
}

/** @param {Record<string, unknown> | null | undefined} product */
export function getSeriesListMobileTextClass(product) {
  return `${getSeriesListMobileBlackTextClass(product)}${getSeriesListMobileWhiteTextClass(product)}`;
}

export const SERIES_PRODUCT_SPEC_DATA_IN_JS = [
  'xros6',
  'xros-mini-retro',
  'xros-mini-fresh',
  'xros-se',
  'prix',
];

/** template → 硬编码 Spec 数据（见各产品目录 languageText.js） */
export const SERIES_PRODUCT_SPEC_DATA_BY_TEMPLATE = {
  xros6: Xros6ProductSpecData,
  'xros-mini-retro': XrosMiniRetroProductSpecData,
  'xros-mini-fresh': XrosMiniFreshProductSpecData,
  'xros-se': XrosSeProductSpecData,
  prix: PrixProductSpecData,
};

/**
 * 系列产品页：template metafield 值 → Overview 区 Layout 与埋点配置。
 * @typedef {object} SeriesProductLayoutEntry
 * @property {import('react').ComponentType<any>} Layout
 * @property {string | null} specElementId — 点击 Check Specs 时的 element id；null 表示只切 tab 不打点
 * @property {boolean} [withSheetsLocale] — 是否对 sheets 做 locale 过滤；默认 true
 */
/** @type {Record<string, SeriesProductLayoutEntry>} */
export const SERIES_PRODUCT_LAYOUT_ENTRIES = {
  xros6: {
    Layout: Xros6Layout,
    specElementId: 'check-specs-xros-6',
  },
  'xros-mini-retro': {
    Layout: XrosMiniRetroLayout,
    specElementId: 'check-specs-xros-mini-retro',
  },
  'xros-mini-fresh': {
    Layout: XrosMiniFreshLayout,
    specElementId: 'check-specs-xros-mini-fresh',
  },
  'xros-se': {
    Layout: XrosSeLayout,
    specElementId: 'check-specs-xros-se',
  },
  prix: {
    Layout: PrixLayout,
    specElementId: 'check-specs-prix',
  },
};
