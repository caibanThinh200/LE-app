import LeftBar from "./components/LeftBar";
import VideoAssessment from "./components/Video";

const Video = () => {
  return (
    <div className="container mx-auto py-4 max-w-[1440px]">
      <div className="flex h-[78vh] mt-5 gap-6">
        <VideoAssessment src="/mp4/dan-assessment.mp4" />
        <div className="h-full w-3/12">
          <LeftBar />
        </div>
      </div>
    </div>
  );
};

export default Video;
