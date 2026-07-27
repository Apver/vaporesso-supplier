import {PhotoWall} from '~/components/Activity/PhotoDemo/PhotoWall';

const PHOTO_WALL_IMAGES = Array.from(
  {length: 29},
  (_, i) =>
    `https://cdn.shopify.com/s/files/1/0703/9873/8521/files/innovation-x-lifestyle-${i + 1}.webp?v=0.1`,
);

const PHOTO_WALL_GROUP_COUNTS = [6, 6, 6, 5, 6];

export function PhotoDemoLayout() {
  return (
    <div className="photo-demo-page">
      <PhotoWall
        images={PHOTO_WALL_IMAGES}
        groupCounts={PHOTO_WALL_GROUP_COUNTS}
        backgroundPc="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/innovation-x-02-bg.webp"
        backgroundMob="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/innovation-x-Mob-02-bg.webp"
      >
        <h3 className="photo-demo-page__title">
          TRACING THE BRILLIANCE OF
          <span className="photo-demo-page__title-accent">INNOVATION</span>
        </h3>
        <p className="photo-demo-page__desc photo-demo-page__desc--accent">
          From 2015 to 2025, VAPORESSO has been relentlessly chasing the zenith
          of performance under three core values – innovation, style and
          reliability, striving to build excellence into every product. Indeed,
          true brilliance never stops.
        </p>
        <p className="photo-demo-page__desc">
          Having endured a decade of unwavering dedication, VAPORESSO’s
          innovation engine continues to hum with power. In the relentless
          pursuit of groundbreaking innovation and the redefinition of
          exceptional experiences, an endless journey of brilliance has been
          forged.
        </p>
        <p className="photo-demo-page__desc">
          As the next 10 years unfold, VAPORESSO will forge a brighter, vibrant
          future together with hundreds of millions users, ever forward.
        </p>
      </PhotoWall>
    </div>
  );
}
