import {openStoryShareModal} from '../components/StoryShareModal';

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
              '--story-card-background': '#C0F51A',
              '--story-card-color': '#000000',
              '--story-card-width': '46rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-2.webp"
                  alt=""
                  loading="lazy"
                />
                 <strong className="story-card__name">
                  Ethan
                </strong>
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-ethan1"
                    className="story-card__text"
                  >
                    Happy 10th Anniversary, VAPORESSO! A
                    decade of innovation, flavor, and
                    reliability—here’s to many more amazing
                    puffs!
                  </p>
                </div>

               
              </div>
                  <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-ethan1"
              aria-expanded="false"
              aria-label="Read Ethan's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

        
        
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#046A38',
              '--story-card-color': '#ffffff',
              '--story-card-width': '46rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-3.webp"
                  alt=""
                  loading="lazy"
                />
                  <strong className="story-card__name">
                  Wilson
                </strong>
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-wilson1"
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

              
              </div>
                 <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-wilson1"
              aria-expanded="false"
              aria-label="Read Wilson's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

         
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#78C1E6',
              '--story-card-color': '#000000',
              '--story-card-width': '46rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-4.webp"
                  alt=""
                  loading="lazy"
                />
                   <strong className="story-card__name">
                  Tracie
                </strong>
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-tracie1"
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

             
              </div>
                          <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-tracie1"
              aria-expanded="false"
              aria-label="Read Tracie's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>


          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#CA6417',
              '--story-card-color': '#fff',
              '--story-card-width': '46rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-5.webp"
                  alt=""
                  loading="lazy"
                />
                 <strong className="story-card__name">
                  Matthew
                </strong>
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-matthew1"
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

               
              </div>
               <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-matthew1"
              aria-expanded="false"
              aria-label="Read Matthew's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

           
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#78C1E6',
              '--story-card-color': '#000',
              '--story-card-width': '46rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-1.webp"
                  alt=""
                  loading="lazy"
                />
                  <strong className="story-card__name">
                  Olivia
                </strong>
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

              
              </div>
                <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-olivia"
              aria-expanded="false"
              aria-label="Read Olivia's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

          
          </article>
           <article
            className="story-card"
            style={{
              '--story-card-background': '#C0F51A',
              '--story-card-color': '#000000',
              '--story-card-width': '46rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-2.webp"
                  alt=""
                  loading="lazy"
                />
                 <strong className="story-card__name">
                  Ethan
                </strong>
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

               
              </div>
                 <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-ethan"
              aria-expanded="false"
              aria-label="Read Ethan's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

         
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#046A38',
              '--story-card-color': '#ffffff',
              '--story-card-width': '46rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-3.webp"
                  alt=""
                  loading="lazy"
                />
                  <strong className="story-card__name">
                  Wilson
                </strong>
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

              
              </div>
                <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-wilson"
              aria-expanded="false"
              aria-label="Read Wilson's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

          
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#78C1E6',
              '--story-card-color': '#000000',
              '--story-card-width': '46rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-4.webp"
                  alt=""
                  loading="lazy"
                />
                   <strong className="story-card__name">
                  Tracie
                </strong>
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

             
              </div>
              
            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-tracie"
              aria-expanded="false"
              aria-label="Read Tracie's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#CA6417',
              '--story-card-color': '#fff',
              '--story-card-width': '46rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-5.webp"
                  alt=""
                  loading="lazy"
                />
                 <strong className="story-card__name">
                  Matthew
                </strong>
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

               
              </div>
              
            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-matthew"
              aria-expanded="false"
              aria-label="Read Matthew's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#78C1E6',
              '--story-card-color': '#000',
              '--story-card-width': '46rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-1.webp"
                  alt=""
                  loading="lazy"
                />
                  <strong className="story-card__name">
                  Olivia
                </strong>
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

              
              </div>
                <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-olivia"
              aria-expanded="false"
              aria-label="Read Olivia's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

          
          </article>
        </div>

        <div className="stories-beyond__row stories-beyond__row--2">
          <article
            className="story-card"
            style={{
              '--story-card-background': '#6200A3',
              '--story-card-color': '#ffffff',
              '--story-card-width': '48rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-6.webp"
                  alt=""
                  loading="lazy"
                />
                 <strong className="story-card__name">
                  Andy
                </strong>
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-sophia"
                    className="story-card__text"
                  >
                   My extraordinary moment came when I decided to make a real change for myself. I wanted to move away from old habits and choose better for my mindset. Using my VAPORESSO device felt like taking control again, one small choice at a time. VAPORESSO! A decade of innovation, flavor, and reliability—here’s to many more amazing puffs!
                  </p>
                </div>

               
              </div>
                   <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-sophia"
              aria-expanded="false"
              aria-label="Read Sophia's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

       
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#E3E3E3',
              '--story-card-color': '#000000',
              '--story-card-width': '48rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-7.webp"
                  alt=""
                  loading="lazy"
                />
                  <strong className="story-card__name">
                  Tracy
                </strong>
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

              
              </div>
                  <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-tracy"
              aria-expanded="false"
              aria-label="Read Tracy's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

        
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#005C9E',
              '--story-card-color': '#FFE842',
              '--story-card-width': '48rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-8.webp"
                  alt=""
                  loading="lazy"
                />
                
                <strong className="story-card__name">
                  Nick
                </strong>
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

              </div>
                   <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-nick"
              aria-expanded="false"
              aria-label="Read Nick's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

       
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#C0F51A',
              '--story-card-color': '#000000',
              '--story-card-width': '48rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-9.webp"
                  alt=""
                  loading="lazy"
                />
                
                <strong className="story-card__name">
                  Wally
                </strong>
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

              </div>
                 <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-wally"
              aria-expanded="false"
              aria-label="Read Wally's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

         
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#78C1E6',
              '--story-card-color': '#000000',
              '--story-card-width': '48rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-10.webp"
                  alt=""
                  loading="lazy"
                />
                  <strong className="story-card__name">
                  Tom
                </strong>
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

              
              </div>
              
            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-tom"
              aria-expanded="false"
              aria-label="Read Tom's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

          </article>
            <article
            className="story-card"
            style={{
              '--story-card-background': '#6200A3',
              '--story-card-color': '#ffffff',
              '--story-card-width': '48rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-6.webp"
                  alt=""
                  loading="lazy"
                />
                 <strong className="story-card__name">
                  Andy
                </strong>
              </div>

              <div className="story-card__content">
                <div className="story-card__text-wrapper">
                  <p
                    id="story-content-sophia"
                    className="story-card__text"
                  >
                   My extraordinary moment came when I decided to make a real change for myself. I wanted to move away from old habits and choose better for my mindset. Using my VAPORESSO device felt like taking control again, one small choice at a time. VAPORESSO! A decade of innovation, flavor, and reliability—here’s to many more amazing puffs!
                  </p>
                </div>

               
              </div>
                  <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-sophia"
              aria-expanded="false"
              aria-label="Read Sophia's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

        
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#E3E3E3',
              '--story-card-color': '#000000',
              '--story-card-width': '48rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-7.webp"
                  alt=""
                  loading="lazy"
                />
                  <strong className="story-card__name">
                  Tracy
                </strong>
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

              
              </div>
                   <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-tracy"
              aria-expanded="false"
              aria-label="Read Tracy's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

       
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#005C9E',
              '--story-card-color': '#FFE842',
              '--story-card-width': '48rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-8.webp"
                  alt=""
                  loading="lazy"
                />
                
                <strong className="story-card__name">
                  Nick
                </strong>
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

              </div>
                 <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-nick"
              aria-expanded="false"
              aria-label="Read Nick's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

         
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#C0F51A',
              '--story-card-color': '#000000',
              '--story-card-width': '48rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-9.webp"
                  alt=""
                  loading="lazy"
                />
                
                <strong className="story-card__name">
                  Wally
                </strong>
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

              </div>
                <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-wally"
              aria-expanded="false"
              aria-label="Read Wally's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

          
          </article>

          <article
            className="story-card"
            style={{
              '--story-card-background': '#78C1E6',
              '--story-card-color': '#000000',
              '--story-card-width': '48rem'
            }}
          >
            <div className="story-card__surface">
              <div className="story-card__avatar">
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-10.webp"
                  alt=""
                  loading="lazy"
                />
                  <strong className="story-card__name">
                  Tom
                </strong>
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

              
              </div>
              
            <button
              type="button"
              className="story-card__toggle"
              aria-controls="story-content-tom"
              aria-expanded="false"
              aria-label="Read Tom's full story"
              hidden
            >
               <svg
                className="story-card__toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0.53125 0.530273L5.53125 5.53027L10.5312 0.530273"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

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

        <button
          type="button"
          className="stories-beyond__button"
           onClick={openStoryShareModal}
        >
          Share Your Story
        </button>
      </footer>
    </section>
  );
}

export default StoriesBeyondOrdinary;