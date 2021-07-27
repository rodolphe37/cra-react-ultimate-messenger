/* eslint-disable no-unused-vars */
// MODULES IMPORTS
import { useEffect } from "react";
import { useRecoilState } from "recoil";
// HOOKS & SERVICES IMPORTS
import useChat from "../hooks/useChat";
import UploadService from "../services/FileUploadService";
// STATEMANAGMENT IMPORTS
import selectedDarkThemeAtom from "../stateManager/atoms/selectedDarkThemeAtom";
import seeMediaAtom from "../stateManager/atoms/seeMediaAtom";
import plusSectionAtom from "../stateManager/atoms/plusSectionAtom";
import roomIdAtom from "../stateManager/atoms/roomIdAtom";
import fileFromPictureAtom from "../stateManager/atoms/fileFromPictureAtom";
import isReceivedMediasMessageToUserAtom from "../stateManager/atoms/receiveMediasMessageToUserAtom";
import imageInfoAtom from "../stateManager/atoms/imageInfoAtom";
// ASSETS IMPORTS
import camera from "../assets/Group 54437@2x.png";
import upArrow from "../assets/up-arrow.svg";

const UploadImages = ({ handleSendMessage, setIsTaping }) => {
  const [state, setState] = useRecoilState(fileFromPictureAtom);
  const [plusSection, setPlusSection] = useRecoilState(plusSectionAtom);
  const [isReceiveMediaToUser, setIsReceiveMediaToUser] = useRecoilState(
    isReceivedMediasMessageToUserAtom
  );
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const [isImageList, setIsImageList] = useRecoilState(imageInfoAtom);
  const { setNewMessage, pictComment, setPictComment } = useChat(roomIdAtom);
  const [seingPict] = useRecoilState(seeMediaAtom);

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setState({
        imageInfos: response.data,
      });
      setIsImageList({
        imageInfos: response.data,
      });
    });
  }, [setState, setIsImageList, isReceiveMediaToUser]);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      upload();
    }
  };

  function selectFile(e) {
    setState({
      currentFile: e.target.files[0],
      previewImage: URL.createObjectURL(e.target.files[0]),
      progress: 0,
      message: "",
    });

    setNewMessage(isImageList.currentFile?.name);
  }

  function upload() {
    setState({
      progress: 0,
    });

    UploadService.upload(state.currentFile, (e) => {
      setState({
        progress: Math.round((100 * e.loaded) / e.total),
      });
    })
      .then((response) => {
        setState({
          message: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        setState({
          imageInfos: files.data,
        });
      })
      .catch((err) => {
        console.log(err);
        setState({
          progress: 0,
          message: "Could not upload the image!",
          currentFile: undefined,
        });
      });

    setIsReceiveMediaToUser(true);
    setPlusSection(false);

    setTimeout(() => {
      handleSendMessage();
    }, 800);
  }

  const { previewImage } = state;
  return (
    <div>
      {previewImage && (
        <div
          className={
            selectedDarkTheme
              ? "preview-container dark-background"
              : "preview-container"
          }
        >
          <div className="preview-modal-head">
            <h1
              style={{ cursor: "pointer" }}
              className="closed-preview-img"
              onClick={() => {
                setState({ previewImage: undefined });
                window.location.reload();
              }}
            >
              X
            </h1>
          </div>
          <img
            style={{ maxWidth: 190, maxHeight: 200 }}
            className="preview-picture-content"
            src={previewImage}
            alt=""
          />
          <hr style={{ width: "100%", color: "#000" }} />
          <div className="comment-picture-bottom">
            <input
              autoComplete="off"
              className={selectedDarkTheme ? "dark-background white" : ""}
              style={{ outline: "none", border: "none" }}
              type="text"
              value={pictComment}
              onSelect={() => {
                setIsTaping(true);
              }}
              onKeyPress={handleKeypress}
              placeholder="Commenter ou envoyer"
              onChange={(e) => setPictComment(e.target.value)}
              autoFocus
            />
            <img onClick={upload} className="up-arrow" src={upArrow} alt="" />
          </div>
        </div>
      )}

      <div className="row">
        {!previewImage && (
          <div className="col-8">
            <input
              placeholder="click"
              type="file"
              accept="image/png, image/jpeg"
              onChange={selectFile}
              id="actual-btn"
              hidden
            />
            {seingPict && (
              <label
                className="label-custom-button-upload"
                htmlFor="actual-btn"
              >
                <div className="tooltip">
                  <img
                    style={{ width: 22, height: 22 }}
                    src={camera}
                    alt="camera"
                  />
                  <span
                    style={{ fontSize: 12, padding: 10 }}
                    className="tooltiptext"
                  >
                    image au format jpg et png seulement !
                  </span>
                </div>
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImages;
