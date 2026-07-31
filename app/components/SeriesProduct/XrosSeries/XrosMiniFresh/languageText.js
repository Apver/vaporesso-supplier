import {specImg} from '~/utils/ui_v3_utils';

const SPEC_IMG = 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files';

export const XrosMiniFreshProductSpecData = {
  primaryProductTitle: 'XROS MINI FRESH',
  isNoMaxWidthFinish: true,
  items: [
    {
      id: 'finish',
      itemTitle: 'Finish',
      itemType: 'color',
      primaryColorImages: [`${SPEC_IMG}/xros-mini-retro-PC-color.webp`],
      primaryColorTitle: [
        [
          'Baby Blue',
          'Baby Pink',
          'Baby Purple',
          'Matte Sliver',
          'Dark Indigo',
          'Space Black',
          'Space Grey',
          'Spring Green',
        ],
      ],
      primaryColorImagesMobile: [
        `${SPEC_IMG}/xros-mini-retro-Mob-color-1.webp`,
        `${SPEC_IMG}/xros-mini-retro-Mob-color-2.webp`,
      ],
      primaryColorTitleMobile: [
        ['Baby Blue', 'Baby Pink', 'Baby Purple', 'Matte Sliver'],
        ['Dark Indigo', 'Space Black', 'Space Grey', 'Spring Green'],
      ],
    },
    {
      id: 'msrp',
      itemTitle: 'MSRP',
      itemType: 'textWithImage',
      primaryTextWithImage: '$17.06',
    },
    {
      id: 'size',
      itemTitle: 'Size and weight',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        specImg(`${SPEC_IMG}/xros-mini-retro-size-2ml.webp`),
        'Dimension: 98.9*23.7*13.7mm ',
        'Weight: 38.3g',
      ],
    },
    {
      id: 'power',
      itemTitle: 'Power and battery',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Battery Capacity: 1000mAh',
        'Output Power:  18W',
        'Charging Current: Type-C,5V/1A',
      ],
    },
    {
      id: 'coil',
      itemTitle: 'Coil and pod',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'POD Capacity: 2ml',
        'POD Resistance: XROS 0.8Ω Mesh POD',
      ],
    },
    {
      id: 'packing',
      itemTitle: 'Packing list',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        '<KIT INCLUDES>',
        '1 x XROS MINI Battery',
        '1 x XROS Series 0.8ΩMESH Pod',
        '1 x User Manual & Warranty Card',
        '1 x Reminder Card',
        specImg(
          `${SPEC_IMG}/xros-mini-fresh-package-pc.webp`,
          `${SPEC_IMG}/xros-mini-fresh-package-mob.webp`,
        ),
      ],
    },
  ],
};
