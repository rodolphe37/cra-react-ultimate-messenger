import axios from "axios";

export default axios.create({
  baseURL: `${process.env.REACT_APP_UPLOAD_WEBSERVICE}`,
  headers: {
    "Content-type": "application/json",
  },
});
