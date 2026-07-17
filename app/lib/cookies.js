/**
 * @param {string} name
 * @returns {string | null}
 */
export function getCookie(name) {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
    ),
  );

  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * @param {string} name
 * @param {string} value
 * @param {number} [days=365]
 */
export function setCookie(name, value, days = 365) {
  if (typeof document === 'undefined') return;

  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; expires=${expires.toUTCString()}; path=/`;
}
