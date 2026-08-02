import {openStoryShareModal} from '../components/StoryShareModal';
export default function ExtraordinaryHero() {
    return (
        <section className="extraordinary-hero">
            <div className="extraordinary-hero__sticky">
                <div className="extraordinary-hero__media">
                    <video
                        className="extraordinary-hero__video"
                        data-pc-src="https://cdn.shopify.com/videos/c/o/v/f9270660fece4ec4b99ae2b69e65ae20.mp4"
                        data-mobile-src="https://cdn.shopify.com/videos/c/o/v/f1fa471baf8a42798247cd95f2131304.mp4"
                        data-pc-poster="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-banner-Mob.webp?v=1785231157"
                        data-mobile-poster="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-banner-Mob.webp?v=1785231157"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />

                    <div className="extraordinary-hero__overlay" />
                </div>


                {/* 视频展开后的内容 */}
                <div className="extraordinary-hero__content">
                    <h2 className="extraordinary-hero__title">
                        <span className="extraordinary-hero__title-side extraordinary-hero__title-side--left">
                            The
                        </span>

                        <span className="extraordinary-hero__title-script">
                            Extraordinary
                        </span>

                        <span className="extraordinary-hero__title-side extraordinary-hero__title-side--right">
                            Ones
                        </span>
                    </h2>

                    <div className="extraordinary-hero__meta">
                        <p className="extraordinary-hero__description">
                            Be extraordinary. Share your story.
                        </p>

                        <div className="extraordinary-hero__buttons">
                            <button
                                type="button"
                                className="extraordinary-hero__button extraordinary-hero__button--white"
                               
                            >
                                Watch The Full Video
                            </button>

                            <button
                                type="button"
                                  onClick={openStoryShareModal}
                                className="extraordinary-hero__button extraordinary-hero__button--green"
                            >
                                Share Your Story
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}