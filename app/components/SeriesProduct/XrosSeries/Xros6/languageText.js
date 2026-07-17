import {specImg} from '~/utils/ui_v3_utils';

const SPEC_IMG = 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files';

export const Xros6ProductSpecData = {
  primaryProductTitle: 'XROS 6',
  isNoMaxWidthFinish: true,
  items: [
    {
      id: 'finish',
      itemTitle: 'Finish',
      itemType: 'color',
      primaryColorImages: [`${SPEC_IMG}/xros_6-color-pc.webp`],
      primaryColorTitle: [
        [
          'Cosmic\nBlack',
          'Abyssal\nBlue',
          'Slate\nBlack',
          'Carbon\nFiberGray',
          'Silk\nGreen',
          'Silk\nGray',
          'Silk\nBrown',
          'Pearl\nWhite',
          'Dreamy\nPink',
          'Scorching\nCloud',
          'Aurora\nBlue',
        ],
      ],
      primaryColorImagesMobile: [
        `${SPEC_IMG}/xros_6-color-mob-1.webp`,
        `${SPEC_IMG}/xros_6-color-mob-2.webp`,
        `${SPEC_IMG}/xros_6-color-mob-3.webp`,
      ],
      primaryColorTitleMobile: [
        ['Cosmic\nBlack', 'Abyssal\nBlue', 'Slate\nBlack', 'Carbon\nFiberGray'],
        ['Silk\nGreen', 'Silk\nGray', 'Silk\nBrown', 'Pearl\nWhite'],
        ['Dreamy\nPink', 'Scorching\nCloud', 'Aurora\nBlue'],
      ],
    },
    {
      id: 'msrp',
      itemTitle: 'MSRP',
      itemType: 'textWithImage',
      primaryTextWithImage: '$35.9',
    },
    {
      id: 'size',
      itemTitle: 'Size and weight',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        specImg(`${SPEC_IMG}/xros_6-size.webp`),
        'Dimension: 96.15*24.65*14.65mm',
        'Weight: 65g',
      ],
    },
    {
      id: 'power',
      itemTitle: 'Power and battery',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Battery Capacity: 1800mAh',
        'Output Power: 30W MAX',
        'Charging Current: DC 9V/2A, 5V/3A Type-C',
        'Display: 0.88" TFT Screen',
      ],
    },
    {
      id: 'coil',
      itemTitle: 'Coil and pod',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Pod Capacity: 3ml/2ml (TPD)',
        'Resistance: 0.6Ω/0.8Ω',
      ],
    },
    {
      id: 'packing',
      itemTitle: 'Packing list',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        '<KIT INCLUDES>',
        '1 x XROS 6 Battery',
        '1 x XROS Series 0.6Ω MESH Pod 3ml(Pre-installed)',
        '1 x VAPORESSO XROS Series 0.8Ω MESH Pod 3ml(In box)',
        '1 x TYPE-C Cable',
        '1 x User Manual & Warranty Card',
        specImg(
          `${SPEC_IMG}/xros_6-package-pc-global.webp`,
          `${SPEC_IMG}/xros_6-package-mob-global.webp`,
        ),
        '<TPD Ver.   KIT INCLUDES>',
        '1 x XROS 6 Battery',
        '1 x XROS Series 0.6Ω MESH Pod 2ml(Pre-installed)',
        '1 x VAPORESSO XROS Series 0.8Ω MESH Pod 2ml(In box)',
        '1 x TYPE-C Cable',
        '1 x User Manual & Warranty Card',
        specImg(
          `${SPEC_IMG}/xros_6-package-pc-tpd.webp`,
          `${SPEC_IMG}/xros_6-package-mob-tpd.webp`,
        ),
      ],
    },
  ],
};
