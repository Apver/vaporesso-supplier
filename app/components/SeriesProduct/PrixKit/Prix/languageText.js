import {specImg} from '~/utils/ui_v3_utils';

const SPEC_IMG = 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files';

export const PrixProductSpecData = {
  primaryProductTitle: 'Prix',
  isNoMaxWidthFinish: true,
  items: [
    {
      id: 'finish',
      itemTitle: 'Finish',
      itemType: 'color',
      primaryColorImages: [
        `${SPEC_IMG}/prix-colors.webp?v=1786002820`,
        `${SPEC_IMG}/prix-patch.webp?v=1786002914`,
      ],
      primaryColorTitle: [
        ['PRIX CHROME KIT', 'PRIX WHITE KIT', 'PRIX BLACK KIT'],
        [
          'CHROME PANEL',
          'BLACK PANEL',
          'WHITE PANEL',
          'METAL HEART(BK) PANEL',
          'RETRO SIGN PANEL',
          'METAL HEART(SL) PANEL',
          'RED RACING PANEL',
        ],
      ],
      primaryColorImagesMobile: [
        `${SPEC_IMG}/prix-Mob-colors.webp?v=1786002809`,
        `${SPEC_IMG}/prix-Mob-patch-1.webp?v=1786002923`,
        `${SPEC_IMG}/prix-Mob-patch-2.webp?v=1786002934`,
      ],
      primaryColorTitleMobile: [
        ['PRIX CHROME KIT', 'PRIX WHITE KIT', 'PRIX BLACK KIT'],
        ['CHROME PANEL', 'BLACK PANEL', 'WHITE PANEL', 'METAL HEART(BK) PANEL'],
        ['RETRO SIGN PANEL', 'METAL HEART(SL) PANEL', 'RED RACING PANEL', ''],
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
        specImg(`${SPEC_IMG}/prix-size.webp`),
        'Dimension: 20.3 x 41.9 x 104.5 mm',
        // 'Weight: 38.3g',
      ],
    },
    {
      id: 'power',
      itemTitle: 'Power and battery',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Max Output Power: 40W',
        'Battery Capacity: 2600 mAh',
        'Charging: DC 5V/2A, Type-C',
        'Display: 0.87" TFT Screen',
      ],
    },
    {
      id: 'coil',
      itemTitle: 'Coil and pod',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Pod Capacity: 5.5 ml',
        'Pod Resistance: 0.3/0.6Ω, 0.4/0.8Ω',
      ],
    },
    {
      id: 'packing',
      itemTitle: 'Packing list',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        '<GLOBAL Ver.   KIT INCLUDES>',
        '1 x Vaporesso PRIX Battery',
        '1 x PRIX Panel (Pre-installed)',
        '1 x Vaporesso PRIX 0.3/0.6Ω DUAL MESH IMPACT POD(Pre-installed)',
        '1 x Vaporesso PRIX 0.4/0.8Ω DUAL MESH IMPACT POD(In-box)',
        '1 x TYPE-C Cable',
        '1x PRIX Filter',
        '1 x User Manual & Warranty Card',
        specImg(
          `${SPEC_IMG}/prix-package-2.webp`,
          `${SPEC_IMG}/prix-Mob-package-2.webp`,
        ),
        '<Korea Ver.   KIT INCLUDES>',
        '1 x Vaporesso PRIX Battery',
        '1 x PRIX Panel (In-box)',
        '1 x Vaporesso PRIX 0.3/0.6Ω DUAL MESH IMPACT POD(Pre-installed)',
        '1 x Vaporesso PRIX 0.4/0.8Ω DUAL MESH IMPACT POD(In-box)',
        '1 x User Manual & Warranty Card',
        specImg(
          `${SPEC_IMG}/prix-package-1.webp`,
          `${SPEC_IMG}/prix-Mob-package-1.webp`,
        ),
      ],
    },
  ],
};
