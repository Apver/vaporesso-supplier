import photoDemoStyles from '~/styles/activity/photo-demo.scss?url';
import photoWallStyles from '~/styles/activity/photo-wall.scss?url';
import xros6WorldcupStyles from '~/styles/activity/xros6-worldcup.scss?url';
import anniversary11thStyles from '~/styles/activity/anniversary-11th.scss?url';

/** @type {Record<string, string[]>} */
export const ACTIVITY_STYLESHEETS_BY_HANDLE = {
  'photo-demo': [photoWallStyles, photoDemoStyles],
  'xros6-worldcup': [xros6WorldcupStyles],
   'anniversary-11th': [anniversary11thStyles]
};

/** @type {Record<string, Array<{rel: string, href?: string, crossOrigin?: string}>>} */
export const ACTIVITY_EXTRA_LINKS_BY_HANDLE = {};

function hrefsToStylesheetDescriptors(hrefs) {
  return hrefs.map((href) => ({rel: 'stylesheet', href}));
}

/**
 * 活动页在 `<head>` 中应输出的 link（含字体等外部资源与活动 CSS）。
 * React Router 7 里 route 的 `links()` 无参调用，拿不到 loader data；
 * 应在 root 中用 `useMatches()` 读到本页 loader 后调用本函数。
 *
 * @param {string | null | undefined} activityHandle
 * @param {boolean} isActivityPage — loader 中包含 `activityHandle` 的活动页路由
 */
export function getActivityStylesheetLinkDescriptors(
  activityHandle,
  isActivityPage,
) {
  if (!isActivityPage || !activityHandle) return [];

  const extraLinks = ACTIVITY_EXTRA_LINKS_BY_HANDLE[activityHandle] ?? [];
  const hrefs = ACTIVITY_STYLESHEETS_BY_HANDLE[activityHandle] ?? [];
  return [...extraLinks, ...hrefsToStylesheetDescriptors(hrefs)];
}
