/**
 * @param {Request} request
 */
export function getLocaleFromRequest(request) {
  const url = new URL(request.url);
  const firstPathPart = url.pathname.split('/')[1]?.toUpperCase() ?? '';

  let pathPrefix = '';
  let [language, country] = ['EN', 'US'];

  if (/^[A-Z]{2}-[A-Z]{2}$/i.test(firstPathPart)) {
    pathPrefix = '/' + firstPathPart;
    [language, country] = firstPathPart.split('-');
  }

  return {language, country, pathPrefix};
}

/**
 * 获取 Shopify GraphQL 查询所需的 LanguageCode
 * 中文 locale (zh-cn) 需要转换为完整的 ZH_CN，其他语言直接使用 storefront.i18n.language
 * @param {string|undefined} locale - URL 中的 locale 参数（如 'zh-cn', 'en-us', 'ko-kr'）
 * @param {string|undefined} storefrontLanguage - storefront.i18n.language 的值
 * @returns {string} Shopify LanguageCode（如 'ZH_CN', 'EN', 'KO' 等）
 */
export function getShopifyLanguageCode(locale, storefrontLanguage) {
  // 中文需要特殊处理为完整的 ZH_CN
  if (locale?.toLowerCase() === 'zh-cn') {
    return 'ZH_CN';
  }
  // 其他语言直接使用 storefront.i18n.language
  return storefrontLanguage || 'EN';
}

/**
 * @typedef {Object} I18nLocale
 * @property {string} pathPrefix
 */

/** @typedef {import('@shopify/hydrogen').I18nBase} I18nBase */
