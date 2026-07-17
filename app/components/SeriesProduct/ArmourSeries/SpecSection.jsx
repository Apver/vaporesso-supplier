// SpecSection.jsx
export function TextWithImageSpec({
  itemTitle,
  primaryProductTitle,
  secondaryProductTitle,
  primaryTextWithImage,
  primaryTextWithImageMobile,
  secondaryTextWithImage,
}) {
  let isPackageList = /pack/i.test(String(itemTitle ?? ''));
  let isSize = itemTitle?.includes('Size') || false;
  let isMSRP = itemTitle?.includes('MSRP') || false;
  // 解析文本：换行 → 节点 → 检测是否包含图片
  const renderTextWithImage = (text, title) => {
    if (text === null || text === undefined)
      return {nodes: null, hasImage: false};

    const normalized = typeof text === 'string' ? text : String(text);
    const parts = normalized.split(/\r?\n/);

    let hasImage = false;

    const nodes = parts.map((part, partIndex) => {
      let trimmed = part.trim();
      if (!trimmed) {
        const keyBase = `${title || 'text'}-${partIndex}-br`;
        return (
          <p key={keyBase}>
            <br />
          </p>
        );
      }

      // 识别图片
      const isImage = /\.(jpg|jpeg|png|webp|gif|svg)\b/i.test(trimmed);

      if (isImage) {
        hasImage = true;
        const keyBase = `${title || 'text'}-${partIndex}-${trimmed}-img`;
        return (
          <img
            key={keyBase}
            src={trimmed}
            alt={isPackageList ? `${title} package list` : ''}
            className="ls-is-cached lazyloaded"
          />
        );
      }

      // ⭐ 加粗逻辑：尖括号 <> 与中括号 [] 为独立判断（不重合）
      let isBold = false;
      let isBracketBold = false;

      // 尖括号逻辑：<text>
      if (/^<([^<>]+)>$/.test(trimmed)) {
        isBold = true;
        trimmed = trimmed.replace(/^<([^<>]+)>$/, '$1');
      }

      // 中括号逻辑： [text] （独立处理）
      if (/^\[([^\[\]]+)\]$/.test(trimmed)) {
        isBracketBold = true;
        trimmed = trimmed.replace(/^\[([^\[\]]+)\]$/, '$1');
      }

      // ⭐ 括号逻辑：被 () 包裹，去掉外层括号，同时用于判断尖括号时是否添加 grey
      let isInParentheses = false;
      if (/^\((.+)\)$/.test(trimmed)) {
        isInParentheses = true;
        trimmed = trimmed.replace(/^\((.+)\)$/, '$1');
      }

      const keyBase = `${title || 'text'}-${partIndex}-${trimmed}-p`;

      // 加 class：
      // - 尖括号触发时保留原有行为：'f-d-bold title'，并在非括号包裹时添加 'grey'
      // - 中括号触发时仅添加 'f-d-bold'
      const classArray = ['mb_10'];
      if (isBold) {
        classArray.push('f-d-bold', 'title');
        if (!isInParentheses) classArray.push('grey');
      } else if (isBracketBold) {
        classArray.push('f-d-bold');
      }
      if (isMSRP) classArray.push('f-price');
      const className = classArray.filter(Boolean).join(' ');

      return (
        <p key={keyBase} className={className}>
          {trimmed}
        </p>
      );
    });

    return {nodes, hasImage};
  };

  // PRIMARY 数据解析
  const primaryDesktop = renderTextWithImage(
    primaryTextWithImage,
    primaryProductTitle,
  );
  const hasMobilePrimaryText =
    primaryTextWithImageMobile !== null &&
    primaryTextWithImageMobile !== undefined &&
    String(primaryTextWithImageMobile).trim() !== '';
  const primaryMobile = renderTextWithImage(
    hasMobilePrimaryText ? primaryTextWithImageMobile : primaryTextWithImage,
    primaryProductTitle,
  );
  const primaryHasImage = primaryDesktop.hasImage || primaryMobile.hasImage;

  // SECONDARY 数据解析
  const secondary = secondaryProductTitle
    ? renderTextWithImage(secondaryTextWithImage, secondaryProductTitle)
    : null;

  return (
    <ul className={isPackageList ? 'package-list' : 'l'}>
      <li className="f_24 f-d-bold">{itemTitle}</li>

      {/* PRIMARY BLOCK */}
      {(() => {
        let primaryClasses = [
          'f_15 d',
          isSize ? 'size' : '',
          primaryHasImage ? '' : 'd-2',
        ]
          .join(' ')
          .trim();

        // ⭐ 如果同时包含 d 和 d-2 → 添加 right
        if (
          primaryClasses.includes(' d ') ||
          primaryClasses.endsWith(' d') ||
          primaryClasses.startsWith('d ')
        ) {
          if (primaryClasses.includes('d-2')) {
            primaryClasses += ' right';
          }
        }

        return (
          <li className={primaryClasses}>
            {primaryProductTitle && (
              <p className="title f-d-bold x-hide notranslate">
                {primaryProductTitle}
              </p>
            )}

            <div className="s-hide">{primaryDesktop.nodes}</div>
            <div className="x-hide">{primaryMobile.nodes}</div>
          </li>
        );
      })()}

      {/* SECONDARY BLOCK */}
      {secondaryProductTitle &&
        (() => {
          let secondaryClasses = [
            'f_15',
            'd',
            isSize ? 'size' : '',
            secondary.hasImage ? '' : 'd-2',
          ]
            .join(' ')
            .trim();

          return (
            <li className={secondaryClasses}>
              <p className="title f-d-bold x-hide notranslate">
                {secondaryProductTitle}
              </p>

              {secondary.nodes}
            </li>
          );
        })()}
    </ul>
  );
}

