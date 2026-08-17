import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  createPortal,
} from 'react-dom';

import {
  STORY_SHARE_MODAL_OPEN_EVENT,
} from './storyShareModalEvents';

import './StoryShareModal.scss';


/**
 * 表单初始数据
 */
const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  country: '',
  comment: '',
};


/**
 * Receipt 模板
 */
const RECEIPT_TYPES = [
  {
    id: 'black-green',
    className:
      'story-receipt--black-green',
    image:
      'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-13.webp',
  },
  {
    id: 'pink-black',
    className:
      'story-receipt--pink-black',
    image:
      'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-14.webp',
  },
  {
    id: 'purple-color',
    className:
      'story-receipt--purple-color',
    image:
      'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-15.webp',
  },
];


/**
 * 弹窗焦点控制
 */
const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');


/**
 * 随机选择 Receipt
 */
function getRandomReceipt() {
  const randomIndex =
    Math.floor(
      Math.random() *
        RECEIPT_TYPES.length,
    );

  return RECEIPT_TYPES[
    randomIndex
  ];
}


/**
 * 等待浏览器完成两帧渲染
 */
function waitForRender() {
  return new Promise(
    (resolve) => {
      window.requestAnimationFrame(
        () => {
          window.requestAnimationFrame(
            resolve,
          );
        },
      );
    },
  );
}


/**
 * 等待指定时间
 */
function wait(
  delay,
) {
  return new Promise(
    (resolve) => {
      window.setTimeout(
        resolve,
        delay,
      );
    },
  );
}


/**
 * Canvas 输出尺寸。
 *
 * 和 CSS 中：
 * aspect-ratio: 1153 / 1736;
 * 保持一致。
 */
const RECEIPT_CANVAS_WIDTH = 1153;
const RECEIPT_CANVAS_HEIGHT = 1736;

/**
 * Canvas 导出时的视觉微调。
 * 数值单位为页面中的 CSS px，最终会按 Receipt 比例放大到导出画布。
 */
const RECEIPT_VISUAL_OFFSET_PX = 2.5;
const COMMENT_EXTRA_TOP_GAP_PX = 6;

const RECEIPT_TEXT_SCALE = 1.2;
const RECEIPT_TEXT_OFFSET_X_RATIO_DESKTOP = 0.035;
const RECEIPT_TEXT_OFFSET_X_RATIO_MOBILE = -0.015;
/**
 * 将 Canvas 转为 PNG Blob
 */
function canvasToBlob(canvas) {
  return new Promise(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                'Canvas PNG generation failed.',
              ),
            );

            return;
          }

          resolve(blob);
        },
        'image/png',
        1,
      );
    },
  );
}


/**
 * object-fit: cover 的 Canvas 实现
 */
function drawImageCover(
  context,
  image,
  width,
  height,
) {
  const imageWidth =
    image.naturalWidth || image.width;

  const imageHeight =
    image.naturalHeight || image.height;

  if (
    !imageWidth ||
    !imageHeight
  ) {
    throw new Error(
      'Receipt background image has invalid dimensions.',
    );
  }

  const imageRatio =
    imageWidth / imageHeight;

  const targetRatio =
    width / height;

  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = imageWidth;
  let sourceHeight = imageHeight;

  if (
    imageRatio > targetRatio
  ) {
    sourceWidth =
      imageHeight * targetRatio;

    sourceX =
      (imageWidth - sourceWidth) / 2;
  } else {
    sourceHeight =
      imageWidth / targetRatio;

    sourceY =
      (imageHeight - sourceHeight) / 2;
  }

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    width,
    height,
  );
}


/**
 * CSS px 字符串转 number
 */
function parseCssPixel(value) {
  const result =
    Number.parseFloat(value);

  return Number.isFinite(result)
    ? result
    : 0;
}


/**
 * 将 DOM Rect 转换到最终 Canvas 坐标
 */
function convertRectToCanvas(
  rect,
  receiptRect,
  scaleX,
  scaleY,
) {
  return {
    x:
      (rect.left - receiptRect.left) *
      scaleX,

    y:
      (rect.top - receiptRect.top) *
      scaleY,

    width:
      rect.width * scaleX,

    height:
      rect.height * scaleY,
  };
}


/**
 * 从页面当前 CSS 生成 Canvas font。
 *
 * 不在 JS 里猜字体，直接使用 getComputedStyle()。
 */
