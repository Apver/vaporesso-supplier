import {specImg} from '~/utils/ui_v3_utils';

const SPEC_IMG = 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files';

export const ArmourOctaProductSpecData = {
  primaryProductTitle: 'Armour OCTA',
  isNoMaxWidthFinish: true,
  items: [
    {
      id: 'finish',
      itemTitle: 'Finish',
      itemType: 'color',
      primaryColorImages: [
        `${SPEC_IMG}/prix-colors.webp?v=1786002820`,
        `${SPEC_IMG}/prix-patch.webp?v=1786086453`,
      ],
      primaryColorTitle: [
        ['PRIX CHROME KIT', 'PRIX WHITE KIT', 'PRIX BLACK KIT'],
        [
          'CHROME PANEL',
          'BLACK PANEL',
          'WHITE PANEL',
          'METAL HEART(BK) PANEL',
          'METAL HEART(SL) PANEL',
          'RETRO SIGN PANEL',
          'RED RACING PANEL',
        ],
      ],
      primaryColorImagesMobile: [
        `${SPEC_IMG}/prix-Mob-colors.webp?v=1786002809`,
        `${SPEC_IMG}/prix-Mob-patch-1.webp?v=1786086460`,
        `${SPEC_IMG}/prix-Mob-patch-2.webp?v=1786002934`,
      ],
      primaryColorTitleMobile: [
        ['PRIX CHROME KIT', 'PRIX WHITE KIT', 'PRIX BLACK KIT'],
        ['CHROME PANEL', 'BLACK PANEL', 'WHITE PANEL', 'METAL HEART(BK) PANEL'],
        ['METAL HEART(SL) PANEL', 'RETRO SIGN PANEL', 'RED RACING PANEL', ''],
      ],
    },
    {
      id: 'msrp',
      itemTitle: 'MSRP',
      itemType: 'textWithImage',
      primaryTextWithImage: ['$15 (Global Ver.)', '$18 (Korea Ver.)'],
    },
    {
      id: 'size',
      itemTitle: 'Size and weight',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        specImg(`${SPEC_IMG}/prix-size.webp`),
        'Dimension: 146.3x30.8x55mm',
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
        '1 x VAPORESSO ARMOUR OCTA MOD',
        '1 x VAPORESSO ITANK T 6ml(Dual Mesh Version)',
        '1 x VAPORESSO GTi 0.2Ω DUAL MESH Coil(Pre-installed)',
        '1 x VAPORESSO GTi 0.4Ω DUAL MESH Coil(In-box)',
        '1 x TYPE-C Charging Cable',
        '1 x Refilling Silicone Plug',
        '2 x O-ring',
        '1 x Extra Glass tube',
        '1 x Extra Tank Protector',
        '1 x User Manual & Warranty Card',
        '1 x Safety Manual',
        specImg(
          `${SPEC_IMG}/prix-package-2.webp`,
          `${SPEC_IMG}/prix-Mob-package-2.webp`,
        ),
        '<TPD Ver.   KIT INCLUDES>',
        '1 x VAPORESSO ARMOUR OCTA MOD',
        '1 x VAPORESSO ITANK T 6ml(Dual Mesh Version)',
        '1 x VAPORESSO GTi 0.2Ω DUAL MESH Coil(Pre-installed)',
        '1 x VAPORESSO GTi 0.4Ω DUAL MESH Coil(In-box)',
        '1 x TYPE-C Charging Cable',
        '1 x Refilling Silicone Plug',
        '2 x O-ring',
        '1 x Extra Glass tube',
        '1 x Extra Tank Protector',
        '1 x User Manual & Warranty Card',
        '1 x Safety Manual',
        specImg(
          `${SPEC_IMG}/prix-package-1.webp`,
          `${SPEC_IMG}/prix-Mob-package-1.webp`,
        ),
      ],
    },
  ],
};
