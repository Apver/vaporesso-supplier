import {specImg} from '~/utils/ui_v3_utils';

const SPEC_IMG = 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files';

export const VastPodProductSpecData = {
  primaryProductTitle: 'VAST POD',
  isNoMaxWidthFinish: true,
  items: [
    {
      id: 'finish',
      itemTitle: 'Finish',
      itemType: 'color',
      primaryColorImages: [`${SPEC_IMG}/vast-color.webp?v=1792405690`],
      primaryColorTitle: [
        [
          'Carbon\nBlack',
          'Space\nBlack',
          'Space\nGray',
          'Cloudveil\nBlue',
          'Cherry\nRed',
          'Marble\nSilver',
          'Blush\nPink',
          'Graffiti\nGreen',
          'Graffiti\nGolden',
        ],
      ],
      primaryColorImagesMobile: [
        `${SPEC_IMG}/vast-color-mob-1.webp?v=0.1`,
        "https://cdn.shopify.com/s/files/1/0703/9873/8521/files/vast-color-mob-2.webp?v=0.1",
        `${SPEC_IMG}/vast-color-mob-3.webp?v=1792406229`,
      ],
      primaryColorTitleMobile: [
        [
          'Carbon\nBlack',
          'Space\nBlack',
          'Space\nGray',
          'Cloudveil\nBlue',
        ],
        [
          'Cherry\nRed',
          'Marble\nSilver',
          'Blush\nPink',
          'Graffiti\nGreen',
        ],
        ['Graffiti\nGolden', '', '', ''],
      ],
    },
    {
      id: 'msrp',
      itemTitle: 'MSRP',
      itemType: 'textWithImage',
      primaryTextWithImage: ['$25.9'],
    },
    {
      id: 'size',
      itemTitle: 'Size and weight',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        specImg(`${SPEC_IMG}/vast-size.webp?v=1792405372`),
        'Dimensions: 112 x 40 x 25.2 mm',
        'Weight：87.5g',
      ],
    },
    {
      id: 'power',
      itemTitle: 'Power and battery',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Battery Capacity: 1600mAh',
        'Output Power:  30W MAX',
        'Charging Current: DC 5V/2A, Type-C',
        'Display& Power Level: ',
        '3 White LEDs = Power Mode',
        '2 White LEDs = Normal Mode',
        '1 White LED = Eco Mode',
      ],
    },
    {
      id: 'coil',
      itemTitle: 'Coil and pod',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Standard Version POD Capacity: 10ml',
        'TPD Version POD Capacity: 2ml',
        'TPD Version Refill Container: 8ml',
        'Resistance: 0.8/0.6/0.4Ω In One',
      ],
    },
    {
      id: 'packing',
      itemTitle: 'Packing list',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        '<Standard Ver.  KIT INCLUDES>',
        '1 x VAPORESSO VAST Battery',
        '1 x VAPORESSO VAST SERIES POD',
        '1 x User Manual & Warranty Card',
        specImg(
          `${SPEC_IMG}/vast-package-standard.webp?v=1792405317`,
          `${SPEC_IMG}/mob-vast-package-1.webp?v=1792576629`,
        ),
        '<TPD Ver.  KIT INCLUDES>',
        '1 x VAPORESSO VAST Battery',
        '1 x VAPORESSO VAST SERIES POD',
        '1 x VAPORESSO VAST REFILL CONTAINER ',
        '1 x User Manual & Warranty Card',
        specImg(
          `${SPEC_IMG}/vast-package-TPD.webp?v=1792405313`,
          `${SPEC_IMG}/mob-vast-package-2.webp?v=1792576629`,
        ),
      ],
    },
  ],
};
