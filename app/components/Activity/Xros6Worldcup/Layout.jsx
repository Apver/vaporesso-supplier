import {useRef} from 'react';
import {CampaignDisclaimer} from './sections/CampaignDisclaimer';
import {CampaignHero} from './sections/CampaignHero';
import {CampaignTimeline} from './sections/CampaignTimeline';
import {FloatingBalls} from './sections/FloatingBalls';
import {GallerySection} from './sections/GallerySection';
import {GoldenGoalSection} from './sections/GoldenGoalSection';
import {KvBanner} from './sections/KvBanner';
import {ParallaxSection} from './sections/ParallaxSection';
import {PrizeAnnouncement} from './sections/PrizeAnnouncement';
import {PrizeSection} from './sections/PrizeSection';
import {QuizModals} from './sections/QuizModals';
import {QuizSection} from './sections/QuizSection';
import {ShareSection} from './sections/ShareSection';
import {useXros6WorldcupLenis, useXros6WorldcupPage} from './useXros6WorldcupPage';

export function Xros6WorldcupLayout() {
  const rootRef = useRef(null);
  useXros6WorldcupLenis();
  useXros6WorldcupPage(rootRef);

  return (
    <div className="xros6-worldcup" ref={rootRef}>
      <div className="uv-main">
        <KvBanner />
        <div className="highlights">
          <CampaignTimeline />
          <PrizeSection />
          <GoldenGoalSection />
          <QuizSection />
          <ShareSection />
          <GallerySection />
          <ParallaxSection />
          <CampaignHero />
          <PrizeAnnouncement />
          <CampaignDisclaimer />
          <QuizModals />
          <FloatingBalls />
        </div>
      </div>
    </div>
  );
}
