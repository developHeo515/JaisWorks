import "./Menubar.css";
import { Link, useNavigate } from "react-router-dom";

function Menubar({ setVideoState }) {
  const history = useNavigate();

  const videoAnalysis = () => {
    // localStorage.clear();
    // "영상 분석" 버튼을 클릭했을 때 videoState를 false로 설정
    setVideoState(false);
    history("/");
  };
  const chatBotPage = () => {
    history("/ChatBotPage");
  };

  return (
    <>
      <div className="Menubar">
        <Link
          to="http://www.jaisworks.com/"
          // target="_blank"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h2>JaisWorks</h2>
        </Link>

        <Link
          to="http://www.jaisworks.com/"
          // target="_blank"
          style={{ textDecoration: "none", color: "black" }}
        >
          <li>Home</li>
        </Link>

        <li onClick={videoAnalysis}>영상 분석</li>
        <li onClick={chatBotPage}>챗봇 솔루션</li>
      </div>
    </>
  );
}

export default Menubar;
