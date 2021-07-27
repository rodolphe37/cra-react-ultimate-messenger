import { CopyToClipboard } from "react-copy-to-clipboard";
import Bell from "../../assets/sounds/mixkit-fairy-bells-583.mp3";
import "./videoChatComponent.css";
import useVideoChat from "../../hooks/useVideoChat";
import ChatRoom from "../chatRoom/ChatRoom/ChatRoom";
import { Fragment, useState } from "react";
import { isMobile } from "react-device-detect";
import CallIcon from "../../assets/callTo.svg";
import CallFrom from "../../assets/callFrom.svg";
import HangUpCall from "../../assets/hang-up.svg";
import Assignement from "../../assets/assignment.svg";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import roomIdAtom from "../../stateManager/atoms/roomIdAtom";

const VideoChatComponent = () => {
  const [roomName] = useRecoilState(roomIdAtom);

  const {
    stream,
    myVideo,
    callAccepted,
    callEnded,
    userVideo,
    name,
    setName,
    me,
    idToCall,
    setIdToCall,
    leaveCall,
    callUser,
    receivingCall,
    answerCall,
  } = useVideoChat();
  const [clickedInvitation, setClickedInvitation] = useState(false);
  const [clickedCall, setClickedCall] = useState(false);
  const { t } = useTranslation();

  const handleClickInvitation = () => {
    if (clickedInvitation) {
      setClickedInvitation(false);
    }
    if (!clickedInvitation) {
      setClickedInvitation(true);
      setClickedCall(false);
    }
  };
  const handleClickCall = () => {
    if (clickedCall) {
      setClickedCall(false);
    }
    if (!clickedCall) {
      setClickedCall(true);
      setClickedInvitation(false);
    }
  };

  return (
    <Fragment>
      <ChatRoom />
      {stream && (
        <div
          className={
            isMobile
              ? "video-chat-container video-chat-container-mobile"
              : "video-chat-container"
          }
        >
          <div
            className={
              callAccepted || receivingCall ? "myId marginTopContent" : "myId"
            }
            style={{ position: "relative" }}
          >
            <button
              onClick={() => {
                window.location.replace(`/chat/${roomName}`);
              }}
              className="closed-video-chat-cross black"
            >
              X
            </button>
            {stream ? (
              <div className="video-container">
                <div className="video">
                  {stream && (
                    <video
                      playsInline
                      muted
                      ref={myVideo}
                      autoPlay
                      style={{ width: "300px" }}
                    />
                  )}
                </div>
                <div className="video">
                  {callAccepted && !callEnded ? (
                    <video
                      playsInline
                      ref={userVideo}
                      autoPlay
                      style={{ width: "300px" }}
                    />
                  ) : null}
                </div>
              </div>
            ) : (
              <Loader />
            )}
            {!receivingCall && !callAccepted && (
              <div className="inputs-video-chat">
                <div className="you-section">
                  <label htmlFor="Name">{t("youVideoCHat")}</label>
                  <input
                    disabled={name !== "" ? true : false}
                    id="filled-basic1"
                    label="Name"
                    variant="filled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: "20px" }}
                  />
                </div>
                <hr style={{ width: "100%" }} />
                <b
                  style={{ cursor: "pointer" }}
                  onClick={handleClickInvitation}
                >
                  {t("invitationVideoChat")}
                </b>
                <div
                  className={
                    clickedInvitation ? "invitation-section" : "hiddenParams"
                  }
                >
                  <p style={{ width: "64%", textAlign: "left" }}>
                    {t("copyId")}
                  </p>
                  <CopyToClipboard text={`${t("messageInvitation")}${me}`}>
                    <button
                      onClick={() => alert(`Vous avez copié l'Id : ${me} `)}
                      className="button-video-chat"
                      variant="contained"
                      color="primary"
                    >
                      <img
                        src={Assignement}
                        alt="assigment"
                        style={{ width: 30 }}
                      />{" "}
                      {t("clickToCopyId")}
                    </button>
                  </CopyToClipboard>
                </div>
                <hr style={{ width: "100%" }} />
                <b style={{ cursor: "pointer" }} onClick={handleClickCall}>
                  {t("callSomeOne")}
                </b>
                <div className={clickedCall ? "call-section" : "hiddenParams"}>
                  <p style={{ width: "100%", textAlign: "center" }}>
                    {t("pasteToCall")}
                  </p>
                  <div className="call-content">
                    <input
                      autoComplete="off"
                      id="filled-basic"
                      label="ID to call"
                      variant="filled"
                      value={idToCall}
                      onChange={(e) => setIdToCall(e.target.value)}
                    />
                    <div className="call-button">
                      {callAccepted && !callEnded ? (
                        <button
                          className="call-button-green"
                          onClick={() => {
                            leaveCall();
                          }}
                        >
                          <img
                            src={HangUpCall}
                            style={{ width: 33 }}
                            alt="endCall"
                          />
                        </button>
                      ) : !receivingCall ? (
                        <button
                          className="call-button-green"
                          aria-label="call"
                          onClick={() => callUser(idToCall)}
                        >
                          <img
                            src={CallIcon}
                            style={{ width: 33 }}
                            alt="call"
                          />
                        </button>
                      ) : null}
                      <p style={{ fontSize: 10 }}> {idToCall}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {callAccepted && !callEnded ? (
              <button
                className="call-button-green"
                onClick={() => {
                  leaveCall();
                  window.location.replace(`/chat/${roomName}`);
                }}
              >
                <img src={HangUpCall} style={{ width: 33 }} alt="endCall" />
              </button>
            ) : !receivingCall ? (
              <button
                className={clickedCall ? "hiddenParams" : "call-button-green"}
                aria-label="call"
                // onClick={() => callUser(idToCall)}
                onClick={handleClickCall}
              >
                <img
                  src={CallIcon}
                  style={{ width: 33, marginTop: 22 }}
                  alt="call"
                />
              </button>
            ) : null}
            {receivingCall && !callAccepted ? (
              <div className="caller">
                <audio loop autoPlay>
                  <source src={Bell} />
                </audio>
                <h1 style={{ fontSize: 14 }}>
                  {name} {t("callMessage")}
                </h1>
                <button className="call-button-green" onClick={answerCall}>
                  <img src={CallFrom} style={{ width: 33 }} alt="call" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default VideoChatComponent;
