import React from "react";
import ReactDom from "react-dom";
import { RecoilRoot } from "recoil";
import "./i18n";
import App from "./App";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

ReactDom.render(
  <RecoilRoot>
    <Provider template={AlertTemplate} {...options}>
      <App />
    </Provider>
  </RecoilRoot>,
  document.querySelector("#root")
);
