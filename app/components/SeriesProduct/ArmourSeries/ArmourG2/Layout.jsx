/**
 * Luxe Q3 Layout Component
 */
import {useEffect, useRef} from 'react';
import {initToTopAnimate} from '~/utils/to_top_animate';
import {
  KvSectionV4,
  BriefSectionV4,
  MediaOverlaySection,
  TextMediaSection,
  TextCardSection,
  PodCompatible,
  EndProduct,
} from '~/components/ui-v4';

export function ArmourG2Layout({children, onCheckSpecs}) {
  const layoutRef = useRef(null);

  useEffect(() => {
    const root = layoutRef.current ?? document;
    const cleanup = initToTopAnimate({
      root,
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.4,
    });
    return cleanup;
  }, []);
  const KvSectionData = {
    name: 'ARMOUR G2&GS2',
    slogan: 'A Truly Compact Pod Mod For All',
    mobBanner:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
    pcBanner:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-01-1.webp',
  };
  const BriefSectionData = {
    desc: 'ARMOUR G2 & GS2 combine a compact design with a 3400mAh battery and 3A fast charging. Enjoy both MTL and DTL vaping with rich dual-mesh flavor. Dual safety locks and advanced leak protection enhance safety, while the clean, elegant dynamic UI provides an intuitive user experience.',
    pcImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-02-1.webp',
    mobImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-02.webp',
  };
  const CompactSectionData = {
    title: 'A Truly Compact Pod Mod',
    description:
      'High-density cells deliver 67% longer cycle life (500 vs. 300 cycles), reducing battery drain and charging frequency.',
    tips: '*The data is based on testing results from VAPORESSO LAB',
    imgBgPc:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
    imgBgMob:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
    dataList: [
      {
        id: 'data1',
        num: '48',
        unit: 'H',
        description: 'Standby For RDL',
      },
      {
        id: 'data2',
        num: '67',
        unit: '%',
        description: 'Longer Cycle Life',
      },
    ],
  };
  const ChargingSectionData = {
    title: '3A Fast Charging',
    description:
      'The ARMOUR G2 supports 5V/3A fast charging, fully recharging in just 1 hour.',
    tips: '*The data is based on testing results from VAPORESSO LAB',
    imgBgPc:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
    imgBgMob:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
  };
  const SssSectionData = {
    title: 'Double Top | Triple S 2.0 | Quadra Leakproof',
    description:
      'ARMOUR G2&GS2 feature our proprietary SSS rigorous leakproof technology, designed for top-airflow and top-filling structures to eliminate e-liquid leakage risks',
    tips: '*The data is based on testing results from VAPORESSO LAB',
    isTextOnCard: true,
    cardList: [
      {
        id: 'card1',
        title: 'Top Airflow',
        imgPc:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-01-1.webp',
        imgMob:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
      },
      {
        id: 'card2',
        title: 'Top Filling',
        imgPc:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-01-1.webp',
        imgMob:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
      },
      {
        id: 'card3',
        title: 'SSS 2.0',
        imgPc:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-01-1.webp',
        imgMob:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
      },
    ],
  };
  const LockSectionData = {
    title: 'Dual Safety Lock | No Accidental Firing',
    description:
      'The dual-safety mechanism prevents accidental pocket firing. Beyond standard button locking, users can also enable a 3-minute auto-lock.',
    cardList: [
      {
        id: 'card1',
        title: '3-Minute Auto-Lock',
        imgPc:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-01-1.webp',
        imgMob:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
      },
      {
        id: 'card2',
        title: 'Button Lock',
        imgPc:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-01-1.webp',
        imgMob:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
      },
    ],
  };
  const UISectionData = {
    title: '3+3 UI Dynamic Themes',
    description: 'Come Alive As You Vape.',
    cardList: [
      {
        id: 'card1',
        title: 'G2',
        imgPc:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-01-1.webp',
        imgMob:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
        dataList: [{text: 'Classic'}, {text: 'Dream'}, {text: 'Motor'}],
      },
      {
        id: 'card2',
        title: 'GS2',
        imgPc:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-01-1.webp',
        imgMob:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
        dataList: [{text: 'Classic'}, {text: 'Meteor'}, {text: 'Engine'}],
      },
    ],
  };
  const DualMeshSectionData = {
    title: 'True-To-Life Flavor, Richer Taste',
    description:
      'The upgraded dual-mesh coils in the ARMOUR G2&GS2 works seamlessly with both nic salt and freebase e-liquids, unlocking rich, true-to-life flavor that tastes exactly like the real juice from the first puff.',
    imgBgPc:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
    imgBgMob:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-1.webp',
    dataList: [
      {
        id: 'data1',
        num: '50',
        unit: '%',
        description: 'Longer Lifespan',
      },
      {
        id: 'data2',
        num: '32',
        unit: '%',
        description: 'More Intense Flavor',
      },
    ],
  };
  const PodCompatibleData = {
    title: 'All LUXE Q Pods Compatible',
    description: 'Perfect for nic salts and freebase.',
    podList: [
      {
        id: 'pod1',
        version: '3ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q3-10_1.webp',
        ohm: '0.6Ω',
        type: 'Mesh Pod',
      },
      {
        id: 'pod2',
        version: '3ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q3-10_2.webp',
        ohm: '0.8Ω',
        type: 'Mesh Pod',
      },
      {
        id: 'pod3',
        version: '3ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q3-10_3.webp',
        ohm: '1.0Ω',
        type: 'Mesh Pod',
      },
      {
        id: 'pod4',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q3-10_4.webp',
        ohm: '0.6Ω',
        type: 'Mesh Pod',
      },
      {
        id: 'pod5',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q3-10_5.webp',
        ohm: '0.8Ω',
        type: 'Mesh Pod',
      },
      {
        id: 'pod6',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q3-10_6.webp',
        ohm: '1.0Ω',
        type: 'Mesh Pod',
      },
      {
        id: 'pod7',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q3-10_7.webp',
        ohm: '1.2Ω',
        type: 'Mesh Pod',
      },
    ],
  };

  const EndProductData = {
    title: 'LUXE ',
    subtitle: 'Q3',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q3-11_1.webp',
    salesList: [
      {id: 'sales1', text: '1450 mAh Battery'},
      {id: 'sales2', text: 'Compact Design'},
      {id: 'sales3', text: 'Premium Leather'},
      {id: 'sales4', text: 'AXON CHIP'},
      {id: 'sales5', text: 'COREX SMOOTH'},
    ],
  };

  return (
    <div ref={layoutRef}>
      <KvSectionV4 className="product-armour-g2-kv" data={KvSectionData} />
      <BriefSectionV4
        className="product-armour-g2-brief"
        data={BriefSectionData}
      />
      <MediaOverlaySection
        className="product-armour-g2-compact"
        {...CompactSectionData}
      />
      <TextMediaSection
        className="product-armour-g2-charging"
        {...ChargingSectionData}
      />
      <TextCardSection className="product-armour-g2-sss" {...SssSectionData} />
      <TextCardSection
        className="product-armour-g2-lock"
        {...LockSectionData}
      />
      <TextCardSection className="product-armour-g2-ui" {...UISectionData} />
      <MediaOverlaySection
        className="product-armour-g2-dual-mesh"
        {...DualMeshSectionData}
      />
      <PodCompatible
        className="product-luxe-q3-pod-compatible"
        {...PodCompatibleData}
      />
      <EndProduct
        className="product-luxe-q3-end-product"
        data={EndProductData}
        onCheckSpecs={onCheckSpecs}
      />
      {children}
    </div>
  );
}
