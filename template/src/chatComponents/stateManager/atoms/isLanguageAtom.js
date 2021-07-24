import { atom } from "recoil";

const isLanguageAtom = atom({
  key: "isLanguageState",
  default: "fr",
});

export default isLanguageAtom;
