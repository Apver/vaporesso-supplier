import {specImg} from '~/utils/ui_v3_utils';
import {VAST_POD_ASSETS} from './constants';

export const VastPodProductSpecData = {
  primaryProductTitle: 'VAST POD',
  isNoMaxWidthFinish: true,
  items: [
    {
      id: 'finish',
      itemTitle: 'Color',
      itemType: 'color',
      primaryColorImages: [VAST_POD_ASSETS.colorsPc],
      primaryColorTitle: [],
      primaryColorImagesMobile: [VAST_POD_ASSETS.colorsMob],
      primaryColorTitleMobile: [],
    },
    {
      id: 'msrp',
      itemTitle: 'MSRP',
      itemType: 'textWithImage',
      primaryTextWithImage: ['10USD (2PCS)'],
    },
    {
      id: 'size',
      itemTitle: 'Size',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        specImg(VAST_POD_ASSETS.size, VAST_POD_ASSETS.size),
        'Dimensions: 66.1 * 40.4 mm',
      ],
    },
    {
      id: 'coil',
      itemTitle: 'Coil And Pod',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        'Standard Version POD Capacity: 10ml',
        'Resistance: 0.8/0.6/0.4Ω In One',
      ],
    },
    {
      id: 'packing',
      itemTitle: 'Packing list',
      itemType: 'textWithImage',
      primaryTextWithImage: [
        '<Standard Version>',
        '1 x VAPORESSO VAST SERIES POD',
        '1 x User Manual & Warranty Card',
        specImg(VAST_POD_ASSETS.packagePc, VAST_POD_ASSETS.packageMob),
      ],
    },
  ],
};
