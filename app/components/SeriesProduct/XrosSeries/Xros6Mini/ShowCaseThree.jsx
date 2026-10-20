import {useEffect, useRef} from 'react';
import {LazyVideo} from './LazyVideo';
import {initXros6MiniShowCaseThreeScroll} from './useXros6MiniShowCaseThreeScroll';

export function Xros6MiniShowCaseThree() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initXros6MiniShowCaseThreeScroll(rootRef.current);
  }, []);

  return (
    <div className="spec-showcase3-root" ref={rootRef}>
      <div className="spec-showcase3">
        <div className="spec-showcase3__stick">
          <div className="spec-showcase3__wrapper">
            <div className="spec-showcase3-item spec-showcase3-item1">
              <div className="showcase3-item1-cnt mobile-to-top">
                <div className="showcase3-subtle">Tidal battery indicator</div>
                <div className="showcase3-tle">Know Your State Better</div>
                <div className="showcase3-txt">
                  The XROS 6 MINI features the tidal battery indicator to help
                  you know your battery level better.
                </div>
              </div>
              <div className="showcase3-item1-cot mobile-to-top">
                <div className="showcase3-pic__biox">
                  <picture className="showcase3-pic">
                    <source
                      media="(max-width: 1023px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-09-1.png"
                    />
                    <source
                      media="(min-width: 1024px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-09-1.png"
                    />
                    <img
                      src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-09-1.png"
                      className=""
                      alt=""
                    />
                  </picture>
                  <div className="charging-container">
                    <div className="indicator"></div>
                    <div className="indicator"></div>
                    <div className="indicator"></div>
                    <div className="indicator"></div>
                    <div className="indicator"></div>
                  </div>
                </div>
                <div className="showcase3-indicator-light">
                  <div className="indicator-light-item">
                    <div className="charging-container">
                      <div className="indicator"></div>
                      <div className="indicator"></div>
                      <div className="indicator"></div>
                      <div className="indicator"></div>
                      <div className="indicator"></div>
                    </div>
                    <div className="indicator-light-tle">80-100%</div>
                    <div className="indicator-light-txt">5 LED Lights On</div>
                  </div>
                  <div className="indicator-light-item">
                    <div className="charging-container">
                      <div className="indicator"></div>
                      <div className="indicator"></div>
                      <div className="indicator"></div>
                      <div className="indicator"></div>
                    </div>
                    <div className="indicator-light-tle">60-80%</div>
                    <div className="indicator-light-txt">4 LED Lights On</div>
                  </div>
                  <div className="indicator-light-item">
                    <div className="charging-container">
                      <div className="indicator"></div>
                      <div className="indicator"></div>
                      <div className="indicator"></div>
                    </div>
                    <div className="indicator-light-tle">40-60%</div>
                    <div className="indicator-light-txt">3 LED Lights On</div>
                  </div>
                  <div className="indicator-light-item">
                    <div className="charging-container">
                      <div className="indicator"></div>
                      <div className="indicator"></div>
                    </div>
                    <div className="indicator-light-tle">20-40%</div>
                    <div className="indicator-light-txt">2 LED Lights On</div>
                  </div>
                  <div className="indicator-light-item">
                    <div className="charging-container">
                      <div className="indicator"></div>
                    </div>
                    <div className="indicator-light-tle">0-20%</div>
                    <div className="indicator-light-txt">1 LED Light On</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="spec-showcase3-item spec-showcase3-item2">
              <div className="showcase3-item2-box">
                <LazyVideo className="showcase3-item2-video">
                  <video
                    className="showcase3-item2-bgpic"
                    muted
                    loop
                    playsInline
                  >
                    <source
                      src="https://cdn.shopify.com/videos/c/o/v/44fe57fba0cd43b1a977efde4de59af7.mp4"
                      type="video/mp4"
                      media="(min-width: 992px)"
                    />
                    <source
                      src="https://cdn.shopify.com/videos/c/o/v/e99f7075f450484ba184d86fa3addcc5.mp4"
                      type="video/mp4"
                      media="(max-width: 991px)"
                    />
                  </video>
                </LazyVideo>
                <div className="showcase3-item2-cnt">
                  <div className="showcase3-item2-cnt-wrapper">
                    <div className="showcase3-item2-tle">
                      Adjust Your Vape Freely
                    </div>
                    <div className="showcase3-item2-txt">
                      Fine-tune your experience with flexible controls. When
                      paired with the 0.4Ω pod, you can precisely adjust power
                      levels. The side airflow control lets you easily switch
                      from tight MTL to a looser draw.
                    </div>
                    <div className="airflow-container">
                      <div className="airflow-item airflow-item-new1">
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
                      <div className="airflow-item airflow-item-new2">
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
              <div className="showcase3-item2-bg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
