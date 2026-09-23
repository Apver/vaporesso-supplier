/**
 * Xros5Mini Layout Component
 * Layout component for XROS 5 Mini product pages
 */
import {useEffect, useRef, useState} from 'react';
export function ArmourOctaVideosLayout() {
  const [activeVideo, setActiveVideo] = useState(null);
  const maskVideoRef = useRef(null);

  useEffect(() => {
    if (!activeVideo) return;
    const el = maskVideoRef.current;
    if (!el) return;

    const tryPlay = () => {
      el.currentTime = 0;
      const playPromise = el.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          el.muted = true;
          el.play().catch(() => {});
        });
      }
    };

    if (el.readyState >= 2) {
      tryPlay();
      return undefined;
    }

    el.addEventListener('canplay', tryPlay, {once: true});
    return () => el.removeEventListener('canplay', tryPlay);
  }, [activeVideo]);
  const Videos = [
    {
      id: '1',
      title: 'Armour OCTA full-introduction Video',
      description: 'Unboxing and check what you can get.',
      video:
        'https://cdn.shopify.com/videos/c/o/v/0290db60f4c1431e973beba8c68a0dc9.mp4',
      poster:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-octa-list-poster-1.webp',
      direction: 'horizontal',
    },
    {
      id: '2',
      title: 'Real-World Shockproof Test',
      description: 'Military-Grade Drop Resistance: 1.2 m, 26 Angles.',
      video:
        'https://cdn.shopify.com/videos/c/o/v/2fe11701ed4d48bcb563bae6e7fab0b4.mp4',
      poster:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-octa-list-poster-2.webp',
      direction: 'vertical',
    },
    {
      id: '3',
      title: 'Real-World Waterproof Test',
      description: 'IPX8 Certificate, 1m for 30+min.',
      video:
        'https://cdn.shopify.com/videos/c/o/v/caa81e58abcf41a0a7e814dcc4ecfe42.mp4',
      poster:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-octa-list-poster-3.webp',
      direction: 'vertical',
    },
    {
      id: '4',
      title: 'Real-World Waterproof Test',
      description: '100 bar High-Pressure | 85°C Hot Water Resistant.',
      video:
        'https://cdn.shopify.com/videos/c/o/v/7a4059497bc04933b1c6a3d6417b9f6d.mp4',
      poster:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-octa-list-poster-4.webp',
      direction: 'vertical',
    },
    {
      id: '5',
      title: 'Riding Together, Titanium Grey',
      description:
        'The same premium silicone surface used on motorcycle grips.',
      video:
        'https://cdn.shopify.com/videos/c/o/v/c4b78c34b0de4ec581c0307eaee37a99.mp4',
      poster:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-octa-list-poster-5.webp',
      direction: 'vertical',
    },
    {
      id: '6',
      title: 'Racing Together, Aero White',
      description:
        'Design elements inspired by rally racing, embodying speed and passion.',
      video:
        'https://cdn.shopify.com/videos/c/o/v/c9e8737f8cdf41feb727731386175afa.mp4',
      poster:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-octa-list-poster-6.jpg',
      direction: 'vertical',
    },
    {
      id: '7',
      title: 'Drinking Together, Rust Bronze',
      description: 'Retro design inspired by 1980s industrial aesthetics.',
      video:
        'https://cdn.shopify.com/videos/c/o/v/eb657abf3ade46b08839c16600068152.mp4',
      poster:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-octa-list-poster-7.jpg',
      direction: 'vertical',
    },
    {
      id: '8',
      title: 'Hiking Together, Vintage Green',
      description: 'Embrace nature and explore the world beneath your feet.',
      video:
        'https://cdn.shopify.com/videos/c/o/v/4da39432ae59427688d7399e843e8e9a.mp4',
      poster:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-octa-list-poster-8.jpg',
      direction: 'vertical',
    },
    {
      id: '9',
      title: 'Surfing Together, Rally Blue',
      description:
        'Sky and sea, friends and Octa—together, they make life happier.',
      video:
        'https://cdn.shopify.com/videos/c/o/v/3556c256301c40ccbafc5b08554f9a1d.mp4',
      poster:
        'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/armour-octa-list-poster-9.jpg',
      direction: 'vertical',
    },
  ];
  const downloadVideo = async (video) => {
    try {
      const response = await fetch(video.video);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const filename =
        video.video.split('/').pop()?.split('?')[0] || 'video.mp4';
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback if fetch/CORS fails
      const link = document.createElement('a');
      link.href = video.video;
      link.download =
        video.video.split('/').pop()?.split('?')[0] || 'video.mp4';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };
  return (
    <div className="armour-octa-videos">
      <h2 className="armour-octa-videos__title">
        ARMOUR OCTA LIVE- ACTION VIDEOS
      </h2>
      <div className="armour-octa-videos__list">
        {Videos.map((video) => (
          <div
            key={video.id}
            className={`armour-octa-videos__item ${video.direction === 'horizontal' ? 'armour-octa-videos__item--horizontal' : ''}`}
          >
            <div className="armour-octa-videos__item-box">
              <img
                className={`armour-octa-videos__item-video ${video.direction === 'horizontal' ? 'armour-octa-videos__item-video--horizontal' : ''}`}
                src={video.poster}
                alt={video.title}
              />
              <div
                className="armour-octa-videos__item-play"
                onClick={() => setActiveVideo(video)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveVideo(video);
                  }
                }}
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/video-list-play.svg"
                  alt=""
                />
              </div>
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    downloadVideo(video);
                  }
                }}
                className="armour-octa-videos__item-download"
                onClick={() => downloadVideo(video)}
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/video-list-download.svg"
                  alt=""
                />
              </div>
            </div>
            <h2 className="armour-octa-videos__item-title">{video.title}</h2>
            <p className="armour-octa-videos__item-description">
              {video.description}
            </p>
          </div>
        ))}
      </div>
      {activeVideo && (
        <div
          className="armour-octa-videos__mask"
          onClick={() => setActiveVideo(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setActiveVideo(null);
            }
          }}
        >
          <div className="armour-octa-videos__mask-container">
            <video
              key={activeVideo.id}
              ref={maskVideoRef}
              className={`armour-octa-videos__mask-video ${activeVideo?.direction === 'horizontal' ? 'armour-octa-videos__mask-video--horizontal' : ''}`}
              src={activeVideo.video}
              poster={activeVideo.poster}
              controls
              autoPlay
              playsInline
              preload="auto"
            >
              <track kind="captions" />
            </video>
            <div className="armour-octa-videos__mask-close">
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/video-list-close.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
