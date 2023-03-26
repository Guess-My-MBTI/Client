import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineLink } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineReplay, MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UrlAPI from "../utils/UrlAPI";
import ShareLink from "./ShareLink";
const Menu = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  const [isShare, setIsShare] = useState(false);
  const baseUrl = UrlAPI;

  const accessToken = localStorage.getItem("access_token");
  const ownerId = localStorage.getItem("id");

  const menuToggle = () => {
    setIsOpen(!isOpen);
  };

  const shareLink = () => {
    axios({
      method: "GET",
      url: `${baseUrl}share`,
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        id: ownerId,
      },
    }).then((res) => {
      setLink(res.data);

      setIsShare(!isShare);
    });
  };

  const reExam = () => {
    if (
      window.confirm(
        "다시 검사할 시 이전의 데이터들이 모두 지워집니다. 다시 검사하시겠습니까? (5초 정도 소요됩니다)"
      )
    ) {
      axios({
        method: "DELETE",
        url: `${baseUrl}${ownerId}`,
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => {
        alert("기존의 데이터들이 삭제되었습니다.");
        localStorage.setItem("mbti", "");
        navigate("/owner-question", { replace: true });
      });
    } else {
      alert("취소합니다.");
    }
  };

  const logOut = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      axios({
        method: "GET",
        url: `${baseUrl}owner/logout`,
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          id: ownerId,
        },
      }).then((res) => {
        alert("로그아웃 되었습니다.");
        localStorage.clear();
        navigate("/", { replace: true });
      });
    } else {
      alert("취소합니다.");
    }
  };
  return (
    <div className="Menu">
      <div className="menu-box">
        <div
          className="menuList m1"
          onClick={() => {
            navigate("/owner-result");
          }}
        >
          <BsFillPersonFill className="mymbti" />
          <p className="text">나의 MBTI</p>
        </div>
        <div className="menuList m2" onClick={reExam}>
          <MdOutlineReplay className="return" />
          <p className="text">다시 검사하기</p>
        </div>
        <div className="menuList m3" onClick={shareLink}>
          <HiOutlineLink className="share" />
          <p className="text">링크 공유하기</p>
        </div>
        <div className="menuList m4" onClick={logOut}>
          <MdOutlineKeyboardBackspace className="logout" />
          <p className="text">로그아웃</p>
        </div>
        <div className="m5">
          <AiOutlineClose onClick={menuToggle} />
        </div>
      </div>
      <div>
        {isShare ? (
          <>
            <ShareLink link={link} isShare={isShare} setIsShare={setIsShare} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Menu;
