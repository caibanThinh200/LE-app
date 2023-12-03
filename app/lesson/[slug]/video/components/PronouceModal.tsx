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
import { SpeechToTextComponent } from "@/app/components/SpeechToText";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { Doughnut } from "react-chartjs-2";
import { Tooltip } from "react-tooltip";
import Lottie from "lottie-react";
import * as loading from "../../../../../public/lottie/loading.json";
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

const SPEECH_KEY = "afc6b1de18844a51a7e0bb13d06a26a7";
const SPEECH_REGION = "eastus";
const initialScore = {
  accuracy: 0,
  pronunciation: 0,
  completeness: 0,
  fluency: 0,
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
  const [allowRecord, setAllowRecord] = useState(false);
  const [animationLoading, setAnimationLoading] = useState(false);

  useEffect(() => {
    if (currentPronounce && allowRecord) {
      (speechConfig.current as sdk.SpeechConfig) =
        sdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
      (speechConfig.current as sdk.SpeechConfig).speechRecognitionLanguage =
        "en-US";

      audioConfig.current = sdk.AudioConfig.fromDefaultMicrophoneInput();
      (recognizer.current as sdk.SpeechRecognizer) = new sdk.SpeechRecognizer(
        speechConfig.current as sdk.SpeechConfig,
        audioConfig.current
      );
      // create pronunciation assessment config, set grading system, granularity and if enable miscue based on your requirement.
      const pronunciationAssessmentConfig =
        new sdk.PronunciationAssessmentConfig(
          currentPronounce?.paragraph || "",
          sdk.PronunciationAssessmentGradingSystem.HundredMark,
          sdk.PronunciationAssessmentGranularity.Phoneme,
          true
        );

      pronunciationAssessmentConfig.applyTo(
        recognizer.current as sdk.SpeechRecognizer
      );

      const onRecognizedResult = (result: sdk.SpeechRecognitionResult) => {
        //   console.log("pronunciation assessment for: ", result.text);
        var pronunciation_result =
          sdk.PronunciationAssessmentResult.fromResult(result);
        setPronouciationScore({
          accuracy: pronunciation_result.accuracyScore,
          pronunciation: pronunciation_result.pronunciationScore,
          completeness: pronunciation_result.completenessScore,
          fluency: pronunciation_result.fluencyScore,
        });
        setCurrentPronounce({
          ...currentPronounce,
          pronouceParagraph: pronunciation_result.detailResult.Words.map(
            (word) => word.Word
          ).join(" "),
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
        setAllowRecord(false);
        (recognizer.current as sdk.SpeechRecognizer).close();
      };

      const processRecognizedTranscript = (
        event: sdk.SpeechRecognitionEventArgs
      ) => {
        const result = event.result;
        onRecognizedResult(result);
      };

      const processRecognizingTranscript = (event: any) => {
        const result = event.result;
        // console.log("Recognition result:", result);
        if (result.reason === sdk.ResultReason.RecognizingSpeech) {
          const transcript = result.text;
          // console.log("Transcript: -->", transcript);
          // Call a function to process the transcript as needed

          // setRecTranscript(transcript);
        }
      };
      (recognizer.current as sdk.SpeechRecognizer).recognizeOnceAsync(function (
        successfulResult
      ) {
        // console.log(successfulResult);
        onRecognizedResult(successfulResult);
      });

      (recognizer.current as sdk.SpeechRecognizer).recognized = (s, e) =>
        processRecognizedTranscript(e);
      // {
      //     console.log(e.result.text);
      // }

      (recognizer.current as sdk.SpeechRecognizer).recognizing = (s, e) =>
        processRecognizingTranscript(e);

      (
        recognizer.current as sdk.SpeechRecognizer
      ).startContinuousRecognitionAsync(() => {
        console.log("Speech recognition started.");
        setIsListening(true);
      });

      return () => {
        (
          recognizer.current as sdk.SpeechRecognizer
        ).stopContinuousRecognitionAsync(() => {
          setIsListening(false);
        });
      };
    }
  }, [currentPronounce, setCurrentPronounce, allowRecord]);

  const pauseListening = () => {
    setIsListening(false);
    (
      recognizer.current as sdk.SpeechRecognizer
    ).stopContinuousRecognitionAsync();
    console.log("Paused listening.");
  };

  const resumeListening = () => {
    if (!isListening) {
      setIsListening(true);
      (
        recognizer.current as sdk.SpeechRecognizer
      ).startContinuousRecognitionAsync(() => {
        console.log("Resumed listening...");
      });
    }
  };

  const stopListening = () => {
    setIsListening(false);
    (recognizer.current as sdk.SpeechRecognizer).stopContinuousRecognitionAsync(
      () => {
        console.log("Speech recognition stopped.");
      }
    );
  };

  const getColorByPoint = useCallback((point: number) => {
    let colorClass = "";
    switch (true) {
      case point <= 100 && point >= 80: {
        colorClass = "text-primary-green";
        break;
      }
      case point < 80 && point >= 60: {
        colorClass = "text-yellow-600";
        break;
      }
      case point < 60: {
        colorClass = "text-red-600";
        break;
      }
      default:
        colorClass = "text-primary-green";
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
    setPronouciationScore(initialScore);
  };

  const averageScore =
    Object.keys(pronouciationScore).reduce(
      (prev, current) => prev + pronouciationScore[current as "accuracy"],
      0
    ) / Object.keys(pronouciationScore).length;

  const averageData = {
    labels: ["Total"],
    datasets: [
      {
        data: [averageScore, 100 - averageScore],
        backgroundColor: [averageScore > 50 ? "#2AB032" : "#F05252", "#EEEEEE"],
      },
    ],
  };

  const pronounceLabel = {
    accuracy: "Chính xác",
    pronunciation: "Lưu loát",
    completeness: "Hoàn thiện",
    fluency: "Vần điệu",
  };

  // const accuracyData = {
  //   labels: ["Accuracy"],
  //   datasets: [
  //     {
  //       data: [pronouciationScore.accuracy, 100 - pronouciationScore.accuracy],
  //       backgroundColor: ["#FF5733", "#EEEEEE"],
  //     },
  //   ],
  // };

  // const fluencyData = {
  //   labels: ["Fluency"],
  //   datasets: [
  //     {
  //       data: [pronouciationScore.fluency, 100 - pronouciationScore.fluency],
  //       backgroundColor: ["#54AB72", "#EEEEEE"],
  //     },
  //   ],
  // };

  // const completenessData = {
  //   labels: ["Completeness"],
  //   datasets: [
  //     {
  //       data: [
  //         pronouciationScore.completeness,
  //         100 - pronouciationScore.completeness,
  //       ],
  //       backgroundColor: ["#0F172A", "#EEEEEE"],
  //     },
  //   ],
  // };

  // const pronunciationData = {
  //   labels: ["Pronunciation"],
  //   datasets: [
  //     {
  //       data: [
  //         pronouciationScore.pronunciation,
  //         100 - pronouciationScore.pronunciation,
  //       ],
  //       backgroundColor: ["#3F83F8", "#EEEEEE"],
  //     },
  //   ],
  // };
  return (
    <div
      onClick={(e) => setCurrentPronounce(undefined)}
      className={twMerge(
        "absolute bg-black/80 top-0 delay-500 left-0 transition-all w-full h-full flex justify-center items-center",
        !!currentPronounce ? "opacity-100 z-50" : "opacity-0 -z-10"
      )}
    >
      <div
        className={twMerge(
          "min-h-[200px] h-fit p-5 px-10 rounded-xl bg-white relative z-[100]",
          !!currentPronounce ? "animate-fadeIn" : "animate-fadeOut"
        )}
      >
        {!animationLoading ? (
          currentPronounce && averageScore === 0 ? (
            <div className="flex flex-col justify-between min-h-[inherit]">
              <div className="flex-1 flex flex-col justify-center">
                <p className="font-bold text-lg text-independence text-center mx-auto">
                  {currentPronounce?.paragraph}
                </p>
              </div>
              <div className="p-4 flex w-full justify-center">
                <Button
                  className="flex gap-2 items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAnimationLoading(true);
                    setTimeout(() => {
                      setAllowRecord(true);
                      setAnimationLoading(false);
                    }, 3000);
                  }}
                  type="primary"
                >
                  <RsIcon type="microphone" />
                  {allowRecord ? 'Hệ thống đang thu âm, hãy đọc mẫu câu trên' : 'Chọn để nói'}
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
                  {averageScore > 50 ? "Tốt lắm 🥰" : "Bạn cần cố gắng thêm 😟"}
                </p>
              </div>
              <div className="border border-primary-green rounded-xl p-6 py-10 bg-gradient-green-3">
                <div className="gap-8 flex items-center">
                  <div className="text-primary-green text-2xl font-bold w-1/2">
                    {currentPronounce?.paragraph}
                  </div>
                  <div className="w-1/2 relative flex flex-col gap-0">
                    <div className="relative">
                      <p className="text-[28px] text-independence absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {averageScore}%
                      </p>
                      <Doughnut
                        className="scale-75"
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
              <div className="flex justify-center gap-2">
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
          <Lottie
            animationData={loading}
            className="w-[400px]"
            loop={true}
          />
        )}
      </div>
    </div>
  );
};

export default Pronounce;
