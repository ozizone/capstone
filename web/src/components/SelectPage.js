/* module 불러오기 */
import React, { useState } from "react"; // useEffect 제거
import { useNavigate } from "react-router-dom";
import "./SelectPage.css"; // auth import 제거

// Firebase에서 가져온 이미지 URL
const noSongCover = "https://firebasestorage.googleapis.com/v0/b/capstone-8763b.appspot.com/o/no_song_cover.png?alt=media";
const BandAid = "https://firebasestorage.googleapis.com/v0/b/capstone-8763b.appspot.com/o/BandAid.PNG?alt=media";
const FourEver = "https://firebasestorage.googleapis.com/v0/b/capstone-8763b.appspot.com/o/fourever.PNG?alt=media";
const songPlayerIcon = "https://firebasestorage.googleapis.com/v0/b/capstone-8763b.appspot.com/o/song_player.png?alt=media";

const SelectPage = () => {
  const [selectedSong, SelectedSong] = useState("");

  const navigate = useNavigate("");

  // 노래 제목 클릭 시 -> 노래 선택 기능
  const handleSongClick = (song) => {
    // 선택된 노래 상태 업데이트
    SelectedSong(song);
  };

  const handleGoToMain = () => {
    navigate("/main"); // 메인 페이지로 이동
  };

  /* UI 구성 */
  return (
    <div className="selectpage">
      {/* 앨범 커버 이미지 & 노래제목 - 가수 (세트 구성) */}
      <div className="album_cover">
        {selectedSong && (
          <div className="selected_song">
            <img src={selectedSong.cover} alt="Album Cover" />
            <h2>{selectedSong.title}</h2>
            <button className="practice_start_button">시작하기</button>
          </div>
        )}
        {!selectedSong && (
          <div className="no_song_select">
            <img src={noSongCover} alt="No Song Cover" />
          </div>
        )}
      </div>

      {/* 플레이리스트 */}
      <div className="playlist">
        <h3>PLAYLIST</h3>
        {/* 노래 선택 목록 : 현재 2곡 수록됨 */}
        <button
          type="button"
          className="listed_song"
          onClick={() =>
            handleSongClick({
              title: "fourever- Day6",
              cover: FourEver,
            })
          }
        >
          Fourever - Day6
          <img
            src={songPlayerIcon}
            alt="Play Icon"
            className="song_player_icon"
          />
        </button>

        <button
          type="button"
          className="listed_song"
          onClick={() =>
            handleSongClick({
              title: "Band Aid - Day6",
              cover: BandAid,
            })
          }
        >
          Band Aid - Day6
          <img
            src={songPlayerIcon}
            alt="Play Icon"
            className="song_player_icon"
          />
        </button>
      </div>

      {/* 메인으로 버튼 */}
      <button
        type="button"
        className="select_go_main_button"
        onClick={handleGoToMain}
      >
        메인으로
      </button>
    </div>
  );
};

export default SelectPage;
