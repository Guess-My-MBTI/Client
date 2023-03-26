import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Notice = () => {
  const navigate = useNavigate();
  return (
    <div className="Notice">
      <div className="top">
        <p className="banner">이용 가이드!</p>
        <p className="space"></p>
        <p
          className="xbtn"
          onClick={() => {
            navigate(-1);
          }}
        >
          x
        </p>
      </div>
      <hr />
      <div className="noti">
        <div className="owner">
          <p className="ownertext">주인장일 때!!</p>
        </div>
        <div className="ownerwrapper">
          <p className="des">1. 우선 로그인부터 해주세요!</p>
          <div className="imgwrapper">
            <img
              src={process.env.PUBLIC_URL + `assets/owner1.png`}
              className="ownerimg"
            />
            <img
              src={process.env.PUBLIC_URL + `assets/owner2.png`}
              className="ownerimg"
            />
          </div>
        </div>
        <div className="ownerwrapper">
          <p className="des">2. MBTI 검사 하기!!</p>
          <div className="imgwrapper">
            <img
              src={process.env.PUBLIC_URL + `assets/owner3.png`}
              className="ownerimg"
            />
          </div>
        </div>
        <div className="ownerwrapper">
          <p className="des">
            3. 내 결과가 나와요!! 여기서 끝나면 재미없으니 링크를 공유해
            친구들이 나의 MBTI를 맞춰보게 해볼까요?
          </p>
          <div className="imgwrapper">
            <img
              src={process.env.PUBLIC_URL + `assets/owner4.png`}
              className="ownerimg"
            />
            <img
              src={process.env.PUBLIC_URL + `assets/owner5.png`}
              className="ownerimg"
            />
          </div>
        </div>
        <div className="ownerwrapper">
          <p className="des">
            4. 친구들이 유추한 나의 MBTI를 이렇게 볼 수 있어요!!
          </p>
          <div className="imgwrapper">
            <img
              src={process.env.PUBLIC_URL + `assets/owner6.png`}
              className="ownerimg"
            />
          </div>
        </div>
        <div className="guest">
          <hr />
          <p className="guesttext">손님일 때!!</p>
        </div>
        <div className="guestwrapper">
          <p className="des">
            1. 다들 친구들이 공유한 링크로 들어오셨나요? 그렇다면 닉네임을
            설정해 주고 start!
          </p>
          <div className="imgwrapper">
            <img
              src={process.env.PUBLIC_URL + `assets/guest1.png`}
              className="guestimg"
            />
          </div>
        </div>
        <div className="guestwrapper">
          <p className="des">
            2. 질문에 대해서 내 친구라면? 생각하고 답변을 선택해 주세요!!
          </p>
          <div className="imgwrapper">
            <img
              src={process.env.PUBLIC_URL + `assets/guest2.png`}
              className="guestimg"
            />
          </div>
        </div>
        <div className="guestwrapper">
          <p className="des">
            3. 그럼 친구의 MBTI와 내가 생각한 친구의 MBTI가 짜잔!! 꼭 하고 싶은
            한마디를 적어줘야 친구의 보관함으로 나의 결과가 이동해요!!
          </p>
          <div className="imgwrapper">
            <img
              src={process.env.PUBLIC_URL + `assets/guest3.png`}
              className="guestimg"
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="bottom">
        <p>
          모든 문의는 인스타그램{" "}
          <a href="https://instagram.com/guess_my_mbti?igshid=YmMyMTA2M2Y=">
            guess_my_mbti
          </a>
          로 부탁드립니다!
        </p>
      </div>
    </div>
  );
};

export default Notice;
