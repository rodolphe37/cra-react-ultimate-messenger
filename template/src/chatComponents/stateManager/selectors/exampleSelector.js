import { selector } from "recoil";
import exampleAtom from "../atoms/exampleAtom";

const exampleSelector = selector({
  key: "exampleSelector",
  get: ({ get }) => {
    const data = get(exampleAtom);
    return data.length;
  },
});

export default exampleSelector;
