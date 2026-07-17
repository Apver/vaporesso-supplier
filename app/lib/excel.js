import * as XLSX from 'xlsx';

/**
 * @typedef {{
 *   firstSheetName: string | null;
 *   sheetOrder: string[];
 *   sheets: Record<string, Record<string, string>[]>;
 * }} ParsedWorkbook
 */

/**
 * Download and parse an Excel workbook from a remote URL.
 * @param {string} url
 * @returns {Promise<ParsedWorkbook>}
 */
export async function parseExcelFromUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `下载 Excel 失败: ${response.status} ${response.statusText}`,
    );
  }
  const buffer = await response.arrayBuffer();
  const workbook = XLSX.read(buffer, {
    type: 'array',
    cellStyles: true,
  });

  const sheetNames = workbook.SheetNames ?? [];
  if (sheetNames.length === 0) {
    console.warn('Excel 文件中没有找到工作表');
    return {
      firstSheetName: null,
      sheetOrder: [],
      sheets: {},
    };
  }

  const [firstSheetName, ...restSheetNames] = sheetNames;
  const sheets = {};

  sheets[firstSheetName] = parseWorksheet(workbook.Sheets[firstSheetName]);

  restSheetNames.forEach((sheetName) => {
    sheets[sheetName] = parseWorksheet(workbook.Sheets[sheetName]);
  });

  return {
    firstSheetName,
    sheetOrder: sheetNames,
    sheets,
  };
}

/**
 * @param {XLSX.WorkSheet | undefined} worksheet
 * @returns {Record<string, string>[]}
 */
export function parseWorksheet(worksheet) {
  if (!worksheet) return [];

  const headerRow =
    XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      range: 0,
      blankrows: false,
      defval: '',
    })[0] ?? [];

  if (headerRow.length === 0) return [];

  const jsonRows = XLSX.utils.sheet_to_json(worksheet, {
    range: 1,
    defval: '',
    blankrows: false,
    header: headerRow,
  });

  if (worksheet['!merges']?.length) {
    worksheet['!merges'].forEach((merge) => {
      const startCol = merge.s.c;
      const startRow = merge.s.r;
      if (startCol >= headerRow.length) return;
      const headerName = headerRow[startCol];
      if (!headerName) return;
      const cellAddress = XLSX.utils.encode_cell({c: startCol, r: startRow});
      const cellValue = worksheet[cellAddress]?.v ?? '';
      for (let r = merge.s.r; r <= merge.e.r; r += 1) {
        const rowIndex = r - 1;
        if (
          rowIndex >= 0 &&
          jsonRows[rowIndex] &&
          !jsonRows[rowIndex][headerName]
        ) {
          jsonRows[rowIndex][headerName] = cellValue;
        }
      }
    });
  }

  return jsonRows.filter((row) =>
    Object.values(row).some((value) => String(value).trim() !== ''),
  );
}

/**
 * 合并 footer Excel 工作表内容，方便组件直接消费。
 * @param {ParsedWorkbook | null | undefined} workbook
 * @returns {Record<string, unknown> | null}
 */
export function buildFooterContentFromExcel(workbook) {
  if (!workbook || typeof workbook !== 'object') {
    return null;
  }
  const sheetOrder = Array.isArray(workbook.sheetOrder)
    ? workbook.sheetOrder
    : [];
  const preferredSheetName =
    sheetOrder.find((name) =>
      typeof name === 'string' ? name.toLowerCase().includes('footer') : false,
    ) ?? workbook.firstSheetName;

  if (!preferredSheetName) {
    return null;
  }

  const rows = workbook.sheets?.[preferredSheetName];
  if (!Array.isArray(rows) || rows.length === 0) {
    return null;
  }

  const mergedContent = rows.reduce((acc, row) => {
    if (!row || typeof row !== 'object') {
      return acc;
    }

    Object.entries(row).forEach(([rawKey, rawValue]) => {
      const key =
        typeof rawKey === 'string'
          ? rawKey
              .trim()
              .replace(/\s+/g, '')
              .replace(/^[^a-zA-Z0-9_]+|[^a-zA-Z0-9_]+$/g, '')
          : '';
      if (!key) {
        return;
      }

      const value = normalizeFooterExcelValue(rawValue);
      if (value !== undefined) {
        acc[key] = value;
      }
    });

    return acc;
  }, {});

  if (Object.keys(mergedContent).length === 0) {
    return null;
  }

  return mergedContent;
}

/**
 * 将 Excel 单元格值转换为可用的 footer 字段值。
 * @param {unknown} value
 * @returns {unknown | undefined}
 */
export function normalizeFooterExcelValue(value) {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length ? trimmed : undefined;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'object') {
    return {...value};
  }

  return undefined;
}