export function ColorSpec({
  itemTitle,
  primaryProductTitle,
  secondaryProductTitle,

  // primary PC
  primaryColorTitle,
  primaryColorImages,
  primaryColorLabel,

  // primary mobile
  primaryColorTitleMobile,
  primaryColorImagesMobile,
  primaryColorLabelMobile,

  // secondary PC
  secondaryColorTitle,
  secondaryColorImages,
  secondaryColorLabel,

  // secondary Mobile
  secondaryColorTitleMobile,
  secondaryColorImagesMobile,
  secondaryColorLabelMobile,
}) {
  // 将 / 转为 <br/>
  const formatLineBreaks = (value) => {
    if (typeof value !== 'string') return value;
    return value.replace('/', '<br/>');
  };

  //----------------------------------------
  // ⭐ 工具函数：通用分割
  //----------------------------------------
  const splitLines = (str) =>
    typeof str === 'string' ? str.split(/\r?\n/).map((i) => i.trim()) : [];

  const splitGroup = (str) =>
    typeof str === 'string' ? str.split('?').map((i) => i.trim()) : [];

  //----------------------------------------
  // ⭐ primary PC 数据
  //----------------------------------------
  const primaryImageList = splitLines(primaryColorImages);
  const primaryLabelList = splitGroup(primaryColorLabel);
  const primaryTitleList = splitGroup(primaryColorTitle);

  // 获取全局渲染行数 = primary title index 0 的行数
  const primaryFirstTitle = primaryTitleList[0] || '';
  const primaryFirstTitleItems = splitLines(primaryFirstTitle);
  const primaryGlobalRenderCount = primaryFirstTitleItems.length;

  //----------------------------------------
  // ⭐ primary Mobile 数据
  //----------------------------------------
  const primaryImageListMobile = splitLines(primaryColorImagesMobile);
  const primaryLabelListMobile = splitGroup(primaryColorLabelMobile);
  const primaryTitleListMobile = splitGroup(primaryColorTitleMobile);

  // 获取全局渲染行数 = primary title index 0 的行数
  const primaryFirstTitleMobile = primaryTitleListMobile[0] || '';
  const primaryFirstTitleItemsMobile = splitLines(primaryFirstTitleMobile);
  const primaryGlobalRenderCountMobile = primaryFirstTitleItemsMobile.length;

  //----------------------------------------
  // ⭐ secondary PC 数据
  //----------------------------------------
  const secondaryImageList = splitLines(secondaryColorImages);
  const secondaryLabelList = splitGroup(secondaryColorLabel);
  const secondaryTitleList = splitGroup(secondaryColorTitle);

  // 获取全局渲染行数 = secondary title index 0 的行数
  const secondaryFirstTitle = secondaryTitleList[0] || '';
  const secondaryFirstTitleItems = splitLines(secondaryFirstTitle);
  const secondaryGlobalRenderCount = secondaryFirstTitleItems.length;

  //----------------------------------------
  // ⭐ secondary Mobile 数据
  //----------------------------------------
  const secondaryImageListMobile = splitLines(secondaryColorImagesMobile);
  const secondaryLabelListMobile = splitGroup(secondaryColorLabelMobile);
  const secondaryTitleListMobile = splitGroup(secondaryColorTitleMobile);

  // 获取全局渲染行数 = secondary title index 0 的行数
  const secondaryFirstTitleMobile = secondaryTitleListMobile[0] || '';
  const secondaryFirstTitleItemsMobile = splitLines(secondaryFirstTitleMobile);
  const secondaryGlobalRenderCountMobile =
    secondaryFirstTitleItemsMobile.length;

  //----------------------------------------
  // ⭐ 公共渲染 block
  //----------------------------------------
  const renderColorBlock = (
    imageList,
    labelList,
    titleList,
    productTitle,
    globalRenderCount,
    extraClass,
  ) => {
    return imageList.map((src, index) => {
      const rawLabel = labelList[index] || '';
      const rawTitle = titleList[index] || '';
      const mobileRowClass =
        extraClass === 'x-hide' ? `mobile-color-row row-${index + 1}` : '';

      const labelItems = rawLabel ? splitLines(rawLabel) : [];
      const titleItems = rawTitle ? splitLines(rawTitle) : [];

      const isMobile = extraClass === 'x-hide';
      const rowCount = isMobile
        ? Math.max(titleItems.length, labelItems.length) || globalRenderCount
        : globalRenderCount;

      const safeLabelItems = Array(rowCount)
        .fill('')
        .map((_, i) => labelItems[i] || '');

      const safeTitleItems = Array(rowCount)
        .fill('')
        .map((_, i) => titleItems[i] || '');

      return (
        <div key={`${extraClass}-${index}`}>
          {labelItems.length > 0 && (
            <div className={`colors ${extraClass} mb_10`}>
              {safeLabelItems.map((label, i) => (
                <p key={`label-${index}-${i}`} className="item">
                  <span style={{color: '#fa4500', fontSize: '12px'}}>
                    {label}
                  </span>
                </p>
              ))}
            </div>
          )}

          <img
            src={src}
            alt={`${productTitle} All Colors`}
            className={`${extraClass} ls-is-cached lazyloaded mb_24`}
          />

          <div className={`colors ${extraClass} mb_35 ${mobileRowClass}`.trim()}>
            {safeTitleItems.map((title, i) => (
              <p
                key={`title-${index}-${i}`}
                className="item"
                dangerouslySetInnerHTML={{
                  __html: formatLineBreaks(title),
                }}
              ></p>
            ))}
          </div>
        </div>
      );
    });
  };

  //----------------------------------------
  // 💡 返回 UI
  //----------------------------------------
  return (
    <ul className="f">
      <li className="f_24 f-d-bold">{itemTitle}</li>

      <li className="f_15 d">
        {primaryProductTitle && (
          <p
            className="title f-d-bold x-hide text-center notranslate"
            style={{marginTop: '0.24rem'}}
          >
            {primaryProductTitle}
          </p>
        )}
        {/* ------- Primary PC -------- */}
        {renderColorBlock(
          primaryImageList,
          primaryLabelList,
          primaryTitleList,
          primaryProductTitle,
          primaryGlobalRenderCount,
          's-hide',
        )}
        {/* ------- Primary Mobile -------- */}
        {renderColorBlock(
          primaryImageListMobile,
          primaryLabelListMobile,
          primaryTitleListMobile,
          primaryProductTitle,
          primaryGlobalRenderCountMobile,
          'x-hide',
        )}
      </li>

      {/* ------- Secondary（整体判断是否渲染） ------- */}
      {secondaryProductTitle && (
        <li className="f_15 d">
          <p className="title f-d-bold x-hide text-center notranslate">
            {secondaryProductTitle}
          </p>

          {/* PC */}
          {renderColorBlock(
            secondaryImageList,
            secondaryLabelList,
            secondaryTitleList,
            secondaryProductTitle,
            secondaryGlobalRenderCount,
            's-hide',
          )}

          {/* Mobile */}
          {renderColorBlock(
            secondaryImageListMobile,
            secondaryLabelListMobile,
            secondaryTitleListMobile,
            secondaryProductTitle,
            secondaryGlobalRenderCountMobile,
            'x-hide',
          )}
        </li>
      )}
    </ul>
  );
}

