/**
 * Xros5Mini Layout Component
 * Layout component for XROS 5 Mini product pages
 */
import {useEffect, useRef} from 'react';
import {initScrollAppearAnimate} from '~/utils/scroll_appear_animate';
import {
  KvSectionV4,
  BriefSectionV4,
  PodCompatible,
  EndProduct,
} from '~/components/ui-v4';
export function ArmourOctaLayout({children, onCheckSpecs}) {
  const rootRef = useRef(null);
  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = initScrollAppearAnimate({root: rootRef.current});
    return cleanup;
  }, []);
  const KvSectionData = {
    mobBanner:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
    pcBanner:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-01-1.webp',
  };
  const KvTextChildren = (
    <picture>
      <source
        media="(min-width: 1024px)"
        srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-01-2.webp"
      />
      <img
        src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-2.webp"
        alt="Prix"
        className="product-prix-kv-title"
      />
    </picture>
  );
  const BriefSectionData = {
    title: 'Swap Panels, Premium Style',
    desc: "Hey dude, how are you doing?\nWe've shared highs and got through lows side by side. Vaporesso has been there for all your key moments, always protecting you and sticking around.\nThe Armour series is your reliable old pal: we never cut corners on making solid vape mods, and never stray from our original mission. Just like you, we're still on the road to getting better, chasing a brighter future.\nCheers to us, to all our shared memories, and to what's ahead.",
    pcImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-02-1.webp',
    mobImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-02.webp',
  };

  const PodCompatibleData = {
    title: 'Compatible With Multiple GTi Coils',
    description:
      'With GTi 0.2Ω DUAL MESH and 0.4Ω DUAL MESH coil included, the iTank T is also fully compatible with all the GTi coil platfrom',
    podList: [
      {
        id: 'pod1',
        version: '3ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-9_1.webp',
        ohm: '0.6Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod2',
        version: '3ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-9_2.webp',
        ohm: '0.8Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod3',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-9_3.webp',
        ohm: '0.6Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod4',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-9_4.webp',
        ohm: '0.8Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod5',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-9_5.webp',
        ohm: '1.0Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod6',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-9_6.webp',
        ohm: '1.2Ω',
        type: 'Top Filling',
      },
    ],
  };
  const EndProductData = {
    title: 'ARRMOUR Octa',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-13.webp',
    salesList: [
      {id: 'sales1', text: 'WATER-PROOF'},
      {id: 'sales2', text: 'DUST-PROOF'},
      {id: 'sales3', text: 'WATERJET-PROOF'},
      {id: 'sales4', text: 'SHOCK-PROOF'},
      {id: 'sales5', text: 'OVERTIME 2.0'},
      {id: 'sales6', text: 'FTPU Protection'},
      {id: 'sales7', text: 'Voltage Surge Protection'},
      {id: 'sales8', text: 'Charging Overheat Protection'},
    ],
  };
  return (
    <div className="product-armour-octa" ref={rootRef}>
      <KvSectionV4
        className="product-armour-octa-kv"
        data={KvSectionData}
        textChildren={KvTextChildren}
      />
      <BriefSectionV4
        className="product-armour-octa-brief"
        data={BriefSectionData}
      />
      <PodCompatible
        className="product-armour-octa-pod-compatible"
        {...PodCompatibleData}
      />
      <EndProduct
        className="product-armour-octa-end-product"
        data={EndProductData}
        onCheckSpecs={onCheckSpecs}
      />
      {children}
    </div>
  );
}
