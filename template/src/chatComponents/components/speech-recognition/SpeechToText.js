// CSS IMPORTS
import "./speechToText.css";
// HOOKS IMPORTS
import useSpeechToText from "../../hooks/useSpeechToText";
// ASSETS IMPORTS
import microPhoneIcon from "../../assets/micro.png";

const SpeechToText = () => {
  const { isListening, microphoneRef, handleListing, stopHandle } =
    useSpeechToText();

  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        {!isListening ? (
          <div
            style={{ cursor: "pointer" }}
            className="microphone-icon-container"
            ref={microphoneRef}
            onClick={handleListing}
          >
            <img
              src={microPhoneIcon}
              alt="micro"
              style={{ width: 16, margin: 10 }}
              className="microphone-icon"
            />
          </div>
        ) : (
          <div
            style={{ cursor: "pointer" }}
            className="microphone-icon-container-on heartbeat"
            ref={microphoneRef}
            onClick={stopHandle}
          >
            <img
              src={microPhoneIcon}
              alt="micro"
              style={{ width: 16, margin: "14px 0px 0px 14px" }}
              className="microphone-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default SpeechToText;
