/* module 불러오기 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  // 입력된 아이디와 비밀번호를 저장할 상태 변수 (백엔드 연동 시 사용...아직 X)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 관련 기능 구현하기 (백엔드와 연동 후)
  // ...

  // 로그인 성공 시 이동 관련 함수 부분 (백엔드 연동 시 수정 필요, 현재는 하드코딩을 통해 이동)
  const navigate = useNavigate("");

  // 임시 하드코딩된 로그인 정보 ...페이지 이동 기능 확인용
  // 백엔드 연동 시 삭제
  const hardcodingUsername = "test1";
  const hardcodingPassword = "test1";

  // 로그인 버튼 클릭 시
  const handleLogin = () => {
    // 아이디와 비밀번호가 일치하면 MainPage 페이지로 이동
    if (username === hardcodingUsername && password === hardcodingPassword) {
      navigate("/main");
    } else {
      // 일치하지 않는 경우엔 경고 메시지 출력
      alert("아이디 or 비밀번호가 일치하지 않습니다.");
    }
  };

  /* UI 구성 */
  return (
    <div className="loginpage">
      {/* 드럼 로그인 아이콘 & 로그인 타이틀 */}
      <div className="title_icon">
        <img
          src={require("../images/drum_icon.png")}
          alt="Title_drum"
          className="title_icon"
        />
      </div>
      <h1 className="loginpage_title">야 너두 드럼 칠 수 있어!</h1>

      {/* 로그인 요소 전체 묶음 폼 */}
      <div className="login_form">
        {/* id, password 라벨 & input창 묶음 */}
        <div className="login_label_input">
          {/* id 요소 폼 */}
          <div className="input_id">
            <label htmlFor="username" className="login_label">
              아이디
            </label>
            <input
              type="text"
              id="username"
              className="input_field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* password 요소 폼 */}
          <div className="input_password">
            <label htmlFor="password" className="login_label">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="input_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {/* 로그인 시도 버튼 */}
        <button type="submit" className="login_button" onClick={handleLogin}>
          Login
        </button>
      </div>

      {/* 회원가입 하러가기 (URL 기능) */}
      <div>
        {/* 회원가입 버튼 */}
        <button
          className="go_signup_button"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
