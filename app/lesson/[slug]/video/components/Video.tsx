"use client";

import RsIcon from "@/app/components/Icon";
import { convertTimeToSeconds, secondsToHms } from "@/app/util/function";
import React, {
  useState,
  useRef,
  useEffect,
  FunctionComponent,
  Dispatch,
  SetStateAction,
} from "react";
import Pronounce from "./PronouceModal";

export type Pronouce = {
  paragraph: string;
  time: string;
  status?: "pending" | "complete";
  pronouceParagraph?: string;
  score?: PronouceScore;
};

export type PronouceScore = {
  accuracy?: number;
  pronunciation?: number;
  completeness?: number;
  fluency?: number;
  average?: number;
};
interface VideoPlayerProps {
  src: string;
  pronounces: Array<Pronouce>;
  setRootListPronounce: Dispatch<SetStateAction<Pronouce[]>>;
  // score: PronouceScore
}

const VideoAssessment: FunctionComponent<VideoPlayerProps> = ({
  src,
  pronounces,
  setRootListPronounce,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [listPronounce, setListPronounce] = useState<Pronouce[]>([]);
  const [currentPronounce, setCurrentPronounce] = useState<Pronouce>();
  const [pronouceScored, setPronouceScored] = useState<Pronouce[]>([]);
  const [videoTime, setVideoTime] = useState<string>("");

  // console.log(pronounces.map((pro) => convertTimeToSeconds(pro.time)));

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      isPlaying ? video.play() : video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    setListPronounce(pronounces);
  }, [pronounces]);

  useEffect(() => {
    setRootListPronounce(pronouceScored);
  }, [pronouceScored, setRootListPronounce]);

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
    const listPronouceSecond = listPronounce.map((pro) =>
      convertTimeToSeconds(pro.time)
    );
    if (video) {
      const currentSecond = Math.floor(video.currentTime);
      const progress = (video.currentTime / video.duration) * 100;
      if (currentSecond === listPronouceSecond[0]) {
        setTimeout(() => {
          video.pause();
          setIsPlaying(false);
          setCurrentPronounce(listPronounce[0]);
        }, 2000);
      }
      setVideoTime(secondsToHms(video.currentTime));
      setProgress(progress);
    }
  };

  const handleContinue = () => {
    setPronouceScored([...pronouceScored, currentPronounce as Pronouce]);
    setCurrentPronounce(undefined);
    setListPronounce(
      listPronounce.filter(
        (pro) => pro.paragraph !== currentPronounce?.paragraph
      )
    );
    setIsPlaying(true);
    videoRef.current?.play();
  };

  return (
    <div className="relative rounded-xl overflow-visible group">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover cursor-pointer rounded-2xl"
        onClick={handlePlayPause}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 bg-black p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-b-2xl">
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
          <div className="flex gap-5 items-center">
            <button onClick={handleMuteToggle} className="text-white">
              {isMuted ? (
                <RsIcon className="w-[30px]" type="speaker-mute" />
              ) : (
                <RsIcon className="w-[30px]" type="speaker" />
              )}
            </button>
            <p className="text-white font-bold">{videoTime}</p>
          </div>
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
      {currentPronounce && (
        <Pronounce
          videoRef={videoRef}
          currentPronounce={currentPronounce as Pronouce}
          handleContinue={handleContinue}
          setCurrentPronounce={
            setCurrentPronounce as Dispatch<
              SetStateAction<Pronouce | undefined>
            >
          }
        />
      )}
    </div>
  );
};

export default VideoAssessment;
