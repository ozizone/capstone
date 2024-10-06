import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MainPage from "./components/MainPage";
import SelectPage from "./components/SelectPage";
import MyPage from "./components/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
