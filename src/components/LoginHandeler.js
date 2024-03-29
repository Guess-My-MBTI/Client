import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import UrlAPI from "../utils/UrlAPI";

const LoginHandeler = (props) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const baseURL = UrlAPI;
  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: "GET",
        url: `https://gmmserver.click/login/oauth2/callback/kakao?code=${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => {
        localStorage.setItem("access_token", res.headers.authorization);
        localStorage.setItem("role", res.data.account.authority);
        localStorage.setItem("name", res.data.account.kakaoName);
        localStorage.setItem("id", res.data.account.id);
        localStorage.setItem("mbti", res.data.account.mbti);
        if (res.data.account.mbti != null) {
          navigate("/owner-main");
        } else {
          navigate("/owner-question");
        }
      });
    };
    kakaoLogin();
  }, [props.history]);

  return (
    <div className="LoginHandeler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoginHandeler;
