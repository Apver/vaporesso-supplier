import {redirect} from 'react-router';

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({params}) {
  const {locale} = params;
  const localePrefix =
    locale && /^[a-z]{2}-[a-z]{2}$/i.test(locale) ? `/${locale}` : '';

  throw redirect(`${localePrefix || '/'}`, {status: 302});
}

export default function CatchAllPage() {
  return null;
}

/** @typedef {import('./+types/$').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
