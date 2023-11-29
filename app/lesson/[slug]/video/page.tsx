"use client";

import { useState } from "react";
import LeftBar from "./components/LeftBar";
import VideoAssessment, { Pronouce } from "./components/Video";

const pronounces = [
  {
    paragraph: "Can you help me put this away",
    time: "00:01:05",
  },
  {
    paragraph: "Stop giving me your opinion",
    time: "00:01:21",
  },
  {
    paragraph: "What type of people do you like",
    time: "00:01:37",
  },
];

const Video = () => {
  const [listPronounce, setListPronounce] = useState<Pronouce[]>([]);

  return (
    <div className="container mx-auto py-4 max-w-[1440px]">
      <div className="flex h-[78vh] mt-5 gap-6">
        <VideoAssessment
          setRootListPronounce={setListPronounce}
          pronounces={pronounces}
          src="/mp4/dan-assessment.mp4"
        />
        <div className="h-full w-3/12">
          <LeftBar listPronouce={listPronounce} />
        </div>
      </div>
    </div>
  );
};

export default Video;
