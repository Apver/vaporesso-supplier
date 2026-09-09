/** @param {unknown[] | unknown | null | undefined} value */
const toList = (value) => {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
};

/** @param {string[][] | undefined} value */
const toColorGroups = (value) => (Array.isArray(value) ? value : []);

/** 行内 [text] → 加粗；整行 [text] 仍走原有 class 逻辑 */
const renderInlineBracketBold = (text, keyBase) => {
  if (!/\[[^\[\]]+\]/.test(text) || /^\[([^\[\]]+)\]$/.test(text)) {
    return text;
  }

  const parts = [];
  const re = /\[([^\[\]]+)\]/g;
  let lastIndex = 0;
  let match;
  let partIndex = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <span key={`${keyBase}-b${partIndex++}`} className="f-d-bold">
        {match[1]}
      </span>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const IMAGE_URL_RE = /\.(jpg|jpeg|png|webp|gif|svg)\b/i;

/**
 * @param {unknown} part
 * @returns {{ pc: string, mobile: string } | null}
 */
const parseImagePart = (part) => {
  if (part && typeof part === 'object' && 'pc' in part && part.pc) {
    return {
      pc: String(part.pc),
      mobile: part.mobile ? String(part.mobile).trim() : '',
    };
  }

  const line = typeof part === 'string' ? part : '';
  if (line && IMAGE_URL_RE.test(line)) {
    return {pc: line, mobile: ''};
  }

  return null;
};

/**
 * @param {{ pc: string, mobile: string }} image
 * @param {string} keyBase
 * @param {string} alt
 */
const renderResponsiveImage = (image, keyBase, alt) => {
  const className = 'ls-is-cached lazyloaded';

  if (image.mobile) {
    return (
      <picture key={keyBase}>
        <source media="(max-width: 1023px)" srcSet={image.mobile} />
        <source media="(min-width: 1024px)" srcSet={image.pc} />
        <img src={image.pc} alt={alt} className={className} />
      </picture>
    );
  }

  return <img key={keyBase} src={image.pc} alt={alt} className={className} />;
};

export function TextWithImageSpec({
  key,
  id,
  itemTitle,
  primaryProductTitle,
  secondaryProductTitle,
  primaryTextWithImage,
  secondaryTextWithImage,
  noSubtitle = false,
}) {
  let isPackageList = itemTitle?.includes('Pack') || false;
  let isSize = itemTitle?.includes('Size') || false;
  let isMSRP = itemTitle?.includes('MSRP') || false;
  // 解析文本：换行 → 节点 → 检测是否包含图片
  const renderTextWithImage = (text, title) => {
    const parts = toList(text);
    if (!parts.length) return {nodes: null, hasImage: false};

    const altTitle = title || primaryProductTitle || 'XROS 5 MINI';
    let hasImage = false;

    const nodes = parts.map((part) => {
      const image = parseImagePart(part);
      if (image) {
        hasImage = true;
        const keyBase = `${altTitle}-${image.pc}-img`;
        const alt = isPackageList ? `${altTitle} package list` : '';
        return renderResponsiveImage(image, keyBase, alt);
      }

      const line = typeof part === 'string' ? part : String(part);
      if (!line) {
        const keyBase = `${altTitle}-${line}-br`;
        return (
          <p key={keyBase}>
            <br />
          </p>
        );
      }

      // ⭐ 加粗逻辑：尖括号 <> 与中括号 [] 为独立判断（不重合）
      let isBold = false;
      let isBracketBold = false;

      // 尖括号逻辑：<text>
      let content = line;
      if (/^<([^<>]+)>$/.test(content)) {
        isBold = true;
        content = content.replace(/^<([^<>]+)>$/, '$1');
      }

      // 中括号逻辑： [text] （独立处理）
      if (/^\[([^\[\]]+)\]$/.test(content)) {
        isBracketBold = true;
        content = content.replace(/^\[([^\[\]]+)\]$/, '$1');
      }

      // ⭐ 括号逻辑：被 () 包裹，去掉外层括号，同时用于判断尖括号时是否添加 grey
      let isInParentheses = false;
      if (/^\((.+)\)$/.test(content)) {
        isInParentheses = true;
        content = content.replace(/^\((.+)\)$/, '$1');
      }

      const keyBase = `${altTitle}-${content}-p`;

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
          {renderInlineBracketBold(content, keyBase)}
        </p>
      );
    });

    return {nodes, hasImage};
  };

  // PRIMARY 数据解析
  const primary = renderTextWithImage(
    primaryTextWithImage,
    primaryProductTitle,
  );

  // SECONDARY 数据解析
  const secondary =
    secondaryProductTitle || secondaryTextWithImage
      ? renderTextWithImage(secondaryTextWithImage, secondaryProductTitle)
      : null;

  return (
    <ul className={isPackageList ? 'package-list' : 'l'} key={key}>
      <li className="f_24 f-d-bold">{itemTitle}</li>

      {/* PRIMARY BLOCK */}
      {(() => {
        let primaryClasses = [
          'f_15 d',
          isSize ? 'size' : '',
          primary.hasImage ? '' : 'd-2',
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
            {secondaryProductTitle && primaryProductTitle && !noSubtitle && (
              <p className="title f-d-bold x-hide notranslate">
                {primaryProductTitle}
              </p>
            )}

            {primary.nodes}
          </li>
        );
      })()}

      {/* SECONDARY BLOCK */}
      {(secondaryProductTitle || secondaryTextWithImage) &&
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
              {!noSubtitle && (
                <p
                  className={`title f-d-bold x-hide notranslate ${id === 'packing' ? 'spec-content-packing-subtitle' : ''}`}
                >
                  {secondaryProductTitle}
                </p>
              )}

              {secondary.nodes}
            </li>
          );
        })()}
    </ul>
  );
}

