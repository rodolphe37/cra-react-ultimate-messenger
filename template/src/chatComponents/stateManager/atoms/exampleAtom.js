// THIS ONLY FOR EXAMPLE
import { atom } from "recoil";

const exampleAtom = atom({
  key: "exampleState",
  default:
    "😎 This message is from exampleAtom.js in atom folder, click on the logo above 👆🏼👆🏼",
});

export default exampleAtom;
