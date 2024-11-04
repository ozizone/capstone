// src/components/musicbook/onepagemusicbook.js
// onepagemusicbook.js | 2024.10.30 '연습하기' 페이지에 "한페이지가될수있게" 악보 기능 추가
// /practice 페이지를 구성하는 PracticePage.js가 호출하여 사용하는 코드 (악보 기능 추가해줌)
import React, { useEffect, useState } from "react";
import onepage_Image1 from "../musicbook/DAY6_onepage_1.png"; // 첫 번째 악보 이미지 가져오기
import onepage_Image2 from "../musicbook/DAY6_onepage_2.png"; // 두 번째 악보 이미지 가져오기
import onepage_Image3 from "../musicbook/DAY6_onepage_3.png"; // 세 번째 악보 이미지 가져오기
import onepage_Image4 from "../musicbook/DAY6_onepage_4.png"; // 네 번째 악보 이미지 가져오기
import onepage_Image5 from "../musicbook/DAY6_onepage_5.png"; // 다섯 번째 악보 이미지 가져오기
import onepage_Image6 from "../musicbook/DAY6_onepage_6.png"; // 여섯 번째 악보 이미지 가져오기
import onepage_Image7 from "../musicbook/DAY6_onepage_7.png"; // 일곱 번째 악보 이미지 가져오기
import onepage_Image8 from "../musicbook/DAY6_onepage_8.png"; // 여덟 번째 악보 이미지 가져오기
import onepage_Image9 from "../musicbook/DAY6_onepage_9.png"; // 아홉 번째 악보 이미지 가져오기
import onepage_Image10 from "../musicbook/DAY6_onepage_10.png"; // 열 번째 악보 이미지 가져오기
import onepage_Image11 from "../musicbook/DAY6_onepage_11.png";
import onepage_Image12 from "../musicbook/DAY6_onepage_12.png";
import onepage_Image13 from "../musicbook/DAY6_onepage_13.png";
import onepage_Image14 from "../musicbook/DAY6_onepage_14.png";
import onepage_Image15 from "../musicbook/DAY6_onepage_15.png";
import onepage_Image16 from "../musicbook/DAY6_onepage_16.png";
import onepage_Image17 from "../musicbook/DAY6_onepage_17.png";
import "./onepagemusicbook.css";

