import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeChat from "./components/chatRoom/HomeChat/HomeChat";
import logo from "./logo.svg";
import "./App.css";
import ChatRoom from "./components/chatRoom/ChatRoom/ChatRoom";
import Join from "./components/Join/Join";
import ButtonChat from "./components/ButtonChat";
import { useRecoilState } from "recoil";
import selectedDarkThemeAtom from "./stateManager/atoms/selectedDarkThemeAtom";
import VideoChatComponent from "./components/videoChatComponent/VideoChatComponent";
import Loader from "./components/loader/Loader";
import { useTranslation } from "react-i18next";
import BottomDrawer from "./components/bottomDrawer/BottomDrawer";
import Weather from "./components/weatherComponent/WeatherComponent";

const App = () => {
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const { i18n, t } = useTranslation();
  // function for changing languages
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Fragment>
      <div className="App">
        <div className="changeLanguague-container">
          <span
            className="buttonLanguage"
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "89%",
              marginTop: 57,
              position: "absolute",
              zIndex: "88877",
            }}
          >
            <span
              className="tradButtonfr"
              style={{ marginRight: "15px" }}
              onClick={() => changeLanguage("fr")}
            >
              <span role="img" aria-label="france flag">
                🇨🇵
              </span>
            </span>
            <span className="tradButtonen" onClick={() => changeLanguage("en")}>
              <span role="img" aria-label="england flag">
                🇬🇧
              </span>
            </span>
          </span>
        </div>
        <header
          className={
            selectedDarkTheme
              ? "App-header light-background black"
              : "App-header dark-background "
          }
        >
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {t("editAppText")} <code>src/App.js</code> {t("saveAppText")}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("learnAppText")}
          </a>
        </header>
      </div>
      <Router>
        <Route path="/" exact component={ButtonChat} />
        <Route path="/join" component={Join} />
        <Route path="/home" component={HomeChat} />
        <Route path="/chat" component={ChatRoom} />
        <Route path="/video" component={VideoChatComponent} />
        <Route path="/load" component={Loader} />
        <Route path="/intro" component={BottomDrawer} />
        <Route path="/meteo" component={Weather} />
      </Router>
    </Fragment>
  );
};

export default App;
