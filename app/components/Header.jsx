import {useCallback, useEffect, useRef, useState} from 'react';
import {NavLink} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {CollectionCard} from '~/components/CollectionCard';
import {ProductCard} from '~/components/ProductCard';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {
  MenuDropdownIcon,
  ArrowRightIcon,
  SwiperArrowIcon,
  CloseIcon,
  StoreIcon,
  MenuMobileIcon,
} from '~/components/Icons';
import searchIconUrl from '~/assets/icons/search.svg';
import SupportIcon1Url from '~/assets/icons/Support-1@2x.svg';
import SupportIcon2Url from '~/assets/icons/Support-3@2x.svg';
import SupportIcon3Url from '~/assets/icons/Support-4@2x.svg';
import SupportIcon4Url from '~/assets/icons/Support-5@2x.svg';
import SupportIcon5Url from '~/assets/icons/Support-2@2x.svg';
import DojoPng from '~/assets/images/dojo-4.png';
import {
  HeaderSearchContent,
  POPULAR_PRODUCT_FALLBACK,
} from '~/components/HeaderSearchContent';
import {getMegaMenuChildItems} from '~/lib/header-menu-collection-products';

/** Products 下拉：仅 POD MOD / TANK MOD 下指定系列的导航图覆盖 */
const MEGA_MENU_COLLECTION_IMAGE_OVERRIDES = {
  'pod-mod': {
    'luxe-x-series':
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe-xr-max-2-nav_3067d432-dfee-4d9d-bc14-8230061e0b44.webp?v=1783590370',
  },
  'tank-mod': {
    'gen-series':
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/gen-max_17c4716d-925e-42cd-bbf6-60c80d3c8e3e.png?v=1783590370',
  },
};

