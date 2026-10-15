/**
 * Xros5Mini Layout Component
 * Layout component for XROS 5 Mini product pages
 */
import { useEffect, useRef } from 'react';
import { initScrollAppearAnimate } from '~/utils/scroll_appear_animate';
import { KvSectionV4, BriefSectionV4, EndProduct } from '~/components/ui-v4';



import { VastFeatures } from './VastFeatures';
import { VastThreeSellingPoint } from './VastThreeSellingPoint';
import { VastBattery } from './VastBattery';
import { VastPremium } from './VastPremium';
import VastInstaStart from './VastInstaStart';
import VastCustomization from './VastCustomization';
import VastCoreGuard from './VastCoreGuard';
import VastLeakResistance from './VastLeakResistance';
import VastTriCoreExperience from './VastTriCoreExperience';



import {
  PRIX_KV_SECTION_DATA,
  PRIX_BRIEF_SECTION_DATA,
  PRIX_END_PRODUCT_DATA,
  VAST_FEATURES_DATA,
  PRIX_BATTERY_SECTION_DATA,
  PRIX_PREMIUM_SECTION_DATA,
  PRIX_INTASTART_SECTION_DATA,
  VAST_CUSTOMIZATION_SECTION_DATA,
  VAST_CORE_GUARD_DATA,
  VAST_LEAK_RESISTANCE_DATA,
  VAST_TRI_CORE_DATA
} from './constants';
export function VastLayout({ children, onCheckSpecs }) {
  const rootRef = useRef(null);
  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = initScrollAppearAnimate({ root: rootRef.current });
    return cleanup;
  }, []);
  return (

    <div className="product-vast" ref={rootRef}>
      <KvSectionV4
        className="product-vast-kv"
        data={PRIX_KV_SECTION_DATA}
      />
      <BriefSectionV4 className="product-vast-brief" data={PRIX_BRIEF_SECTION_DATA} />
      <VastFeatures data={VAST_FEATURES_DATA} />
      <VastThreeSellingPoint />
      <VastTriCoreExperience data={VAST_TRI_CORE_DATA} />
      <VastLeakResistance data={VAST_LEAK_RESISTANCE_DATA} />
      <VastCoreGuard data={VAST_CORE_GUARD_DATA} />
      <VastBattery data={PRIX_BATTERY_SECTION_DATA} />
      <VastCustomization data={VAST_CUSTOMIZATION_SECTION_DATA} />
      <VastPremium data={PRIX_PREMIUM_SECTION_DATA} />
      <VastInstaStart data={PRIX_INTASTART_SECTION_DATA} />
      <EndProduct
        className="product-vast-end-product"
        data={PRIX_END_PRODUCT_DATA}
        onCheckSpecs={onCheckSpecs}
      />
      {children}
    </div>
  );
}
