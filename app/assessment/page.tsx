"use client";

import { SyntheticEvent, Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SpeechToTextComponent } from "../components/SpeechToText";

const Page = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPronounce, setShowPronouce] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const onVideoTimeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    if (
      Math.floor(videoRef.current?.currentTime as number) === 40 &&
      !hasResult
    ) {
      videoRef.current?.pause();
      setShowPronouce(Math.floor(videoRef.current?.currentTime as number) === 40);
    }
  };

  const onContinueVideo = () => {
    setShowPronouce(false);
    setHasResult(true);
    videoRef.current?.play();
  };

  return (
    <div className="container mx-auto mt-10">
      <h3 className="mb-10">Listen and repeat the following</h3>
      <div className="relative">
        <video
          className="mb-10 w-full"
          onTimeUpdate={onVideoTimeUpdate}
          ref={videoRef}
          width="400"
          controls
        >
          <source src="/mp4/pronounce-assessment.mp4" type="video/mp4" />
          {/* <source src="mov_bbb.ogg" type="video/ogg" /> */}
          Your browser does not support HTML video.
        </video>
        {showPronounce && (
          <div className="absolute top-0 w-full h-full">
            <SpeechToTextComponent
              setHasResult={setHasResult}
              onContinue={onContinueVideo}
            />
          </div>
        )}
      </div>
      {/* <SpeechToTextComponent /> */}
      {/* {showPronounce && <SpeechToTextComponent />} */}
    </div>
  );
};

export default Page;
