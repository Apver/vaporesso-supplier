/**
 * Xros6 Layout Component
 */
import {useEffect, useRef} from 'react';
import {initToTopAnimate} from '~/utils/to_top_animate';
import {initXros6MiniCounterAnimate} from './useXros6MiniCounterAnimate';
import {
  VideoSection,
  PodCompatible,
  EndProduct,
} from '~/components/SeriesProduct/XrosSeries/Xros5Mini';
import {
  Xros6MiniKVSection,
  Xros6MiniSalesSection,
  Xros6MiniShowCaseOne,
  Xros6MiniShowCaseTwo,
  Xros6MiniShowCaseThree,
  Xros6MiniBatteryRemoveSection,
  Xros6MiniWhyChooseUsSection,
  Xros6MiniProductCompare,
} from '~/components/SeriesProduct/XrosSeries/Xros6Mini';
export function Xros6MiniLayout({children, onCheckSpecs}) {
  const layoutRef = useRef(null);

  useEffect(() => {
    const root = layoutRef.current ?? document;
    const cleanupToTop = initToTopAnimate({
      root,
      classNames: ['to-top', 'mobile-to-top'],
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.4,
    });
    const cleanupCounter = initXros6MiniCounterAnimate(root);
    return () => {
      cleanupToTop();
      cleanupCounter();
    };
  }, []);
  const VideoSectionData = {
    title: 'XROS 6 MINI & R is designed for those who want vaping made simple',
    desc: 'Featuring 60s Smart Prime for quick startup, a 1600mAh battery that lasts up to 4 days, and precise airflow adjustment for personalized MTL control, it delivers a smooth and effortless experience. Powered by COREX 3.0 and protected by SSS leak-resistant technology, XROS 6 MINI makes great flavour easier than ever. The XROS 6 MINI R feature removable batteries that users can remove in just 3 steps.',
    pcImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-02.webp',
    mobImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-Mob-02.webp',
  };
  const PodCompatibleData = {
    title: 'Fully Compatible With XROS PODS',
    description:
      'XROS 6 MINI is compatible with the entire XROS pod series.\nAll XROS PODS have all been upgrade to COREX 3.0 which provides best flavor when SSS 2.0 Tech prevents from leakage.',
    podList: [
      {
        id: 'pod1',
        version: '3ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-14-1.webp',
        ohm: '0.4Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod2',
        version: '3ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-14-2.webp',
        ohm: '0.6Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod3',
        version: '3ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-14-3.webp',
        ohm: '0.8Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod4',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-14-4.webp',
        ohm: '0.4Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod5',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-14-5.webp',
        ohm: '0.6Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod6',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-14-6.webp',
        ohm: '0.8Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod7',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-14-7.webp',
        ohm: '1.0Ω',
        type: 'Top Filling',
      },
      {
        id: 'pod8',
        version: '2ml Version',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-14-8.webp',
        ohm: '1.2Ω',
        type: 'Top Filling',
      },
    ],
  };
  const EndProductData = {
    title: 'XROS ',
    subtitle: '6 Mini & R',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-14.webp',
    imgUrlMob:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6_mini-Mob-10.png',
    salesList: [
      {id: 'sales1', text: '60s Coil Priming, Ready in 1 minute'},
      {id: 'sales2', text: '1600mAh Long Lasting Battery'},
      {id: 'sales3', text: 'VENTURI Airflow, Smoother & Intenser'},
      {id: 'sales4', text: 'Precisely Adjustable Airflow'},
    ],
  };
  return (
    <div ref={layoutRef}>
      <Xros6MiniKVSection className="product-xros6-mini-kv" />
      <VideoSection
        className="product-xros6-mini-video"
        data={VideoSectionData}
      />
      <Xros6MiniSalesSection />
      <Xros6MiniShowCaseOne />
      <Xros6MiniShowCaseTwo />
      <Xros6MiniShowCaseThree />
      <Xros6MiniBatteryRemoveSection />
      <Xros6MiniWhyChooseUsSection />
      <Xros6MiniProductCompare />
      <PodCompatible
        className="product-xros6-mini-pod-compatible"
        {...PodCompatibleData}
      />
      <EndProduct
        className="product-xros6-mini-end-product"
        data={EndProductData}
        onCheckSpecs={onCheckSpecs}
      />
      {children}
    </div>
  );
}
