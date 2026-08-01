const VideoBanner = ({ 
  videoSrc,          
  mobileVideoSrc,    
  posterSrc,         
  mobilePosterSrc,   
  overlayOpacity = 0.4 
}) => {
  return (
    <div 
      className="anniversary-video-banner"
      data-pc-video={videoSrc}
      data-mobile-video={mobileVideoSrc}
      data-pc-poster={posterSrc}
      data-mobile-poster={mobilePosterSrc}
    >
      <video
        className="banner-media"
        autoPlay
        loop
        muted
        playsInline
        data-xwc='lazy-video'
      />

      {/* 遮罩层 */}
      <div 
        className="banner-overlay" 
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      ></div>
    </div>
  );
};

export default VideoBanner;