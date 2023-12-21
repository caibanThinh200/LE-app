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
  useCallback,
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
import MatchCard from "./Card";

interface GameScreenProps {}

const cardData = [
  {
    type: "text",
    key: 1,
    title: "Bear",
  },
  {
    type: "image",
    url: "/images/bear.png",
    key: 2,
    title: "Bear",
  },
  {
    type: "text",
    key: 3,
    title: "Monkey",
  },
  {
    type: "image",
    key: 4,
    title: "Monkey",
    url: "https://study.com/cimages/videopreview/oqsdgp8y6y.jpg",
  },
  {
    type: "text",
    key: 5,
    title: "Chair",
  },
  {
    type: "image",
    key: 6,
    title: "Chair",
    url: "https://cdn11.bigcommerce.com/s-fj5u5hhzyb/images/stencil/747x560/products/27583/17579/T03846_264__52100.1.jpg",
  },
  {
    type: "text",
    key: 7,
    title: "Dog",
  },
  {
    type: "image",
    key: 8,
    title: "Dog",
    url: "https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J",
  },
  {
    type: "text",
    key: 9,
    title: "Bean",
  },
  {
    type: "image",
    key: 10,
    title: "Bean",
    url: "https://www.jessicagavin.com/wp-content/uploads/2020/05/how-to-cook-pinto-beans-6-1200.jpg",
  },
];

type Card = {
  type: string;
  key: number;
  title: string;
  url?: string;
};

const CardMatchScreen: FunctionComponent<GameScreenProps> = () => {
  const [listCard, setListCard] = useState<
    (Card & { status?: "picked" | "not picked"; match: boolean })[]
  >([]);
  const [selectedCard, setSelectedCard] = useState<
    (Card & { index: number })[]
  >([]);

  useEffect(() => {
    const shuffle = (array: Card[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    setListCard(
      shuffle(
        cardData.map((card) => ({
          ...card,
          status: "not picked",
          match: false,
        }))
      ) as (Card & { status?: "picked" | "not picked"; match: boolean })[]
    );
  }, []);

  useEffect(() => {
    if (selectedCard.length === 2) {
      if (selectedCard[0].title === selectedCard[1].title) {
        setListCard(
          listCard.map((card) => {
            if (
              card.key === selectedCard[0].key ||
              card.key === selectedCard[1].key
            ) {
              card.status = "picked";
              card.match = true;
            }
            return card;
          })
        );
      } else {
        setListCard(
          listCard.map((card) => {
            if (
              card.key === selectedCard[0].key ||
              card.key === selectedCard[1].key
            ) {
              card.status = "picked";
              // setTimeout(() => {
              //   card.status = "not picked";
              // }, 2000);
              card.match = false;
            }
            return card;
          })
        );
      }
      setSelectedCard([]);
    }
  }, [selectedCard, listCard]);

  const handleSelectedCard = useCallback(
    (card: Card) => {
      if (!selectedCard.map((card) => card.type).includes(card.type)) {
        setSelectedCard([
          ...selectedCard,
          { ...card, index: selectedCard.length },
        ]);
      }
    },
    [selectedCard]
  );

  const handleFlipCard = (
    card: Card & { status?: "picked" | "not picked"; match: boolean }
  ) => {
    let result = "none";
    if (card.status === "picked") {
      result = card.match ? "match" : "unmatch";
    }
    return result as "match" | "unmatch" | "none";
  };

  return (
    <div
      className="relative container flex justify-center items-center rounded-3xl p-10 overflow-visible group w-9/12"
      style={{
        background: "url(/images/sky.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex gap-6 justify-center flex-wrap">
        {listCard.length > 0 &&
          listCard.map((card, index) =>
            card.type === "text" ? (
              <MatchCard result={handleFlipCard(card)} key={card.key}>
                <div
                  onClick={() => handleSelectedCard(card)}
                  className={twMerge(
                    "cursor-pointer bg-white w-[154px] h-[154px] rounded-xl p-3 flex justify-center items-center relative",
                    card.status === "picked" && ""
                  )}
                  key={index}
                >
                  {selectedCard.map((card) => card.key).includes(card.key) && (
                    <div className="absolute rounded-xl w-full h-full bg-white/70 flex justify-center items-center">
                      <p className="font-bold text-[48px] text-independence animate-fadeIn">
                        {(selectedCard.find(
                          (cardSelected) => cardSelected.key === card.key
                        )?.index as number) + 1}
                      </p>
                    </div>
                  )}
                  <p className="font-bold text-2xl text-primary-green">
                    {card.title}
                  </p>
                </div>{" "}
              </MatchCard>
            ) : (
              <MatchCard result={handleFlipCard(card)} key={card.key}>
                <div
                  onClick={() => handleSelectedCard(card)}
                  className={twMerge(
                    "relative cursor-pointer bg-white w-[154px] h-[154px] rounded-xl p-1",
                    card.status === "picked" && ""
                  )}
                >
                  {selectedCard.map((card) => card.key).includes(card.key) && (
                    <div className="absolute rounded-xl top-0 left-0  w-full h-full bg-white/70 flex justify-center items-center">
                      <p className="font-bold text-[48px] text-independence animate-fadeIn">
                        {(selectedCard.find(
                          (cardSelected) => cardSelected.key === card.key
                        )?.index as number) + 1}
                      </p>
                    </div>
                  )}
                  <img
                    src={card.url as string}
                    alt="Game image"
                    className="w-full h-full object-cover rounded-xl"
                    width={500}
                    height={500}
                  />
                </div>{" "}
              </MatchCard>
            )
          )}
      </div>
    </div>
  );
};

export default CardMatchScreen;
