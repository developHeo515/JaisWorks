import Menubar from "../components/Menubar.jsx";
import VideoAnalysis from "../components/VideoAnalysis.jsx";
import Chatbot from "../components/Chatbot.jsx";
// import "./MainPage1.css";
import ObjViewer from "../components/ObjViewer.jsx";
import MeshViewer from "../components/MeshViewer.jsx";
import ObjViewer3 from "../components/ObjViewer3.jsx";
import ObjViewer2 from "../components/ObjViewer2.jsx";
import GlbViewer from "../components/GlbViewer.jsx";
import { useLocation } from "react-router";

function Example() {
  const location = useLocation();
  const num = location.state.props;
  return (
    <>
      <div className="MainPage1">
        <Menubar />
        <VideoAnalysis ex={num} />
        <ObjViewer ex={num} />
        {/* <ObjViewer2 /> */}
        {/* <GlbViewer /> */}

        {/* <Chatbot /> */}
      </div>
    </>
  );
}

export default Example;
