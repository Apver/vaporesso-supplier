/**
 * Normalize locale string to lowercase and trim whitespace
 * @param {string|undefined|null} value - Locale string to normalize
 * @returns {string} Normalized locale string
 */
export function normalizeLocale(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase();
}

/**
 * Extract language part from locale (e.g., 'en-US' -> 'en', 'ko-KR' -> 'ko')
 * @param {string} locale - Locale string like 'en-US' or 'ko-KR'
 * @returns {string} Language code (e.g., 'en', 'ko')
 */
export function extractLanguageFromLocale(locale) {
  if (!locale || typeof locale !== 'string') return 'en';

  // Extract language part before the hyphen
  const parts = normalizeLocale(locale).split('-');
  return parts[0] || 'en';
}

/**
 * Check if dataset has manual translation for the given locale
 * @param {Array} dataset - Array of data objects with 'id' and 'locale' properties
 * @param {string} locale - Locale string like 'en-US' or 'ko-KR'
 * @returns {boolean} True if dataset has manual translation for the locale
 */
export function hasManualTranslation(dataset, locale) {
  if (!Array.isArray(dataset) || dataset.length === 0) return false;

  // Extract language part from locale (e.g., 'ko-KR' -> 'ko', 'zh-CN' -> 'zh')
  const targetLanguage = extractLanguageFromLocale(locale);
  const normalizedTargetLanguage = normalizeLocale(targetLanguage);

  // Check if any row has matching locale
  return dataset.some((row) => {
    if (!row || !row.locale) return false;
    const rowLanguage = extractLanguageFromLocale(row.locale);
    return normalizeLocale(rowLanguage) === normalizedTargetLanguage;
  });
}

/**
 * Filter dataset by locale with fallback logic:
 * 1. Extract language part from locale (e.g., 'ko-KR' -> 'ko')
 * 2. Group rows by id
 * 3. For each id, prefer current language, fallback to 'en', then any locale
 * @param {Array} dataset - Array of data objects with 'id' and 'locale' properties
 * @param {string} locale - Locale string like 'en-US' or 'ko-KR'
 * @returns {Array} Filtered dataset with locale preference
 */
export function getLocalizedDataset(dataset, locale) {
  if (!Array.isArray(dataset)) return [];

  // Extract language part from locale (e.g., 'ko-KR' -> 'ko')
  const targetLanguage = extractLanguageFromLocale(locale);
  const normalizedTargetLanguage = normalizeLocale(targetLanguage);
  const normalizedEn = normalizeLocale('en');

  // Group rows by id
  const rowsById = new Map();

  dataset.forEach((row) => {
    if (!row || !row.id) return;

    const rowId = row.id;
    if (!rowsById.has(rowId)) {
      rowsById.set(rowId, []);
    }
    rowsById.get(rowId).push(row);
  });

  // For each id, select the best matching row
  const result = [];

  rowsById.forEach((rowsForId) => {
    // Priority order:
    // 1. Exact language match (e.g., 'ko' when target is 'ko')
    // 2. Default locale ('en')
    // 3. Any row without locale
    // 4. First available row

    let selectedRow = null;

    // Try to find exact language match
    selectedRow = rowsForId.find((row) => {
      const rowLanguage = extractLanguageFromLocale(row.locale);
      return normalizeLocale(rowLanguage) === normalizedTargetLanguage;
    });

    // Fallback to 'en' if no exact match
    if (!selectedRow) {
      selectedRow = rowsForId.find((row) => {
        const rowLanguage = extractLanguageFromLocale(row.locale);
        return normalizeLocale(rowLanguage) === normalizedEn;
      });
    }

    // Fallback to any row without locale
    if (!selectedRow) {
      selectedRow = rowsForId.find((row) => !normalizeLocale(row?.locale));
    }

    // Fallback to first available row
    if (!selectedRow && rowsForId.length > 0) {
      selectedRow = rowsForId[0];
    }

    if (selectedRow) {
      result.push(selectedRow);
    }
  });

  return result;
}

/**
 * Build per-sheet manual translation flags for Google Translate fallback logic.
 * @param {Record<string, unknown>} sheets
 * @param {string | undefined} locale
 * @returns {Record<string, boolean>}
 */
export function buildSheetTranslationStatus(sheets, locale) {
  /** @type {Record<string, boolean>} */
  const status = {};

  if (!sheets || typeof sheets !== 'object') {
    return status;
  }

  for (const [key, rows] of Object.entries(sheets)) {
    if (Array.isArray(rows) && rows.length > 0) {
      status[key] = hasManualTranslation(rows, locale);
    }
  }

  return status;
}
