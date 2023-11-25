"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import LessonRightBar from "./Lesson";
import GameRightBar from "./Game";

export interface IRightBarProps {}

interface IRightBarTypes {
  [x: string]: React.FC<IRightBarProps>;
}

const RightBar: React.FC<IRightBarProps> = (props) => {
  const pathname = usePathname();

  const rightBars: IRightBarTypes = useMemo(
    () => ({
      "/home": LessonRightBar,
      "/home/game": GameRightBar,
      "/home/friend": () => null,
      "/home/profile": () => null,
    }),
    []
  );

  const RightBarComponent = useMemo(
    () => rightBars[pathname] || LessonRightBar,
    [pathname, rightBars]
  );

  return <RightBarComponent {...props} />;
};

export default RightBar;
