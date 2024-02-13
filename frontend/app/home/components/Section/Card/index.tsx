import Image from "next/image";
import { SectionCard } from "..";
import { useMemo } from "react";
import Completed from "./Completed";
import InProgress from "./InProgress";
import Pending from "./Pending";
import { ILessonDto } from "@/app/interface/modules/lesson";

export interface ILessonCardProps {
  index: number;
  section: ILessonDto;
}

const LessonCard: React.FC<ILessonCardProps> = (props) => {
  const cardState = useMemo(
    () => ({
      completed: Completed,
      inProgress: InProgress,
      pending: Pending,
    }),
    []
  );

  const Card = useMemo(
    () =>
      cardState[props.section.status as "completed" | "inProgress"] || "null",
    [props.section, cardState]
  );

  return <Card {...props} />;
};

export default LessonCard;
