import {useEffect, useRef} from 'react';
import {initXros6MiniShowCaseOneScroll} from './useXros6MiniShowCaseOneScroll';

export function Xros6MiniShowCaseOne() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initXros6MiniShowCaseOneScroll(rootRef.current);
  }, []);

  return (
    <div className="spec-showcase1-root" ref={rootRef}>
      <div className="spec-showcase1">
        <div className="spec-showcase1__stick">
          <div className="spec-showcase1__stickbg">
            <div className="spec-showcase1__wrapper">
              <svg
                className="spec-showcase1-clock"
                width="100%"
                height="100%"
                viewBox="0 0 900 900"
                fill="none"
                style={{overflow: 'visible'}}
              >
                <mask
                  id="mask0_864_4778"
                  style={{maskType: 'alpha'}}
                  maskUnits="userSpaceOnUse"
                  x="7"
                  y="7"
                  width="887"
                  height="887"
                >
                  <path
                    d="M450.366 7.11572C695.161 7.11573 893.607 205.562 893.607 450.357C893.607 695.152 695.161 893.598 450.366 893.598C205.571 893.598 7.12512 695.152 7.125 450.357C7.125 205.562 205.571 7.11572 450.366 7.11572ZM450.365 16.3667C210.678 16.3667 16.3732 210.671 16.373 450.358C16.373 690.045 210.678 884.35 450.365 884.35C690.052 884.35 884.356 690.045 884.356 450.358C884.356 210.671 690.052 16.3669 450.365 16.3667Z"
                    fill="var(--clock-bg, #D9D9D9)"
                  />
                </mask>
                <g mask="url(#mask0_864_4778)">
                  <line
                    x1="427.499"
                    y1="7.84713"
                    x2="473.894"
                    y2="893.114"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="652.318"
                    y1="56.0916"
                    x2="249.863"
                    y2="845.953"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="822.793"
                    y1="209.949"
                    x2="79.3262"
                    y2="692.761"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="892.832"
                    y1="427.833"
                    x2="7.565"
                    y2="474.228"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="845.466"
                    y1="652.61"
                    x2="55.6044"
                    y2="250.155"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="691.6"
                    y1="823.078"
                    x2="208.787"
                    y2="79.612"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="404.341"
                    y1="9.59032"
                    x2="497.003"
                    y2="891.216"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="631.369"
                    y1="46.0029"
                    x2="270.804"
                    y2="855.844"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="809.659"
                    y1="190.728"
                    x2="92.4802"
                    y2="711.788"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="891.008"
                    y1="404.647"
                    x2="9.38211"
                    y2="497.309"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="855.475"
                    y1="631.595"
                    x2="45.6332"
                    y2="271.031"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="710.749"
                    y1="809.883"
                    x2="189.688"
                    y2="92.7038"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="381.368"
                    y1="12.1672"
                    x2="520.045"
                    y2="887.735"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="610.004"
                    y1="36.6465"
                    x2="292.317"
                    y2="864.249"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="795.626"
                    y1="171.842"
                    x2="106.7"
                    y2="729.723"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="888.051"
                    y1="381.21"
                    x2="12.4827"
                    y2="519.886"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="864.453"
                    y1="609.709"
                    x2="36.8507"
                    y2="292.022"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="729.25"
                    y1="795.325"
                    x2="171.368"
                    y2="106.399"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="358.645"
                    y1="16.3546"
                    x2="542.955"
                    y2="883.465"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="588.255"
                    y1="28.837"
                    x2="314.317"
                    y2="871.932"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="780.694"
                    y1="154.131"
                    x2="121.909"
                    y2="747.303"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="883.96"
                    y1="358.377"
                    x2="16.8502"
                    y2="542.686"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="872.33"
                    y1="587.795"
                    x2="29.2359"
                    y2="313.857"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="747.041"
                    y1="780.235"
                    x2="153.869"
                    y2="121.45"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="336.162"
                    y1="21.5145"
                    x2="565.6"
                    y2="877.79"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="566.099"
                    y1="21.9631"
                    x2="336.661"
                    y2="878.239"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="764.831"
                    y1="137.014"
                    x2="137.993"
                    y2="763.851"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="878.643"
                    y1="335.573"
                    x2="22.3675"
                    y2="565.012"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="879.044"
                    y1="565.288"
                    x2="22.7683"
                    y2="335.85"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="763.989"
                    y1="764.02"
                    x2="137.152"
                    y2="137.183"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="313.896"
                    y1="28.4076"
                    x2="587.834"
                    y2="871.502"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="543.543"
                    y1="16.8207"
                    x2="359.233"
                    y2="883.931"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="748.022"
                    y1="121.314"
                    x2="154.849"
                    y2="780.099"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="872.076"
                    y1="313.646"
                    x2="28.9814"
                    y2="587.584"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="884.485"
                    y1="543.025"
                    x2="17.3745"
                    y2="358.715"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="780.001"
                    y1="747.506"
                    x2="121.217"
                    y2="154.334"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="291.918"
                    y1="36.3901"
                    x2="609.605"
                    y2="863.992"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="520.642"
                    y1="12.7982"
                    x2="381.965"
                    y2="888.366"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="730.313"
                    y1="106.448"
                    x2="172.432"
                    y2="795.374"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="864.25"
                    y1="292.025"
                    x2="36.6475"
                    y2="609.712"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="888.668"
                    y1="520.437"
                    x2="13.1002"
                    y2="381.761"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="795.022"
                    y1="730.108"
                    x2="106.096"
                    y2="172.227"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="270.22"
                    y1="45.5176"
                    x2="630.785"
                    y2="855.359"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="497.395"
                    y1="9.98878"
                    x2="404.733"
                    y2="891.615"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="711.681"
                    y1="92.5356"
                    x2="190.62"
                    y2="809.715"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="855.158"
                    y1="270.847"
                    x2="45.3163"
                    y2="631.411"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="891.484"
                    y1="497.671"
                    x2="9.85848"
                    y2="405.008"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="808.942"
                    y1="711.954"
                    x2="91.7635"
                    y2="190.893"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="249.552"
                    y1="55.1394"
                    x2="652.007"
                    y2="845.001"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="474.554"
                    y1="7.76908"
                    x2="428.159"
                    y2="893.036"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="692.869"
                    y1="78.9891"
                    x2="210.056"
                    y2="822.456"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="845.472"
                    y1="249.546"
                    x2="55.6106"
                    y2="652.001"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="893.621"
                    y1="474.156"
                    x2="8.35415"
                    y2="427.761"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="822.403"
                    y1="692.467"
                    x2="78.9361"
                    y2="209.654"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                </g>
                <mask
                  id="mask1_864_4778"
                  style={{maskType: 'alpha'}}
                  maskUnits="userSpaceOnUse"
                  x="7"
                  y="7"
                  width="887"
                  height="887"
                >
                  <line
                    x1="450.883"
                    y1="7.11377"
                    x2="450.883"
                    y2="893.596"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="672.883"
                    y1="67.059"
                    x2="229.642"
                    y2="834.775"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="835.066"
                    y1="229.626"
                    x2="67.3505"
                    y2="672.867"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="893.602"
                    y1="450.879"
                    x2="7.11963"
                    y2="450.879"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="834.543"
                    y1="672.867"
                    x2="66.8272"
                    y2="229.626"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                  <line
                    x1="671.977"
                    y1="835.052"
                    x2="228.736"
                    y2="67.3359"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                </mask>
                <g mask="url(#mask1_864_4778)">
                  <path
                    d="M450.366 7.11377C695.161 7.11378 893.607 205.559 893.607 450.354C893.607 695.149 695.161 893.595 450.366 893.595C205.571 893.595 7.125 695.149 7.125 450.354C7.12517 205.559 205.571 7.11377 450.366 7.11377ZM450.369 59.0503C234.258 59.0503 59.0646 234.243 59.0645 450.354C59.0645 666.465 234.258 841.659 450.369 841.659C666.48 841.659 841.674 666.465 841.674 450.354C841.674 234.243 666.48 59.0503 450.369 59.0503Z"
                    fill="var(--clock-center, black)"
                  />
                </g>
                <rect
                  x="444.926"
                  y="0.261628"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <rect
                  x="899.738"
                  y="444.926"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  transform="rotate(90 899.738 444.926)"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <rect
                  x="444.926"
                  y="834.807"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <rect
                  x="65.1993"
                  y="444.926"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  transform="rotate(90 65.1993 444.926)"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <rect
                  x="120.002"
                  y="253.202"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  transform="rotate(120 120.002 253.202)"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <rect
                  x="253.916"
                  y="780.715"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  transform="rotate(30 253.916 780.715)"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <rect
                  x="842.736"
                  y="670.475"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  transform="rotate(120 842.736 670.475)"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <rect
                  x="671.182"
                  y="57.9765"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  transform="rotate(30 671.182 57.9765)"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <rect
                  x="837.795"
                  y="220.961"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  transform="rotate(60 837.795 220.961)"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <rect
                  x="680.104"
                  y="837.173"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  transform="rotate(150 680.104 837.173)"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <rect
                  x="115.053"
                  y="638.234"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  transform="rotate(60 115.053 638.234)"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <rect
                  x="262.838"
                  y="114.435"
                  width="11.5716"
                  height="64.9313"
                  rx="5.7858"
                  transform="rotate(150 262.838 114.435)"
                  stroke="var(--clock-line, black)"
                  strokeOpacity="0.4"
                  strokeWidth="0.523256"
                />
                <g className="projects-indicator-lines">
                  <line
                    className="indicator-line-top"
                    x1="450"
                    y1="450"
                    x2="1693.13"
                    y2="150.189"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />

                  <line
                    className="indicator-line-bottom"
                    x1="450"
                    y1="450"
                    x2="900"
                    y2="450"
                    stroke="var(--clock-line, black)"
                    strokeWidth="1.04651"
                  />
                </g>
              </svg>

              <div className="spec-showcase1-content__container">
                <div className="spec-showcase1-content spec-showcase1-content1 is-active">
                  <div className="spec-showcase1-subtle">60s Priming Coil</div>
                  <div className="spec-showcase1-tle-box">
                    <div className="spec-showcase1-tle spec-showcase1-tle__inner">
                      <div className="spec-showcase1-ico">
                        <svg width="" height="" viewBox="0 0 15 50" fill="none">
                          <path
                            d="M0 47.508V2.65588C0 0.784356 0.305329 0 2.27146 0H14.2857V7.36199H7.01795C6.67561 7.36199 6.40266 7.65985 6.40266 8.02227V41.9728C6.40266 42.3401 6.68024 42.638 7.02258 42.638H14.2857V50H2.31311C0.513509 50 0 49.4489 0 47.508Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="spec-showcase1-tle js-clock-tle-box js-clock-tle-box1">
                        <div className="js-clock-tle">1 Min</div>
                      </div>
                      <div className="spec-showcase1-ico">
                        <svg
                          width="15"
                          height="50"
                          viewBox="0 0 15 50"
                          fill="none"
                        >
                          <path
                            d="M14.2891 47.508V2.65588C14.2891 0.784356 13.9837 0 12.0176 0H0.00331306V7.36199H7.27111C7.61345 7.36199 7.8864 7.65985 7.8864 8.02227V41.9728C7.8864 42.3401 7.60882 42.638 7.26649 42.638H0.00331306V50H11.976C13.7756 50 14.2891 49.4489 14.2891 47.508Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="spec-showcase1-tle">To Start</div>
                  </div>
                  <div className="spec-showcase1-txt">
                    The coil is properly saturated in just one minute after
                    refilling. No long waits—simply fill, wait briefly, and
                    enjoy a smooth start whenever you’re ready.
                  </div>
                  <picture className="spec-showcase1__pic1">
                    <source
                      media="(max-width: 1023px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-04-3.webp"
                    />
                    <source
                      media="(min-width: 1024px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-04-3.webp"
                    />
                    <img
                      src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-04-3.webp"
                      className=""
                      alt=""
                    />
                  </picture>
                  <div className="projects__note-txt projects__note-txt1">
                    *This data is tested by VAPORESSO LAB in environments above
                    5 degrees Celsius.
                  </div>
                </div>
                <div className="spec-showcase1-content spec-showcase1-content2">
                  <div className="spec-showcase1-subtle">1600mAh Mega Batt</div>
                  <div className="spec-showcase1-tle-box">
                    <div className="spec-showcase1-tle spec-showcase1-tle__inner">
                      <div className="spec-showcase1-ico">
                        <svg width="" height="" viewBox="0 0 15 50" fill="none">
                          <path
                            d="M0 47.508V2.65588C0 0.784356 0.305329 0 2.27146 0H14.2857V7.36199H7.01795C6.67561 7.36199 6.40266 7.65985 6.40266 8.02227V41.9728C6.40266 42.3401 6.68024 42.638 7.02258 42.638H14.2857V50H2.31311C0.513509 50 0 49.4489 0 47.508Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="spec-showcase1-tle js-clock-tle-box js-clock-tle-box2">
                        <div className="js-clock-tle">4 Days</div>
                      </div>
                      <div className="spec-showcase1-ico">
                        <svg
                          width="15"
                          height="50"
                          viewBox="0 0 15 50"
                          fill="none"
                        >
                          <path
                            d="M14.2891 47.508V2.65588C14.2891 0.784356 13.9837 0 12.0176 0H0.00331306V7.36199H7.27111C7.61345 7.36199 7.8864 7.65985 7.8864 8.02227V41.9728C7.8864 42.3401 7.60882 42.638 7.26649 42.638H0.00331306V50H11.976C13.7756 50 14.2891 49.4489 14.2891 47.508Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="spec-showcase1-tle">To Last</div>
                  </div>
                  <div className="spec-showcase1-txt">
                    The 1600mAh high-capacity battery delivers impressive
                    endurance, supporting up to 4 days of use on a single
                    charge. Less charging, more uninterrupted satisfaction.
                  </div>
                  <div className="spec-showcase1__num">1600mAh</div>
                  <picture className="spec-showcase1__pic2">
                    <source
                      media="(max-width: 1023px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-05-1.webp"
                    />
                    <source
                      media="(min-width: 1024px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-05-1.webp"
                    />
                    <img
                      src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-05-1.webp"
                      className=""
                      alt=""
                    />
                  </picture>
                  <div className="projects__note-txt projects__note-txt2">
                    *The data is tested by VAPORESSO LAB
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
