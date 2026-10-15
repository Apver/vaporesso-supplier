import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
      className="xros6-mini-why-choose__icon"
      width={20}
      height={24}
    />
  );
}

/**
 * XROS 6 MINI R — WHY CHOOSE US?
 * 静态严格对齐 UI：双卡 + 20px 间距 + 标题下划线 + 图标在标题后
 * 动效：合上的书本 → 左右从中间向两边翻开
 */
export function Xros6MiniWhyChooseUsSection() {
  const bookRef = useRef(null);

  useEffect(() => {
    const book = bookRef.current;
    if (!book) return undefined;

    const left = book.querySelector('.xros6-mini-why-choose__page--left');
    const right = book.querySelector('.xros6-mini-why-choose__page--right');
    if (!left || !right) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      book.classList.remove('is-open');

      gsap.set(left, {
        transformOrigin: 'right center',
        rotateY: 88,
        zIndex: 2,
      });
      gsap.set(right, {
        transformOrigin: 'left center',
        rotateY: -88,
        zIndex: 2,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: book,
          start: 'top 72%',
          once: true,
        },
        onComplete: () => {
          book.classList.add('is-open');
          gsap.set([left, right], {clearProps: 'transform'});
        },
      });

      tl.to(
        left,
        {rotateY: 0, duration: 1.25, ease: 'power2.inOut'},
        0,
      ).to(
        right,
        {rotateY: 0, duration: 1.25, ease: 'power2.inOut'},
        0,
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([left, right], {clearProps: 'all'});
        book.classList.remove('is-open');
      };
    });

    mm.add('(max-width: 1023px)', () => {
      gsap.set([left, right], {clearProps: 'all'});
      book.classList.add('is-open');
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="xros6-mini-why-choose">
      <div className="custom__container1">
        <h2 className="xros6-mini-why-choose__title to-top">WHY CHOOSE US?</h2>

        <div className="xros6-mini-why-choose__stage">
          <div className="xros6-mini-why-choose__book" ref={bookRef}>
            {/* 左卡 — VAPORESSO */}
            <div className="xros6-mini-why-choose__page xros6-mini-why-choose__page--left">
              <div className="xros6-mini-why-choose__head xros6-mini-why-choose__head--vaporesso">
                VAPORESSO
              </div>

              <div className="xros6-mini-why-choose__block xros6-mini-why-choose__block--vaporesso">
                <div className="xros6-mini-why-choose__label">EASIER</div>
                <ul className="xros6-mini-why-choose__list">
                  {VAPORESSO_EASIER.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="xros6-mini-why-choose__block xros6-mini-why-choose__block--vaporesso">
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

            {/* 右卡 — OTHER */}
            <div className="xros6-mini-why-choose__page xros6-mini-why-choose__page--right">
              <div className="xros6-mini-why-choose__head xros6-mini-why-choose__head--other">
                OTHER
              </div>

              <div className="xros6-mini-why-choose__block xros6-mini-why-choose__block--other">
                <div className="xros6-mini-why-choose__label">MORE DIFFICULT</div>
                <ul className="xros6-mini-why-choose__list">
                  {OTHER_DIFFICULT.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="xros6-mini-why-choose__block xros6-mini-why-choose__block--other">
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
    </section>
  );
}
