"use client";

import { useState } from "react";
import 'regenerator-runtime/runtime'
import GameSreen from "../components/GameScreen";
import ScoreBoard from "../components/ScoreBoard";

interface IFlashCard {}

export interface IResult {
  thumbnail: string;
  keyword: string;
  voice: string;
  result: boolean;
}

const FlashCard: React.FC<IFlashCard> = (props) => {
  const [result, setResult] = useState<IResult[]>([]);

  const handleUpdateResult = (res: IResult) => {
    setResult([...result, res]);
  };

  return (
    <div className="container mx-auto py-4 max-w-[1440px]">
      <div className="flex h-[80vh] mt-5 gap-6">
        <GameSreen setCardResult={handleUpdateResult} />
        <div className="h-full w-3/12">
          <ScoreBoard result={result} />
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
