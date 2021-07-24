import { atom } from "recoil";

const clickedSoundGuitarAtom = atom({
  key: "clickedSoundGuitarState",
  default: JSON.parse(localStorage.getItem("guitar")) === false ? false : true,
});

export default clickedSoundGuitarAtom;
