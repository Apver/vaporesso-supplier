import {useEffect, useRef} from 'react';

const ASSET =
  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files';

const VAPORESSO_EASIER = ['Remove and Reinstall in 3 Easy Steps'];

const VAPORESSO_SAFER = [
  'Separated Terminals, Short-Circuit Protection',
  'Peak Current >15A, Perfectly balance the flavor and safe',
  'Impact-Resistant Hard Shell, Reduced Fire Risk',
];

const OTHER_DIFFICULT = [
  'Requires cutting wires, making reinstallation impossible.',
];

const OTHER_RISKIER = [
  'Cutting wires directly increases the risk.',
  'Peak Current: <12 A; prone to short circuits.',
  'Pouch cells are prone to catching fire upon impact.',
];

function SafeIcon() {
  return (
    <img
      src={`${ASSET}/xros6-mini-safe-icon.svg`}
      alt=""
      className="xros6-mini-why-choose__icon"
      width={22}
      height={24}
    />
  );
}

function DangerIcon() {
  return (
    <img
      src={`${ASSET}/xros6-mini-danger-icon.svg`}
      alt=""
      className="xros6-mini-why-choose__icon_danger"
      width={20}
      height={24}
    />
  );
}

/**
 * XROS 6 MINI R — WHY CHOOSE US?
 * 动画对齐 dojo Compatibility（blast10k-fresh）：从中间向两边 translateX 滑开
 */
export function Xros6MiniWhyChooseUsSection() {
  const bookRef = useRef(null);

  useEffect(() => {
    const book = bookRef.current;
    if (!book || typeof window === 'undefined') return undefined;

    // H5 不需要滑开动画
    const mq = window.matchMedia('(max-width: 1023px)');
    if (mq.matches) {
      book.classList.add('appear');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          requestAnimationFrame(() => {
            book.classList.add('appear');
          });
          obs.unobserve(entry.target);
        });
      },
      {root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.25},
    );

    observer.observe(book);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="xros6-mini-why-choose">
      <div className="custom__container1">
        <h2 className="xros6-mini-why-choose__title to-top">WHY CHOOSE US?</h2>

        <div className="xros6-mini-why-choose__stage">
          <div
            className="xros6-mini-why-choose__book why-choose-split-reveal"
            ref={bookRef}
          >
            {/* 左卡 — VAPORESSO */}
            <div className="xros6-mini-why-choose__page xros6-mini-why-choose__page--left">
              <div className="xros6-mini-why-choose__head xros6-mini-why-choose__head--vaporesso">
                VAPORESSO
              </div>

              <div className="xros6-mini-why-choose__body xros6-mini-why-choose__body--vaporesso">
                <div className="xros6-mini-why-choose__block">
                  <div className="xros6-mini-why-choose__label">EASIER</div>
                  <ul className="xros6-mini-why-choose__list">
                    {VAPORESSO_EASIER.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="xros6-mini-why-choose__block">
                  <div className="xros6-mini-why-choose__label">
                    <span>SAFER</span>
                    <SafeIcon />
                  </div>
                  <ul className="xros6-mini-why-choose__list">
                    {VAPORESSO_SAFER.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 右卡 — OTHER */}
            <div className="xros6-mini-why-choose__page xros6-mini-why-choose__page--right">
              <div className="xros6-mini-why-choose__head xros6-mini-why-choose__head--other">
                OTHER
              </div>

              <div className="xros6-mini-why-choose__body xros6-mini-why-choose__body--other">
                <div className="xros6-mini-why-choose__block">
                  <div className="xros6-mini-why-choose__label">MORE DIFFICULT</div>
                  <ul className="xros6-mini-why-choose__list">
                    {OTHER_DIFFICULT.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="xros6-mini-why-choose__block">
                  <div className="xros6-mini-why-choose__label">
                    <span>RISKIER</span>
                    <DangerIcon />
                  </div>
                  <ul className="xros6-mini-why-choose__list">
                    {OTHER_RISKIER.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
