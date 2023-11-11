import { useMemo } from "react";
import Book from "./Book";
import GameControl from "./GameControl";
import GroupUser from "./GroupUser";
import Profile from "./Profile";
import Clock from "./Clock";
import NextMediaButton from "./NextMediaButton";
import PrevMediaButton from "./PrevMediaButton";
import PlayButton from "./PlayButton";
import ArrowDown from "./ArrowDown";

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
      clock: <Clock {...props} />,
      "next-media-button": <NextMediaButton {...props} />,
      "prev-media-button": <PrevMediaButton {...props} />,
      "play-button": <PlayButton {...props} />,
      "arrow-down": <ArrowDown {...props} />,
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
