import LessonContent from "./components/Content";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";

const DetailLesson = () => {
  return (
    <div className="container mx-auto h-[88%] max-w-[1440px]">
      <div className="py-6 flex gap-6 h-full">
        <LeftBar />
        <div className="flex-1">
          <LessonContent />
        </div>
        <RightBar />
      </div>
    </div>
  );
};

export default DetailLesson;
