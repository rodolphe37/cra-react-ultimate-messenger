import { atom } from "recoil";

const clickedUserAtom = atom({
  key: "clickedUserState",
  default: false,
});

export default clickedUserAtom;
