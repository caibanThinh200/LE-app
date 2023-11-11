"use client";

import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import Image from "next/image";
import { useState } from "react";

interface ILessonContentProps {}

const LessonContent: React.FC<ILessonContentProps> = (props) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="rounded-3xl h-full w-full bg-white overflow-auto">
      <div className="w-full relative h-[370px] flex justify-center items-center">
        <Image
          className="w-full h-full absolute left-0 z-0 object-cover"
          src={"/images/lesson-thumb.png"}
          alt="thumb"
          width={800}
          height={400}
        />
        <div className="z-10 relative text-center">
          <p className="font-bold text-white text-[26px]">Bài 1:</p>
          <p className="text-[40px] font-bold text-white">Cách phát âm chuẩn</p>
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
              <p className="text-[#6B7280]">32 phút</p>
            </div>
            <div>
              <Button type="primary" className="flex gap-2 items-center">
                <RsIcon type="play-button" />
                Bắt đầu ngay
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-3 border-t border-bright-gray">
          <p className="font-bold mb-3">Nội dung</p>
          <p>
            Các phát âm chuẩn như người bản địa Các phát âm chuẩn như người bản
            địa Các phát âm chuẩn như người bản địa chuẩn như người bản địa
            chuẩn như người bản địa chuẩn như người bản địa bản địa chuẩn như
            người bản địa bản địa chuẩn như người bản địabản địa chuẩn như người
            bản địa
          </p>
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
            <p>
              Các phát âm chuẩn như người bản địa Các phát âm chuẩn như người
              bản địa Các phát âm chuẩn như người bản địa chuẩn như người bản
              địa chuẩn như người bản địa chuẩn như người bản địa bản địa chuẩn
              như người bản địa bản địa chuẩn như người bản địabản địa chuẩn như
              người bản địa
            </p>
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
