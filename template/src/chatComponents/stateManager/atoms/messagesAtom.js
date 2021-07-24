import { atom } from "recoil";

const messagesAtom = atom({
  key: "messagesState",
  default:
    JSON.parse(localStorage.getItem("messages")) !== null ||
    JSON.parse(localStorage.getItem("messages")) !== []
      ? JSON.parse(localStorage.getItem("messages"))
      : [],
});

export default messagesAtom;
