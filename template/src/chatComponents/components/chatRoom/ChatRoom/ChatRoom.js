/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// MODULES IMPORTS
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSpeechRecognition } from "react-speech-recognition";
import { Fragment, useEffect, useState, useRef } from "react";
import Picker, { SKIN_TONE_MEDIUM_LIGHT } from "emoji-picker-react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { isAndroid, isIOS, isBrowser } from "react-device-detect";
// import { v4 as uuidv4 } from "uuid";
// CSS IMPORTS
import "./ChatRoom.css";
// HOOKS & SERVICES IMPORTS
import useChat from "../../../hooks/useChat";
import UploadService from "../../../services/FileUploadService";
import useGetUserInfos from "../../../hooks/useGetUserInfos";
// STATEMANAGMENT IMPORTS
import imageInfoAtom from "../../../stateManager/atoms/imageInfoAtom";
import seeMediaAtom from "../../../stateManager/atoms/seeMediaAtom";
import clickedParamsAtom from "../../../stateManager/atoms/clickedParamsAtom";
import selectedDarkThemeAtom from "../../../stateManager/atoms/selectedDarkThemeAtom";
import clickedSoundGuitarAtom from "../../../stateManager/atoms/clickedSoundGuitarAtom";
import clickedSoundSoftwareAtom from "../../../stateManager/atoms/clickedSoundSoftwareAtom";
import fileFromPictureAtom from "../../../stateManager/atoms/fileFromPictureAtom";
import isReceivedMediasMessageToUserAtom from "../../../stateManager/atoms/receiveMediasMessageToUserAtom";
import speechToTextAtom from "../../../stateManager/atoms/speechToTextAtom";
import plusSectionAtom from "../../../stateManager/atoms/plusSectionAtom";
import callEndedAtom from "../../../stateManager/atoms/callEndedAtom";
import messageForBotAtom from "../../../stateManager/atoms/messageForBotAtom";
import roomIdAtom from "../../../stateManager/atoms/roomIdAtom";
import isSoundNotificationsAtom from "../../../stateManager/atoms/isSoundNotifications";
import usernameAtom from "../../../stateManager/atoms/usernameAtom";
// COMPONENTS IMPORTS
import Parameters from "../../parameters/Parameters";
import UploadImage from "../../ImageUploadComponent";
import SpeechToText from "../../speech-recognition/SpeechToText";
import EmptyChatMessage from "./EmptyChatMessage";
import Loader from "../../loader/Loader";
import Weather from "../../weatherComponent/WeatherComponent";
// ASSETS IMPORTS
import Bavarder from "../../../assets/chat.svg";
import sound from "../../../assets/sounds/mixkit-guitar-notification-alert-2320.mp3";
import sound2 from "../../../assets/sounds/mixkit-software-interface-back-2575.mp3";
import VideoCall from "../../../assets/video-chat-icon.svg";
import plus from "../../../assets/plus.svg";
import cloud from "../../../assets/cloudy.svg";
import Thumb from "../../../assets/thumbs-up-facebook.svg";
import DeleteConvButton from "../../../assets/x-button.svg";

