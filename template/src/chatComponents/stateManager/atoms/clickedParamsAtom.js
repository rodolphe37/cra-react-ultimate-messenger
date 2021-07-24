import { atom } from "recoil";

const clickedParamsAtom = atom({
  key: "clickedParamsState",
  default: false,
});

export default clickedParamsAtom;
