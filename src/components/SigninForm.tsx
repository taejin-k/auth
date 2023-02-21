import { KeyboardEvent, useState } from "react";
import styled from "styled-components";
import dog from "../assets/img/dog.png";
import cat from "../assets/img/cat.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { MONTHS_OPTIONS, YEAR_OPTIONS } from "../constants/dateConstants";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { message } from "antd";
import { setReduxUserDataBase } from "../redux/userDataBaseSlice";
import useGlobalModal from "../hooks/useGlobalModal";

const EMAIL_REGEXP = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
const PASSWORD_REGEXP =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
const PHONE_REGEXP = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;

const SigninForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState(YEAR_OPTIONS[0]);
  const [month, setMonth] = useState(MONTHS_OPTIONS[11]);
  const [companionAnimal, setCompanionAnimal] = useState("강아지");
  const userDataBase = useAppSelector((state: RootState) => state.userDataBase);
  const { closeGlobalModal } = useGlobalModal();

  const handleSubmitClick = () => {
    if (!email) {
      message.info("이메일을 입력해주세요");
      return;
    }

    if (!EMAIL_REGEXP.test(email)) {
      message.info("올바른 이메일 형식이 아닙니다");
      return;
    }

    if (userDataBase.some((item) => item.email === email)) {
      message.info("이미 존재하는 이메일입니다");
      return;
    }

    if (!password) {
      message.info("비밀번호를 입력해주세요");
      return;
    }

    if (!PASSWORD_REGEXP.test(password)) {
      message.info("비밀번호는 영문/숫자/특수문자 혼합 8~20자로 입력해주세요");
      return;
    }

    if (!passwordConfirm) {
      message.info("비밀번호 재확인을 입력해주세요");
      return;
    }

    if (password !== passwordConfirm) {
      message.info("비밀번호 재확인이 비밀번호와 일치하지 않습니다");
      return;
    }

    if (!phone) {
      message.info("휴대폰 번호를 입력해주세요");
      return;
    }

    if (!PHONE_REGEXP.test(phone)) {
      message.info("올바른 휴대폰 번호 형식이 아닙니다");
      return;
    }

    dispatch(
      setReduxUserDataBase({
        email: email,
        password: password,
        phone: phone,
        name: name,
        birth_date: String(year) + month,
        companion_animal: companionAnimal,
      })
    );

    closeGlobalModal();
    message.success("회원가입이 완료됐습니다. 로그인을 진행해주세요");
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSubmitClick();
  };

  return (
    <SigninFormStyle>
      <div className="modalContent">
        <div className="inputBox email">
          <p>이메일</p>
          <div className="inputWrap">
            <input
              type="email"
              value={email}
              placeholder="welcome@pet-friends.co.kr"
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={handleEnterPress}
            />
          </div>
        </div>
        <div className="inputBox password">
          <p>비밀번호</p>
          <div className="inputWrap">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              placeholder="영문/숫자/특수만자 혼합 8~20자"
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={handleEnterPress}
            />
            <div
              className="img"
              onClick={() => setPasswordVisible((state) => !state)}
            >
              {passwordVisible ? (
                <EyeOutlined style={{ fontSize: 20 }} />
              ) : (
                <EyeInvisibleOutlined style={{ fontSize: 20 }} />
              )}
            </div>
          </div>
        </div>
        <div className="inputBox passwordConfirm">
          <p>비밀번호 재확인</p>
          <div className="inputWrap">
            <input
              type={passwordConfirmVisible ? "text" : "password"}
              value={passwordConfirm}
              placeholder="비밀번호를 한번 더 입력해주세요"
              onChange={(event) => setPasswordConfirm(event.target.value)}
              onKeyDown={handleEnterPress}
            />
            <div
              className="img"
              onClick={() => setPasswordConfirmVisible((state) => !state)}
            >
              {passwordConfirmVisible ? (
                <EyeOutlined style={{ fontSize: 20 }} />
              ) : (
                <EyeInvisibleOutlined style={{ fontSize: 20 }} />
              )}
            </div>
          </div>
        </div>
        <div className="inputBox phone">
          <p>휴대전화</p>
          <div className="inputWrap">
            <input
              type="tel"
              value={phone}
              placeholder="전화번호 입력"
              onChange={(event) =>
                setPhone(
                  event.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1")
                )
              }
              onKeyDown={handleEnterPress}
            />
          </div>
        </div>
        <div className="inputBox name">
          <p>이름</p>
          <div className="inputWrap">
            <input
              type="text"
              value={name}
              placeholder="이름 입력"
              onChange={(event) => setName(event.target.value)}
              onKeyDown={handleEnterPress}
            />
          </div>
        </div>
        <div className="inputBox birthDate">
          <p>연도/월</p>
          <div className="inputWrap">
            <select
              placeholder="연도"
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}
            >
              {YEAR_OPTIONS.map((item) => (
                <option>{item}</option>
              ))}
            </select>
            <select
              className="월"
              value={month}
              onChange={(event) => setMonth(event.target.value)}
            >
              {MONTHS_OPTIONS.map((item) => (
                <option>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="inputBox companion_animal">
          <p>반려동물 선택</p>
          <div className="inputWrap companionAnimal">
            <div
              onClick={() => setCompanionAnimal("dog")}
              className={`${"dog" === companionAnimal}`}
            >
              <div>
                <img src={dog} alt="강아지" />
                <p>강아지</p>
              </div>
            </div>
            <div
              onClick={() => setCompanionAnimal("cat")}
              className={`${"고양이" === companionAnimal}`}
            >
              <div>
                <img src={cat} alt="고양이" />
                <p>고양이</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modalButton">
        <button
          type="button"
          onClick={handleSubmitClick}
          disabled={
            !email || !password || !passwordConfirm || !phone || !year || !month
          }
        >
          회원가입
        </button>
      </div>
    </SigninFormStyle>
  );
};

export default SigninForm;

const SigninFormStyle = styled.div`
  padding: 16px;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  .modalContent {
    margin-bottom: 24px;

    .inputBox {
      margin-bottom: 16px;

      &:last-of-type {
        margin-bottom: 0;
      }

      > p {
        font-size: 10px;
        color: #9ca1aa;
        margin-bottom: 8px;
      }

      .inputWrap {
        width: 100%;
        height: 43px;
        position: relative;
        display: flex;

        &.companionAnimal {
          height: 80px;
        }

        input {
          display: block;
          width: 100%;
          height: 100%;
          padding: 0 50px 0 16px;
          font-size: 14px;
          color: #1c1e21;
          border: 1px solid #e9ebec;
          border-radius: 6px;
          font-weight: 400;

          &::placeholder {
            color: #c6c9ce;
          }

          &:focus {
            border: 1px solid #2d3035;
            transition: 0.3s;
          }
        }

        > .img {
          position: absolute;
          top: 50%;
          right: 12px;
          width: 24px;
          height: 24px;
          transform: translateY(-50%);
          cursor: pointer;
          border: none;
        }

        select {
          flex-grow: 1;
          height: 48px;
          border: 1px solid #f8f8f8;
          border-radius: 6px;
          padding: 16px;
          cursor: pointer;

          &:first-of-type {
            margin-right: 8px;
          }
        }

        > div {
          height: 80px;
          flex-grow: 1;
          border-radius: 8px;
          border: 1px solid #e9ebec;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          &.true {
            border: 1px solid #2d3035;
          }

          &:first-of-type {
            margin-right: 8px;
          }

          > div {
            img {
              width: 26px;
              display: inline-block;
              margin: 0 8px auto;
              margin-bottom: 8px;
            }

            p {
              font-size: 14px;
              font-weight: 500;
              color: #1c1e21;
            }
          }
        }
      }
    }
  }

  .modalButton {
    display: flex;

    button {
      flex-grow: 1;
      height: 43px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;

      &:first-of-type {
        border: 1px solid #e9ebec;
        background: none;
        color: #1c1e21;
      }

      &:last-of-type {
        background: #ff4081;
        color: #fff;
      }

      &:disabled {
        background: #e9ebec;
        color: #c6c9ce;
        cursor: default;
      }
    }
  }
`;