/* module 호출 */
const express = require("express"); // express 프레임워크 호출
const http = require("http"); // HTTP 서버 제작
const { Server } = require("socket.io"); // 웹소켓 라이브러리인 socket.io 사용
const cors = require("cors"); // 미들웨어 사용 (다른 도메인의 API 접근 때 쓰임)
// const bcrypt = require("bcryptjs");
const db = require("./lib/db"); // MySQL(데이터베이스) 연동

/* 서버 포트 번호 (React는 3000) */
const port = 3001;

/* 서버 생성 */
const app = express(); // 미들웨어 추가
const server = http.createServer(app);

/* socket.io(웹소켓 라이브러리)로 실시간 통신 서버 구현 */
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React 클라이언트의 주소가 접근 가능하게 해줌
    methods: ["GET", "POST"],
    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
  },
});

/* 미들웨어 설정 */
app.use(cors());
app.use(express.json());

console.log("server start");

/* 각 기능별 웹소켓 이벤트 연동 */
io.on("connection", (socket) => {
  require("./socket/signin_socket")(socket);
  require("./socket/login_socket")(socket);
  require("./socket/leave_socket")(socket);
});

/* 최종 서버 실행 */
server.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중...`);
  db.connect((err) => {
    if (err) {
      console.error("MySQL 연결 실패:", err);
    } else {
      console.log("MySQL 연결 성공");
    }
  });
});
