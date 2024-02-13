"use client";

import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import { ILessonDto } from "@/app/interface/modules/lesson";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { IAssessmentOfLesson } from "../page";

interface ILessonContentProps {
  assessment: IAssessmentOfLesson;
}

const LessonContent: React.FC<ILessonContentProps> = (props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="rounded-3xl h-full w-full bg-white overflow-auto scroll-hover">
      <div className="w-full relative h-[370px] flex justify-center items-center">
        <Image
          className="w-full h-full absolute left-0 z-0 object-cover"
          src={"/images/lesson-thumb.png"}
          alt="thumb"
          width={800}
          height={400}
        />
        <div className="z-10 relative text-center">
          <p className="font-bold text-white text-[26px]">
            Bài {props.assessment?.index}:
          </p>
          <p className="text-[40px] font-bold text-white">
            {props.assessment?.title}
          </p>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <RsIcon className="cursor-pointer" type="prev-media-button" />
            <RsIcon className="cursor-pointer" type="next-media-button" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <RsIcon type="clock" fill="#6B7280" />
              <p className="text-[#6B7280]">
                {props.assessment?.videoDuration} phút
              </p>
            </div>
            <div>
              <Button
                onClick={() =>
                  router.push(
                    `${pathname}/${props.assessment?._id}?showVideo=true`
                  )
                }
                type="primary"
                className="flex gap-2 items-center"
              >
                <RsIcon type="play-button" />
                Bắt đầu ngay
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-3 border-t border-bright-gray">
          <p className="font-bold mb-3">Nội dung</p>
          <p>{props.assessment?.content}</p>
        </div>
        {!showAll ? (
          <div
            onClick={() => setShowAll(true)}
            className="mt-4 text-[#6B7280] text-[12px] flex gap-2 items-center justify-center cursor-pointer"
          >
            Xem thêm <RsIcon type="arrow-down" />
          </div>
        ) : (
          <div>
            <p>{props.assessment?.content}</p>
            <div
              onClick={() => setShowAll(false)}
              className="mt-4 text-[#6B7280] text-[12px] flex gap-2 items-center justify-center cursor-pointer"
            >
              Thu gọn <RsIcon type="arrow-down" className="rotate-180" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonContent;
