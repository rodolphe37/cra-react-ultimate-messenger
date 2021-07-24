import { atom } from "recoil";

const selectedneumorphismThemeAtomAtom = atom({
  key: "selectedneumorphismThemeAtomState",
  default:
    JSON.parse(localStorage.getItem("neumorphism")) === true ? true : false,
});

export default selectedneumorphismThemeAtomAtom;
