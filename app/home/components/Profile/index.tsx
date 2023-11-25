import ListFriend from "./ListFriend";
import PersonalInfo from "./PersonalInfo";
import ScoreStatistic from "./ScroreStatistic";

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = (props) => {
  return (
    <div className="flex gap-6 h-[83vh]">
      <div className="w-4/12">
        <PersonalInfo />
      </div>
      <div className="w-8/12 flex flex-col gap-6">
        <ScoreStatistic />
        <ListFriend />
      </div>
    </div>
  );
};

export default Profile;
