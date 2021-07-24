import { atom } from "recoil";

const speechToTextAtom = atom({
  key: "speechToTextState",
  default: "",
});

export default speechToTextAtom;
