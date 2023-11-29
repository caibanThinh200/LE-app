import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import {
  Dispatch,
  Fragment,
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
  const [pronouciationScore, setPronouciationScore] = useState({
    accuracy: 0,
    pronunciation: 0,
    completeness: 0,
    fluency: 0,
  });

  useEffect(() => {
    if (currentPronounce) {
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
        setWordDetail(pronunciation_result.detailResult.Words);
        setHasResult(true);
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
  }, [currentPronounce]);

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
    <Transition appear show={!!currentPronounce} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setCurrentPronounce(undefined)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 over flow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[520px] min-h-[200px] overflow-hidden rounded-xl bg-white transition-all flex flex-col">
                <div className="min-h-[300px] h-fit p-5 bg-white relative">
                  {currentPronounce && !averageScore ? (
                    <div className="flex flex-col justify-between min-h-[inherit]">
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="font-bold text-lg text-independence text-center mx-auto">
                          {currentPronounce?.paragraph}
                        </p>
                      </div>
                      <div className="p-4 flex w-full justify-center">
                        <Button
                          className="flex gap-2 items-center"
                          // onClick={() => setCurrentPronounce(undefined)}
                          type="primary"
                        >
                          <RsIcon type="microphone" />
                          Chọn để nói
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      <div className="text-center">
                        <p className="text-lg font-bold text-independence">
                          {averageScore > 50
                            ? "Tốt lắm 🥰"
                            : "Bạn cần cố gắng thêm 😟"}
                        </p>
                      </div>
                      <div className="border border-primary-green rounded-xl p-6 py-10 bg-gradient-green-3">
                        <div className="gap-8 flex items-center">
                          <div className="text-primary-green text-2xl font-bold w-1/2">
                            {currentPronounce?.paragraph}
                          </div>
                          <div className="w-1/2">
                            <Doughnut
                              className="scale-75"
                              data={averageData}
                              options={options}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center gap-2">
                        <Button
                          className="flex gap-2 items-center bg-independence text-white font-bold"
                          type="primary"
                        >
                          <RsIcon type="reload" />
                          Thử lại
                        </Button>
                        <Button
                          className="flex gap-2 items-center text-white font-bold"
                          type="primary"
                          onClick={() => handleContinue()}
                        >
                          Tiếp tục
                          <RsIcon type="caret-right" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Pronounce;
