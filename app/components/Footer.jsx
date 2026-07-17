import {Fragment, Suspense, useEffect, useState} from 'react';
import {Await, NavLink, Form} from 'react-router';
import {parseExcelFromUrl, buildFooterContentFromExcel} from '~/lib/excel';
import {useLanguageChange} from '~/lib/useLanguageChange';
import {useCurrentLanguageLabel} from '~/lib/useLocaleAutoTranslate';
import {useGoogleTranslateWidget} from '~/lib/useGoogleTranslateWidget';
import {FOOTER_CONTENT} from '../data/footerContent';

/**
 * @param {FooterProps}
 */
export function Footer({
  footer: footerPromise,
  footerMetafield,
  header,
  publicStoreDomain,
}) {
  const handleLanguageChange = useLanguageChange();

  useFooterInteractions();
  useGoogleTranslateWidget(handleLanguageChange);
  const footerContent = useFooterContent(footerMetafield);

  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footerResult) => {
          const primaryDomainUrl = header.shop.primaryDomain?.url;
          const menus = getMenusFromFooterResults(footerResult);

          return (
            <footer className="footer footer-bg">
              <div className="footer-page">
                <FooterAction content={footerContent} />
                {menus.length > 0 && primaryDomainUrl && (
                  <FooterMenu
                    content={footerContent}
                    menus={menus}
                    primaryDomainUrl={primaryDomainUrl}
                    publicStoreDomain={publicStoreDomain}
                  />
                )}
              </div>
              <FooterGoTopButton />
            </footer>
          );
        }}
      </Await>
    </Suspense>
  );
}

/**
 * @param {{
 *   content: FooterContentData;
 *   menus: FooterQuery['menu'][];
 *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
 *   publicStoreDomain: string;
 * }}
 */
function FooterMenu({content, menus, primaryDomainUrl, publicStoreDomain}) {
  const visibleMenus = menus.filter((menu) => menu?.items?.length);

  if (!visibleMenus.length) {
    return null;
  }

  return (
    <>
      <div className="footer-nav">
        {visibleMenus.map((menu) => (
          <FooterNavSection
            key={menu.id}
            item={menu}
            primaryDomainUrl={primaryDomainUrl}
            publicStoreDomain={publicStoreDomain}
          />
        ))}
        <FooterLanguageBlocks content={content} />
        <FooterNewsletterForm content={content} />
      </div>
      <FooterBottomInfo content={content} />
    </>
  );
}

