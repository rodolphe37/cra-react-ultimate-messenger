import { atom } from "recoil";

const usernameAtom = atom({
  key: "usernameState",
  default:
    localStorage.getItem("username") !== null
      ? localStorage.getItem("username")
      : "",
});

export default usernameAtom;
