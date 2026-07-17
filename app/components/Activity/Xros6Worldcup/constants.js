export const XWC_CDN =
  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files';
export const XWC_ASSET_PREFIX = 'xros6-worldcup';

/** @param {string} file — 原始文件名，如 `01-1.webp`、`Mob-01-1.webp` */
export function xwcAsset(file) {
  return `${XWC_CDN}/${XWC_ASSET_PREFIX}-${file}`;
}

export const XWC_RUN_FRAMES = Array.from({length: 28}, (_, i) =>
  xwcAsset(`04-8-${i + 1}.webp`),
);

export const XWC_FIELD_WAYPOINTS = [
  {x: '-16%', y: '-39%'},
  {x: '-26%', y: '-34%'},
  {x: '-38%', y: '-31%'},
  {x: '-43%', y: '-21%'},
  {x: '-52%', y: '-18%'},
  {x: '-60%', y: '-15%'},
];

export const XWC_MOB_FIELD_WAYPOINTS = [
  {x: '-17%', y: '-46%'},
  {x: '-29%', y: '-37%'},
  {x: '-41%', y: '-34%'},
  {x: '-46%', y: '-24%'},
  {x: '-55%', y: '-21%'},
  {x: '-60%', y: '-20%'},
];

export const XWC_GALLERY_ITEMS = Array.from({length: 18}, (_, i) => ({
  id: i + 1,
  imageUrl: xwcAsset(`06-${i + 1}.webp`),
}));

export const XWC_PRIZE_NAMES = [
  {
    name: 'GOOD\nLUCK',
    image: xwcAsset('04-9-GoodLuck.svg'),
    popupImage: xwcAsset('no-win.webp'),
    mobpopupImage: xwcAsset('Mob-no-win.webp'),
    txt: 'So Close! Not This Time.',
    num: '',
    type: 'S',
  },
  {
    name: 'AFA\nSigned\nJersey',
    image: xwcAsset('prize1.png'),
    popupImage: xwcAsset('pop-prize1.webp'),
    mobpopupImage: xwcAsset('Mob-pop-prize1.webp'),
    txt: 'AFA Signed Jersey',
    num: 'Grand',
    type: 'B',
  },
  {
    name: 'World Cup\nMatch Ticket',
    image: xwcAsset('prize6.png'),
    popupImage: xwcAsset('pop-prize2.webp'),
    mobpopupImage: xwcAsset('Mob-pop-prize2.webp'),
    txt: ' World Cup Tickets',
    num: 'Grand',
    type: 'A',
  },
  {
    name: 'Scarf &\nFridge\nMagnet Set',
    image: xwcAsset('prize2.png'),
    popupImage: xwcAsset('pop-prize3.webp'),
    mobpopupImage: xwcAsset('Mob-pop-prize3.webp'),
    txt: 'Cap & Fridge Magnet Set',
    num: 'Second',
    type: 'D',
  },
  {
    name: 'GOOD\nLUCK',
    image: xwcAsset('04-9-GoodLuck.svg'),
    popupImage: xwcAsset('no-win.webp'),
    mobpopupImage: xwcAsset('Mob-no-win.webp'),
    txt: 'So Close! Not This Time.',
    num: '',
    type: 'S',
  },
  {
    name: 'Scarf &\nFridge\nMagnet Set',
    image: xwcAsset('prize3.png'),
    popupImage: xwcAsset('pop-prize4.webp'),
    mobpopupImage: xwcAsset('Mob-pop-prize4.webp'),
    txt: 'Scarf & Fridge Magnet Set',
    num: 'Second',
    type: 'C',
  },
  {
    name: 'XROS 6',
    image: xwcAsset('prize5.png'),
    popupImage: xwcAsset('pop-prize5.webp'),
    mobpopupImage: xwcAsset('Mob-pop-prize5.webp'),
    txt: 'VAPORESSO XROS 6',
    num: 'Third',
    type: 'F',
  },
  {
    name: 'Tumbler &\nFridge\nMagnet Set',
    image: xwcAsset('prize4.png'),
    popupImage: xwcAsset('pop-prize6.webp'),
    mobpopupImage: xwcAsset('Mob-pop-prize6.webp'),
    txt: 'Tumbler & Fridge Magnet Set',
    num: 'Second',
    type: 'E',
  },
];
