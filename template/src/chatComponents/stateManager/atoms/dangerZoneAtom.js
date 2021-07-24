import { atom } from "recoil";

const dangerZoneAtom = atom({
  key: "dangerZoneState",
  default: false,
});

export default dangerZoneAtom;
