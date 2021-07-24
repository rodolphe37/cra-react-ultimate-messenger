import { atom } from "recoil";

const isReceivedMediasMessageToUserAtom = atom({
  key: "isReceivedMediasMessageToUserState",
  default: false,
});

export default isReceivedMediasMessageToUserAtom;