export function ReplacementSpec({itemTitle, replacementItems}) {
  const items =
    typeof replacementItems === 'string'
      ? replacementItems
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
          .reduce((acc, line) => {
            const isImage = /\.(jpg|jpeg|png|webp|gif|svg)\b/i.test(line);
            const isLink = /^https?:\/\//i.test(line) && !isImage;

            if (isImage) {
              acc.push({image: line, title: '', href: ''});
            } else if (isLink && acc.length > 0) {
              acc[acc.length - 1].href = line;
            } else if (acc.length > 0 && !acc[acc.length - 1].title) {
              acc[acc.length - 1].title = line;
            } else if (acc.length > 0) {
              acc[acc.length - 1].linkText = line;
            }
            return acc;
          }, [])
      : Array.isArray(replacementItems)
        ? replacementItems
        : [];

  if (!items.length) return null;

  return (
    <ul className="r">
      <li className="f_24 f-d-bold">{itemTitle || 'Replacement'}</li>
      <li className="f_15 d w">
        {items.map((item, idx) => (
          <div key={`replacement-${idx}`} className="item">
            {item.image && (
              <img
                src={item.image}
                alt={item.title || ''}
                className="ls-is-cached lazyloaded"
              />
            )}
            {item.title && (
              <div className="f_16 mb_28 f-d-bold">{item.title}</div>
            )}
            {item.href && (
              <a
                className="more-link"
                target="_blank"
                rel="noopener noreferrer"
                href={item.href}
              >
                {item.linkText || 'View more'}
              </a>
            )}
          </div>
        ))}
      </li>
    </ul>
  );
}