/** @param {Record<string, unknown> | null | undefined} menuItem */
function getMenuItemCategoryHandle(
  menuItem,
  {primaryDomainUrl, publicStoreDomain},
) {
  if (menuItem?.resource?.__typename === 'Collection' && menuItem.resource.handle) {
    return menuItem.resource.handle;
  }

  if (!menuItem?.url) return null;

  const pathname = normalizeMenuItemUrl({
    url: menuItem.url,
    primaryDomainUrl,
    publicStoreDomain,
  });
  const match = pathname.match(/\/series-product\/([^/?#]+)/);
  return match?.[1] ?? null;
}

/** @param {Record<string, unknown> | null | undefined} collection */
function applyMegaMenuCollectionImageOverride(
  collection,
  parentCategoryHandle,
) {
  if (!collection?.handle || !parentCategoryHandle) return collection;

  const overrideUrl =
    MEGA_MENU_COLLECTION_IMAGE_OVERRIDES[parentCategoryHandle]?.[
      collection.handle
    ];
  if (!overrideUrl) return collection;

  return {
    ...collection,
    image: {
      ...(collection.image ?? {}),
      id: collection.image?.id ?? collection.handle,
      url: overrideUrl,
      altText: collection.image?.altText ?? collection.title,
      width: collection.image?.width ?? 300,
      height: collection.image?.height ?? 300,
    },
  };
}

const LIQUID_MENU_ITEMS = [
  {
    id: 'dojoliq-uk',
    url: 'https://www.dojovape.com/liquid/dojoliq-uk',
    image:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/home-Logo-DOJOLIQ.svg?v=1783303761',
    label: 'www.dojovape.com/liquid/dojoliq-uk',
    alt: 'DOJO VAPE',
    linkClassName: 'dojoliq-uk',
  },
  {
    id: 'deliciu',
    url: 'https://www.deliciujuice.com/',
    image:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/2024_index-DELICIU.svg?v=1782975299',
    label: 'www.deliciujuice.com',
    alt: 'DELICIU',
  },
];

/**
 * @param {HeaderProps}
 */
export function Header({
  header,
  publicStoreDomain,
  shopMetafield,
  headerMenuCollectionProducts = {},
}) {
  const {shop, menu} = header;

  const logoMetafield = shopMetafield?.shop?.metafields?.find(
    (metafield) => metafield.namespace === 'custom' && metafield.key === 'logo',
  );
  const announcementMeta = shopMetafield?.shop?.metafields?.find(
    (metafield) =>
      metafield.namespace === 'custom' && metafield.key === 'announcement_bar',
  );
  const headerMeta = shopMetafield?.shop?.metafields?.find(
    (metafield) =>
      metafield.namespace === 'custom' && metafield.key === 'header',
  );
  const loginMeta = shopMetafield?.shop?.metafields?.find(
    (metafield) =>
      metafield.namespace === 'custom' && metafield.key === 'login',
  );
  const announcementValue = announcementMeta?.value;

  const searchPopularField = headerMeta?.reference?.fields?.find(
    (field) => field.key === 'search_popular_products',
  );

  const popularProducts =
    searchPopularField?.references?.nodes?.map((product) => ({
      href: `/products/${product.handle}`,
      product,
    })) ?? [];

  const logo = logoMetafield?.reference?.image;
  const logoId = logoMetafield?.reference?.id;
  const shopName = shop.name;
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState(null); // 'menu' or 'search'
  const closeMenuRef = useRef(null);
  const closeSearchRef = useRef(null);
  const {type: mobileMenuType, close: closeMobileMenu} = useAside();

  const handleOverlayClick = () => {
    if (overlayType === 'menu' && closeMenuRef.current) {
      closeMenuRef.current();
    } else if (overlayType === 'search' && closeSearchRef.current) {
      closeSearchRef.current();
    }
    setShowOverlay(false);
    setOverlayType(null);
  };

  return (
    <>
      {announcementValue && (
        <div className="announcement-bar page-warning">
          <div className=" warning-info f_20">
            <div className="warning-info-text">{announcementValue}</div>
          </div>
        </div>
      )}
      <header className="header header-acc">
        <div id="header" className="header-section">
          <div className="header-wrapper nav">
            <NavLink
              prefetch="intent"
              className="logo"
              to="/"
              style={activeLinkStyle}
              end
            >
              {logo ? (
                <img
                  alt={logo.altText || shopName}
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/vaporesso-logo.svg?v=1783490411"
                  key={logoId}
                  sizes="(min-width: 45em) 50vw, 100vw"
                  width={100}
                  height={100}
                />
              ) : (
                <span>{shopName}</span>
              )}
            </NavLink>
            <HeaderMenu
              menu={menu}
              headerMenuCollectionProducts={headerMenuCollectionProducts}
              viewport="desktop"
              primaryDomainUrl={header.shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
              onMenuOpen={(closeFn) => {
                setShowOverlay(true);
                setOverlayType('menu');
                closeMenuRef.current = closeFn;
              }}
              onMenuClose={() => {
                setShowOverlay(false);
                setOverlayType(null);
                closeMenuRef.current = null;
              }}
            />
            <HeaderCtas
              logo={logo}
              logoId={logoId}
              shopName={shopName}
              popularProducts={popularProducts}
              loginMeta={loginMeta}
              onSearchOpen={(closeFn) => {
                setShowOverlay(true);
                setOverlayType('search');
                closeSearchRef.current = closeFn;
              }}
              onSearchClose={() => {
                setShowOverlay(false);
                setOverlayType(null);
                closeSearchRef.current = null;
              }}
            />
          </div>
        </div>
        {menu && header.shop.primaryDomain?.url && (
          <MobileMenu
            menu={menu}
            headerMenuCollectionProducts={headerMenuCollectionProducts}
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
            isOpen={mobileMenuType === 'mobile'}
            onClose={closeMobileMenu}
          />
        )}
      </header>
      <div
        className={`header-overlay ${showOverlay ? 'header-overlay--visible' : ''}`}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
    </>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 *   onMenuOpen?: (closeFn: () => void) => void;
 *   onMenuClose?: () => void;
 * }}
 */
export function HeaderMenu({
  menu,
  headerMenuCollectionProducts = {},
  primaryDomainUrl,
  publicStoreDomain,
  onMenuOpen,
  onMenuClose,
}) {
  const {close} = useAside();

  return (
    <nav className="header-nav" role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => (
        <HeaderMenuItem
          close={close}
          item={item}
          key={item.id}
          headerMenuCollectionProducts={headerMenuCollectionProducts}
          primaryDomainUrl={primaryDomainUrl}
          publicStoreDomain={publicStoreDomain}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
        />
      ))}
    </nav>
  );
}

// 根据超级菜单的类型，显示不同的内容

function HeaderMenuItem({
  item,
  close,
  headerMenuCollectionProducts = {},
  primaryDomainUrl,
  publicStoreDomain,
  onMenuOpen,
  onMenuClose,
}) {
  const hasValidUrl = Boolean(item?.url);

  const url = hasValidUrl
    ? normalizeMenuItemUrl({
        url: item.url,
        primaryDomainUrl,
        publicStoreDomain,
      })
    : '';

  const hasChildren = Boolean(item?.items?.length);
  const isDesktop = useIsDesktop(1023);
  const isMobile = !isDesktop;
  const [isOpen, setIsOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const megaMenuContentRef = useRef(null);
  const [megaMenuHeight, setMegaMenuHeight] = useState(0);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
      setMegaMenuHeight(0);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (isOpen && hasChildren && isDesktop && onMenuOpen) {
      const closeFn = () => {
        setIsOpen(false);
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
      };
      onMenuOpen(closeFn);
    } else if (!isOpen && onMenuClose) {
      onMenuClose();
    }
  }, [isOpen, hasChildren, isDesktop, onMenuOpen, onMenuClose]);

  const updateMegaMenuHeight = useCallback(() => {
    const node = megaMenuContentRef.current;
    setMegaMenuHeight(node ? node.scrollHeight : 0);
  }, []);

  useEffect(() => {
    if (!hasChildren || isDesktop) {
      setMegaMenuHeight(0);
      return;
    }

    if (isOpen) {
      requestAnimationFrame(() => {
        updateMegaMenuHeight();
      });
    } else {
      setMegaMenuHeight(0);
    }
  }, [hasChildren, isDesktop, isOpen, updateMegaMenuHeight]);

  useEffect(() => {
    if (!hasChildren || isDesktop || !isOpen) return undefined;
    if (typeof ResizeObserver === 'undefined') return undefined;

    const node = megaMenuContentRef.current;
    if (!node) return undefined;

    const observer = new ResizeObserver(() => {
      updateMegaMenuHeight();
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasChildren, isDesktop, isOpen, updateMegaMenuHeight]);

  const handleMouseEnter = () => {
    if (!hasChildren || !isDesktop) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!hasChildren || !isDesktop) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      hoverTimeoutRef.current = null;
    }, 200); // 鼠标移出后延时隐藏三级菜单
  };

  const handleNavClick = (event) => {
    if (isMobile && hasChildren) {
      event.preventDefault();
      setIsOpen((prev) => !prev);
      return;
    }
    close();
  };

  if (!hasValidUrl) return null;

  const menuItemClassName = [
    'header-menu-item',
    hasChildren ? 'has-children' : '',
    isOpen ? 'header-menu-item--open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const mobileMegaMenuStyle =
    isMobile && hasChildren
      ? {
          height: isOpen ? `${megaMenuHeight}px` : 0,
          overflow: 'hidden',
          transition: 'height 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        }
      : undefined;

  return (
    <div
      className={menuItemClassName}
      onMouseEnter={isDesktop ? handleMouseEnter : undefined}
      onMouseLeave={isDesktop ? handleMouseLeave : undefined}
    >
      <NavLink
        end
        onClick={handleNavClick}
        prefetch="intent"
        style={activeLinkStyle}
        to={url}
      >
        <span className="header-menu-item__label f-d-bold">
          {item.title}
          {hasChildren ? (
            <span
              className={`header-menu-item__icon${
                isOpen ? ' header-menu-item__icon--active' : ''
              }`}
              aria-hidden="true"
            >
              <MenuDropdownIcon />
            </span>
          ) : null}
        </span>
      </NavLink>
      {hasChildren && isOpen ? (
        isMobile ? (
          <div
            className="header-menu-item__mobile-panel"
            style={mobileMegaMenuStyle}
            aria-hidden={!isOpen}
          >
            <div ref={megaMenuContentRef}>
              <MegaMenuRenderer
                menuTitle={item.title}
                isOpen={isOpen}
                close={close}
                items={item.items}
                headerMenuCollectionProducts={headerMenuCollectionProducts}
                primaryDomainUrl={primaryDomainUrl}
                publicStoreDomain={publicStoreDomain}
              />
            </div>
          </div>
        ) : (
          <>
            <MegaMenuRenderer
              menuTitle={item.title}
              isOpen={isOpen}
              close={close}
              items={item.items}
              headerMenuCollectionProducts={headerMenuCollectionProducts}
              primaryDomainUrl={primaryDomainUrl}
              publicStoreDomain={publicStoreDomain}
            />
            <div
              className="mega-menu-overly"
              onMouseEnter={() => {
                setIsOpen(false);
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                  hoverTimeoutRef.current = null;
                }
              }}
            ></div>
          </>
        )
      ) : null}
    </div>
  );
}

/**
 * 根据菜单标题选择对应的子菜单组件
 */
function MegaMenuRenderer({
  menuTitle,
  items,
  close,
  headerMenuCollectionProducts = {},
  primaryDomainUrl,
  publicStoreDomain,
  isOpen,
}) {
  const menuTitleLower = menuTitle?.toLowerCase() || '';

  if (menuTitleLower.includes('disposable')) {
    return (
      <DisposableMegaMenu
        isOpen={isOpen}
        close={close}
        items={items}
        primaryDomainUrl={primaryDomainUrl}
        publicStoreDomain={publicStoreDomain}
      />
    );
  }

  if (menuTitleLower.includes('liquid')) {
    return <LiquidMegaMenu isOpen={isOpen} close={close} />;
  }

  if (menuTitleLower.includes('about') || menuTitleLower.includes('discover')) {
    return (
      <AboutMegaMenu
        isOpen={isOpen}
        close={close}
        items={items}
        menuTitleLower={menuTitleLower}
        primaryDomainUrl={primaryDomainUrl}
        publicStoreDomain={publicStoreDomain}
      />
    );
  }

  if (menuTitleLower.includes('support')) {
    return (
      <SupportMegaMenu
        isOpen={isOpen}
        close={close}
        items={items}
        primaryDomainUrl={primaryDomainUrl}
        publicStoreDomain={publicStoreDomain}
      />
    );
  }

  // 默认使用原始样式
  return (
    <HeaderMegaMenu
      isOpen={isOpen}
      close={close}
      items={items}
      headerMenuCollectionProducts={headerMenuCollectionProducts}
      primaryDomainUrl={primaryDomainUrl}
      publicStoreDomain={publicStoreDomain}
    />
  );
}

/**
 * Disposable 菜单的独特子菜单组件
 */
function DisposableMegaMenu({
  items,
  close,
  primaryDomainUrl,
  publicStoreDomain,
  isOpen,
}) {

  if (!items?.length) return null;

  return (
    <div
      className={`header-submenu header-mega-menu header-mega-menu--disposable${
        isOpen ? ' header-mega-menu--open' : ''
      }`}
    >
      <div className="header-mega-menu__grid header-mega-menu__grid--disposable">
        {items.map((child) => {
          if (!child?.url) return null;

          const childUrl = normalizeMenuItemUrl({
            url: child.url,
            primaryDomainUrl,
            publicStoreDomain,
          });

          return (
            <div
              className="header-mega-menu-item header-mega-menu__item--disposable"
              key={child.id}
            >
              <NavLink
                className="header-mega-menu-item-link"
                target="_blank"
                rel="noopener noreferrer"
                end
                onClick={(event) => {
                  close();
                }}
                prefetch="intent"
                style={activeLinkStyle}
                to={childUrl}
              >
                <img className="mb_21 odm" src={DojoPng} alt="DOJO VAPE" />
                <p className="f_13 f-d-bold text-center">{child.title}</p>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Liquid 菜单的子菜单组件（横向居中展示）
 */
function LiquidMegaMenu({close, isOpen}) {

  return (
    <div
      className={`header-submenu header-mega-menu header-mega-menu--liquid${
        isOpen ? ' header-mega-menu--open' : ''
      }`}
    >
      <div className="header-mega-menu__grid header-mega-menu__grid--liquid">
        {LIQUID_MENU_ITEMS.map((item) => (
          <div
            className="header-mega-menu-item header-mega-menu__item--liquid"
            key={item.id}
          >
            <NavLink
              className={`header-mega-menu-item-link${
                item.linkClassName ? ` ${item.linkClassName}` : ''
              }`}
              target="_blank"
              rel="noopener noreferrer"
              end
              onClick={(event) => {
                close();
              }}
              prefetch="intent"
              style={activeLinkStyle}
              to={item.url}
            >
              <img className="mb_21 odm" src={item.image} alt={item.alt} />
              <p className="f_13 f-d-bold text-center">{item.label}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * About 菜单的子菜单组件
 */
function AboutMegaMenu({
  items,
  close,
  menuTitleLower,
  primaryDomainUrl,
  publicStoreDomain,
  isOpen,
}) {

  if (!items?.length) return null;

  let imageData = [];

  if (menuTitleLower.includes('about')) {
    imageData = [
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/nav-about1.jpg?v=1763619583',
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/nav-About_VAPORESSO-2_2x_d27f1015-ce11-4d3a-a6ff-11a0eeec9668.jpg?v=1763619584',
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/event-page-nav.webp?v=1763619584',
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/nav-about3.jpg?v=1763619583',
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/nav-about4.jpg?v=1763619583',
    ];
  }

  if (menuTitleLower.includes('discover')) {
    imageData = [
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/nav-connect1.jpg?v=1763621628',
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/nav-connect2.jpg?v=1763621628',
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/nav-connect3.jpg?v=1763621628',
    ];
  }

  return (
    <div
      className={`header-submenu header-mega-menu header-mega-menu--about${
        isOpen ? ' header-mega-menu--open' : ''
      }`}
    >
      <div className="header-mega-menu__wrapper header-mega-menu__grid--about">
        {items.map((child, index) => {
          if (!child?.url) return null;

          const childUrl = normalizeMenuItemUrl({
            url: child.url,
            primaryDomainUrl,
            publicStoreDomain,
          });

          const imageSrc = imageData[index];

          return (
            <div
              className={`header-mega-menu__wrapper-item header-mega-menu__item--${menuTitleLower}`}
              key={child.id}
            >
              <NavLink
                className="header-mega-menu__wrapper-link "
                end
                onClick={(event) => {
                  close();
                }}
                prefetch="intent"
                style={activeLinkStyle}
                to={childUrl}
              >
                <p
                  className={`f_13 f-d-bold ${menuTitleLower.includes('about') ? 'mb_15' : 'mb_22'}`}
                >
                  {child.title}
                </p>
                {imageSrc && (
                  <div className="img-container">
                    <img
                      className={`${menuTitleLower}-img`}
                      src={imageSrc}
                      alt={child.title}
                      loading="lazy"
                    />
                  </div>
                )}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Support 菜单的子菜单组件
 */
function SupportMegaMenu({
  items,
  close,
  primaryDomainUrl,
  publicStoreDomain,
  isOpen,
}) {

  if (!items?.length) return null;

  const SUPPORT_ICONS = [
    SupportIcon1Url,
    SupportIcon2Url,
    SupportIcon3Url,
    SupportIcon4Url,
    SupportIcon5Url,
  ];
  return (
    <div
      className={`header-submenu header-mega-menu header-mega-menu--support${
        isOpen ? ' header-mega-menu--open' : ''
      }`}
    >
      <div className="header-mega-menu__wrapper-support header-mega-menu__grid--support">
        {items.map((child, index) => {
          if (!child?.url) return null;

          const childUrl = normalizeMenuItemUrl({
            url: child.url,
            primaryDomainUrl,
            publicStoreDomain,
          });

          return (
            <div
              className="header-mega-support-item header-mega-menu__item--support"
              key={child.id}
            >
              <NavLink
                className="header-mega-support-title"
                end
                onClick={(event) => {
                  close();
                }}
                prefetch="intent"
                style={activeLinkStyle}
                to={childUrl}
              >
                <img
                  className="mb_10"
                  src={SUPPORT_ICONS[index]}
                  alt={child.title}
                />
                <p className="f_13 f-d-bold text-center">{child.title}</p>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 默认的 HeaderMegaMenu 组件（保留原有功能）
 */
function HeaderMegaMenu({
  items,
  close,
  headerMenuCollectionProducts = {},
  primaryDomainUrl,
  publicStoreDomain,
  isOpen,
}) {
  const [hoveredChildId, setHoveredChildId] = useState(null);
  const [expandedChildIds, setExpandedChildIds] = useState(() => new Set());
  const [contentHeights, setContentHeights] = useState({});
  const childrenRefs = useRef({});
  const isDesktop = useIsDesktop(1023);


  // 内部组件：封装重复的 mega menu child link 逻辑
  const MegaMenuChildLink = ({
    grandChild,
    grandChildUrl,
    parentCategoryHandle,
    hideNewDesc = false,
  }) => {
    const resourceType = grandChild?.resource?.__typename;
    const product = resourceType === 'Product' ? grandChild.resource : null;
    const collection =
      resourceType === 'Collection' ? grandChild.resource : null;

    const getLinkText = () => {
      if (product?.id) return product.title;
      if (collection) return collection.title;
      return grandChild.title;
    };

    return (
      <NavLink
        className="header-mega-menu__child-link"
        end
        onClick={(event) => {
          close();
        }}
        prefetch="intent"
        style={activeLinkStyle}
        to={grandChildUrl}
      >
        {product?.id ? (
          <ProductCard
            product={product}
            type="small"
            preferNewImg
            hideNewDesc={hideNewDesc}
          />
        ) : collection ? (
          <CollectionCard
            collection={applyMegaMenuCollectionImageOverride(
              collection,
              parentCategoryHandle,
            )}
          />
        ) : (
          grandChild.title
        )}
      </NavLink>
    );
  };

  const resolveMegaMenuChildItems = (child) => {
    const parentCategoryHandle = getMenuItemCategoryHandle(child, {
      primaryDomainUrl,
      publicStoreDomain,
    });

    return getMegaMenuChildItems(
      child,
      parentCategoryHandle,
      headerMenuCollectionProducts,
    );
  };

  // 当菜单打开时，默认选中第一个有子菜单的项；关闭时清除状态
  useEffect(() => {
    if (!isOpen) {
      setHoveredChildId(null);
      setExpandedChildIds(new Set());
      return;
    }

    if (!hoveredChildId && items?.length) {
      const firstChildWithItems = items.find(
        (child) => resolveMegaMenuChildItems(child).length,
      );
      if (firstChildWithItems) {
        setHoveredChildId(firstChildWithItems.id);
      }
    }
  }, [hoveredChildId, isOpen, items, headerMenuCollectionProducts]);

  useEffect(() => {
    if (isDesktop) {
      setExpandedChildIds(new Set());
      setContentHeights({});
    }
  }, [isDesktop]);

  // 获取元素内容的实际高度（scrollHeight 已经包含子元素的 padding）
  const getElementHeight = (node) => {
    if (!node) return 0;
    return node.scrollHeight;
  };

  useEffect(() => {
    if (isDesktop) return undefined;

    const entries = Object.entries(childrenRefs.current);
    if (!entries.length) return undefined;

    const updateHeights = (targets) => {
      setContentHeights((prev) => {
        const next = {...prev};
        targets.forEach(([id, node]) => {
          if (node) {
            next[id] = getElementHeight(node);
          } else {
            delete next[id];
          }
        });
        return next;
      });
    };

    updateHeights(entries);

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver((observerEntries) => {
      const mappedEntries = observerEntries
        .map((entry) => {
          const childId = entry.target.dataset.childId;
          if (!childId) return null;
          return [childId, entry.target];
        })
        .filter(Boolean);

      if (mappedEntries.length) {
        updateHeights(mappedEntries);
      }
    });

    entries.forEach(([id, node]) => {
      if (node) {
        node.dataset.childId = id;
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [items, isDesktop]);

  const toggleChild = (childId) => {
    setExpandedChildIds(() => {
      const next = new Set();
      const isExpanding = true; // 总是展开传入的项

      // 只展开当前点击的项，关闭其他所有项
      next.add(childId);

      // 展开时，立即计算高度以确保过渡效果
      if (isExpanding) {
        requestAnimationFrame(() => {
          const node = childrenRefs.current[childId];
          if (node) {
            setContentHeights((prevHeights) => ({
              ...prevHeights,
              [childId]: getElementHeight(node),
            }));
          }
        });
      }

      return next;
    });
  };

  const setChildContentRef = (childId) => (node) => {
    if (node) {
      childrenRefs.current[childId] = node;
    } else {
      delete childrenRefs.current[childId];
    }
  };

  if (!items?.length) return null;

  return (
    <div
      className={`header-submenu header-mega-menu${
        isOpen ? ' header-mega-menu--open' : ''
      }`}
    >
      <div className="header-mega-menu__grid">
        {items.map((child) => {
          if (!child?.url) return null;

          const childUrl = normalizeMenuItemUrl({
            url: child.url,
            primaryDomainUrl,
            publicStoreDomain,
          });
          const parentCategoryHandle = getMenuItemCategoryHandle(child, {
            primaryDomainUrl,
            publicStoreDomain,
          });
          const megaMenuChildItems = resolveMegaMenuChildItems(child);

          const hasNestedItems = Boolean(megaMenuChildItems.length);
          const showCompareBtn = child.title !== 'New Arrival';
          const isChildExpanded = expandedChildIds.has(child.id);
          const isChildActive = isDesktop
            ? hoveredChildId === child.id
            : isChildExpanded;

          const collapsibleClasses = [
            'header-mega-menu__children',
            !isDesktop ? 'header-mega-menu__children--collapsible' : '',
            !isDesktop && isChildExpanded
              ? 'header-mega-menu__children--expanded'
              : '',
          ]
            .filter(Boolean)
            .join(' ');

          const measuredHeight = contentHeights[child.id];
          const nodeRef = childrenRefs.current[child.id];
          const currentHeight = isChildExpanded
            ? (measuredHeight ?? getElementHeight(nodeRef))
            : 0;

          const collapsibleStyle =
            !isDesktop && hasNestedItems
              ? {
                  height: `${currentHeight}px`,
                }
              : undefined;

          const handleChildNavClick = (event) => {
            if (!isDesktop && hasNestedItems) {
              event.preventDefault();
              toggleChild(child.id);
              return;
            }
            close();
          };

          return (
            <div
              className={`header-mega-menu__item${
                isChildActive ? ' header-mega-menu__item--active' : ''
              }`}
              key={child.id}
              onMouseEnter={() => setHoveredChildId(child.id)}
              onMouseLeave={() => {
                // 仅在没有子菜单时才清除激活状态
                if (!megaMenuChildItems.length && hoveredChildId === child.id) {
                  setHoveredChildId(null);
                }
              }}
            >
              <NavLink
                className="header-mega-menu__item-title f-d-bold"
                end
                onClick={handleChildNavClick}
                prefetch="intent"
                style={activeLinkStyle}
                to={childUrl}
                aria-expanded={
                  !isDesktop && hasNestedItems ? isChildExpanded : undefined
                }
                role={!isDesktop && hasNestedItems ? 'button' : undefined}
              >
                <span>{child.title}</span>
                {hasNestedItems ? (
                  isDesktop ? (
                    <span
                      className={`header-mega-menu__icon${
                        isChildExpanded
                          ? ' header-mega-menu__icon--expanded'
                          : ''
                      }`}
                    >
                      <MenuDropdownIcon />
                    </span>
                  ) : (
                    <span
                      className={`header-mega-menu__toggle-symbol${
                        isChildExpanded
                          ? ' header-mega-menu__toggle-symbol--expanded'
                          : ''
                      }`}
                      aria-hidden="true"
                    />
                  )
                ) : (
                  <span className="header-mega-menu__arrow">
                    <ArrowRightIcon />
                  </span>
                )}
              </NavLink>
              {hasNestedItems ? (
                <div
                  className={collapsibleClasses}
                  onMouseEnter={() => setHoveredChildId(child.id)}
                  style={collapsibleStyle}
                  ref={setChildContentRef(child.id)}
                  aria-hidden={!isDesktop && !isChildExpanded}
                >
                  {isDesktop ? (
                    <div
                      className={
                        showCompareBtn
                          ? 'header-mega-menu__children-panel header-mega-menu__children-panel--with-compare'
                          : 'header-mega-menu__children-panel'
                      }
                    >
                      <div
                        className={`header-mega-menu__children-wrapper${
                          showCompareBtn
                            ? ' header-mega-menu__children-wrapper--with-compare'
                            : ''
                        }`}
                      >
                        <div
                          className={`swiper-button-prev swiper-button-prev-${child.id.replace(/[^a-zA-Z0-9]/g, '-')}`}
                        >
                          <SwiperArrowIcon direction="right" />
                        </div>
                        <div
                          className={`swiper-button-next swiper-button-next-${child.id.replace(/[^a-zA-Z0-9]/g, '-')}`}
                        >
                          <SwiperArrowIcon direction="left" />
                        </div>
                        <div className="header-mega-menu__children-slides">
                          <Swiper
                            key={child.id}
                            direction="horizontal"
                            slidesPerView="auto"
                            spaceBetween={60}
                            breakpoints={{
                              320: {
                                spaceBetween: 36,
                              },
                              768: {
                                spaceBetween: 60,
                              },
                            }}
                            navigation={{
                              prevEl: `.swiper-button-prev-${child.id.replace(/[^a-zA-Z0-9]/g, '-')}`,
                              nextEl: `.swiper-button-next-${child.id.replace(/[^a-zA-Z0-9]/g, '-')}`,
                            }}
                            modules={[Navigation]}
                          >
                            {megaMenuChildItems.map((grandChild) => {
                              if (!grandChild?.url) return null;

                              const grandChildUrl = normalizeMenuItemUrl({
                                url: grandChild.url,
                                primaryDomainUrl,
                                publicStoreDomain,
                              });

                              return (
                                <SwiperSlide
                                  key={grandChild.id}
                                  className="header-mega-menu__child-slide"
                                >
                                  <MegaMenuChildLink
                                    grandChild={grandChild}
                                    grandChildUrl={grandChildUrl}
                                    parentCategoryHandle={parentCategoryHandle}
                                    hideNewDesc={showCompareBtn}
                                  />
                                </SwiperSlide>
                              );
                            })}
                          </Swiper>
                        </div>
                      </div>
                      {showCompareBtn && (
                        <NavLink
                          className="compare-btn f_12 f-d-bold"
                          end
                          prefetch="intent"
                          to="/comparison"
                          aria-expanded="false"
                        >
                          Comparison
                        </NavLink>
                      )}
                    </div>
                  ) : (
                    <div className="header-mega-menu__children-wrapper">
                      <div className="header-mega-menu__children-list">
                        {megaMenuChildItems.map((grandChild) => {
                          if (!grandChild?.url) return null;

                          const grandChildUrl = normalizeMenuItemUrl({
                            url: grandChild.url,
                            primaryDomainUrl,
                            publicStoreDomain,
                          });

                          return (
                            <div
                              key={grandChild.id}
                              className="header-mega-menu__child-item"
                            >
                              <MegaMenuChildLink
                                grandChild={grandChild}
                                grandChildUrl={grandChildUrl}
                                parentCategoryHandle={parentCategoryHandle}
                              />
                            </div>
                          );
                        })}
                      </div>
                      {showCompareBtn && (
                        <NavLink
                          className="compare-btn f_12 f-d-bold"
                          end
                          prefetch="intent"
                          to="/comparison"
                          aria-expanded="false"
                        >
                          Comparison
                        </NavLink>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeaderCtas({
  logo,
  logoId,
  shopName,
  popularProducts,
  loginMeta,
  onSearchOpen,
  onSearchClose,
}) {
  return (
    <div className="header-ctas" role="navigation">
      {/* <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink> */}
      <SearchToggle
        logo={logo}
        logoId={logoId}
        shopName={shopName}
        popularProducts={popularProducts}
        onSearchOpen={onSearchOpen}
        onSearchClose={onSearchClose}
      />
      <HeaderAccount loginMeta={loginMeta} />
      <NavLink
        className="header-store-link f-d-bold"
        prefetch="intent"
        target="_blank"
        rel="noopener noreferrer"
        to="https://store.vaporesso.com/"
      >
        <span className="header-store-text">Store</span>
        <span className="header-store-icon">
          <StoreIcon />
        </span>
      </NavLink>

      <HeaderMenuMobileToggle />
    </div>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <MenuMobileIcon />
    </button>
  );
}

function HeaderAccount({loginMeta}) {
  const url = loginMeta?.value;

  return (
    <NavLink
      className="header-account-icon"
      prefetch="intent"
      to={`https://store.vaporesso.com/account/login?return_url=${url}?from=official`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="12" r="8" stroke="#333" strokeWidth="4" />
        <path
          d="M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44"
          stroke="#333"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </NavLink>
  );
}

/**
 * Mobile menu component that renders inside the header
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 *   isOpen: boolean;
 *   onClose: () => void;
 * }}
 */
function MobileMenu({
  menu,
  headerMenuCollectionProducts = {},
  primaryDomainUrl,
  publicStoreDomain,
  isOpen,
  onClose,
}) {
  useEffect(() => {
    const abortController = new AbortController();

    if (isOpen) {
      document.addEventListener(
        'keydown',
        function handler(event) {
          if (event.key === 'Escape') {
            onClose();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`header-mobile-menu-overlay ${isOpen ? 'header-mobile-menu-overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`header-mobile-menu ${isOpen ? 'header-mobile-menu--open' : ''}`}
        data-type="mobile"
      >
        <header>
          <button className="close reset" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </header>
        <main>
          <HeaderMenu
            menu={menu}
            headerMenuCollectionProducts={headerMenuCollectionProducts}
            viewport="mobile"
            primaryDomainUrl={primaryDomainUrl}
            publicStoreDomain={publicStoreDomain}
          />
        </main>
      </aside>
    </>
  );
}

function SearchToggle({
  logo,
  logoId,
  shopName,
  popularProducts,
  onSearchOpen,
  onSearchClose,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeLabel, setActiveLabel] = useState('');
  const inputRef = useRef(null);
  const brandName = shopName || 'VAPORESSO';
  const logoAlt = logo?.altText || brandName;

  const isShowingRecommendations = Boolean(query.trim());
  const productsToRender = popularProducts?.length
    ? popularProducts
    : POPULAR_PRODUCT_FALLBACK;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClear = useCallback(() => {
    setQuery('');
    setActiveLabel('');
  }, []);

  useEffect(() => {
    if (isOpen && onSearchOpen) {
      const closeFn = () => {
        setIsOpen(false);
        handleClear();
      };
      onSearchOpen(closeFn);
    } else if (!isOpen && onSearchClose) {
      onSearchClose();
    }
  }, [isOpen, onSearchOpen, onSearchClose, handleClear]);

  const closeSearch = () => {
    setIsOpen(false);
    handleClear();
  };

  return (
    <div className="header-search">
      <button
        className="reset header-search-toggle"
        onClick={() => {
          setIsOpen(true);
        }}
        aria-label="Search"
      >
        <Image alt="Search" src={searchIconUrl} width={30} height={30} />
      </button>
      <div
        className={`search-box${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site search"
      >
        <i className="search-line" aria-hidden="true" />
        <div className="search-cnt">
          <NavLink
            prefetch="intent"
            className="logo"
            to="/"
            style={activeLinkStyle}
            onClick={closeSearch}
          >
            {logo && logo.url ? (
              <img
                alt={logoAlt}
                src={logo.url}
                key={logoId}
                width={100}
                height={100}
              />
            ) : (
              <span>{brandName}</span>
            )}
          </NavLink>
          <HeaderSearchContent
            query={query}
            setQuery={setQuery}
            activeLabel={activeLabel}
            setActiveLabel={setActiveLabel}
            inputRef={inputRef}
            handleClear={handleClear}
            closeSearch={closeSearch}
            isShowingRecommendations={isShowingRecommendations}
            productsToRender={productsToRender}
          />
        </div>
      </div>
    </div>
  );
}

function useIsDesktop(breakpoint = 1023) {
  const getMatches = () => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
  };

  const [isDesktop, setIsDesktop] = useState(getMatches);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handleChange = (event) => setIsDesktop(event.matches);
    setIsDesktop(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [breakpoint]);

  return isDesktop;
}

function normalizeMenuItemUrl({url, publicStoreDomain, primaryDomainUrl}) {
  if (
    url.includes('myshopify.com') ||
    url.includes(publicStoreDomain) ||
    url.includes(primaryDomainUrl)
  ) {
    return new URL(url).pathname;
  }
  return url;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
// eslint-disable-next-line no-unused-vars
function activeLinkStyle({isActive, isPending}) {
  return {
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
