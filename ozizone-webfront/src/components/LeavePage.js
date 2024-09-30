/* module 호출 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "./LeavePage.css";

const LeavePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 서버로부터 받은 결과로 응답(탈퇴 가능 여부) 처리
    socket.on("leaveResponse", (message) => {
      if (message === "탈퇴가 완료되었습니다.") {
        alert(message);
        navigate("/login");
      } else {
        alert(message);
      }
    });

    // 컴포넌트 언마운트 시 이벤트 제거 (= 다른 페이지로 이동할 때)
    return () => {
      socket.off("leaveResponse");
    };
  }, [navigate]);

  /* 탈퇴 요청 처리 함수 */
  const handleLeave = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    // WebSocket을 통하여 탈퇴 요청
    socket.emit("leave", { username, password });
  };

  /* UI 구성 */
  return (
    <div className="leave-container">
      <div className="leave-form">
        <h1>회원 탈퇴</h1>
        <form onSubmit={handleLeave}>
          <div>
            <label>아이디:</label>
            <input
              type="text"
              placeholder="탈퇴할 아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <input
              type="password"
              placeholder="탈퇴할 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">탈퇴하기</button>
          <button type="button" onClick={() => navigate("/login")}>
            로그인 화면으로
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeavePage;
