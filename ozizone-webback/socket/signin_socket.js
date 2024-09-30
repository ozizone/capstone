/* module 호출 */
const bcrypt = require("bcryptjs");
const db = require("../lib/db");

/* module 내용 구성 & 내보내기 */
module.exports = (socket) => {
  // "signup" 이벤트 발생 시 해당 콜백함수 실행
  // -> 웹에서 입력한 username, password 데이터 전달 시 비동기적으로 실행됨
  socket.on("signup", async ({ username, password }) => {
    try {
      // db.promise().query()를 통해 db에 해당 데이터(id, password)가 존재하는지 확인
      const [existingUser] = await db
        .promise()
        .query("SELECT * FROM users WHERE username = ?", [username]);

      // existingUser 배열의 길이(length)가 0보다 큼 -> 이미 가입된 id
      if (existingUser.length > 0) {
        socket.emit("signupResponse", "이미 존재하는 아이디입니다.");
        return;
      }

      // 가입하려는 비밀번호를 bcrypt 알고리즘을 통해 암호화 (못 알아보게 바꿈)
      const hashedPassword = await bcrypt.hash(password, 10);

      // 새로 가입된 사용자 정보(id, password)를 db 테이블에 추가
      await db
        .promise()
        .query("INSERT INTO users (username, password) VALUES (?, ?)", [
          username,
          hashedPassword,
        ]);
      socket.emit("signupResponse", "회원가입 성공!");
    } catch (error) {
      // 가입 시도 중 에러 발생 시, 클라이언트에 에러 메시지 출력
      console.error("회원가입 중 에러 발생:", error);
      socket.emit("signupResponse", "서버 에러가 발생했습니다.");
    }
  });
};