const ChatRoom = (props) => {
  let history = useHistory();
  const messagesEndRef = useRef(null);
  const [roomToken, setRoomToken] = useRecoilState(roomIdAtom);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSoundNotification, setIsSoundNotification] = useRecoilState(
    isSoundNotificationsAtom
  );
  // if you want to catch roomId from URL
  // const { roomId } = props.match.params; // Gets roomId from URL

  // USE UUIDV4 FOR GENERATE ID ROOM FOR CHAT IF YOU WANT
  // useEffect(() => {
  //   if (!roomToken) {
  //     setRoomToken(uuidv4());
  //   }else{

  //   }
  //   return () => {
  //     setRoomToken("");
  //   };
  // }, []);

  useEffect(() => {
    if (!roomToken && sessionStorage.getItem("roomName") !== null) {
      setRoomToken(sessionStorage.getItem("roomName"));
    }
    if (roomToken) {
      sessionStorage.setItem("roomName", roomToken);
    }
    if (!roomToken && !sessionStorage.getItem("roomName")) {
      const roomId = props.match.params; // Gets roomId from URL
      setRoomToken(roomId.roomToken);
    }
    if (isLoaded) {
      //   setIsSoundNotification(false);
      //   setTimeout(() => {
      setIsLoaded(false);
      //   }, 3500);
      //   setTimeout(() => {
      //     setIsSoundNotification(true);
      //   }, 4600);
    }
    return () => {
      setRoomToken("");
      sessionStorage.removeItem("roomName");
    };
  }, []);

  let roomId = { roomToken };
  const [username, setUsername] = useRecoilState(usernameAtom);

  const {
    messages,
    setMessages,
    sendMessage,
    dateTime,
    setDateTime,
    newMessage,
    setNewMessage,
    isTaping,
    setIsTaping,
    pictComment,
    setPictComment,
    userAllInfos,
    setUserAllInfos,
    writingUsers,
    senderIdNotif,
    senderIdTyping,
    isNotAlphaNumeric,
  } = useChat(roomId); // Creates a websocket and manages messaging
  const [clickedOffChat, setClickedOffChat] = useState(false);
  const [clickedOnName, setClickedOnName] = useState(false);
  const [ownedByMe, setOwnedByMe] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [clickedChevron, setClickedChevron] = useState(true);
  const [clickedSound1, setClickedSound1] = useRecoilState(
    clickedSoundGuitarAtom
  );
  const [clickedSound2, setClickedSound2] = useRecoilState(
    clickedSoundSoftwareAtom
  );
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const [filePictFromList, setFilePictFromList] = useState([]);
  const [filePictFromMess, setFilePictFromMess] = useState("");
  const [plusSection, setplusSection] = useRecoilState(plusSectionAtom);
  const [isReceiveMediaToUser, setIsReceiveMediaToUser] = useRecoilState(
    isReceivedMediasMessageToUserAtom
  );
  const [clickedParams, setClickedParams] = useRecoilState(clickedParamsAtom);
  const [state, setState] = useRecoilState(fileFromPictureAtom);
  const [isImageList, setIsImageList] = useRecoilState(imageInfoAtom);
  const [seingMedia] = useRecoilState(seeMediaAtom);
  const [speechToTextConversion, setSpeechToTextConversion] =
    useRecoilState(speechToTextAtom);
  const { response, userInfos, ipAddress, setClickedOnApp } = useGetUserInfos();
  const [callEnded, setCallEnded] = useRecoilState(callEndedAtom);
  const { resetTranscript } = useSpeechRecognition();
  const { t } = useTranslation();
  const [messageForBot, setMessageForBot] = useRecoilState(messageForBotAtom);

  const [clickedCopyId, setClickedCopyId] = useState(false);
  const [idChatInvitation, setIdChatInvitation] = useState("");
  const [toggleDeleteButton, setToggleDeleteButton] = useState(false);
  const [isSendThumb, setIsSendThumb] = useState(false);

  let d = new Date();
  let n = d.toLocaleString();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (messages.length >= 4) {
      scrollToBottom();
    }
    if (clickedCopyId) {
      messages.pop();
      setTimeout(() => {
        window.location.replace(`/video/${roomToken}`);
      }, 1200);
    }
  }, [messages, userAllInfos]);

  const handleNewMessageChange = (event) => {
    if (!isReceiveMediaToUser) {
      setNewMessage(event.target.value);
    }
    if (isReceiveMediaToUser && isImageList) {
      setNewMessage(state.currentFile?.name);
    }
  };

  const handlePlusSection = () => {
    if (plusSection) {
      setplusSection(false);
    }
    if (!plusSection) {
      setplusSection(true);
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = (e) => {
    if (newMessage === "") {
      return;
    }
    if (newMessage !== "") {
      setplusSection(false);
      setDateTime(n);
      sendMessage(newMessage);
      setNewMessage("");
      setIsTaping(false);
      setSpeechToTextConversion("");
      setClickedChevron(true);
      setIsReceiveMediaToUser(false);
      resetTranscript();
    }
    if (pictComment !== "") {
      setplusSection(false);
      setNewMessage("");
      setTimeout(() => {
        setPictComment("");
        setNewMessage("");
      }, 200);
    }
  };
  const handleSendThumb = () => {
    setIsSendThumb(true);
    setNewMessage("thumbs-up-facebook.svg");
  };

  const handleClickOnName = () => {
    if (clickedOnName) {
      setClickedOnName(false);
    }
    if (!clickedOnName) {
      setClickedOnName(true);
      setTimeout(() => {
        setClickedOnName(false);
      }, 15000);
    }
  };

  const handleClickedOffChat = () => {
    if (clickedOffChat) {
      setClickedOffChat(false);
    }
    if (!clickedOffChat) {
      setClickedOffChat(true);
    }
  };

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setState({
        imageInfos: response.data,
      });
    });
  }, [setState]);

  const handleClickChevron = () => {
    if (!clickedChevron) {
      setClickedChevron(true);
    }
    if (clickedChevron) {
      setClickedChevron(false);
      setplusSection(false);
    }
    if (clickedChevron) {
      setIsTaping(true);
    }
    if (!clickedChevron) {
      setIsTaping(false);
    }
  };
  const handleTypingInput = () => {
    if (!isTaping) {
      setplusSection(false);
      setIsTaping(true);
      setTimeout(() => {
        setIsTaping(false);
      }, 2000);
    }
  };
  useEffect(() => {
    if (newMessage.includes("thumbs-up-facebook.svg")) {
      setTimeout(() => {
        sendMessage(newMessage);
        setNewMessage("");
      }, 300);
    }
  }, [newMessage]);

  function allInfos() {
    userInfos.map((res) =>
      setUserAllInfos({
        ip: ipAddress.ip,
        // postalCode: response.postcode,
        // locality: response.locality,
        timezone: res.timezone.name,
        flag: res.country.emoji,
        architecture: res.cpu.architecture,
        navigator: res.browser.name,
        os: res.os.name,
        version: res.os.version,
        device: res.device.model,
        trade: res.device.vendor,
      })
    );
  }

  useEffect(() => {
    messages.map((message, i) => setOwnedByMe(message.ownedByCurrentUser));
    function getDateTime() {
      setDateTime(n);
    }
    getDateTime();

    localStorage.setItem("messages", JSON.stringify(messages));

    if (state.currentFile?.name) {
      setNewMessage(state.currentFile?.name);
    }

    if (messages) {
      setFilePictFromList(isImageList.imageInfos.map((resLink) => resLink));
      setFilePictFromMess(messages.map((resBody) => resBody.body));
    }
    let someMess = messages.map((res) =>
      res.body.includes("Invitation vidéo, copiez l'id afin de vous connecter:")
    );

    if (someMess.includes(true)) {
      // console.log("id for chat:", idChatInvitation);
      messages.map((message, i) =>
        setIdChatInvitation(message.body.split(":").pop())
      );
    }

    allInfos();
    sessionStorage.setItem("infos user", JSON.stringify(userAllInfos));
  }, [
    messages,
    chosenEmoji,
    dateTime,
    n,
    setDateTime,
    isImageList,
    setNewMessage,
    state,
  ]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    if (newMessage) {
      setNewMessage(newMessage + emojiObject.emoji);
    } else if (!newMessage) {
      setNewMessage(emojiObject.emoji);
    }
  };

  function IsTyping() {
    if (clickedChevron) {
      setTimeout(() => {
        setIsTaping(false);
      }, 4000);
    }
    if (!clickedChevron) {
      setTimeout(() => {
        setIsTaping(false);
      }, 10000);
    }
    if (senderIdTyping) {
      setTimeout(() => {
        setIsTaping(false);
      }, 4000);
    }
    return <div className="dot-typing" />;
  }

  const [openVideoChat, setOpenVideChat] = useState(false);
  const handleVideoChat = () => {
    if (openVideoChat) {
      setOpenVideChat(false);
    }
    if (!openVideoChat) {
      setOpenVideChat(true);
    }
  };

  useEffect(() => {
    if (speechToTextConversion !== "") {
      setNewMessage(speechToTextConversion);
    }
  }, [speechToTextConversion]);

  useEffect(() => {
    if (newMessage.includes("#")) {
      setMessageForBot(newMessage);
    }
  }, [newMessage, messageForBot]);

  // WEB PUSH SECTION
  useEffect(() => {
    // THIS WEBPUSH APPEAR ONLY IF IS BROWSER OR ANDROID PHONES
    if (isBrowser || isAndroid) {
      // THIS FIRST WEBPUSH IS WELCOME MESSAGE
      Notification.requestPermission((result) => {
        if (result === "granted") {
          showNotification("Bienvenue sur l'application React Ultimate Chat!");
        }
      });

      function showNotification(title, message) {
        if ("Notification" in window) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, {
              body: message,
              tag: "vibration-sample",
            });
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    // CHECK THE MESSAGE CONTENT
    const youAreCalled = messages.map((res) => res.body);
    // CHECK THE USERNAME FROM USERNAMEATOM STATE
    const yourUserName = username;
    // ONLY IF THE CHAT WINDOW IS REDUCED
    if (clickedOffChat === true) {
      // FOR BROWSERS & ANDROID PHONE ONLY
      if (isBrowser || isAndroid) {
        // THIS WEBPUSH IS WHEN THE OTHER USER CALL YOU IN MESSAGE CHAT
        if (messages.length > 0) {
          if (youAreCalled.includes(`${yourUserName}`)) {
            console.log("on parle de toi!!!");
            Notification.requestPermission((result) => {
              if (result === "granted") {
                showNotification(
                  "Une personne a écrit votre nom d'utilisateur dans le chat !"
                );
              }
            });

            function showNotification(title, message) {
              if ("Notification" in window) {
                navigator.serviceWorker.ready.then((registration) => {
                  registration.showNotification(title, {
                    body: message,
                    tag: "vibration-sample",
                  });
                });
              }
            }
          }
        }
      }
    }
    // FOR IPHONE - IMPLEMENT WHAT YOU WANT
    if (isIOS) {
      // alert("This is an Iphone")
    }
    // console.log("yourUserName ", yourUserName);
    // console.log("youAreCalled ", youAreCalled);
    // console.log(youAreCalled.includes(`${yourUserName}`));
  }, [username, messages]);
  // END OF WEBPUSH SECTION

  // DELETE MESSAGE SECTION
  const [idForDeleteButton, setIdForDeleteButton] = useState("");
  const [messageIdToDelete, setMessageIsToDelete] = useState("");
  const newMessages = messages.filter((i) => i);

  function onDelete() {
    for (let i = 0; i < newMessages.length; i++) {
      if (newMessages[i].id === messageIdToDelete) {
        newMessages.splice(i, 1);
        i--; //re-adjust the counter.
      }
    }
    setMessages(newMessages);
  }
  const handletoggleDeleteButton = () => {
    // setIdForDeleteButton(newMessage.id);
    if (toggleDeleteButton) {
      setToggleDeleteButton(false);
    }
    if (!toggleDeleteButton) {
      setToggleDeleteButton(true);
      setTimeout(() => {
        setToggleDeleteButton(false);
      }, 6000);
    }
  };
  useEffect(() => {
    if (messageIdToDelete) {
      onDelete();
      // setIsSoundNotification(false);
      setMessageIsToDelete("");
      // setIsSoundNotification(true);
    }
    // console.log("id for button :", idForDeleteButton);
  }, [messageIdToDelete, idForDeleteButton]);

  // END OF DELETE MESSAGE SECTION

  return (
    <Fragment>
      <div
        onClick={() => setClickedOnApp(true)}
        className={`${clickedOffChat ? "chat-room-container-closed" : ""}
          ${
            !selectedDarkTheme
              ? "chat-room-container slide-in-blurred-bottom light-background"
              : "chat-room-container slide-in-blurred-bottom dark-background"
          }
        `}
      >
        <span
          className={
            !selectedDarkTheme
              ? "room-name light-background"
              : "room-name dark-background"
          }
        >
          <img src={Bavarder} alt="icon" />
          <span className="head-text-chat">
            <h1>React Ultimate Messenger</h1>
            <sub>{t("subTitle")}</sub>
          </span>

          <div className="close-and-reduce-button">
            <Parameters />
            <div className="section-right-top-button">
              <button
                onClick={() => history.push("/")}
                className={
                  !selectedDarkTheme
                    ? "closed-button-container black"
                    : "closed-button-container white"
                }
              >
                X
              </button>
              <span className="reduceIcon-chat">
                <div
                  onClick={handleClickedOffChat}
                  className="icon-menuRight icon-right-chat"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      filrule="evenodd"
                      clipRule="evenodd"
                      d="M18.3334 13H5.66675C5.11441 13 4.66675 12.5523 4.66675 12C4.66675 11.4477 5.11441 11 5.66675 11H18.3334C18.8857 11 19.3334 11.4477 19.3334 12C19.3334 12.5523 18.8857 13 18.3334 13Z"
                      fill={selectedDarkTheme ? "#ffffff" : "#000000"}
                    ></path>
                  </svg>
                </div>
              </span>
            </div>
          </div>
        </span>
        {openVideoChat && window.location.replace(`/video/${roomToken}`)}
        {isLoaded ? (
          <div
            className={`${
              !selectedDarkTheme
                ? "messages-container messages-container-spiner light-background"
                : "messages-container messages-container-spiner dark-background"
            }`}
          >
            <Loader />
          </div>
        ) : (
          <div
            onClick={() => setClickedParams(false)}
            className={`${clickedOffChat ? "messages-container-closed" : ""}
            ${
              !selectedDarkTheme
                ? "messages-container light-background"
                : "messages-container dark-background"
            }
          `}
          >
            {messages.length === 0 ? (
              <EmptyChatMessage messages={messages} />
            ) : null}
            <ol className="messages-list">
              {messages.map((message, i) => {
                return (
                  <span key={i} className="messages-section">
                    <span>
                      {!message.ownedByCurrentUser ? (
                        <span>
                          {clickedSound1 && (
                            <audio autoPlay>
                              <source src={sound} />
                            </audio>
                          )}
                        </span>
                      ) : null}

                      {!message.ownedByCurrentUser ? (
                        <span>
                          {clickedSound2 && (
                            <audio autoPlay>
                              <source src={sound2} />
                            </audio>
                          )}
                        </span>
                      ) : null}

                      <ul className="message-date">{message.timeStamp}</ul>
                      <p
                        onClick={handleClickOnName}
                        style={{
                          fontSize: 11,
                          marginBottom: -20,
                          marginTop: 5,
                        }}
                        className={`message-item ${
                          message.ownedByCurrentUser
                            ? "my-message-name"
                            : "received-message-name"
                        }`}
                      >
                        {" "}
                        {!clickedOnName && message.username && message.ip
                          ? userAllInfos &&
                            userAllInfos.flag + " - " + message.username
                          : clickedOnName && message.username
                          ? userAllInfos &&
                            message.ip &&
                            userAllInfos.flag + "- Adresse ip :" + message.ip
                          : null}
                        {!clickedOnName && !message.username
                          ? userAllInfos &&
                            message.ip &&
                            userAllInfos.flag + "- Adresse ip :" + message.ip
                          : clickedOnName && !message.username
                          ? userAllInfos &&
                            message.ip &&
                            userAllInfos.flag + "- Adresse ip :" + message.ip
                          : null}
                        {!message.ip && "ChatBot"}
                      </p>
                      <li
                        style={{ position: "relative" }}
                        className={`message-item ${
                          isNotAlphaNumeric(message.body) ? "height45" : ""
                        } ${
                          message.ownedByCurrentUser
                            ? "my-message"
                            : "received-message"
                        }`}
                        onClick={() => {
                          setIdForDeleteButton(message.id);
                          handletoggleDeleteButton();
                        }}
                      >
                        {message.picture && (
                          <span className="messagesContent">
                            <img
                              className="chatbot-img"
                              src={message.picture}
                              alt="botPicture"
                            />
                            {isNotAlphaNumeric(message.body) ? (
                              <p
                                style={{
                                  fontSize: 23,
                                  marginTop: 0,
                                  marginBottom: 0,
                                }}
                              >
                                {message.body}
                              </p>
                            ) : (
                              <p
                                style={{ marginTop: 0, marginBottom: 0 }}
                                className="chatbot-text"
                              >
                                {message.body}
                              </p>
                            )}
                          </span>
                        )}
                        {message.body?.includes("jpg", 0) ||
                        message.body?.includes("JPG", 0) ||
                        message.body?.includes("jpeg", 0) ||
                        message.body?.includes("JPEG", 0) ||
                        message.body?.includes("png", 0) ||
                        message.body?.includes("PNG", 0) ? (
                          <Fragment>
                            {seingMedia ? (
                              <span className="display-picture">
                                <img
                                  style={{
                                    borderRadius: 11,
                                    maxWidth: 186,
                                    maxHeight: 200,
                                  }}
                                  src={`${process.env.REACT_APP_UPLOAD_WEBSERVICE}/files/${message.body}`}
                                  alt=""
                                />
                                {message.comment && (
                                  <Fragment>
                                    <p style={{ textAlign: "center" }}>
                                      {message.comment}
                                    </p>
                                  </Fragment>
                                )}
                                {!toggleDeleteButton && (
                                  <div ref={messagesEndRef} />
                                )}
                              </span>
                            ) : (
                              <span
                                className="button-display-picture"
                                style={{ textAlign: "center" }}
                              >
                                {message.ownedByCurrentUser ? (
                                  <h2 className="seingMedia-title">
                                    {t("sendPicture")}
                                  </h2>
                                ) : (
                                  <h2 className="seingMedia-title">
                                    {t("receivePicture")}
                                  </h2>
                                )}

                                <sub
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: 10,
                                    color: "rgb(40 38 38)",
                                  }}
                                >
                                  {t("desactivatePicture")}
                                </sub>
                                <p className="seingMedia-text">
                                  {t("functionSettingPicture")}
                                </p>
                                {!toggleDeleteButton && (
                                  <div ref={messagesEndRef} />
                                )}
                              </span>
                            )}
                          </Fragment>
                        ) : !message.picture &&
                          isNotAlphaNumeric(message.body) ? (
                          <p
                            style={{
                              fontSize: 23,
                              marginTop: 0,
                              marginBottom: 0,
                            }}
                          >
                            {message.body}
                          </p>
                        ) : (
                          !message.picture &&
                          !message.body.includes("thumbs-up-facebook.svg") &&
                          message.body
                        )}
                        {message.body.includes("Invitation vidéo") ||
                        message.body.includes("Video invitation")
                          ? !message.ownedByCurrentUser &&
                            (!clickedCopyId ? (
                              <CopyToClipboard text={idChatInvitation}>
                                <button
                                  disabled={clickedCopyId ? true : false}
                                  className={
                                    clickedCopyId
                                      ? "idForCallInvitation-clicked"
                                      : "idForCallInvitation"
                                  }
                                  onClick={() => {
                                    setClickedCopyId(true);
                                    alert(
                                      `Vous avez copié l'Id ${idChatInvitation}.`
                                    );
                                  }}
                                >
                                  Copiez
                                </button>
                              </CopyToClipboard>
                            ) : (
                              <Fragment>
                                <p>Le chat vidéo est entrain de démarrer...</p>
                              </Fragment>
                            ))
                          : null}
                        {message.body.includes("thumbs-up-facebook.svg") && (
                          <img
                            className="shake-bottom"
                            style={{ width: 40, cursor: "pointer" }}
                            src={Thumb}
                            alt="thumb"
                          />
                        )}
                        {message.body.includes("&météo") ? (
                          <div
                            className={
                              message.ownedByCurrentUser
                                ? "weather-content"
                                : ""
                            }
                          >
                            <img
                              src={cloud}
                              alt="cloud"
                              className="weatherIcon"
                            />
                            <Weather />
                          </div>
                        ) : null}

                        {message.id === idForDeleteButton ? (
                          <button
                            className={
                              message.ownedByCurrentUser
                                ? toggleDeleteButton
                                  ? "deleteIconBubble scale-in-center"
                                  : "deleteIconBubble hiddenParams"
                                : toggleDeleteButton
                                ? "deleteIconBubble leftBubble scale-in-center "
                                : "deleteIconBubble hiddenparams"
                            }
                            onClick={() => {
                              setMessageIsToDelete(message.id);
                            }}
                          >
                            <img
                              style={{
                                width: 24,
                              }}
                              src={DeleteConvButton}
                              alt="del"
                              className={
                                message.id && toggleDeleteButton
                                  ? "delete-bubble"
                                  : "hiddenParams"
                              }
                            />
                          </button>
                        ) : null}
                      </li>
                      {!toggleDeleteButton && <div ref={messagesEndRef} />}
                    </span>
                    {!toggleDeleteButton && <div ref={messagesEndRef} />}
                  </span>
                );
              })}
            </ol>
          </div>
        )}

        {senderIdNotif !== "" && writingUsers.isTaping ? (
          <div className="animTyping" id="typing_on">
            <IsTyping />
          </div>
        ) : null}
        <div
          className={` ${clickedOffChat ? "emoji-chat-closed-off" : ""}
            ${
              clickedChevron
                ? "emoji-chat-closed"
                : selectedDarkTheme
                ? "emoji-chat-open emoji-chat-open-dark"
                : "emoji-chat-open"
            }
          `}
        >
          <button onClick={handleClickChevron} className="chevron">
            {!clickedChevron ? "👍🏼" : "😀"}
          </button>
          <Picker
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
            skinTone={SKIN_TONE_MEDIUM_LIGHT}
            groupNames={{ smileys_people: "PEOPLE" }}
            native
          />
        </div>
        <div
          onClick={() => setClickedParams(false)}
          className={
            !clickedOffChat
              ? "sending-message-container"
              : "sending-message-container-closed"
          }
        >
          <span
            className={
              state.currentFile
                ? "not-visible"
                : plusSection
                ? "reduceInput"
                : ""
            }
          >
            <input
              disabled={isLoaded ? true : false}
              autoComplete="off"
              onSelect={handleTypingInput}
              id="chat-message-input"
              onKeyPress={handleKeypress}
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder={t("placeholderInputChat")}
              className={
                !selectedDarkTheme
                  ? "new-message-input-field light-background"
                  : "new-message-input-field dark-background"
              }
            />
          </span>
          <div
            onClick={handlePlusSection}
            className={
              !plusSection
                ? "plusBottomChat margin-left37"
                : "plusBottomChat margin-right10"
            }
          >
            <img style={{ width: 25 }} src={plus} alt="plus" />
          </div>
          <div className="bottom-left-chat">
            <img
              onClick={handleVideoChat}
              style={{
                width: 28,
                marginRight: 15,
                cursor: "pointer",
                marginTop: -5,
              }}
              src={VideoCall}
              alt="call"
              className={plusSection ? "" : "hiddenParams"}
            />
            <div className={plusSection ? "upload-container" : "hiddenParams"}>
              <UploadImage
                setIsTaping={setIsTaping}
                handleKeypress={handleKeypress}
                handleSendMessage={handleSendMessage}
              />
            </div>
            <span className={plusSection ? "" : "hiddenParams"}>
              <SpeechToText />
            </span>
            <span
              className={plusSection ? "" : "hiddenParams"}
              onClick={handleSendThumb}
            >
              <img
                style={{ width: 27, cursor: "pointer" }}
                src={Thumb}
                alt="thumb"
              />
            </span>
            <span
              className={
                state.currentFile
                  ? "not-visible"
                  : !plusSection
                  ? "margin-left22"
                  : ""
              }
            >
              <button
                onClick={handleSendMessage}
                className="send-message-button"
              >
                <svg width="22px" height="22px" viewBox="0 0 22 22">
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      transform="translate(-5.000000, -5.000000)"
                      fill="#8a8d91"
                    >
                      <g>
                        <g transform="translate(5.000000, 5.000000)">
                          <path d="M2.0300068,0.145970044 L20.9662955,9.37015518 C22.3445682,10.0420071 22.3445682,11.9582654 20.9662955,12.6296618 L2.0300068,21.853847 C1.09728834,22.3084288 0,21.6475087 0,20.6317597 L0.806953417,13.8945654 C0.882225434,13.2659853 1.39089595,12.7699536 2.03608467,12.6957083 L12.0229514,11.6795038 C12.8612292,11.5943266 12.8612292,10.4054904 12.0229514,10.3203132 L2.03608467,9.30410872 C1.39089595,9.23031889 0.882225434,8.7342872 0.806953417,8.10525162 L0,1.36805729 C0,0.352308292 1.09728834,-0.3081563 2.0300068,0.145970044"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatRoom;
