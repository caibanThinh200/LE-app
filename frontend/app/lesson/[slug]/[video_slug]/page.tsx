"use client";

import { useState } from "react";
import LeftBar from "./components/LeftBar";
import VideoAssessment, { Pronouce } from "./components/Video";
import { useServerContext } from "@/app/client/context";
import AssessmentQuery from "@/app/client/queries/assessment";
import { ILessonDto } from "@/app/interface/modules/lesson";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { IAssessmentDto } from "@/app/interface/modules/aessment";

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

const Video = ({
  params,
}: {
  params: { slug: string; video_slug: string };
}) => {
  const [listPronounce, setListPronounce] = useState<Pronouce[]>([]);
  const { data } = AssessmentQuery.GetDetailAssessment(params.video_slug);

  if (!data) {
    return <LoadingOverlay />;
  }

  return (
    <div className="container mx-auto py-4 max-w-[1440px]">
      <div className="flex h-[78vh] mt-5 gap-6">
        <VideoAssessment
          setRootListPronounce={setListPronounce}
          pronounces={pronounces}
          src={data?.assessmentVideo?.fileName as string}
        />
        <div className="h-full w-3/12">
          <LeftBar listPronouce={listPronounce} />
        </div>
      </div>
    </div>
  );
};

export default Video;
