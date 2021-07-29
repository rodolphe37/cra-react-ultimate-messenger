/* eslint-disable react-hooks/exhaustive-deps */
// MODULES IMPORTS
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import socketIOClient from "socket.io-client";
// STATEMANAGMENT IMPORTS
import roomIdAtom from "../stateManager/atoms/roomIdAtom";
import pictCommentAtom from "../stateManager/atoms/pictComment";
import usernameAtom from "../stateManager/atoms/usernameAtom";
// import { isAndroid, isIOS } from "react-device-detect";
// ASSETS IMPORTS
import botPict from "../assets/bot-mini.png";
import useChatBot from "./useChatBot";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = `${process.env.REACT_APP_SOCKET_WEBSERVICE}`;
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

const useChat = () => {
  const { product } = useChatBot();

  const [username] = useRecoilState(usernameAtom);
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();
  const [dateTime, setDateTime] = useState("");
  const [pictComment, setPictComment] = useRecoilState(pictCommentAtom);
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const [isTaping, setIsTaping] = useState(false);
  const [senderIdNotif, setSenderIdNotif] = useState("");
  const [senderIdTyping, setSenderIdTyping] = useState("");
  const [roomId] = useRecoilState(roomIdAtom);
  const [writingUsers, setWritingUsers] = useState({
    senderId: "",
    isTaping: false,
  });
  const [userAllInfos, setUserAllInfos] = useState({
    ip: undefined,
    postalCode: undefined,
    locality: undefined,
    timezone: undefined,
    flag: undefined,
    architecture: undefined,
    navigator: undefined,
    os: undefined,
    version: undefined,
    device: undefined,
    trade: undefined,
  });

  function getNextMessageId() {
    let messageId = 0;
    for (let a = 0; a < messages.length; a++) {
      if (messages[a].id > messageId) {
        messageId = messages[a].id;
      }
    }
    messageId++;
    return messageId;
  }

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      console.log("socket :", socketRef);
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(START_TYPING_MESSAGE_EVENT, (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        const isWrite = typingInfo;
        setSenderIdNotif(isWrite.senderId);
        setWritingUsers(isWrite);
      }
    });

    socketRef.current.on(STOP_TYPING_MESSAGE_EVENT, (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        setSenderIdTyping(typingInfo.isTaping);
        const isWrite = typingInfo;
        setWritingUsers(isWrite);
      }
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, pictComment]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      timeStamp: dateTime,
      comment: pictComment,
      ip: userAllInfos.ip,
      username: username,
      isEmoji: isNotAlphaNumeric(regEmoji),
      id: getNextMessageId(),
    });
    // // BOTCHAT CONVERSATION
    if (messageBody.includes("#")) {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        picture: botPict,
        body: product,
        senderId: false,
      });
    }
    //END BOTCHAT CONVERSATION
  };
  //  START TYPING NOTIFICATION
  const startTypingMessage = () => {
    // if (!socketRef.current) return;
    socketRef.current.emit(START_TYPING_MESSAGE_EVENT, {
      senderId: socketRef.current.id,
      isTaping: true,
    });
  };
  //  STOP TYPING NOTIFICATION
  const stopTypingMessage = () => {
    // if (!socketRef.current) return;
    socketRef.current.emit(STOP_TYPING_MESSAGE_EVENT, {
      senderId: socketRef.current.id,
      isTaping: false,
    });
  };

  // FUNCTION FOR KNOWING IF MESSAGE.BODY CONTENT ALPHANUMERIC OR EMOJI
  const regEmoji = newMessage;

  function isNotAlphaNumeric(str) {
    /* Iterating character by character to get ASCII code for each character */
    for (let i = 0, len = str.length, code = 0; i < len; ++i) {
      /* Collecting charCode from i index value in a string */
      code = str.charCodeAt(i);

      /* Validating charCode falls into anyone category */
      if (
        (code > 47 && code < 58) || // numeric (0-9)
        (code > 64 && code < 91) || // upper alpha (A-Z)
        (code > 96 && code < 123) // lower alpha (a-z)
      ) {
        /* If its' alphanumeric characters then returning false */
        return false;
        // if you want true when alphanumeric only decomment this line && comment the top line
        // continue;
      }

      continue;
      // if you want true when alphanumeric only decomment this line && comment the top line
      // return false;
    }

    /* After validating all the characters and we returning success message ( IF NOT ALPHANUMERIC (EMOJI) CONTENT IS RETURN TRUE ELSE RETURN FALSE)*/
    return true;
  }

  useEffect(() => {
    if (localStorage.getItem("messages") !== null) {
      setMessages(JSON.parse(localStorage.getItem("messages")));
    }
    if (isTaping) {
      startTypingMessage();
    } else {
      stopTypingMessage();
      setSenderIdNotif("");
      setSenderIdTyping(false);
    }
  }, [isTaping]);

  return {
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
    socketRef,
    writingUsers,
    senderIdNotif,
    senderIdTyping,
    isNotAlphaNumeric,
  };
};

export default useChat;
