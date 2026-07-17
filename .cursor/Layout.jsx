import {useState, useMemo} from 'react';
import {getLocalizedDataset} from '~/lib/localization';
import {
  KvBanner,
  BannerExhibit,
  ProductBrief,
  BgBlockTextV1,
  BgCardTextV1,
  SwiperBlockV1,
  JoinTopic,
  Specifications,
  Dimensions,
  ExplodedView,
  Replacement,
  InTheBox,
} from '~/components/SeriesProduct/XrosSeries/Xros';
import {VideoBanner} from '~/components/SeriesProduct/XrosSeries/XrosNano';

export function LuxeQ2SeLayout({children, sheets, locale}) {
  const [isShowExhibit, setIsShowExhibit] = useState(false);
  const localizedKvBannerRows = useMemo(() => {
    return getLocalizedDataset(sheets?.KvBanner ?? [], locale);
  }, [sheets?.KvBanner, locale]);
  const KvBannerData = useMemo(() => {
    const row = localizedKvBannerRows[0];
    return row ? {...row} : null;
  }, [localizedKvBannerRows]);
  const BannerExhibitData = {
    exhibitTabsList: ['Regular'],
    exhibitDataList: {
      Regular3dExhibit: [
        {
          id: 'color1',
          color: 'Green',
          colorUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-color-1-4.png',
          animateUrlPre:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/',
          filenameX: 'luxe_q-3d-{index}.png',
          amountX: 49,
        },
        {
          id: 'color2',
          color: 'Black',
          colorUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-color-1-5.png',
          productUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-product-black.png',
        },
        {
          id: 'color3',
          color: 'Red',
          colorUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-color-1-6.png',
          productUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-product-red.png',
        },
        {
          id: 'color4',
          color: 'Brown',
          colorUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-color-1-7.png',
          productUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-product-brown.png',
        },
        {
          id: 'color5',
          color: 'Blue',
          colorUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-color-1-8.png',
          productUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-product-blue.png',
        },
        {
          id: 'color6',
          color: 'White',
          colorUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-color-1-9.png',
          productUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-product-white.png',
        },
        {
          id: 'color7',
          color: 'Pink',
          colorUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-color-1-10.png',
          productUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-product-pink.png',
        },
        {
          id: 'color8',
          color: 'Matte black',
          colorUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-color-1-11.png',
          productUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-product-matte-Black.png',
        },
        {
          id: 'color9',
          color: 'Camo',
          colorUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-color-1-12.png',
          productUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-product-camo.png',
        },
        {
          id: 'color10',
          color: 'Matte silver',
          colorUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-color-1-13.png',
          productUrl:
            'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-product-matte-Silver.png',
        },
      ],
    },
  };
  const ProductBriefData = {
    id: 'product-brief',
    price: '$29.90',
    description:
      'The LUXE Q is equipped with a high-density 1000 mAh built-in battery to keep you going and comes with the latest SSS leak-resistant technology that allows for a quality vaping experience.\n\nIt feels good in your hand.\n\nThe pioneering of texture on a compact device, LUXE Q holds MESH pods that offer both 0.8Ω and 1.2Ω, this little monster allows for adjustable airflow for intense and satisfying flavors all in a stylish compact design.',
    sellingPoint:
      'Pioneer Texture on Small Pods\n\n1000mAh Built-in Battery\n\n0.8Ω&amp;1.2Ω MESH Pods\n\nAdjustable Airflow\n\nTop Filling System\n\nSSS Leak-Resistant Technology',
  };
  const VideoBannerData = {
    id: 'video-banner',
    desc: 'The pioneering of texture on a compact device, LUXE Q holds MESH pods that offer both 0.8Ω and 1.2Ω, this little monster allows for adjustable airflow for intense and satisfying flavors all in a stylish compact design.',
    videoPUrl:
      'https://cdn.shopify.com/videos/c/o/v/283c0a77600443aabe6952e5e4ac914a.mp4',
    videoMobileUrl:
      'https://cdn.shopify.com/videos/c/o/v/283c0a77600443aabe6952e5e4ac914a.mp4',
    videoPosterUrl: '',
    videoMobilePosterUrl: '',
    linkUrl: '',
  };
  const SmallPodsData = {
    id: 'small-pods',
    title: 'PIONEERING TEXTURE ON SMALL PODS',
    description:
      'Upon the slim and compact body, the leather texture and stylish cover make the LUXE Q more comfortable with an anti-sweat, anti-smudge grip.',
    bgPcUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-3.png',
    bgMbUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-mob-3.png',
  };
  const SurprisinglyData = {
    id: 'surprisingly',
    title: 'SURPRISINGLY POWERFUL',
    description:
      'Despite its size, a high-density 1000 mAh built-in battery provides the LUXE Q with a long-lasting vaping experience.',
    bgPcUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-4.png',
    bgMbUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-mob-4.png',
  };
  const MeshPodsData = {
    id: 'mesh-pods',
    title: '0.8Ω &amp; 1.2Ω MESH Pods',
    description:
      'The LUXE Q is compatible with both 0.8Ω and 1.2Ω MESH pods, allowing you to choose the perfect pod for your vaping style.',
    bgPcUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-5.png',
    bgMbUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-mob-5.png',
  };
  const AdjustableData = {
    id: 'adjustable',
    title: 'ADJUSTABLE AIRFLOW',
    description:
      'The simplest way to change the airflow, by switching the installing direction of the Pod.',
    bgPcUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-6.png',
    bgMbUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-mob-6.png',
  };
  const TopFillingData = {
    id: 'top-filling',
    title: 'TOP',
    description: ' FILLING SYSTEM',
    bgPcUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-7.png',
    bgMbUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-mob-7.png',
  };
  const LeakResistantData = {
    id: 'leak-resistant',
    title: 'SSS LEAK-RESISTANT TECHNOLOGY',
    description: 'Building a comprehensive anti-leakage liquid effect.',
    bgPcUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-8.png',
    bgMbUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-mob-8.png',
  };

  const StepsData = [
    {
      id: 'step-1',
      title: 'Draw-Activated',
      pcUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-9-1.png',
      mbUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-mob-9-1.png',
    },
    {
      id: 'step-2',
      title: 'Visible Pod',
      pcUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-9-2.png',
      mbUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-mob-9-2.png',
    },
    {
      id: 'step-3',
      title: 'Type-C',
      pcUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-9-3.png',
      mbUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-mob-9-3.png',
    },
    {
      id: 'step-2',
      title: '3-Color Indicator',
      pcUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-9-4.png',
      mbUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-mob-9-4.png',
    },
  ];
  const JoinTopicData = {
    id: 'join-topic',
    productTag: '#vaporessoluxeq',
    pcUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-11.png',
    mbUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-mob-11.png',
  };
  const SpecificationsData = [
    {
      id: 'item1',
      title: 'POD Capacity',
      description: '2ml',
    },
    {
      id: 'item2',
      title: 'Pod',
      description: '0.8Ω MESH Pod\n\n1.2Ω MESH Pod',
    },
    {
      id: 'item3',
      title: 'Battery Capacity',
      description: '1000mAh',
    },
    {
      id: 'item4',
      title: 'Charging',
      description: 'Type-C, 1A',
    },
  ];
  const DimensionsData = [
    {
      id: 'item1',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-12-1.png',
    },
  ];
  const ExplodedViewData = {
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-12-2.png',
  };
  const ReplacementData = [
    {
      id: 'replacement1',
      title: '0.6Ω MESH POD ',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_qs_pc-replacement-1.png',
    },
    {
      id: 'replacement2',
      title: '1.0Ω MESH POD ',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_qs_pc-replacement-2.png',
    },
  ];
  const InTheBoxData = [
    {
      id: 'box1',
      title: 'KIT INCLUDES',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-14-1.png',
      desc: '• 1 x LUXE Q Battery\n\n• 1 x LUXE Q 0.8Ω MESH Pod\n\n• 1 x LUXE Q 1.2Ω MESH Pod\n\n• 1 x Type-C USB Cable\n\n• 1 x User Manual\n\n• 1 X Warranty Card',
    },
    {
      id: 'box2',
      title: '[TPD] KIT INCLUDES',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/luxe_q-pc-14-2.png',
      desc: '• 1 x LUXE Q Battery\n\n• 1 x LUXE Q 0.8Ω MESH Pod\n\n• 1 x LUXE Q 1.2Ω MESH Pod\n\n• 1 x Type-C USB Cable\n\n• 1 x User Manual\n\n• 1 X Warranty Card',
    },
  ];
  return (
    <div className="ui-v1 luxe_q">
      {KvBannerData ? (
        <KvBanner
          className="luxe_q_kv-banner"
          data={KvBannerData}
          handleExhibitClick={() => setIsShowExhibit(true)}
        />
      ) : null}
      {isShowExhibit ? (
        <BannerExhibit
          isShowExhibit={isShowExhibit}
          {...BannerExhibitData}
          handleExhibitClose={() => setIsShowExhibit(false)}
        />
      ) : null}
      <ProductBrief data={ProductBriefData} className="luxe_q_product-brief" />
      <VideoBanner data={VideoBannerData} className="luxe_q_video-banner" />
      <BgBlockTextV1 className="luxe_q_small-pods" {...SmallPodsData} />
      <BgBlockTextV1 className="luxe_q_surprisingly" {...SurprisinglyData} />
      <BgCardTextV1 className="luxe_q_mesh-pods" {...MeshPodsData} />
      <BgBlockTextV1 className="luxe_q_adjustable" {...AdjustableData} />
      <BgCardTextV1 className="luxe_q_top-filling" {...TopFillingData} />
      <BgBlockTextV1 className="luxe_q_leak-resistant" {...LeakResistantData} />
      <SwiperBlockV1
        className="luxe_q_steps"
        dataList={StepsData}
        title="EACH STEP MAKES THE OPERATION EASIER"
      />
      <JoinTopic data={JoinTopicData} className="luxe_q_join-topic" />
      <Specifications
        className="luxe_q_specifications"
        data={SpecificationsData}
      />
      <Dimensions data={DimensionsData} />
      <ExplodedView data={ExplodedViewData} />
      <Replacement title="Accessories" replacementList={ReplacementData} />
      <InTheBox data={InTheBoxData} />
      {children}
    </div>
  );
}
