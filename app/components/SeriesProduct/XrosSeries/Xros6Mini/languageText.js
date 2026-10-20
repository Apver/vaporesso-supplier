import {specImg} from '~/utils/ui_v3_utils';

const SPEC_IMG = 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files';

export const Xros6MiniProductSpecData = {
  primaryProductTitle: 'XROS 6 Mini',
  isNoMaxWidthFinish: true,
  items: [
    {
      id: 'XROS 6 MINI',
      itemTitle: 'XROS 6 MINI',
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
      id: 'XROS 6 MINI R',
      itemTitle: 'XROS 6 MINI R',
      itemType: 'color',
      primaryColorImages: [
        `${SPEC_IMG}/XROS_6_mini-quanse.webp`,
      ],
      primaryColorTitle: [
        [
          'Titanium\nBlack',
          'Titanium\nSilver',
          'Plume\nWhite',
          'Plume\nPink',
          'Plume\nBlue',
          'Leather\nPink',
          'Leather\nSilver'
        ],
      ],
      primaryColorLabel: [
        [],
      ],
      primaryColorImagesMobile: [
        `${SPEC_IMG}/Mob-XROS_6_mini_R-quanse-1.webp`,
        `${SPEC_IMG}/Mob-XROS_6_mini_R-quanse-2.webp`,
      ],
      primaryColorTitleMobile: [
        ['Titanium\nBlack', 'Titanium\nSilver', 'Plume\nWhite', 'Plume\nPink'],
        ['Plume\nBlue', 'Leather\nPink', 'Leather\nSilver', ''],
      ],
      primaryColorLabelMobile: [
        [],
        [],
      ],
      colorColumns: 4,
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
        'XROS 6 MINI',
        'Dimension: 110.7*24.55*14.65mm',
        'Weight: 55.2g',
      ],
      secondaryTextWithImage: [
        specImg(`${SPEC_IMG}/XROS_6_MINI_R_KIT-size.webp`),
        'XROS 6 MINI R',
        'Dimension: 118.2*24.55*14.65mm',
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
        '<XROS 6 MINI R KIT INCLUDES>',
        '1 x XROS 6 MINI R Battery',
        '1 x XROS Series 0.6Ω MESH POD',
        '1 x User Manual & Warranty Card',
        '1 x Reminder Card',
        specImg(
          `${SPEC_IMG}/xros6-mini-R-package.webp`,
          `${SPEC_IMG}/xros6-mini-package.webp`,
        ),
      ],
    },
  ],
};
