export function PrizeSection() {
  return (
    <div data-xwc="personalized-app">
      <div className="prize-section">
        <div className="prize-header-content to-top">
          <h2 className="">JOIN GAME, WIN BIG</h2>
          <p className="">
            Take part in our interactive quiz game for a chance to enter the
            Lucky Draw. Or share your World Cup match-day moments with your XROS
            series device on social media to join the prize draw.
          </p>
        </div>
        <div className="prize-cards">
          <div className="prize-cards-container">
            <div className="prize-card grand-prize animate-slide-left mobile-to-top">
              <picture className="prize-image-placeholder">
                <source
                  media="(min-width: 2440px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-1.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-1.webp"
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-1.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-1.webp"
                  className="banner-image"
                  alt=""
                />
              </picture>
              <div className="prize-card-ct">
                <div className="prize-card-header">
                  <h3>GRAND PRIZE</h3>
                  <p className="prize-desc">
                    AFA Signed Jersey × 2 <br />
                    World Cup Match Ticket × 2
                  </p>
                </div>
                <p className="prize-footer">
                  Available Exclusively Through
                  <br />
                  The Official Website Quiz Game
                </p>
              </div>
            </div>

            <div className="prize-card second-prize animate-slide-up mobile-to-top">
              <picture className="prize-image-placeholder">
                <source
                  media="(min-width: 2440px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-3.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-3.webp"
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-3.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-3.webp"
                  className="banner-image"
                  alt=""
                />
              </picture>
              <div className="prize-card-ct">
                <div className="prize-card-header">
                  <h3>SECOND PRIZE</h3>
                  <p className="prize-desc">
                    VAPORESSO × AFA Co-Branded Gift Set × 18
                    <br />
                    (Scarf, Cap, Tumbler, Fridge Magnet)
                  </p>
                </div>
                <p className="prize-footer">
                  Merch Combinations Are
                  <br />
                  Subject To Actual Delivery
                </p>
              </div>
            </div>

            <div className="prize-card third-prize animate-slide-right mobile-to-top">
              <picture className="prize-image-placeholder">
                <source
                  media="(min-width: 2440px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-2.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-2.webp"
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-2.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-03-2.webp"
                  className="banner-image"
                  alt=""
                />
              </picture>

              <div className="prize-card-ct">
                <div className="prize-card-header">
                  <h3>THIRD PRIZE</h3>
                  <p className="prize-desc">XROS 6 × 18</p>
                </div>
                <p className="prize-footer">
                  12 Winners From The Website Game
                  <br />+ 6 Winners From Social Sharing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
