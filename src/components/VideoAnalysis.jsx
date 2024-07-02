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
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./VideoAnalysis.css";

function VideoAnalysis() {
  const [videoUrl, setVideoUrl] = useState("");
  const [objData, setObjData] = useState([]);

  const [pose2D, setPose2D] = useState("");
  const [pose3d, setPose3d] = useState("");
  const [left_arm_2D, setleft_arm_2D] = useState("");
  const [left_arm_3D, setleft_arm_3D] = useState("");
  const [right_arm_2D, setright_arm_2D] = useState("");
  const [right_arm_3D, setright_arm_3D] = useState("");

  const [left_leg_2D, setleft_leg_2D] = useState("");
  const [left_leg_3D, setleft_leg_3D] = useState("");
  const [right_leg_2D, setright_leg_2D] = useState("");
  const [right_leg_3D, setright_leg_3D] = useState("");

  // 영상 분석 api 호출
  const getApi = async () => {
    try {
      console.log("백엔드호출중");
      const response = await axios.get(`http://54.180.245.26/get_json_data/`); // 여러분이 사용하고자 하는 API 엔드포인트로 대체하세요.
      console.log(response.data[1]);

      setPose2D(response.data[1].pose2D);
      setPose3d(response.data[1].pose3D_270);
      setleft_arm_2D(response.data[1].left_arm_2D);
      setleft_arm_3D(response.data[1].left_arm_3D);
      setright_arm_2D(response.data[1].right_arm_2D);
      setright_arm_3D(response.data[1].right_arm_3D);

      setleft_leg_2D(response.data[1].left_leg_2D);
      setleft_leg_3D(response.data[1].left_leg_3D);
      setright_leg_2D(response.data[1].right_leg_2D);
      setright_leg_3D(response.data[1].right_leg_3D);
      console.log("백엔드호출완");
      // videoUrl을 사용하여 비디오 재생 또는 다운로드
      //   fetch("http://54.180.245.26/get_video/1/left_arm_3D.mp4/")
      //     .then((response) => response.blob())
      //     .then((blob) => {
      //       const url = URL.createObjectURL(blob);
      //       console.log(url);
      //       setVideoUrl(url);
      //     });
    } catch (error) {
      console.log("백엔드호출실패");
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  //동영상 동시 재생
  const videoRefs = useRef([]);
  // 모든 비디오를 동시에 재생하는 함수
  const playAllVideos = () => {
    console.log("동영상 동시 재생");
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play();
      }
    });
  };

  // 모든 비디오를 동시에 정지하는 함수
  const pauseAllVideos = () => {
    console.log("동영상 동시 정지");
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
  };

  // 모든 비디오의 시간을 초기화하는 함수
  const resetAllVideos = () => {
    console.log("동영상 동시 초기화");
    videoRefs.current.forEach((video) => {
      if (video) {
        video.currentTime = 0;
      }
    });
  };

  return (
    <>
      <div className="VideoAnalysis">
        {/* <video className="videoDiv" controls>
          <source src={InputVideo} type="video/mp4" />
        </video>
        <video className="videoDiv" controls>
          <source src={InputVideo} type="video/mp4" />
        </video> */}
        <div className="InputAndViewer">
          {/* <ObjViewer3 /> */}
          {pose2D && (
            <video controls ref={(el) => (videoRefs.current[0] = el)}>
              <source src={pose2D} type="video/mp4" />
            </video>
          )}
          {pose3d && (
            <video controls ref={(el) => (videoRefs.current[1] = el)}>
              <source src={pose3d} type="video/mp4" />
            </video>
          )}

          {/* <ObjViewer width="50%" height="100%" /> */}
        </div>

        <div className="AnalysisResult">
          {left_arm_2D && (
            <video controls ref={(el) => (videoRefs.current[2] = el)}>
              <source src={left_arm_2D} type="video/mp4" />
            </video>
          )}
          {left_arm_3D && (
            <video controls ref={(el) => (videoRefs.current[3] = el)}>
              <source src={left_arm_3D} type="video/mp4" />
            </video>
          )}
          {right_arm_2D && (
            <video controls ref={(el) => (videoRefs.current[4] = el)}>
              <source src={right_arm_2D} type="video/mp4" />
            </video>
          )}
          {right_arm_3D && (
            <video controls ref={(el) => (videoRefs.current[5] = el)}>
              <source src={right_arm_3D} type="video/mp4" />
            </video>
          )}
          {left_leg_2D && (
            <video controls ref={(el) => (videoRefs.current[6] = el)}>
              <source src={left_leg_2D} type="video/mp4" />
            </video>
          )}
          {left_leg_3D && (
            <video controls ref={(el) => (videoRefs.current[7] = el)}>
              <source src={left_leg_3D} type="video/mp4" />
            </video>
          )}
          {right_leg_2D && (
            <video controls ref={(el) => (videoRefs.current[8] = el)}>
              <source src={right_leg_2D} type="video/mp4" />
            </video>
          )}
          {right_leg_3D && (
            <video controls ref={(el) => (videoRefs.current[9] = el)}>
              <source src={right_leg_3D} type="video/mp4" />
            </video>
          )}
        </div>
        {/* <button onClick={getApi}>api 호출</button> */}
        <button onClick={playAllVideos}>동시 재생</button>
        <button onClick={pauseAllVideos}>동시 정지</button>
        <button onClick={resetAllVideos}>영상 시간 초기화</button>

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
