import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
import {getCheckoutDomain} from '~/lib/env';
import {resolveLegacyRedirect} from '~/lib/legacyRedirects';

const LOCAL_DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
];

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {EntryContext} reactRouterContext
 * @param {HydrogenRouterContextProvider} context
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  reactRouterContext,
  context,
) {
  const legacyRedirect = resolveLegacyRedirect(request);
  if (legacyRedirect) {
    return new Response(null, {
      status: legacyRedirect.status,
      headers: {Location: legacyRedirect.target},
    });
  }

  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: getCheckoutDomain(context.env),
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    scriptSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://translate.googleapis.com',
      'https://translate.google.com',
      'https://translate-pa.googleapis.com',
      'https://maps.googleapis.com',
      'https://maps.gstatic.com',
      'https://www.gstatic.com',
      'https://cdn.jsdelivr.net',
      'https://code.jquery.com',
      'https://cdnjs.cloudflare.com',
      'https://scaleflex.cloudimg.io',
      '*.yiguotech.com',
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://cdn.shopify.com',
      'https://www.gstatic.com',
      'https://maps.gstatic.com',
      'https://fonts.googleapis.com',
      'https://cdn.jsdelivr.net',
      'https://cdnjs.cloudflare.com',
      'https://www.vaporesso.com',
      ...LOCAL_DEV_ORIGINS,
    ],
    connectSrc: [
      'https://translate-pa.googleapis.com',
      'https://translate.googleapis.com',
      'https://maps.googleapis.com',
      'https://maps.gstatic.com',
      'https://places.googleapis.com',
      'https://*.googleapis.com',
      'https://www.vaporesso.com',
      'https://brand.vaporesso.com',
      'https://cdn.shopify.com',
      '*.yiguotech.com',
    ],
    imgSrc: [
      "'self'",
      'data:',
      'blob:',
      'https://www.vaporesso.com',
      'https://oss.vaporesso.com',
      'https://cdn.shopify.com',
      'https://maps.gstatic.com',
      'https://maps.googleapis.com',
      'https://*.googleapis.com',
      'https://*.ggpht.com',
      ...LOCAL_DEV_ORIGINS,
    ],
    frameSrc: ["'self'"],
    fontSrc: [
      "'self'",
      'data:',
      'https://www.vaporesso.com',
      'https://cdn.shopify.com',
      'https://fonts.gstatic.com',
      ...LOCAL_DEV_ORIGINS,
    ],
    mediaSrc: [
      "'self'",
      'https://www.vaporesso.com',
      'https://www.dojovape.com',
      'https://cdn.shopify.com',
      'blob:',
      'data:',
      ...LOCAL_DEV_ORIGINS,
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

/** @typedef {import('@shopify/hydrogen').HydrogenRouterContextProvider} HydrogenRouterContextProvider */
/** @typedef {import('react-router').EntryContext} EntryContext */
