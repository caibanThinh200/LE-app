"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import LessonContent from "./components/Content";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import LessonQuery from "@/app/client/queries/lesson";
import { useServerContext } from "@/app/client/context";
import { ILessonDto } from "@/app/interface/modules/lesson";
import { IAssessmentDto } from "@/app/interface/modules/aessment";

export type IAssessmentOfLesson = IAssessmentDto & {
  active: boolean;
  index: number;
};

const DetailLesson = ({ params }: { params: { slug: string } }) => {
  const { data } = LessonQuery.GetDetailLesson(params?.slug || "");
  const { updateLesson } = useServerContext();
  const [assessments, setListAssessment] = useState<Array<IAssessmentOfLesson>>(
    []
  );

  useEffect(() => {
    setListAssessment(
      data?.assessments?.map((assessment, idx) => ({
        ...assessment,
        active: idx === 0,
        index: idx + 1,
      })) as IAssessmentOfLesson[]
    );
    updateLesson && updateLesson({ item: data as ILessonDto });
  }, [data]);

  const updateActiveAssessment = useCallback(
    (id: string) => {
      const newAssessments = assessments.map((a) => ({
        ...a,
        active: id === a?._id,
      }));
      setListAssessment(newAssessments);
    },
    [assessments]
  );

  const activeAssessment = useMemo(
    () => (assessments || []).find((a) => a.active),
    [assessments]
  );

  return (
    <div className="container mx-auto h-[88%] max-w-[1440px]">
      <div className="py-6 flex gap-6 h-full">
        <LeftBar
          result={(assessments as IAssessmentOfLesson[]) || []}
          updateActiveAssessment={updateActiveAssessment}
        />
        <div className="flex-1">
          <LessonContent assessment={activeAssessment as IAssessmentOfLesson} />
        </div>
        <RightBar />
      </div>
    </div>
  );
};

export default DetailLesson;
