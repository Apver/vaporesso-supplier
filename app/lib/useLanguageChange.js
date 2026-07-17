import {useRef, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router';

/**
 * Map Google Translate language code to route locale format
 * @param {string} langCode - Google Translate language code (e.g., 'en', 'zh-CN', 'fr')
 * @returns {string} - Route locale format (e.g., 'en-US', 'zh-CN', 'fr-FR')
 */
function mapLanguageToLocale(langCode) {
  const langMap = {
    en: 'en-us',
    'zh-CN': 'zh-cn',
    ru: 'ru-ru',
    fr: 'fr-fr',
    pt: 'pt-pt',
    es: 'es-es',
    it: 'it-it',
    id: 'id-id',
    ko: 'ko-kr',
    hr: 'hr-hr',
    cs: 'cs-cz',
    da: 'da-dk',
    nl: 'nl-nl',
    de: 'de-de',
    el: 'el-gr',
    iw: 'iw-il',
    hu: 'hu-hu',
    ga: 'ga-ie',
    ja: 'ja-jp',
    ro: 'ro-ro',
    sr: 'sr-rs',
    th: 'th-th',
    vi: 'vi-vn',
    ar: 'ar-sa',
  };
  return langMap[langCode] || langCode;
}

/**
 * Get browser's preferred language code
 * @returns {string} - Browser language code (e.g., 'en-US', 'zh-CN')
 */
export function getBrowserLanguage() {
  let localLanguage = '';
  if (typeof navigator !== 'undefined') {
    // Standard property, works in modern browsers
    if (navigator.language) {
      localLanguage = navigator.language;
    }
    // Fallback for older browsers (mainly IE)
    else if (navigator.browserLanguage) {
      localLanguage = navigator.browserLanguage;
    }
  }
  return localLanguage;
}

/**
 * Convert browser language to route locale format
 * @returns {string} - Route locale format (e.g., 'en-us', 'zh-cn')
 */
export function getBrowserLocale() {
  const browserLang = getBrowserLanguage();
  if (!browserLang) return null;

  // Handle format like 'zh-CN', 'zh-TW', 'en-US', 'pt-BR'
  const locale = mapLanguageToLocale(browserLang);
  return locale;
}

/**
 * Custom hook for handling language changes and updating URL
 * @returns {function} handleLanguageChange - Function to call when language changes
 * @example
 * ```jsx
 * const handleLanguageChange = useLanguageChange();
 * // Use in Google Translate widget callback
 * useGoogleTranslateWidget(handleLanguageChange);
 * ```
 */
export function useLanguageChange() {
  const location = useLocation();
  const navigate = useNavigate();
  const lastLanguageRef = useRef(null);

  /**
   * Handle language change and update URL
   * @param {string} langCode - Google Translate language code
   */
  const handleLanguageChange = (langCode) => {
    if (!langCode) return;

    const locale = mapLanguageToLocale(langCode);
    const currentPath = location.pathname;

    // Check if we're already on the target locale to avoid unnecessary navigation
    const currentLocaleMatch = currentPath.match(
      /^\/([a-zA-Z]{2}-[a-zA-Z]{2})(\/|$)/,
    );
    const currentLocale = currentLocaleMatch
      ? currentLocaleMatch[1].toLowerCase()
      : null;

    // If already on the target locale, skip navigation
    if (currentLocale === locale.toLowerCase()) {
      return;
    }

    // Prevent duplicate language changes within 100ms
    const now = Date.now();
    if (
      lastLanguageRef.current &&
      lastLanguageRef.current.langCode === langCode &&
      now - (lastLanguageRef.current.timestamp || 0) < 100
    ) {
      return;
    }
    lastLanguageRef.current = {langCode, timestamp: now};

    // Execute navigation immediately (synchronously) to ensure URL updates
    // before Google Translate starts translating the page
    // Remove existing locale from path if present
    // Pattern matches: /en-US or /en-US/ or /en-US/products/xxx
    const localePattern = /^\/[a-zA-Z]{2}-[a-zA-Z]{2}(\/|$)/i;
    let pathWithoutLocale = currentPath.replace(localePattern, '/');

    // Normalize: ensure path starts with / and handle root case
    if (pathWithoutLocale === '' || pathWithoutLocale === '/') {
      // Homepage: /{locale}
      pathWithoutLocale = '';
    } else if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale;
    }

    // Build new path
    const newPath =
      pathWithoutLocale === ''
        ? `/${locale}` // Homepage: /{locale}
        : `/${locale}${pathWithoutLocale}`; // Other pages: /{locale}/xxx

    // Preserve search params (but remove _routes param if present)
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('_routes');
    const search = searchParams.toString();
    const newUrl = newPath + (search ? `?${search}` : '');

    // Only navigate if the URL is actually different
    const currentUrl = location.pathname + location.search;
    if (newUrl !== currentUrl) {
      navigate(newUrl, {replace: true});
    }
  };

  return handleLanguageChange;
}

/**
 * Hook to automatically switch to browser's preferred language
 * Only navigates if:
 * 1. No locale is set in URL (root path)
 * 2. Browser language is supported by the app
 *
 * @returns {boolean} - Whether a language switch was triggered
 * @example
 * ```jsx
 * import { useAutoLanguage } from '~/lib/useLanguageChange';
 *
 * function MyComponent() {
 *   const switched = useAutoLanguage();
 *   return null; // or loading indicator
 * }
 * ```
 */
/**
 * Languages that should NOT auto-switch
 * Chinese users typically prefer to manually select their language
 */
const SKIP_AUTO_SWITCH_LOCALES = ['zh-cn'];

export function useAutoLanguage() {
  const location = useLocation();
  const navigate = useNavigate();
  const executedRef = useRef(false);
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    // 确保只在客户端执行，且只执行一次
    if (!isClient || executedRef.current) return;
    executedRef.current = true;

    console.log("executedRef.current ", executedRef.current)

    // 延迟执行，确保所有初始化完成
    const timer = setTimeout(() => {
      try {
        const currentPath = location?.pathname || '/';
        console.log('[AutoLanguage] currentPath:', currentPath);

        // Check if URL already has a locale
        const localePattern = /^\/[a-zA-Z]{2}-[a-zA-Z]{2}(\/|$)/i;
        const hasLocale = localePattern.test(currentPath);
        console.log('[AutoLanguage] hasLocale:', hasLocale);

        // Only auto-switch if no locale is set
        if (!hasLocale) {
          // 获取浏览器语言
          const browserLocale = getBrowserLocale();
          console.log('[AutoLanguage] browserLocale:', browserLocale);

          if (browserLocale) {
            // Skip auto-switch for Chinese (user preference)
            const isChinese = SKIP_AUTO_SWITCH_LOCALES.some(
              locale => browserLocale.toLowerCase() === locale.toLowerCase(),
            );
            console.log('[AutoLanguage] isChinese:', isChinese);

            if (!isChinese) {
              // Build new path
              const newPath = `/${browserLocale}`;

              // Preserve search params (but remove _routes param if present)
              const search = location?.search || '';
              const newUrl = newPath + search;
              console.log('[AutoLanguage] Navigating to:', newUrl);

              navigate(newUrl, {replace: true, scroll: false});
              console.log('[AutoLanguage] navigate called successfully');
            }
          }
        }
      } catch (error) {
        console.error('[AutoLanguage] Error:', error);
      }
    }, 50); // 50ms 延迟

    return () => clearTimeout(timer);
  }, [location, navigate, isClient]);

  return executedRef.current;
}
