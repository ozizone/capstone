import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Firebase 관련 모듈 추가
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase 설정 정보 (새로운 프로젝트에 맞게 업데이트)
const firebaseConfig = {
  apiKey: "AIzaSyCtt85_XGP1JZdjKBMNCjw60rv4786r1mk",
  authDomain: "capstone-8763b.firebaseapp.com",
  projectId: "capstone-8763b",
  storageBucket: "capstone-8763b.appspot.com",
  messagingSenderId: "885711584937",
  appId: "1:885711584937:web:7ddc20fc8b4d68e5e833b8",
  measurementId: "G-M0DS15D0TP"
};

// Firebase 초기화 (중복 방지)
const app = initializeApp(firebaseConfig);

// Firebase 인증 객체 생성
const auth = getAuth(app);

// Firebase 인증 객체를 다른 곳에서 사용할 수 있게 export
export { auth };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 성능 측정용 (옵션)
reportWebVitals();
