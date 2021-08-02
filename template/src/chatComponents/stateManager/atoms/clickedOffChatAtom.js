import { atom } from "recoil";

const clickedOffChatAtom = atom({
  key: "clickedOffChatState",
  default: false,
});

export default clickedOffChatAtom;
