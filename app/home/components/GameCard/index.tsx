import Card from "./Card";

interface IGameCardProps {}

const GameCard: React.FC<IGameCardProps> = props => {
    return <div className="grid grid-cols-2 gap-6">
        <Card/>
        <Card/>
        <Card/>
    </div>
}

export default GameCard;