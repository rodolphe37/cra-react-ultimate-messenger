import { atom } from "recoil";

const roomIdAtom = atom({
  key: "roomIdState",
  default: "",
});

export default roomIdAtom;
