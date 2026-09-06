import {specImg} from '~/utils/ui_v3_utils';

const SPEC_IMG = 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files';

export const ArmourG2ProductSpecData = {
  primaryProductTitle: 'ARMOUR G2',
  isNoMaxWidthFinish: true,
  items: [
    {
      id: 'finish',
      itemTitle: 'Finish',
      itemType: 'color',
      primaryColorImages: [`${SPEC_IMG}/luxe_q3-colors-web.webp`],
      primaryColorTitle: [
        [
          'Classic Black',
          'Prussian Blue',
          'Mocha Brown',
          'Aegean Green',
          'Rose Pink',
          'Birkin Red',
        ],
      ],
      primaryColorImagesMobile: [
        `${SPEC_IMG}/luxe_q3-colors-mob-1.webp`,
        `${SPEC_IMG}/luxe_q3-colors-mob-2.webp`,
      ],
      primaryColorTitleMobile: [
        ['Aegean Green', 'Birkin Red', 'Classic Black'],
        ['Mocha Brown', 'Prussian Blue', 'Rose Pink'],
      ],
    },
    {
      id: 'msrp',
      itemTitle: 'MSRP',
      itemType: 'textWithImage',
      primaryTextWithImage: ['$29.9'],
    },
    {
      id: 'size',
      itemTitle: 'Size and weight',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        '',
        specImg(`${SPEC_IMG}/luxe_q3-3ml-size.webp`),
        '3ML Version',
        'Dimensions: 96.85 x 18.4 x 26 mm',
        'Weight: 66.2g',
      ],
      secondaryTextWithImage: [
        '',
        specImg(`${SPEC_IMG}/luxe_q3-2ml-size.webp`),
        '2ML Version',
        'Dimensions: 94.85 x 18.4 x 26 mm',
        'Weight: 65.7g',
      ],
    },
    {
      id: 'power',
      itemTitle: 'Power and battery',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Battery Capacity: 1450mAh',
        'Output Power: 20W MAX',
        'Charging Current: Type-C, 2A',
      ],
    },
    {
      id: 'coil',
      itemTitle: 'Coil and pod',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Pod Capacity: 3ml',
        'Pod Resistance:',
        'LUXE Q 0.6Ω Mesh POD',
        'LUXE Q 0.8Ω Mesh POD',
      ],
    },
    {
      id: 'packing',
      itemTitle: 'Packing list',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        '<GLOBAL Ver.  KIT INCLUDES>',
        '1 x VAPORESSO LUXE Q3 Battery',
        '1 x VAPORESSO LUXE Q 0.6Ω MESH POD 3ml (Pre-installed)',
        '1 x VAPORESSO LUXE Q 0.8Ω MESH POD 3ml (In-box)',
        '1 x User Manual & Warranty Card & Reminder Card',
        specImg(
          `${SPEC_IMG}/luxe_q3-package-global-web.webp`,
          `${SPEC_IMG}/luxe_q3-package-global-mob.webp`,
        ),
        '<TPD Ver. KIT INCLUDES>',
        '1 x VAPORESSO LUXE Q3 Battery',
        '1 x VAPORESSO LUXE Q 0.6Ω MESH POD 2ml (Pre-installed)',
        '1 x VAPORESSO LUXE Q 0.8Ω MESH POD 2ml (In-box)',
        '1 x User Manual & Warranty Card & Reminder Card',
        specImg(
          `${SPEC_IMG}/luxe_q3-package-tpd-web.webp`,
          `${SPEC_IMG}/luxe_q3-package-tpd-mob.webp`,
        ),
      ],
    },
  ],
};
