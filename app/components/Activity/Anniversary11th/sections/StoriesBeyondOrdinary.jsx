const StoriesBeyondOrdinary = () =>{
  return (
    <section className="stories-beyond">
      <header className="stories-beyond__header">
        <h2 className="stories-beyond__title">
          <span className="stories-beyond__title-script">
            Stories
          </span>

          <span className="stories-beyond__title-normal">
            Beyond Ordinary
          </span>
        </h2>

        <div className="stories-beyond__description">
          <p>
            One choice, one challenge, one transformation.
          </p>

          <p>
            Every single moment is an opportunity to take
            action and move beyond ordinary.
          </p>

          <p>
            Here, real voices unite. In their own unique
            ways, they continue to push forward and break
            boundaries.
          </p>
        </div>
      </header>

      <div className="stories-beyond__viewport">
        <div className="stories-beyond__row stories-beyond__row--1">
          <article
            className="story-card"
            style={{
              '--story-card-background': '#b8ff00',
              '--story-card-color': '#000000',
              '--story-card-width': '460px'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="/images/stories/ethan.jpg"
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-ethan"
                    className="story-card__text"
                  >
                    Happy 10th Anniversary, VAPORESSO! A
                    decade of innovation, flavor, and
                    reliability—here’s to many more amazing
                    puffs!
                  </p>
                </div>

                <strong className="story-card__name">
                  Ethan
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-ethan"
              aria-expanded="false"
              aria-label="Read Ethan's full story"
              hidden
            />
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#087b43',
              '--story-card-color': '#ffffff',
              '--story-card-width': '460px'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="/images/stories/wilson.jpg"
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-wilson"
                    className="story-card__text"
                  >
                    I became a mother, and that moment
                    changed everything for me. It made me
                    want to do better, dream bigger, and
                    become someone my daughter could be
                    proud of. For me, moving beyond ordinary
                    means proving that change is possible
                    when you refuse to give up.
                  </p>
                </div>

                <strong className="story-card__name">
                  Wilson
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-wilson"
              aria-expanded="false"
              aria-label="Read Wilson's full story"
              hidden
            />
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#8ed6f2',
              '--story-card-color': '#000000',
              '--story-card-width': '460px'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="/images/stories/tracie.jpg"
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-tracie"
                    className="story-card__text"
                  >
                    A customer once came into my store after
                    a serious motorcycle accident. He had
                    been through so much, but the VAPORESSO
                    Armour G had made it through the wreck.
                    That moment turned into a conversation
                    about strength, resilience, and finding
                    a way to move forward.
                  </p>
                </div>

                <strong className="story-card__name">
                  Tracie
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-tracie"
              aria-expanded="false"
              aria-label="Read Tracie's full story"
              hidden
            />
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#c95f18',
              '--story-card-color': '#ffffff',
              '--story-card-width': '470px'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="/images/stories/matthew.jpg"
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-matthew"
                    className="story-card__text"
                  >
                    I found vaping during a difficult
                    chapter in my life. What started as
                    curiosity became part of a new routine
                    and a new direction. Over time, I learned
                    more, connected with the community, and
                    found a passion for helping others
                    understand the products I trust.
                  </p>
                </div>

                <strong className="story-card__name">
                  Matthew
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-matthew"
              aria-expanded="false"
              aria-label="Read Matthew's full story"
              hidden
            />
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#148bd0',
              '--story-card-color': '#ffffff',
              '--story-card-width': '390px'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="/images/stories/olivia.jpg"
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-olivia"
                    className="story-card__text"
                  >
                    Every challenge taught me something new
                    about patience, confidence, and the
                    courage to keep moving forward.
                  </p>
                </div>

                <strong className="story-card__name">
                  Olivia
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-olivia"
              aria-expanded="false"
              aria-label="Read Olivia's full story"
              hidden
            />
          </article>
        </div>

        <div className="stories-beyond__row stories-beyond__row--2">
          <article
            className="story-card"
            style={{
              '--story-card-background': '#7700c8',
              '--story-card-color': '#ffffff',
              '--story-card-width': '470px'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="/images/stories/sophia.jpg"
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-sophia"
                    className="story-card__text"
                  >
                    An ordinary moment came when I decided
                    to make a real change for myself. I
                    wanted to step away from old habits and
                    choose better for my future. Using my
                    VAPORESSO device made that decision feel
                    possible, and I never looked back.
                  </p>
                </div>

                <strong className="story-card__name">
                  Sophia
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-sophia"
              aria-expanded="false"
              aria-label="Read Sophia's full story"
              hidden
            />
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#dedede',
              '--story-card-color': '#000000',
              '--story-card-width': '480px'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="/images/stories/tracy.jpg"
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-tracy"
                    className="story-card__text"
                  >
                    My journey started with a personal
                    decision to change old habits after many
                    years. VAPORESSO was my go-to from day
                    one. That experience inspired me to help
                    other adult customers on their own
                    journeys, and eventually, I opened my own
                    vape shop.
                  </p>
                </div>

                <strong className="story-card__name">
                  Tracy
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-tracy"
              aria-expanded="false"
              aria-label="Read Tracy's full story"
              hidden
            />
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#0076b5',
              '--story-card-color': '#d7ff00',
              '--story-card-width': '480px'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="/images/stories/nick.jpg"
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-nick"
                    className="story-card__text"
                  >
                    I enjoy helping adult customers discover
                    the VAPORESSO XROS because it’s what I
                    personally used and trusted for years.
                    When I recommend it, I’m speaking from
                    real experience. Moving beyond ordinary
                    means sharing something I genuinely
                    believe in.
                  </p>
                </div>

                <strong className="story-card__name">
                  Nick
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-nick"
              aria-expanded="false"
              aria-label="Read Nick's full story"
              hidden
            />
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#b8f600',
              '--story-card-color': '#000000',
              '--story-card-width': '480px'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="/images/stories/wally.jpg"
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-wally"
                    className="story-card__text"
                  >
                    After adding VAPORESSO to our shop, I
                    noticed a different kind of customer
                    experience—experienced, knowledgeable,
                    and clear about what they wanted. Many
                    asked for VAPORESSO by name. To me, that
                    kind of loyalty shows the trust the brand
                    has earned.
                  </p>
                </div>

                <strong className="story-card__name">
                  Wally
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-wally"
              aria-expanded="false"
              aria-label="Read Wally's full story"
              hidden
            />
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#8bd4ef',
              '--story-card-color': '#000000',
              '--story-card-width': '400px'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="/images/stories/tom.jpg"
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-tom"
                    className="story-card__text"
                  >
                    I have met so many inspiring people
                    through this community. Their stories
                    remind me that meaningful change often
                    starts with one simple decision.
                  </p>
                </div>

                <strong className="story-card__name">
                  Tom
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-tom"
              aria-expanded="false"
              aria-label="Read Tom's full story"
              hidden
            />
          </article>
        </div>
      </div>

      <footer className="stories-beyond__footer">
        <h3>
          Got a story? Tell us how you moved beyond
          ordinary.
        </h3>

        <p>
          Selected stories may be featured on our official
          platforms, included in the anniversary film, or
          showcased in user story videos.
        </p>

        <a
          className="stories-beyond__button"
          href="/pages/share-your-story"
        >
          Share Your Story
        </a>
      </footer>
    </section>
  );
}

export default StoriesBeyondOrdinary;