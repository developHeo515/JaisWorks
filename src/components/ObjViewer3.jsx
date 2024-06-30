// 현재 백엔드와 데이터 통신 작업하는 곳 (mp4 작업 공간)
// 임시 mp4 작업 공간

import React, { useState, useEffect } from "react";
import axios from "axios";

function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    // 백엔드에서 비디오 파일 가져오기
    axios
      .get("http://54.180.245.26/get_video/1/left_arm_3D.mp4/", {
        responseType: "blob", // 중요: 응답을 blob으로 받습니다
      })
      .then((response) => {
        // Blob URL 생성
        const url = URL.createObjectURL(new Blob([response.data]));
        setVideoUrl(url);
      })
      .catch((error) => console.error("Error fetching video:", error));
  }, []);

  return (
    <div>
      {videoUrl && (
        <video width="640" height="360" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

export default VideoPlayer;
