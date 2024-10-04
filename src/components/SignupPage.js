/* module 불러오기 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate("");

  // 백엔드 연동 후 가입 기능 추가하기
  // ...

  const handleSubmit = (e) => {
    e.preventDefault();
    // 세부 가입 조건 구현하기
    // 이미 존재하는 아이디, 빈 칸으로 하면 가입 안되게, 이미 존재하는 닉네임...
    // ...
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호 확인 부분이 틀립니다.");
    } else {
      setErrorMessage("");
      alert("가입 성공");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // LoginPage로 이동
  };

  /* UI 구성 */
  return (
    <div className="signuppage">
      <h1 className="signuppage_title">회원가입</h1>
      <form className="signup_form" onSubmit={handleSubmit}>
        {/* 회원가입 페이지 폼 윗라인 묶음 (id, nickname) */}
        <div className="width_array">
          {/* 아이디 라벨 & input창 */}
          <div className="signup_id">
            <label htmlFor="username" className="signup_label">
              아이디
            </label>
            <input
              type="text"
              id="username"
              className="signup_input"
              required
            />
          </div>
          {/* 닉네임 라벨 & input창 */}
          <div className="signup_name">
            <label htmlFor="nickname" className="signup_label">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              className="signup_input"
              required
            />
          </div>
        </div>
        {/* 회원가입 페이지 폼 아래 라인 묶음 (password, repassword) */}
        <div className="width_array">
          {/* 비밀번호 텍스트(라벨) & input창 */}
          <div className="signup_password">
            <label htmlFor="password" className="signup_label">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="signup_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* 비밀번호 확인 텍스트(라벨) & input창 */}
          <div className="signup_repassword">
            <label htmlFor="repassword" className="signup_label">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="repassword"
              className="signup_input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {/* 회원가입 오류 에러 메시지 */}
        {errorMessage && <p className="signup_error">{errorMessage}</p>}
        {/* 버튼 모음 */}
        <div className="button_form">
          {/* 회원가입 시도 버튼 */}
          <button type="submit" className="signup_button">
            가입하기
          </button>
          {/* 로그인 페이지로 돌아가기 버튼 */}
          <button
            type="button"
            className="back_loginpage_button"
            onClick={handleLoginRedirect}
          >
            로그인 화면으로
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
