import {useEffect, useState} from 'react';
import {CountUp} from 'countup.js';

const COUNT_OPTIONS = {
  useEasing: true,
  useGrouping: true,
  startVal: 0,
  enableScrollSpy: true,
};

const TechList = [
  {id: 'dual', title: 'Dual Mesh'},
  {id: 'itank', title: 'iTank T'},
  {id: 'axon', title: 'AXON CHIP'},
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
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-1-1-DUAL-MESH.svg"
              alt=""
            />
            <h3 className="apv_title">Strong Flavor That Lasts Longer</h3>
            <p className="apv_desc">
              The GTi coil debuts with Dual Mesh&apos;s dual-layer mesh
              structure, effectively extending coil lifespan by 30% to provide a
              longer-lasting and more consistent flavor experience. Its design
              ensures more even heating of e-liquid and reduces leakage, further
              enhancing the presentation of flavor and aroma.
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
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-2-1-iTank-T.svg"
              alt=""
            />
            <h3 className="apv_title">
              Widened Top Airflow, Bigger Clouds Glow
            </h3>
            <p className="apv_desc">
              The iTank T features an enhanced wide airflow system that
              maximizes air intake with whisper-quiet operation, delivering an
              exceptionally smooth and comfortable vaping experience. The scale
              allows customized airflow adjustment for you.
            </p>
          </div>
          <div
            className={`tech_desc axon_desc${activeTechId === 'axon' ? ' active' : ''}`}
          >
            <img
              className="tech_title_img"
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-3-1-AXON.svg"
              alt=""
            />
            <h3 className="apv_title">
              Boost Mode, <br />
              Enjoy In every puff
            </h3>
            <p className="apv_desc">
              Boost mode offers 40% more stability than Eco mode and 25% more
              than Pulse mode, enhancing first-hit flavor and increasing vapor
              output. Additionally, it also features three modes: Pulse Mode,
              Eco Mode, and TC Mode.
            </p>
            <p className="apv_tips">
              *The data is based on testing results from VAPORESSO
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
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-Mob-12-1-2.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-1-2.webp"
                />
                <img
                  className="right_img_top_bg"
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-1-2.webp"
                  alt=""
                />
              </picture>
              <div className="right_top_number apv_flex">
                <span id="count3">30</span>
                <span className="right_top_percent">%</span>
                <img
                  className="right_top_up"
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-1-4.svg"
                  alt=""
                />
              </div>
              <p className="right_top_desc">Longer Lifespan</p>
            </div>
            <picture>
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-Mob-12-1-3.webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-1-3.webp"
              />
              <img
                className="right_img_bottom"
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-1-3.webp"
                alt=""
              />
            </picture>
          </div>
          <div
            className={`itank_imgs right_imgs${activeTechId === 'itank' ? ' active' : ''}`}
          >
            <div className="right_img_top">
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-Mob-12-2-2.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-2-2.webp"
                />
                <img
                  className="right_img_top_bg"
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-2-2.webp"
                  alt=""
                />
              </picture>
            </div>
            <picture>
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-Mob-12-2-3.webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-2-3.webp"
              />
              <img
                className="right_img_bottom"
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-2-3.webp"
                alt=""
              />
            </picture>
          </div>
          <div
            className={`axon_imgs right_imgs${activeTechId === 'axon' ? ' active' : ''}`}
          >
            <div className="right_img_top">
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-Mob-12-3-2.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-3-2.webp"
                />
                <img
                  className="right_img_top_bg"
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-3-2.webp"
                  alt=""
                />
              </picture>
            </div>
            <picture>
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-Mob-12-3-3.svg"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-3-3.svg"
              />
              <img
                className="right_img_bottom"
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-12-3-3.svg"
                alt=""
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
