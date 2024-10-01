// import "./App.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage1 from "./pages/MainPage1.jsx";
import MainPage2 from "./pages/MainPage2.jsx";
import ChatBotPage from "./pages/ChatBotPage.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage1 />} />
          {/* <Route path="/MainPage2" element={<MainPage2 />} /> */}
          <Route path="/ChatBotPage" element={<ChatBotPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
