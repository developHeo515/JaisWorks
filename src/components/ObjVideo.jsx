// ObjVideo.jsx

import React from "react";
import "./ObjVideo.css"; // 필요한 스타일이 있다면 이 파일에서 정의하세요.

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
// import { OrbitControls, GridHelper, AxesHelper } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import "./ObjViewer.css";
import axios from "axios";

export default function ObjVideo(props) {
  const ex = props.ex;
  // 영상 파일 경로를 번호에 맞춰 지정합니다.
  // const videoSrc = `/videos/${ex}_animation.mp4`;
  const videoSrc = `/videos/abc2.mp4`;
  // const videoSrc = `/videos/movie.mp4`;
  //   console.log(videoSrc);

  return (
    <>
      <div className="video-container">
        {videoSrc && (
          <video controls autoPlay className="video-player">
            <source src={videoSrc} type="video/mp4" />
            당신의 브라우저는 비디오 태그를 지원하지 않습니다.
          </video>
        )}
      </div>
    </>
  );
}
