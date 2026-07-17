export function GoldenGoalSection() {
  return (
    <div className="golden-goal-track">
      <div className="golden-goal-module">
        <div className="aiming-grid cricle-animate">
          <div className="axis horizontal"></div>
          <div className="axis vertical"></div>
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>

        <div className="content-container to-top">
          <picture className="jersey-wrapper">
            <source
              media="(min-width: 2440px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-2.webp"
            />
            <source
              media="(min-width: 1024px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-2.webp"
            />
            <source
              media="(max-width: 1023px)"
              srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-2.webp"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-2.webp"
              className="jersey-img"
              alt=""
            />
          </picture>

          <h1 className="challenge-title">60S GOLDEN GOAL CHALLENGE</h1>

          <p className="challenge-desc">
            Prime your XROS 6 in 60s, answer to advance, and shoot to score! Win
            your way to the Lucky Wheel and unlock exclusive rewards now!
          </p>
        </div>
        <picture className="static-ball">
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
            alt=""
          />
        </picture>
      </div>
    </div>
  );
}
