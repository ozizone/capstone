// src/components/Practice/PracticePage.js
/* module 불러오기 */
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PracticePage.css";
/* 순서대로 "DAY6-예뻤어.mp3", "DAY6-한 페이지가 될 수 있게.mp3" 악보를 나타내는 코드파일 호출 */
import PrettyMusicBook from "../musicbook/prettymusicbook";
import OnePageMusicBook from "../musicbook/onepagemusicbook";
import GoBackSelectButton from "./goback_selectbutton";

const PracticePage = () => {
  // 현재 페이지(/practice)에 위치 정보와 탐색 기능 추가
  const location = useLocation();
  const navigate = useNavigate();
  // 선택된 노래 정보를 location 객체에서 가져오는 부분
  const selectedSong = location.state?.song;

  // 페이지가 렌더링(여기로 이동되었을 때) 되었을 때 실행되는 부분 (음악 재생)
  useEffect(() => {
    // 직접 URL을 입력해서 선택된 음악데이터 없이 /practice 페이지로 온다면, 자동으로 /select 페이지로 이동됨
    if (!selectedSong) {
      navigate("/select");
      return;
    }

    // 오디오 객체 생성 및 설정 (미리듣기 재생)
    const newAudio = new Audio(selectedSong.preview);

    // 오디오 재생 기능 함수
    const playAudio = async () => {
      try {
        await newAudio.play();
      } catch (error) {
        console.error("오디오 재생 중 error 발생:", error);
      }
    };

    // 함수 호출 후 재생
    playAudio();

    // 컴포넌트가 사라짐 = 다른 페이지로 이동하는 등의 새로운 상태여서 재 렌더링 될 때
    //  -> 오디오 stop & 처음부터 다시 시작
    return () => {
      newAudio.pause();
      newAudio.currentTime = 0; // 오디오 정지 후 처음부터 다시 시작
    };
  }, [selectedSong, navigate]);

  // 선택된 노래가 없으면 페이지 자체를 렌더링X (이동X) -> 빈 화면 문제 방지
  if (!selectedSong) {
    return null;
  }

  // '돌아가기' 버튼 클릭 시 선택된 노래 정보 초기화 & 돌아감
  const resetSelection = () => {
    navigate("/select", { replace: true });
  };

  return (
    <div className="practicepage">
      {/* 앨범 커버 이미지 */}
      <div className="album_cover">
        <img src={selectedSong.cover} alt="Album Cover" />
        {/* 해당 곡 제목 */}
        <h2>{selectedSong.title}</h2>
      </div>

      {/* 악보 표시 - 해당 코드를 호출하여 보여줌 (아무것도 선택X = 렌더링X이니 null) */}
      <div className="music_book">
        {(() => {
          if (selectedSong.title === "예뻤어 - DAY6") {
            return <PrettyMusicBook />;
          } else if (selectedSong.title === "한페이지가될수있게 - DAY6") {
            return <OnePageMusicBook />;
          } else {
            return null;
          }
        })()}
      </div>
      <GoBackSelectButton onResetSelection={resetSelection} />
    </div>
  );
};

export default PracticePage;
