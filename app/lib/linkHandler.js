import {getPageType} from '~/lib/getPageType';

/**
 * 全局链接处理工具
 * 当链接包含 from=official 参数时，添加 referrer 和 referrer_type 参数
 */

/**
 * 获取当前页面的查询参数
 * @returns {URLSearchParams} 当前页面的查询参数
 */
function getCurrentSearchParams() {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

/**
 * 检查链接是否包含 from=official 参数
 * @param {string} url - 要检查的链接URL
 * @returns {boolean} 是否包含 from=official 参数
 */
export function hasOfficialFormParam(url) {
  try {
    const urlObj = new URL(
      url,
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost',
    );
    return (
      urlObj.searchParams.has('from') &&
      urlObj.searchParams.get('from') === 'official'
    );
  } catch (error) {
    console.warn('Invalid URL provided to hasOfficialFormParam:', url, error);
    return false;
  }
}

/**
 * 为官方来源链接添加必要参数
 * @param {string} url - 原始链接URL
 * @returns {string} 添加了必要参数的链接URL
 */
export function addOfficialTrackingParams(url) {
  try {
    const urlObj = new URL(
      url,
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost',
    );

    // 添加必要的参数
    const necessaryParams = {
      referrer: typeof window !== 'undefined' ? window.location.href : '',
      referrer_type:
        typeof window !== 'undefined'
          ? getPageType(window.location.pathname)
          : 'unknown',
    };

    // 将必要参数添加到目标链接
    Object.entries(necessaryParams).forEach(([key, value]) => {
      if (value && !urlObj.searchParams.has(key)) {
        urlObj.searchParams.set(key, value);
      }
    });

    return urlObj.toString();
  } catch (error) {
    console.warn('Failed to add necessary params to URL:', url, error);
    return url;
  }
}

/**
 * 处理链接点击事件
 * @param {Event} event - 点击事件
 */
export function handleLinkClick(event) {
  // 只处理左键点击，不处理有修饰键的点击
  if (
    event.button !== 0 ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.metaKey
  ) {
    return;
  }

  const target = event.target.closest('a');
  if (!target) return;

  const href = target.getAttribute('href');
  if (!href) return;

  // 检查是否是内部链接或mailto/tel等特殊链接
  if (
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#') ||
    href.startsWith('javascript:')
  ) {
    return;
  }

  // 检查是否包含 from=official 参数
  if (hasOfficialFormParam(href)) {
    event.preventDefault();

    // 添加必要参数
    const processedUrl = addOfficialTrackingParams(href);

    // 更新链接的href属性
    target.setAttribute('href', processedUrl);

    // 执行导航
    if (target.getAttribute('target') === '_blank') {
      window.open(processedUrl, '_blank');
    } else {
      window.location.href = processedUrl;
    }
  }
}

/**
 * 初始化全局链接处理器
 * 拦截页面上所有的链接点击事件
 */
export function initGlobalLinkHandler() {
  if (typeof window === 'undefined') return;

  // 使用事件委托，监听document上的点击事件
  document.addEventListener('click', handleLinkClick, true);

  // 清理函数
  return () => {
    document.removeEventListener('click', handleLinkClick, true);
  };
}

/**
 * 手动处理单个链接
 * @param {string} url - 要处理的链接URL
 * @returns {string} 添加了必要参数的链接URL
 */
export function processOfficialLink(url) {
  if (hasOfficialFormParam(url)) {
    return addOfficialTrackingParams(url);
  }
  return url;
}

// 开发环境下的测试函数
export function testLinkHandler() {
  if (typeof window === 'undefined') return;

  console.log('=== 链接处理器测试 ===');

  // 测试用例
  const testUrls = [
    'https://example.com?from=official',
    'https://example.com?from=official&other=param',
    'https://example.com?other=param&from=official',
    'https://example.com?from=unofficial',
    'https://example.com',
    '/products?from=official',
    '/products?from=official&category=vape',
  ];

  testUrls.forEach((url) => {
    const processed = processOfficialLink(url);
    console.log(`原始链接: ${url}`);
    console.log(`处理后: ${processed}`);
    console.log(`是否为官方链接: ${hasOfficialFormParam(url)}`);
    console.log(`是否改变: ${processed !== url ? '是' : '否'}`);
    console.log('---');
  });
}
