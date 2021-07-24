/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import visitorInfo from "visitor-info";

const useGetUserInfos = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [response, setResponse] = useState([]);
  const [userInfos, setUserInfos] = useState([]);
  const [ipAddress, setIpAddress] = useState([]);
  const [clickedOnApp, setClickedOnApp] = useState(false);

  // Get current position of the user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const position = [latitude, longitude];
  useEffect(() => {
    async function getIpClient() {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIpAddress(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getIpClient();
  }, []);

  useEffect(() => {
    // axios
    //   .get(
    //     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`
    //   )
    //   .then((res) => {
    //     const city = res.data;
    //     setResponse(city);
    //     // localStorage.setItem("city", JSON.stringify(city));
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //     let collection = localStorage.getItem("city");
    //     setResponse(JSON.parse(collection));
    //   });
    setUserInfos([visitorInfo()]);
    // console.log("locality :", response);
    // console.log("User Infos :", userInfos);
    // console.log("Ip Address :", ipAddress.ip);
  }, [latitude, longitude]);

  return {
    position,
    response,
    userInfos,
    ipAddress,
    clickedOnApp,
    setClickedOnApp,
  };
};

export default useGetUserInfos;
