import SingleFriendCard from "./Card";

interface IFriendCardProps {}

const FriendCard: React.FC<IFriendCardProps> = (props) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array(9)
        .fill("")
        .map((item, index) => (
          <SingleFriendCard key={index} />
        ))}
    </div>
  );
};

export default FriendCard;
