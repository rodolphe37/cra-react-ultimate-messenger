import { atom } from "recoil";

const clickedGuestAtom = atom({
  key: "clickedGuestState",
  default: false,
});

export default clickedGuestAtom;
