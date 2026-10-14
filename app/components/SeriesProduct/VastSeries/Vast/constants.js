
export const PRIX_CDN = 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files';
export const PRIX_ASSET_PREFIX = 'prix';

/** @param {string} file — 原始文件名，如 `01-1.webp`、`Mob-01-1.webp` */
export function prixAsset(file) {
  return `${PRIX_CDN}/${file}`;
}

export const PRIX_KV_SECTION_DATA = {
  name: 'Vast',
  slogan: 'VAST, FAST, LAST',
  mobBanner: prixAsset('vast_mob_01.webp'),
  pcBanner: prixAsset('vast_01.webp'),
};


export const PRIX_BRIEF_SECTION_DATA = {
  title: 'Industry-first Insta-juiced Open System Pod',
  desc: 'VAPORESSO VAST is the first no-wait 10mL refillable pod built for effortless, long-lasting use. With 1s priming, you can instantly start to use after fill. The pioneering Tri-core Mesh Tech integrates 3 different resistances in one pod, providing versatile experiences for all MTL users, with no bother to choose.  With a 1600mAh battery, and mesh life tested up to 105K puffs, it delivers more choice with less waiting and fewer interruptions.*',
  pcImageUrl: prixAsset('vast_02.webp'),
  mobImageUrl: prixAsset('vast_mob_02.webp'),
};

export const PRIX_END_PRODUCT_DATA = {
  title: 'Vast',
  imgUrl: prixAsset('vast_13.webp'),
  salesList: [
    { id: 'sales1', text: '10mL Pod Capacity' },
    { id: 'sales2', text: '1s Insta Juiced, Insta Start' },
    { id: 'sales3', text: 'Up to 108K Puffs Per Pod Lifespan' },
    { id: 'sales4', text: 'Tri-core Tech, One Pod For All MTL' },
    { id: 'sales5', text: 'SSS 3.0 Tech, Ultra Leak Resistance' },
    { id: 'sales6', text: '1600mAh Battery Capacity' },
  ],
};

export const VAST_FEATURES_DATA = {
  title: 'VAST Features',
  slides: [
    {
      key: 'capacity',
      image: { pc: prixAsset('vast_03_1.webp'), mobile: prixAsset('vast_mob_03_1.webp') },
      alt: '10mL Pod Capacity',
      suffix: '10mL',
      title: 'Pod Capacity',
      color: '#FFF',
    },
    {
      key: 'insta-start',
      image: { pc: prixAsset('vast_03_2.webp'), mobile: prixAsset('vast_mob_03_2.webp') },
      alt: '1s Insta Juiced, Insta Start',
      suffix: '1',
      suffix1: 's',
      title: 'Insta Juiced\nInsta Start',
      color: '#000',
    },
    {
      key: 'refills',
      image: { pc: prixAsset('vast_03_3.webp'), mobile: prixAsset('vast_mob_03_3.webp') },
      alt: 'Up to 6 Refills Puffs Per Pod Lifespan',
      title: 'Up to 6 Refills Puffs Per Pod Lifespan',
      color: '#000',
    },
    {
      key: 'sss-tech',
      type: 'logo',
      logo: prixAsset('vast_03_4.svg'),
      title: 'SSS 3.0 Tech',
      desc: 'Ultra Leak Resistance',
      color: '#115a9b',
    },
    {
      key: 'tri-core',
      image: { pc: prixAsset('vast_03_5.webp'), mobile: prixAsset('vast_03_5.webp') },
      alt: 'Tri-core Tech, One Pod For All MTL: 0.8Ω, 0.6Ω, 0.4Ω',
      title: 'Tri-core Tech, One Pod For All MTL',
      color: '#fff',
    },
    {
      key: 'battery',
      type: 'logo',
      logo: prixAsset('vast_03_6.svg'),
      title: '1600',
      suffix: 'mAh',
      desc: 'Battery Capacity',
      color: '#8c1866',
    },
  ],
};

export const PRIX_BATTERY_SECTION_DATA = {
  productImage: prixAsset('vast_09_1.webp'),
  mobileProductImage: prixAsset('vast_mob_09_1.webp'),
};

