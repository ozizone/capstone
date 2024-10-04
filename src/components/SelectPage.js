/* module 불러오기 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectPage.css";
/* 노래 & 앨범커버 불러오기 */
import smartphoneCover from "../images/smartphone_cover.png";
import hateRodrigoCover from "../images/hate_rodrigo_cover.png";
import noSongCover from "../images/no_song_cover.png";
import smartphonePreview from "../music/SMARTPHONE - 최예나.mp3";
import hateRodrigoPreview from "../music/Hate Rodrigo - 최예나.mp3";
import songPlayerIcon from "../images/song_player.png";

const SelectPage = () => {
  const [selectedSong, SelectedSong] = useState("");
  const [audio, setAudio] = useState("");

  const navigate = useNavigate("");

  // 미리듣기 시작시간 설정 (노래마다 다름, 초 단위 설정)
  const highlightTimes = {
    smartphone: 38.5,
    hateRodrigo: 35.5,
  };

  // 노래 제목 클릭 시 -> 미리듣기 기능 작동
  const handleSongClick = (song, HighlightStartTime) => {
    // 이전에 재생 중인 미리듣기 정지
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // 처음부터 다시 재생
    }

    // mp3 재생파일 실행
    const newAudio = new Audio(song.preview);
    newAudio.currentTime = HighlightStartTime;

    setAudio(newAudio);
    newAudio.play();

    // 미리듣기(Preview) = 30초 (30초 후 정지 설정)
    setTimeout(() => {
      newAudio.pause();
    }, 30000);

    // 선택된 노래 상태 업데이트
    SelectedSong(song);
  };

  // 오디오 중지
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

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
            handleSongClick(
              {
                title: "SMARTPHONE - 최예나",
                cover: smartphoneCover,
                preview: smartphonePreview,
              },
              highlightTimes.smartphone
            )
          }
        >
          SMARTPHONE - 최예나
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
            handleSongClick(
              {
                title: "Hate Rodrigo - 최예나",
                cover: hateRodrigoCover,
                preview: hateRodrigoPreview,
              },
              highlightTimes.hateRodrigo
            )
          }
        >
          Hate Rodrigo - 최예나
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
