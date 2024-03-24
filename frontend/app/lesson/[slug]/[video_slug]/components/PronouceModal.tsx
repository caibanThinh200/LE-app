import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import {
  Dispatch,
  Fragment,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pronouce } from "./Video";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { Doughnut } from "react-chartjs-2";
import { Tooltip } from "react-tooltip";
import Lottie from "lottie-react";
import * as loading from "../../../../../public/lottie/loading-2.json";
import * as correct from "../../../../../public/lottie/pronouce-success.json";
import * as incorrect from "../../../../../public/lottie/prnouce-failed.json";
import { twMerge } from "tailwind-merge";

interface IPronounceProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  currentPronounce: Pronouce;
  setCurrentPronounce: Dispatch<SetStateAction<Pronouce | undefined>>;
  handleContinue: () => void;
}

interface WordResult {
  Word: string;
  Phonemes: {
    Phoneme?: string;
    PronunciationAssessment?: {
      NBestPhonemes: {
        Phoneme: string;
      }[];
    };
  }[];
  PronunciationAssessment?: {
    AccuracyScore: number;
    ErrorType: string;
  };
  Syllables: {
    Syllable: string;
  }[];
}

const errorType = {
  Mispronunciation: "Chưa chuẩn xác",
};

const SPEECH_KEY = "afc6b1de18844a51a7e0bb13d06a26a7";
const SPEECH_REGION = "eastus";
const initialScore = {
  accuracy: 0,
  pronunciation: 0,
  completeness: 0,
  fluency: 0,
  prodosy: 0,
};

