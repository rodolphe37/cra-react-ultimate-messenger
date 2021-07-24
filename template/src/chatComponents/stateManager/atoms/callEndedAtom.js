import { atom } from "recoil";

const callEndedAtom = atom({
  key: "callEndedState",
  default: false,
});

export default callEndedAtom;
