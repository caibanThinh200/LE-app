import SearchBar from "../SearchBar";
import Section from "../Section";

interface ILessonProps {}

const LessonScreen: React.FC<ILessonProps> = (props) => {
  return (
    <div className="p-6 overflow-auto h-screen">
      <div className="flex flex-col gap-6">
        <SearchBar />
        <Section />
      </div>
    </div>
  );
};

export default LessonScreen;
