import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';

/**
 * navTheme / cntTheme 对应 product.css 中 `.product-nav.white`、`.product-nav-cnt.black` 等类名。
 * specNavTheme / specCntTheme：选中 Specs tab 时使用的配色（未传则沿用 overview 配置）。
 * bannerThemeSwitch：页面有 `.banner-corex3` 时，是否在滚动时自动切换 navTheme（Specs tab 下不生效）。
 */
export const ProductNav = forwardRef(function ProductNav(
  {
    nav,
    activeSectionId,
    onSectionChange,
    navTheme = 'white',
    cntTheme = 'black',
    specNavTheme,
    specCntTheme,
    bannerThemeSwitch = true,
    show3DExhibit = true,
  },
  ref,
) {
  const isSpecActive = activeSectionId === 'spec';
  const resolvedNavTheme = isSpecActive ? (specNavTheme ?? navTheme) : navTheme;
  const resolvedCntTheme = isSpecActive ? (specCntTheme ?? cntTheme) : cntTheme;
  const visibleTabs = show3DExhibit
    ? nav.tabs
    : nav.tabs.filter((tab) => tab.id !== '3d');
  const occupyRef = useRef(null);
  const navRef = useRef(null);
  const classifyRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useImperativeHandle(ref, () => ({
    occupyEl: occupyRef.current,
    navEl: navRef.current,
  }));

  // 检测是否为移动端
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1023;
      setIsMobile(mobile);

      // 移动端初始状态：隐藏 classify
      if (mobile && classifyRef.current && !isExpanded) {
        classifyRef.current.style.display = 'none';
      } else if (!mobile && classifyRef.current) {
        // 非移动端：恢复默认显示
        classifyRef.current.style.display = '';
        classifyRef.current.style.height = '';
        classifyRef.current.style.overflow = '';
        classifyRef.current.style.transition = '';
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isExpanded]);

  // 处理点击事件（仅移动端）
  const handleProNameClick = (e) => {
    if (!isMobile) return;

    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  // 高度过渡效果
  useEffect(() => {
    if (!isMobile || !classifyRef.current) {
      // 非移动端时，确保 classify 正常显示
      if (classifyRef.current) {
        classifyRef.current.style.display = '';
        classifyRef.current.style.height = '';
        classifyRef.current.style.overflow = '';
        classifyRef.current.style.transition = '';
      }
      return;
    }

    const classify = classifyRef.current;
    let transitionEndHandler = null;

    if (isExpanded) {
      // 展开：先设置 display，然后设置高度
      classify.style.display = 'block';
      classify.style.height = 'auto';
      const height = classify.scrollHeight;
      classify.style.height = '0px';
      classify.style.overflow = 'hidden';

      // 强制重排，确保浏览器识别到初始高度 0px
      classify.offsetHeight;

      // 使用 requestAnimationFrame 确保 display 已应用，然后开始展开
      requestAnimationFrame(() => {
        classify.style.transition = 'height 350ms cubic-bezier(0.4, 0, 0.2, 1)';
        classify.style.height = `${height}px`;
      });
    } else {
      // 收起：确保元素可见，获取高度，然后平滑收缩到 0
      // 先确保元素是显示的，才能获取正确的高度
      if (classify.style.display === 'none') {
        classify.style.display = 'block';
        classify.style.height = 'auto';
      }

      // 获取当前实际高度
      const height = classify.scrollHeight;

      // 设置初始状态
      classify.style.height = `${height}px`;
      classify.style.overflow = 'hidden';

      // 强制重排，确保浏览器识别到当前高度
      classify.offsetHeight;

      // 设置过渡并开始收缩
      requestAnimationFrame(() => {
        classify.style.transition = 'height 350ms cubic-bezier(0.4, 0, 0.2, 1)';
        classify.style.height = '0px';
      });

      // 过渡结束后隐藏
      transitionEndHandler = () => {
        if (!isExpanded) {
          classify.style.display = 'none';
          classify.style.height = '';
          classify.style.overflow = '';
          classify.style.transition = '';
        }
      };
      classify.addEventListener('transitionend', transitionEndHandler);
    }

    // 清理函数
    return () => {
      if (transitionEndHandler) {
        classify.removeEventListener('transitionend', transitionEndHandler);
      }
    };
  }, [isExpanded, isMobile]);

  // ---------------------------------------------
  // ⭐ 新增功能：监听 banner-corex3 是否在视口中
  // ---------------------------------------------
  useEffect(() => {
    if (!bannerThemeSwitch || !navTheme || isSpecActive) return;

    const navEl = navRef.current;
    if (!navEl) return;

    const banner = document.querySelector('.banner-corex3');
    if (!banner) return;

    const handleScroll = () => {
      const rect = banner.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.6 &&
        rect.bottom > window.innerHeight * 0.1;

      if (inView) {
        navEl.classList.remove(navTheme);
      } else {
        navEl.classList.add(navTheme);
      }
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [bannerThemeSwitch, navTheme, isSpecActive]);

  return (
    <div className="product-occupy" ref={occupyRef}>
      <div
        id="proNav"
        className={['product-nav', resolvedNavTheme].filter(Boolean).join(' ')}
        ref={navRef}
      >
        <div
          className={['product-nav-cnt', resolvedCntTheme]
            .filter(Boolean)
            .join(' ')}
        >
          <a
            className={`pro-name f-d-bold notranslate ${isExpanded ? 'active' : ''}`}
            href={nav.heroHref}
            onClick={handleProNameClick}
          >
            {nav.name}
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            className="buy"
            href={`${nav.buyHref}?from=official`}
          >
            {nav.buyLabel}
          </a>

          <ul className="classify" ref={classifyRef}>
            {visibleTabs.map((tab) => {
              const isActive = activeSectionId === tab.id;
              return (
                <li
                  key={tab.id}
                  className={isActive ? 'active' : undefined}
                  data-id={tab.id}
                >
                  <a
                    className="link-btn"
                    href={tab.href}
                    onClick={(event) => {
                      event.preventDefault();
                      // 如果是移动端且菜单已展开，则收起菜单并移除 active 状态
                      if (isMobile && isExpanded) {
                        setIsExpanded(false);
                      }
                      if (onSectionChange) {
                        onSectionChange(tab.id);
                      }
                    }}
                  >
                    {tab.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
});
