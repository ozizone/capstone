/* module 호출 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 서버로부터 받은 결과로 응답(로그인 가능 여부) 처리
    socket.on("loginResponse", (message) => {
      setResponseMessage(message);
      if (message === "로그인 성공!") {
        alert(message);
        navigate("/main");
      } else {
        alert(message);
      }
    });

    // 컴포넌트 언마운트 시 이벤트 제거 (= 다른 페이지로 이동할 때)
    return () => {
      socket.off("loginResponse");
    };
  }, [navigate]);

  /* 로그인 요청 처리 함수 */
  const handleLogin = (e) => {
    e.preventDefault();

    // WebSocket을 통하여 로그인 요청
    socket.emit("login", { username, password });
  };

  /* UI 구성 */
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>로그인 페이지</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="아이디 입력창"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 입력창"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">로그인</button>
        </form>
        <button onClick={() => navigate("/signin")}>회원가입</button>
        <button onClick={() => navigate("/leave")}>탈퇴하기</button>
        {responseMessage && <p>{responseMessage}</p>}{" "}
        {/* 응답 메시지를 화면에 출력 */}
      </div>
    </div>
  );
};

export default LoginPage;
