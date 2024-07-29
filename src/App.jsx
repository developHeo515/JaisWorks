// import "./App.css";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage1 from "./pages/MainPage1.jsx";
import MainPage2 from "./pages/MainPage2.jsx";
import Login from "./pages/Login.jsx";
import Example from "./components/Example.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage1 />} />
          <Route path="/Example" element={<Example />} />
          <Route path="/MainPage2" element={<MainPage2 />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
