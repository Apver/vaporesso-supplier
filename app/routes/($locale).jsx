import {redirect} from 'react-router';

const LOCALE_SEGMENT_RE = /^[a-z]{2}-[a-z]{2}$/i;

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, context, request}) {
  const {language, country} = context.storefront.i18n;

  // If no locale param, allow (default locale route)
  if (!params.locale) {
    return null;
  }

  // Only validate real locale prefixes (e.g. en-us). Paths like assets, pod
  // are route segments, not locales — let child routes or legacy redirects handle them.
  // Short lang codes (de, es, fr, id, pt, ru) are 301'd to full locales in legacyRedirects.
  if (!LOCALE_SEGMENT_RE.test(params.locale)) {
    return null;
  }

  const paramLocale = params.locale.toUpperCase();
  const contextLocale = `${language}-${country}`.toUpperCase();

  // Check if locale matches context (which is parsed from URL)
  // If it doesn't match, verify it matches the URL path directly
  if (paramLocale !== contextLocale) {
    const url = new URL(request.url);
    const pathLocale = url.pathname.split('/')[1]?.toUpperCase() || '';

    // If param locale matches the URL path, it's valid
    // This handles cases where context might not be updated yet
    if (paramLocale !== pathLocale) {
      throw redirect('/', {status: 302});
    }
  }

  return null;
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
