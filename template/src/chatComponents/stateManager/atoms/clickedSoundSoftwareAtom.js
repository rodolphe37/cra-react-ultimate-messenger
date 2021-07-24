import { atom } from "recoil";

const clickedSoundSoftwareAtom = atom({
  key: "clickedSoundSoftwareState",
  default: JSON.parse(localStorage.getItem("software")) === true ? true : false,
});

export default clickedSoundSoftwareAtom;
