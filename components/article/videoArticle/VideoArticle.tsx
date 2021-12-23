import React from 'react';
import { VideoArticleProps } from './types';
import IconPlayButton from '@icons/icon-play-button.svg';

const VideoArticle = ({ src }: VideoArticleProps): JSX.Element => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [overlay, setOverlay] = React.useState(true);
  const [playing, setPlaying] = React.useState(false);

  const handleOverlayClick = () => {
    if (videoRef.current && videoRef.current.paused) {
      setPlaying(true);
    }
  };

  React.useEffect(() => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [playing]);

  const iconParams = {
    height: '6em',
    width: '6em',
    className: 'block z-50 opacity-100'
  };

  return (
    <div className='p-6'>
      <div className='relative'>
        {overlay && (
          <div
            className='flex absolute top-0 right-0 bottom-0 left-0 z-40 justify-center items-center cursor-pointer bg-black/60'
            onClick={handleOverlayClick}>
            <IconPlayButton {...iconParams} />
          </div>
        )}
        <video
          ref={videoRef}
          className='cursor-pointer'
          controls={!overlay}
          height='100%'
          src={src}
          width='100%'
          onPlay={() => setOverlay(false)}>
          Video wordt niet ondersteund
        </video>
      </div>
    </div>
  );
};

export default VideoArticle;
