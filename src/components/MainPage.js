/* module 불러오기 */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate("");

  // 메인페이지 기능(연습 or 게임) 구현하기 (백엔드 연동 후)
  // 버튼 클릭 후 연습 or 게임 페이지로 이동함 -> 백엔드 연동 후 개발 완료
  // ...

  // 로그아웃 버튼 클릭 시, LoginPage로 이동
  // 아래 함수 추후 구현 예정 (백엔드 연동 후)
  const handleLogout = () => {
    // 여기에 로그아웃 관련 처리 구현하기 ex) 토큰 삭제
    // ...
    navigate("/login"); // LoginPage로 이동
  };

  // 마이페이지 버튼을 클릭했을 때 마이페이지로 이동
  const handleMyPage = () => {
    navigate("/mypage"); // MyPage로 이동
  };

  // 연습하기 버튼을 클릭했을 때 SelectPage로 이동
  const handlePractice = () => {
    navigate("/select"); // SelectPage로 이동
  };

  /* UI 구성 */
  return (
    <div className="mainpage">
      {/* 드럼 메인 아이콘 & 메인 타이틀 */}
      <div className="main_icon">
        <img
          src={require("../images/drum_icon.png")}
          alt="Main_drum"
          className="main_icon"
        />
      </div>
      <h1 className="mainpage_title">야 너두 드럼 칠 수 있어!</h1>

      {/* 메인페이지 버튼 전체 묶음 폼 */}
      <div className="main_button_form">
        <button className="main_practice_button" onClick={handlePractice}>
          연습하기
        </button>
        <button className="main_game_button">게임하기</button>
      </div>
      {/* 메인페이지 링크(URL) 전체 묶음 폼 */}
      <div className="mainpage_link_form">
        <p className="mypage_link" onClick={handleMyPage}>
          마이페이지
        </p>
        <p className="logout_link" onClick={handleLogout}>
          로그아웃
        </p>
      </div>
    </div>
  );
};

export default MainPage;