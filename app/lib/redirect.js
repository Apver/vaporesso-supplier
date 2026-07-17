import {redirect} from 'react-router';

const LOCALE_SEGMENT_RE = /^[a-z]{2}-[a-z]{2}$/i;

/**
 * Redirect to the storefront home page, preserving locale prefix when present.
 * @param {string | undefined} locale
 * @param {number} [status]
 */
export function redirectToHome(locale, status = 302) {
  const localePrefix =
    locale && LOCALE_SEGMENT_RE.test(locale) ? `/${locale}` : '';
  throw redirect(`${localePrefix || '/'}`, {status});
}

/**
 * @param {Request} request
 * @param {...Array<{
 *     handle: string;
 *     data: {handle: string} & unknown;
 *   }>} [localizedResources]
 */
export function redirectIfHandleIsLocalized(request, ...localizedResources) {
  const url = new URL(request.url);
  let shouldRedirect = false;

  localizedResources.forEach(({handle, data}) => {
    if (handle !== data.handle) {
      url.pathname = url.pathname.replace(handle, data.handle);
      shouldRedirect = true;
    }
  });

  if (shouldRedirect) {
    throw redirect(url.toString());
  }
}
