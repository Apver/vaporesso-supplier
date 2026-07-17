/**
 * Xros6 Layout Component
 */
import {useEffect} from 'react';
import {initToTopAnimate} from '~/utils/to_top_animate';
import {
  VideoSection,
  PodCompatible,
  EndProduct,
} from '~/components/SeriesProduct/XrosSeries/Xros5Mini';
import {
  Xros6KVSection,
  Xros6SalesSection,
  Xros6AdvantageSection,
} from '~/components/SeriesProduct/XrosSeries/Xros6';
import {SwiperSectionV3} from '~/components/SeriesProduct/XrosSeries/Xros4Nano';
export function Xros6Layout({children, onCheckSpecs}) {
  useEffect(() => {
    const cleanup = initToTopAnimate({classNames: ['to-top', 'mobile-to-top']});
    return cleanup;
  }, []);
  const VideoSectionData = {
    title:
      "XROS 6 is the latest evolution of the VAPORESSO XROS Series, one of the world's most popular MTL pod platforms.",
    desc: 'Designed for a faster, more seamless experience, it features 60s Smart Prime for quick startup, 3A fast charging that delivers a full day of use in just 10 minutes, and a high-capacity 1800mAh battery for up to 5 days of use—keeping up effortlessly with your daily rhythm.\n\nPowered by advanced VENTURI airflow and COREX 3.0 heating technologies, every puff is smoother, richer, and more consistent. With the upgraded SSS 2.0 leak-resistant technology, XROS 6 ensures a clean, reliable experience—so satisfaction comes instantly and lasts longer.',
    pcVideoUrl:
      'https://cdn.shopify.com/videos/c/o/v/4599129ba0684b4b8e191527d045c04d.mp4',
    mobVideoUrl:
      'https://cdn.shopify.com/videos/c/o/v/4599129ba0684b4b8e191527d045c04d.mp4',
    pcImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-02.webp',
    mobImageUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-02.webp',
    btnLink: 'https://www.instagram.com/p/DYW9CbTgwIn/',
    btnText: 'Watch the video',
  };
  const SwiperSectionV3Data = {
    title: 'XROS YOUR STYLE',
    description: 'Designed to match your mood',
    autoPlay: true,
    dataList: [
      {
        id: 'swiper1',
        pcUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-13-1.webp',
        mobUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-13-1.webp',
      },
      {
        id: 'swiper2',
        pcUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-13-2.webp',
        mobUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-13-2.webp',
      },
      {
        id: 'swiper3',
        pcUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-13-3.webp',
        mobUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-13-3.webp',
      },
      {
        id: 'swiper4',
        pcUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-13-4.webp',
        mobUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-13-4.webp',
      },
      {
        id: 'swiper5',
        pcUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-13-5.webp',
        mobUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-13-5.webp',
      },
      {
        id: 'swiper6',
        pcUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-13-6.webp',
        mobUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-13-6.webp',
      },
    ],
  };
  const PodCompatibleData = {
    title: 'Fully Compatible With XROS PODS',
    description:
      'XROS 6 is compatible with the entire XROS pod series. All XROS PODS have all been upgrade to COREX 3.0 which provides best flavor when SSS 2.0 Tech prevents from leakage.',
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
    subtitle: '6',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-15-1.webp',
    imgUrlMob:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros_6-Mob-15-1.webp',
    salesList: [
      {id: 'sales1', text: '60s Coil Priming, Ready in 1 minute'},
      {id: 'sales2', text: '1800mAh Long Lasting Battery'},
      {id: 'sales3', text: '10 min charge for all day vaping'},
      {id: 'sales4', text: 'VENTURI Airflow, Smoother & Intenser'},
      {id: 'sales5', text: 'SSS 2.0 Tech'},
    ],
  };
  return (
    <>
      <Xros6KVSection className="product-xros6-kv" />
      <VideoSection className="product-xros6-video" data={VideoSectionData} />
      <Xros6SalesSection />
      <Xros6AdvantageSection />
      <SwiperSectionV3
        className="product-xros6-swiper"
        {...SwiperSectionV3Data}
      />
      <PodCompatible
        className="product-xros6-pod-compatible"
        {...PodCompatibleData}
      />
      <EndProduct
        className="product-xros6-end-product"
        data={EndProductData}
        onCheckSpecs={onCheckSpecs}
      />
      {children}
    </>
  );
}
