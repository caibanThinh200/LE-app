import GameCard from "../GameCard";
import SearchBar from "../SearchBar";

interface IGameScreenProps {}

const GameScreen: React.FC<IGameScreenProps> = (props) => {
  return (
    <div className="p-6 overflow-auto h-screen scroll-hover">
      <div className="flex flex-col gap-6">
        <SearchBar />
        {/* <Section /> */}
        <GameCard />
      </div>
    </div>
  );
};

export default GameScreen;
