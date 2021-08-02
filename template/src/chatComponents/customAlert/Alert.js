/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./alert.css";
import clickedAlertAtom from "./clickedAlertAtom";

import Logo from "../../logo.svg";
import selectedDarkThemeAtom from "../stateManager/atoms/selectedDarkThemeAtom";
import { useTranslation } from "react-i18next";

const Alert = () => {
  const { t } = useTranslation();
  let history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [clickedAlert, setClickedAlert] = useRecoilState(clickedAlertAtom);
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const [isMessages] = useState(JSON.parse(localStorage.getItem("messages")));
  function stepConfirm() {
    setClickedAlert(false);
    localStorage.removeItem("messages");
    history.replace("/");
  }
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
                  {isMessages.length > 0
                    ? `${t("alertMessIfMessagesList")}`
                    : ""}
                </h1>
              </div>
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
  }, []);

  return <div className="container"></div>;
};
export default Alert;
