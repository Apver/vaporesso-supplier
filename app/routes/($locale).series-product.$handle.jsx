import {redirect} from 'react-router';

/**
 * Demo branch: short path `/series-product/xros6` → full product URL.
 * Any other series-product single-segment path goes home.
 * @param {LoaderFunctionArgs} args
 */
export async function loader({params}) {
  const {handle, locale} = params;
  const localePrefix =
    locale && /^[a-z]{2}-[a-z]{2}$/i.test(locale) ? `/${locale}` : '';

  if (handle === 'xros6') {
    throw redirect(`${localePrefix}/series-product/xros-series/xros6`, {
      status: 302,
    });
  }

  throw redirect(localePrefix || '/', {status: 302});
}

export default function SeriesProductHandleRedirect() {
  return null;
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