const OnePageMusicBook = () => {
  // 현재 보여지는 악보 이미지를 관리
  const [currentScoreImage, setCurrentScoreImage] = useState(onepage_Image1);
  // 현재 강조된 마디를 관리
  //const [highlightedMeasure, setHighlightedMeasure] = useState(null);
  const [highlightedMeasure2, setHighlightedMeasure2] = useState(null);

  // 첫 번째 useEffect: 악보 이미지를 변경하는 로직
  useEffect(() => {
    // 음악 재생 타이밍에 맞춰 악보 이미지 변경
    const changeScoreImage = () => {
      setTimeout(() => setCurrentScoreImage(onepage_Image2), 5500); // 5.5초 후 두 번째 악보로 변경
      setTimeout(() => setCurrentScoreImage(onepage_Image3), 10700); // 11초 후 세 번째 악보로 변경
      setTimeout(() => setCurrentScoreImage(onepage_Image4), 16500);
      setTimeout(() => setCurrentScoreImage(onepage_Image5), 21900); // (가사 시작)
      setTimeout(() => setCurrentScoreImage(onepage_Image6), 27400);
      setTimeout(() => setCurrentScoreImage(onepage_Image7), 32900);
      setTimeout(() => setCurrentScoreImage(onepage_Image8), 38500);
      setTimeout(() => setCurrentScoreImage(onepage_Image9), 43900);
      setTimeout(() => setCurrentScoreImage(onepage_Image10), 49500);
      setTimeout(() => setCurrentScoreImage(onepage_Image11), 54500); // (3마디부터 후렴구 시작)
      setTimeout(() => setCurrentScoreImage(onepage_Image12), 60710);
      setTimeout(() => setCurrentScoreImage(onepage_Image13), 66000);
      setTimeout(() => setCurrentScoreImage(onepage_Image14), 71200);
      setTimeout(() => setCurrentScoreImage(onepage_Image15), 77000);
      setTimeout(() => setCurrentScoreImage(onepage_Image16), 82000);
      setTimeout(() => setCurrentScoreImage(onepage_Image17), 88000);
    };

    // 악보 이미지 변경 함수 호출
    changeScoreImage();
  }, []); // 빈 배열 -> 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // 두 번째 useEffect: 특정 시간에 맞춰 마디를 강조하는 로직
  useEffect(() => {
    // 마디 별로 연주 시간을 설정하고 강조
    const highlightTiming = [
      // page1
      { time: 0, measure2: 1 }, // 수정한 부분: measure 대신 measure2 사용
      { time: 1500, measure2: 2 },
      { time: 2800, measure2: 3 },
      { time: 4100, measure2: 4 },
      // page2
      { time: 5500, measure2: 5 },
      { time: 6700, measure2: 6 },
      { time: 8300, measure2: 7 },
      { time: 9600, measure2: 8 },
      // page3
      { time: 10700, measure2: 9 },
      { time: 12500, measure2: 10 },
      { time: 13930, measure2: 11 },
      { time: 15200, measure2: 12 },
      // page4
      { time: 16500, measure2: 13 },
      { time: 18070, measure2: 14 },
      { time: 19130, measure2: 15 },
      { time: 20530, measure2: 16 },

      // page5 (가사시작...솔직히~)
      { time: 21900, measure2: 17 },
      { time: 23300, measure2: 18 },
      { time: 24970, measure2: 19 },
      { time: 26420, measure2: 20 },

      // page6
      { time: 27580, measure2: 21 },
      { time: 28980, measure2: 22 },
      { time: 30350, measure2: 23 },
      { time: 31810, measure2: 24 },

      // page7
      { time: 33140, measure2: 25 },
      { time: 34540, measure2: 26 },
      { time: 35870, measure2: 27 },
      { time: 37210, measure2: 28 },

      // page8 (오늘을 위해~ 2마디)
      { time: 38600, measure2: 29 },
      { time: 39750, measure2: 30 },
      { time: 41150, measure2: 31 },
      { time: 42570, measure2: 32 },

      // page9 (All~)
      { time: 44000, measure2: 33 },
      { time: 45510, measure2: 34 },
      { time: 46980, measure2: 35 },
      { time: 48250, measure2: 36 },

      // page10
      { time: 49500, measure2: 37 },
      { time: 51110, measure2: 38 },
      { time: 52520, measure2: 39 },
      { time: 53810, measure2: 40 },

      // page11
      { time: 54500, measure2: 41 },
      { time: 56610, measure2: 42 },
      { time: 57940, measure2: 43 },
      { time: 59320, measure2: 44 },

      // page12
      { time: 60710, measure2: 45 },
      { time: 62070, measure2: 46 },
      { time: 63400, measure2: 47 },
      { time: 64800, measure2: 48 },

      // page13
      { time: 66000, measure2: 49 },
      { time: 67480, measure2: 50 },
      { time: 68900, measure2: 51 },
      { time: 70250, measure2: 52 },

      // page14
      { time: 71200, measure2: 53 },
      { time: 73050, measure2: 54 },
      { time: 74350, measure2: 55 },
      { time: 75760, measure2: 56 },

      // page15
      { time: 76900, measure2: 57 },
      { time: 78450, measure2: 58 },
      { time: 79850, measure2: 59 },
      { time: 81240, measure2: 60 },

      // page16
      { time: 82000, measure2: 61 },
      { time: 83900, measure2: 62 },
      { time: 85300, measure2: 63 },
      { time: 86690, measure2: 64 },

      // page17 (마지막)
      { time: 88000, measure2: 65 },
      { time: 89520, measure2: 66 },
      { time: 90880, measure2: 67 },
      { time: 92310, measure2: 68 },
    ];

    // 각 타이밍에 맞춰 마디를 강조하기 위한 타이머 설정
    const timers = highlightTiming.map(({ time, measure2 }) =>
      setTimeout(() => setHighlightedMeasure2(measure2), time)
    );

    // 컴포넌트가 언마운트될 때 타이머를 정리해주는 부분 -> 모든 타이머 기능 해제
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="musicbook">
      <div className="imagebox_field">
        {/* 현재 악보 이미지 & redbox 나타내는 부분 */}
        <img
          src={currentScoreImage}
          alt="Score Sheet"
          className="sheet_image"
        />
        {highlightedMeasure2 && (
          <div className={`red_box measure2-${highlightedMeasure2}`}></div>
        )}
      </div>
    </div>
  );
};

export default OnePageMusicBook;
