import { Fragment, useEffect, useState } from "react";
import ParamIcon from "../../assets/settings.png";
import "./parameters.css";
import sound from "../../assets/sounds/mixkit-guitar-notification-alert-2320.mp3";
import sound2 from "../../assets/sounds/mixkit-software-interface-back-2575.mp3";
import soundToggleParams from "../../assets/sounds/mixkit-fast-double-click-on-mouse-275.mp3";
import CheckIcon from "../../assets/check.png";
import Delete from "../../assets/erase.svg";
import Bell from "../../assets/bell.svg";
import Disabled from "../../assets/disabled.svg";
import SupressConversations from "../suppressConversationsModal/SupressConversationsModal";
import seeMedia from "../../assets/yes.svg";
import notSeeMedia from "../../assets/no.svg";
import ResetModal from "../resetModal/ResetModal";
import useParams from "../../hooks/useParams";
import { useRecoilState } from "recoil";
import usernameAtom from "../../stateManager/atoms/usernameAtom";
import ok from "../../assets/ok.svg";
import supp from "../../assets/supp.svg";
import validateUsernameAtom from "../../stateManager/atoms/validateUsernameAtom";
import { useTranslation } from "react-i18next";
import isSoundNotificationsAtom from "../../stateManager/atoms/isSoundNotifications";

