import { atom } from "recoil";

const selectedDarkThemeAtom = atom({
  key: "selectedDarkThemeState",
  default: JSON.parse(localStorage.getItem("boolDark")) === true ? true : false,
});

export default selectedDarkThemeAtom;
