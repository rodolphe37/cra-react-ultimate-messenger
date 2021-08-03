import { atom } from "recoil";

const openVideoChatAtom = atom({
  key: "openVideoChatState",
  default: false,
});

export default openVideoChatAtom;
