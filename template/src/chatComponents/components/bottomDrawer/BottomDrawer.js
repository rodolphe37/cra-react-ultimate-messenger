/* eslint-disable no-unused-vars */
import { useState, Fragment } from "react";
import "./bottomDrawer.css";
import Bavarder from "../../assets/chat.svg";
import { useRecoilState } from "recoil";
import selectedDarkThemeAtom from "../../stateManager/atoms/selectedDarkThemeAtom";
import usernameAtom from "../../stateManager/atoms/usernameAtom";
import { useHistory } from "react-router-dom";
import selectedLightThemeAtom from "../../stateManager/atoms/selectedLightThemeAtom";
import validateUsernameAtom from "../../stateManager/atoms/validateUsernameAtom";
import { useTranslation } from "react-i18next";
import ok from "../../assets/ok.svg";
import supp from "../../assets/supp.svg";
import clickedGuestAtom from "../../stateManager/atoms/clickedGuestAtom";
import clickedUserAtom from "../../stateManager/atoms/clickedUserAtom";
import logIn from "../../assets/user.svg";
import logInWhite from "../../assets/user-white.svg";
import roomIdAtom from "../../stateManager/atoms/roomIdAtom";
import { Link } from "react-router-dom";

const BottomDrawer = () => {
  const { t } = useTranslation();
  let history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const [selectedLightTheme] = useRecoilState(selectedLightThemeAtom);
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [validateUsername, setValidateUsername] =
    useRecoilState(validateUsernameAtom);
  const [eraseUsername, setEraseUsername] = useState(true);
  const [isClickedGuestButton, setIsClickedGuestButton] =
    useRecoilState(clickedGuestAtom);
  const [isClickedUserButton, setIsClickedUserButton] =
    useRecoilState(clickedUserAtom);

  const [roomName, setRoomName] = useRecoilState(roomIdAtom);

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleDrawer = () => {
    if (openDrawer) {
      setOpenDrawer(false);
    }
    if (!openDrawer) {
      setOpenDrawer(true);
    }
  };

  const handleValidateUsername = () => {
    setEraseUsername(false);
    setValidateUsername(true);
    localStorage.setItem("username", username);
    localStorage.setItem("validateUsername", "valid");
  };

  const handleEraseUsername = () => {
    if (eraseUsername) {
      setEraseUsername(false);
      setValidateUsername(false);
      setUsername("");
    }
    if (!eraseUsername) {
      setEraseUsername(true);
      setValidateUsername(false);
      localStorage.removeItem("username");
      localStorage.removeItem("validateUsername");
      setUsername("");
    }
  };

  const handleClickedGuestButton = () => {
    if (isClickedGuestButton) {
      setIsClickedGuestButton(false);
    }
    if (!isClickedGuestButton) {
      setIsClickedGuestButton(true);
    }
    localStorage.setItem("guest", isClickedGuestButton);
  };
  return (
    <div className="drawer-content ">
      <div id="footerSlideContainer">
        <button className="chat-button" onClick={handleDrawer}>
          <img src={Bavarder} alt="icon" />
        </button>
        <div
          id={openDrawer ? "footerSlideContent" : "footerSlideContent-closed "}
          className={`${openDrawer ? "slide-in-bottom" : "hiddenWindows"}
            ${
              selectedDarkTheme
                ? "dark-background white"
                : "light-background black"
            }`}
        >
          <div className="headerContent-drawer">
            <div className="logo-icon">
              <img src={Bavarder} alt="icon" />
            </div>
            <div className="menuRight-drawer">
              <div className="icon-menuRight">
                <svg
                  width="24.000000pt"
                  height="24.000000pt"
                  viewBox="0 0 30.000000 30.000000"
                >
                  <g
                    transform="translate(3.000000,27.000000) scale(0.100000,-0.100000)"
                    fill={selectedDarkTheme ? "#ffffff" : "#000000"}
                    stroke="none"
                  >
                    <path d="M44 129 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"></path>
                    <path d="M104 129 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"></path>
                    <path d="M164 129 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z"></path>
                  </g>
                </svg>
              </div>
              <div onClick={handleDrawer} className="icon-menuRight">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    filrule="evenodd"
                    clipRule="evenodd"
                    d="M18.3334 13H5.66675C5.11441 13 4.66675 12.5523 4.66675 12C4.66675 11.4477 5.11441 11 5.66675 11H18.3334C18.8857 11 19.3334 11.4477 19.3334 12C19.3334 12.5523 18.8857 13 18.3334 13Z"
                    fill={selectedDarkTheme ? "#ffffff" : "#000000"}
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div id="footerSlideText">
            <h3>{`${t("titleIntro")} ${process.env.REACT_APP_SITE_NAME}`}</h3>
            <span className="buttons-section">
              {username && !isClickedGuestButton && (
                <button
                  onClick={() =>
                    roomName ? history.push(`/chat/${roomName}`) : null
                  }
                  className="firstButton"
                >
                  <img style={{ width: 18 }} src={Bavarder} alt="bavarde" />
                  {t("isUser")} {username}
                </button>
              )}
              <button
                onClick={handleClickedGuestButton}
                className={
                  selectedDarkTheme
                    ? "secondButton white"
                    : "secondButton black"
                }
              >
                {t("guestButton")}
              </button>
              {isClickedGuestButton && (
                <div className="username-container">
                  <h1 style={{ textAlign: "center", marginBottom: 13 }}>
                    {t("username")}
                  </h1>
                  <div className="username-content">
                    <input
                      readOnly={validateUsername ? true : false}
                      type="text"
                      autoComplete="off"
                      maxLength="30"
                      id="chat-name-input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={t("placeholderUsername")}
                      className={
                        !selectedDarkTheme
                          ? validateUsername
                            ? "new-message-input-field light-background opacityFilter"
                            : "new-message-input-field light-background"
                          : validateUsername
                          ? "new-message-input-field dark-background opacityFilter"
                          : "new-message-input-field dark-background"
                      }
                    />

                    {username && (
                      <Fragment>
                        {!validateUsername && (
                          <button
                            onClick={handleValidateUsername}
                            className={
                              validateUsername
                                ? "valid-username-button simple "
                                : "valid-username-button simple"
                            }
                          >
                            <img className="username-icons" src={ok} alt="ok" />
                          </button>
                        )}
                        {validateUsername && (
                          <button
                            onClick={handleEraseUsername}
                            className="erase-urername-button simple opacityfull"
                          >
                            <img
                              className="username-icons"
                              src={supp}
                              alt="supp"
                            />
                          </button>
                        )}
                      </Fragment>
                    )}
                    {username && validateUsername && (
                      <button
                        onClick={() =>
                          roomName ? history.push(`/chat/${roomName}`) : null
                        }
                        className="joinChatButton"
                      >
                        <img
                          className="logInIcon"
                          style={{ width: 33, padding: 4 }}
                          src={selectedDarkTheme ? logInWhite : logIn}
                          alt="login"
                        />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </span>
            <div className="roomId-test">
              <input
                type="text"
                placeholder="Room"
                value={roomName}
                onChange={handleRoomNameChange}
                className="text-input-field"
                required={true}
              />
              {roomName && (
                <Link to={`/chat/${roomName}`} className="enter-room-button">
                  {t("joinRoom")}
                </Link>
              )}
              {!roomName && (
                <p style={{ fontSize: 10, color: "red" }}>{t("roomNameReq")}</p>
              )}
            </div>
            {isClickedGuestButton && (
              <p
                className={
                  selectedDarkTheme
                    ? "bottom-text-drawer white"
                    : "bottom-text-drawer black"
                }
              >
                {t("politic")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomDrawer;
