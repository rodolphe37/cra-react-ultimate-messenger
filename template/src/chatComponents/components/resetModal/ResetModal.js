/* eslint-disable jsx-a11y/anchor-is-valid */
import "./ResetModal.css";
import Yes from "../../assets/oui.svg";
import No from "../../assets/non.svg";
import ResetAll from "../../assets/reset.svg";
import resetSound from "../../assets/sounds/mixkit-software-interface-remove-2576 .mp3";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import selectedDarkThemeAtom from "../../stateManager/atoms/selectedDarkThemeAtom";
import { useTranslation } from "react-i18next";

const ResetModal = () => {
  const [isResetSound, setIsResetSound] = useState(false);
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const { t } = useTranslation();

  const resetAllWithSound = () => {
    if (!isResetSound) {
      setTimeout(() => {
        setIsResetSound(true);
      }, 250);
    }
    if (isResetSound) {
      setIsResetSound(false);
    }
  };

  useEffect(() => {
    if (isResetSound) {
      localStorage.clear();
      setTimeout(() => {
        window.location.replace("/");
      }, 800);
    }
  }, [isResetSound]);
  return (
    <div className="ResetModalContainer black">
      {isResetSound && (
        <audio autoPlay>
          <source src={resetSound} />
        </audio>
      )}
      <div className="container">
        <div className="interior">
          <a
            className="btn"
            href="#open-modal2"
            style={{
              cursor: "pointer",
            }}
          >
            <button className="resetButton">
              <img
                style={{
                  width: 35,
                  height: 35,
                }}
                src={ResetAll}
                alt="reset"
                className="rotate-button-reset"
              />
            </button>
          </a>
        </div>
      </div>
      <div id="open-modal2" className="modal-window">
        <div
          className={
            selectedDarkTheme
              ? "resetConfirmeModalContent dark-background border-white"
              : "resetConfirmeModalContent light-background border-black"
          }
        >
          <div
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {t("wishResetAll")}
            <p
              style={{
                fontWeight: "normal",
                color: "red",
                textTransform: "lowercase",
              }}
            >
              {t("irreversibleAction")}
            </p>
          </div>
          <div className="ResetModal-buttons">
            <span
              className="logout-button yes-button"
              style={{ cursor: "pointer" }}
              onClick={resetAllWithSound}
            >
              <img
                style={{ width: 23, height: 23, marginLeft: "1em" }}
                src={Yes}
                alt=""
              />
              &ensp;
              <p className="confirme-button-deletedConv">{t("yesButton")}</p>
            </span>
            <a href="#" title="Close" className="logout-button no">
              <img
                style={{ width: 23, height: 23, marginLeft: "1em" }}
                src={No}
                alt=""
              />
              &ensp;{" "}
              <p className="confirme-button-deletedConv">{t("noButton")}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetModal;
