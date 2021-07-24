import { atom } from "recoil";

const infoPictureFromListAtom = atom({
  key: "infoPictureFromListState",
  default: {
    imageInfos: [],
  },
});

export default infoPictureFromListAtom;
