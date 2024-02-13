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
import DoubleUser from "./DoubleUser";
import Sword from "./Sword";
import MedalOne from "./MedalOne";
import MedalTwo from "./MedalTwo";
import MedalThree from "./MedalThree";
import MedalFour from "./MedalFour";
import SettingDot from "./SettingDot";
import Copy from "./Copy";
import RemoveUser from "./RemoveUser";
import CloseIcon from "./Close";
import Glass from "./Glass";
import PlusIcon from "./Plus";
import MinusIcon from "./Minus";
import Exit from "./Exit";
import EditPencil from "./EditPencel";
import Camera from "./Camera";
import ArrowClockWise from "./ArrowClockWise";
import Speaker from "./Speaker";
import SpeakerMute from "./SpeakerMute";
import ZoomFull from "./ZoomFull";
import Pause from "./Pause";
import Microphone from "./Microphone";
import CaretRight from "./CaretRight";
import Reload from "./Reload";
import Checked from "./Checked";
import CloseWithCircle from "./CloseWithCircle";
import SuccessCheck from "./SuccessCheck";
import Logout from "./Logout";

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
      profile: <Profile {...props} />,
      clock: <Clock {...props} />,
      copy: <Copy {...props} />,
      close: <CloseIcon {...props} />,
      glass: <Glass {...props} />,
      plus: <PlusIcon {...props} />,
      minus: <MinusIcon {...props} />,
      sword: <Sword {...props} />,
      exit: <Exit {...props} />,
      camera: <Camera {...props} />,
      speaker: <Speaker {...props} />,
      pause: <Pause {...props} />,
      microphone: <Microphone {...props} />,
      reload: <Reload {...props} />,
      checked: <Checked {...props} />,
      logout: <Logout {...props} />,
      "success-check": <SuccessCheck {...props} />,
      "close-with-circle": <CloseWithCircle {...props} />,
      "caret-right": <CaretRight {...props} />,
      "zoom-full": <ZoomFull {...props} />,
      "speaker-mute": <SpeakerMute {...props} />,
      "edit-pencil": <EditPencil {...props} />,
      "game-control": <GameControl {...props} />,
      "group-user": <GroupUser {...props} />,
      "double-user": <DoubleUser {...props} />,
      "setting-dot": <SettingDot {...props} />,
      "next-media-button": <NextMediaButton {...props} />,
      "prev-media-button": <PrevMediaButton {...props} />,
      "play-button": <PlayButton {...props} />,
      "arrow-down": <ArrowDown {...props} />,
      "medal-1": <MedalOne {...props} />,
      "medal-2": <MedalTwo {...props} />,
      "medal-3": <MedalThree {...props} />,
      "medal-4": <MedalFour {...props} />,
      "remove-user": <RemoveUser {...props} />,
      "arrow-clock-wise": <ArrowClockWise {...props} />,
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
