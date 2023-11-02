/* eslint-disable react/no-unescaped-entities */
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import _ from "lodash";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { twMerge } from "tailwind-merge";
Chart.register(ArcElement);

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

export function SpeechToTextComponent() {
  const [isListening, setIsListening] = useState(false);
  const speechConfig = useRef<sdk.SpeechConfig>();
  const audioConfig = useRef<sdk.AudioConfig>();
  const recognizer = useRef<sdk.SpeechRecognizer>();

  const [pronouciationScore, setPronouciationScore] = useState({
    accuracy: 0,
    pronunciation: 0,
    completeness: 0,
    fluency: 0,
  });
  const [wordDetail, setWordDetail] = useState<Array<WordResult>>([]);
  const [myTranscript, setMyTranscript] = useState("");
  const [recognizingTranscript, setRecTranscript] = useState("");

  useEffect(() => {
    (speechConfig.current as sdk.SpeechConfig) =
      sdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
    (speechConfig.current as sdk.SpeechConfig).speechRecognitionLanguage =
      "en-US";

    audioConfig.current = sdk.AudioConfig.fromDefaultMicrophoneInput();
    (recognizer.current as sdk.SpeechRecognizer) = new sdk.SpeechRecognizer(
      speechConfig.current as sdk.SpeechConfig,
      audioConfig.current
    );

    var reference_text = "What's the weather like today ?";
    // create pronunciation assessment config, set grading system, granularity and if enable miscue based on your requirement.
    const pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
      reference_text,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      true
    );

    pronunciationAssessmentConfig.applyTo(
      recognizer.current as sdk.SpeechRecognizer
    );

    function onRecognizedResult(result: sdk.SpeechRecognitionResult) {
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
      (recognizer.current as sdk.SpeechRecognizer).close();
    }

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

        setRecTranscript(transcript);
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
  }, []);

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
    console.log(point < 60);
    let colorClass = "";
    switch (true) {
      case (point <= 100 && point >= 80): {
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

  const accuracyData = {
    labels: ["Accuracy"],
    datasets: [
      {
        data: [pronouciationScore.accuracy, 100 - pronouciationScore.accuracy],
        backgroundColor: ["#FF5733", "#EEEEEE"],
      },
    ],
  };

  const fluencyData = {
    labels: ["Fluency"],
    datasets: [
      {
        data: [pronouciationScore.fluency, 100 - pronouciationScore.fluency],
        backgroundColor: ["#54AB72", "#EEEEEE"],
      },
    ],
  };

  const completenessData = {
    labels: ["Completeness"],
    datasets: [
      {
        data: [
          pronouciationScore.completeness,
          100 - pronouciationScore.completeness,
        ],
        backgroundColor: ["#0F172A", "#EEEEEE"],
      },
    ],
  };

  const pronunciationData = {
    labels: ["Pronunciation"],
    datasets: [
      {
        data: [
          pronouciationScore.pronunciation,
          100 - pronouciationScore.pronunciation,
        ],
        backgroundColor: ["#3F83F8", "#EEEEEE"],
      },
    ],
  };

  return (
    <div className="min-h-[300px] smart-edu-block">
      <p className="mb-10">
        <b>Paragraph:</b> What's the weather like today ?
      </p>
      <button
        className="mr-5 rounded-full bg-primary-green text-white px-5 py-2"
        onClick={resumeListening}
      >
        Start Recording
      </button>
      <button onClick={stopListening}>Stop Recording</button>
      <div className="mt-10 grid grid-cols-4">
        <div className="flex flex-col gap-10 items-center">
          <h3>Accuracy</h3>
          <h3>{pronouciationScore.accuracy}</h3>
          <Doughnut
            className="scale-75"
            data={accuracyData}
            options={options}
          />
        </div>
        <div className="flex flex-col gap-10 items-center">
          <h3>Pronunciation</h3>
          <h3>{pronouciationScore.pronunciation}</h3>
          <Doughnut
            className="scale-75"
            data={pronunciationData}
            options={options}
          />
        </div>
        <div className="flex flex-col gap-10 items-center">
          <h3>Fluency</h3>
          <h3>{pronouciationScore.fluency}</h3>
          <Doughnut className="scale-75" data={fluencyData} options={options} />
        </div>
        <div className="flex flex-col gap-10 items-center">
          <h3>Completeness</h3>
          <h3>{pronouciationScore.completeness}</h3>
          <Doughnut
            className="scale-75"
            data={completenessData}
            options={options}
          />
        </div>
      </div>
      <div className="mt-10 flex gap-5 justify-center">
        {wordDetail.map((word, index) => (
          <div className="text-center" key={index}>
            <p className="text-[20px]">{word.Word}</p>
            <p
              className={twMerge(
                "text-[20px] mt-3",
                getColorByPoint(
                  word.PronunciationAssessment?.AccuracyScore as number
                )
              )}
            >
              {word.PronunciationAssessment?.AccuracyScore}
            </p>
            {word.PronunciationAssessment?.ErrorType !== "None" && (
              <p className="mt-3 text-red-600">
                {word.PronunciationAssessment?.ErrorType}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
