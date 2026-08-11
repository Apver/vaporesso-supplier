/**
 * Xros5Mini Layout Component
 * Layout component for XROS 5 Mini product pages
 */
import {useEffect, useRef} from 'react';
import {initScrollAppearAnimate} from '~/utils/scroll_appear_animate';
import {
  KvSectionV4,
  BriefSectionV4,
  PodCompatible,
  EndProduct,
} from '~/components/ui-v4';


import {
OctaProtection,
 MilitaryProof,
 OctaProofShowcase,
 OctaVoltageSurge,
 OctaOverheatProtection
} from '~/components/SeriesProduct/ArmourSeries/ArmourOcta';
import {TechSection} from '~/components/SeriesProduct/ArmourSeries/ArmourOcta/TechSection';
export function ArmourOctaLayout({children, onCheckSpecs}) {
  const rootRef = useRef(null);
  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = initScrollAppearAnimate({root: rootRef.current});
    return cleanup;
  }, []);
  const KvSectionData = {
    mobBanner:
      'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-01-1-3x.webp',
    pcBanner:
      'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-01-1-2x.webp',
  };
  // const KvTextChildren = (
  //   <picture>
  //     <source
  //       media="(min-width: 1024px)"
  //       srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-01-2.webp"
  //     />
  //     <img
  //       src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-Mob-01-2.webp"
  //       alt="Prix"
  //       className="product-prix-kv-title"
  //     />
  //   </picture>
  // );
  const BriefSectionData = {
    // title: 'Swap Panels, Premium Style',
    desc: "Hey dude, how are you doing?\nWe've shared highs and got through lows side by side. Vaporesso has been there for all your key moments, \nalways protecting you and sticking around.\nThe Armour series is your reliable old pal: we never cut corners on making solid vape mods, and never stray from our original mission. Just like you, we're still on the road to getting better, chasing a brighter future.\nCheers to us, to all our shared memories, and to what's ahead.",
    pcImageUrl:
      'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-02-1-2x.webp',
    mobImageUrl:
      'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-02-1-3x.webp',
  };
  const PodCompatibleData = {
    title: 'Compatible With Multiple GTi Coils',
    description:
      'With GTi 0.2Ω DUAL MESH and 0.4Ω DUAL MESH coil included, the iTank T is also fully compatible with all the GTi coil platfrom',
    podList: [
      {
        id: 'pod1',
        version: 'Pre-installed',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-14-1.webp',
        ohm: 'GTi 0.2Ω DUAL MESH',
        type: '60-75W\nBEST: 65W',
        tag: 'New',
      },
      {
        id: 'pod2',
        version: 'In-Box',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-14-2.webp',
        ohm: 'GTi 0.4Ω DUAL MESH',
        type: '50-60W\nBEST: 55W',
        tag: 'New',
      },
      {
        id: 'pod3',
        version: 'Coming Soon',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-14-3.webp',
        ohm: 'GTi 0.15Ω DUAL MESH',
        type: '75-90W\nBEST: 85W',
      },
      {
        id: 'pod4',
        version: 'Compatible',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-14-4.webp',
        ohm: 'GTi 0.15Ω MESH',
        type: '75-90W\nBEST: 85W',
      },
      {
        id: 'pod5',
        version: 'Compatible',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-14-5.webp',
        ohm: 'GTi 0.2Ω MESH',
        type: '60-75W\nBEST: 65W',
      },
      {
        id: 'pod6',
        version: 'Compatible',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-14-6.webp',
        ohm: 'GTi 0.4Ω MESH',
        type: '50-60W\nBEST: 55W',
      },
      {
        id: 'pod7',
        version: 'Compatible',
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-ultra-web-14-7.webp',
        ohm: 'GTi 0.5Ω MESH',
        type: '30-40W\nBEST: 35W',
      },
    ],
  };
  const EndProductData = {
    title: 'ARRMOUR Octa',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/prix-13.webp',
    salesList: [
      {id: 'sales1', text: 'WATER-PROOF'},
      {id: 'sales2', text: 'DUST-PROOF'},
      {id: 'sales3', text: 'WATERJET-PROOF'},
      {id: 'sales4', text: 'SHOCK-PROOF'},
      {id: 'sales5', text: 'OVERTIME 2.0'},
      {id: 'sales6', text: 'FTPU Protection'},
      {id: 'sales7', text: 'Voltage Surge Protection'},
      {id: 'sales8', text: 'Charging Overheat Protection'},
    ]
  };
