import { useMemo } from "react";
import Book from "./Book";
import GameControl from "./GameControl";
import GroupUser from "./GroupUser";
import Profile from "./Profile";

interface IconProps extends React.HTMLProps<any> {
  type: string;
  [x: string]: any;
}

interface IconList {
  [x: string]: JSX.Element;
}

const RsIcon: React.FC<IconProps> = (props) => {
  const listIcons: IconList = useMemo(
    () => ({
      book: <Book {...props} />,
      "game-control": <GameControl {...props} />,
      "group-user": <GroupUser {...props} />,
      profile: <Profile {...props} />,
    }),
    [props]
  );

  const Icon = useMemo(
    () => listIcons[props.type as string] || null,
    [props.type, listIcons]
  );
  return Icon;
};

export default RsIcon;