export function SpecSection({
  isActive = true,
  data,
  theme = 'white',
}) {
  if (!data) return null;

  const {primaryProductTitle, secondaryProductTitle, items = []} = data;
  const themeClass = theme === 'dark' ? '' : 'white';
  return (
    <div
      id="spec"
      className={`section-spec ${themeClass}`.trim()}
      style={{display: isActive ? 'block' : 'none'}}
    >
      <div className="spec-content">
        <div className="card">
          {(primaryProductTitle || secondaryProductTitle) && (
            <ul className="t s-hide">
              <li className="f_28 f-d-bold"></li>
              {primaryProductTitle && (
                <li className="f_28 f-d-bold d text-center notranslate">
                  {primaryProductTitle}
                </li>
              )}
              {secondaryProductTitle && (
                <li className="f_28 f-d-bold d text-center notranslate">
                  {secondaryProductTitle}
                </li>
              )}
            </ul>
          )}

          {items.map((item, index) => {
            const {
              itemTitle,
              primaryTextWithImage,
              primaryTextWithImageMobile,
              secondaryTextWithImage,
              primaryColorTitle,
              primaryColorImages,
              primaryColorLabel,
              primaryColorTitleMobile,
              primaryColorImagesMobile,
              primaryColorLabelMobile,
              secondaryColorTitle,
              secondaryColorImages,
              secondaryColorLabel,
              secondaryColorTitleMobile,
              secondaryColorImagesMobile,
              secondaryColorLabelMobile,
              itemType,
            } = item;
            const key = `item-${itemTitle}-${index}`;
            if (itemType.toLowerCase() === 'textwithimage')
              return (
                <TextWithImageSpec
                  key={key}
                  itemTitle={itemTitle}
                  primaryTextWithImage={primaryTextWithImage}
                  primaryTextWithImageMobile={primaryTextWithImageMobile}
                  secondaryTextWithImage={secondaryTextWithImage}
                  primaryProductTitle={primaryProductTitle}
                  secondaryProductTitle={secondaryProductTitle}
                />
              );
            else if (itemType.toLowerCase() === 'color')
              return (
                <ColorSpec
                  key={key}
                  itemTitle={itemTitle}
                  primaryProductTitle={primaryProductTitle}
                  secondaryProductTitle={secondaryProductTitle}
                  primaryColorTitle={primaryColorTitle}
                  primaryColorImages={primaryColorImages}
                  primaryColorLabel={primaryColorLabel}
                  primaryColorTitleMobile={primaryColorTitleMobile}
                  primaryColorImagesMobile={primaryColorImagesMobile}
                  primaryColorLabelMobile={primaryColorLabelMobile}
                  secondaryColorTitleMobile={secondaryColorTitleMobile}
                  secondaryColorImagesMobile={secondaryColorImagesMobile}
                  secondaryColorLabelMobile={secondaryColorLabelMobile}
                  secondaryColorTitle={secondaryColorTitle}
                  secondaryColorImages={secondaryColorImages}
                  secondaryColorLabel={secondaryColorLabel}
                />
              );
            else if (itemType.toLowerCase() === 'replacement')
              return (
                <ReplacementSpec
                  key={key}
                  itemTitle={itemTitle}
                  replacementItems={
                    item.replacementItems || item.primaryTextWithImage
                  }
                />
              );
          })}
        </div>
      </div>
    </div>
  );
}
