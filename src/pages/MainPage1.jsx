// import FileUpload from "../components/FileUpload.jsx";

import Menubar from "../components/Menubar.jsx";
import VideoAnalysis from "../components/VideoAnalysis.jsx";
import Chatbot from "../components/Chatbot.jsx";
import "./MainPage1.css";

function MainPage1() {
  return (
    <>
      <div className="MainPage1">
        <Menubar />
        <VideoAnalysis />
        <Chatbot />
      </div>
    </>
  );
}

export default MainPage1;
