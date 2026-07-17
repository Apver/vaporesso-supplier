export const SHOP_CORNER_ACTIVITY_PATH = '/activity/shop-corner';
export const SHOP_CORNER_WALL_ACTIVITY_PATH = '/activity/shop-corner-wall';

/**
 * @param {string} [code]
 */
export function buildShopCornerWallPath(code) {
  if (!code) return SHOP_CORNER_WALL_ACTIVITY_PATH;
  return `${SHOP_CORNER_WALL_ACTIVITY_PATH}?code=${encodeURIComponent(code)}`;
}

/**
 * @param {string} [code]
 */
export function buildShopCornerWallShareUrl(code) {
  const path = buildShopCornerWallPath(code);

  if (typeof window === 'undefined') {
    return path;
  }

  return new URL(path, window.location.origin).toString();
}
