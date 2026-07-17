export function ShareSection() {
  return (
    <div className="share-win">
      <picture className="share-bg-pic">
        <source
          media="(min-width: 2440px)"
          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-world-night-club-05-1.svg"
        />
        <source
          media="(min-width: 1024px)"
          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-world-night-club-05-1.svg"
        />
        <source
          media="(max-width: 1023px)"
          srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-Mob-05-1.webp"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-world-night-club-05-1.svg"
          className=""
          alt="POST TO WIN"
        />
      </picture>

      <div className="share-win-wrapper">
        <div className="share-win-container">
          <div className="share-win-header">
            <h3 className="to-top">POST TO WIN</h3>
            <p className="to-top share-win-subtitle">
              Share a photo or video of your World Cup match-day moment with
              your XROS series device for a chance to win exclusive prizes.
            </p>
          </div>
          <div className="share-win-photos-box">
            <div className="share-win-photos-container">
              <picture className="share-photo-card share-photo1">
                <source
                  media="(min-width: 2440px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-2.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-2.webp"
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-2.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-2.webp"
                  className=""
                  alt="POST TO WIN"
                />
              </picture>
              <picture className="share-photo-card share-photo2">
                <source
                  media="(min-width: 2440px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-3.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-3.webp"
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-3.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-3.webp"
                  className=""
                  alt="POST TO WIN"
                />
              </picture>
              <picture className="share-photo-card share-photo3">
                <source
                  media="(min-width: 2440px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-4.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-4.webp"
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-4.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-05-4.webp"
                  className=""
                  alt="POST TO WIN"
                />
              </picture>
            </div>
          </div>
          <div className="share-win-join to-top">
            <h4>HOW TO JOIN</h4>
            <div className="share-join-list">
              <div className="share-join-item">
                •Follow & Tag <span>@vaporesso_global</span>
              </div>
              <div className="share-join-item">
                •Use Hashtags: <span>#XROSWORLDCUP</span>
              </div>
            </div>
          </div>
          <div className="share-win-buttons to-top">
            <div
              data-xwc="copy-button"
              data-copy-text="#XROSWORLDCUP"
              className="copy-button-bix"
            >
              <span
                role="button"
                tabIndex={0}
                className="share-btn share-btn-primary js-copy"
              >
                ADD #XROSWORLDCUP
              </span>
            </div>

            <a
              href="https://www.instagram.com/vaporesso_global/"
              target="_blank"
              className="share-btn share-btn-secondary"
              rel="noreferrer"
            >
              SHARE TO INSTAGRAM
            </a>
          </div>
          <p className="share-win-disclaimer to-top">
            Disclaimer: Images are for illustrative purposes only, actual prizes
            may vary. VAPORESSO reserves the right of final interpretation for
            this activity.
          </p>
        </div>
      </div>
    </div>
  );
}
