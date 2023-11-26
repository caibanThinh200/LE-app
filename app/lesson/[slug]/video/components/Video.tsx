"use client";

import RsIcon from "@/app/components/Icon";
import Image from "next/image";
import React, { useState, useRef, useEffect, FunctionComponent } from "react";

interface VideoPlayerProps {
  src: string;
}

const VideoAssessment: FunctionComponent<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      isPlaying ? video.play() : video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handlePlayPause = (): void => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = (): void => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const video = videoRef.current;
    const value = event.target.value;
    if (video) {
      video.currentTime = (video.duration / 100) * Number(value);
      setProgress(Number(value));
    }
  };

  const handleTimeUpdate = (): void => {
    const video = videoRef.current;
    if (video) {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover cursor-pointer"
        onClick={handlePlayPause}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 bg-black p-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div>
          <input
            type="range"
            value={progress.toString()}
            min="0"
            max="100"
            onChange={handleProgressChange}
            className="w-full h-[3px] hover:h-[6px] transition-all"
          />
        </div>
        <div className="flex justify-between items-center">
          <button onClick={handleMuteToggle} className="text-white">
            {isMuted ? (
              <RsIcon className="w-[30px]" type="speaker-mute" />
            ) : (
              <RsIcon className="w-[30px]" type="speaker" />
            )}
          </button>
          <div className="flex gap-2 items-center">
            <button className="text-white">
              <RsIcon
                type="prev-media-button"
                fill="#fff"
                className="scale-[1.5]"
              />
            </button>
            <button
              onClick={handlePlayPause}
              className="text-white w-[50px] flex justify-center"
            >
              {isPlaying ? (
                <RsIcon type="pause" />
              ) : (
                <RsIcon type="play-button" className="scale-[1.5]" />
              )}
            </button>
            <button className="text-white">
              <RsIcon
                type="next-media-button"
                fill="#fff"
                className="scale-[1.5]"
              />
            </button>
          </div>
          <button
            onClick={() => {
              if (!isFullScreen) {
                videoRef.current?.requestFullscreen();
                setIsFullScreen(true);
              } else {
                document?.exitFullscreen();
                setIsFullScreen(false);
              }
            }}
          >
            <RsIcon type="zoom-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoAssessment;
