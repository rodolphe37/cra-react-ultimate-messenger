import React from "react";
import ReactDom from "react-dom";
import { RecoilRoot } from "recoil";
import "./i18n";
import App from "./App";

ReactDom.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.querySelector("#root")
);
