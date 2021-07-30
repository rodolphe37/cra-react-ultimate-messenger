// MODULES IMPORTS
import { useState } from "react";
import { useRecoilState } from "recoil";
// STATEMANAGMENT IMPORTS
import selectedSoundAtom from "../stateManager/atoms/selectedSoundAtom";
import selectedDarkThemeAtom from "../stateManager/atoms/selectedDarkThemeAtom";
import selectedLightThemeAtom from "../stateManager/atoms/selectedLightThemeAtom";
import clickedParamsAtom from "../stateManager/atoms/clickedParamsAtom";
import clickedSoundGuitarAtom from "../stateManager/atoms/clickedSoundGuitarAtom";
import clickedSoundSoftwareAtom from "../stateManager/atoms/clickedSoundSoftwareAtom";
import dangerZoneAtom from "../stateManager/atoms/dangerZoneAtom";
import seeMediaAtom from "../stateManager/atoms/seeMediaAtom";
import roomIdAtom from "../stateManager/atoms/roomIdAtom";
import isSoundNotificationsAtom from "../stateManager/atoms/isSoundNotifications";

const useParams = () => {
  const [clickedParams, setClickedParams] = useRecoilState(clickedParamsAtom);
  const [clickedSound1, setClickedSound1] = useRecoilState(
    clickedSoundGuitarAtom
  );
  const [clickedSound2, setClickedSound2] = useRecoilState(
    clickedSoundSoftwareAtom
  );
  const [selectedSound, setSelectedSound] = useRecoilState(selectedSoundAtom);
  const [selectedDarkTheme, setSelectedDarkTheme] = useRecoilState(
    selectedDarkThemeAtom
  );
  const [selectedLightTheme, setSelectedLightTheme] = useRecoilState(
    selectedLightThemeAtom
  );
  const [seingMedia, setSeignMedia] = useRecoilState(seeMediaAtom);
  const [isSoundNotification, setIsSoundNotification] = useRecoilState(
    isSoundNotificationsAtom
  );
  const [openDangerZone, setOpenDangerZone] = useRecoilState(dangerZoneAtom);
  const [openSettingsZone, setOpenSettingsZone] = useState(false);
  const [openSoundsZone, setOpenSoundsZone] = useState(false);
  const [openThemesZone, setOpenThemesZone] = useState(false);
  const [openPictureZone, setOpenPictureZone] = useState(false);
  const [roomName] = useRecoilState(roomIdAtom);
  const [isSoundGuitar, setIsSoundGuitar] = useState(false);
  const [isSoundSoftware, setIsSoundSoftware] = useState(false);

  const toggleTooltip = () => {
    if (clickedParams) {
      setClickedParams(false);
    }
    if (!clickedParams) {
      setClickedParams(true);
    }
  };
  const toggleSettingsZone = () => {
    if (openSettingsZone) {
      setOpenSettingsZone(false);
    }
    if (!openSettingsZone) {
      setOpenSettingsZone(true);
      setOpenDangerZone(false);
    }
  };
  const toggleSoundsZone = () => {
    if (openSoundsZone) {
      setOpenSoundsZone(false);
    }
    if (!openSoundsZone) {
      setOpenSoundsZone(true);
      setOpenThemesZone(false);
      setOpenPictureZone(false);
    }
  };
  const toggleThemesZone = () => {
    if (openThemesZone) {
      setOpenThemesZone(false);
    }
    if (!openThemesZone) {
      setOpenThemesZone(true);
      setOpenSoundsZone(false);
      setOpenPictureZone(false);
    }
  };
  const togglePictureZone = () => {
    if (openPictureZone) {
      setOpenPictureZone(false);
    }
    if (!openPictureZone) {
      setOpenPictureZone(true);
      setOpenSoundsZone(false);
      setOpenThemesZone(false);
    }
  };

  const toggleDangerZone = () => {
    if (openDangerZone) {
      setOpenDangerZone(false);
    }
    if (!openDangerZone) {
      setOpenDangerZone(true);
      setOpenSettingsZone(false);
    }
  };

  const handleClickSeeMedia = () => {
    if (seingMedia) {
      setSeignMedia(false);
      localStorage.setItem("seeMedia", false);
    }
    if (!seingMedia) {
      setSeignMedia(true);
      localStorage.setItem("seeMedia", true);
    }
  };

  const toggleSoundNotification = () => {
    if (isSoundNotification) {
      setIsSoundNotification(false);
      localStorage.setItem("sound", false);
    }
    if (!isSoundNotification) {
      setIsSoundNotification(true);
      localStorage.setItem("sound", true);
    }
    console.log("sound", isSoundNotification);
  };

  // useEffect(() => {
  //   console.log("sound", isSoundNotification);
  // }, [isSoundNotification]);

  const handleClickSound1 = () => {
    if (clickedSound1) {
      setClickedSound1(false);
      setClickedSound2(true);
      setSelectedSound(false);
    }
    if (!clickedSound1) {
      setClickedSound2(false);
      setClickedSound1(true);
      setSelectedSound(true);
      setIsSoundGuitar(true);
      setTimeout(() => {
        setIsSoundGuitar(false);
      }, 2000);
    }
  };
  const handleClickSound2 = () => {
    if (clickedSound2) {
      setClickedSound2(false);
      setSelectedSound(false);
    }
    if (!clickedSound2) {
      setClickedSound1(false);
      setClickedSound2(true);
      setSelectedSound(false);
      setIsSoundSoftware(true);
      setTimeout(() => {
        setIsSoundSoftware(false);
      }, 2000);
    }
  };

  const handleChangeDarkTheme = () => {
    if (selectedDarkTheme) {
      setSelectedDarkTheme(false);
      setSelectedLightTheme(true);
    }
    if (!selectedDarkTheme) {
      setSelectedDarkTheme(true);
      setSelectedLightTheme(false);
    }
  };
  const handleChangeLightTheme = () => {
    if (selectedLightTheme) {
      setSelectedDarkTheme(true);
      setSelectedLightTheme(false);
    }
    if (!selectedLightTheme) {
      setSelectedLightTheme(true);
      setSelectedDarkTheme(false);
    }
  };

  const handleDeleteConversations = () => {
    if (
      localStorage.getItem("messages") === null ||
      localStorage.getItem("messages") === []
    ) {
      return;
    }
    if (
      JSON.parse(localStorage.getItem("messages")) !== null ||
      JSON.parse(localStorage.getItem("messages")) !== []
    ) {
      localStorage.removeItem("messages");
      window.location.replace(`/chat/${roomName}`);
    }
  };
  return {
    selectedDarkTheme,
    selectedLightTheme,
    isSoundNotification,
    clickedSound1,
    setClickedSound1,
    clickedSound2,
    setClickedSound2,
    setIsSoundNotification,
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
    isSoundGuitar,
    setIsSoundGuitar,
    isSoundSoftware,
    setIsSoundSoftware,
  };
};

export default useParams;
