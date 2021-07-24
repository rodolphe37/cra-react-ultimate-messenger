import { atom } from "recoil";

const weatherAtom = atom({
  key: "weatherState",
  default: {},
});

export default weatherAtom;
