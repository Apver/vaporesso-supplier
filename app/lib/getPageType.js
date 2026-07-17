/**
 * 根据路由路径判断页面类型（供官方链接 referrer_type 等非埋点逻辑使用）
 * @param {string} pathname
 * @returns {string}
 */
export function getPageType(pathname) {
  if (!pathname) return 'unknown';

  if (pathname === '/' || pathname === '/index') return 'home';

  if (pathname.startsWith('/products/')) return 'product_detail';

  const productMatch = pathname.match(/series-product\/[^\/]+\/[^\/]+/);
  if (productMatch && !pathname.startsWith('/collections/')) {
    return 'product_detail';
  }

  const seriesMatch = pathname.match(/series-product\/[^\/]+$/);
  if (seriesMatch && !pathname.startsWith('/collections/')) {
    const matchEndIndex =
      pathname.indexOf(seriesMatch[0]) + seriesMatch[0].length;
    if (
      matchEndIndex === pathname.length ||
      pathname[matchEndIndex] === '?' ||
      pathname[matchEndIndex] === '#'
    ) {
      return 'series_detail';
    }
  }

  if (pathname.startsWith('/collections/') || pathname === '/all-product') {
    return 'product_list';
  }

  if (pathname === '/series-product') {
    return 'series_list';
  }

  if (pathname.startsWith('/activity/')) {
    return 'activity';
  }

  if (pathname.startsWith('/blogs/') && pathname !== '/blogs/') {
    return 'blog_detail';
  }
  if (pathname === '/blogs/' || pathname.startsWith('/articles/')) {
    return 'blog_list';
  }

  if (pathname.startsWith('/lifestyle/')) {
    return 'lifestyle';
  }

  if (pathname.startsWith('/about/') || pathname === '/about') {
    return 'about';
  }

  if (pathname.startsWith('/support/') || pathname === '/support') {
    return 'support';
  }

  if (pathname.startsWith('/download/') || pathname === '/download') {
    return 'download';
  }

  if (pathname.startsWith('/store-locator/') || pathname === '/store-locator') {
    return 'store_locator';
  }

  if (
    pathname.startsWith('/pages/') ||
    pathname.startsWith('/search') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/account') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/policies/')
  ) {
    return 'other';
  }

  return 'other';
}
