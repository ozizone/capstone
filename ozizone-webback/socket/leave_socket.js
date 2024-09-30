/* module 호출 */
const bcrypt = require("bcryptjs");
const db = require("../lib/db");

/* module 내용 구성 & 내보내기 */
module.exports = (socket) => {
  // "leave" 이벤트 발생 시 해당 콜백함수 실행
  // -> 웹에서 입력한 username, password 데이터 전달 시 비동기적으로 실행됨
  socket.on("leave", async ({ username, password }) => {
    try {
      // db.promise().query()를 통해 db에 해당 데이터(id, password)가 존재하는지 확인
      const [rows] = await db
        .promise()
        .query("SELECT * FROM users WHERE username = ?", [username]);

      // existingUser 배열의 길이(length)가 0 -> 존재하지 않는 id
      if (rows.length === 0) {
        socket.emit("leaveResponse", "아이디가 존재하지 않습니다.");
        return;
      }

      // 클라이언트에서 입력한 탈퇴할 password와 db 내의 bcrypt로 암호화된 password 비교
      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      // 서로 일치하지 않는 경우
      if (!isMatch) {
        socket.emit("leaveResponse", "비밀번호가 일치하지 않습니다.");
        return;
      }

      // 탈퇴하려는 사용자 정보(id, password)를 db 테이블에서 제거
      await db
        .promise()
        .query("DELETE FROM users WHERE username = ?", [username]);
      socket.emit("leaveResponse", "탈퇴가 완료되었습니다.");
    } catch (error) {
      // 탈퇴 시도 중 에러 발생 시, 클라이언트에 에러 메시지 출력
      console.error("탈퇴 처리 중 오류 발생:", error);
      socket.emit("leaveResponse", "서버 오류");
    }
  });
};
