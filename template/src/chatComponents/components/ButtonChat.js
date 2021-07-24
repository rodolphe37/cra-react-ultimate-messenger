// import { useHistory } from "react-router-dom";
// import Bavarder from "../assets/chat.svg";
// import useGetUserInfos from "../hooks/useGetUserInfos";
import BottomDrawer from "./bottomDrawer/BottomDrawer";

const ButtonChat = () => {
  // const { setClickedOnApp } = useGetUserInfos();
  // let history = useHistory();
  return <BottomDrawer />;
};

export default ButtonChat;

/*
<div className="buttonChatContent">
      <button
        className="chat-button"
        onClick={() => {
          setClickedOnApp(true);
          history.push("/intro");
        }}
      >
        <img src={Bavarder} alt="icon" />
      </button>
    </div>
*/
