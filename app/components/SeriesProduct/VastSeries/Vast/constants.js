
export const PRIX_CDN = 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files';
export const PRIX_ASSET_PREFIX = 'prix';

/** @param {string} file — 原始文件名，如 `01-1.webp`、`Mob-01-1.webp` */
export function prixAsset(file) {
  return `${PRIX_CDN}/${file}`;
}

export const PRIX_KV_SECTION_DATA = {
  name: 'VAST',
  slogan: 'VAST, FAST, LAST',
  mobBanner: prixAsset('vast_mob_01.webp'),
  pcBanner: prixAsset('vast_01.webp'),
};


export const PRIX_BRIEF_SECTION_DATA = {
  title: 'Industry-first Insta-juiced Open System Pod',
  desc: 'VAPORESSO VAST is the first no-wait 10mL refillable pod built for effortless, long-lasting use. With 1s priming, you can instantly start to use after fill. The pioneering Tri-core Mesh Tech integrates 3 different resistances in one pod, providing versatile experiences for all MTL users, with no bother to choose.  With a 1600mAh battery, and mesh life tested up to 150K puffs, it delivers more choice with less waiting and fewer interruptions.*',
  pcImageUrl: prixAsset('vast_02.webp'),
  mobImageUrl: prixAsset('vast_mob_02.webp'),
};

export const PRIX_END_PRODUCT_DATA = {
  title: 'VAST',
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
  mobileProductImage: prixAsset('vast_09_1.webp'),
};
export const PRIX_PREMIUM_SECTION_DATA = {
  title: 'Simply Premium.',
  description: "Engineered with the same obsessive attention to material and finish you'd expect from the world's finest devices.",
  pcImage: prixAsset('vast_11.webp'),
  mobileImage: prixAsset('vast_mob_11.webp'),
};
export const PRIX_INTASTART_SECTION_DATA = {
  title: '4 Steps to Insta Start',
  slides: [
    {
      image: prixAsset('vast_12_1.webp'),
      mobileImage: prixAsset('vast_mob_12_1.webp'),
      text: 'Fill E-juice to the minimum line.',
    },
    {
      image: prixAsset('vast_12_2.webp'),
      mobileImage: prixAsset('vast_mob_12_2.webp'),
      text: 'Remove the silicone.',
    },
    {
      image: prixAsset('vast_12_3.webp'),
      mobileImage: prixAsset('vast_mob_12_3.webp'),
      text: 'Push together right after filling.',
    },
    {
      image: prixAsset('vast_12_4.webp'),
      mobileImage: prixAsset('vast_mob_12_4.webp'),
      text: 'Enjoy it.',
    },
  ],
};

export const VAST_CUSTOMIZATION_SECTION_DATA = {
  title: 'Effortlessly\nCustomized',
  image: prixAsset('vast_10_1.webp'),
  features: [
    {
      title: 'Adjustable\nAirflow',
      description: 'Loose - Tight',
      image: prixAsset('vast_10_2.webp'),
    },
    {
      title: 'Adjustable\nPower Modes',
      description: 'ECO - NOR - PWR',
      image: prixAsset('vast_10_3.webp'),
    },
  ],
};


export const VAST_CORE_GUARD_DATA = {
  eyebrow: 'CoreGuard Tech',
  title: 'Keep All 150K Looking\nAnd Tasting The Same',
  description: 'A nano-scale coating protects the heating wire from e-liquid corrosion, improving durability, stability, and flavor.',
  dayImage: prixAsset('vast_08_1.webp'),
  nightImage: prixAsset('vast_08_2.webp'),
  mobileDayImage: prixAsset('vast_mob_08_1.webp'),
  mobileNightImage: prixAsset('vast_mob_08_2.webp'),
  detailImage: prixAsset('vast_08_4.webp'),
  scrollDistance: 2,
  mobileScrollDistance: 1.4,
  scrub: 0.7,
  pinOffset: 0,
};

export const VAST_LEAK_RESISTANCE_DATA =
{
  eyebrow: 'SSS 3.0 Leak Resistance Tech',
  title: '10mL In. Mess Out.\nKeep Every Drop Inside',
  tripImage: prixAsset('vast_07_1.webp'),
  flightImage: prixAsset('vast_07_3.webp'),
  techImage: prixAsset('vast_07_2.webp'),
  mobileTripImage: prixAsset('vast_mob_07_1.webp'),
  mobileFlightImage: prixAsset('vast_mob_07_3.webp'),
  mobileTechImage: prixAsset('vast_mob_07_2.webp'),
  scrollDistance: 2,
  scrub: 0.7,
  pinOffset: 0
};

export const VAST_TRI_CORE_DATA = {
  assetBase: PRIX_CDN,
  techEyebrow: 'Tri-core Mesh Technology',
  techTitle: 'One Pod, Three Experiences\nFor All MTL Vapers',
  moodEyebrow: 'Tri-core Mesh Technology',
  moodTitle: 'One Click To Switch\nYour Mood',
  techEyebrowImage: prixAsset('vast_05_5.svg'),
  moodEyebrowImage: prixAsset('vast_06_5.svg'),
  desktopScrollDistance: 4800,
  mobileTechScrollDistance: 2000,
  mobileMoodScrollDistance: 2400,
  scrub: 0.65,
  pinOffset: 0,
  // modes: [
  //   { key: 'eco', sceneImage: '自定义 ECO 场景图', mobileSceneImage: '可选移动图', position: '52% center' },
  //   { key: 'nor', sceneImage: '自定义 NOR 场景图', position: '55% center' },
  //   { key: 'pwr', sceneImage: '自定义 PWR 场景图', position: '54% center' },
  // ],
};