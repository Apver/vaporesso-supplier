/**
 * Google Translate related constants and utility functions
 */

// Language code to display name mapping (matches Google Translate)
export const LANGUAGE_NAMES = {
  en: 'English',
  'zh-CN': '中文',
  ru: 'Русский',
  fr: 'Français',
  pt: 'Português',
  es: 'Español',
  it: 'Italiano',
  id: 'Bahasa Indonesia',
  ko: '한국어',
  hr: 'Hrvatski',
  cs: 'Čeština',
  da: 'Dansk',
  nl: 'Nederlands',
  de: 'Deutsch',
  el: 'Ελληνικά',
  iw: 'עברית',
  hu: 'Magyar',
  ga: 'Gaeilge',
  ja: '日本語',
  ro: 'Română',
  sr: 'Српски',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  ar: 'العربية',
};

// Locale format (e.g., 'en-us') to language code (e.g., 'en') mapping
export const LOCALE_TO_LANG_CODE = {
  'en-us': 'en',
  'zh-cn': 'zh-CN',
  'ru-ru': 'ru',
  'fr-fr': 'fr',
  'pt-pt': 'pt',
  'es-es': 'es',
  'it-it': 'it',
  'id-id': 'id',
  'ko-kr': 'ko',
  'hr-hr': 'hr',
  'cs-cz': 'cs',
  'da-dk': 'da',
  'nl-nl': 'nl',
  'de-de': 'de',
  'el-gr': 'el',
  'iw-il': 'iw',
  'hu-hu': 'hu',
  'ga-ie': 'ga',
  'ja-jp': 'ja',
  'ro-ro': 'ro',
  'sr-rs': 'sr',
  'th-th': 'th',
  'vi-vn': 'vi',
  'ar-sa': 'ar',
};

// Supported languages list for Google Translate
export const INCLUDED_LANGUAGES =
  'en,ru,fr,zh-CN,pt,es,it,id,ko,hr,cs,da,nl,de,el,iw,hu,ga,ja,ro,sr,th,vi,ar';

// Google Translate configuration
export const GOOGLE_TRANSLATE_CONFIG = {
  pageLanguage: 'en',
  includedLanguages: INCLUDED_LANGUAGES,
  autoDisplay: false,
};

/**
 * Get language code from URL pathname
 * @param {string} pathname - Current pathname
 * @returns {string} Language code or 'en' as default
 */
export function getLangCodeFromUrl(pathname) {
  const localeMatch = pathname.match(/^\/([a-zA-Z]{2}-[a-zA-Z]{2})(\/|$)/i);
  if (localeMatch) {
    const locale = localeMatch[1].toLowerCase();
    return LOCALE_TO_LANG_CODE[locale] || null;
  }
  return 'en'; // Default to English
}

/**
 * Get language display name from language code
 * @param {string} langCode - Language code (e.g., 'en', 'zh-CN')
 * @returns {string} Language display name
 */
export function getLanguageName(langCode) {
  return LANGUAGE_NAMES[langCode] || langCode;
}

/**
 * Get navigator language
 * @returns {string} Browser language code
 */
export function getNavigatorLanguage() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'en';
  }
  return (
    navigator.language ||
    navigator.browserLanguage ||
    navigator.userLanguage ||
    'en'
  );
}

/**
 * Set a cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiration days (default: 365)
 */
export function setCookie(name, value, days = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; expires=${expires.toUTCString()}; path=/`;
}

/**
 * Delete a cookie
 * @param {string} name - Cookie name
 */
export function deleteCookie(name) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

/**
 * Check if current viewport is desktop
 * @returns {boolean} True if desktop (width >= 1024px)
 */
export function isDesktop() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
}

