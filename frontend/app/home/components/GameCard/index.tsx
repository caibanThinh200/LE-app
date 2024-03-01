import Card from "./Card";

interface IGameCardProps {}

const cardData = [
  {
    title: "Nhìn hình đoán chữ",
    url: "/game/flash-card",
    thumb: "/images/game-1.png",
  },
  { title: "Xếp hình", url: "/game/card-match", thumb: "/images/game-2.jpeg" },
  {
    title: "Thiên thạch rơi",
    url: "/game/card-match",
    inProgress: true,
    thumb: "/images/game-3.png",
  },
];

const GameCard: React.FC<IGameCardProps> = (props) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {cardData.map((card) => (
        <Card key={card.title} {...card} />
      ))}
    </div>
  );
};

export default GameCard;
