import {useEffect, useMemo, useState} from 'react';

export function Product3DViewer({isOpen = false, onClose, data}) {
  const resolvedData = useMemo(() => {
    if (data?.items?.length) return data;
    // 如果显式传入数据但 items 为空，则不再回落到默认数据
    if (data) return {title: data.title, items: []};
    return {
      title: 'Take a look at the 3D view of ARMOUR',
      items: [
        {
          id: 'pro1',
          label: 'ARMOUR G',
          folder: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/',
          filenameX: 'armour-g_rotate-y{index}.png',
          amountX: 36,
          filenameY: 'armour-g_rotate-y{index}.png',
          amountY: 60,
        },
        {
          id: 'pro2',
          label: 'ARMOUR GS',
          folder: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/',
          filenameX: 'armour-gs_rotate-x{index}.png',
          amountX: 36,
          filenameY: 'armour-gs_rotate-y{index}.png',
          amountY: 60,
        },
      ],
    };
  }, [data]);

  const [activeId, setActiveId] = useState(
    resolvedData.items?.[0]?.id || 'pro1',
  );
  const [canRender, setCanRender] = useState(false);

  // 当数据源变化时重置 activeId；点击切换不再被重置
  useEffect(() => {
    const firstId = resolvedData.items?.[0]?.id;
    if (firstId) {
      setActiveId(firstId);
    }
  }, [resolvedData]);

  useEffect(() => {
    // 只用于标记客户端渲染，避免 SSR 报错
    if (typeof window === 'undefined') return;
    setCanRender(true);
  }, []);

  // 构建 className，如果有 color 则添加（必须在 early return 之前）
  const sectionClassName = useMemo(() => {
    const baseClass = 'section-3d';
    const colorClass = resolvedData.color ? resolvedData.color : '';
    return colorClass ? `${baseClass} ${colorClass}` : baseClass;
  }, [resolvedData.color]);

  // 弹窗打开 / 切换 Tab 时，只对当前激活的 3D 容器做初始化
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isOpen) return;

    const ci360 = window.CI360;

    if (!ci360) return;

    try {
      // 优先使用 add(id) 只初始化当前激活的容器
      if (typeof ci360.add === 'function') {
        ci360.add(activeId);
      } else if (typeof ci360.init === 'function') {
        // 兼容老版本：没有 add 时退回全局 init
        ci360.init();
      }
    } catch {
      // 忽略单次初始化异常，避免打断弹窗逻辑
    }
  }, [isOpen, activeId]);

  if (!canRender) return null;
  if (!resolvedData?.items?.length) return null;

  return (
    <div
      id="pro3D"
      className={sectionClassName}
      style={{display: isOpen ? 'block' : 'none'}}
    >
      <div className="content">
        {/* 关闭按钮 */}
        <i
          className="icon-cross"
          aria-label="Close 3D view"
          role="button"
          tabIndex={0}
          onClick={() => onClose && onClose()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onClose && onClose();
            }
          }}
        ></i>

        {resolvedData.title && (
          <h3 className="f_30 f-d-bold">{resolvedData.title}</h3>
        )}

        {/* 切换 Tab：只有当 items 数量 >= 2 时才显示 */}
        {resolvedData.items.length >= 2 && (
          <div className="choose">
            {resolvedData.items.map((item) => (
              <div
                key={item.id}
                className={`f_15 item notranslate ${
                  activeId === item.id ? 'active' : ''
                }`}
                role="button"
                tabIndex={0}
                aria-pressed={activeId === item.id}
                onClick={() => setActiveId(item.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveId(item.id);
                  }
                }}
              >
                <p className="notranslate">{item.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* 3D 区域：只渲染当前激活的一个容器，避免隐藏时初始化导致 canvas 宽高为 0 */}
        <div className="detail">
          {resolvedData.items
            .filter((item) => item.id === activeId)
            .map((item) => {
              // 处理图片格式：如果 filenameX/Y 中没有格式，使用 pictureFormat
              const pictureFormat = resolvedData.pictureFormat || 'png';
              const filenameX =
                item.filenameX || `rotate-x{index}.${pictureFormat}`;
              const filenameY =
                item.filenameY || `rotate-y{index}.${pictureFormat}`;

              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="cloudimage-360"
                  data-folder={item.folder}
                  data-filename-x={filenameX}
                  data-amount-x={item.amountX}
                  data-filename-y={filenameY}
                  data-amount-y={item.amountY}
                  data-speed="400"
                  data-drag-speed="200"
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
