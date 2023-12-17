"use client";

import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import { convertTimeToSeconds, secondsToHms } from "@/app/util/function";
import Image from "next/image";
import React, {
  useState,
  FunctionComponent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import ReactFlipCard from "reactjs-flip-card";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Lottie from "lottie-react";
import * as loading from "../../../public/lottie/loading.json";
import { twMerge } from "tailwind-merge";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { IResult } from "../flash-card/page";

interface GameScreenProps {}

const cardData = [
  {
    paragraph: "Bear",
    image: "/images/bear.png",
  },
  {
    paragraph: "Dog",
    image:
      "https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J",
  },
];

const CardMatchScreen: FunctionComponent<GameScreenProps> = () => {
  const [result, setResult] = useState(false);
  const [paragraph, setParagraph] = useState("Bear");
  const [flip, setFlip] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [currentCard, setCurrentCard] = useState(0);
  const [flashCards, setFlashCard] = useState(cardData);

  const correct =
    transcript.toLowerCase() ===
    flashCards[currentCard].paragraph.toLowerCase();

  useEffect(() => {
    setFlip(!!transcript);
  }, [transcript]);

  const handleStartListening = async () => {
    return await SpeechRecognition.startListening();
  };

  const handleStopListening = () => {
    return SpeechRecognition.stopListening();
  };

  const handleChangeSlide = (action: "next" | "prev") => {
    setCurrentCard(
      action === "next"
        ? currentCard < flashCards.length - 1
          ? currentCard + 1
          : currentCard
        : currentCard > 0
        ? currentCard - 1
        : currentCard
    );
  };

  const handleContinue = () => {
    resetTranscript();
    setFlip(false);
    handleChangeSlide("next");
  };

  const handleRetry = () => {
    resetTranscript();
  };

  return (
    <div
      className="relative rounded-3xl p-10 overflow-visible group w-9/12"
      style={{
        background: "url(/images/sky.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
};

export default CardMatchScreen;
