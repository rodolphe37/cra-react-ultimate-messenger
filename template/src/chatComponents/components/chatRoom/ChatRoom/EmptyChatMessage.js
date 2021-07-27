import { useTranslation } from "react-i18next";
import pictBot from "../../../assets/bot.png";

const EmptyChatMessage = ({ messages }) => {
  const { t } = useTranslation();
  return (
    <div className="chatbot-accueil">
      <div className="tooltip">
        <img
          className="chatbot-img-emptyMessage"
          src={pictBot}
          alt="botPicture"
        />
        <span
          style={{ fontSize: 14, padding: 10 }}
          className="tooltiptext-chatbot"
        >
          ` 🌞 {t("botTips")} 😉!`
        </span>
      </div>

      <b>{t("botMess")}</b>
    </div>
  );
};

export default EmptyChatMessage;
