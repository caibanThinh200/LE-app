"use client";
import { useEffect, useRef, useState } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const SPEECH_KEY = "afc6b1de18844a51a7e0bb13d06a26a7";
const SPEECH_REGION = "eastus";

const Page = () => {
  const speechConfig = useRef<sdk.SpeechConfig>();
  const audioConfig = useRef<sdk.AudioConfig>();
  const recognizer = useRef<sdk.SpeechRecognizer>();

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext>();

  const silenceThreshold = 0.02; // Adjust based on testing
  const silenceDuration = 1000; // 1 second of silence to stop recording
  let silenceStart = performance.now();
  let analyser: AnalyserNode;
  let animationFrameId = null;

  const analyseAudioStream = (audioStream: MediaStream) => {
    const context = new AudioContext();
    setAudioContext(context);
    analyser = context.createAnalyser();
    const microphone = context.createMediaStreamSource(audioStream);
    const javascriptNode = context.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;
    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(context.destination);
    javascriptNode.onaudioprocess = function () {
      // console.log(silenceStart);
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      const average = array.reduce((a, b) => a + b, 0) / array.length;
      // console.log(average, silenceThreshold);
      const normalizedAverage = average / 128.0;
      // console.log(normalizedAverage < silenceThreshold, isRecording);
      if (normalizedAverage < silenceThreshold) {
        if (silenceStart === null) {
          silenceStart = performance.now();
        }
        if (performance.now() - silenceStart >= silenceDuration) {
          // mediaRecorder.re
          // (recognizer.current as sdk.SpeechRecognizer).canceled
          console.log(123);
          stopRecording();
        }
      } else {
        silenceStart = 0;
      }
    };
  };

  const startRecording = () => {
    (speechConfig.current as sdk.SpeechConfig) =
      sdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
    (speechConfig.current as sdk.SpeechConfig).speechRecognitionLanguage =
      "en-US";
    // Request permission and capture audio
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        analyseAudioStream(stream);
        audioConfig.current = sdk.AudioConfig.fromStreamInput(stream);
        (recognizer.current as sdk.SpeechRecognizer) = new sdk.SpeechRecognizer(
          speechConfig.current as sdk.SpeechConfig,
          audioConfig.current
        );
        const pronunciationAssessmentConfig =
          new sdk.PronunciationAssessmentConfig(
            "Can you help me put this away",
            sdk.PronunciationAssessmentGradingSystem.HundredMark,
            sdk.PronunciationAssessmentGranularity.Phoneme,
            true
          );
        pronunciationAssessmentConfig.enableProsodyAssessment = true;
        // create pronunciation assessment config, set grading system, granularity and if enable miscue based on your requirement.
        pronunciationAssessmentConfig.applyTo(
          recognizer.current as sdk.SpeechRecognizer
        );
        const recorder = new window.MediaRecorder(stream);
        recorder.addEventListener("start", (e) => {
          // setTimeout(() => {
          //   recorder.stop();
          // }, 3000);
        });
        // (recognizer.current as sdk.SpeechRecognizer).recognized = function (
        //   s,
        //   e
        // ) {
        //   let pronunciation_result =
        //     sdk.PronunciationAssessmentResult.fromResult(e.result);
        //   console.log(pronunciation_result);
        //   recorder.stop();
        //   setIsRecording(false);
        // };
        (recognizer.current as sdk.SpeechRecognizer).recognizeOnceAsync(
          (result) => {
            let pronunciation_result =
              sdk.PronunciationAssessmentResult.fromResult(result);
            // console.log(pronunciation_result);
            recorder.stop();
            setIsRecording(false);
          }
        );
        (recognizer.current as sdk.SpeechRecognizer).recognizing = (s, e) =>
          console.log(e.result);

        setMediaRecorder(recorder);

        recorder.ondataavailable = (e) => {
          setAudioChunks((currentChunks) => [...currentChunks, e.data]);
        };

        recorder.onstop = () => {
          // Cleanup after stopping the recorder
          stream.getTracks().forEach((track) => track.stop());
        };

        recorder.start();
        setIsRecording(true);
      })
      .catch((error) => console.error("Error accessing media devices.", error));
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      saveRecording();
    }
  };

  const saveRecording = () => {
    const blob = new Blob(audioChunks, { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    console.log(url);
    // Create an anchor element and force a download
    // const a = document.createElement("a");
    // a.style.display = "none";
    // a.href = url;
    // a.download = "recording.wav";
    // document.body.appendChild(a);
    // a.click();
    // window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5">
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <button onClick={saveRecording} disabled={audioChunks.length === 0}>
        Save Recording
      </button>
    </div>
  );
};

export default Page;
