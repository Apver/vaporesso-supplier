/**
 * COREX 连接线 — 路径拆段，便于描边依次延长动效
 * 右上角为「先水平向右，再垂直向上」两段
 */

const STROKE_PC = {
  stroke: 'white',
  strokeOpacity: 0.4,
  strokeWidth: 0.635,
  strokeLinejoin: 'round',
  fill: 'none',
};

const STROKE_MOB = {
  stroke: 'white',
  strokeOpacity: 0.4,
  strokeWidth: 0.8,
  strokeLinejoin: 'round',
  fill: 'none',
};

/**
 * @param {{ className?: string }} props
 */
export function CorexLinePc({className = ''}) {
  return (
    <svg
      className={className}
      width="493"
      height="204"
      viewBox="0 0 493 204"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-corex-line="pc"
    >
      {/* 中右：向右 */}
      <path
        className="xros-mini-retro-corex-line__path xros-mini-retro-corex-line__path--h-right"
        d="M255.587 181.292H492.76"
        {...STROKE_PC}
      />
      {/* 右上：先向右 */}
      <path
        className="xros-mini-retro-corex-line__path xros-mini-retro-corex-line__path--elbow-h"
        d="M259.715 130.81H440.372"
        {...STROKE_PC}
      />
      {/* 右上：再向上 */}
      <path
        className="xros-mini-retro-corex-line__path xros-mini-retro-corex-line__path--elbow-v"
        d="M440.372 130.81V37.4649"
        {...STROKE_PC}
      />
      {/* 左上：向左 */}
      <path
        className="xros-mini-retro-corex-line__path xros-mini-retro-corex-line__path--h-left-top"
        d="M232.092 0.317383H93.345"
        {...STROKE_PC}
      />
      {/* 左下：向左 */}
      <path
        className="xros-mini-retro-corex-line__path xros-mini-retro-corex-line__path--h-left-bottom"
        d="M231.457 202.882H0"
        {...STROKE_PC}
      />
    </svg>
  );
}

/**
 * @param {{ className?: string }} props
 */
export function CorexLineMob({className = ''}) {
  return (
    <svg
      className={className}
      width="277"
      height="115"
      viewBox="0 0 277 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-corex-line="mob"
    >
      <path
        className="xros-mini-retro-corex-line__path xros-mini-retro-corex-line__path--h-right"
        d="M143.481 101.773H276.624"
        {...STROKE_MOB}
      />
      <path
        className="xros-mini-retro-corex-line__path xros-mini-retro-corex-line__path--elbow-h"
        d="M145.798 73.4337H260.8"
        {...STROKE_MOB}
      />
      <path
        className="xros-mini-retro-corex-line__path xros-mini-retro-corex-line__path--elbow-v"
        d="M247.215 73.4337V21.032"
        {...STROKE_MOB}
      />
      <path
        className="xros-mini-retro-corex-line__path xros-mini-retro-corex-line__path--h-left-top"
        d="M130.291 0.178223H52.4018"
        {...STROKE_MOB}
      />
      <path
        className="xros-mini-retro-corex-line__path xros-mini-retro-corex-line__path--h-left-bottom"
        d="M129.935 113.894H0"
        {...STROKE_MOB}
      />
    </svg>
  );
}
