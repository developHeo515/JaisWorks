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
function MainPage1() {
  return (
    <>
      <div className="MainPage1">
        <Menubar />
        <VideoAnalysis />
        {/* <ObjViewer /> */}
        {/* <ObjViewer2 /> */}
        <GlbViewer />

        {/* <Chatbot /> */}
      </div>
    </>
  );
}

export default MainPage1;
