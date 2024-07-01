import movie from "/videos/movie.mp4";
import mv1 from "../assets/video/1.2D_angle_animation_label_leftleg.mp4";
import mv2 from "../assets/video/2.2D_angle_animation_label_rightleg.mp4";
import mv3 from "../assets/video/3.2D_angle_animation_label_leftarm.mp4";
import mv4 from "../assets/video/4.2D_angle_animation_label_rightarm.mp4";
import mv5 from "../assets/video/5.3D_angle_animation_label_leftleg.mp4";
import mv6 from "../assets/video/6.3D_angle_animation_label_rightleg.mp4";
import mv7 from "../assets/video/7.3D_angle_animation_label_leftarm.mp4";
import mv8 from "../assets/video/8.3D_angle_animation_label_rightarm.mp4";
import InputVideo from "../assets/video/2D.mp4";
import ObjViewer from "../components/ObjViewer.jsx";
import ObjViewer2 from "../components/ObjViewer2.jsx";
import ObjViewer3 from "../components/ObjViewer3.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VideoAnalysis.css";

function VideoAnalysis() {
  const [videoUrl, setVideoUrl] = useState("");
  const [objData, setObjData] = useState([]);

  const mp4file = async () => {
    try {
      console.log("백엔드호출중");

      // // axios 버전
      //   const response = await axios.get(
      //     `http://54.180.245.26/get_video/1/left_arm_3D.mp4/`
      //   ); // 여러분이 사용하고자 하는 API 엔드포인트로 대체하세요.

      // videoUrl을 사용하여 비디오 재생 또는 다운로드
      //   fetch("http://54.180.245.26/get_video/1/left_arm_3D.mp4/")
      //     .then((response) => response.blob())
      //     .then((blob) => {
      //       const url = URL.createObjectURL(blob);
      //       console.log(url);
      //       setVideoUrl(url);
      //     });

      const response = fetch(
        "http://54.180.245.26/get_file/1/objs/mesh90.obj"
      ).then((res) => console.log(res));

      //   console.log("백엔드호출완");
    } catch (error) {
      console.log("백엔드호출실패");
      console.log(error);
    }
  };

  return (
    <>
      {/* <button onClick={mp4file}>api 호출</button> */}

      <div className="VideoAnalysis">
        {/* <video className="videoDiv" controls>
          <source src={InputVideo} type="video/mp4" />
        </video>
        <video className="videoDiv" controls>
          <source src={InputVideo} type="video/mp4" />
        </video> */}
        <div className="InputAndViewer">
          <video controls>
            <source src={InputVideo} type="video/mp4" />
          </video>

          <ObjViewer width="50%" height="100%" />
        </div>

        <div className="AnalysisResult">
          <video controls>
            <source src={mv1} type="video/mp4" />
          </video>
          <video controls>
            <source src={mv2} type="video/mp4" />
          </video>
          <video controls>
            <source src={mv3} type="video/mp4" />
          </video>
          <video controls>
            <source src={mv4} type="video/mp4" />
          </video>
          <video controls>
            <source src={mv5} type="video/mp4" />
          </video>
          <video controls>
            <source src={mv6} type="video/mp4" />
          </video>
          <video controls>
            <source src={mv7} type="video/mp4" />
          </video>
          <video controls>
            <source src={mv8} type="video/mp4" />
          </video>
        </div>

        {/* obj 파일 추출 */}
        {/* <ObjViewer2
          urls={["http://54.180.245.26/get_file/1/objs/mesh90.obj"]}
        /> */}
        {/* <ObjViewer2 urls={objUrls} /> */}
        {/* <ObjViewer3 urls={objUrls} /> */}

        {/* {console.log("실험", videoUrl)} */}
        {/* {videoUrl && (
        <video width="640" height="360" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )} */}
      </div>
    </>
  );
}

export default VideoAnalysis;
