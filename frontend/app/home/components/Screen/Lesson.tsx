"use client";

import LessonQuery from "@/app/client/queries/lesson";
import SearchBar from "../SearchBar";
import Section from "../Section";
import { ILessonDto } from "@/app/interface/modules/lesson";

interface ILessonProps {}

const LessonScreen: React.FC<ILessonProps> = (props) => {
  const { data } = LessonQuery.GetLessons({});
  return (
    <div className="p-6 overflow-auto scroll-hover h-screen">
      <div className="flex flex-col gap-6">
        <SearchBar />
        <Section lessons={data as ILessonDto[]} />
      </div>
    </div>
  );
};

export default LessonScreen;