const militaryProofData = {
  mark: '4X',
  background: {
    pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-04-1-2x.webp',
    mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-04-1-3x.webp',
  },

  foreground: {
    pc:   'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-04-2-2x.webp',
    mobile:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-04-2-3x.webp',
  },

  title: {
    before: 'Ultimate Military-grade',
    highlight: '4X',
    after: 'Proof',
  },

  subtitle: 'Built for Maximum Lifespan',
};
const proofShowcaseData = {
  title: {
    before: 'Ultimate Military-grade',
    highlight: '4X',
    after: 'Proof',
  },

  subtitle: 'Built for Maximum Lifespan',

  note:
    '*All certifications and tests apply to the MOD only, based on standardized third-party lab conditions.',

  showDots: true,

  slides: [
    {
      key: 'ipx8',
      image: {
        pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-05-1-2x.webp',
        mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-05-1-3x.webp',
      },
       title: {
        highlight: 'IPX8',
        text: ' Waterproof,\nBrave For Outdoor.',
      },

      desc:'Armour OCTA is IP68K certified, offering robust protection for reliable, unrestricted enjoyment anytime, anywhere.',

      metrics: [
        {
          value: '1',
          suffix: 'M',
          label: 'Depth',
        },
        {
          value: '30',
          suffix: '+Min',
          label: 'Duration',
        },
      ],
    },
    {
      key: 'ipx9k',
      image: {
        pc:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-05-2-2x.webp',
        mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-05-2-3x.webp',
      },
       title: {
        highlight: 'IPX9K',
        text: ' Waterjet-\nproof, Tough For\nWashdown',
      },

      desc:'The ARMOUR OCTA’s officially IP69K rated — it can stand up to blasts of high-pressure hot water no problem. No stress if you spill on it, splash it around, or even take it into messy, tough environments, it’s got all-around protection that just works.',

      metrics: [
        {
          value: '100',
          suffix: 'bar',
          label: 'High-Pressure Water Jets',
        },
        {
          value: '85',
          suffix: '°C',
          label: 'Hot Water Resistant',
        },
      ],
    },
    {
      key: 'ip6x',
      image: {
        pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-05-3-2x.webp',
        mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-05-3-3x.webp',
      },
       title: {
        highlight: 'IP6X',
        text: ' Dustproof,\nReady For Rough',
      },

      desc:'ARMOUR OCTA effectively blocks dust and fine particles even under extreme conditions, delivering exceptional performance in all dusty, demanding use scenarios.',

      metrics: [
        {
          value: 'TOP',
          suffix: 'LEVEL',
          label: 'of dust protection',
        }
      ],
    },
    {
      key: 'military',
      image: {
        pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-05-4-2x.webp',
        mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-05-4-3x.webp',
      },
       title: {
        highlight: 'Military',
        text: ' -Grade,\nAnti-shock,\nAnti-scratch',
      },

      desc:'Dual Drop Protection with Scratch-Resistant Coating and TPU Material.',

      metrics: [
        {
          value: '1.2',
          suffix: 'M',
          label: '26-Angle Drop Resistant',
        }
      ],
    },
  ],
};


const voltageSurgeData = {
  image: {
     pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-07-1-2x.webp',
    mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-07-1-3x.webp',
  },

  title:'Voltage Surge\nProtection.\nPower Up Your\nSafety',

  description:'Armour Octa Battery Guard reduces external battery risks by preventing voltage surges caused by mixed, old, or worn-out batteries, helping protect device safety and extend its lifespan.',

  threshold: {
    operator: '>',
    value: '0.9',
    unit: 'V',
    description:'Cut output when voltage\ndifference exceeds 0.9V',
  },
  note:'*All certifications and tests apply to the MOD only, based on standardized third-party lab conditions.',
};


const overheatProtectionData = {
  title: (
    <>
      Charging Overheat Protection
      <br />
      Stay Cool Even on Long Charges
    </>
  ),

  subtitle:'Armour Octa Prevent Prolonged Charging Overheat, Guard Device Performance & Lifespan. Octa features dual USB charging safety protections: overvoltage and over-temperature protection',

  image: {
    pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-08-1-2x.webp',
    mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-08-1-3x.webp',
  },

  temperature: '<75',
  temperatureUnit: '°C',

  temperatureDesc:'Once Beyond, Stop Charging',

  note:'*All certifications and tests apply to the MOD only, based on standardized third-party lab conditions.',
};


  return (
    <div className="product-armour-octa" ref={rootRef}>
      <KvSectionV4
        className="product-armour-octa-kv"
        data={KvSectionData}
        // textChildren={KvTextChildren}
      />
      <BriefSectionV4
        className="product-armour-octa-brief"
        data={BriefSectionData}
      />
      <OctaProtection />
      <MilitaryProof data={militaryProofData}/>
      <OctaProofShowcase data={proofShowcaseData} />
      <OctaVoltageSurge data={voltageSurgeData} />
      <OctaOverheatProtection data={overheatProtectionData}/>
      <TechSection />
      <PodCompatible
        className="product-armour-octa-pod-compatible"
        {...PodCompatibleData}
      />
      <EndProduct
        className="product-armour-octa-end-product"
        data={EndProductData}
        onCheckSpecs={onCheckSpecs}
      />
      {children}
    </div>
  );
}
