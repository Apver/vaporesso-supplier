export function CampaignDisclaimer() {
  return (
    <div className="campaign-disclaimer">
      <div className="campaign-disclaimer__tran">
        <div className="campaign-disclaimer-container">
          <div className="campaign-disclaimer-pic-box">
            <picture className="campaign-disclaimer-pic to-top">
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-10-1.webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-10-1.webp"
              />
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-10-1.webp"
                className=""
                alt=""
              />
            </picture>
            <picture className="net-ball">
              <source
                media="(min-width: 2440px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-02-1.webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-02-1.webp"
              />
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-Mob-02-1.webp"
              />
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-02-1.webp"
                className="footbal-fix-image"
                alt=""
              />
            </picture>
          </div>
          <div className="campaign-disclaimer-cnt">
            <h3 className="campaign-disclaimer-h3 to-top">Disclaimer</h3>
            <div className="disclaimer-list to-top">
              <p className="disclaimer-item">
                1. Prize images shown on this page are for reference only.
                Please refer to the actual prizes delivered.
              </p>
              <p className="disclaimer-item">
                2. Lifestyle images on this page are for illustrative purposes
                only.
              </p>
              <p className="disclaimer-item">
                3. Participants must comply with applicable local laws and
                regulations and meet the legal age requirement in their place of
                residence.
              </p>
              <p className="disclaimer-item">
                4. Participants are responsible for ensuring that any images,
                text, or other content they post or submit are original or
                properly authorized, and do not infringe any third parties&apos;
                copyright, portrait rights, trademark rights, privacy rights, or
                any other lawful rights.
              </p>
              <p className="disclaimer-item">
                5. By participating in this campaign and publishing relevant
                content as required, participants are deemed to grant VAPORESSO
                the right to display, repost, and use their publicly available
                content for campaign-related promotion, including but not
                limited to the official website, social media platforms, and
                other brand communication channels.
              </p>
              <p className="disclaimer-item">
                6. VAPORESSO reserves the right to review, edit, adapt, display,
                hide, or remove any user-generated content. If any rights holder
                believes that any displayed content may be infringing, they may
                contact us through the official channel with relevant supporting
                materials, and we will handle the matter promptly upon
                verification.
              </p>
              <p className="disclaimer-item">
                7. This campaign is not sponsored, endorsed, administered by, or
                associated with Instagram or any other third-party social media
                platform.
              </p>
              <p className="disclaimer-item">
                8. VAPORESSO reserves the right of final interpretation of this
                campaign.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
