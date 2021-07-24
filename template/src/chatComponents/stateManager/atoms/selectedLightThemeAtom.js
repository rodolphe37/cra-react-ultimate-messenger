import { atom } from "recoil";

const selectedLightThemeAtom = atom({
  key: "selectedLightThemeState",
  default:
    JSON.parse(localStorage.getItem("boolLight")) === false ? false : true,
});

export default selectedLightThemeAtom;
