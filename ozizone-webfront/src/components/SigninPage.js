/* module 호출 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "./SigninPage.css";

const SigninPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 서버로부터 받은 결과로 응답(가입 가능 여부) 처리
    socket.on("signupResponse", (message) => {
      setResponseMessage(message);
      if (message === "회원가입 성공!") {
        alert(message);
        navigate("/login");
      } else {
        alert(message);
      }
    });

    // 컴포넌트 언마운트 시 이벤트 제거 (= 다른 페이지로 이동할 때)
    return () => {
      socket.off("signupResponse");
    };
  }, [navigate]);

  /* 회원가입 요청 처리 함수 */
  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // WebSocket을 통하여 회원가입 요청
    socket.emit("signup", { username, password });
  };

  /* UI 구성 */
  return (
    <div className="signin-container">
      <div className="signin-form">
        <h1>회원가입</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="가입할 아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="가입할 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">가입하기</button>
        </form>
        <button type="button" onClick={() => navigate("/login")}>
          로그인 화면으로
        </button>
        {responseMessage && <p>{responseMessage}</p>} {/* 응답 메시지 표시 */}
      </div>
    </div>
  );
};

export default SigninPage;