const Parameters = () => {
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [isSoundNotification, setIsSoundNotification] = useRecoilState(
    isSoundNotificationsAtom
  );
  const [eraseUsername, setEraseUsername] = useState(true);
  const { t } = useTranslation();
  const [validateUsername, setValidateUsername] =
    useRecoilState(validateUsernameAtom);
  const {
    selectedDarkTheme,
    selectedLightTheme,
    clickedSound1,
    setClickedSound1,
    clickedSound2,
    setClickedSound2,
    clickedParams,
    openDangerZone,
    setOpenDangerZone,
    seingMedia,
    toggleTooltip,
    handleDeleteConversations,
    handleChangeLightTheme,
    handleChangeDarkTheme,
    handleClickSound2,
    handleClickSound1,
    toggleSoundNotification,
    handleClickSeeMedia,
    toggleDangerZone,
    selectedSound,
    toggleSettingsZone,
    openSettingsZone,
    toggleSoundsZone,
    toggleThemesZone,
    togglePictureZone,
    openSoundsZone,
    openThemesZone,
    openPictureZone,
  } = useParams();

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

  useEffect(() => {
    if (localStorage.getItem("boolDark") !== true || selectedDarkTheme) {
      localStorage.setItem("boolDark", selectedDarkTheme);
    }
    if (localStorage.getItem("boolLight") !== true || selectedLightTheme) {
      localStorage.setItem("boolLight", selectedLightTheme);
    }
    if (isSoundNotification) {
      if (localStorage.getItem("guitar") !== true || clickedSound1) {
        localStorage.setItem("guitar", clickedSound1);
      }
      if (localStorage.getItem("software") !== true || clickedSound2) {
        localStorage.setItem("software", clickedSound2);
      }
      localStorage.setItem("sound", true);
    }
    if (isSoundNotification && !clickedSound1 && !clickedSound2) {
      setClickedSound1(true);
    }
    if (!isSoundNotification) {
      setClickedSound1(false);
      setClickedSound2(false);
      localStorage.setItem("sound", false);
      localStorage.setItem("guitar", false);
    }
    if (localStorage.getItem("sound") === false) {
      setIsSoundNotification(false);
    }
    if (localStorage.getItem("seeMedia") === null) {
      localStorage.setItem("seeMedia", true);
    }

    if (!clickedParams) {
      setOpenDangerZone(false);
    }
  }, [
    selectedLightTheme,
    selectedDarkTheme,
    clickedSound1,
    clickedSound2,
    isSoundNotification,
    setClickedSound1,
    setClickedSound2,
    seingMedia,
    openDangerZone,
    clickedParams,
    setOpenDangerZone,
    setIsSoundNotification,
    openSettingsZone,
    openSoundsZone,
    openThemesZone,
    openPictureZone,
  ]);

  return (
    <div className="params-container">
      {clickedParams && (
        <audio autoPlay>
          <source src={soundToggleParams} />
        </audio>
      )}
      <img
        onClick={toggleTooltip}
        className={
          clickedParams ? "params-icon params-icon-anim" : "params-icon"
        }
        src={ParamIcon}
        alt="params"
      />
      <div className={clickedParams ? "settings-content" : "not-display"}>
        <div
          id="toolTip"
          className={
            !selectedDarkTheme
              ? "setting-elements light-background"
              : "setting-elements dark-background"
          }
        >
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
                      <img className="username-icons" src={supp} alt="supp" />
                    </button>
                  )}
                </Fragment>
              )}
            </div>
            <hr
              className={selectedLightTheme ? "" : "hr-white"}
              style={{ width: "100%" }}
            />
          </div>
          <div className="settingDrawer">
            {openSettingsZone && (
              <audio autoPlay>
                <source src={soundToggleParams} />
              </audio>
            )}
            <button
              onClick={toggleSettingsZone}
              className={
                !openSettingsZone
                  ? "toggle-settings-button"
                  : "toggle-settings-button toggleSettingsOpen"
              }
            >
              <h1
                className={selectedDarkTheme ? "white" : "black"}
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {t("settingsButton")}
              </h1>
            </button>
            <div
              className={
                openDangerZone || !openSettingsZone
                  ? "hiddenParams"
                  : "paramsContent"
              }
            >
              <button
                className={
                  openSoundsZone
                    ? "neumorphic variation2 width100"
                    : "neumorphic neumorphic--pressed variation2.pressed button-Sounds  "
                }
                onClick={toggleSoundsZone}
              >
                <h1
                  className={selectedDarkTheme ? "white" : "black"}
                  style={{
                    // marginLeft: "-10px",
                    fontSize: 11,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 17,
                  }}
                >
                  {t("soundNotification")}
                </h1>
              </button>
              <div className={openSoundsZone ? "sound-list" : "hiddenParams "}>
                <ul className="fullList-sounds">
                  <li>
                    <button
                      className="soundsButton"
                      onClick={handleClickSound1}
                    >
                      <b
                        className={
                          selectedDarkTheme
                            ? "select-theme-content sounds white"
                            : " select-theme-content sounds black"
                        }
                      >
                        {clickedSound1 ? (
                          <img
                            className="check-icon"
                            src={CheckIcon}
                            alt="check"
                          />
                        ) : (
                          !selectedSound && null
                        )}
                        <p
                          className={
                            !clickedSound1 ? "centered" : "little-marginBottom"
                          }
                          style={{
                            fontSize: 10,
                            marginBottom: "-18px",
                            marginLeft: 33,
                          }}
                        >
                          {t("guitarSound")}
                        </p>
                      </b>
                    </button>
                    {isSoundNotification && clickedSound1 && (
                      <audio autoPlay>
                        <source src={sound} />
                      </audio>
                    )}
                  </li>
                  <li>
                    <button
                      className="soundsButton "
                      onClick={handleClickSound2}
                    >
                      <b
                        className={
                          selectedDarkTheme
                            ? "select-theme-content sounds white"
                            : " select-theme-content sounds black"
                        }
                      >
                        {clickedSound2 ? (
                          <img
                            className="check-icon"
                            src={CheckIcon}
                            alt="check"
                          />
                        ) : (
                          !selectedSound && null
                        )}
                        <p
                          className={
                            !clickedSound2 ? "centered" : "little-marginBottom"
                          }
                          style={{
                            fontSize: 10,
                            marginBottom: "-18px",
                            marginLeft: 33,
                          }}
                        >
                          {t("softwareSound")}
                        </p>
                      </b>
                    </button>
                    {isSoundNotification && clickedSound2 && (
                      <audio autoPlay>
                        <source src={sound2} />
                      </audio>
                    )}
                  </li>
                </ul>
                <div className="sourdine-container">
                  <p
                    className={selectedDarkTheme ? "white" : "black"}
                    style={{
                      fontSize: 10,
                      marginBottom: "-17px",
                      // marginLeft: -24,
                      marginTop: -13,
                    }}
                  >
                    {t("muteOption")}
                  </p>
                  <br />
                  <button
                    className="soundsButton disabledButton"
                    onClick={toggleSoundNotification}
                  >
                    <b
                      style={{ position: "relative" }}
                      className="select-theme-content sounds"
                    >
                      {isSoundNotification ? (
                        <img
                          style={{
                            width: 24,
                            height: 24,
                            position: "absolute",
                            bottom: -9,
                            marginLeft: 5,
                          }}
                          src={Bell}
                          alt="ring"
                        />
                      ) : (
                        <img
                          style={{
                            width: 24,
                            height: 24,
                            position: "absolute",
                            bottom: -9,
                            marginLeft: 4,
                          }}
                          src={Disabled}
                          alt="disabled"
                        />
                      )}
                      <p
                        className={selectedDarkTheme ? "white" : "black"}
                        style={{
                          fontSize: 10,
                          marginBottom: "-10px",
                          marginLeft: 44,
                        }}
                      ></p>
                    </b>
                  </button>
                </div>
                <hr
                  className={selectedLightTheme ? "" : "hr-white"}
                  style={{ width: "100%" }}
                />
              </div>

              <button
                className={
                  !openThemesZone
                    ? "neumorphic neumorphic--pressed variation2.pressed"
                    : "neumorphic variation2"
                }
                onClick={toggleThemesZone}
              >
                <h1
                  className={selectedDarkTheme ? "white" : "black"}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginLeft: "-10px",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {t("themes")}
                </h1>
              </button>
              <div
                className={
                  openThemesZone ? "theme-change-color" : "hiddenParams"
                }
              >
                <ul className="fullList-sounds fullList-sounds-theme">
                  <li className="listTheme-button">
                    <button
                      style={{
                        marginLeft: 0,
                        marginBottom: 0,
                        height: 27,
                        background: "#fff",
                        borderRadius: "50%",
                        width: 27,
                        border: "1px solid #2e2c2c",
                        padding: 5,
                      }}
                      onClick={handleChangeLightTheme}
                    >
                      <b className="select-theme-content">
                        {selectedLightTheme && (
                          <img
                            style={{ marginLeft: "6px" }}
                            className="check-icon"
                            src={CheckIcon}
                            alt="check"
                          />
                        )}
                        <p
                          style={{
                            fontSize: 10,
                            color: "black",
                            marginBottom: "-10px",
                          }}
                        >
                          {" "}
                        </p>
                      </b>
                    </button>
                  </li>
                  <li className="listTheme-button">
                    <button
                      style={{
                        marginLeft: 0,
                        marginBottom: 0,
                        height: 27,
                        background: "#2e2c2c",
                        borderRadius: "50%",
                        width: 27,
                        border: "1px solid #fff",
                        padding: 5,
                      }}
                      onClick={handleChangeDarkTheme}
                    >
                      <b className="select-theme-content">
                        {selectedDarkTheme && (
                          <img
                            style={{ marginLeft: "6px" }}
                            className="check-icon"
                            src={CheckIcon}
                            alt="check"
                          />
                        )}
                        <p
                          style={{
                            fontSize: 10,
                            color: "black",
                            marginBottom: "-10px",
                          }}
                        >
                          {" "}
                        </p>
                      </b>
                    </button>
                  </li>
                </ul>
              </div>
              {openThemesZone && (
                <hr
                  className={selectedLightTheme ? "" : "hr-white"}
                  style={{ width: "100%" }}
                />
              )}
              <div className="pictureSetting">
                <button
                  className={
                    !openPictureZone
                      ? "neumorphic neumorphic--pressed variation2.pressed"
                      : "neumorphic variation2"
                  }
                  onClick={togglePictureZone}
                >
                  <h1
                    className={selectedDarkTheme ? "white" : "black"}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {t("pictureSetting")}
                  </h1>
                </button>
                <div
                  className={
                    openPictureZone
                      ? "theme-change marginLeft30"
                      : "hiddenParams"
                  }
                >
                  <ul className="fullList-sounds fullList-sounds-theme">
                    <li
                      className={
                        openPictureZone
                          ? "listPicture-button"
                          : "theme-change-picture"
                      }
                    >
                      <button
                        style={{
                          marginLeft: 0,
                          marginBottom: 0,
                          height: 27,
                          background: "#fff",
                          borderRadius: "50%",
                          width: 27,
                          border: "1px solid #2e2c2c",
                          padding: 5,
                        }}
                        onClick={handleClickSeeMedia}
                      >
                        <b className="select-theme-content">
                          {seingMedia ? (
                            <img
                              style={{
                                marginLeft: -18,
                                marginBottom: -20,
                                width: 30,
                                height: 30,
                              }}
                              src={seeMedia}
                              alt=""
                            />
                          ) : (
                            <img
                              className="flip-vertical-right"
                              style={{
                                marginLeft: -18,
                                marginBottom: -20,
                                width: 30,
                                height: 30,
                              }}
                              src={notSeeMedia}
                              alt=""
                            />
                          )}
                        </b>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr
            className={selectedLightTheme ? "" : "hr-white"}
            style={{ width: "100%" }}
          />
          <div className="danger-zone">
            {openDangerZone && (
              <audio autoPlay>
                <source src={soundToggleParams} />
              </audio>
            )}
            <button
              onClick={toggleDangerZone}
              className={
                !openDangerZone
                  ? "toggle-danger-button"
                  : "toggle-danger-button toggleDangerOpen"
              }
            >
              <h1
                className={selectedDarkTheme ? "white" : "black"}
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {t("dangerZone")}
              </h1>
            </button>
            <div
              className={
                !openDangerZone ? "danger-zone-content" : "danger-toggled"
              }
            >
              <div className="reset-history">
                <h1
                  style={{
                    // width: 170,
                    // textAlign: "center",
                    marginLeft: "5px",
                    fontSize: 10,
                    fontWeight: "bold",
                    marginTop: 20,
                  }}
                >
                  {t("deleteConversations")}
                </h1>
                <SupressConversations
                  Delete={Delete}
                  handleDeleteConversations={handleDeleteConversations}
                  selectedDarkTheme={selectedDarkTheme}
                />
              </div>

              <div className="reset-history">
                <h1
                  style={{
                    // width: 170,
                    textAlign: "center",
                    marginLeft: "-4px",
                    fontSize: 10,
                    fontWeight: "bold",
                    marginTop: 8,
                    marginBottom: 10,
                  }}
                >
                  {t("resetApp")}
                </h1>
                <div className="resetApp">
                  <ResetModal />
                </div>
              </div>
            </div>
          </div>
          <div id="tailShadow"></div>
          <div id="tail1"></div>
          <div
            className={selectedDarkTheme ? "border-black" : ""}
            id="tail2"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Parameters;
