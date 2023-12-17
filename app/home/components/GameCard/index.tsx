import Card from "./Card";

interface IGameCardProps {}

const cardData = [
  { title: "Nhìn hình đoán chữ", url: "/game/flash-card" },
  { title: "Xếp hình", url: "/game/card-match" },
];

const GameCard: React.FC<IGameCardProps> = (props) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {cardData.map((card) => (
        <Card key={card.title} title={card.title} url={card.url} />
      ))}
    </div>
  );
};

export default GameCard;
