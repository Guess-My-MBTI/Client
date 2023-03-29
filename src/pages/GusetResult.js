import { useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import ListName from "../components/ListName";
import API from "../utils/API";
import { MdOutlineReplay } from "react-icons/md";

const GuestResult = () => {
  const navigate = useNavigate();
  const messageInput = useRef();

  //localStorage에서 user name 불러오기
  const name = localStorage.getItem("name");
  // 이름이 3글자 이상이면 뒤에 두 글자만 가져옴
  const nameData = [
    { ownerName: name.length >= 3 ? name.slice(-2) : name, id: 1 },
  ];

  const mbti = localStorage.getItem("mbti");
  const result = localStorage.getItem("guest_mbti");
  const nickname = localStorage.getItem("nickname");
  const guestId = localStorage.getItem("guest_id");
  const role = localStorage.getItem("role");

  // 중복 클릭 방지 (isLoding이 false면 disabled)
  const [isLoading, setIsLoading] = useState(false);

  const accuracy = localStorage.getItem("accuracy");

  const [state, setState] = useState({
    result: result,
    accuracy: accuracy,
    comment: "",
  });

  useEffect(() => {
    API.post("/guest-result", {
      guestId: guestId,
      nickname: nickname,
      role: role,
      result: state.result,
      accuracy: state.accuracy,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSend = () => {
    setIsLoading(true);
    API.post("/guest-result", {
      guestId: guestId,
      nickname: nickname,
      role: role,
      result: state.result,
      accuracy: state.accuracy,
      comment: state.comment,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          alert("전달 완료!");
          setState({ comment: "" });
        }
      })
      .catch((error) => console.log(error.res))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChangeState = (e) => {
    setState((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    if (state.comment.length < 1) {
      messageInput.current.focus();
      return;
    } else if (state.comment.length > 20) {
      alert("20자 이내로 설정해주세요!");
      setState({ comment: "" });
      return;
    } else {
      handleSend();
    }
  };

  const clear = () => {
    localStorage.clear();
  };

  const goHome = () => {
    navigate("/", { replace: true });
    clear();
  };

  return (
    <div className="GuestResult">
      <div className="answer">
        <div className="name">
          <ListName key={nameData.id} data={nameData} />의{" "}
        </div>

        <div className="mbti">
          <p className="m">M</p>
          <p className="b">B</p>
          <p className="t">T</p>
          <p className="i">I</p>
        </div>
      </div>

      <div className="answerCard">
        <div className="mbti">
          <p className="m">{mbti[0]}</p>
          <p className="b">{mbti[1]}</p>
          <p className="t">{mbti[2]}</p>
          <p className="i">{mbti[3]}</p>
        </div>
      </div>

      <div className="choose">
        <div className="c_name">
          당신이 생각한 <ListName key={nameData.id} data={nameData} />의{" "}
        </div>
        <div className="c_mbti">
          <p className="m">M</p>
          <p className="b">B</p>
          <p className="t">T</p>
          <p className="i">I</p>
        </div>
      </div>

      <div className="chooseCard">
        <div className="mbti">
          <p className="m">{result[0]}</p>
          <p className="b">{result[1]}</p>
          <p className="t">{result[2]}</p>
          <p className="i">{result[3]}</p>
        </div>
      </div>

      <div className="accauracy">
        <div className="percentage">
          <p className="zero">0%</p>
          <p className="standard">정확도</p>
          <p className="perfect">100%</p>
        </div>
        <div className="graph">
          <span className={["graphAni", `graphAni_${accuracy}`].join(" ")}>
            {accuracy + "%"}
          </span>
        </div>
      </div>
      <br />
      <div className="sendMessage">
        <form className="message">
          <input
            placeholder="상대에게 남기고 싶은 한마디"
            name="comment"
            ref={messageInput}
            value={state.comment}
            onChange={handleChangeState}
          />
        </form>

        <div className="send">
          <button
            className="sendBtn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            send
          </button>
        </div>
      </div>

      <div className="button-wrapper">
        <div className="text">
          <div>나도하기</div>
        </div>

        <div className="icons">
          <div>
            <MdOutlineReplay className="Home" onClick={goHome} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestResult;
