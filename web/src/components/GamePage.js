// GamePage.js

import React, { useEffect, useState } from "react";

const GamePage = () => {
  const [pressCount, setPressCount] = useState(0);

  useEffect(() => {
    // 웹소켓 서버 연결 설정
    const socket = new WebSocket("ws://localhost:3002"); // 3002 포트로 연결

    // 웹소켓이 연결되었을 때
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // 서버에서 메시지를 받을 때 실행
    socket.onmessage = (event) => {
      const count = parseInt(event.data.trim(), 10); // 받은 데이터를 숫자로 변환
      if (!isNaN(count)) {
        setPressCount(count); // 버튼 누름 횟수 업데이트
      } else {
        console.warn("Received invalid data:", event.data); // 디버그용 로그
      }
    };

    // 웹소켓 연결이 종료될 때 실행
    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      socket.close(); // 컴포넌트가 언마운트될 때 연결 종료
    };
  }, []);

  return (
    <div>
      <h1>Game Page</h1>
      <h2>Button Press Count: {pressCount}</h2> {/* 버튼 누름 횟수 표시 */}
    </div>
  );
};

export default GamePage;
