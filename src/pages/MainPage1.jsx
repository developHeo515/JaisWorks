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
// import img from "/images/1.PNG";
// import img from "../../public/images/1.PNG";

function MainPage1() {
  const navigate = useNavigate();

  return (
    <>
      <div className="MainPage1">
        <Menubar />
        <div className="selectVideo">
          {/* <p className="numTag">1</p> */}
          <img
            className="exampleImg"
            src="/images/1.PNG"
            onClick={() => {
              navigate("/Example", { state: { props: 1 } });
            }}
          />
          {/* <p className="numTag">5</p> */}
          <img
            className="exampleImg"
            src="/images/5.PNG"
            onClick={() => {
              navigate("/Example", { state: { props: 5 } });
            }}
          />
          {/* <p className="numTag">23</p> */}
          <img
            className="exampleImg"
            src="/images/23.PNG"
            onClick={() => {
              navigate("/Example", { state: { props: 23 } });
            }}
          />
          {/* <p className="numTag">27</p> */}
          <img
            className="exampleImg"
            src="/images/27.PNG"
            onClick={() => {
              navigate("/Example", { state: { props: 27 } });
            }}
          />
          {/* <p className="numTag">35</p> */}
          <img
            className="exampleImg"
            src="/images/35.PNG"
            onClick={() => {
              navigate("/Example", { state: { props: 35 } });
            }}
          />
        </div>

        {/* <VideoAnalysis /> */}
        {/* <ObjViewer /> */}
        {/* <ObjViewer2 /> */}
        {/* <GlbViewer /> */}
        {/* <Chatbot /> */}
      </div>
    </>
  );
}

export default MainPage1;
