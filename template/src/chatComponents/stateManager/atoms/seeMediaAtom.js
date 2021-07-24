import { atom } from "recoil";

const seeMediaAtom = atom({
  key: "seeMediaState",
  default:
    localStorage.getItem("seeMedia") === null
      ? true
      : JSON.parse(localStorage.getItem("seeMedia")) === true
      ? true
      : false,
});

export default seeMediaAtom;
