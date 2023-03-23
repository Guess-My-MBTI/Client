import axios from "axios";

const API = axios.create({
  baseURL: "https://gmmserver.click",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export default API;
