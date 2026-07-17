/**
 * SVG Icon Components
 * These components render SVG icons directly as React components
 */

export function MenuDropdownIcon() {
  return (
    <svg
      width="10"
      height="7"
      viewBox="0 0 10 7"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="presentation"
      focusable="false"
    >
      <title>下拉箭头/导航栏备份 4@2x</title>
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
      >
        <g transform="translate(-53, -19)" stroke="#000000" strokeWidth="1.5">
          <g transform="translate(54.5, 20.5)">
            <polyline
              transform="translate(3.5, 2) rotate(90) translate(-3.5, -2)"
              points="1.5 -1.5 5.5 2 1.5 5.5"
            ></polyline>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function ArrowRightIcon() {
  return (
    <svg
      width="11"
      height="10"
      viewBox="0 0 11 10"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="presentation"
      focusable="false"
    >
      <title>形状结合@2x</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M5.86864141,0.592339315 L10.4918343,5.22355158 L5.86864141,9.85476384 L5.09015023,9.07762069 L8.3887285,5.77333931 L0.478728497,5.77091087 L0.479042757,4.67091091 L8.3877285,4.67333931 L5.09015023,1.36948246 L5.86864141,0.592339315 Z"
          fill="#000000"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}

export function SwiperArrowIcon({direction = 'left'}) {
  const isFlipped = direction === 'right';
  return (
    <svg
      width="36px"
      height="36px"
      viewBox="0 0 36 36"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="presentation"
      focusable="false"
      style={isFlipped ? {transform: 'scaleX(-1)'} : undefined}
    >
      <title>icon/向左查看更多备份</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-1414, -2406)"
          stroke="#000000"
          strokeWidth="0.857142857"
        >
          <g transform="translate(719, 2363)">
            <g transform="translate(713, 61) scale(-1, 1) translate(-713, -61)translate(695, 43)">
              <circle
                fill="#FFFFFF"
                transform="translate(18, 18) scale(-1, 1) translate(-18, -18)"
                cx="18"
                cy="18"
                r="17.5714286"
              ></circle>
              <g transform="translate(19.9501, 17.9569) scale(-1, 1) translate(-19.9501, -17.9569)translate(10.7574, 13.7143)">
                <line x1="0" y1="4.2448709" x2="18" y2="4.2448709"></line>
                <polyline
                  transform="translate(14.1429, 4.2426) rotate(-135) translate(-14.1429, -4.2426)"
                  points="11.1428571 1.24264069 11.148052 7.23744588 17.1428571 7.24264069"
                ></polyline>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="presentation"
      focusable="false"
    >
      <title>Close</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-1432, -162)"
          stroke="#000000"
          strokeWidth="1.7"
        >
          <g transform="translate(631, -2842)">
            <g transform="translate(3, 3000)">
              <g transform="translate(799, 5)">
                <line x1="0" y1="11" x2="11" y2="0"></line>
                <line x1="11" y1="11" x2="0" y2="0"></line>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function StoreIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="presentation"
      focusable="false"
    >
      <title>store@2x</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-289, -9)">
          <g transform="translate(245, 9)">
            <g transform="translate(44, 0)">
              <rect
                fillOpacity="0"
                fill="#D8D8D8"
                x="0"
                y="0"
                width="30"
                height="30"
              ></rect>
              <g transform="translate(8, 7)" stroke="#000000" strokeWidth="1.6">
                <path d="M7.5,0 C8.88071187,0 10,1.11928813 10,2.5 C10,2.67138643 9.98275399,2.83874484 9.94990271,3.00043449 L5.05009729,3.00043449 C5.01724601,2.83874484 5,2.67138643 5,2.5 C5,1.11928813 6.11928813,0 7.5,0 Z"></path>
                <rect x="0" y="3" width="15" height="13" rx="3"></rect>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function MenuMobileIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="presentation"
      focusable="false"
    >
      <title>菜单@2x</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-333, -9)">
          <g transform="translate(245, 9)">
            <g transform="translate(88, 0)">
              <rect
                fillOpacity="0"
                fill="#D8D8D8"
                x="0"
                y="0"
                width="30"
                height="30"
              ></rect>
              <g transform="translate(8, 8)" fill="#000000">
                <path d="M0,0 L15,0 L15,1.6 L0,1.6 L0,0 Z M0,6 L15,6 L15,7.6 L0,7.6 L0,6 Z M15,12 L0,12 L0,13.6 L15,13.6 L15,12 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function SearchMobileIcon() {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="presentation"
      focusable="false"
    >
      <title>搜索/无外框备份</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-40, -124)"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <g transform="translate(40, 124)">
            <ellipse
              cx="6.29105984"
              cy="6.54886709"
              rx="5.54105984"
              ry="5.79886709"
            ></ellipse>
            <line
              x1="10.3481107"
              y1="11.1984565"
              x2="14"
              y2="15"
              strokeLinecap="round"
            ></line>
          </g>
        </g>
      </g>
    </svg>
  );
}
