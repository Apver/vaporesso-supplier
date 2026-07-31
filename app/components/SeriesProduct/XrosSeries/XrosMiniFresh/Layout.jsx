/**
 * Xros5Mini Layout Component
 * Layout component for XROS 5 Mini product pages
 */
import {useEffect, useRef} from 'react';
import {initScrollAppearAnimate} from '~/utils/scroll_appear_animate';
import {
  SalesSection,
  CorexSection,
  AntiLeaking,
  TrendySection,
  StepsSection,
  SizeSection,
} from '~/components/SeriesProduct/XrosSeries/XrosMiniRetro';
import {
  KvSectionV4,
  BriefSectionV4,
  PodCompatible,
  EndProduct,
} from '~/components/ui-v4';
export function XrosMiniFreshLayout({children, onCheckSpecs}) {
  const rootRef = useRef(null);
  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = initScrollAppearAnimate({root: rootRef.current});
    return cleanup;
  }, []);
  const KvSectionData = {
    name: 'XROS MINI',
    slogan: 'CROSS THE EXPECTATION',
    mobBanner:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_1_1.webp',
    pcBanner:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-1_1.webp',
  };
  const BriefSectionData = {
    title: 'XROS MINI is an 18W MTL device for beginners, featuring COREX 3.0',
    desc: 'XROS MINI is an 18W MTL device for beginners, featuring COREX 3.0 technology for consistent performance and richer flavor, with upgraded SSS 2.0 tech enhancing sealing for a cleaner and more reliable experience; with top filling, auto-draw activation, and a 1000mAh battery, it ensures effortless daily use and is compatible with most XROS pods (excluding 0.4Ω).',
    pcImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-2_1.webp',
    mobImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_2_1.webp',
  };
  const SalesListData = [
    {
      title: 'COREX 3.0 - Delicate Flavor. Smooth Savor',
      pcImageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-3_1.webp',
      mobImageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_03_2.webp',
    },
    {
      title: 'SSS Tech - \nAnti Leak, Anti Mess',
      pcImageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-3_2.webp',
      mobImageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_03_3.webp',
    },
    {
      title: '1000mAh Battery',
      pcImageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-3_3.webp',
      mobImageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_03_1.webp',
    },
    {
      title: 'Top Fill Design',
      pcImageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-3_4.webp',
      mobImageUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_03_4.webp',
    },
  ];

  const CorexSectionData = {
    title: 'Delicate Flavor, Smooth Savor',
    description:
      'XROS MINI is powered by COREX 3.0 technology, featuring an advanced Hive Mesh structure, optimized chimney airflow design, nano-microfiber processing, and aerospace-grade heat-resistant materials. This system ensures consistent heating, delivering fuller aroma, refined flavor clarity, and a more stable vaping experience.',
  };
  const AntiLeakingData = {
    title: 'Anti Leak,\nAnti Mess',
    description:
      'With enhanced SSS Leak-Resistant Technology 2.0, a thermal leak-control design and reinforced structural sealing work together to effectively reduce leakage and mess during everyday use or on the go.',
  };
  const TrendySectionData = {
    title: 'CROSS Into Trendy',
    description:
      'With 8 trendy colors, it’s easy to find one that fits your mood and express your style your way.',
    colorsList: [
      {
        id: 'color1',
        name: 'BABY PURPLE',
        pcImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-6_2.webp',
        mobImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_06_2.webp',
      },
      {
        id: 'color2',
        name: 'BABY PINK',
        pcImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-6_3.webp',
        mobImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_06_3.webp',
      },
      {
        id: 'color3',
        name: 'SPRING GREEN',
        pcImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-6_4.webp',
        mobImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_06_4.webp',
      },
      {
        id: 'color4',
        name: 'BABY BLUE',
        pcImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-6_5.webp',
        mobImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_06_5.webp',
      },
      {
        id: 'color5',
        name: 'DARK INDIGO',
        pcImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-6_6.webp',
        mobImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_06_6.webp',
      },
      {
        id: 'color6',
        name: 'MATTER SILVER',
        pcImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-6_7.webp',
        mobImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_06_7.webp',
      },
      {
        id: 'color7',
        name: 'SPACE GRAY',
        pcImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-6_8.webp',
        mobImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_06_8.webp',
      },
      {
        id: 'color8',
        name: 'SPACE BLACK',
        pcImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-6_9.webp',
        mobImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_06_9.webp',
      },
    ],
  };
  const StepsData = {
    title: 'Simple steps, Pure fun',
    stepsList: [
      {
        id: 'step1',
        title: 'Top-Fill Design',
        description: 'Easy to use, perfect for beginners.',
        pcImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-7_1.webp',
        mobImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_7_1.webp',
      },
      {
        id: 'step2',
        title: 'Instant Auto Draw',
        description: 'It is always ready to vape and quick to start.',
        pcImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-7_2.webp',
        mobImageUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_7_2.webp',
      },
    ],
  };
  const SizeSectionData = {
    title: 'Pocket Size Steady Power',
    description:
      'Equipped with a 1000mAh battery, it rarely needs recharging. The LED light clearly shows the remaining power, making it easy to check anytime. It also supports 5V1A charging, quickly reaching full power for a convenient and reliable experience.',
    pcImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-8_1.webp',
    mobImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob_8_1.webp',
  };
  const PodCompatibleData = {
    title: 'XROS Series Widely Compatible',
    description:
      'XROS MINI is compatible with the most XROS pod series (except 0.4Ω pods). All XROS PODS have all been upgrade to COREX 3.0 which provides best flavor when SSS 2.0 Tech prevents from leakage.',
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
    title: 'XROS',
    subtitle: 'MINI',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-10_1.webp',
    salesList: [
      {id: 'sales3', text: 'Top Fill Design'},
      {id: 'sales4', text: '1000mAh Battery'},
      {id: 'sales2', text: 'SSS Tech - Anti Leak, Anti Mess'},
      {id: 'sales1', text: 'COREX 3.0 - Delicate Flavor. Smooth Savor'},
    ],
  };
  return (
    <div className="xros-mini-retro" ref={rootRef}>
      <KvSectionV4 className="xros-mini-retro-kv" data={KvSectionData} />
      <BriefSectionV4
        className="xros-mini-retro-brief"
        data={BriefSectionData}
      />
      <SalesSection salesList={SalesListData} />
      <CorexSection {...CorexSectionData} />
      <AntiLeaking {...AntiLeakingData} />
      <TrendySection {...TrendySectionData} />
      <StepsSection {...StepsData} />
      <SizeSection {...SizeSectionData} />
      <PodCompatible
        className="xros-mini-retro-pod-compatible"
        {...PodCompatibleData}
      />
      <EndProduct
        className="xros-mini-retro-end-product"
        data={EndProductData}
        onCheckSpecs={onCheckSpecs}
      />
      {children}
    </div>
  );
}
