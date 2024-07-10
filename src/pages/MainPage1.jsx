// import FileUpload from "../components/FileUpload.jsx";

import Menubar from "../components/Menubar.jsx";
import VideoAnalysis from "../components/VideoAnalysis.jsx";
import Chatbot from "../components/Chatbot.jsx";
import "./MainPage1.css";
import ObjViewer from "../components/ObjViewer.jsx";
import MeshViewer from "../components/MeshViewer.jsx";
import ObjViewer3 from "../components/ObjViewer3.jsx";

function MainPage1() {
  return (
    <>
      <div className="MainPage1">
        <Menubar />
        <VideoAnalysis />
        <ObjViewer />

        {/* <Chatbot /> */}
      </div>
    </>
  );
}

export default MainPage1;
