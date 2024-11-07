// src/components/musicbook/prettymusicbook.js
// prettymusicbook.js | 2024.10.30 '연습하기' 페이지에 "예뻤어" 악보 기능 임시 추가
// /practice 페이지를 구성하는 PracticePage.js가 호출하여 사용하는 코드 (악보 기능 추가해줌)
import React, { useEffect, useState } from "react";
import pretty_Image1 from "../musicbook/DAY6_pretty_1.png"; // 첫 번째 악보 이미지 가져오기
import pretty_Image2 from "../musicbook/DAY6_pretty_2.png"; // 두 번째 악보 이미지 가져오기
import pretty_Image3 from "../musicbook/DAY6_pretty_3.png"; // 세 번째 악보 이미지 가져오기
import pretty_Image4 from "../musicbook/DAY6_pretty_4.png"; // 네 번째 악보 이미지 가져오기
import pretty_Image5 from "../musicbook/DAY6_pretty_5.png"; // 다섯 번째 악보 이미지 가져오기
import pretty_Image6 from "../musicbook/DAY6_pretty_6.png"; // 여섯 번째 악보 이미지 가져오기
import pretty_Image7 from "../musicbook/DAY6_pretty_7.png"; // 일곱 번째 악보 이미지 가져오기
import pretty_Image8 from "../musicbook/DAY6_pretty_8.png"; // 여덟 번째 악보 이미지 가져오기
import pretty_Image9 from "../musicbook/DAY6_pretty_9.png"; // 아홉 번째 악보 이미지 가져오기

// 나머지 악보 이미지 제작 후 추가하기
// ...
// ...
import "./prettymusicbook.css";

const PrettyMusicBook = () => {
  // 현재 보여지는 악보 이미지를 관리
  const [currentScoreImage, setCurrentScoreImage] = useState(pretty_Image1);
  // 현재 강조된 마디를 관리
  const [highlightedMeasure, setHighlightedMeasure] = useState(null);

  // 첫 번째 useEffect: 악보 이미지를 변경하는 로직
  useEffect(() => {
    // 음악 재생 타이밍에 맞춰 악보 이미지 변경
    const changeScoreImage = () => {
      setTimeout(() => setCurrentScoreImage(pretty_Image2), 12000); // 12초 후 두 번째 악보로 변경
      setTimeout(() => setCurrentScoreImage(pretty_Image3), 23000); // 11초 후 세 번째 악보로 변경
      setTimeout(() => setCurrentScoreImage(pretty_Image4), 34000);
      setTimeout(() => setCurrentScoreImage(pretty_Image5), 46000);
      setTimeout(() => setCurrentScoreImage(pretty_Image6), 56000);
      setTimeout(() => setCurrentScoreImage(pretty_Image7), 67500);
      setTimeout(() => setCurrentScoreImage(pretty_Image8), 79000);
      setTimeout(() => setCurrentScoreImage(pretty_Image9), 91000);
    };

    // 악보 이미지 변경 함수 호출
    changeScoreImage();
  }, []); // 빈 배열 -> 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // 두 번째 useEffect: 특정 시간에 맞춰 마디를 강조하는 로직
  useEffect(() => {
    // 마디 별로 연주 시간을 설정하고 강조
    const highlightTiming = [
      // page1
      { time: 0, measure: 1 },
      { time: 3000, measure: 2 },
      { time: 6000, measure: 3 },
      { time: 9000, measure: 4 },
      // page2
      { time: 12050, measure: 5 },
      { time: 15000, measure: 6 },
      { time: 17200, measure: 7 },
      { time: 20100, measure: 8 },
      // page3
      { time: 23000, measure: 9 },
      { time: 26000, measure: 10 },
      { time: 29000, measure: 11 },
      { time: 32000, measure: 12 },
      // page4
      { time: 34000, measure: 13 },
      { time: 37000, measure: 14 },
      { time: 40000, measure: 15 },
      { time: 43000, measure: 16 },
      // page5
      { time: 46000, measure: 17 },
      { time: 48000, measure: 18 },
      { time: 51000, measure: 19 },
      { time: 54000, measure: 20 },
      // page6
      { time: 56000, measure: 21 },
      { time: 59000, measure: 22 },
      { time: 62000, measure: 23 },
      { time: 65000, measure: 24 },
      // page7
      { time: 68000, measure: 25 },
      { time: 71000, measure: 26 },
      { time: 74000, measure: 27 },
      { time: 77000, measure: 28 },
      // page8
      { time: 79000, measure: 29 },
      { time: 82000, measure: 30 },
      { time: 85000, measure: 31 },
      { time: 88000, measure: 32 },
      // page9
      { time: 91000, measure: 33 },
      { time: 94000, measure: 34 },
      { time: 97000, measure: 35 },
      { time: 100000, measure: 36 },
    ];

    // 각 타이밍에 맞춰 마디를 강조하기 위한 타이머 설정
    const timers = highlightTiming.map(({ time, measure }) =>
      setTimeout(() => setHighlightedMeasure(measure), time)
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
        {highlightedMeasure && (
          <div className={`red_box measure-${highlightedMeasure}`}></div>
        )}
      </div>
    </div>
  );
};

export default PrettyMusicBook;
