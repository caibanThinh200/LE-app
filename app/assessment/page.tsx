"use client";

import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { SpeechToTextComponent } from "../components/SpeechToText";

const Page = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPronounce, setShowPronouce] = useState(false);
  // useEffect(() => {
  //     videoRef.current?.onended
  // }, [])

  const onVideoEnded = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    setShowPronouce(true);
  };

  return (
    <div className="container mx-auto mt-10">
      <h3 className="mb-10">Listen and repeat the following</h3>
      <video className="mb-10" onEnded={onVideoEnded} ref={videoRef} width="400" controls>
        <source src="/mp4/pronounce-assessment.mp4" type="video/mp4" />
        {/* <source src="mov_bbb.ogg" type="video/ogg" /> */}
        Your browser does not support HTML video.
      </video>
      {/* <SpeechToTextComponent /> */}
      {showPronounce && <SpeechToTextComponent />}
    </div>
  );
};

export default Page;
