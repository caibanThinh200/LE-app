"use client";

import React, { useState, useEffect, useRef } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const SPEECH_KEY = "afc6b1de18844a51a7e0bb13d06a26a7";
const SPEECH_REGION = "eastus";
const paragraph = "Stop giving me your opinion";

export default function SpeechToTextComponent() {
  const [isListening, setIsListening] = useState(false);
  const speechConfig = useRef<sdk.SpeechConfig>();
  const audioConfig = useRef<sdk.AudioConfig>();
  const recognizer = useRef<sdk.SpeechRecognizer>();

  const [myTranscript, setMyTranscript] = useState("");
  const [recognizingTranscript, setRecTranscript] = useState("");

  useEffect(() => {
    speechConfig.current = sdk.SpeechConfig.fromSubscription(
      SPEECH_KEY,
      SPEECH_REGION
    );
    speechConfig.current.speechRecognitionLanguage = "en-US";

    audioConfig.current = sdk.AudioConfig.fromDefaultMicrophoneInput();
    (recognizer.current as sdk.SpeechRecognizer) = new sdk.SpeechRecognizer(
      speechConfig.current,
      audioConfig.current
    );

    const pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
      paragraph,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      true
    );
    pronunciationAssessmentConfig.enableProsodyAssessment = true;
    // create pronunciation assessment config, set grading system, granularity and if enable miscue based on your requirement.
    pronunciationAssessmentConfig.applyTo(
      recognizer.current as sdk.SpeechRecognizer
    );

    const processRecognizedTranscript = (
      event: sdk.SpeechRecognitionEventArgs
    ) => {
      const result = event.result;
      console.log("Recognition result:", result);
      let pronunciation_result =
        sdk.PronunciationAssessmentResult.fromResult(result);
      console.log(pronunciation_result);

      if (result.reason === sdk.ResultReason.RecognizedSpeech) {
        const transcript = result.text;
        console.log("Transcript: -->", transcript);
        // Call a function to process the transcript as needed

        setMyTranscript(transcript);
      }
    };

    const processRecognizingTranscript = (
      event: sdk.SpeechRecognitionEventArgs
    ) => {
      const result = event.result;
      console.log("Recognition result:", result);
      if (result.reason === sdk.ResultReason.RecognizingSpeech) {
        const transcript = result.text;
        console.log("Transcript: -->", transcript);
        // Call a function to process the transcript as needed

        setRecTranscript(transcript);
      }
    };

    (recognizer.current as sdk.SpeechRecognizer).recognized = (s, e) =>
      processRecognizedTranscript(e);
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

  return (
    <div>
      <button onClick={pauseListening}>Pause Listening</button>
      <button onClick={resumeListening}>Resume Listening</button>
      <button onClick={stopListening}>Stop Listening</button>

      <div>
        <div>Recognizing Transcript : {recognizingTranscript}</div>

        <div>RecognizedTranscript : {myTranscript}</div>
      </div>
    </div>
  );
}
