/* module 호출 */
import React, { useEffect, useState } from "react";
//import { io } from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // 페이지 사이 이동 기능(Navigate) 사용
/* page 호출 */
import LoginPage from "./components/LoginPage";
import SigninPage from "./components/SigninPage";
import MainPage from "./components/MainPage";
import LeavePage from "./components/LeavePage";
import socket from "./socket"; // WebSocket 연결

/* 웹소켓을 통해 서버와 연결 설정 */
//const socket = io("http://localhost:3001");

function App() {
  // setLoggedInUser = 상태 변경 함수 (로그인된 유저 정보 업데이트)
  // eslint-disable-next-line
  const [loggedInUser, setLoggedInUser] = useState(null);
  // const [setLoggedInUser] = useState(null);

  useEffect(() => {
    // 서버로부터 로그인 성공 알림 수신
    socket.on("user_logged_in", (data) => {
      console.log(`${data.username}님이 로그인했습니다.`);
      setLoggedInUser(data.username);
    });

    return () => {
      socket.off("user_logged_in");
    };
  }, [setLoggedInUser]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/leave" element={<LeavePage />} />
        {/* 기본 경로로 접근 시 로그인 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
