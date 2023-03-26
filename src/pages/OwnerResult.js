import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { HiOutlineLink } from "react-icons/hi";
import { MdOutlineReplay } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import UrlAPI from "../utils/UrlAPI";
import ShareLink from "../components/ShareLink";
const OwnerResult = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [link, setLink] = useState("");
  const [isShare, setIsShare] = useState(false);
  const baseUrl = UrlAPI;

  const accessToken = localStorage.getItem("access_token");
  const mbti = localStorage.getItem("mbti");
  const ownerId = localStorage.getItem("id");

  useEffect(() => {
    axios({
      method: "GET",
      url: `${baseUrl}result/all`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => console.log(error.res));
  }, []);

  const list = data.filter((it) => it.mbti == mbti);

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
    })
      .then((res) => {
        setLink(res.data);
        setIsShare(!isShare);
      })
      .catch((error) => console.log(error.res));
  };

  const goHome = () => {
    if (mbti.length < 1) {
      alert("잘못된 접근입니다. 다시 시작해 주십시오");
      navigate("/", { replace: true });
    } else {
      navigate("/owner-main");
    }
  };

  const reExam = () => {
    if (
      window.confirm(
        "다시 검사할 시 이전의 데이터들이 모두 지워집니다. 다시 검사하시겠습니까?"
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

  return (
    <div className="OwnerResult">
      <div className="result">
        <p className="r">RESULT</p>
        <div className="mbti-box">
          <div className="mbti">
            <p className="m">{mbti[0]}</p>
            <p className="b">{mbti[1]}</p>
            <p className="t">{mbti[2]}</p>
            <p className="i">{mbti[3]}</p>
          </div>
        </div>
      </div>
      <div className="mbti-description">
        <p className="mbti-sum">{list.map((it) => it.name)}</p>
        <div className="mbti-des-box">
          <p className="des">{list.map((it) => it.charType)}</p>
        </div>
      </div>
      <div className="button-wrapper">
        <div className="text">
          <div>다시하기</div>
          <div>홈으로</div>
          <div>공유하기</div>
        </div>
        <div className="icons">
          <div>
            <MdOutlineReplay className="return" onClick={reExam} />
          </div>
          <div>
            <AiFillHome className="home" onClick={goHome} />
          </div>
          <div>
            <HiOutlineLink className="share" onClick={shareLink} />
          </div>
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
export default OwnerResult;
