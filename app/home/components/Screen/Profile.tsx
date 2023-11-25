// import GameCard from "../GameCard";
import Profile from "../Profile";
import SearchBar from "../SearchBar";

interface IProfileScreenProps {}

const ProfileScreen: React.FC<IProfileScreenProps> = (props) => {
  return (
    <div className="p-6 overflow-auto h-screen scroll-hover">
      <div className="flex flex-col gap-6">
        <SearchBar sideWidget={<div></div>} />
        <Profile />
      </div>
    </div>
  );
};

export default ProfileScreen;
