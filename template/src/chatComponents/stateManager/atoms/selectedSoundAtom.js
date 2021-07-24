import { atom } from "recoil";

const selectedSoundAtom = atom({
  key: "selectedSoundState",
  default: true,
});

export default selectedSoundAtom;
