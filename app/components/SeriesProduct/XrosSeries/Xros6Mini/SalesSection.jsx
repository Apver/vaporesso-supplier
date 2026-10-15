import {LazyVideo} from './LazyVideo';

export function Xros6MiniSalesSection() {
  return (
    <div className="feature-grid">
      <div className="custom__container">
        <div className="feature-grid-inner">
          <div className="feature-card feature-card-1 to-top">
            <div className="feature-card-cnt">
              <h3>60s Coil Priming, Ready in 1 minute</h3>
            </div>
            <picture className="feature-card-bgpic">
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-Mob-03-1.webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-1.webp"
              />
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-1.webp"
                className=""
                alt=""
              />
            </picture>
          </div>
          <div
            className="feature-card feature-card-2 to-top"
            style={{transitionDelay: '0.1s'}}
          >
            <div className="feature-card-cnt">
              <h3>VENTURI Airflow, Smoother & Intenser</h3>
            </div>
            <picture className="feature-card-bgpic">
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-Mob-03-3.webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-2.webp"
              />
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-2.webp"
                className=""
                alt=""
              />
            </picture>
          </div>
          <div
            className="feature-card feature-card-3 to-top"
            style={{transitionDelay: '0.2s'}}
          >
            <div className="feature-card-cnt">
              <h3>1600mAh Long Lasting Battery</h3>
            </div>
            <picture className="feature-card-bgpic">
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-Mob-03-2.webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-3.webp"
              />
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-3.webp"
                className=""
                alt=""
              />
            </picture>
          </div>
          <div
            className="feature-card feature-card-4 to-top"
            style={{transitionDelay: '0.3s'}}
          >
            <div className="feature-card-cnt">
              <h3>Precisely Adjustable Airflow</h3>
              <div className="feature-airflow-container">
                <div className="feature-airflow-item ">
                  <picture className="toggle-icon">
                    <source
                      media="(max-width: 1023px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-5.webp"
                    />
                    <source
                      media="(min-width: 1024px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-5.webp"
                    />
                    <img
                      src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-5.webp"
                      className=""
                      alt=""
                    />
                  </picture>
                  <div className="feature-airflow-text">Loose Airflow</div>
                </div>
                <div className="feature-airflow-item">
                  <picture className="toggle-icon">
                    <source
                      media="(max-width: 1023px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-6.webp"
                    />
                    <source
                      media="(min-width: 1024px)"
                      srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-6.webp"
                    />
                    <img
                      src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-03-6.webp"
                      className=""
                      alt=""
                    />
                  </picture>
                  <div className="feature-airflow-text">Tight Airflow</div>
                </div>
              </div>
            </div>
            <LazyVideo>
              <video className="feature-card-bgpic" muted loop playsInline>
                <source
                  src="https://cdn.shopify.com/videos/c/o/v/599d9b282d6c4b3f9cddcabf7990d307.mp4"
                  type="video/mp4"
                  media="(min-width: 992px)"
                />
                <source
                  src="https://cdn.shopify.com/videos/c/o/v/5d96fcbfea1641ec889db4e658d42073.mp4"
                  type="video/mp4"
                  media="(max-width: 991px)"
                />
              </video>
            </LazyVideo>
          </div>
        </div>
      </div>
    </div>
  );
}
