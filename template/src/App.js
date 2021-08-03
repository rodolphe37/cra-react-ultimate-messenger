import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import isLanguageAtom from "./chatComponents/stateManager/atoms/isLanguageAtom";
import Alert from "./chatComponents/customAlert/Alert";
import roomIdAtom from "./chatComponents/stateManager/atoms/roomIdAtom";
// import clickedOffChatAtom from "./chatComponents/stateManager/atoms/clickedOffChatAtom";

const App = () => {
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  // eslint-disable-next-line no-unused-vars
  const [language, setLanguage] = useRecoilState(isLanguageAtom);
  const { i18n, t } = useTranslation();
  // function for changing languages
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };
  const [roomId] = useRecoilState(roomIdAtom);

  // EXAMPLE OF HOW TO USE RECOIL (ATOM AND SELECTOR) WITH EASE
  const [exampleState] = useRecoilState(exampleSelector);
  const [clickedExample, setClickedExample] =
    useRecoilState(exampleClickedAtom);
  // const [clickedOffChat] = useRecoilState(clickedOffChatAtom);

  const handleClickExampleSelector = () => {
    if (!clickedExample) {
      setClickedExample(true);
    }
    if (clickedExample) {
      setClickedExample(false);
    }
  };
  // END OF EXAMPLE RECOIL STATE MANAGMENT
  const [loadWelcomeAlert, setLoadWelcomeAlert] = useState(true);

  const handleLoadAlert = () => {
    setTimeout(() => {
      setLoadWelcomeAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleLoadAlert();
    console.log("selector :", exampleState);
    console.log("clicked :", clickedExample);
    console.log("roomId :", roomId);
  }, [exampleState, roomId, clickedExample]);

  useEffect(() => {
    setTimeout(() => {
      sessionStorage.setItem("welcome", true);
    }, 2570);

    return () => {
      return () => {
        sessionStorage.removeItem("welcome");
      };
    };
  }, []);

  return (
    <Fragment>
      {!loadWelcomeAlert && sessionStorage.getItem("welcome") === null ? (
        <Alert
          title={`${t("exampleReUseAlertTitle")}`}
          subTitle={`${t("exampleReUseAlertMood")}`}
          confirmMessage={`${t("exampleReUseAlertconfirmMood")}`}
          buttonYes={`${t("exampleReUseAlertGoesWell")}`}
          buttonNo={`${t("exampleReUseAlertPissesOff")}`}
        />
      ) : null}
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
          <br />
          <span
            style={{ cursor: "pointer" }}
            onClick={handleClickExampleSelector}
          >
            <img src={logo} className="App-logo" alt="logo" />
          </span>
          <p style={{ fontSize: 18, maxWidth: 280 }}>{t("exampleRecoil")}</p>
          <p style={{ fontSize: 15, maxWidth: 280 }}>{exampleState}</p>
        </header>
      </div>

      <Router>
        <Switch>
          <Route exact path="/">
            <ButtonChat />
          </Route>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/home">
            <HomeChat />
          </Route>
          <Route path={`/chat/${roomId}`}>
            <ChatRoom />
          </Route>
          <Route path={`/video/${roomId}`}>
            <VideoChatComponent roomId={roomId} />
          </Route>
          <Route path="/load">
            <Loader />
          </Route>
          <Route path="/intro">
            <BottomDrawer />
          </Route>
          <Route path="/meteo">
            <Weather />
          </Route>
          <Route path="/alert">
            <Alert />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
