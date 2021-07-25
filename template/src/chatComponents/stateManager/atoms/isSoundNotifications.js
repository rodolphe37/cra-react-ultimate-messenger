import { atom } from "recoil";

const isSoundNotificationsAtom = atom({
  key: "isSoundNotificationsState",
  default: true,
});

export default isSoundNotificationsAtom;
