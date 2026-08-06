/**
 * Xros5Mini Layout Component
 * Layout component for XROS 5 Mini product pages
 */
import {useEffect, useRef} from 'react';
import {initScrollAppearAnimate} from '~/utils/scroll_appear_animate';
import {
  SalesSection,
  VersionSection,
  ReplaceableSection,
  DualMesh,
  PowerSection,
  BatterySection,
  ModeSection,
  PodSection,
  OperationSection,
} from '~/components/SeriesProduct/PrixKit/Prix';
import {KvSectionV4, BriefSectionV4, EndProduct} from '~/components/ui-v4';
export function PrixLayout({children, onCheckSpecs}) {
  const rootRef = useRef(null);
  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = initScrollAppearAnimate({root: rootRef.current});
    return cleanup;
  }, []);
  const KvSectionData = {
    slogan: 'Beyond Vape, Panel Your Style',
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
    desc: 'A refined MTL device featuring a cigarette-like filter tip, interchangeable panels, NFC interactive functionality, and lasting performance with a 2600mAh battery and 5.5ml pod capacity.',
    pcImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-02-1.webp',
    mobImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-02.webp',
  };
  const ModeData = {
    title: 'Easy or Pro, \nSetup As You Like',
    list: [
      {
        id: 'pro',
        title: 'PRO',
        desc_title: 'Landscape, ',
        description: 'Precisely adjust wattage in 0.5W steps.',
        img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-09-1.webp?v=1785997420',
      },
      {
        id: 'easy',
        title: 'EASY',
        desc_title: 'Portrait, ',
        description:
          'Switch between IMPACT and PWR, with a 4W output difference.',
        img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-09-2.webp?v=1785997413',
      },
    ],
  };
  const ChoiceData = {
    isChoice: true,
    className: 'product-prix-choice',
    title: 'Dual Activation, Your Choice',
    description: 'Auto-Draw / Button, Use Either Or Both, Mode Menu Select',
    list: [
      {
        id: 'auto',
        title: 'AUTO',
        description: 'Auto-draw mode',
        img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-11-1.jpg',
      },
      {
        id: 'btn',
        title: 'BTN',
        description: 'Button mode',
        img: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-11-2.webp',
      },
    ],
  };
  const EndProductData = {
    title: 'PRIX',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-13.webp',
    salesList: [
      {id: 'sales1', text: '2600mAh Mega Battery, Mega Power'},
      {id: 'sales2', text: 'Dual Mesh Coil for Long-Lasting Flavor'},
      {id: 'sales3', text: '5.5ml Large Pod Capacity'},
      {id: 'sales4', text: 'Replaceable Panels, Style Your Way'},
      {id: 'sales5', text: 'NFC Touch, Magic Unleashed'},
      {id: 'sales6', text: 'Filter Tip for a Cigarette-Like Feel'},
    ],
  };
  return (
    <div className="product-prix" ref={rootRef}>
      <KvSectionV4
        className="product-prix-kv"
        data={KvSectionData}
        textChildren={KvTextChildren}
      />
      <BriefSectionV4 className="product-prix-brief" data={BriefSectionData} />
      <SalesSection />
      <VersionSection />
      <ReplaceableSection />
      <DualMesh />
      <PowerSection />
      <BatterySection />
      <ModeSection {...ModeData} />
      <PodSection />
      <ModeSection {...ChoiceData} />
      <OperationSection />
      <EndProduct
        className="product-prix-end-product"
        data={EndProductData}
        onCheckSpecs={onCheckSpecs}
      />
      {children}
    </div>
  );
}