const Pronounce: React.FC<IPronounceProps> = ({
  currentPronounce,
  setCurrentPronounce,
  handleContinue,
}) => {
  const speechConfig = useRef<sdk.SpeechConfig>();
  const audioConfig = useRef<sdk.AudioConfig>();
  const recognizer = useRef<sdk.SpeechRecognizer>();

  const [isListening, setIsListening] = useState(false);
  const [wordDetail, setWordDetail] = useState<Array<WordResult>>([]);
  const [hasResult, setHasResult] = useState(false);
  const [pronouciationScore, setPronouciationScore] = useState(initialScore);
  const [animationLoading, setAnimationLoading] = useState(false);

  const correctAudio = new Audio("/mp3/correct.mp3");
  const inCorrectAudio = new Audio("/mp3/incorrect.mp3");
  const startRecordingAudio = new Audio("/mp3/start-record.mp3");

  useEffect(() => {
    (speechConfig.current as sdk.SpeechConfig) =
      sdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
    (speechConfig.current as sdk.SpeechConfig).speechRecognitionLanguage =
      "en-US";
    audioConfig.current = sdk.AudioConfig.fromMicrophoneInput();
    (recognizer.current as sdk.SpeechRecognizer) = new sdk.SpeechRecognizer(
      speechConfig.current as sdk.SpeechConfig,
      audioConfig.current
    );
    if (currentPronounce.paragraph) {
      const pronunciationAssessmentConfig =
        new sdk.PronunciationAssessmentConfig(
          currentPronounce?.paragraph,
          sdk.PronunciationAssessmentGradingSystem.HundredMark,
          sdk.PronunciationAssessmentGranularity.Phoneme,
          true
        );
      pronunciationAssessmentConfig.enableProsodyAssessment = true;
      // create pronunciation assessment config, set grading system, granularity and if enable miscue based on your requirement.
      pronunciationAssessmentConfig.applyTo(
        recognizer.current as sdk.SpeechRecognizer
      );
    }
    // (recognizer.current as sdk.SpeechRecognizer)?.recognizeOnceAsync(function (
    //   successfulResult
    // ) {
    //   let pronunciation_result =
    //     sdk.PronunciationAssessmentResult.fromResult(successfulResult);
    //   // console.log(pronunciation_result);
    //   // onRecognizedResult(successfulResult);
    // });
    // handleOpenMic();
    return () => {
      (
        recognizer.current as sdk.SpeechRecognizer
      )?.stopContinuousRecognitionAsync(() => {
        setIsListening(false);
      });
    };
  }, [currentPronounce, setCurrentPronounce]);

  useEffect(() => {
    // handleOpenMic();
  }, [hasResult]);

  const onRecognizedResult = (result: sdk.SpeechRecognitionResult) => {
    let pronunciation_result =
      sdk.PronunciationAssessmentResult.fromResult(result);
    setPronouciationScore({
      accuracy: pronunciation_result.accuracyScore,
      pronunciation: pronunciation_result.pronunciationScore,
      completeness: pronunciation_result.completenessScore,
      fluency: pronunciation_result.fluencyScore,
      prodosy: pronunciation_result.prosodyScore,
    });
    setCurrentPronounce({
      ...currentPronounce,
      pronouceParagraph: result.text,
      score: {
        accuracy: pronunciation_result.accuracyScore,
        pronunciation: pronunciation_result.pronunciationScore,
        completeness: pronunciation_result.completenessScore,
        fluency: pronunciation_result.fluencyScore,
        average:
          Object.keys(
            pronunciation_result.detailResult.PronunciationAssessment
          ).reduce(
            (prev, current) =>
              prev +
              pronunciation_result.detailResult.PronunciationAssessment[
                current as "AccuracyScore"
              ],
            0
          ) /
          Object.keys(pronunciation_result.detailResult.PronunciationAssessment)
            .length,
      },
    });
    setWordDetail(pronunciation_result.detailResult.Words);
    setHasResult(true);
    setAnimationLoading(false);
    stopListening();
  };

  const processRecognizedTranscript = (
    event: sdk.SpeechRecognitionEventArgs
  ) => {
    const result = event.result;
    let pronunciation_result =
      sdk.PronunciationAssessmentResult.fromResult(result);
    console.log(pronunciation_result);
    onRecognizedResult(result);
  };

  const processRecognizingTranscript = (event: any) => {
    const result = event.result;
    // console.log("Recognition result:", result);
    if (result.reason === sdk.ResultReason.RecognizingSpeech) {
      const transcript = result.text;
    }
  };

  const handleOpenMic = () => {
    startRecordingAudio.play();
    setAnimationLoading(true);
    // (recognizer.current as sdk.SpeechRecognizer)?.recognizeOnceAsync(function (
    //   successfulResult
    // ) {
    //   let pronunciation_result =
    //     sdk.PronunciationAssessmentResult.fromResult(successfulResult);
    //   console.log(pronunciation_result);
    //   onRecognizedResult(successfulResult);
    // });
    (
      recognizer.current as sdk.SpeechRecognizer
    ).startContinuousRecognitionAsync();
    (recognizer.current as sdk.SpeechRecognizer).recognized = (s, e) =>
      // processRecognizedTranscript(e);
      {
        let pronunciation_result = sdk.PronunciationAssessmentResult.fromResult(
          e.result
        );
        console.log(pronunciation_result);
        setPronouciationScore({
          accuracy: pronunciation_result.accuracyScore,
          pronunciation: pronunciation_result.pronunciationScore,
          completeness: pronunciation_result.completenessScore,
          fluency: pronunciation_result.fluencyScore,
          prodosy: pronunciation_result.prosodyScore,
        });
        setCurrentPronounce({
          ...currentPronounce,
          pronouceParagraph: e.result.text,
          score: {
            accuracy: pronunciation_result.accuracyScore,
            pronunciation: pronunciation_result.pronunciationScore,
            completeness: pronunciation_result.completenessScore,
            fluency: pronunciation_result.fluencyScore,
            average:
              Object.keys(
                pronunciation_result.detailResult.PronunciationAssessment
              ).reduce(
                (prev, current) =>
                  prev +
                  pronunciation_result.detailResult.PronunciationAssessment[
                    current as "AccuracyScore"
                  ],
                0
              ) /
              Object.keys(
                pronunciation_result.detailResult.PronunciationAssessment
              ).length,
          },
        });
        setWordDetail(pronunciation_result.detailResult.Words);
        setHasResult(true);
        setAnimationLoading(false);
        stopListening();
      };
    //  (recognizer.current as sdk.SpeechRecognizer).recognized
    (
      recognizer.current as sdk.SpeechRecognizer
    ).startContinuousRecognitionAsync(() => {
      setIsListening(true);
    });
    (
      recognizer.current as sdk.SpeechRecognizer
    )?.stopContinuousRecognitionAsync(() => {
      setIsListening(false);
    });
  };

  // const pauseListening = () => {
  //   setIsListening(false);
  //   (
  //     recognizer.current as sdk.SpeechRecognizer
  //   ).stopContinuousRecognitionAsync();
  //   console.log("Paused listening.");
  // };

  // const resumeListening = () => {
  //   if (!isListening) {
  //     setIsListening(true);
  //     (
  //       recognizer.current as sdk.SpeechRecognizer
  //     ).startContinuousRecognitionAsync(() => {
  //       console.log("Resumed listening...");
  //     });
  //   }
  // };

  const stopListening = () => {
    setIsListening(false);
    (recognizer.current as sdk.SpeechRecognizer).stopContinuousRecognitionAsync(
      () => {
        console.log("Speech recognition stopped.");
      }
    );
    recognizer.current?.close();
  };

  const getColorByPoint = useCallback((point: number) => {
    let colorClass = "";
    switch (true) {
      case point <= 100 && point >= 60: {
        colorClass = "underline text-primary-green";
        break;
      }
      case point < 60 && point >= 30: {
        colorClass = "underline text-yellow-600";
        break;
      }
      case point < 30: {
        colorClass = "underline text-red-600";
        break;
      }
      default:
        colorClass = "underline text-primary-green";
    }

    return colorClass;
  }, []);

  const options = useMemo(
    () => ({
      cutout: "70%", // Adjust the size of the donut hole
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    }),
    []
  );

  const handleRetry = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    setCurrentPronounce({
      ...currentPronounce,
      score: initialScore,
      pronouceParagraph: "",
    });
    setHasResult(false);
    setPronouciationScore(initialScore);
  };

  const pronoucedWord =
    wordDetail?.length / currentPronounce?.paragraph?.split(" ")?.length + 0.2;

  const averageScore =
    (Object.keys(pronouciationScore).reduce(
      (prev, current) => prev + pronouciationScore[current as "accuracy"],
      0
    ) /
      Object.keys(pronouciationScore).length) *
    pronoucedWord;

  const averageData = {
    labels: ["Total"],
    datasets: [
      {
        data: [averageScore, 100 - averageScore],
        backgroundColor: [averageScore > 50 ? "#2AB032" : "#F05252", "#EEEEEE"],
      },
    ],
  };

  useEffect(() => {
    if (hasResult) {
      if (averageScore > 50) {
        // setTimeout(() => {
        //   handleContinue();
        // }, 3000);
        correctAudio.play();
      } else {
        inCorrectAudio.play();
      }
    }
  }, [averageScore]);

  const pronounceLabel = {
    accuracy: "Chính xác",
    pronunciation: "Lưu loát",
    completeness: "Hoàn thiện",
    fluency: "Vần điệu",
    prodosy: "Thi pháp",
  };

  return (
    <div
      // onClick={(e) => setCurrentPronounce(undefined)}
      className={twMerge(
        "absolute bg-black/80 top-0 delay-500 left-0 transition-all w-full h-full flex justify-center items-center",
        !!currentPronounce ? "opacity-100 z-50" : "opacity-0 -z-10"
      )}
    >
      <div
        className={twMerge(
          "min-w-[420px] p-5 px-10 rounded-xl bg-ghost-white relative z-[100]",
          !!currentPronounce ? "animate-fadeIn" : "animate-fadeOut"
        )}
      >
        {!animationLoading ? (
          currentPronounce && averageScore === 0 ? (
            <div className="flex flex-col justify-between min-h-[inherit]">
              <div className="flex-1 flex flex-col justify-center">
                <div className="h-[300px] flex items-center justify-center">
                  <p className="font-bold text-lg text-independence text-center mx-auto">
                    {currentPronounce?.paragraph}
                  </p>
                </div>
              </div>
              <div className="p-4 flex w-full justify-center">
                <Button
                  className="flex gap-2 items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenMic();
                  }}
                  type="primary"
                >
                  <RsIcon type="microphone" />
                  Chọn để nói
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={twMerge(
                "flex flex-col gap-6",
                !!currentPronounce ? "animate-fadeIn" : "animate-fadeOut"
              )}
            >
              <div className="text-center">
                <p className="text-lg font-bold text-independence">
                  {averageScore > 50 ? (
                    <div className="flex gap-0 items-center justify-center">
                      <p className="text-xl"> Tốt lắm</p>
                      {/* <Image
                        src={"/images/success.png"}
                        className="w-[100px] h-[80px]"
                        alt="success"
                        width={200}
                        height={200}
                      /> */}
                      <Lottie animationData={correct} className="w-[100px] h-[80px]" loop={false} />
                    </div>
                  ) : (
                    <div className="flex gap-0 items-center justify-center">
                      <p>Bạn cần cố gắng thêm</p>
                      {/* <Image
                        src={"/images/failed.png"}
                        className="w-[100px] h-[80px]"
                        alt="success"
                        width={200}
                        height={200}
                      /> */}
                      <Lottie animationData={incorrect} className="w-[100px] h-[80px]" loop={false} />
                    </div>
                  )}
                </p>
              </div>
              <div className="border border-primary-green rounded-xl p-6 py-5 bg-gradient-green-3">
                <div className="gap-8 flex items-center">
                  <div className="w-1/2">
                    <p className="text-primary-green text-2xl font-bold w-full">
                      {currentPronounce.paragraph
                        .split(" ")
                        .map((text, index) => {
                          if (
                            wordDetail
                              .map((w) => w.Word.toLowerCase())
                              .includes(text.toLowerCase())
                          ) {
                            const w = wordDetail.find(
                              (word) =>
                                word.Word.toLocaleLowerCase() ===
                                text.toLowerCase()
                            ) as WordResult;
                            return (
                              <span
                                id={`word-${index}`}
                                key={index}
                                className={getColorByPoint(
                                  w.PronunciationAssessment
                                    ?.AccuracyScore as number
                                )}
                              >
                                {w.Word}{" "}
                                <Tooltip
                                  anchorSelect={`#word-${index}`}
                                  place="top"
                                >
                                  <div className="flex flex-col gap-2">
                                    <p>
                                      Điểm:{" "}
                                      {w.PronunciationAssessment?.AccuracyScore}
                                    </p>
                                    {w.PronunciationAssessment?.ErrorType !==
                                      "None" && (
                                      <p>
                                        Lỗi:{" "}
                                        {
                                          errorType[
                                            w.PronunciationAssessment
                                              ?.ErrorType as "Mispronunciation"
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                </Tooltip>{" "}
                              </span>
                            );
                          } else {
                            return (
                              <span
                                id={`word-${index}`}
                                className="underline text-red-600"
                                key={index}
                              >
                                {text}
                                <Tooltip
                                  anchorSelect={`#word-${index}`}
                                  place="top"
                                >
                                  <p className="text-sm font-light">
                                    Từ này chưa được phát âm
                                  </p>
                                </Tooltip>{" "}
                              </span>
                            );
                          }
                        })}
                    </p>
                  </div>
                  <div className="w-1/3 relative flex flex-col gap-0">
                    <div className="relative">
                      <p className="text-[24px] text-independence absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {Math.round((averageScore + Number.EPSILON) * 100) /
                          100}
                        %
                      </p>
                      <Doughnut
                        className="w-full"
                        data={averageData}
                        options={options}
                      />
                    </div>
                    <div>
                      <p
                        className="text-independence text-center cursor-pointer"
                        id="detail"
                      >
                        Xem chi tiết
                      </p>
                      <Tooltip anchorSelect="#detail" place="top">
                        <ul className="flex flex-col gap-4">
                          {Object.keys(pronouciationScore).map((key) => (
                            <li key={key}>
                              {pronounceLabel[key as "accuracy"]}:{" "}
                              {pronouciationScore[key as "accuracy"]}
                            </li>
                          ))}
                        </ul>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
              <div className={twMerge("flex justify-center gap-2")}>
                <Button
                  className="flex gap-2 items-center bg-independence text-white font-bold"
                  type="primary"
                  onClick={handleRetry}
                >
                  <RsIcon type="reload" />
                  Thử lại
                </Button>
                {/* <Button
                  className="flex gap-2 items-center bg-independence text-white font-bold"
                  type="primary"
                  onClick={stopListening}
                >
                  <RsIcon type="reload" />
                  Ngưng record
                </Button> */}
                <Button
                  className="flex gap-2 items-center text-white font-bold"
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPronouciationScore(initialScore);
                    return handleContinue();
                  }}
                >
                  Tiếp tục
                  <RsIcon type="caret-right" />
                </Button>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold text-lg text-independence text-center mx-auto">
              {currentPronounce?.paragraph}
            </p>
            <Lottie animationData={loading} className="w-[250px]" loop={true} />
            <p className="text-independence text-center mx-auto">
              Đang ghi nhận giọng nói...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pronounce;
