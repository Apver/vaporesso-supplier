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
      primaryColorImages: [`${SPEC_IMG}/armour-octa-colors.webp`],
      primaryColorTitle: [
        [
          'Dark Black',
          'Titanium Grey',
          'Vintage Green',
          'Rally Blue',
          'Rust Bronze',
          'Aero white',
        ],
      ],
      primaryColorImagesMobile: [
        `${SPEC_IMG}/armour-octa-Mob-colors-1.webp?v=1787043433`,
        `${SPEC_IMG}/armour-octa-Mob-colors-2.webp?v=1787043442`,
      ],
      primaryColorTitleMobile: [
        ['Dark Black', 'Titanium Grey', 'Vintage Green'],
        ['Rally Blue', 'Rust Bronze', 'Aero white'],
      ],
    },
    {
      id: 'msrp',
      itemTitle: 'MSRP',
      itemType: 'textWithImage',
      primaryTextWithImage: ['$65'],
    },
    {
      id: 'size',
      itemTitle: 'Size and weight',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        specImg(`${SPEC_IMG}/armour-octa-size.webp`),
        'Dimension: 146.3x30.8x55mm',
      ],
    },
    {
      id: 'power',
      itemTitle: 'Power and battery',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Output Power: 220W MAX',
        'Battery Type: 18650 x 2(Not included)',
        'Charging: DC 5V2.5A, Type-C',
        'Display: 0.96”TFT Screen',
      ],
    },
    {
      id: 'coil',
      itemTitle: 'Coil and pod',
      itemType: 'textWithImage',
      primaryTextWithImage: ['Coil Resistance: 0.2Ω/0.4Ω'],
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
          `${SPEC_IMG}/armour-octa-package.webp`,
          `${SPEC_IMG}/armour-octa-Mob-package.webp`,
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
          `${SPEC_IMG}/armour-octa-TPD-package.webp`,
          `${SPEC_IMG}/armour-octa-Mob-TPD-package.webp`,
        ),
      ],
    },
  ],
};
