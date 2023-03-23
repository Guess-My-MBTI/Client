import axios from "axios";

const API = axios.create({
  baseURL: "http://3.38.67.210:8080",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export default API;
