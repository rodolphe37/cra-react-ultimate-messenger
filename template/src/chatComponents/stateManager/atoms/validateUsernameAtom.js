import { atom } from "recoil";

const validateUsernameAtom = atom({
  key: "validateUsernameState",
  default: localStorage.getItem("validateUsername") !== null ? true : false,
});

export default validateUsernameAtom;
