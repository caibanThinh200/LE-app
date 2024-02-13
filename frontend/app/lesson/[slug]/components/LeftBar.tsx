import RsIcon from "@/app/components/Icon";
import { IAssessmentDto } from "@/app/interface/modules/aessment";
import Image from "next/image";
import { IAssessmentOfLesson } from "../page";

interface ILeftBarProps {
  result: IAssessmentOfLesson[];
  updateActiveAssessment: (id: string) => void;
}

const LeftBar: React.FC<ILeftBarProps> = (props) => {
  return (
    <div
      style={{
        background: "rgba(249, 250, 251, 0.60)",
      }}
      className="flex-2 p-4 rounded-xl h-full overflow-auto transition-all scroll-hover"
    >
      <div className="flex flex-col gap-6">
        {props.result?.map((assessment, index) => (
          <button
            onClick={() =>
              props.updateActiveAssessment(assessment._id as string)
            }
            key={assessment._id}
            className="rounded-xl text-white p-6 bg-gradient-green-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  className="w-[78px] h-[44px] rounded-lg"
                  src={assessment.poster?.fileName as string}
                  alt={assessment.title as string}
                  height={44}
                  width={78}
                />
                <p className="font-bold">Bài {assessment.index}</p>
              </div>
              <div className="flex gap-1 items-center">
                <RsIcon type="clock" />
                <p className="text-ghost-white">
                  {assessment.videoDuration as number} phút
                </p>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-[14px]">{assessment.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeftBar;
