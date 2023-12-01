"use client";

import Image from "next/image";
import LessonCard from "./Card";
import Button from "@/app/components/Button";

interface ISectionProps {}

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
  const cardStatusTitle = {
    inProgress: "Tiếp tục",
    completed: "Đã hoàn thành",
    pending: "Tham gia",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 items-center">
        <p className="font-bold text-independence">
          {/* Chủ đề 1: <span className="font-bold">Giới thiệu và làm quen</span> */}
          Chào <span className="text-primary-green">Vinh</span>, bạn có muốn tạo
          tài khỏan để trải nghiệm nhiều hơn?
        </p>
        <Button type="primary" className="bg-independence">
          Tạo ngay
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6  overflow-auto scroll-hover">
        {sections.map((section, index) => (
          <LessonCard index={index} section={section} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Section;
