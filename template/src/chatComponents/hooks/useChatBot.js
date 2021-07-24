/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Weather from "../components/weatherComponent/WeatherComponent";
import {
  prompts,
  replies,
  coronavirus,
  alternative,
} from "../constants/constants";
import messageForBotAtom from "../stateManager/atoms/messageForBotAtom";
import roomIdAtom from "../stateManager/atoms/roomIdAtom";
import weatherAtom from "../stateManager/atoms/weatherAtom";

const useChatBot = () => {
  const [messageForBot] = useRecoilState(messageForBotAtom);
  let [infosUser, setInfosUser] = useState(
    JSON.parse(sessionStorage.getItem("infos user"))
  );
  let [userName, setUserName] = useState(localStorage.getItem("username"));
  const [roomToken] = useRecoilState(roomIdAtom);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useRecoilState(weatherAtom);

  let product;
  // GET HOUR FOR HORLOGE COMMAND TO BOTCHAT
  let today = new Date();
  let time = `${today.getHours()} heures ${today.getMinutes()} minutes et  ${today.getSeconds()} secondes`;
  // GET DATE - TIME FOR EACH MESSAGE
  let d = new Date();
  let n = d.toLocaleString();

  useEffect(() => {}, [infosUser, userName]);

  // Regex remove non word/space chars
  // Trim trailing whitespce
  // Remove digits - not sure if this is best
  // But solves problem of entering something like 'hi1'
  let text = messageForBot
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/[\d]/gi, "")
    .trim();
  text = text
    .replace(/ un /g, " ") // 'tell me a story' -> 'tell me story'
    .replace(/je crois /g, "")
    .replace(/quoi/g, "qu'est-ce que")
    .replace(/s'il te plait /g, "")
    .replace(/ s'il te plait/g, "")
    .replace(/r u/g, "tu es");

  function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        if (promptsArray[x][y] === string) {
          let replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          // Stop inner loop when input value matches prompts
          break;
        }
      }
      if (replyFound) {
        // Stop outer loop when reply is found instead of interating through the entire array
        break;
      }
    }
    return reply;
  }

  if (compare(prompts, replies, text)) {
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/chatbot/gi) && !userName) {
    product = `Que puis-je faire pour toi?`;
  } else if (text.match(/room/gi) && roomToken) {
    product = `Tu es dans la room - ${roomToken} 😉`;
  } else if (text.match(/room/gi) && !roomToken) {
    product = `Je crain que tu ne soit plus connecté à une room 😕. Reconnecte toi en ré-ouvrant le chat 😝`;
  } else if (text.match(/chatbot/gi) && userName) {
    product = `Que puis-je faire pour toi ${userName}?`;
  } else if (text.match(/merci/gi)) {
    product = "Pas de quoi";
  } else if (text.match(/merci/gi)) {
    product = "Pas de quoi";
  } else if (text.match(/horloge/gi)) {
    product = `il est exactement ${time}`;
  } else if (text.match(/calendrier/gi)) {
    product = `Nous somme le ${n}`;
  } else if (text.match(/suis/gi)) {
    infosUser &&
      (product = `Tu t'appelle : ${userName}, ton drapeau est ${infosUser.flag},
    ton ip est : ${infosUser.ip},
    ton navigateur est  ${infosUser.navigator},
    ton Système d'exploitation est ${infosUser.os}
    et ta time zone est : ${infosUser.timezone}`);
  } else if (text.match(/fuck/gi)) {
    product = "Fuck toi même, petit impoli 🖕🏼🖕🏼";
  } else if (text.match(/(corona|covid|virus)/gi)) {
    // If no match, check if message contains `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  return {
    product,
    prompts,
    replies,
    coronavirus,
    alternative,
  };
};

export default useChatBot;
