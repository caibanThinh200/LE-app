"use client";

import ReactFlipCard from "reactjs-flip-card";
import CorrectTick from "./CorrectTick";
import InCorrectTick from "./InCorrectTick";
import { useEffect, useState } from "react";

interface IMatchCardProps {
  children: React.ReactNode;
  result: "match" | "unmatch" | "none";
}

const MatchCard: React.FC<IMatchCardProps> = (props) => {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (props.result !== "none") {
      setFlip(true);
      if (props.result === "unmatch") {
        // setTimeout(() => {
        //   setFlip(false);
        // }, 2000);
      }
    }
  }, [props.result]);

  return (
    <ReactFlipCard
      flipTrigger={"disabled"}
      flipByProp={flip}
      containerStyle={{
        width: "fit-content",
        height: "fit-content",
        transitionDuration: "1s",
      }}
      frontComponent={props.children}
      backComponent={
        props.result === "match" ? <CorrectTick /> : <InCorrectTick />
      }
    />
  );
};

export default MatchCard;