export function ColorSpec({
  key,
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

  isNoMaxWidthFinish = false,
  bottomTitle = false,
}) {
  // 「 /」前的空格 + / 转为换行；\n 转为 <br/>（保留 0.6/0.8Ω 等电阻写法里的 /）
  const formatLineBreaks = (value) => {
    if (typeof value !== 'string') return value;
    return value
      .replace(/\r\n/g, '<br/>')
      .replace(/\n/g, '<br/>')
      .replace(/\r/g, '<br/>')
      .replace(/ \//g, ' <br/>');
  };

  const primaryImageList = toList(primaryColorImages);
  const primaryLabelGroups = toColorGroups(primaryColorLabel);
  const primaryTitleGroups = toColorGroups(primaryColorTitle);

  const primaryImageListMobile = toList(primaryColorImagesMobile);
  const primaryLabelGroupsMobile = toColorGroups(primaryColorLabelMobile);
  const primaryTitleGroupsMobile = toColorGroups(primaryColorTitleMobile);

  const secondaryImageList = toList(secondaryColorImages);
  const secondaryLabelGroups = toColorGroups(secondaryColorLabel);
  const secondaryTitleGroups = toColorGroups(secondaryColorTitle);

  const secondaryImageListMobile = toList(secondaryColorImagesMobile);
  const secondaryLabelGroupsMobile = toColorGroups(secondaryColorLabelMobile);
  const secondaryTitleGroupsMobile = toColorGroups(secondaryColorTitleMobile);

  const renderColorBlock = (
    imageList,
    labelGroups,
    titleGroups,
    productTitle,
    extraClass,
  ) => {
    return imageList.map((src, index) => {
      const labelItems = labelGroups[index] ?? [];
      const titleItems = titleGroups[index] ?? [];
      const hasLabels = labelItems.some((label) => label);
      const groupRenderCount = Math.max(
        titleItems.length,
        labelItems.length,
        1,
      );

      const safeLabelItems = Array(groupRenderCount)
        .fill('')
        .map((_, i) => labelItems[i] || '');

      const safeTitleItems = Array(groupRenderCount)
        .fill('')
        .map((_, i) => titleItems[i] || '');

      return (
        <div key={`${extraClass}-${index}`}>
          {/* LABEL */}
          {hasLabels && (
            <div className={`colors ${extraClass} mb_10`}>
              {safeLabelItems.map((label, i) => (
                <p key={`label-${index}-${i}`} className="item w">
                  {label ? (
                    <span style={{color: '#fa4500', fontSize: '12px'}}>
                      {label}
                    </span>
                  ) : null}
                </p>
              ))}
            </div>
          )}

          {/* 图片 */}
          <img
            src={src}
            alt={`${productTitle} All Colors`}
            className={`${extraClass} ls-is-cached lazyloaded mb_24`}
          />

          {/* TITLE */}
          <div className={`colors ${extraClass} mb_35`}>
            {safeTitleItems.map((title, i) => (
              <p
                key={`title-${index}-${i}`}
                className="item w"
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
    <ul
      className={`f ${isNoMaxWidthFinish ? 'ui_v3-no_max_width_finish' : ''}`}
      key={key}
    >
      <li className="f_24 f-d-bold">{itemTitle}</li>

      <li className="f_15 d">
        {secondaryProductTitle && primaryProductTitle && (
          <p
            className="title f-d-bold x-hide text-center notranslate"
            style={{marginTop: '0.24rem', color: ' #000'}}
          >
            {primaryProductTitle}
          </p>
        )}
        {/* ------- Primary PC -------- */}
        {renderColorBlock(
          primaryImageList,
          primaryLabelGroups,
          primaryTitleGroups,
          primaryProductTitle,
          's-hide',
        )}
        {bottomTitle && (
          <div className="colors-subtitle f-d s-hide text-center notranslate">
            {primaryProductTitle}
          </div>
        )}
        {/* ------- Primary Mobile -------- */}
        {renderColorBlock(
          primaryImageListMobile,
          primaryLabelGroupsMobile,
          primaryTitleGroupsMobile,
          primaryProductTitle,
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
            secondaryLabelGroups,
            secondaryTitleGroups,
            secondaryProductTitle,
            's-hide',
          )}
          {bottomTitle && (
            <div className="colors-subtitle f-d s-hide text-center notranslate">
              {secondaryProductTitle}
            </div>
          )}
          {/* Mobile */}
          {renderColorBlock(
            secondaryImageListMobile,
            secondaryLabelGroupsMobile,
            secondaryTitleGroupsMobile,
            secondaryProductTitle,
            'x-hide',
          )}
        </li>
      )}
    </ul>
  );
}
export function ReplacementPodSpec({key, itemTitle, podList}) {
  return (
    <ul className="r" key={key}>
      <li className="f_24 f-d-bold">{itemTitle}</li>
      <li className="f_15 d w">
        {podList.map((pod, index) => (
          <div key={`pod-${index}`} className="item">
            <img src={pod.primaryTextWithImage} alt={pod.name} />
            <div className="f_16 mb_28 f-d-bold">{pod.name}</div>
            <a
              className="more-link"
              href={pod.link}
              target="_blank"
              rel="noreferrer"
            >
              View more
            </a>
          </div>
        ))}
      </li>
    </ul>
  );
}
export function SpecSectionJsData({isActive = true, data}) {
  if (!data) return null;

  const {
    primaryProductTitle,
    secondaryProductTitle,
    items = [],
    isNoMaxWidthFinish = false,
    bottomTitle = false,
  } = data;
  return (
    <div
      id="spec"
      className="section-spec white"
      style={{display: isActive ? 'block' : 'none'}}
    >
      <div className="spec-content ui_v3-spec-content">
        <div className="card">
          {!bottomTitle && secondaryProductTitle && (
            <ul className="t s-hide">
              <li className="f_28 f-d-bold"></li>
              <li className="f_28 f-d-bold d text-center notranslate">
                {primaryProductTitle}
              </li>
              <li className="f_28 f-d-bold d text-center notranslate">
                {secondaryProductTitle}
              </li>
            </ul>
          )}

          {items.map((item, index) => {
            const {
              itemTitle,
              primaryTextWithImage,
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
              noSubtitle,
              id,
              podList,
            } = item;
            const key = `item-${itemTitle}-${index}`;
            if (itemType.toLowerCase() === 'textwithimage')
              return (
                <TextWithImageSpec
                  key={key}
                  itemTitle={itemTitle}
                  primaryTextWithImage={primaryTextWithImage}
                  secondaryTextWithImage={secondaryTextWithImage}
                  primaryProductTitle={primaryProductTitle}
                  secondaryProductTitle={secondaryProductTitle}
                  isBottomTitle={bottomTitle}
                  noSubtitle={noSubtitle}
                  id={id}
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
                  isNoMaxWidthFinish={isNoMaxWidthFinish}
                  bottomTitle={bottomTitle}
                />
              );
            else if (itemType.toLowerCase() === 'replacementpodlink') {
              console.log('podList, itemTitle, key', podList, itemTitle, key);
              return (
                <ReplacementPodSpec
                  key={key}
                  itemTitle={itemTitle}
                  podList={podList}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
