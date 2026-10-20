import {useEffect, useRef} from 'react';
import {LazyVideo} from './LazyVideo';
import {SplitText} from './SplitText';
import {initXros6MiniShowCaseTwoScroll} from './useXros6MiniShowCaseTwoScroll';

export function Xros6MiniShowCaseTwo() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initXros6MiniShowCaseTwoScroll(rootRef.current);
  }, []);

  return (
    <div ref={rootRef}>
      <div className="spec-showcase2">
        <div className="spec-showcase2__stick">
          <div className="spec-showcase2__wrapper">
            <div className="spec-showcase2-cnt spec-showcase2-cnt1">
              <LazyVideo className="showcase2-cnt1-lt mobile-to-top">
                <video className="feature-card-bgpic" muted loop playsInline>
                  <source
                    src="https://cdn.shopify.com/videos/c/o/v/f1eb16989084472ea8561da69c11e390.mp4"
                    type="video/mp4"
                  />
                </video>
              </LazyVideo>
              <div className="showcase2-cnt1-rt mobile-to-top">
                <div className="showcase2-cnt1-box js-showcase2-cnt">
                  <div className="showcase2-cnt1-subtle">Venturi Airflow</div>
                  <div className="showcase2-cnt1-tle">
                    <div>Flow Made</div>
                    <div className="js-cnt1-tle1">
                      <SplitText className="js-hero-text1">Smoother</SplitText>
                    </div>
                  </div>
                  <div className="showcase2-cnt1-txt">
                    Powered by the industry-first Venturi Airflow System,
                    airflow is optimized through fluid dynamics to reduce
                    unwanted noise and resistance, leading a quieter, smoother
                    draw that feels as natural as breathing while enhancing
                    flavor delivery.
                  </div>
                  <div className="showcase2-cnt1-num">
                    <div className="showcase2-cnt1-num-item">
                      <div className="showcase2-cnt1-num-item-tp">
                        <div className="pt-cn2-num-tle">
                          <span
                            className="js__num js__num js__num1 counter-animate"
                            data-target="20"
                          >
                            0
                          </span>
                          <span className="pt-cn2-num-tle_span"> %</span>
                        </div>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-mini-up-icon.webp?v=0.1"
                          alt=""
                          className="pt-cn2-num-ico"
                        />
                      </div>
                      <div className="showcase2-cnt1-num-item-bt">Flavor</div>
                    </div>
                    <div className="showcase2-cnt1-num-item">
                      <div className="showcase2-cnt1-num-item-tp">
                        <div className="pt-cn2-num-tle">
                          <span
                            className="js__num js__num js__num2 counter-animate"
                            data-target="30"
                          >
                            0
                          </span>
                          <span className="pt-cn2-num-tle_span"> %</span>
                        </div>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-mini-up-icon.webp?v=0.1"
                          alt=""
                          className="pt-cn2-num-ico"
                        />
                      </div>
                      <div className="showcase2-cnt1-num-item-bt">
                        Smoothness
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="spec-showcase2-cnt spec-showcase2-cnt2">
              <div className="showcase2-cnt2-pics js-pc-opacity2 mobile-to-top">
                <div className="showcase2-cnt2-pic">
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
                          Double Sealed Comprehensicely
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
                        <div className="leak-line-txt">45% Store Safely</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="showcase2-cnt2-wrapper js-showcase2-cnt  mobile-to-top">
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-07-5.svg"
                  alt=""
                  className="showcase2-cnt2-ico"
                />
                <div className="showcase2-cnt2-subtle">SSS 2.0 TECH</div>
                <div className="showcase2-cnt2-tle mb-cnt2__pst">
                  <div>Leak-resistance Made</div>
                  <div className="js-cnt1-tle2">
                    <SplitText className="js-hero-text2">Stronger</SplitText>
                  </div>
                </div>
                <div className="showcase2-cnt2-txt">
                  With upgraded SSS Leak-Resistant Technology 2.0, thermal
                  leak-prevention design and improved structural sealing work
                  together to significantly anti leaking and anti messing during
                  daily use or travel.
                </div>
              </div>
            </div>
            <div className="spec-showcase2-cnt spec-showcase2-cnt3">
              <picture className="showcase2-cnt3-lt mobile-to-top">
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-Mob-08-2.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-08-1.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-08-1.webp"
                  className=""
                  alt=""
                />
              </picture>
              <div className="showcase2-cnt3-rt mobile-to-top">
                <div className="showcase2-cnt3-rt-box js-showcase2-cnt">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-08-2.svg"
                    alt=""
                    className="showcase2-cnt3-ico"
                  />
                  <div className="showcase2-cnt3-tle">
                    <div>Flavor Made</div>
                    <div className="js-cnt1-tle3">
                      <SplitText className="js-hero-text3">Richer</SplitText>
                    </div>
                  </div>
                  <div className="showcase2-cnt3-txt">
                    Applying the new Hive Mesh Structure with Nano-Microfiber
                    Process and Aerospace Grade cotton Materials, the COREX 3.0
                    delivers a richer aroma reproduction, delicate flavor,
                    smoother vaping experience.
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
