"use client"
import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';

interface Props {
  src: string;
  name: string;
}

const HLSVideoPlayer: React.FC<Props> = ({ src, name }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (src.endsWith('.m3u8') && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari
      videoRef.current.src = src;
    } else {
      videoRef.current.src = src;
    }
  }, [src]);

  return (
    <div className="relative w-full h-full bg-black z-10">
      <video
        ref={videoRef}
        className=" h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      />
      <div className=" absolute flex justify-start bottom-0 left-0 drop-shadow-2xl bg-black bg-opacity-30 text-white text-xs font-bold px-4 py-2  ">
        {name}
      </div>
    </div>
  );
};

export default HLSVideoPlayer;
