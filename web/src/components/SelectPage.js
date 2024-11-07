// SelectPage.js | 2024.10.30 음악 선택 페이지에서 (/select -> /practice) 음악 데이터 정보 전달 기능 추가
/* module 불러오기 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectPage.css";
/* 노래 & 앨범커버 불러오기 */
import noSongCover from "../images/no_song_cover.png";
import prettyCover from "../images/DAY6-예뻤어_cover.png";
import onepageCover from "../images/DAY6-한 페이지가 될 수 있게_cover.png";
import smartphonePreview from "../music/DAY6-예뻤어.mp3";
import hateRodrigoPreview from "../music/DAY6-한 페이지가 될 수 있게.mp3";
import songPlayerIcon from "../images/song_player.png";

const SelectPage = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [audio, setAudio] = useState(null);
  const navigate = useNavigate();

  // 미리듣기 시작시간 설정 (노래마다 다름, 초 단위 설정)
  const highlightTimes = {
    pretty_highlight: 46.5,
    onepage_highlight: 57.0,
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
    setSelectedSong(song);
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
    navigate("/main"); // 메인 페이지(/main)로 이동
  };

  // /practice 페이지로 이동
  const handleStartPractice = () => {
    if (selectedSong) {
      navigate("/practice", { state: { song: selectedSong } }); // 선택한 음악 데이터 전달
    }
  };

  /* UI 구성 */
  return (
    <div className="selectpage">
      <div className="album_cover">
        {selectedSong ? (
          <div className="selected_song">
            <img src={selectedSong.cover} alt="Album Cover" />
            <h2>{selectedSong.title}</h2>
            <button
              className="practice_start_button"
              onClick={handleStartPractice}
            >
              시작하기
            </button>
          </div>
        ) : (
          <div className="no_song_select">
            <img src={noSongCover} alt="No Song Cover" />
          </div>
        )}
      </div>

      <div className="playlist">
        <h3>PLAYLIST</h3>
        <button
          type="button"
          className="listed_song"
          onClick={() =>
            handleSongClick(
              {
                title: "예뻤어 - DAY6",
                cover: prettyCover,
                preview: smartphonePreview,
              },
              highlightTimes.pretty_highlight
            )
          }
        >
          예뻤어 - DAY6
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
                title: "한페이지가될수있게 - DAY6",
                cover: onepageCover,
                preview: hateRodrigoPreview,
              },
              highlightTimes.onepage_highlight
            )
          }
        >
          한페이지가될수있게 - DAY6
          <img
            src={songPlayerIcon}
            alt="Play Icon"
            className="song_player_icon"
          />
        </button>
      </div>

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
