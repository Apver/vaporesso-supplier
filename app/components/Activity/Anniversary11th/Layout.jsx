


import {useRef} from 'react';
import {useAnniversary11thLenis,useAnniversary11thPage} from './useAnniversary11thPage';
import VideoBanner from './sections/VideoBanner';
import AnniversaryStory from './sections/AnniversaryStory';
import YearHighlight from './sections/YearHighlights';
import RewardList from './sections/RewardList';
import AppreciationRewards from './sections/AppreciationRewards';
// import StoriesBeyondOrdinary from './sections/StoriesBeyondOrdinary';


export function Anniversary11thLayout() {
  const rootRef = useRef(null);
  useAnniversary11thLenis();
  useAnniversary11thPage(rootRef);
  return (
    <div className="anniversary-11th" ref={rootRef}>
      <div className="uv-main">
      <VideoBanner 
          videoSrc="https://cdn.shopify.com/videos/c/o/v/25452d4a6fc14cff815e467a6e5979fb.mp4"
          mobileVideoSrc="https://cdn.shopify.com/videos/c/o/v/17b9e7750ac94b25995b3a12fa90cea6.mp4"
          posterSrc="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-01-3.webp?v=1785231157"
          mobilePosterSrc="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-banner-Mob.webp?v=1785231157"
        />
        <div className="highlights">
        <AnniversaryStory />
        <YearHighlight />
        <RewardList />
        <AppreciationRewards />
        {/* <StoriesBeyondOrdinary /> */}
        </div>
      </div>
    </div>
  );
}
