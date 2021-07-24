import { atom } from "recoil";

const messageForBotAtom = atom({
  key: "messageForBotState",
  default: "",
});

export default messageForBotAtom;
