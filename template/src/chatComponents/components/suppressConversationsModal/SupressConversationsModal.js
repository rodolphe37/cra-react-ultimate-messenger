/* eslint-disable jsx-a11y/anchor-is-valid */
// MODULES IMPORTS
import { useState } from "react";
import { useTranslation } from "react-i18next";
// CSS IMPORTS
import "./supressConversationModal.css";
// ASSETS IMPORTS
import Yes from "../../assets/oui.svg";
import No from "../../assets/non.svg";
import DeleteSound from "../../assets/sounds/mixkit-paper-quick-movement-2380.mp3";

const SupressConversationsModal = ({
  Delete,
  handleDeleteConversations,
  selectedDarkTheme,
  selectedLightTheme,
}) => {
  const [trashSouns, setTrashSound] = useState(false);
  const { t } = useTranslation();

  const handleEmptyConversations = () => {
    if (trashSouns) {
      setTrashSound(false);
    }
    if (!trashSouns) {
      setTrashSound(true);
    }
  };

  function deleteAllConversations() {
    setTimeout(() => {
      handleEmptyConversations();
    }, 350);
    setTimeout(() => {
      handleDeleteConversations();
    }, 800);
  }

  return (
    <div className="SupressConversationsModalContainer black">
      {trashSouns && (
        <audio autoPlay>
          <source src={DeleteSound} />
        </audio>
      )}
      <div className="container">
        <div className="interior">
          <a className="btn" href="#open-modal">
            <button className="soundsButton suppressButton-container flex">
              <img className="suppress-button" src={Delete} alt="delete" />
            </button>
          </a>
        </div>
      </div>
      <div id="open-modal" className="modal-window">
        <div
          className={
            !selectedDarkTheme
              ? "SupressConversationsConfirmeModalContent black light-background border-black"
              : "SupressConversationsConfirmeModalContent white dark-background border-white"
          }
        >
          <div
            style={{
              textAlign: "center",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {t("wishdeleteConversations")}
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
          <div className="SupressConversationsModal-buttons">
            <span
              className="SupressConversations-button yes-button"
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteAllConversations();
              }}
            >
              <img
                style={{ width: 23, height: 23, marginLeft: "1em" }}
                src={Yes}
                alt=""
              />
              &ensp;
              <p className="confirme-button-deletedConv">{t("yesButton")}</p>
            </span>
            <a
              href="#"
              title="Close"
              className="SupressConversations-button no"
            >
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

export default SupressConversationsModal;
