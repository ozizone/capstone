/* module 호출 */
const bcrypt = require("bcryptjs");
const db = require("../lib/db");

/* module 내용 구성 & 내보내기 */
module.exports = (socket) => {
  // "login" 이벤트 발생 시 해당 콜백함수 실행
  // -> 웹에서 입력한 username, password 데이터 전달 시 비동기적으로 실행됨
  socket.on("login", async ({ username, password }) => {
    try {
      // db.promise().query()를 통해 db에 해당 데이터(id, password)가 존재하는지 확인
      const [user] = await db
        .promise()
        .query("SELECT * FROM users WHERE username = ?", [username]);

      // existingUser 배열의 길이(length)가 0 -> 가입되지 않은 id
      if (user.length === 0) {
        socket.emit("loginResponse", "아이디가 존재하지 않습니다.");
        return;
      }

      // 클라이언트에서 입력한 password와 db 내의 bcrypt로 암호화된 password 비교
      const isMatch = await bcrypt.compare(password, user[0].password);

      // 서로 일치하지 않는 경우
      if (!isMatch) {
        socket.emit("loginResponse", "비밀번호가 일치하지 않습니다.");
        return;
      }
      socket.emit("loginResponse", "로그인 성공!");
    } catch (error) {
      // 로그인 시도 중 에러 발생 시, 클라이언트에 에러 메시지 출력
      console.error("로그인 중 오류 발생:", error);
      socket.emit("loginResponse", "서버 오류가 발생했습니다.");
    }
  });
};