function FooterNavSection({item, primaryDomainUrl, publicStoreDomain}) {
  const hasChildren = Boolean(item?.items?.length);

  const headingContent = (
    <FooterMenuLink
      item={item}
      primaryDomainUrl={primaryDomainUrl}
      publicStoreDomain={publicStoreDomain}
      heading
    />
  );

  return (
    <div className="footer-nav-item">
      <h4 className="f-d-bold">{headingContent}</h4>
      {hasChildren ? (
        <ul>
          {item.items.map((child) => (
            <li key={child.id}>
              <FooterMenuLink
                item={child}
                primaryDomainUrl={primaryDomainUrl}
                publicStoreDomain={publicStoreDomain}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FooterMenuLink({
  item,
  primaryDomainUrl,
  publicStoreDomain,
  heading = false,
}) {
  const url = normalizeMenuItemUrl({
    url: item.url,
    primaryDomainUrl,
    publicStoreDomain,
  });


  if (!item?.title) {
    return null;
  }

  const className = getMenuItemClassName(item);

  if (!url) {
    return <span className={className}>{item.title}</span>;
  }

  const isExternal = !url.startsWith('/');

  if (isExternal) {
    return (
      <a
        className={className}
        href={url}
        rel="noreferrer"
        target={heading ? undefined : '_blank'}
      >
        {item.title}
      </a>
    );
  }

  return (
    <NavLink
      className={className}
      end
      prefetch="intent"
      to={url}
    >
      {item.title}
    </NavLink>
  );
}

function FooterLanguageSelector({
  targetId = 'google_translate_element',
  targetClassName,
  wrapperClassName,
}) {
  const wrapperClasses = ['pop-lang'];
  if (wrapperClassName) {
    wrapperClasses.push(wrapperClassName);
  }

  const langClasses = ['lang'];
  if (targetClassName) {
    langClasses.push(targetClassName);
  }

  return (
    <div className={wrapperClasses.join(' ')}>
      <div
        id={targetId}
        className={langClasses.join(' ')}
        data-google-translate-target="true"
      />
      <div className="line" />
    </div>
  );
}

function FooterAction({content}) {
  const {
    languageIconSrc,
    languageAlt,
    storeLocatorHref,
    storeLocatorIconSrc,
    storeLocatorAlt,
  } = content ?? FOOTER_CONTENT;


  return (
    <div className="footer-action s-hide">
      <div className="label">
        <div className="item google-tran" id="footer-lang-pc-mount">
          <img src={languageIconSrc} alt={languageAlt} />
          <FooterLanguageSelector
            targetClassName="lang-pc"
            targetId="google_translate_element_pc"
          />
        </div>
        <a
          className="item"
          href={storeLocatorHref}
          rel="noreferrer"
          target="_blank"
        >
          <img src={storeLocatorIconSrc} alt={storeLocatorAlt} />
        </a>
      </div>
    </div>
  );
}

function FooterLanguageBlocks({content}) {
  const {
    languageIconSrc,
    languageAlt,
    storeLocatorIconSrc,
    storeLocatorAlt,
    storeLocatorHref,
    storeLocatorLabel,
  } = content ?? FOOTER_CONTENT;
  const currentLanguageLabel = useCurrentLanguageLabel();


  return (
    <>
      <div
        className="footer-nav-item lang x-hide"
        id="footer-lang-mobile-mount"
      >
        <img src={languageIconSrc} alt={languageAlt} />
        <h4 className="f-d-bold" id="currentLang">
          {currentLanguageLabel}
        </h4>
      </div>
      <div className="footer-nav-item lang x-hide">
        <img src={storeLocatorIconSrc} alt={storeLocatorAlt} />
        <h4 className="f-d-bold">
          <a
            href={storeLocatorHref}
            rel="noreferrer"
            target="_blank"
            >
            {storeLocatorLabel}
          </a>
        </h4>
      </div>
    </>
  );
}

function FooterGoTopButton() {

  return (
    <button
      aria-label="Back to top"
      className="go-top"
      title="Back to top"
      type="button"
    />
  );
}

function FooterNewsletterForm({content}) {
  const {
    newsletterHeading,
    newsletterDescription,
    newsletterPlaceholder,
    newsletterSuccessMessage,
  } = content ?? FOOTER_CONTENT;
  const [formData, setFormData] = useState({email: ''});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');


  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'email') {
      validateEmail(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: formData.email}),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      } else {
        await response.text();
      }
    } catch (error) {

    }

    setIsSubmitting(false);
  };

  return (
    <div className="footer-nav-item email">
      <h4 className="f-d-bold">
        <span>{newsletterHeading}</span>
      </h4>
      <p>{newsletterDescription}</p>
      <div className="subscribe-form">
        <Form
          className="footer-newsletter-form relative"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className={`form-group ${formSubmitted ? 'hide' : ''}`}>
            <div className="input">
              <input
                className="thin"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={newsletterPlaceholder}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-btn">
              <button type="submit" disabled={isSubmitting}></button>
            </div>
          </div>
          {emailError && <div className="error-message">{emailError}</div>}
          {formSubmitted ? (
            <div className="input-successful">{newsletterSuccessMessage}</div>
          ) : null}
        </Form>
      </div>
    </div>
  );
}

function FooterBottomInfo({content}) {
  const {
    complianceNotice,
    policyLinks,
    contactSections,
    socialLinks,
    copyright,
  } = content ?? FOOTER_CONTENT;
  const safePolicyLinks = Array.isArray(policyLinks) ? policyLinks : [];
  const safeContactSections = Array.isArray(contactSections)
    ? contactSections
    : [];
  const safeSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];


  return (
    <div className="bot-info">
      <div className="footer-info">
        <p
          dangerouslySetInnerHTML={{
            __html: formatComplianceNoticeHtml(complianceNotice),
          }}
        />
        <p className="copyright">
          <span>{copyright}</span>
          {safePolicyLinks.length > 0 &&
            safePolicyLinks.map((link, index) => (
              <Fragment key={link.href}>
                <a
                  href={link.href}
                  // target="_blank"
                  // rel="noreferrer"
                >
                  {link.label}
                </a>
                {index < safePolicyLinks.length - 1 && <span> | </span>}
              </Fragment>
            ))}
        </p>
      </div>
      <div className="subscribe">
        <ul className="coo">
          {safeContactSections.map((section) => (
            <li key={section.title}>
              <p className="f-d-bold">{section.title}</p>
              {Array.isArray(section.lines) &&
                section.lines.map((line) => (
                  <p key={line} className="mb_3">
                    {line}
                  </p>
                ))}
            </li>
          ))}
        </ul>
        <div className="social">
          <div className="social-link">
            {safeSocialLinks.map(({name, href, icon}) => (
              <a
                key={name}
                target="_blank"
                className={name}
                href={href}
                rel="noreferrer"
              >
                <img alt={name} src={icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {Promise<FooterMetafieldQuery | null> | undefined} footerMetafieldPromise
 * @returns {FooterContentData}
 */
function useFooterContent(footerMetafieldPromise) {
  const [content, setContent] = useState(FOOTER_CONTENT);

  useEffect(() => {
    let isActive = true;
    if (!footerMetafieldPromise?.then) {
      return () => {
        isActive = false;
      };
    }

    footerMetafieldPromise
      .then((result) => extractFooterContentFromMetafield(result))
      .then((nextContent) => {
        if (isActive && nextContent) {
          setContent((prev) => ({...prev, ...nextContent}));
        }
      })
      .catch((error) => {
        console.warn('Failed to load footer metafield', error);
      });

    return () => {
      isActive = false;
    };
  }, [footerMetafieldPromise]);

  return content;
}

/**
 * @param {FooterMetafieldQuery | null | undefined} queryResult
 * @returns {FooterContentData | null}
 */
async function extractFooterContentFromMetafield(queryResult) {
  const metafields = queryResult?.shop?.metafields;
  if (!Array.isArray(metafields)) {
    return null;
  }

  const footerField = metafields.find(
    (metafield) =>
      metafield?.key === 'footer' && metafield?.namespace === 'custom',
  );

  if (!footerField) {
    return null;
  }

  // 这里额外把 socials 的 metafield 取出来，用来覆盖 socialLinks
  const socialsField = metafields.find(
    (metafield) =>
      metafield?.key === 'socials' && metafield?.namespace === 'custom',
  );

  if (footerField.type === 'file_reference') {
    const excelContentRaw = await extractFooterExcelRows(footerField.reference);
    const excelContent =
      excelContentRaw && normalizeFooterFooterContent(excelContentRaw);

    // 用 metaobject 的 socials 替换 Excel 里的 socialLinks
    const socialLinksFromMetafield =
      socialsField && buildSocialLinksFromSocialsMetafield(socialsField);

    if (Array.isArray(socialLinksFromMetafield)) {
      return {
        ...(excelContent ?? {}),
        socialLinks: socialLinksFromMetafield,
      };
    }

    return excelContent;
  }

  return null;
}

async function extractFooterExcelRows(reference) {
  if (!reference || typeof reference !== 'object') {
    return null;
  }
  const fileUrl = reference.url;
  if (!fileUrl) {
    return null;
  }

  try {
    const workbook = await parseExcelFromUrl(fileUrl);
    return buildFooterContentFromExcel(workbook);
  } catch (error) {
    console.warn('Unable to parse footer Excel file', error);
  }

  return null;
}

/**
 * 处理 Excel 解析出来的 footer 内容，做一些字段级别的二次处理：
 * - policyLinks: 从多行字符串解析成 [{label, href}] 数组，方便组件直接 map 渲染
 *
 * @param {Record<string, unknown>} excelContent
 * @returns {Record<string, unknown>}
 */
function normalizeFooterFooterContent(excelContent) {
  const result = {...excelContent};

  const rawPolicyLinks = /** @type {unknown} */ (result.policyLinks);
  if (typeof rawPolicyLinks === 'string') {
    const lines = rawPolicyLinks
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const parsedLinks = lines
      .map((line) => {
        // 形如 "Privacy:https://..." 或 "Terms & Conditions: https://..."
        const match = line.match(/^([^:]+):\s*(.+)$/);
        if (!match) return null;
        const label = match[1].trim();
        const href = match[2].trim();
        if (!label || !href) return null;
        return {label, href};
      })
      .filter(Boolean);

    if (parsedLinks.length) {
      result.policyLinks = parsedLinks;
    }
  }

  // contactSections: 从多行字符串解析成 [{title, lines: string[]}] 数组
  const rawContactSections = /** @type {unknown} */ (result.contactSections);
  if (typeof rawContactSections === 'string') {
    /** @type {Array<{title: string, lines: string[]}>} */
    const sections = [];

    // 匹配形如：
    // Cooperation:
    // [email: xxx
    //
    // email: yyy]
    // 中间允许换行、空行
    const sectionRegex = /([^\n:]+):\s*\[([\s\S]*?)\]/g;
    let match;

    while ((match = sectionRegex.exec(rawContactSections))) {
      const title = match[1]?.trim();
      const body = match[2] ?? '';
      if (!title) continue;

      const lines = body
        .split(/\r?\n+/)
        .map((line) => line.trim())
        .filter(Boolean);

      if (!lines.length) continue;

      sections.push({title, lines});
    }

    if (sections.length) {
      result.contactSections = sections;
    }
  }

  return result;
}

/**
 * 把 complianceNotice 里的简易 MD 链接语法
 * [文本](!www.xxx.com)
 * 转成真正的 HTML 链接 <a href="https://www.xxx.com">文本</a>
 *
 * - 支持多个链接
 * - 如果链接里已经有 http/https 就不再补全
 *
 * @param {unknown} raw
 * @returns {string}
 */
function formatComplianceNoticeHtml(raw) {
  if (typeof raw !== 'string') return '';

  return raw.replace(/\[([^\]]+)\]\(!([^)]+)\)/g, (_match, label, url) => {
    const text = String(label).trim();
    const rawUrl = String(url).trim();
    if (!text || !rawUrl) return text || '';

    const hasProtocol = /^https?:\/\//i.test(rawUrl);
    const href = hasProtocol ? rawUrl : `https://${rawUrl}`;

    // 这里直接返回 a 标签字符串，供 dangerouslySetInnerHTML 使用
    return `<a href="${href}" target="_blank" rel="noreferrer">${text}</a>`;
  });
}

/**
 * 把 shop 自定义 metafield `custom.socials`（list.metaobject_reference）
 * 转成 Footer 里用的 socialLinks 结构
 *
 * @param {import('storefrontapi.generated').ShopQuery['shop']['metafields'][number]} socialsField
 * @returns {Array<{name: string, href: string, icon: string}> | null}
 */
function buildSocialLinksFromSocialsMetafield(socialsField) {
  const nodes = socialsField?.references?.nodes;
  if (!Array.isArray(nodes) || !nodes.length) {
    return null;
  }

  const links = nodes
    .map((metaobject) => {
      if (!metaobject || !Array.isArray(metaobject.fields)) return null;

      const hrefField = metaobject.fields.find((f) => f.key === 'href');
      const iconField = metaobject.fields.find((f) => f.key === 'icon');
      const nameField = metaobject.fields.find((f) => f.key === 'name');

      const href = hrefField?.value;
      const name = nameField?.value || metaobject.handle;

      // 图标优先用 MediaImage / GenericFile 的 url，其次退回到 value 里的字符串
      const iconFromMediaImage = iconField?.reference?.image?.url;
      const iconFromFile = iconField?.reference?.url;
      const icon =
        iconFromMediaImage ||
        iconFromFile ||
        /** @type {string|undefined} */ (iconField?.value);

      if (!name || !href || !icon) return null;

      return {name, href, icon};
    })
    .filter(Boolean);

  return links.length ? links : null;
}

function getMenusFromFooterResults(footerResult) {
  if (!footerResult) {
    return [];
  }

  if (Array.isArray(footerResult)) {
    return footerResult.map((entry) => entry?.menu).filter(Boolean);
  }

  if (footerResult?.menu) {
    return [footerResult.menu];
  }

  return [];
}

function getMenuItemClassName(item) {
  const classes = [];
  if (item?.tags?.includes('notranslate')) {
    classes.push('notranslate');
  }
  return classes.length ? classes.join(' ') : undefined;
}

function normalizeMenuItemUrl({url, primaryDomainUrl, publicStoreDomain}) {
  if (!url) return null;

  if (
    url.includes('myshopify.com') ||
    (publicStoreDomain && url.includes(publicStoreDomain)) ||
    (primaryDomainUrl && url.includes(primaryDomainUrl))
  ) {
    return new URL(url).pathname;
  }

  return url;
}

function useFooterInteractions() {
  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const body = document.body;
    if (!body) return;

    const isDesktop = () => window.innerWidth >= 1024;
    const moveGoogleTranslateWidget = () => {
      const widgetRoot = document
        .getElementById('google_translate_element_pc')
        ?.closest('.pop-lang');
      if (!widgetRoot) return;
      const pcMount = document.getElementById('footer-lang-pc-mount');
      const mobileMount = document.getElementById('footer-lang-mobile-mount');
      if (!pcMount || !mobileMount) return;
      const targetMount = isDesktop() ? pcMount : mobileMount;
      if (!targetMount.contains(widgetRoot)) {
        targetMount.appendChild(widgetRoot);
      }
    };
    const findDirectList = (element) => {
      return (
        Array.from(element.children).find(
          (child) => child.tagName && child.tagName.toLowerCase() === 'ul',
        ) ?? null
      );
    };

    const runNextFrame = (callback) => {
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(callback);
      } else {
        window.setTimeout(callback, 16);
      }
    };

    const animateListToggle = (list, opening) => {
      if (!list) return;

      list.style.overflow = 'hidden';
      list.style.transition = 'height 250ms ease';

      const cleanup = () => {
        if (!opening) {
          list.style.display = 'none';
        }
        list.style.removeProperty('height');
        list.style.removeProperty('overflow');
        list.style.removeProperty('transition');
        list.removeEventListener('transitionend', cleanup);
      };

      if (opening) {
        list.style.display = 'block';
        const targetHeight = `${list.scrollHeight}px`;
        list.style.height = '0px';
        runNextFrame(() => {
          list.style.height = targetHeight;
        });
      } else {
        const currentHeight = `${list.scrollHeight}px`;
        list.style.height = currentHeight;
        runNextFrame(() => {
          list.style.height = '0px';
        });
      }

      list.addEventListener('transitionend', cleanup, {once: true});
    };

    const handleFooterItemClick = (event) => {
      if (isDesktop()) return;
      const footerItem = event.target.closest('.footer-nav-item');
      if (!footerItem || !body.contains(footerItem)) return;
      if (!footerItem.closest('.footer-nav')) return;
      if (event.target.closest('ul')) return;

      const list = findDirectList(footerItem);
      if (!list) return;

      const willOpen = !footerItem.classList.contains('open');
      footerItem.classList.toggle('open', willOpen);
      animateListToggle(list, willOpen);
    };

    body.addEventListener('click', handleFooterItemClick);

    moveGoogleTranslateWidget();

    const handleResize = () => {
      moveGoogleTranslateWidget();
      if (!isDesktop()) return;

      document
        .querySelectorAll('.footer-nav .footer-nav-item')
        .forEach((item) => {
          item.classList.remove('open');
          const list = findDirectList(item);
          if (list) {
            list.style.removeProperty('display');
            list.style.removeProperty('height');
            list.style.removeProperty('overflow');
            list.style.removeProperty('transition');
          }
        });
    };

    window.addEventListener('resize', handleResize);

    const closeButtons = Array.from(
      document.querySelectorAll('.act-enter .close'),
    );
    const fadeOutTimers = new Set();

    const handleCloseClick = (event) => {
      const container = event.currentTarget?.closest('.act-enter');
      if (!container) return;

      container.style.transition = 'opacity 200ms ease';
      container.style.opacity = '0';
      const timer = window.setTimeout(() => {
        container.style.display = 'none';
      }, 220);
      fadeOutTimers.add(timer);
    };

    closeButtons.forEach((button) =>
      button.addEventListener('click', handleCloseClick),
    );

    const goTopButton = document.querySelector('.go-top');
    const goTopTimers = new Set();
    const setGoTopVisible = (visible) => {
      if (!goTopButton) return;

      goTopButton.style.transition = 'opacity 200ms ease';
      if (visible) {
        goTopTimers.forEach((timer) => window.clearTimeout(timer));
        goTopTimers.clear();
        goTopButton.style.display = 'block';
        const show = () => {
          if (goTopButton) {
            goTopButton.style.opacity = '1';
          }
        };
        if (typeof requestAnimationFrame === 'function') {
          requestAnimationFrame(show);
        } else {
          show();
        }
      } else {
        goTopButton.style.opacity = '0';
        const timer = window.setTimeout(() => {
          if (goTopButton) {
            goTopButton.style.display = 'none';
          }
        }, 220);
        goTopTimers.add(timer);
      }
    };

    const handleGoTopClick = () => {
      window.scrollTo({behavior: 'smooth', top: 0});
    };

    goTopButton?.addEventListener('click', handleGoTopClick);

    let previousScrollTop = window.scrollY;
    let scrollListenerAttached = false;

    const isBottomInView = (scrollTop) => {
      const doc = document.documentElement;
      const viewportBottom = window.innerHeight + scrollTop;
      const documentHeight = Math.max(
        doc.scrollHeight,
        document.body.scrollHeight,
      );
      return viewportBottom >= documentHeight - 20;
    };

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      const shouldShow =
        previousScrollTop > currentScrollTop &&
        currentScrollTop > 600 &&
        !isBottomInView(currentScrollTop);
      setGoTopVisible(shouldShow);
      previousScrollTop = currentScrollTop;
    };

    if (goTopButton && document.body.scrollHeight > 1500) {
      scrollListenerAttached = true;
      window.addEventListener('scroll', handleScroll);
    } else if (goTopButton) {
      goTopButton.style.display = 'none';
    }

    return () => {
      body.removeEventListener('click', handleFooterItemClick);
      window.removeEventListener('resize', handleResize);
      closeButtons.forEach((button) =>
        button.removeEventListener('click', handleCloseClick),
      );
      fadeOutTimers.forEach((timer) => window.clearTimeout(timer));
      if (goTopButton) {
        goTopButton.removeEventListener('click', handleGoTopClick);
        goTopTimers.forEach((timer) => window.clearTimeout(timer));
      }
      if (scrollListenerAttached) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<Array<FooterMenuResult> | FooterQuery | null>} footer
 * @property {Promise<FooterMetafieldQuery | null>} footerMetafield
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').ShopQuery} FooterMetafieldQuery */
/** @typedef {typeof FOOTER_CONTENT} FooterContentData */
/** @typedef {{key: string, handle: string, menu: FooterQuery['menu'] | null}} FooterMenuResult */
