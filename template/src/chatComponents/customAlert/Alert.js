/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./alert.css";
import "../components/checkboxAlert/checkbox-alert.css";
import clickedAlertAtom from "./clickedAlertAtom";

import Logo from "../../logo.svg";
import selectedDarkThemeAtom from "../stateManager/atoms/selectedDarkThemeAtom";
import { useTranslation } from "react-i18next";
import activateDeleteConvAtom from "../components/checkboxAlert/activateDeleteConvAtom";

const Alert = () => {
  const { t } = useTranslation();
  let history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [clickedAlert, setClickedAlert] = useRecoilState(clickedAlertAtom);
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const [isMessages] = useState(JSON.parse(localStorage.getItem("messages")));
  function stepConfirm() {
    setClickedAlert(false);
    if (activateDeleteConv) {
      localStorage.removeItem("messages");
    }
    history.replace("/");
  }

  const [activateDeleteConv, setActivateDeleteConv] = useRecoilState(
    activateDeleteConvAtom
  );

  const handleActivateDeleteConv = () => {
    if (activateDeleteConv) {
      setActivateDeleteConv(false);
    }
    if (!activateDeleteConv) {
      setActivateDeleteConv(true);
    }
  };
  useEffect(() => {
    if (activateDeleteConv) {
      sessionStorage.setItem("noDeleteConv", true);
    }
    if (!activateDeleteConv) {
      sessionStorage.setItem("noDeleteConv", false);
    }
    console.log("activate", activateDeleteConv);
  }, [activateDeleteConv, handleActivateDeleteConv]);

  useEffect(() => {
    const confirmDialog = () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div
              className={
                selectedDarkTheme
                  ? "react-confirm-alert-body dark-background white"
                  : "react-confirm-alert-body light-background black"
              }
            >
              <div className="alert-content">
                <img
                  className="react-confirm-alert-img-logo"
                  src={Logo}
                  alt="logo"
                />
                <h1>
                  {t("alertCloseChatTitle")}{" "}
                  {isMessages.length > 0 && activateDeleteConv
                    ? `${t("alertMessIfMessagesList")}`
                    : ""}
                </h1>
              </div>
              {isMessages.length > 0 && (
                <div className="checkbox-alert">
                  <input
                    className="input-checkbox"
                    type="checkbox"
                    name="switch"
                    id="switch"
                  />
                  <label
                    onClick={handleActivateDeleteConv}
                    className="label-checkbox"
                    htmlFor="switch"
                  ></label>
                  <p style={{ fontSize: 12, width: 240, marginLeft: 55 }}>
                    {activateDeleteConv
                      ? "Vos conversations seront effacées"
                      : "Vos conversations ne seront pas effacées"}
                  </p>
                </div>
              )}
              <p>{t("confirmActionCloseChat")}</p>
              <div className="react-confirm-alert-button-group">
                <button
                  onClick={() => {
                    onClose();
                    stepConfirm();
                  }}
                >
                  {t("yesButton")}
                </button>
                <button
                  onClick={() => {
                    setClickedAlert(false);
                    onClose();
                  }}
                >
                  {t("noButton")}
                </button>
              </div>
            </div>
          );
        },
      });
    };
    confirmDialog();
  }, [activateDeleteConv]);

  return <div className="container"></div>;
};
export default Alert;
