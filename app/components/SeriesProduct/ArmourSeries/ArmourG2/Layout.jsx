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
  MediaShrinkRevealSection,
  TextCardSection,
  EndProduct,
} from '~/components/ui-v4';
import {PodCompatible} from '~/components/SeriesProduct/ArmourSeries/ArmourG2';

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
  const FlavorSectionData = {
    imgPc:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-02-1.webp',
    imgMob:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-02.webp',
    title: 'Full Flavor, Even At 20% Battery',
    description:
      'Pulse Mode on ARMOUR G2&GS2 delivers stable power output, keeping the flavor at its best from the first puff to the last',
    tips: '*The data is based on testing results from VAPORESSO LAB',
    chartImgMob:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-02.webp',
    chartImgPc:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-02-1.webp',
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
    title: 'Compatible With Multiple GTX Coils',
    podList: [
      {
        id: 'pod1',
        podName: 'ARMOUR G Series DTL Pod',
        podImgPc:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-1.webp',
        podImgMob:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-1.webp',
        coilList: [
          {
            id: 'coil1',
            data: [
              {
                id: 'data1',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.15Ω',
                coilTech: 'Mesh',
              },
              {
                id: 'data2',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.15Ω',
                coilTech: 'Dual Mesh',
              },
            ],
            watt: '60-75W',
          },
          {
            id: 'coil2',
            data: [
              {
                id: 'data1',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.2Ω',
                coilTech: 'Mesh',
              },
              {
                id: 'data2',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.2Ω',
                coilTech: 'Dual Mesh',
              },
            ],
            watt: '45-60W',
          },
          {
            id: 'coil3',
            data: [
              {
                id: 'data1',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.3Ω',
                coilTech: 'Mesh',
              },
              {
                id: 'data2',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.3Ω',
                coilTech: 'Dual Mesh',
              },
            ],
            watt: '32-45W',
          },
          {
            id: 'coil4',
            data: [
              {
                id: 'data1',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.4Ω',
                coilTech: 'Mesh',
              },
              {
                id: 'data2',
                coilTag: 'NEW!',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.4Ω',
                coilTech: 'Dual Mesh',
              },
            ],
            watt: '26-32W',
          },
          {
            id: 'coil5',
            data: [
              {
                id: 'data1',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.6Ω',
                coilTech: 'Mesh',
              },
            ],
            watt: '20-26W',
          },
        ],
      },
      {
        id: 'pod2',
        podName: 'ARMOUR G Series MTL Pod',
        podImgPc:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-1.webp',
        podImgMob:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-1.webp',
        coilList: [
          {
            id: 'coil1',
            data: [
              {
                id: 'data1',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.4Ω',
                coilTech: 'Mesh',
              },
              {
                id: 'data2',
                coilTag: 'NEW!',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.4Ω',
                coilTech: 'Dual Mesh',
              },
            ],
            watt: '26-32W',
          },
          {
            id: 'coil2',
            data: [
              {
                id: 'data1',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.6Ω',
                coilTech: 'Mesh',
              },
            ],
            watt: '20-26W',
          },
          {
            id: 'coil3',
            data: [
              {
                id: 'data1',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '0.8Ω',
                coilTech: 'Mesh',
              },
            ],
            watt: '12-16W',
          },
          {
            id: 'coil4',
            data: [
              {
                id: 'data1',
                coilImgPc:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilImgMob:
                  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_xr_max_2-mobile-15-group1-2.webp',
                coilOhm: '1.2Ω',
                coilTech: 'Mesh',
              },
            ],
            watt: '8-12W',
          },
        ],
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
      <MediaShrinkRevealSection
        className="product-armour-g2-flavor"
        {...FlavorSectionData}
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
        className="product-armour-g2-pod-compatible"
        {...PodCompatibleData}
      />
      <EndProduct
        className="product-armour-g2-end-product"
        data={EndProductData}
        onCheckSpecs={onCheckSpecs}
      />
      {children}
    </div>
  );
}
