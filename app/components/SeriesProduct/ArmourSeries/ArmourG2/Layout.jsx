/**
 * ARMOUR G2 & GS2 Layout Component
 * 区块顺序与 Figma 设计稿一致；各区块数据在本文件内联定义，视觉实现在各 Section 组件。
 */
import {useEffect, useRef} from 'react';
import {initToTopAnimate} from '~/utils/to_top_animate';
import {
  KvSection,
  VideoSection,
  FeatureGridSection,
  BatterySection,
  ChargingSection,
  FlavorSection,
  DualMeshSection,
  ModeSection,
  LeakproofSection,
  SafetyLockSection,
  GuardSection,
  ThemeSection,
  CompareSection,
  PodCompatible,
  EndSection,
} from '~/components/SeriesProduct/ArmourSeries/ArmourG2';

/**
 * Shopify Files CDN 前缀，本页素材统一以 armour-g2- 开头。
 * 前缀对应当前店铺 vaporesso-test.myshopify.com；页面里其余 `0703/9873/8521`
 * 的链接是从生产站复制页面时带过来的遗留素材，不是本页的。
 */
const CDN = 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files';

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
    bannerPc: `${CDN}/armour-g2-01-1-2x.webp`,
    bannerMob: `${CDN}/armour-g2-mob-01-1-3x.webp`,
  };
  const VideoSectionData = {
    description:
      'ARMOUR G2 & GS2 combine a compact design with a 3400mAh battery and 3A fast charging. Enjoy both MTL and DTL vaping with rich dual-mesh flavor. Dual safety locks and advanced leak protection enhance safety, while the clean, elegant dynamic UI provides an intuitive user experience.',
    imgPc: `${CDN}/armour-g2-02-1-2x.webp`,
    imgMob: `${CDN}/armour-g2-mob-02-1-3x.webp`,
    btnText: 'Watch the video',
    // TODO 视频按钮暂时隐藏：btnLink 为空时不渲染，拿到 YouTube 链接后填在这里即可显示
    btnLink: '',
  };
  /* 素材编号 PC / MOB 同号同卡：1=MTL 2=GTX 3=BATT 4·5=Safety 6=Airflow 7=Charge */
  const FeatureGridData = {
    mtl: {
      title: 'MTL & DTL\nCompatible',
      imgPc: `${CDN}/armour-g2-03-1-2x.webp`,
      imgMob: `${CDN}/armour-g2-mob-03-1-3x.webp`,
      flowLeft: `${CDN}/armour-g2-03-flow-l.svg`,
      flowRight: `${CDN}/armour-g2-03-flow-r.svg`,
    },
    gtx: {
      title: 'GTX Dual Mesh',
      imgPc: `${CDN}/armour-g2-03-2-2x.webp`,
      imgMob: `${CDN}/armour-g2-mob-03-2-3x.webp`,
    },
    batt: {
      title: '3400mAh MEGA BATT',
      // 设计稿 PC 一行、移动端两行
      titleMob: '3400mAh MEGA\nBATT',
      imgPc: `${CDN}/armour-g2-03-3-2x.webp`,
      imgMob: `${CDN}/armour-g2-mob-03-3-3x.webp`,
    },
    safety: {
      title: 'Dual Safety',
      subtitle: 'Auto Lock + Button',
      images: [
        {
          id: 'lock1',
          imgPc: `${CDN}/armour-g2-03-4-2x.webp`,
          imgMob: `${CDN}/armour-g2-mob-03-4-3x.webp`,
        },
        {
          id: 'lock2',
          imgPc: `${CDN}/armour-g2-03-5-2x.webp`,
          imgMob: `${CDN}/armour-g2-mob-03-5-3x.webp`,
        },
      ],
    },
    airflow: {
      title: 'Upgraded Top Airflow\n& Top Filling',
      // 设计稿两端断行点不同
      titleMob: 'Upgraded Top\nAirflow & Top Filling',
      imgPc: `${CDN}/armour-g2-03-6-2x.webp`,
      imgMob: `${CDN}/armour-g2-mob-03-6-3x.webp`,
    },
    charge: {
      title: '3A Fast Charging',
      imgPc: `${CDN}/armour-g2-03-7-2x.webp`,
      imgMob: `${CDN}/armour-g2-mob-03-7-3x.webp`,
    },
  };
  const BatterySectionData = {
    title: 'A Truly Compact Pod Mod',
    description:
      'High-density cells deliver 67% longer cycle life (500 vs. 300 cycles), reducing battery drain and charging frequency.',
    tips: '*The data is based on testing results from VAPORESSO LAB',
    imgPc: `${CDN}/armour-g2-04-1-2x.webp`,
    imgMob: `${CDN}/armour-g2-mob-04-1-3x.webp`,
    highlights: [
      {id: 'standby', num: '48', unit: 'H', label: 'Standby For RDL'},
      {id: 'cycle', num: '67', unit: '%', label: 'Longer Cycle Life'},
    ],
  };
  const ChargingSectionData = {
    title: '3A Fast Charging',
    description:
      'The ARMOUR G2 supports 5V/3A fast charging, fully recharging in just 1 hour.',
    tips: '*The data is based on testing results from VAPORESSO LAB',
    imgPc: `${CDN}/armour-g2-05-1-2x.webp`,
    imgMob: `${CDN}/armour-g2-mob-05-1-3x.webp`,
  };
  const FlavorSectionData = {
    title: 'Full Flavor, Even At 20% Battery',
    description:
      'Pulse Mode on ARMOUR G2&GS2 delivers stable power output, keeping the flavor at its best from the first puff to the last',
    tips: '*The data is based on testing results from VAPORESSO LAB',
    imgPc: `${CDN}/armour-g2-06-1-2x.webp`,
    imgMob: `${CDN}/armour-g2-mob-06-1-3x.webp`,
    // 图表用矢量 SVG：PC 白底、移动端黑底，是两版不同的设计（比例也不同）
    chartPc: `${CDN}/armour-g2-06-graph.svg`,
    chartMob: `${CDN}/armour-g2-mob-06-graph.svg`,
  };
  const LeakproofSectionData = {
    title: 'Double Top |\nTriple S 2.0 | Quadra Leakproof',
    description:
      'ARMOUR G2 and GS2 feature Quadra Leakproof protection, powered by our proprietary SSS e-liquid-lock technology. The top-airflow and top-filling designs help eliminate the risk of e-liquid leakage.',
    tips: '*The data is based on testing results from VAPORESSO LAB',
    cards: [
      {
        id: 'airflow',
        label: 'Top Airflow',
        imgPc: `${CDN}/armour-g2-09-1-2x.webp`,
        imgMob: `${CDN}/armour-g2-mob-09-1-3x.webp`,
      },
      {
        id: 'filling',
        label: 'Top Filling',
        imgPc: `${CDN}/armour-g2-09-2-2x.webp`,
        imgMob: `${CDN}/armour-g2-mob-09-2-3x.webp`,
      },
      {
        id: 'sss',
        label: 'SSS 2.0',
        imgPc: `${CDN}/armour-g2-09-3-2x.webp`,
        imgMob: `${CDN}/armour-g2-mob-09-3-3x.webp`,
      },
    ],
  };
  const SafetyLockSectionData = {
    title: 'Dual Safety Lock |\nNo Accidental Firing',
    description:
      'Thoughtfully designed dual-safety mechanism eliminates the common pain point of accidental firing when the device is carried in a pocket. Users also have the option to manually enable the 3-minute auto-lock feature, which cuts off output after 3 minutes of inactivity',
    cards: [
      {
        id: 'auto',
        note: '*G2&GS2',
        label: '3-Minute Auto-Lock',
        imgPc: `${CDN}/armour-g2-10-1-2x.webp`,
        imgMob: `${CDN}/armour-g2-mob-10-1-3x.webp`,
        // 第二帧：LOCKED 态，与第一帧交替轮播
        altImgPc: `${CDN}/armour-g2-10-2-2x.webp`,
        altImgMob: `${CDN}/armour-g2-mob-10-2-3x.webp`,
      },
      {
        id: 'button',
        note: '*G2&GS2',
        label: 'Button Lock',
        imgPc: `${CDN}/armour-g2-10-3-2x.webp`,
        imgMob: `${CDN}/armour-g2-mob-10-3-3x.webp`,
      },
    ],
  };
  const GuardSectionData = {
    title: 'Advanced Battery Guard',
    tips: '*The data is based on testing results from VAPORESSO LAB',
    cards: [
      {
        id: 'surge',
        icon: `${CDN}/armour-g2-11-icon-1.svg`,
        title: 'Voltage Surge Protection',
        desc: '(ARMOUR G2 Only) Output Cuts Off When Voltage Deviation Exceeds 0.9V',
      },
      {
        id: 'overtime',
        icon: `${CDN}/armour-g2-11-icon-2.svg`,
        title: 'Overtime 2.0',
        desc: 'Prevent Accidental 10s Long-Press',
      },
      {
        id: 'overheat',
        icon: `${CDN}/armour-g2-11-icon-3.svg`,
        title: 'Overheat Protection',
        desc: 'Charging Stops Above 75°C',
      },
    ],
    minis: [
      {
        id: 'usb',
        icon: `${CDN}/armour-g2-11-icon-4.svg`,
        label: 'USB Protection',
      },
      {
        id: 'lowres',
        icon: `${CDN}/armour-g2-11-icon-5.svg`,
        label: 'Low Resistance',
      },
      {
        id: 'short',
        icon: `${CDN}/armour-g2-11-icon-6.svg`,
        label: 'Short Atomizer',
      },
      {
        id: 'overheat2',
        icon: `${CDN}/armour-g2-11-icon-7.svg`,
        label: 'Over Heat',
      },
      {
        id: 'battlow',
        icon: `${CDN}/armour-g2-11-icon-8.svg`,
        label: 'Battery Low',
        tall: true,
      },
    ],
  };
  const ThemeSectionData = {
    title: '3+3 UI Dynamic Themes',
    description: 'Come Alive As You Vape',
    cards: [
      {
        id: 'g2',
        caption: 'G2  Classic｜Dream｜Motor',
        imgPc: `${CDN}/armour-g2-12-1-2x.webp`,
        imgMob: `${CDN}/armour-g2-mob-12-1-3x.webp`,
      },
      {
        id: 'gs2',
        caption: 'GS2  Classic｜Meteor｜Engine',
        imgPc: `${CDN}/armour-g2-12-2-2x.webp`,
        imgMob: `${CDN}/armour-g2-mob-12-2-3x.webp`,
      },
    ],
  };
  const DualMeshSectionData = {
    logo: `${CDN}/armour-g2-07-logo.svg`,
    title: 'True-To-Life Flavor, Richer Taste',
    description:
      'The upgraded dual-mesh coils in the ARMOUR G2&GS2 works seamlessly with both nic salt and freebase e-liquids, unlocking rich, true-to-life flavor that tastes exactly like the real juice from the first puff.',
    tips: '*The data is based on testing results from VAPORESSO LAB',
    imgPc: `${CDN}/armour-g2-07-1-2x.webp`,
    imgMob: `${CDN}/armour-g2-mob-07-1-3x.webp`,
    arrowPc: `${CDN}/armour-g2-07-arrow.svg`,
    arrowMob: `${CDN}/armour-g2-mob-07-arrow.svg`,
    stats: [
      {id: 'lifespan', num: '50', unit: '%', label: 'Longer Lifespan'},
      {id: 'flavor', num: '32', unit: '%', label: 'More Intense Flavor'},
    ],
  };
  const ModeSectionData = {
    title: 'MTL & DTL Compatible',
    cards: [
      {
        id: 'mtl',
        name: 'MTL',
        imgPc: `${CDN}/armour-g2-08-1-v2-2x.webp`,
        imgMob: `${CDN}/armour-g2-mob-08-1-3x.webp`,
        slider: `${CDN}/armour-g2-08-mtl.svg`,
        features: [
          {id: 'tip', key: 'Slim', text: 'drip tip'},
          {id: 'airflow', key: 'Restricted', text: 'airflow'},
          {id: 'draw', key: 'Tighter', text: 'draw and a stronger throat hit'},
        ],
      },
      {
        id: 'dtl',
        name: 'DTL',
        imgPc: `${CDN}/armour-g2-08-2-v2-2x.webp`,
        imgMob: `${CDN}/armour-g2-mob-08-2-3x.webp`,
        slider: `${CDN}/armour-g2-08-dtl.svg`,
        features: [
          {id: 'tip', key: 'Wide', text: 'drip tip'},
          {id: 'airflow', key: 'Open', text: 'airflow'},
          {id: 'draw', key: 'Smoother', text: 'draw and massive clouds'},
        ],
      },
    ],
  };
  const CompareSectionData = {
    title: "What's New In ARMOUR G2&GS2?",
    arrow: `${CDN}/armour-g2-14-arrow.svg`,
    // 设备图为透明底（-v2），放在灰底列、移动端 #fafafa 底上都不露白框
    columns: [
      {
        id: 'g',
        name: 'ARMOUR G',
        img: `${CDN}/armour-g2-14-dev-1-v2-3x.webp`,
        features: [
          {id: 'f1', text: '3000 mAh\nBuilt-in Battery'},
          {id: 'f2', text: '2A'},
          {id: 'f3', text: '5-80W'},
          {id: 'f4', text: 'Button Lock'},
          // 设计稿 PC 两行、移动端一行
          {
            id: 'f5',
            text: 'Basic Battery\nProtection',
            textMob: 'Basic Battery Protection',
          },
        ],
      },
      {
        id: 'g2',
        name: 'ARMOUR G2',
        img: `${CDN}/armour-g2-14-dev-2-v2-3x.webp`,
        alt: true,
        features: [
          {id: 'f1', text: '3400 mAh\nBuilt-in Battery', up: true},
          {id: 'f2', text: '3A\nFast Charging', up: true},
          {id: 'f3', text: '5-60W'},
          {id: 'f4', text: 'Auto-Lock +\nButton Lock', up: true},
          {id: 'f5', text: 'Advanced Battery\nProtection', up: true},
        ],
      },
      {
        id: 'gs',
        name: 'ARMOUR GS',
        img: `${CDN}/armour-g2-14-dev-3-v2-3x.webp`,
        features: [
          {id: 'f1', text: 'External 18650\nBattery'},
          {id: 'f2', text: '2A'},
          {id: 'f3', text: '5-80W'},
          {id: 'f4', text: 'Button Lock'},
          {
            id: 'f5',
            text: 'Basic Battery\nProtection',
            textMob: 'Basic Battery Protection',
          },
        ],
      },
      {
        id: 'gs2',
        name: 'ARMOUR GS2',
        img: `${CDN}/armour-g2-14-dev-4-v2-3x.webp`,
        alt: true,
        features: [
          {id: 'f1', text: 'External 18650\nBattery'},
          {id: 'f2', text: '2A'},
          {id: 'f3', text: '5-80W'},
          {id: 'f4', text: 'Auto-Lock +\nButton Lock', up: true},
          {id: 'f5', text: 'Advanced Battery\nProtection', up: true},
        ],
      },
    ],
  };
  const PodCompatibleData = {
    title: 'Compatible With Multiple GTX Coils',
    // Pod 主图：设计稿（2026-09-11 换图）两个 Pod 用同一张产品抠图，但各节点裁切不同，
    // 故按节点各出一张透明底 3x 图，卡片底色由 CSS 提供
    podList: [
      {
        id: 'dtl',
        podName: 'ARMOUR G Series DTL Pod',
        podImgPc: `${CDN}/armour-g2-13-pod-1-3x.webp`,
        podImgMob: `${CDN}/armour-g2-mob-13-pod-1-3x.webp`,
        coilGroups: [
          {
            id: 'g015',
            items: [
              {
                id: 'mesh-0.15Ω',
                img: `${CDN}/armour-g2-13-coil-01-3x.webp`,
                ohm: '0.15Ω',
                tech: 'Mesh',
              },
              {
                id: 'dual-mesh-0.15Ω',
                img: `${CDN}/armour-g2-13-coil-02-3x.webp`,
                ohm: '0.15Ω',
                tech: 'Dual\nMesh',
              },
            ],
          },
          {
            id: 'g02',
            items: [
              {
                id: 'mesh-0.2Ω',
                img: `${CDN}/armour-g2-13-coil-03-3x.webp`,
                ohm: '0.2Ω',
                tech: 'Mesh',
              },
              {
                id: 'dual-mesh-0.2Ω',
                img: `${CDN}/armour-g2-13-coil-04-3x.webp`,
                ohm: '0.2Ω',
                tech: 'Dual\nMesh',
              },
            ],
          },
          {
            id: 'g03',
            items: [
              {
                id: 'mesh-0.3Ω',
                img: `${CDN}/armour-g2-13-coil-05-3x.webp`,
                ohm: '0.3Ω',
                tech: 'Mesh',
              },
              {
                id: 'dual-mesh-0.3Ω',
                img: `${CDN}/armour-g2-13-coil-06-3x.webp`,
                ohm: '0.3Ω',
                tech: 'Dual\nMesh',
              },
            ],
          },
          {
            id: 'g04',
            items: [
              {
                id: 'mesh-0.4Ω',
                img: `${CDN}/armour-g2-13-coil-07-3x.webp`,
                ohm: '0.4Ω',
                tech: 'Mesh',
              },
              {
                id: 'dual-mesh-0.4Ω',
                img: `${CDN}/armour-g2-13-coil-08-3x.webp`,
                ohm: '0.4Ω',
                tech: 'Dual\nMesh',
                tag: 'NEW!',
              },
            ],
          },
          {
            id: 'g06',
            items: [
              {
                id: 'mesh-0.6Ω',
                img: `${CDN}/armour-g2-13-coil-09-3x.webp`,
                ohm: '0.6Ω',
                tech: 'Mesh',
              },
            ],
          },
        ],
      },
      {
        id: 'mtl',
        podName: 'ARMOUR G Series MTL Pod',
        podImgPc: `${CDN}/armour-g2-13-pod-2-3x.webp`,
        podImgMob: `${CDN}/armour-g2-mob-13-pod-2-3x.webp`,
        coilGroups: [
          {
            id: 'm04',
            items: [
              {
                id: 'mesh-0.4Ω',
                img: `${CDN}/armour-g2-13-coil-07-3x.webp`,
                ohm: '0.4Ω',
                tech: 'Mesh',
              },
              {
                id: 'dual-mesh-0.4Ω',
                img: `${CDN}/armour-g2-13-coil-08-3x.webp`,
                ohm: '0.4Ω',
                tech: 'Dual\nMesh',
                tag: 'NEW!',
              },
            ],
          },
          {
            id: 'm06',
            items: [
              {
                id: 'mesh-0.6Ω',
                img: `${CDN}/armour-g2-13-coil-10-3x.webp`,
                ohm: '0.6Ω',
                tech: 'Mesh',
              },
            ],
          },
          {
            id: 'm08',
            items: [
              {
                id: 'mesh-0.8Ω',
                img: `${CDN}/armour-g2-13-coil-11-3x.webp`,
                ohm: '0.8Ω',
                tech: 'Mesh',
              },
            ],
          },
          {
            id: 'm12',
            items: [
              {
                id: 'mesh-1.2Ω',
                img: `${CDN}/armour-g2-13-coil-12-3x.webp`,
                ohm: '1.2Ω',
                tech: 'Mesh',
              },
            ],
          },
        ],
      },
    ],
  };
  const EndSectionData = {
    title: 'ARMOUR G2&GS2',
    img: `${CDN}/armour-g2-15-1-3x.webp`,
    features: [
      {id: 'batt', text: '3400mAh MEGA BATT'},
      {id: 'charge', text: '3A Fast Charging'},
      {id: 'mtl', text: 'MTL & DTL Compatible'},
      {id: 'safety', text: 'Dual Safety: Button + Auto Lock'},
      {id: 'airflow', text: 'Upgraded Top Airflow & Top Filling'},
      {id: 'mesh', text: 'GTX Dual Mesh'},
    ],
    btnText: 'Check Specs',
  };

  return (
    <div ref={layoutRef}>
      <KvSection {...KvSectionData} />
      <VideoSection {...VideoSectionData} />
      <FeatureGridSection {...FeatureGridData} />
      <BatterySection {...BatterySectionData} />
      <ChargingSection {...ChargingSectionData} />
      <FlavorSection {...FlavorSectionData} />
      <DualMeshSection {...DualMeshSectionData} />
      <ModeSection {...ModeSectionData} />
      <LeakproofSection {...LeakproofSectionData} />
      <SafetyLockSection {...SafetyLockSectionData} />
      <GuardSection {...GuardSectionData} />
      <ThemeSection {...ThemeSectionData} />
      <PodCompatible {...PodCompatibleData} />
      <CompareSection {...CompareSectionData} />
      <EndSection {...EndSectionData} onCheckSpecs={onCheckSpecs} />
      {children}
    </div>
  );
}
