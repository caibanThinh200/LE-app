"use client";
import "regenerator-runtime/runtime";
import { useState } from "react";
// import GameSreen from "../components/GameScreen";
import ScoreBoard from "../components/CardMatchScoreBoard";
import CardMatchScreen from "../components/CardMatchScreen";

interface IFlashCard {}

export interface IResult {
  thumbnail: string;
  keyword: string;
  voice: string;
  result: boolean;
}

const MatchCard: React.FC<IFlashCard> = (props) => {
  return (
    <div className="container mx-auto py-4 max-w-[1440px]">
      <div className="flex h-[80vh] mt-5 gap-6">
        {/* <GameSreen setCardResult={handleUpdateResult} /> */}
        <CardMatchScreen />
        <div className="h-full w-3/12">
          <ScoreBoard />
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
