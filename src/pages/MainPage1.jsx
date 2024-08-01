// import FileUpload from "../components/FileUpload.jsx";

import Menubar from "../components/Menubar.jsx";
import VideoAnalysis from "../components/VideoAnalysis.jsx";
import Chatbot from "../components/Chatbot.jsx";
import "./MainPage1.css";
import ObjViewer from "../components/ObjViewer.jsx";
import MeshViewer from "../components/MeshViewer.jsx";
import ObjViewer3 from "../components/ObjViewer3.jsx";
import ObjViewer2 from "../components/ObjViewer2.jsx";
import GlbViewer from "../components/GlbViewer.jsx";
import Example from "../components/Example.jsx";
import { useNavigate } from "react-router";
import React, { useState } from "react";
// import img from "/images/1.PNG";
// import img from "../../public/images/1.PNG";

function MainPage1() {
  const navigate = useNavigate();
  const [videoState, setVideoState] = useState(false);
  const [num, setNum] = useState(0);

  const videoSelect = (n) => {
    setNum(n);
    // console.log(num);
    setVideoState(true);
  };

  return (
    <>
      {!videoState ? (
        <div className="MainPage1">
          <Menubar />
          <div className="selectVideo">
            {/* <p className="numTag">1</p> */}
            <img
              className="exampleImg"
              src="/images/1.PNG"
              onClick={() => videoSelect(1)}
            />
            {/* <p className="numTag">5</p> */}
            <img
              className="exampleImg"
              src="/images/5.PNG"
              onClick={() => videoSelect(2)}
            />
            {/* <p className="numTag">23</p> */}
            <img
              className="exampleImg"
              src="/images/23.PNG"
              onClick={() => videoSelect(3)}
            />
            {/* <p className="numTag">27</p> */}
            <img
              className="exampleImg"
              src="/images/27.PNG"
              onClick={() => videoSelect(4)}
            />
            {/* <p className="numTag">35</p> */}
            <img
              className="exampleImg"
              src="/images/35.PNG"
              onClick={() => videoSelect(5)}
            />
          </div>
        </div>
      ) : (
        <div className="MainPage1">
          <Menubar />
          {console.log(num)}
          <VideoAnalysis ex={num} />
          <ObjViewer ex={num} />
        </div>
      )}
    </>
  );
}

export default MainPage1;
