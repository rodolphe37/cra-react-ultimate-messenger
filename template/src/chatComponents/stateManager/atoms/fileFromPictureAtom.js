import { atom } from "recoil";

const fileFromPictureAtom = atom({
  key: "fileFromPictureState",
  default: {
    date: null,
    currentFile: undefined,
    previewImage: undefined,
    progress: 0,
    message: "",

    imageInfos: [],
  },
});

export default fileFromPictureAtom;
