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

interface GameScreenProps {
  // score: PronouceScore
  setCardResult: (res: IResult) => void;
}

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

const GameScreen: FunctionComponent<GameScreenProps> = ({ setCardResult }) => {
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
    setCardResult({
      thumbnail: flashCards[currentCard]?.image,
      keyword: flashCards[currentCard]?.paragraph || "",
      voice: transcript,
      result: correct,
    });
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
    >
      <div className="flex flex-col gap-6 items-center relative">
        {/* <div className="relative">
          {!transcript ? (
            !listening ? (
              <Button
                onClick={handleStartListening}
                type="primary"
                className="z-10 absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-center px-8 py-3"
              >
                <RsIcon type="microphone" />
              </Button>
            ) : (
              <Lottie
                animationData={loading}
                className="w-[200px] z-10 absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-center px-8 py-3"
                loop={true}
              />
            )
          ) : (
            <div></div>
          )} */}
        <TransitionGroup>
          <CSSTransition
            key={flashCards[currentCard].paragraph}
            timeout={1000}
            classNames={{
              enter: "opacity-0 absolute",
              enterActive: "animate-appearFromRight animation-delay-1000",
              exitActive: "opacity-0 animate-fadeToLeft",
            }}
          >
            <ReactFlipCard
              flipTrigger={"disabled"}
              flipByProp={!!transcript}
              containerStyle={{
                width: "fit-content",
                height: "fit-content",
                transitionDuration: "1s",
              }}
              frontComponent={
                <div className="flex h-[420px] w-[420px] justify-center items-center p-1 bg-white rounded-2xl overflow-hidden relative">
                  <Image
                    src={flashCards[currentCard].image}
                    alt="Game image"
                    className="w-full h-full object-cover rounded-2xl"
                    width={500}
                    height={500}
                  />
                  {!transcript ? (
                    !listening ? (
                      <Button
                        onClick={handleStartListening}
                        type="primary"
                        className="z-10 absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-center px-8 py-3"
                      >
                        <RsIcon type="microphone" />
                      </Button>
                    ) : (
                      <Lottie
                        animationData={loading}
                        className="w-[200px] z-10 absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-center px-8 py-3"
                        loop={true}
                      />
                    )
                  ) : (
                    <div></div>
                  )}
                </div>
              }
              backComponent={
                <div className="flex h-[420px] w-[420px] flex-col gap-2 justify-center items-center p-[1px] bg-white rounded-xl">
                  <p className="text-[60px] font-bold text-primary-green">
                    {flashCards[currentCard].paragraph}
                  </p>
                  <div className="flex items-center gap-2">
                    <RsIcon type={correct ? "checked" : "close-with-circle"} />
                    <p className={"font-bold text-independence"}>
                      {correct ? "Chính xác" : "Không chính xác"}
                    </p>
                  </div>
                  <div className="flex justify-center gap-2 mt-12">
                    <Button
                      className="flex gap-2 items-center bg-independence text-white font-bold"
                      type="primary"
                      onClick={handleRetry}
                    >
                      <RsIcon type="reload" />
                      Thử lại
                    </Button>
                    <Button
                      className="flex gap-2 items-center text-white font-bold"
                      type="primary"
                      onClick={handleContinue}
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   setPronouciationScore(initialScore);
                      //   return handleContinue();
                      // }}
                    >
                      Tiếp tục
                      <RsIcon type="caret-right" />
                    </Button>
                  </div>
                </div>
              }
            />
          </CSSTransition>
        </TransitionGroup>
        <div className="rounded-xl border bg-ghost-white p-3">
          <div className="flex gap-6 items-center">
            <RsIcon
              onClick={() => handleChangeSlide("prev")}
              className="cursor-pointer"
              type="prev-media-button"
            />
            <div>
              <span className="text-primary-green">{currentCard + 1}</span>/
              {flashCards.length}
            </div>
            <RsIcon
              onClick={() => handleChangeSlide("next")}
              className="cursor-pointer"
              type="next-media-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
