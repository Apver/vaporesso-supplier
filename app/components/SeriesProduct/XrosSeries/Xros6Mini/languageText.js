import {specImg} from '~/utils/ui_v3_utils';

const SPEC_IMG = 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files';

/** 产品页 SEO（title / meta description） */
export const Xros6MiniSeo = {
  title: 'XROS 6 MINI & R',
  description:
    'XROS 6 MINI & R is designed for those who want vaping made simple. Featuring 60s Smart Prime for quick startup, a 1600mAh battery that lasts up to 4 days, and precise airflow adjustment for personalized MTL control, it delivers a smooth and effortless experience. Powered by COREX 3.0 and protected by SSS leak-resistant technology, XROS 6 MINI makes great flavour easier than ever. The XROS 6 MINI R feature removable batteries that users can remove in just 3 steps.',
};

export const Xros6MiniProductSpecData = {
  primaryProductTitle: 'XROS 6 Mini & R',
  isNoMaxWidthFinish: true,
  items: [
    {
      id: 'finish',
      itemTitle: 'Finish',
      itemType: 'color',
      primaryColorImages: [
        `${SPEC_IMG}/xros_6_mini-colors.webp`,
        `${SPEC_IMG}/xros_6_mini-colors-2.webp`,
      ],
      primaryColorTitle: [
        [
          'Black',
          'Brown',
          'Titanium\nBlack',
          'Titanium\nSilver',
          'Plume\nWhite',
          'Plume\nPink',
          'Plume\nBlue',
          'Jelly\nGreen',
          'Jelly\nPink',
          'Jelly\nBlue',
          'Jelly\nOrange',
        ],
        [
          'Leather\nBrown',
          'Leather\nPink',
          'Leather\nSilver',
          'Blue\nDenim',
          'Black\nDenim',
          'Racing\nBlack',
          'Racing\nGreen',
          '',
          '',
          '',
          '',
        ],
      ],
      primaryColorLabel: [
        [],
        ['New', 'New', 'New', 'New', 'New', 'New', 'New', '', '', '', ''],
      ],
      primaryColorImagesMobile: [
        `${SPEC_IMG}/xros_6_mini-Mob-colors-1.webp`,
        `${SPEC_IMG}/xros_6_mini-Mob-colors-2.webp`,
        `${SPEC_IMG}/xros_6_mini-Mob-colors-3.webp`,
        `${SPEC_IMG}/xros_6_mini-colors-mob-4.webp`,
        `${SPEC_IMG}/xros_6_mini-colors-mob-5.webp`,
      ],
      primaryColorTitleMobile: [
        ['Black', 'Brown', 'Titanium\nBlack', 'Titanium\nSilver'],
        ['Plume\nWhite', 'Plume\nPink', 'Plume\nBlue', 'Jelly\nGreen'],
        ['Jelly\nPink', 'Jelly\nBlue', 'Jelly\nOrange', ''],
        ['Leather\nBrown', 'Leather\nPink', 'Leather\nSilver', 'Blue\nDenim'],
        ['Black\nDenim', 'Racing\nBlack', 'Racing\nGreen', ''],
      ],
      primaryColorLabelMobile: [
        [],
        [],
        [],
        ['New', 'New', 'New', 'New'],
        ['New', 'New', 'New', ''],
      ],
    },
    {
      id: 'msrp',
      itemTitle: 'MSRP',
      itemType: 'textWithImage',
      primaryTextWithImage: '$23.9',
    },
    {
      id: 'size',
      itemTitle: 'Size and weight',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        specImg(`${SPEC_IMG}/xros_6_mini-size.webp?v=1786959528`),
        'Dimension: 110.7*24.55*14.65mm',
        'Weight: 55.2g',
      ],
    },
    {
      id: 'power',
      itemTitle: 'Power and battery',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Battery Capacity: 1600mAh',
        'Output Power: 30W MAX',
        'Charging: DC 5V/2A, Type-C',
      ],
    },
    {
      id: 'coil',
      itemTitle: 'Coil and pod',
      itemType: 'textWithImage',
      primaryTextWithImage: ['Pod Capacity: 3ml/2ml (TPD)', 'Resistance: 0.6Ω'],
    },
    {
      id: 'packing',
      itemTitle: 'Packing list',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        '<KIT INCLUDES>',
        '1 x VAPORESSO XROS 6 MINI Battery',
        '1 x VAPORESSO XROS Series 0.6Ω MESH POD 3ml',
        '1 x User Manual & Warranty Card',
        '1 x Reminder Card',
        specImg(
          `${SPEC_IMG}/xros_6_mini-package-3ML.webp`,
          `${SPEC_IMG}/xros_6_mini-Mob-package-3ML.webp`,
        ),
        '<TPD Ver.   KIT INCLUDES>',
        '1 x VAPORESSO XROS 6 MINI Battery',
        '1 x VAPORESSO XROS Series 0.6Ω MESH POD 3ml',
        '1 x User Manual & Warranty Card',
        '1 x Reminder Card',
        specImg(
          `${SPEC_IMG}/xros_6_mini-package-2ML.webp`,
          `${SPEC_IMG}/xros_6_mini-Mob-package-2ML.webp`,
        ),
      ],
    },
  ],
};
