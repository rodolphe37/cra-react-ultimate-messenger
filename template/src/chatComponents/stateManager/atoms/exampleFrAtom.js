// THIS ONLY FOR EXAMPLE
import { atom } from "recoil";

const exampleFrAtom = atom({
  key: "exampleFrState",
  default:
    "😎 Ce message provient de exampleFrAtom.js dans le dossier atoms, cliquez sur le logo qui lévite ci-dessus ☝🏼☝🏼.",
});

export default exampleFrAtom;
