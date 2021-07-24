import { useEffect, useRef } from "react";
import isListeningAtom from "../stateManager/atoms/isListeningAtom";
import speechToTextAtom from "../stateManager/atoms/speechToTextAtom";
import useChat from "./useChat";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useRecoilState } from "recoil";
// import { useTranslation } from "react-i18next";
import roomIdAtom from "../stateManager/atoms/roomIdAtom";
import isLanguageAtom from "../stateManager/atoms/isLanguageAtom";

const useSpeechToText = () => {
  const [isListening, setIsListening] = useRecoilState(isListeningAtom);
  const microphoneRef = useRef(null);
  const { setIsTaping, setNewMessage } = useChat(roomIdAtom);
  // const { i18n } = useTranslation();
  const [speechToTextConversion, setSpeechToTextConversion] =
    useRecoilState(speechToTextAtom);
  const [isLanguage] = useRecoilState(isLanguageAtom);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const handleListing = () => {
    setNewMessage("");
    resetTranscript();
    setSpeechToTextConversion("");
    setIsListening(true);
    setIsTaping(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: isLanguage === "fr" ? "fr-FR" : "en-GB",
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    setIsTaping(false);
    SpeechRecognition.stopListening();
    setSpeechToTextConversion(transcript);
    resetTranscript();
  };

  useEffect(() => {}, [speechToTextConversion, transcript, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return {
    isListening,
    microphoneRef,
    handleListing,
    stopHandle,
  };
};

export default useSpeechToText;