function applyComputedFont(
  context,
  computedStyle,
  scale,
  textScale = 1,
) {
  const fontSize =
    parseCssPixel(
      computedStyle.fontSize,
    ) * scale * textScale;

  const fontStyle =
    computedStyle.fontStyle ||
    'normal';

  const fontWeight =
    computedStyle.fontWeight ||
    '400';

  const fontFamily =
    computedStyle.fontFamily ||
    'sans-serif';

  const rawLineHeight =
    computedStyle.lineHeight;

  let lineHeight =
    parseCssPixel(
      rawLineHeight,
    ) * scale * textScale;

  if (!lineHeight) {
    lineHeight =
      fontSize * 1.2;
  }

  context.font =
    `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

  context.textBaseline =
    'alphabetic';

  return {
    fontSize,
    lineHeight,
    letterSpacing:
      parseCssPixel(
        computedStyle.letterSpacing,
      ) * scale * textScale,
  };
}


/**
 * 根据当前 Canvas font metrics，计算文字在一个 CSS 行盒里的 baseline。
 *
 * 这样 line-height: 2.3 / 150% 等不会再把 glyph 贴在盒子顶部。
 */
function getBaselineForLineBox(
  context,
  text,
  lineTop,
  lineHeight,
  fallbackFontSize,
) {
  const metrics =
    context.measureText(
      text || 'Mg',
    );

  const ascent =
    metrics.actualBoundingBoxAscent ||
    fallbackFontSize * 0.8;

  const descent =
    metrics.actualBoundingBoxDescent ||
    fallbackFontSize * 0.2;

  const glyphHeight =
    ascent + descent;

  /**
   * CSS 行盒上下各分一半 leading。
   */
  const leading =
    Math.max(
      0,
      lineHeight - glyphHeight,
    );

  return (
    lineTop +
    leading / 2 +
    ascent
  );
}


/**
 * Canvas 原生 fillText 对 letter-spacing 支持不一致，
 * 所以这里手动逐字符绘制。
 */
function measureTextWithLetterSpacing(
  context,
  text,
  letterSpacing,
) {
  if (!text) {
    return 0;
  }

  let width = 0;

  Array.from(text).forEach(
    (character, index, characters) => {
      width +=
        context.measureText(
          character,
        ).width;

      if (
        index <
        characters.length - 1
      ) {
        width += letterSpacing;
      }
    },
  );

  return width;
}


/**
 * 带 letter-spacing 的文本绘制
 */
function drawTextWithLetterSpacing(
  context,
  text,
  x,
  y,
  letterSpacing,
  align = 'left',
) {
  const characters =
    Array.from(text || '');

  const totalWidth =
    measureTextWithLetterSpacing(
      context,
      text,
      letterSpacing,
    );

  let currentX = x;

  if (
    align === 'center'
  ) {
    currentX -=
      totalWidth / 2;
  } else if (
    align === 'right'
  ) {
    currentX -= totalWidth;
  }

  characters.forEach(
    (character, index) => {
      context.fillText(
        character,
        currentX,
        y,
      );

      currentX +=
        context.measureText(
          character,
        ).width;

      if (
        index <
        characters.length - 1
      ) {
        currentX +=
          letterSpacing;
      }
    },
  );

  return totalWidth;
}

function wrapCanvasText(
  context,
  text,
  maxWidth,
  letterSpacing,
) {
  const source = String(text || '')
    .replace(/\r\n?/g, '\n');

  if (!source) {
    return [];
  }

  const lines = [];

  const pushBrokenWord = (
    word,
    prefix = '',
  ) => {
    let current = prefix;

    Array.from(word).forEach(
      (character) => {
        const candidate =
          `${current}${character}`;

        if (
          current &&
          measureTextWithLetterSpacing(
            context,
            candidate,
            letterSpacing,
          ) > maxWidth
        ) {
          lines.push(current);
          current = character;
        } else {
          current = candidate;
        }
      },
    );

    return current;
  };

  source.split('\n').forEach(
    (paragraph, paragraphIndex, paragraphs) => {
      if (!paragraph) {
        lines.push('');
        return;
      }

      // 保留单词之间的空格，但避免把行首空格画出来。
      const words =
        paragraph.split(/\s+/).filter(Boolean);

      let currentLine = '';

      words.forEach(
        (word) => {
          const candidate =
            currentLine
              ? `${currentLine} ${word}`
              : word;

          const candidateWidth =
            measureTextWithLetterSpacing(
              context,
              candidate,
              letterSpacing,
            );

          if (candidateWidth <= maxWidth) {
            currentLine = candidate;
            return;
          }

          if (currentLine) {
            lines.push(currentLine);
            currentLine = '';
          }

          // 单个长单词也超过宽度时，按字符 break-word。
          if (
            measureTextWithLetterSpacing(
              context,
              word,
              letterSpacing,
            ) > maxWidth
          ) {
            currentLine =
              pushBrokenWord(word);
          } else {
            currentLine = word;
          }
        },
      );

      if (currentLine) {
        lines.push(currentLine);
      }

      // 显式换行保留一个空行。
      if (
        paragraphIndex < paragraphs.length - 1 &&
        paragraphs[paragraphIndex + 1] === ''
      ) {
        lines.push('');
      }
    },
  );

  return lines;
}


/**
 * 确认 Receipt 使用的字体已经真的加载。
 *
 * 如果字体没加载，不生成 fallback 字体图片。
 */
async function ensureReceiptFonts(
  receiptElement,
) {
  if (!document.fonts) {
    return;
  }

  await document.fonts.ready;

  const fontElements = [
    receiptElement.querySelector(
      '.story-receipt__story__span1',
    ),
    receiptElement.querySelector(
      '.story-receipt__story__span2',
    ),
    receiptElement.querySelector(
      '.story-receipt__name',
    ),
    receiptElement.querySelector(
      '.story-receipt__country',
    ),
  ].filter(Boolean);

  await Promise.all(
    fontElements.map(
      async (element) => {
        const style =
          window.getComputedStyle(
            element,
          );

        const descriptor =
          `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

        const sampleText =
          element.textContent?.trim() ||
          'Story';

        await document.fonts.load(
          descriptor,
          sampleText,
        );
      },
    ),
  );

  const missingFonts =
    fontElements.filter(
      (element) => {
        const style =
          window.getComputedStyle(
            element,
          );

        const descriptor =
          `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

        return !document.fonts.check(
          descriptor,
          element.textContent?.trim() ||
            'Story',
        );
      },
    );

  if (
    missingFonts.length
  ) {
    throw new Error(
      'Receipt fonts are not fully loaded on this device.',
    );
  }
}


/**
 * 直接用 Canvas 生成 Receipt。
 * - 字体样式直接读取当前页面 CSS 的 computed style
 */
async function createReceiptBlob(
  receiptElement,
  selectedReceipt,
) {
  if (!receiptElement) {
    throw new Error(
      'Receipt element not found.',
    );
  }

  await ensureReceiptFonts(
    receiptElement,
  );

  const backgroundElement =
    receiptElement.querySelector(
      '.story-receipt__background',
    );

  const storyElement =
    receiptElement.querySelector(
      '.story-receipt__story__span1',
    );

  const receiptTextElement =
    receiptElement.querySelector(
      '.story-receipt__story__span2',
    );

  const commentElement =
    receiptElement.querySelector(
      '.story-receipt__name',
    );

  const nameElement =
    receiptElement.querySelector(
      '.story-receipt__country',
    );

  if (
    !backgroundElement ||
    !storyElement ||
    !receiptTextElement ||
    !commentElement ||
    !nameElement
  ) {
    throw new Error(
      'Receipt content is incomplete.',
    );
  }

  if (
    !backgroundElement.complete
  ) {
    await new Promise(
      (resolve) => {
        backgroundElement.addEventListener(
          'load',
          resolve,
          {once: true},
        );

        backgroundElement.addEventListener(
          'error',
          resolve,
          {once: true},
        );
      },
    );
  }

  try {
    await backgroundElement.decode?.();
  } catch {
    /** ignore */
  }

  const receiptRect =
    receiptElement.getBoundingClientRect();

  if (
    !receiptRect.width ||
    !receiptRect.height
  ) {
    throw new Error(
      'Receipt has invalid dimensions.',
    );
  }

  const scaleX =
    RECEIPT_CANVAS_WIDTH /
    receiptRect.width;

  const scaleY =
    RECEIPT_CANVAS_HEIGHT /
    receiptRect.height;


    const receiptTextOffsetX = RECEIPT_CANVAS_WIDTH * (  window.innerWidth <= 1023  ? RECEIPT_TEXT_OFFSET_X_RATIO_MOBILE : RECEIPT_TEXT_OFFSET_X_RATIO_DESKTOP);

  const fontScale =
    scaleX;

  const canvas =
    document.createElement(
      'canvas',
    );

  canvas.width =
    RECEIPT_CANVAS_WIDTH;

  canvas.height =
    RECEIPT_CANVAS_HEIGHT;

  const context =
    canvas.getContext(
      '2d',
      {
        alpha: true,
      },
    );

  if (!context) {
    throw new Error(
      'Canvas context is unavailable.',
    );
  }

  /**
   * 不铺任何底色。
   * Canvas 默认保持透明，PNG 导出时保留 alpha。
   */
  context.clearRect(
    0,
    0,
    canvas.width,
    canvas.height,
  );

  /**
   * 背景
   */
  drawImageCover(
    context,
    backgroundElement,
    canvas.width,
    canvas.height,
  );

  /**
   * Story
   */
  const storyRect =
    convertRectToCanvas(
      storyElement.getBoundingClientRect(),
      receiptRect,
      scaleX,
      scaleY,
    );

  const storyStyle =
    window.getComputedStyle(
      storyElement,
    );

  const storyFont =
    applyComputedFont(
      context,
      storyStyle,
      fontScale,
    );

  context.fillStyle =
    storyStyle.color || '#fff';

  const storyText =
    storyElement.textContent || 'Story';

  const storyBaseline =
    getBaselineForLineBox(
      context,
      storyText,
      storyRect.y,
      storyRect.height ||
        storyFont.lineHeight,
      storyFont.fontSize,
    );

  /**
   * 保存 Story 字形的真实视觉中心。
   * 后面的 Receipt 不再按它自己的超大 line-height 居中，
   * 而是直接和 Story 的字形中心对齐。
   */
  const storyMetrics =
    context.measureText(
      storyText || 'Story',
    );

  const storyAscent =
    storyMetrics.actualBoundingBoxAscent ||
    storyFont.fontSize * 0.8;

  const storyDescent =
    storyMetrics.actualBoundingBoxDescent ||
    storyFont.fontSize * 0.2;

  const storyVisualCenter =
    storyBaseline +
    (storyDescent - storyAscent) / 2;

  drawTextWithLetterSpacing(
    context,
    storyText,
    storyRect.x + storyRect.width / 2  + receiptTextOffsetX,
    storyBaseline,
    storyFont.letterSpacing,
    'center',
  );

  /**
   * Receipt 渐变文字
   */
  const receiptTextRect =
    convertRectToCanvas(
      receiptTextElement.getBoundingClientRect(),
      receiptRect,
      scaleX,
      scaleY,
    );

  const receiptTextStyle =
    window.getComputedStyle(
      receiptTextElement,
    );

  const receiptTextFont =
    applyComputedFont(
      context,
      receiptTextStyle,
      fontScale,
    );

  const gradient =
    context.createLinearGradient(
      receiptTextRect.x,
      0,
      receiptTextRect.x +
        receiptTextRect.width,
      0,
    );

  if (
    selectedReceipt.id ===
    'pink-black'
  ) {
    gradient.addColorStop(
      0.06,
      '#F189FF',
    );

    gradient.addColorStop(
      1,
      '#FF008E',
    );
  } else {
    gradient.addColorStop(
      0.0067,
      '#D2FF64',
    );

    gradient.addColorStop(
      0.4908,
      '#00FF00',
    );

    gradient.addColorStop(
      0.9843,
      '#00E526',
    );
  }

  context.fillStyle =
    gradient;

  const receiptText =
    receiptTextElement.textContent ||
    'Receipt';
  const receiptMetrics =
    context.measureText(
      receiptText || 'Receipt',
    );

  const receiptAscent =
    receiptMetrics.actualBoundingBoxAscent ||
    receiptTextFont.fontSize * 0.8;

  const receiptDescent =
    receiptMetrics.actualBoundingBoxDescent ||
    receiptTextFont.fontSize * 0.2;

  const receiptVisualOffset =
    RECEIPT_VISUAL_OFFSET_PX *
    scaleY;

  const receiptTextBaseline =
    storyVisualCenter -
    (receiptDescent - receiptAscent) / 2 +
    receiptVisualOffset;

  drawTextWithLetterSpacing(
    context,
    receiptText,
    receiptTextRect.x + receiptTextRect.width / 2 + receiptTextOffsetX,
    receiptTextBaseline,
    receiptTextFont.letterSpacing,
    'center',
  );

  /**
   * Story 正文。
   * 改为使用当前 Canvas font + CSS letter-spacing + 元素实际宽度
   * 自己执行 word-wrap: break-word。
   */
  const commentRect =
    convertRectToCanvas(
      commentElement.getBoundingClientRect(),
      receiptRect,
      scaleX,
      scaleY,
    );

  const commentStyle =
    window.getComputedStyle(
      commentElement,
    );

  const commentFont =
    applyComputedFont(
      context,
      commentStyle,
      fontScale,
      RECEIPT_TEXT_SCALE
    );

  context.fillStyle =
    commentStyle.color || '#fff';

  const commentText =
    commentElement.textContent || '';

  const commentLineHeight =
    commentFont.lineHeight ||
    commentFont.fontSize * 1.5;

  /**
   * 评论文字和上面的 Story / Receipt 再拉开一点距离。
   * 这里用 CSS px 定义，再按当前 Receipt 比例放大。
   */
  const commentStartY =
    commentRect.y +
    COMMENT_EXTRA_TOP_GAP_PX *
      scaleY;

  const commentLines =
    wrapCanvasText(
      context,
      commentText,
      commentRect.width,
      commentFont.letterSpacing,
    );

  commentLines.forEach(
    (line, lineIndex) => {
      const lineTop =
        commentStartY +
        lineIndex * commentLineHeight;

      if (!line) {
        return;
      }

      const baseline =
        getBaselineForLineBox(
          context,
          line,
          lineTop,
          commentLineHeight,
          commentFont.fontSize,
        );

      drawTextWithLetterSpacing(
        context,
        line,
        commentRect.x + commentRect.width / 2 + receiptTextOffsetX,
        baseline,
        commentFont.letterSpacing,
        'center',
      );
    },
  );

  /**
   * 用户名字
   */
  const nameRect =
    convertRectToCanvas(
      nameElement.getBoundingClientRect(),
      receiptRect,
      scaleX,
      scaleY,
    );

  const nameStyle =
    window.getComputedStyle(
      nameElement,
    );

  const nameFont =
    applyComputedFont(
      context,
      nameStyle,
      fontScale,
      RECEIPT_TEXT_SCALE
    );

  context.fillStyle =
    nameStyle.color || '#fff';

  const nameText =
    nameElement.textContent || '';

  const nameBaseline =
    getBaselineForLineBox(
      context,
      nameText,
      nameRect.y + 8 * scaleY,
      nameRect.height ||
        nameFont.lineHeight,
      nameFont.fontSize,
    );

  const nameTextWidth =
    drawTextWithLetterSpacing(
      context,
      nameText,
      nameRect.x + nameRect.width / 2 + receiptTextOffsetX,
      nameBaseline,
      nameFont.letterSpacing,
      'center',
    );

  /**
   * text-decoration: underline
   */
  if (
    nameStyle.textDecorationLine.includes(
      'underline',
    )
  ) {
    const underlineY =
      nameBaseline +
      Math.max(
        1,
        nameFont.fontSize * 0.08,
      );

    context.strokeStyle =
      nameStyle.color || '#fff';

    context.lineWidth =
      Math.max(
        1,
        scaleX * 0.5,
      );

    context.beginPath();

    context.moveTo(
      nameRect.x +
        nameRect.width / 2 +
    receiptTextOffsetX - 
        nameTextWidth / 2,
      underlineY,
    );

    context.lineTo(
      nameRect.x +
        nameRect.width / 2 +
    receiptTextOffsetX +
        nameTextWidth / 2,
      underlineY,
    );

    context.stroke();
  }

  return canvasToBlob(
    canvas,
  );
}


/**
 * 等待 Receipt 中字体 / 图片加载完成
 */
async function waitForReceiptAssets(
  element,
) {
  if (!element) {
    return;
  }

  /**
   * 等待 Web Font
   */
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch (error) {
      console.warn(
        '[StoryShareModal] Font loading warning:',
        error,
      );
    }
  }

  /**
   * 等待所有图片
   */
  const images =
    Array.from(
      element.querySelectorAll(
        'img',
      ),
    );

  await Promise.all(
    images.map(
      async (image) => {
        /**
         * 图片还没有加载完成
         */
        if (!image.complete) {
          await new Promise(
            (resolve) => {
              const handleDone =
                () => {
                  image.removeEventListener(
                    'load',
                    handleDone,
                  );

                  image.removeEventListener(
                    'error',
                    handleDone,
                  );

                  resolve();
                };

              image.addEventListener(
                'load',
                handleDone,
                {
                  once: true,
                },
              );

              image.addEventListener(
                'error',
                handleDone,
                {
                  once: true,
                },
              );
            },
          );
        }

        /**
         * Safari / WebView
         * 等待图片解码
         */
        if (
          typeof image.decode ===
          'function'
        ) {
          try {
            await image.decode();
          } catch {
            /**
             * Safari 某些情况下
             * decode() 会 reject。
             *
             * 不阻塞导出。
             */
          }
        }
      },
    ),
  );

  /**
   * 再等待布局稳定
   */
  await waitForRender();
}


/**
 * 下载 Blob
 */
function downloadBlob(
  blob,
  fileName,
) {
  const url =
    URL.createObjectURL(
      blob,
    );

  const link =
    document.createElement(
      'a',
    );

  link.href = url;

  link.download =
    fileName;

  link.rel =
    'noopener';

  link.style.display =
    'none';

  document.body.appendChild(
    link,
  );

  /**
   * 触发下载
   */
  link.click();

  /**
   * 清理 DOM
   */
  link.remove();

  window.setTimeout(
    () => {
      URL.revokeObjectURL(
        url,
      );
    },
    10000,
  );
}


/**
 * Story Share Modal
 */
export default function StoryShareModal() {
  const dialogRef =
    useRef(null);

  const receiptRef =
    useRef(null);

  const closeButtonRef =
    useRef(null);

  const previousActiveElementRef =
    useRef(null);

  /**
   * 提前生成好的 PNG Blob
   */
  const exportBlobRef =
    useRef(null);


  const [
    portalElement,
    setPortalElement,
  ] = useState(null);


  const [
    isOpen,
    setIsOpen,
  ] = useState(false);


  const [
    step,
    setStep,
  ] = useState(
    'form',
  );


  const [
    formData,
    setFormData,
  ] = useState(
    INITIAL_FORM_DATA,
  );


  const [
    selectedReceipt,
    setSelectedReceipt,
  ] = useState(null);


  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);


  const [
    isExporting,
    setIsExporting,
  ] = useState(false);


  const [
    isExportReady,
    setIsExportReady,
  ] = useState(false);


  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');


  /**
   * Portal
   */
  useEffect(() => {
    setPortalElement(
      document.body,
    );
  }, []);


  /**
   * 重置 Modal
   */
  const resetModal =
    useCallback(() => {
      setStep(
        'form',
      );

      setFormData(
        INITIAL_FORM_DATA,
      );

      setSelectedReceipt(
        null,
      );

      setIsSubmitting(
        false,
      );

      setIsExporting(
        false,
      );

      setIsExportReady(
        false,
      );

      setErrorMessage(
        '',
      );

      exportBlobRef.current =
        null;
    }, []);


  /**
   * 打开 Modal
   */
  const handleOpen =
    useCallback(() => {
      previousActiveElementRef.current =
        document.activeElement;

      resetModal();

      setIsOpen(
        true,
      );
    }, [
      resetModal,
    ]);


  /**
   * 关闭 Modal
   */
  const handleClose =
    useCallback(() => {
      setIsOpen(
        false,
      );

      window.requestAnimationFrame(
        () => {
          previousActiveElementRef
            .current
            ?.focus?.();
        },
      );
    }, []);


  /**
   * 监听打开事件
   */
  useEffect(() => {
    window.addEventListener(
      STORY_SHARE_MODAL_OPEN_EVENT,
      handleOpen,
    );

    return () => {
      window.removeEventListener(
        STORY_SHARE_MODAL_OPEN_EVENT,
        handleOpen,
      );
    };
  }, [
    handleOpen,
  ]);


  /**
   * Modal 打开后：
   *
   * 1. 禁止背景滚动
   * 2. 停止 Lenis
   * 3. ESC 关闭
   * 4. Tab 焦点锁定
   */
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const htmlElement =
      document.documentElement;

    const bodyElement =
      document.body;

    const previousHtmlOverflow =
      htmlElement.style
        .overflow;

    const previousBodyOverflow =
      bodyElement.style
        .overflow;

    const previousBodyPaddingRight =
      bodyElement.style
        .paddingRight;

    const scrollbarWidth =
      window.innerWidth -
      htmlElement.clientWidth;

    htmlElement.style.overflow =
      'hidden';

    bodyElement.style.overflow =
      'hidden';

    if (
      scrollbarWidth > 0
    ) {
      bodyElement.style.paddingRight =
        `${scrollbarWidth}px`;
    }

    window.lenis?.stop?.();

    const focusTimer =
      window.setTimeout(
        () => {
          closeButtonRef
            .current
            ?.focus();
        },
        0,
      );


    const handleKeyDown =
      (event) => {
        /**
         * ESC
         */
        if (
          event.key ===
          'Escape'
        ) {
          handleClose();

          return;
        }

        /**
         * Tab Focus Trap
         */
        if (
          event.key !==
            'Tab' ||
          !dialogRef.current
        ) {
          return;
        }

        const focusableElements =
          Array.from(
            dialogRef.current
              .querySelectorAll(
                FOCUSABLE_SELECTOR,
              ),
          );

        if (
          !focusableElements.length
        ) {
          event.preventDefault();

          return;
        }

        const firstElement =
          focusableElements[0];

        const lastElement =
          focusableElements[
            focusableElements.length -
              1
          ];

        if (
          event.shiftKey &&
          document.activeElement ===
            firstElement
        ) {
          event.preventDefault();

          lastElement.focus();

          return;
        }

        if (
          !event.shiftKey &&
          document.activeElement ===
            lastElement
        ) {
          event.preventDefault();

          firstElement.focus();
        }
      };


    window.addEventListener(
      'keydown',
      handleKeyDown,
    );


    return () => {
      window.clearTimeout(
        focusTimer,
      );

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );

      htmlElement.style.overflow =
        previousHtmlOverflow;

      bodyElement.style.overflow =
        previousBodyOverflow;

      bodyElement.style.paddingRight =
        previousBodyPaddingRight;

      window.lenis?.start?.();
    };
  }, [
    isOpen,
    handleClose,
  ]);


  /**
   * Input Change
   */
  const handleInputChange =
    (event) => {
      const {
        name,
        value,
      } = event.target;

      setFormData(
        (
          currentFormData,
        ) => ({
          ...currentFormData,

          [name]:
            value,
        }),
      );

      if (
        errorMessage
      ) {
        setErrorMessage(
          '',
        );
      }
    };


  /**
   * 表单校验
   */
  const validateForm =
    () => {
      const emailRegExp =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !formData.name.trim()
      ) {
        return (
          'Please enter your full name.'
        );
      }

      if (
        !formData.email.trim()
      ) {
        return (
          'Please enter your email address.'
        );
      }

      if (
        !emailRegExp.test(
          formData.email.trim(),
        )
      ) {
        return (
          'Please enter a valid email address.'
        );
      }

      if (
        !formData.country.trim()
      ) {
        return (
          'Please enter your country.'
        );
      }

      if (
        !formData.comment.trim()
      ) {
        return (
          'Please share your story.'
        );
      }

      return '';
    };


  /**
   * 提交 Story
   */
  const submitStory =
    async (
      submitData,
    ) => {
      console.log(
        'Story submit data:',
        submitData,
      );

      const response =
        await fetch(
          'https://brand.vaporesso.com/vaporesso/java/data/comment/addComment',
          {
            method:
              'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify(
                submitData,
              ),
          },
        );

      if (
        !response.ok
      ) {
        throw new Error(
          'Story submission failed.',
        );
      }

      return response.json();
    };


  /**
   * Submit
   */
  const handleSubmit =
    async (
      event,
    ) => {
      event.preventDefault();

      if (
        isSubmitting
      ) {
        return;
      }

      const validationMessage =
        validateForm();

      if (
        validationMessage
      ) {
        setErrorMessage(
          validationMessage,
        );

        return;
      }

      /**
       * 随机选择 Receipt
       */
      const receipt =
        getRandomReceipt();

      const submitData = {
        name:
          formData.name.trim(),

        email:
          formData.email.trim(),

        country:
          formData.country.trim(),

        comment:
          formData.comment.trim(),

        url:
          window.location.href,

        type:
          '20260818',
      };

      setIsSubmitting(
        true,
      );

      setErrorMessage(
        '',
      );

      try {
        await submitStory(
          submitData,
        );

        setSelectedReceipt(
          receipt,
        );

        setStep(
          'complete',
        );
      } catch (
        error
      ) {
        console.error(
          '[StoryShareModal] Submit failed:',
          error,
        );

        setErrorMessage(
          error instanceof
          Error
            ? error.message
            : 'Submission failed. Please try again.',
        );
      } finally {
        setIsSubmitting(
          false,
        );
      }
    };


  const handlePreviousStep =
    () => {
      setStep(
        'form',
      );

      setErrorMessage(
        '',
      );

      setIsExportReady(
        false,
      );

      exportBlobRef.current =
        null;
    };

  /**
   * 预生成最终分享 PNG。
   *
   * 不再进行 DOM Screenshot。
   * 直接使用原生 Canvas 绘制。
   */
  useEffect(() => {
    if (
      step !== 'complete' ||
      !selectedReceipt
    ) {
      exportBlobRef.current =
        null;

      setIsExportReady(
        false,
      );

      return undefined;
    }

    let cancelled = false;


    const prepareExportImage =
      async () => {
        exportBlobRef.current =
          null;

        setIsExportReady(
          false,
        );

        try {
          /**
           * 等 React 和 CSS 完全布局。
           */
          await waitForRender();

          const receiptElement =
            receiptRef.current;

          if (
            !receiptElement ||
            cancelled
          ) {
            return;
          }

          /**
           * 等背景图和当前页面字体。
           */
          await waitForReceiptAssets(
            receiptElement,
          );

          await wait(200);

          if (cancelled) {
            return;
          }

          /**
           * Canvas 直接生成最终 PNG。
           */
          const blob =
            await createReceiptBlob(
              receiptElement,
              selectedReceipt,
            );

          if (cancelled) {
            return;
          }

          exportBlobRef.current =
            blob;

          setIsExportReady(
            true,
          );
        } catch (error) {
          console.error(
            '[StoryShareModal] Canvas export failed:',
            error,
          );

          if (!cancelled) {
            setErrorMessage(
              error instanceof Error &&
              error.message.includes(
                'fonts',
              )
                ? 'The receipt fonts are not loaded correctly on this device.'
                : 'The image could not be generated. Please try again.',
            );
          }
        }
      };


    prepareExportImage();


    return () => {
      cancelled = true;

      exportBlobRef.current =
        null;
    };
  }, [
    step,
    selectedReceipt,
  ]);

function isMobileDevice() {
  /**
   * Chrome / Edge 新 API
   */
  if (
    navigator.userAgentData?.mobile
  ) {
    return true;
  }

  /**
   * 常规手机
   */
  if (
    /Android|iPhone|iPod/i.test(
      navigator.userAgent,
    )
  ) {
    return true;
  }

  /**
   * iPadOS 有时会伪装成 Mac
   */
  if (
    navigator.platform === 'MacIntel' &&
    navigator.maxTouchPoints > 1
  ) {
    return true;
  }

  return false;
}

const handleDownloadAndShare =
  async () => {
    if (isExporting) {
      return;
    }

    const blob =
      exportBlobRef.current;

    if (!blob) {
      setErrorMessage(
        'The image is still being prepared. Please try again.',
      );

      return;
    }

    setIsExporting(true);
    setErrorMessage('');

    const fileName =
      `extraordinary-story-${Date.now()}.png`;

    try {
      /**
       * =========================================
       * 手机
       * =========================================
       */
      if (isMobileDevice()) {
        const file =
          new File(
            [blob],
            fileName,
            {
              type:
                blob.type ||
                'image/png',
            },
          );

        const shareData = {
          title:
            'My Extraordinary Story',

          files: [
            file,
          ],
        };

        /**
         * iPhone / Android
         * 支持文件分享时直接调用系统 Share Sheet
         */
        if (
          typeof navigator.share ===
            'function' &&
          typeof navigator.canShare ===
            'function' &&
          navigator.canShare(
            shareData,
          )
        ) {
          await navigator.share(
            shareData,
          );

          return;
        }

        /**
         * 手机不支持 Web Share
         * fallback 下载
         */
        downloadBlob(
          blob,
          fileName,
        );

        return;
      }


      /**
       * =========================================
       * PC
       * =========================================
       *
       * 保持你的原需求：
       *
       * 下载图片
       * +
       * 新窗口打开 Instagram
       */

      /**
       * 先同步创建窗口，
       * 避免 popup blocker。
       */
      const instagramWindow =
        window.open(
          'about:blank',
          '_blank',
        );


      /**
       * 先下载 PNG
       */
      downloadBlob(
        blob,
        fileName,
      );


      /**
       * 再让新窗口进入 Instagram
       */
      window.setTimeout(
        () => {
          if (
            instagramWindow &&
            !instagramWindow.closed
          ) {
            instagramWindow.location.href =
              'https://www.instagram.com/';
          }
        },
        500,
      );
    } catch (error) {
      /**
       * 用户主动关闭手机 Share Sheet
       */
      if (
        error instanceof Error &&
        error.name ===
          'AbortError'
      ) {
        return;
      }

      console.error(
        '[StoryShareModal] Download / Share failed:',
        error,
      );

      setErrorMessage(
        'The image could not be shared. Please try again.',
      );
    } finally {
      setIsExporting(false);
    }
  };


  if (
    !portalElement ||
    !isOpen
  ) {
    return null;
  }


  return createPortal(
    <div
      className="story-share-modal"
    >
      <button
        type="button"
        className="story-share-modal__backdrop"
        aria-label="Close modal"
        onClick={
          handleClose
        }
      />


      <div
        ref={
          dialogRef
        }
        className="story-share-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-share-modal-title"
      >
        <button
          ref={
            closeButtonRef
          }
          type="button"
          className="story-share-modal__close"
          aria-label="Close modal"
          onClick={
            handleClose
          }
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-12.webp"
            alt=""
            aria-hidden="true"
          />
        </button>


        {step ===
          'form' && (
          <form
            className="story-share-modal__form"
            onSubmit={
              handleSubmit
            }
          >
            <div
              className="story-share-modal__intro"
            >
              <h2
                id="story-share-modal-title"
                className="story-share-modal__title"
              >
                <span>
                  Share
                </span>

                Your

                <br />

                Extraordinary

                <br />

                Story
              </h2>


              <p
                className="story-share-modal__description"
              >
                Share your story below to enter the
                anniversary lucky draw.
              </p>


              <button
                type="submit"
                className="story-share-modal__button story-share-modal__button--desktop"
                disabled={
                  isSubmitting
                }
              >
                {isSubmitting
                  ? 'Submitting...'
                  : 'Submit'}
              </button>


              {errorMessage && (
                <p
                  className="story-share-modal__error story-share-modal__error--desktop"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}
            </div>


            <div
              className="story-share-modal__fields"
            >
              <div
                className="story-share-modal__field"
              >
                <label
                  className="story-share-modal__sr-only"
                  htmlFor="story-name"
                >
                  Full Name
                </label>


                <input
                  id="story-name"
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  placeholder="Full Name"
                  autoComplete="name"
                  onChange={
                    handleInputChange
                  }
                />
              </div>


              <div
                className="story-share-modal__field"
              >
                <label
                  className="story-share-modal__sr-only"
                  htmlFor="story-email"
                >
                  Email Address
                </label>


                <input
                  id="story-email"
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  placeholder="Email Address"
                  autoComplete="email"
                  onChange={
                    handleInputChange
                  }
                />
              </div>


              <div
                className="story-share-modal__field"
              >
                <label
                  className="story-share-modal__sr-only"
                  htmlFor="story-country"
                >
                  Country
                </label>


                <input
                  id="story-country"
                  type="text"
                  name="country"
                  value={
                    formData.country
                  }
                  placeholder="Country"
                  autoComplete="country-name"
                  onChange={
                    handleInputChange
                  }
                />
              </div>


              <div
                className="story-share-modal__field story-share-modal__field--story"
              >
                <label
                  className="story-share-modal__sr-only"
                  htmlFor="story-comment"
                >
                  Share Your Story
                </label>


                <textarea
                  id="story-comment"
                  name="comment"
                  value={
                    formData.comment
                  }
                  placeholder="Share Your Story"
                  maxLength={
                    400
                  }
                  onChange={
                    handleInputChange
                  }
                />
              </div>


              <button
                type="submit"
                className="story-share-modal__button story-share-modal__button--mobile"
                disabled={
                  isSubmitting
                }
              >
                {isSubmitting
                  ? 'Submitting...'
                  : 'Submit'}
              </button>


              {errorMessage && (
                <p
                  className="story-share-modal__error story-share-modal__error--mobile"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        )}


        {step ===
          'complete' &&
          selectedReceipt && (
          <div
            className="story-share-modal__complete"
          >
            <div
              className="story-share-modal__complete-content"
            >
              <h2
                id="story-share-modal-title"
                className="story-share-modal__complete-title"
              >
                <span>
                  Thank you
                </span>


                <strong>
                  for sharing your

                  <br />

                  extraordinary journey.
                </strong>
              </h2>


              <p
                className="story-share-modal__complete-description"
              >
                Your story may inspire others to

                <br />

                move beyond ordinary.
              </p>


              <div
                className="story-share-modal__actions"
              >
                <button
                  type="button"
                  className="story-share-modal__button story-share-modal__button--secondary"
                  onClick={
                    handlePreviousStep
                  }
                >
                  Previous Step
                </button>


                <button
                  type="button"
                  className="story-share-modal__button"
                  disabled={
                    isExporting ||
                    !isExportReady
                  }
                  onClick={
                    handleDownloadAndShare
                  }
                >
                  {!isExportReady
                    ? 'Preparing...'
                    : isExporting
                      ? 'Opening Instagram...'
                      : 'Download & Share'}
                </button>
              </div>


              {errorMessage && (
                <p
                  className="story-share-modal__error"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}
            </div>


            <div
              className="story-share-modal__receipt-preview"
            >
              <div
                className={[
                  'story-share-modal__receipt-rotate',

                  `story-share-modal__receipt-rotate--${selectedReceipt.id}`,
                ].join(
                  ' ',
                )}
              >
                <div
                  ref={
                    receiptRef
                  }
                  className={[
                    'story-receipt',

                    selectedReceipt.className,
                  ].join(
                    ' ',
                  )}
                >
                  <img
                    className="story-receipt__background"
                    src={
                      selectedReceipt.image
                    }
                    alt=""
                    crossOrigin="anonymous"
                  />


                  <div
                    className="story-receipt__overlay"
                  >
                    <div
                      className="story-receipt__story"
                    >
                      <span
                        className="story-receipt__story__span1"
                      >
                        Story
                      </span>


                      <span
                        className="story-receipt__story__span2"
                      >
                        Receipt
                      </span>
                    </div>


                    <p
                      className="story-receipt__name"
                    >
                      {
                        formData.comment
                      }
                    </p>


                    <p
                      className="story-receipt__country"
                    >
                      {
                        formData.name
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div
              className="story-share-modal__mobile-actions"
            >
              <button
                type="button"
                className="story-share-modal__button story-share-modal__button--secondary"
                onClick={
                  handlePreviousStep
                }
              >
                Previous Step
              </button>


              <button
                type="button"
                className="story-share-modal__button"
                disabled={
                  isExporting ||
                  !isExportReady
                }
                onClick={
                  handleDownloadAndShare
                }
              >
                {!isExportReady
                  ? 'Preparing...'
                  : isExporting
                    ? 'Opening Instagram...'
                    : 'Download & Share'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,

    portalElement,
  );
}