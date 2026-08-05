


import {useRef} from 'react';
import {useAnniversary11thLenis,useAnniversary11thPage} from './useAnniversary11thPage';
import VideoBanner from './sections/VideoBanner';
import AnniversaryStory from './sections/AnniversaryStory';
import YearHighlight from './sections/YearHighlights';
import RewardList from './sections/RewardList';
import AppreciationRewards from './sections/AppreciationRewards';
// import StoriesBeyondOrdinary from './sections/StoriesBeyondOrdinary';
import TermsAndConditions from './sections/TermsAndConditions';
// import ExtraordinaryHero from './sections/ExtraordinaryHero';
// import StoryShareModal from './components/StoryShareModal';
// import StoreLocationsModal from './components/StoreLocationsModal';


export function Anniversary11thLayout() {
  const rootRef = useRef(null);
  useAnniversary11thLenis();
  useAnniversary11thPage(rootRef);
  return (
    <div className="anniversary-11th" ref={rootRef}>
      <div className="uv-main">
      <VideoBanner 
          videoSrc="https://cdn.shopify.com/videos/c/o/v/f1b6690e5c434f33a28fd51629277bfb.mp4"
          mobileVideoSrc="https://cdn.shopify.com/videos/c/o/v/be6ccba440bf464b913dad3a56928fe2.mp4"
          posterSrc="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-01-3-new1.webp"
          mobilePosterSrc="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-Mob-01-3-new1.webp"
        />
        <div className="highlights">
        <AnniversaryStory />
        <YearHighlight />
        <RewardList />
        <AppreciationRewards />
        {/* <StoriesBeyondOrdinary /> */}
        {/* <ExtraordinaryHero /> */}
        <TermsAndConditions />
       
        </div>
      </div>
      {/* <StoryShareModal /> */}
        {/* <StoreLocationsModal /> */}
    </div>
  );
}
