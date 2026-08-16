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
 OctaOverheatProtection,
 OctaOvertimeProtection,
 OctaComparison,
 OctaTextureShowcase,
 OctaComfortHold,
 OctaDetailShowcase
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
  const BriefSectionData = {
    // title: 'Swap Panels, Premium Style',
    desc: "Hey dude, how are you doing?\nWe've shared highs and got through lows side by side. Vaporesso has been there for all your key moments, \nalways protecting you and sticking around.\nThe Armour series is your reliable old pal: we never cut corners on making solid vape mods, and never stray from our original mission. Just like you, we're still on the road to getting better, chasing a brighter future.\nCheers to us, to all our shared memories, and to what's ahead.",
    pcImageUrl:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-02-1-2x.webp',
    mobImageUrl:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-02-1-3x.webp',
    btnLink:"https://www.vaporesso.com/"
  };
  const PodCompatibleData = {
    title: 'Compatible With Multiple GTi Coils',
    description:
      'With GTi 0.2Ω DUAL MESH and 0.4Ω DUAL MESH coil included, the iTank T is also fully compatible with all the GTi coil platfrom',
      subTitle:"New 0.15Ω Dual Mesh Option",
    podList: [
      {
        id: 'pod1',
        version: 'Pre-installed',
        imgUrl:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-15-1-2x.webp',
        ohm: '0.2Ω DUAL MESH',
        type: '60-75W\nBEST: 65W'
      },
      {
        id: 'pod2',
        version: 'In-Box',
        imgUrl:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-15-2-2x.webp',
        ohm: '0.4Ω DUAL MESH',
        type: '50-60W\nBEST: 55W'
      },
      {
        id: 'pod3',
        version: 'Compatible',
        imgUrl:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-15-3-2x.webp',
        ohm: '0.15Ω DUAL MESH',
        type: '75-90W\nBEST: 85W',
         tag: 'New'
      },
      {
        id: 'pod4',
        version: 'Compatible',
        imgUrl:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-15-4-2x.webp',
        ohm: 'GTi 0.15Ω MESH',
        type: '75-90W\nBEST: 85W',
      },
      {
        id: 'pod5',
        version: 'Compatible',
        imgUrl:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-15-5-2x.webp',
        ohm: '0.2Ω MESH',
        type: '60-75W\nBEST: 65W',
      },
      {
        id: 'pod6',
        version: 'Compatible',
        imgUrl:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-15-6-2x.webp',
        ohm: '0.4Ω MESH',
        type: '50-60W\nBEST: 55W',
      },
      {
        id: 'pod7',
        version: 'Compatible',
        imgUrl:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-15-7-2x.webp',
        ohm: '0.5Ω MESH',
        type: '30-40W\nBEST: 35W',
      },
    ],
  };
  const EndProductData = {
    title: 'ARRMOUR Octa',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-17-1-2x.webp',
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

  const detailData = {
    title: 'All For Armour, Down to Detail',
    items: {
      tank: {
        title: 'Visible Tank TPU Cover',
        description: '6ML Capacity Tank Protector',
        image: {
          pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-11-1-2x.webp',
          mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-11-2-3x.webp',
        },
      },

      lock: {
        title: (
          <>
            Swipe To Lock/
            <br />
            Unlock
          </>
        ),
        video: {
          pc: 'https://cdn.shopify.com/videos/c/o/v/539688b323a342d48e61015d92b061d2.mp4',
          mobile: 'https://cdn.shopify.com/videos/c/o/v/11fcae10524144a2a6f0a27abcd26203.mp4',
        },
      },

      usb: {
        title: (
          <>
            USB port
            <br />
            Silicone Plug
          </>
        ),
        image: {
          pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-11-4-2x.webp',
          mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-11-3-3x.webp',
        },
      },

      collision: {
        title: (
          <>
            Anti-<br className='des-visible'/>Collision
            <br className='mb-visible' />
            Pad:
          </>
        ),
        description: (
          <>
            Absorbs Impact,
            <br />
            Reduces Damage
          </>
        ),
        image: {
          pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-11-5-2x.webp',
          mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-11-4-3x.webp',
        },
      },

      cage: {
        title: (
          <>
            Cage structure:
            <br className='mb-visible' />
            &nbsp;Armor-like guard
          </>
        ),
        image: {
          pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-11-3-2x.webp',
          mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-11-5-3x.webp',
        },
      },
    },
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
    const militaryProofData1 = {
    mark: '2X',
    background: {
      pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-06-1-2x.webp',
      mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-06-1-3x.webp',
    },

    foreground: {
      pc:   'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-06-2-2x.webp',
      mobile:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-06-2-3x.webp',
    },

    title: {
      before: 'Industry-First',
      highlight: '2X',
      after: 'Battery Guard',
    },

    subtitle: 'Built for Pro-Level Safety',
  };

  const militaryProofData2 = {
    mark: '2X',
    background: {
      pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-09-1-2x.webp',
      mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-09-1-3x.webp',
    },

    foreground: {
      pc:   'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-09-2-2x.webp',
      mobile:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-09-2-3x.webp',
    },

    title: {
      before: 'Robust',
      highlight: '2X',
      after: 'Daily Protection',
    },

    subtitle: 'Engineered for Confidence, Made to Last',
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
      mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-07-1-2x.webp',
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
      mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-08-1-3x.webp',
    },

    temperature: '<75',
    temperatureUnit: '°C',

    temperatureDesc:'Once Beyond, Stop Charging',

    note:'*All certifications and tests apply to the MOD only, based on standardized third-party lab conditions.',
  };


  const overtimeProtectionData = {
    title: (
      <>
        V2.0 Overtime Protection
        <br />
        Prevent Accidental
        <br />
        10s Long-Press
      </>
    ),

    image: {
      l1: {
        pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour_octa-10-1-2x-new1.webp',
        mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour_octa-mob-10-1-3x-new1.webp',
      },

      l2: {
        pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour_octa-10-2-2x-new1.webp',
        mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour_octa-mob-10-2-3x-new1.webp',
      },
    },
    level1: {
      name: 'L1',
      description: '1 overtime trigger.',
      accent: 'Output cut off.',
    },

    level2: {
      name: 'L2',
      description:'2 overtime triggers\nwithin 2 mins.',
      accent: 'Power off.'
    }
  };

  const comparisonData = {
    title: "WHAT'S NEW IN OCTA?",

    products: [
      {
        key: 'octa',
        name: <>ARMOUR OCTA</>,
        highlight: true,
        image: {
          pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-16-1-2x.webp',
          mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-16-1-2x.webp',
        },
      },
      {
        key: 'max',
        name: 'ARMOUR MAX',
        image: {
          pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-16-2-2x.webp',
          mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-16-2-2x.webp',
        },
      },
    ],

    rows: [
      {
        key: 'waterproof',
        label: 'Water-proof',
        values: {
          octa: {
            title: 'IP69K+IP68',
            upgrade: true,
          },
          max: {
            title: 'All TPU Protection',
          },
        },
      },
      {
        key: 'drop',
        label: 'Drop resistance',
        values: {
          octa: {
            title: 'MIL-STD-810H',
            upgrade: true,
          },
          max: {
            title: 'All TPU Protection',
          },
        },
      },
    {
    key: 'protection',
    group: true,

    labels: [
      {
        text: 'Battery Guard',
      },
      {
        text: (
          <>
            Voltage Surge Protection
          </>
        ),
        muted: true,
      },
      {
        text: (
          <>
            CHARGING OVERHEAT Protection
          </>
        ),
        muted: true,
      },
    ],

    values: {
      octa: [
        {
          title: 'NEW',
          upgrade: true,
        },
        {
          type: 'dot',
          variant: 'orange',
        },
        {
          type: 'dot',
          variant: 'orange',
        },
      ],

      max: [
        {
          type: 'dot',
          variant: 'outline',
        },
        {
          text: 'NA',
          muted: true,
        },
        {
          text: 'NA',
          muted: true,
        },
      ],
    },
  },
      {
        key: 'overtime',
        label: (
          <>
            Overtime Protection
            <br />
            Overtime: Fire Hold&gt;10±1S
          </>
        ),
        groupStart: true,
        values: {
          octa: {
            title: 'V2.0, 2X Safety',
            upgrade: true,
            opacity: true,
            description: (
              <>
                L1: Overtime 1 time. Output cut off.
                <br />
                L2: Overtime 2 times within 2 mins.
                <br />
                Power off.
              </>
            ),
          },
          max: {
            title: 'V1.0',
              opacity: true,
            description: (
              <>
                L1: Consistent Overtime. Output Off
                <br />
                L2: NA
              </>
            ),
          },
        },
      },
      {
        key: 'coil',
        label: 'Coil',
        groupStart: true,
        values: {
          octa: {
            title: 'GTI Dual Mesh',
            upgrade: true,
          },
          max: {
            title: 'Single Mesh',
          },
        },
      },
      {
        key: 'battery',
        label: 'Battery',
        values: {
          octa: {
            title: '18650 *2',
          },
          max: {
            title: '21700/18650 *2',
          },
        },
      },
    ],
  };

  const comfortData = {
    eyebrow:'Soft and Anti-slip texture, Skin-friendly cushioning feel',

    title: (
      <>
        Comfortable to Hold
        <br className='octa--mb__visible' />
        Perfectly Fits in Your Palm
      </>
    ),

    description: (
      <>
        The Armour Octa features the same premium silicone surface used on motorcycle
        <br className='octa--mb__visible' />
        grips, offering a comfortable, ergonomic hold with sweat-resistant, anti-slip
        <br  className='octa--mb__visible' />
        performance for enhanced long-term durability.
      </>
    ),

    image: {
      background: {
        pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-13-1-2x.webp',
        mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-13-1-3x.webp',
      },

      hand: {
        pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-13-2-2x.webp',
        mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-mob-13-2-3x.webp',
      },
    },
  };

  const textureData = {
  title: (
    <>
      Premium & Elegant Texture
      <br />
      Up to Your Style
    </>
  ),

  items: [
    {
      key: 'green',
      name: 'Titanium Grey',
      color: '#4EBFAB',
      image: {
        pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-new-octa-14-1-2x.webp',
        mobile:'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-new-octa-14-1-2x.webp',
      },
    },
    {
      key: 'grey',
      name: 'Titanium Grey',
      color: '#BABABA',
      image: {
        pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-new-octa-14-2-2x.webp',
        mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-new-octa-14-2-2x.webp',
      },
    },
    {
      key: 'blue',
      name: 'Rally Blue',
      color: '#4C80FA',
      image: {
        pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-new-octa-14-3-2x.webp',
        mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-new-octa-14-3-2x.webp',
      },
    },
    {
      key: 'white',
      name: 'Aero White',
      color: '#C15B8B',
      image: {
        pc: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-new-octa-14-4-2x.webp',
        mobile: 'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-new-octa-14-4-2x.webp',
      },
    },
  ],
};

  return (
    <div className="product-armour-octa" ref={rootRef}>
      <KvSectionV4
        className="product-armour-octa-kv"
        data={KvSectionData}
      />
      <BriefSectionV4
        className="product-armour-octa-brief"
        data={BriefSectionData}
      />
      <OctaProtection />
      <MilitaryProof data={militaryProofData} />
      <OctaProofShowcase data={proofShowcaseData} />
      <MilitaryProof data={militaryProofData1}  className="military-proof1" />
      <OctaVoltageSurge data={voltageSurgeData} />
      <OctaOverheatProtection data={overheatProtectionData} />
      <MilitaryProof data={militaryProofData2} className="military-proof2" />
      <OctaOvertimeProtection data={overtimeProtectionData} />
      <OctaDetailShowcase data={detailData} />
       <TechSection />
    
      <OctaComfortHold data={comfortData} />
      <OctaTextureShowcase data={textureData} />
      <PodCompatible
        className="product-armour-octa-pod-compatible"
        {...PodCompatibleData}
      />
        <OctaComparison  data={comparisonData} />
      <EndProduct
        className="product-armour-octa-end-product"
        data={EndProductData}
        onCheckSpecs={onCheckSpecs}
      />
      {children}
    </div>
  );
}
