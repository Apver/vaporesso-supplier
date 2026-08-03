export default function TermsAndConditions() {
  const terms = [
    'Participants must meet the legal age requirement in their place of residence and comply with all applicable laws and regulations.',

    'Prize images displayed on the webpage are for illustrative purposes only. The actual prizes shall prevail. Prizes cannot be redeemed for cash or exchanged for alternatives.',

    'All entries must be submitted within the campaign period. Entries received after the campaign ends will be deemed invalid and will not be eligible for the lucky draw.',

    'By participating in this campaign, participants are deemed to have fully and unconditionally agreed to and accepted these campaign rules and all decisions made by the organizer. The organizer’s decisions shall be final and binding. VAPORESSO reserves the final right of interpretation of this campaign to the fullest extent permitted by law.',

    'By posting or submitting any content as required, including but not limited to text, images, and videos, participants grant VAPORESSO and its affiliates a worldwide, perpetual, irrevocable, royalty-free, sublicensable, and transferable license to use, reproduce, adapt, display, publish, publicly communicate, and create derivative works from such content in any existing or future media for promotional and marketing purposes. The organizer is not required to provide additional credit or compensation and reserves the right to review, edit, hide, or remove user-submitted content.',

    'Participants represent and warrant that the content they submit is original or legally authorized, and does not infringe upon any third-party intellectual property rights or other legal rights. Participants irrevocably waive any attribution rights, moral rights, or similar rights they may have in relation to the submitted content.',

    'Participants agree to cooperate with reasonable marketing and promotional activities carried out by the organizer and its partners, including but not limited to the display of their submitted content on official websites and promotional materials.',
  ];

  return (
    <section className="terms-and-conditions">
      <div className="terms-and-conditions__inner">
        <h2 className="terms-and-conditions__title">
          TERMS AND CONDITIONS
        </h2>

        <ol className="terms-and-conditions__list">
          {terms.map((term) => (
            <li
              className="terms-and-conditions__item"
              key={term}
            >
              {term}
            </li>
          ))}
        </ol>
      </div>

      <div
        className="terms-and-conditions__halftone"
        aria-hidden="true"
      />
       <picture className="terms-and-conditions__bg">
                <source
                  media="(min-width: 2440px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-03-6.svg"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-03-6.svg"
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-Mob-03-6-new2.svg"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-03-6.svg"
                  className=""
                  alt=""
                />
              </picture>
    </section>
  );
}