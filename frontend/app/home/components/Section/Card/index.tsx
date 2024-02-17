import Image from "next/image";
import { SectionCard } from "..";
import { useMemo } from "react";
import Completed from "./Completed";
import InProgress from "./InProgress";
import Pending from "./Pending";
import { ILessonDto } from "@/app/interface/modules/lesson";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: props.index * 0.1,
        },
      }}
      exit={{ scale: 0 }}
      transition={{
        duration: 2,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Card {...props} />
    </motion.div>
  );
};

export default LessonCard;
