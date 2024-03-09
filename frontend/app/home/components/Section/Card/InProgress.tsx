"use client";

import Image from "next/image";
import { SectionCard } from "..";
import { ILessonCardProps } from ".";
import { useRouter } from "next/navigation";
import Link from "next/link";

const InProgress: React.FC<ILessonCardProps> = (props) => {
  return (
    <div
      key={props.index}
      className="rounded-xl text-white border border-bright-gray p-6 bg-gradient-green-2 relative overflow-hidden"
    >
      <div className="flex w-full relative z-20">
        <div className="flex lg:w-1/2 flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-bold ">{props.section.title}</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="relative rounded-full w-6/12 h-[12px] overflow-hidden">
                <div className="absolute w-full h-full left-0 bg-light-silver"></div>
                <div
                  style={{
                    width: "50%",
                    background:
                      "linear-gradient(180deg, #FFD66D -33.33%, #EF6416 112.5%)",
                  }}
                  className="absolute rounded-full w-full h-full left-0 bg-light-silver"
                ></div>
              </div>
              <p className="">{props.section?.assessments?.length} bài</p>
            </div>
          </div>
          <div>
            <Link
              href={`/lesson/${props.section._id}`}
              className="border border-primary-green rounded-full py-2 px-6 font-bold text-independence bg-white"
            >
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 w-[70%] h-full z-10 from-[#27AE39] from-[70%] bg-gradient-to-r"></div>
      <div className="absolute inset-0 w-full h-full">
        <Image
          className="w-1/2 ml-auto object-cover object-bottom lg:h-full"
          src={props.section.logo?.fileName as string}
          alt={props.section.logo?.fileName as string}
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default InProgress;
