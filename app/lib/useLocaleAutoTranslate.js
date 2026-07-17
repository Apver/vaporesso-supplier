import {useEffect, useMemo} from 'react';
import {useLocation, useParams} from 'react-router';
import {extractLanguageFromLocale} from '~/lib/localization';
import {
  LOCALE_TO_LANG_CODE,
  deleteCookie,
  getLangCodeFromUrl,
  getLanguageName,
  setCookie,
} from '~/lib/googleTranslate';

/**
 * Resolve locale from route params or URL prefix.
 * @returns {string | undefined}
 */
export function useRouteLocale() {
  const {locale} = useParams();
  const location = useLocation();

  if (locale) {
    return locale.toLowerCase();
  }

  const match = location.pathname.match(/^\/([a-z]{2}-[a-z]{2})(\/|$)/i);
  return match ? match[1].toLowerCase() : undefined;
}

/**
 * Display label for the active language, derived from the route locale.
 * Safe for SSR and client hydration (does not read navigator/window).
 */
export function useCurrentLanguageLabel() {
  const locale = useRouteLocale();
  const location = useLocation();
  const langCode = useMemo(() => {
    if (locale && LOCALE_TO_LANG_CODE[locale]) {
      return LOCALE_TO_LANG_CODE[locale];
    }
    return getLangCodeFromUrl(location.pathname);
  }, [locale, location.pathname]);

  return useMemo(() => getLanguageName(langCode), [langCode]);
}

const MANAGED_TRANSLATION_ROOT_IDS = ['index', 'series-product-page'];

function hasManagedTranslationRoot() {
  if (typeof document === 'undefined') return false;
  return MANAGED_TRANSLATION_ROOT_IDS.some((id) =>
    document.getElementById(id),
  );
}

/**
 * Enable Google Translate when locale is non-English and manual copy is missing.
 * Manual sections can be excluded via componentTranslationStatus + data-component wrappers.
 *
 * @param {object} options
 * @param {string | undefined} [options.locale]
 * @param {Record<string, boolean>} [options.componentTranslationStatus]
 * @param {string} [options.rootElementId]
 * @param {boolean} [options.skipWhenManagedRootsExist]
 */
export function useLocaleAutoTranslate({
  locale: localeProp,
  componentTranslationStatus = {},
  rootElementId = 'page-content',
  skipWhenManagedRootsExist = false,
}) {
  const routeLocale = useRouteLocale();
  const locale = localeProp ?? routeLocale;

  const trackedKeys = Object.keys(componentTranslationStatus);

  const allComponentsHaveManual = useMemo(
    () =>
      trackedKeys.length > 0 &&
      trackedKeys.every((key) => componentTranslationStatus[key]),
    [componentTranslationStatus, trackedKeys],
  );

  const currentLanguage = extractLanguageFromLocale(locale);
  const langCode = LOCALE_TO_LANG_CODE[locale?.toLowerCase() ?? ''] || 'en';

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    if (skipWhenManagedRootsExist && hasManagedTranslationRoot()) {
      return;
    }

    const rootElement =
      document.getElementById(rootElementId) ||
      document.querySelector('main') ||
      document.body;

    if (!rootElement) return;

    if (allComponentsHaveManual) {
      rootElement.classList.add('notranslate');
      deleteCookie('googtrans');
      return;
    }

    if (currentLanguage !== 'en' && langCode !== 'en') {
      rootElement.classList.remove('notranslate');
      setCookie('googtrans', `/en/${langCode}`);

      Object.entries(componentTranslationStatus).forEach(
        ([componentKey, hasManual]) => {
          if (!hasManual) return;
          const componentElement = document.querySelector(
            `[data-component="${componentKey}"]`,
          );
          if (componentElement) {
            componentElement.classList.add('notranslate');
          }
        },
      );
      return;
    }

    rootElement.classList.add('notranslate');
    deleteCookie('googtrans');
  }, [
    allComponentsHaveManual,
    componentTranslationStatus,
    currentLanguage,
    langCode,
    locale,
    rootElementId,
    skipWhenManagedRootsExist,
  ]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (skipWhenManagedRootsExist && hasManagedTranslationRoot()) return;
    if (allComponentsHaveManual) return;
    if (currentLanguage === 'en' || langCode === 'en') return;

    const checkAndTriggerTranslation = () => {
      if (window.google?.translate?.TranslateElement) {
        const translateElement = document.querySelector('.goog-te-combo');
        if (translateElement) {
          if (translateElement.value !== langCode) {
            translateElement.value = langCode;
            translateElement.dispatchEvent(
              new Event('change', {bubbles: true}),
            );
          }
          return true;
        }
      }
      return false;
    };

    const timer = setTimeout(() => {
      if (checkAndTriggerTranslation()) return;

      let retryCount = 0;
      const maxRetries = 100;
      const retryInterval = setInterval(() => {
        if (checkAndTriggerTranslation() || retryCount >= maxRetries) {
          clearInterval(retryInterval);
        }
        retryCount++;
      }, 100);
    }, 100);

    return () => clearTimeout(timer);
  }, [
    allComponentsHaveManual,
    currentLanguage,
    langCode,
    locale,
    skipWhenManagedRootsExist,
  ]);
}
