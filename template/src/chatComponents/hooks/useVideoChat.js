/* eslint-disable react-hooks/exhaustive-deps */
import Peer from "simple-peer";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import usernameAtom from "../stateManager/atoms/usernameAtom";

import callEndedAtom from "../stateManager/atoms/callEndedAtom";
import messagesAtom from "../stateManager/atoms/messagesAtom";
import roomIdAtom from "../stateManager/atoms/roomIdAtom";

const socket = io.connect(process.env.REACT_APP_VIDEO_CHAT_WEBSERVICE);

const useVideoChat = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useRecoilState(callEndedAtom);
  const [name, setName] = useRecoilState(usernameAtom);
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [roomName] = useRecoilState(roomIdAtom);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
      localStorage.setItem("me", id);
      if (localStorage.getItem("username") !== null) {
        let theName = localStorage.getItem("username");
        setName(theName);
      }
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, [me, messages]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    setTimeout(() => {
      window.location.replace(`/chat/${roomName}`);
    }, 1200);
    connectionRef.current.destroy();
  };

  return {
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
  };
};

export default useVideoChat;
