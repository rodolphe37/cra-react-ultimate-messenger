import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeChat from "./chatComponents/components/chatRoom/HomeChat/HomeChat";
import logo from "./logo.svg";
import "./App.css";
import ChatRoom from "./chatComponents/components/chatRoom/ChatRoom/ChatRoom";
import Join from "./chatComponents/components/Join/Join";
import ButtonChat from "./chatComponents/components/ButtonChat";
import { useRecoilState } from "recoil";
import selectedDarkThemeAtom from "./chatComponents/stateManager/atoms/selectedDarkThemeAtom";
import VideoChatComponent from "./chatComponents/components/videoChatComponent/VideoChatComponent";
import Loader from "./chatComponents/components/loader/Loader";
import { useTranslation } from "react-i18next";
import BottomDrawer from "./chatComponents/components/bottomDrawer/BottomDrawer";
import Weather from "./chatComponents/components/weatherComponent/WeatherComponent";
// THIS TWO IMPORTS ARE ONLY FOR THE EXAMPLE
import exampleSelector from "./chatComponents/stateManager/selectors/exampleSelector";
import exampleClickedAtom from "./chatComponents/stateManager/atoms/exampleClicked";

const App = () => {
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const { i18n, t } = useTranslation();
  // function for changing languages
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // EXAMPLE OF HOW TO USE RECOIL (ATOM AND SELECTOR) WITH EASE
  const [exampleState] = useRecoilState(exampleSelector);
  const [clickedExample, setClickedExample] =
    useRecoilState(exampleClickedAtom);

  const handleClickExampleSelector = () => {
    if (!clickedExample) {
      setClickedExample(true);
    }
    if (clickedExample) {
      setClickedExample(false);
    }
  };

  useEffect(() => {
    console.log("selector :", exampleState);
    console.log("clicked :", clickedExample);
  }, [exampleState, clickedExample]);
  // END OF EXAMPLE RECOIL STATE MANAGMENT

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
          <span
            style={{ cursor: "pointer" }}
            onClick={handleClickExampleSelector}
          >
            <img src={logo} className="App-logo" alt="logo" />
          </span>
          <p style={{ fontSize: 17 }}>
            This is an Recoil Atom & Selector usage example:
          </p>
          <p style={{ fontSize: 15 }}>{exampleState}</p>
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
