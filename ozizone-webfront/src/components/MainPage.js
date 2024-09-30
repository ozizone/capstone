/* module 호출 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 서버로부터 연결 확인 메시지 수신
    socket.on("message", (msg) => {
      console.log("서버 메시지:", msg);
    });

    // 컴포넌트 언마운트 시 이벤트 제거 (= 다른 페이지로 이동할 때)
    return () => {
      socket.off("message");
    };
  }, []);

  /* 로그아웃 요청 처리 함수 */
  const handleLogout = () => {
    // WebSocket을 통하여 서버에 로그아웃 요청
    socket.emit("logout");

    console.log("로그아웃");
    navigate("/login");
  };

  /* UI 구성 */
  return (
    <div className="main-container">
      <div className="main-content">
        <h1>로그인 성공!</h1>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
};

export default MainPage;
