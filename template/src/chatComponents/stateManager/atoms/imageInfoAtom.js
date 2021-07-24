import { atom } from "recoil";

const imageInfoAtom = atom({
  key: "imageInfoState",
  default: {
    imageInfos: [],
  },
});

export default imageInfoAtom;
