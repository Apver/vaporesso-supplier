import {useEffect, useRef} from 'react';
import {initXros6AdvantageScroll} from './useXros6AdvantageScroll';

export function Xros6AdvantageSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initXros6AdvantageScroll(rootRef.current);
  }, []);

  return (
    <div
      className="product__advantage-section product__advantage-container"
      ref={rootRef}
    >
      <div className="product__advantage">
        <div className="product__advantage-cards">
          <div className="product-advantage-card">
            <div className="product-advantage-card__container">
              <div className="product-advantage-bg1"></div>
              <picture className="product-advantage-card__pic">
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-04-1.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-04-1.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-04-1.webp"
                  className="product-advantage-card__image"
                  alt=""
                />
              </picture>
              <div className="product-advantage-card__content-box">
                <div className="product-advantage-card__content">
                  <div className="product-advantage-card__num">1</div>
                  <h3 className="product-advantage-card__tle">
                    Instant Relief. Lasting SATISFACTION.
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="product-advantage-card">
            <div className="product-advantage-card__container">
              <div className="product-advantage-bg2"></div>
              <picture className="product-advantage-card__pic">
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-04-2.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-04-2.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-04-2.webp"
                  className="product-advantage-card__image"
                  alt=""
                />
              </picture>
              <div className="product-advantage-card__content">
                <div className="product-advantage-card__num">2</div>
                <h3 className="product-advantage-card__tle">
                  Smooth Flavor. <br /> Pure Enjoyment.
                </h3>
              </div>
            </div>
          </div>
          <div className="product-advantage-card">
            <div className="product-advantage-card__container">
              <div className="product-advantage-bg3"></div>
              <picture className="product-advantage-card__pic">
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-04-3.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-04-3.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-04-3.webp"
                  className="product-advantage-card__image"
                  alt=""
                />
              </picture>
              <div className="product-advantage-card__content">
                <div className="product-advantage-card__num">3</div>
                <h3 className="product-advantage-card__tle">
                  Simple Control. Effortless Experience.
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="projects__content-container projects__clock-container">
          <div className="projects__content-container1__bg"></div>
          <div className="projects__clock-wrapper">
            <svg
              className="projects-clock-svg"
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
            <div className="projects-clock-content__container">
              <div className="projects-clock-content projects-clock-content1">
                <div className="projects-clock-subtle">60s Prime</div>
                <div className="projects-clock-tle-box">
                  <div className="projects-clock-tle projects-clock-tle__inner">
                    <div className="projects-clock-ico">
                      <svg width="" height="" viewBox="0 0 15 50" fill="none">
                        <path
                          d="M0 47.508V2.65588C0 0.784356 0.305329 0 2.27146 0H14.2857V7.36199H7.01795C6.67561 7.36199 6.40266 7.65985 6.40266 8.02227V41.9728C6.40266 42.3401 6.68024 42.638 7.02258 42.638H14.2857V50H2.31311C0.513509 50 0 49.4489 0 47.508Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="projects-clock-tle js-clock-tle-box js-clock-tle-box1">
                      <div className="js-clock-tle">1 Min</div>
                    </div>
                    <div className="projects-clock-ico">
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
                  <div className="projects-clock-tle">To Start</div>
                </div>
                <div className="projects-clock-txt">
                  With the 60s Smart Prime, the coil is properly saturated in
                  just one minute after refilling. No long waits—simply fill,
                  wait briefly, and enjoy a smooth start whenever you’re ready.
                </div>
                <picture className="projects-clock__pic">
                  <source
                    media="(max-width: 1023px)"
                    srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-05-3.webp"
                  />
                  <source
                    media="(min-width: 1024px)"
                    srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-05-3.webp"
                  />
                  <img
                    src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-05-3.webp"
                    className=""
                    alt=""
                  />
                </picture>
                <div className="projects__note-txt projects__note-txt1">
                  *This data is teste by VAPORESSO LAB in environments above 5
                  degrees Celsius.
                </div>
              </div>
              <div className="projects-clock-content projects-clock-content2">
                <div className="projects-clock-subtle">3A Super Charging</div>
                <div className="projects-clock-tle-box">
                  <div className="projects-clock-tle projects-clock-tle__inner">
                    <div className="projects-clock-ico">
                      <svg width="" height="" viewBox="0 0 15 50" fill="none">
                        <path
                          d="M0 47.508V2.65588C0 0.784356 0.305329 0 2.27146 0H14.2857V7.36199H7.01795C6.67561 7.36199 6.40266 7.65985 6.40266 8.02227V41.9728C6.40266 42.3401 6.68024 42.638 7.02258 42.638H14.2857V50H2.31311C0.513509 50 0 49.4489 0 47.508Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="projects-clock-tle js-clock-tle-box js-clock-tle-box2">
                      <div className="js-clock-tle">10 Mins</div>
                    </div>
                    <div className="projects-clock-ico">
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
                  <div className="projects-clock-tle">To Power</div>
                </div>
                <div className="projects-clock-txt">
                  Equipped with 3A fast charging, XROS 6 reaches around 50%
                  charge in just 10 minutes. A quick coffee break is all it
                  takes to power up and get back to vaping.
                </div>
                <div className="projects-clock__num">3A</div>
              </div>
              <div className="projects-clock-content projects-clock-content3">
                <div className="projects-clock-subtle">1800mAh Mega Batt</div>
                <div className="projects-clock-tle-box">
                  <div className="projects-clock-tle projects-clock-tle__inner">
                    <div className="projects-clock-ico">
                      <svg width="" height="" viewBox="0 0 15 50" fill="none">
                        <path
                          d="M0 47.508V2.65588C0 0.784356 0.305329 0 2.27146 0H14.2857V7.36199H7.01795C6.67561 7.36199 6.40266 7.65985 6.40266 8.02227V41.9728C6.40266 42.3401 6.68024 42.638 7.02258 42.638H14.2857V50H2.31311C0.513509 50 0 49.4489 0 47.508Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="projects-clock-tle js-clock-tle-box js-clock-tle-box3">
                      <div className="js-clock-tle">5 Days</div>
                    </div>
                    <div className="projects-clock-ico">
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
                  <div className="projects-clock-tle">To Last</div>
                </div>
                <div className="projects-clock-txt">
                  The 1800mAh high-capacity battery delivers impressive
                  endurance, supporting up to 5 days of use on a single charge.
                  Less charging, more uninterrupted satisfaction
                </div>
                <div className="projects-clock__num">1800mAh</div>
                <div className="projects__note-txt projects__note-txt2">
                  *The data is tested by VAPORESSO LAB
                </div>
              </div>
            </div>
          </div>
          <div className="projects-clock-full__picwrapper">
            <picture className="projects-clock-full__pic projects-clock-full__pic1">
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-06-1.webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-06-1.webp"
              />
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-06-1.webp"
                className=""
                alt=""
              />
            </picture>
          </div>
          <div className="projects-clock-full__picwrapper">
            <picture className="projects-clock-full__pic projects-clock-full__pic2">
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-07-1.webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-07-1.webp"
              />
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-07-1.webp"
                className=""
                alt=""
              />
            </picture>
          </div>
        </div>
        <div className="projects__content-container projects__content-container2">
          <div className="projects__cnt-wrapper">
            <div className="projects__container2-box projects__container2-box1">
              <div className="projects__container2-cnt projects__container2-cnt-mbshow js-container2-cnt js-pc-opacity1">
                <div className="projects__container2-cnt-wrapper">
                  <div className="pt-cn2-nums">
                    <div className="pt-cn2-num">
                      <div className="pt-cn2-num-tp">
                        <div className="pt-cn2-num-tle">
                          <span className="js__num js__num1">20</span>
                          <span className="pt-cn2-num-tle_span">%</span>
                        </div>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-08-2.svg"
                          alt=""
                          className="pt-cn2-num-ico"
                        />
                      </div>
                      <div className="pt-cn2-num-bt">Flavor</div>
                    </div>
                    <div className="pt-cn2-num">
                      <div className="pt-cn2-num-tp">
                        <div className="pt-cn2-num-tle">
                          <span className="js__num js__num2">30</span>
                          <span className="pt-cn2-num-tle_span">%</span>
                        </div>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-08-2.svg"
                          alt=""
                          className="pt-cn2-num-ico"
                        />
                      </div>
                      <div className="pt-cn2-num-bt">Smoothness</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="projects__container2-box1-pic js-container2-cnt js-pc-opacity1 projects__container2-video-box">
                <lazy-video>
                  <video
                    className="s-hide"
                    src="https://cdn.shopify.com/videos/c/o/v/f7f29608a8084a988fca8f7416fbbf51.mp4"
                    autoPlay
                    muted
                    playsInline
                    loop
                    poster="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-08-1.webp?v=0.1"
                    alt=""
                  ></video>
                </lazy-video>
                <lazy-video>
                  <video
                    className="x-hide"
                    src="https://cdn.shopify.com/videos/c/o/v/142eda15ee3646ba95251669d3a8b098.mp4"
                    autoPlay
                    muted
                    playsInline
                    loop
                    poster="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-08-1.webp?v=0.1"
                    alt=""
                  ></video>
                </lazy-video>
              </div>
              <div className="projects__container2-cnt js-container2-cnt">
                <div className="projects__container2-cnt-wrapper">
                  <div className="pt-cn2-subtle js-pc-opacity1">
                    VENTURI Airflow
                  </div>
                  <h3 className="pt-cn2-tle projects__container2-highlight">
                    Flow Made Smooth<span className="">er</span>
                  </h3>
                  <div className="pt-cn2-txt js-pc-opacity1">
                    Powered by the industry-first VENTURI Airflow System,
                    airflow is optimized through fluid dynamics to reduce
                    unwanted noise and resistance, leading a quieter, smoother
                    draw that feels as natural as breathing while enhancing
                    flavor delivery
                  </div>
                  <div className="pt-cn2-nums projects__container2-cnt-mbvisible js-pc-opacity1">
                    <div className="pt-cn2-num">
                      <div className="pt-cn2-num-tp">
                        <div className="pt-cn2-num-tle">
                          <span className="js__num js__num1">0</span>
                          <span className="pt-cn2-num-tle_span">%</span>
                        </div>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-08-2.svg"
                          alt=""
                          className="pt-cn2-num-ico"
                        />
                      </div>
                      <div className="pt-cn2-num-bt">Flavor</div>
                    </div>
                    <div className="pt-cn2-num">
                      <div className="pt-cn2-num-tp">
                        <div className="pt-cn2-num-tle">
                          <span className="js__num js__num2">0</span>
                          <span className="pt-cn2-num-tle_span">%</span>
                        </div>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-08-2.svg"
                          alt=""
                          className="pt-cn2-num-ico"
                        />
                      </div>
                      <div className="pt-cn2-num-bt">Smoothness</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="projects__container2-box projects__container2-box2">
              <div className="projects__container2-cnt js-container2-cnt">
                <div className="projects__container2-cnt-wrapper">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-icon-SSS.svg"
                    alt=""
                    className="projects__container2-box2-svg js-pc-opacity2"
                  />
                  <div className="pt-cn2-subtle js-pc-opacity2">
                    SSS 2.0 TECH
                  </div>
                  <h3 className="pt-cn2-tle projects__container3-highlight">
                    Leak-resistance Made Strong<span className="">er</span>
                  </h3>
                  <div className="pt-cn2-txt js-pc-opacity2">
                    With upgraded SSS Leak-Resistant Technology 2.0, thermal
                    leak-prevention design and improved structural sealing work
                    together to significantly anti leaking and anti messing
                    during daily use or travel.
                  </div>
                  <div className="pt-cn2-nums js-pc-opacity2">
                    <div className="pt-cn2-num">
                      <div className="pt-cn2-num-tp">
                        <div className="pt-cn2-num-tle">
                          <span className="js__num js__num4">0</span>
                          <span className="pt-cn2-num-tle_span">%</span>
                        </div>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-09-5.svg"
                          alt=""
                          className="pt-cn2-num-ico"
                        />
                      </div>
                      <div className="pt-cn2-num-bt">Bigger Reservoir</div>
                    </div>
                  </div>
                </div>
                <div className="projects__container2-pics js-pc-opacity2">
                  <div className="projects__container2-pic">
                    <div className="leak-pic-container leak-pic-container1">
                      <picture className="leak-pic leak-pic1">
                        <source
                          media="(max-width: 1023px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-09-1.webp"
                        />
                        <source
                          media="(min-width: 1024px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-09-1.webp"
                        />
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-09-1.webp"
                          className=""
                          alt=""
                        />
                      </picture>
                    </div>
                    <div className="leak-pic-container leak-pic-container2">
                      <picture className="leak-pic leak-pic2">
                        <source
                          media="(max-width: 1023px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-09-2.webp"
                        />
                        <source
                          media="(min-width: 1024px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-09-2.webp"
                        />
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-09-2.webp"
                          className=""
                          alt=""
                        />
                      </picture>
                      <div className="leak-lines leak-lines1">
                        <div className="leak-line-inner">
                          <div className="leak-line-box">
                            <div className="leak-line"></div>
                            <div className="leak-cricle"></div>
                          </div>
                          <div className="leak-line-txt">
                            Double Sealed Comprehensively
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="leak-pic-container leak-pic-container3">
                      <picture className="leak-pic leak-pic3">
                        <source
                          media="(max-width: 1023px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-09-3.webp"
                        />
                        <source
                          media="(min-width: 1024px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-09-3.webp"
                        />
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-09-3.webp"
                          className=""
                          alt=""
                        />
                      </picture>
                      <div className="leak-lines leak-lines2">
                        <div className="leak-line-inner">
                          <div className="leak-line-box">
                            <div className="leak-cricle"></div>
                            <div className="leak-line"></div>
                          </div>
                          <div className="leak-line-txt">
                            Saturate More Properly
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="leak-pic-container leak-pic-container4">
                      <picture className="leak-pic leak-pic4">
                        <source
                          media="(max-width: 1023px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-09-4.webp"
                        />
                        <source
                          media="(min-width: 1024px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-09-4.webp"
                        />
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-09-4.webp"
                          className=""
                          alt=""
                        />
                      </picture>
                      <div className="leak-lines leak-lines3">
                        <div className="leak-line-inner">
                          <div className="leak-line-box">
                            <div className="leak-cricle"></div>
                            <div className="leak-line"></div>
                          </div>
                          <div className="leak-line-txt">
                            45%<span className="leak-line-txt-up">&#8593;</span>
                            Store Safely
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="projects__container2-box projects__container2-box3">
              <div className="projects__container2-cnt">
                <div className="projects__container2-cnt-wrapper">
                  <div className="pt-cn2-ico">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-10-2.svg"
                      alt=""
                    />
                  </div>
                  <h3 className="pt-cn2-tle">Flavor Made Richer</h3>
                  <div className="pt-cn2-txt">
                    Applying the new Hive Mesh Structure with Nano-Microfiber
                    Process and Aerospace Grade cotton Materials, the COREX 3.0
                    delivers a richer aroma reproduction, delicate flavor,
                    smoother vaping experience.
                  </div>
                </div>
                <picture className="projects__container2-img-wrapper">
                  <source
                    media="(max-width: 1023px)"
                    srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-10-1.webp"
                  />
                  <source
                    media="(min-width: 1024px)"
                    srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-10-1.webp"
                  />
                  <img
                    src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-10-1.webp"
                    className=""
                    alt=""
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
        <div className="projects__content-container projects__content-container3">
          <div className="projects__cnt-wrapper projects__content-container3-box1">
            <div className="projects__container3-box projects__container3-box1">
              <div className="projects__container3-cnt">
                <div className="projects__container3-cnt-wrapper projects__container3-cnt-wrapper-interact">
                  <div className="product__advantage-tle">
                    Interact Effortlessly
                  </div>
                  <div className="product__advantage-txt">
                    Thoughtful interaction features make every use effortless.
                  </div>
                  <div className="product__advantage-txt product__advantage-txt-tips">
                    *When paired with the 0.4Ω pod, you can precisely adjust
                    power levels by 0.5W
                  </div>
                </div>
                <div className="projects__container3-panel-hid">
                  <div className="projects__container3-panel">
                    <div className="m-fixedPanel_wrapper">
                      <div className="m-fixedPanel_inner o-homeProjects_list">
                        <div className="o-homeProjects_item">
                          <div
                            className="m-projectCard"
                            style={{'--delay': '100ms'}}
                          >
                            <picture className="projectCard-pic-wrapper">
                              <source
                                media="(min-width: 1024px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-2.webp"
                              />
                              <source
                                media="(max-width: 1023px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-11-2.webp"
                              />
                              <img
                                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-2.webp"
                                className=""
                                alt=""
                              />
                            </picture>
                            <h4 className="projectCard-h4">Menu</h4>
                            <div className="projectCard-clicks">
                              <div className="projectCard-click-ico">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-8.svg"
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="projectCard-click-cnt">
                                <span className="projectCard-click-txt">
                                  Click
                                </span>
                                <span className="projectCard-click-num">
                                  x2
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="o-homeProjects_item">
                          <div
                            className="m-projectCard"
                            style={{'--delay': '200ms'}}
                          >
                            <picture className="projectCard-pic-wrapper">
                              <source
                                media="(min-width: 1024px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-3.webp"
                              />
                              <source
                                media="(max-width: 1023px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-11-3.webp"
                              />
                              <img
                                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-3.webp"
                                className=""
                                alt=""
                              />
                            </picture>
                            <h4 className="projectCard-h4">Prime Coil</h4>
                            <div className="projectCard-clicks">
                              <div className="projectCard-click-ico">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-8.svg"
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="projectCard-click-cnt">
                                <span className="projectCard-click-txt">
                                  Long Press
                                </span>
                                <span className="projectCard-click-num">
                                  3s
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="o-homeProjects_item">
                          <div
                            className="m-projectCard"
                            style={{'--delay': '300ms'}}
                          >
                            <picture className="projectCard-pic-wrapper">
                              <source
                                media="(min-width: 1024px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-4.webp"
                              />
                              <source
                                media="(max-width: 1023px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-11-4.webp"
                              />
                              <img
                                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-4.webp"
                                className=""
                                alt=""
                              />
                            </picture>
                            <h4 className="projectCard-h4">Power Mode</h4>
                            <div className="projectCard-clicks">
                              <div className="projectCard-click-ico">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-8.svg"
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="projectCard-click-cnt">
                                <span className="projectCard-click-txt">
                                  Click
                                </span>
                                <span className="projectCard-click-num">
                                  x3
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="o-homeProjects_item">
                          <div
                            className="m-projectCard"
                            style={{'--delay': '400ms'}}
                          >
                            <picture className="projectCard-pic-wrapper">
                              <source
                                media="(min-width: 1024px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-5.webp"
                              />
                              <source
                                media="(max-width: 1023px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-11-5.webp"
                              />
                              <img
                                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-5.webp"
                                className=""
                                alt=""
                              />
                            </picture>
                            <h4 className="projectCard-h4">Lock/Unlock</h4>
                            <div className="projectCard-clicks">
                              <div className="projectCard-click-ico">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-8.svg"
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="projectCard-click-cnt">
                                <span className="projectCard-click-txt">
                                  Click
                                </span>
                                <span className="projectCard-click-num">
                                  x4
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="o-homeProjects_item">
                          <div
                            className="m-projectCard"
                            style={{'--delay': '500ms'}}
                          >
                            <picture className="projectCard-pic-wrapper">
                              <source
                                media="(min-width: 1024px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-6.webp"
                              />
                              <source
                                media="(max-width: 1023px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-11-6.webp"
                              />
                              <img
                                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-6.webp"
                                className=""
                                alt=""
                              />
                            </picture>
                            <h4 className="projectCard-h4">Power On/Off</h4>
                            <div className="projectCard-clicks">
                              <div className="projectCard-click-ico">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-8.svg"
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="projectCard-click-cnt">
                                <span className="projectCard-click-txt">
                                  Click
                                </span>
                                <span className="projectCard-click-num">
                                  x5
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="o-homeProjects_item">
                          <div
                            className="m-projectCard"
                            style={{'--delay': '600ms'}}
                          >
                            <picture className="projectCard-pic-wrapper">
                              <source
                                media="(min-width: 1024px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-7.webp"
                              />
                              <source
                                media="(max-width: 1023px)"
                                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-11-7.webp"
                              />
                              <img
                                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-7.webp"
                                className=""
                                alt=""
                              />
                            </picture>
                            <h4 className="projectCard-h4">Swich Power</h4>
                            <div className="projectCard-clicks">
                              <div className="projectCard-click-ico">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-8.svg"
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="projectCard-click-cnt">
                                <span className="projectCard-click-txt">
                                  Quick Draw
                                </span>
                                <span className="projectCard-click-num">
                                  x2
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="projects__container3-device">
                  <picture className="projects__container3-device-pic">
                    <source
                      media="(min-width: 1024px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-1.webp?v=0.1"
                    />
                    <source
                      media="(max-width: 1023px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-11-1.webp?v=0"
                    />
                    <img
                      src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-11-1.webp?v=0.1"
                      className=""
                      alt=""
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
          <div className="projects__cnt-wrapper projects__content-container3-box2">
            <div className="projects__container3-box projects__container3-box2">
              <video
                src="https://cdn.shopify.com/videos/c/o/v/fa45f01a9b13454d89e1f3d466a1dfc9.mp4"
                muted
                playsInline
                loop
                autoPlay
                poster=""
                className="projects__container3-video"
              ></video>
              <div className="projects__container3-cnt">
                <div className="projects__container3-cnt-wrapper">
                  <div className="product__advantage-tle">
                    Adjust Your Vape Freely
                  </div>
                  <div className="product__advantage-txt">
                    Fine-tune your experience with flexible controls. The side
                    airflow control lets you easily switch from tight MTL to a
                    looser draw.
                  </div>
                  <div className="airflow-container">
                    <div className="airflow-item">
                      <picture className="toggle-icon">
                        <source
                          media="(max-width: 1023px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-12-2.webp"
                        />
                        <source
                          media="(min-width: 1024px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-12-2.webp"
                        />
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-12-2.webp"
                          className=""
                          alt=""
                        />
                      </picture>
                      <div className="airflow-text">Loose Airflow</div>
                    </div>
                    <div className="airflow-item">
                      <picture className="toggle-icon">
                        <source
                          media="(max-width: 1023px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-12-3.webp"
                        />
                        <source
                          media="(min-width: 1024px)"
                          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-12-3.webp"
                        />
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-12-3.webp"
                          className=""
                          alt=""
                        />
                      </picture>
                      <div className="airflow-text">Tight Airflow</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="projects__content-container3-bg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
