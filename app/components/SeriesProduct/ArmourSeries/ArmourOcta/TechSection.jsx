import {useEffect, useState} from 'react';
import {CountUp} from 'countup.js';

const COUNT_OPTIONS = {
  useEasing: true,
  useGrouping: true,
  startVal: 0,
  enableScrollSpy: true,
};

const TechList = [
  {id: 'dual', title: 'GTI Dual Mesh'},
  {id: 'itank', title: 'AXON 3.0'},
  {id: 'axon', title: 'Itank T'},
];

export function TechSection() {
  const [activeTechId, setActiveTechId] = useState('dual');

  useEffect(() => {
    if (!document.getElementById('count3')) return undefined;
    const instance = new CountUp('count3', 30, COUNT_OPTIONS);
    if (!instance.error) instance.handleScroll();
    return () => instance.reset();
  }, []);

  return (
    <section className="product-armour-octa-tech apv_flex">
      <div className="tech_content apv_flex">
        <div className="tech_left apv_flex">
          <div className="tech_btns apv_flex">
            {TechList.map((item) => (
              <div
                key={item.id}
                className={`tech_btn_item${activeTechId === item.id ? ' active' : ''}`}
                data-id={item.id}
                onClick={() => setActiveTechId(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveTechId(item.id);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div
            className={`tech_desc dual_desc${activeTechId === 'dual' ? ' active' : ''}`}
          >
            <img
              className="tech_title_img"
              src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour_octa-12-1.svg"
              alt=""
            />
            <h3 className="apv_title">Strong Flavor To The Last</h3>
            <p className="apv_desc">
             The GTI coil features aerospace-grade CF cotton: its superior heat resistance prevents burnt hits during sustained high-power use, and it boasts a 30% longer lifespan than standard coils.
            </p>
            <p className="apv_tips">
             *The data is based on testing results from VAPORESSO LAB
            </p>
          </div>
          <div
            className={`tech_desc itank_desc${activeTechId === 'itank' ? ' active' : ''}`}
          >
            <img
              className="tech_title_img"
              src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour_octa-12-2.svg"
              alt=""
            />
            <h3 className="apv_title">
              Upgraded BOOST Mode Optimized for Richer Flavor
            </h3>
            <p className="apv_desc">
             Boost mode enhances the stability of continuous power output for consistent optimal flavor
            </p>
          </div>
          <div
            className={`tech_desc axon_desc${activeTechId === 'axon' ? ' active' : ''}`}
          >
            <img
              className="tech_title_img"
              src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour_octa-12-3.svg"
              alt=""
            />
            <h3 className="apv_title">
           Dual Widened Airflow Massive Clouds
            </h3>
            <p className="apv_desc">
           The iTank T features a dual widened airflow system: it delivers richer, sweeter flavor with an ultra-smooth draw, supports higher air intake volume, and operates significantly quieter with every puff.
            </p>
          </div>
        </div>
        <div className="tech_right">
          <div
            className={`dual_imgs right_imgs${activeTechId === 'dual' ? ' active' : ''}`}
          >
            <div className="right_img_top">
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-12-1-3x.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-12-4-2x.webp"
                />
                <img
                  className="right_img_top_bg"
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-12-4-2x.webp"
                  alt=""
                />
              </picture>
              <div className="right_top_number apv_flex">
                <span id="count3">30</span>
                <span className="right_top_percent">%</span>
                <img
                  className="right_top_up"
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-12-1-4.svg"
                  alt=""
                />
              </div>
              <p className="right_top_desc">Longer Lifespan</p>
            </div>
            <picture>
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-12-2-3x.webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-12-5-2x.webp"
              />
              <img
                className="right_img_bottom"
                src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-12-5-2x.webp"
                alt=""
              />
            </picture>
          </div>
          <div
            className={`itank_imgs right_imgs${activeTechId === 'itank' ? ' active' : ''}`}
          >
            <div className="right_img_top right_img_full">
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-12-3-3x.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-12-6-2x.webp"
                />
                <img
                  className="right_img_top_bg"
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-12-6-2x.webp"
                  alt=""
                />
              </picture>
            </div>
          </div>
          <div
            className={`axon_imgs right_imgs${activeTechId === 'axon' ? ' active' : ''}`}
          >
            <div className="right_img_top">
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-12-4-3x.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-12-7-2x.webp"
                />
                <img
                  className="right_img_top_bg"
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-12-7-2x.webp"
                  alt=""
                />
              </picture>
            </div>
            <picture>
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-12-5-3x.webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-12-8-2x.webp"
              />
              <img
                className="right_img_bottom"
                src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-12-8-2x.webp"
                alt=""
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
