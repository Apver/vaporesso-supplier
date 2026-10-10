/**
 * Xros5Mini Layout Component
 * Layout component for XROS 5 Mini product pages
 */
import { useEffect, useRef } from 'react';
import { initScrollAppearAnimate } from '~/utils/scroll_appear_animate';
import { KvSectionV4, BriefSectionV4, EndProduct } from '~/components/ui-v4';
import { VastFeatures } from './VastFeatures';

import {
  PRIX_KV_SECTION_DATA,
  PRIX_BRIEF_SECTION_DATA,
  PRIX_END_PRODUCT_DATA,
  VAST_FEATURES_DATA
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
      <EndProduct
        className="product-vast-end-product"
        data={PRIX_END_PRODUCT_DATA}
        onCheckSpecs={onCheckSpecs}
      />
      {children}
    </div>
  );
}
