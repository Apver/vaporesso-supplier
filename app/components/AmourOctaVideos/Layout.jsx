/**
 * Xros5Mini Layout Component
 * Layout component for XROS 5 Mini product pages
 */
import {useState} from 'react';
export function ArmourOctaVideosLayout() {
  const [activeVideo, setActiveVideo] = useState(null);
  const Videos = [
    {
      id: '1',
      title: 'New members in Vaporesso Gen Family! Gen S and Gen Nano kit!',
      description:
        'Compatible with the 0.4ohm pod for precise wattage adjustment and other pods for three-level adjustment',
      video:
        'https://cdn.shopify.com/videos/c/o/v/11fcae10524144a2a6f0a27abcd26203.mp4',
      poster:
        'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-video-01.webp',
      direction: 'horizontal',
    },
    {
      id: '2',
      title:
        "Vaporesso Gen S with NRG S tank---Power isn't just for the Pros! Is it an updated Gen?",
      description:
        'Based on the performance of the Axon chip on Gen mod, we are providing another option for more box kit users, the Gen S with NRG S tank.',
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      poster:
        'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-video-02.webp',
      direction: 'vertical',
    },
    {
      id: '3',
      title:
        "Vaporesso Gen S with NRG S tank---Power isn't just for the Pros! Is it an updated Gen?",
      description:
        'Based on the performance of the Axon chip on Gen mod, we are providing another option for more box kit users, the Gen S with NRG S tank.',
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      poster:
        'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-video-03.webp',
      direction: 'vertical',
    },
    {
      id: '4',
      title:
        "Vaporesso Gen S with NRG S tank---Power isn't just for the Pros! Is it an updated Gen?",
      description:
        'Based on the performance of the Axon chip on Gen mod, we are providing another option for more box kit users, the Gen S with NRG S tank.',
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      poster:
        'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-video-04.webp',
      direction: 'vertical',
    },
    {
      id: '5',
      title:
        "Vaporesso Gen S with NRG S tank---Power isn't just for the Pros! Is it an updated Gen?",
      description:
        'Based on the performance of the Axon chip on Gen mod, we are providing another option for more box kit users, the Gen S with NRG S tank.',
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      poster:
        'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-video-05.webp',
      direction: 'vertical',
    },
    {
      id: '6',
      title:
        "Vaporesso Gen S with NRG S tank---Power isn't just for the Pros! Is it an updated Gen?",
      description:
        'Based on the performance of the Axon chip on Gen mod, we are providing another option for more box kit users, the Gen S with NRG S tank.',
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      poster:
        'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-video-06.webp',
      direction: 'vertical',
    },
    {
      id: '7',
      title:
        "Vaporesso Gen S with NRG S tank---Power isn't just for the Pros! Is it an updated Gen?",
      description:
        'Based on the performance of the Axon chip on Gen mod, we are providing another option for more box kit users, the Gen S with NRG S tank.',
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      poster:
        'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-video-07.webp',
      direction: 'vertical',
    },
    {
      id: '8',
      title:
        "Vaporesso Gen S with NRG S tank---Power isn't just for the Pros! Is it an updated Gen?",
      description:
        'Based on the performance of the Axon chip on Gen mod, we are providing another option for more box kit users, the Gen S with NRG S tank.',
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      poster:
        'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/armour-octa-video-08.webp',
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
        ARMOUR OCTA LIVE- ACTION VIDEOS*
      </h2>
      <div className="armour-octa-videos__list">
        {Videos.map((video) => (
          <div
            key={video.id}
            className={`armour-octa-videos__item ${video.direction === 'horizontal' ? 'armour-octa-videos__item--horizontal' : ''}`}
          >
            <div className="armour-octa-videos__item-box">
              <video
                className={`armour-octa-videos__item-video ${video.direction === 'horizontal' ? 'armour-octa-videos__item-video--horizontal' : ''}`}
                src={video.video}
                poster={video.poster}
              >
                <track kind="captions" />
              </video>
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
              className={`armour-octa-videos__mask-video ${activeVideo?.direction === 'horizontal' ? 'armour-octa-videos__mask-video--horizontal' : ''}`}
              src={activeVideo?.video}
              poster={activeVideo?.poster}
              controls
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
