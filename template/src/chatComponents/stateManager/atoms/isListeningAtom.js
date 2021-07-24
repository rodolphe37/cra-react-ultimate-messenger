import { atom } from "recoil";

const isListeningAtom = atom({
  key: "isListeningState",
  default: false,
});

export default isListeningAtom;
