"use client";

import Image from "next/image";
import LessonCard from "./Card";
import Button from "@/app/components/Button";
import { ILessonDto } from "@/app/interface/modules/lesson";
import { useCookies } from "react-cookie";

interface ISectionProps {
  lessons: ILessonDto[];
}

export interface SectionCard {
  title: string;
  status: string;
  image: string;
}

const sections: Array<SectionCard> = [
  {
    title: "Trò chơi con cá",
    status: "completed",
    image: "/images/saly-18.png",
  },
  {
    title: "Trò chơi con cá",
    status: "inProgress",
    image: "/images/saly-18.png",
  },
  {
    title: "Trò chơi con cá",
    status: "pending",
    image: "/images/saly-18.png",
  },
  {
    title: "Trò chơi con cá",
    status: "pending",
    image: "/images/saly-18.png",
  },
  {
    title: "Trò chơi con cá",
    status: "pending",
    image: "/images/saly-18.png",
  },
  {
    title: "Trò chơi con cá",
    status: "pending",
    image: "/images/saly-18.png",
  },
  {
    title: "Trò chơi con cá",
    status: "pending",
    image: "/images/saly-18.png",
  },
  {
    title: "Trò chơi con cá",
    status: "pending",
    image: "/images/saly-18.png",
  },
];

const Section: React.FC<ISectionProps> = (props) => {
  const [cookies] = useCookies(["draft"]);

  return (
    <div className="flex flex-col gap-6">
      {cookies.draft?.name && (
        <div className="flex gap-2 items-center">
          <p className="font-bold text-independence">
            Chào{" "}
            <span className="text-primary-green">{cookies?.draft?.name}</span>,
            bạn có muốn tạo tài khỏan để trải nghiệm nhiều hơn?
          </p>
          <Button href="/register" type="primary" className="bg-independence">
            Tạo ngay
          </Button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-6  overflow-auto scroll-hover">
        {props.lessons?.length > 0 &&
          props.lessons.map((section, index) => (
            <LessonCard index={index} section={section} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Section;
