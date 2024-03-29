import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListName from "../components/ListName";
import UrlAPI from "../utils/UrlAPI";

const Question = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [answer, setAnswer] = useState([]);
  const list = data.filter((it) => parseInt(it.id) == parseInt(id));

  const nickname = localStorage.getItem("nickname");
  const [guestId, setGuestId] = useState("");

  const baseUrl = UrlAPI;
  const accessToken = localStorage.getItem("access_token");

  //localStorage에서 user name 불러오기
  const name = localStorage.getItem("name");
  // 이름이 3글자 이상이면 뒤에 두 글자만 가져옴
  const nameData = [
    { ownerName: name.length >= 3 ? name.slice(-2) : name, id: 1 },
  ];

  useEffect(() => {
    axios({
      method: "GET",
      url: `${baseUrl}question/all`,
      headers: {
        // 요청을 할 때
        Authorization: "Bearer " + accessToken,
      },
    }).then((res) => {
      setData(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (id == 20) {
      calMbti(answer);
    }
    if (answer.length < 20) {
      setId(id + 1);
    }
    if (answer.length < id) {
      setId(id - 1);
    }
  }, [answer]);

  const calMbti = (answer) => {
    const EI = answer.slice(0, 5);
    const NS = answer.slice(5, 10);
    const FT = answer.slice(10, 15);
    const PJ = answer.slice(15, 20);

    const countE = EI.filter((e) => "E" === e).length;
    const countI = EI.filter((e) => "I" === e).length;
    const countN = NS.filter((e) => "N" === e).length;
    const countS = NS.filter((e) => "S" === e).length;
    const countF = FT.filter((e) => "F" === e).length;
    const countT = FT.filter((e) => "T" === e).length;
    const countP = PJ.filter((e) => "P" === e).length;
    const countJ = PJ.filter((e) => "J" === e).length;

    const guest_mbti =
      (countE > countI ? "E" : "I") +
      (countN > countS ? "N" : "S") +
      (countF > countT ? "F" : "T") +
      (countP > countJ ? "P" : "J");

    localStorage.setItem("guest_mbti", guest_mbti);
    navigate("/guest-result", { replace: true });
  };

  const decreaseQuestion = () => {
    if (id <= 1) {
      navigate({ response: true });
    } else {
      // 뒤로 가면 선택됐던 값 삭제되도록 (다시 선택할거니까)
      answer.splice(answer.indexOf(answer.length - 1), 1);
      setAnswer([...answer]);
    }
  };

  const answerHandler = (e) => {
    if (e.target.className == "answer-card-1") {
      setAnswer(answer.concat(list.map((it) => it.answer1[0])));
    } else {
      setAnswer(answer.concat(list.map((it) => it.answer2[0])));
    }
  };

  localStorage.setItem("str_answer", answer.join(""));
  localStorage.setItem("guest_answer", JSON.stringify(answer));

  const calAcc = () => {
    const owner_answer = localStorage.getItem("owner_answer");
    const guest_answer = JSON.parse(localStorage.getItem("guest_answer"));

    let count = 0;
    for (let i = 0; i < owner_answer.length; i++) {
      if (owner_answer[i] == guest_answer[i]) {
        count += 5;
      } else {
        continue;
      }
    }
    return count;
  };

  localStorage.setItem("accuracy", calAcc());

  return (
    <div className="Question">
      <div className="ques-banner">
        <p className="Q">Q</p>
        <p className="U">U</p>
        <p className="E">E</p>
        <p className="S">S</p>
        <p className="T">T</p>
        <p className="I">I</p>
        <p className="O">O</p>
        <p className="N">N</p>
      </div>

      <div className="ques-card">
        <p className="ques-num">Q{id}.</p>
        <p className="ques-text">{list.map((it) => it.content)}</p>
      </div>

      <div className="progress">
        <div className="progress-graph">
          <span className={["proGraph", `proGraph_${id}`].join(" ")}></span>
        </div>
        <div className="progress-btn">
          <button className="prev" onClick={decreaseQuestion}>
            {" "}
            {"<"}PREV{" "}
          </button>
        </div>
      </div>
      <div className="answer">
        <div className="ans-banner">
          <div className="owner-name">
            <ListName key={nameData.id} data={nameData} />
          </div>
          <p className="e">이</p>
          <p className="r">라</p>
          <p className="m">면</p>
          <p className="ques-mark">?</p>
        </div>

        <div className="answer-card-1">
          <div
            className="answer-card-1"
            value="answer1"
            onClick={answerHandler}
          >
            <p className="ans-text-1">
              {list.map((it) => it.answer1.slice(1))}
            </p>
          </div>
        </div>

        <div className="answer-card-2">
          <div
            className="answer-card-2"
            value="answer2"
            onClick={answerHandler}
          >
            <p className="ans-text-2">
              {list.map((it) => it.answer2.slice(1))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
