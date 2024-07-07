// Obj 파일 뷰어 완성

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import "./ObjViewer.css";
import axios from "axios";

function Model({ url }) {
  const obj = useLoader(OBJLoader, url);
  const ref = useRef();

  //중심축 이동 코드
  useEffect(() => {
    if (obj) {
      const box = new THREE.Box3().setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      obj.position.sub(center); // Center the model

      // obj.traverse((child) => {
      //   if (child instanceof THREE.Mesh) {
      //     child.material = new THREE.MeshStandardMaterial({
      //       color: new THREE.Color(0x0055ff), // 원하는 색상
      //       metalness: 0.5,
      //       roughness: 0.5,
      //     });
      //   }
      // });
    }
  }, [obj]);

  return <primitive ref={ref} object={obj} scale={3} />;
}

// function Axes() {
//   const axes = useRef();

//   useEffect(() => {
//     const axesHelper = new THREE.AxesHelper(5);
//     axesHelper.material = new THREE.LineBasicMaterial({
//       color: 0x000000,
//       linewidth: 2,
//     });
//     axes.current.add(axesHelper);
//   }, []);

//   return <group ref={axes} />;
// }

export default function ObjViewer() {
  const [index, setIndex] = useState(0);
  const [objData, setObjData] = useState([]);

  // 영상 분석 api 호출
  const getApi = async () => {
    try {
      // console.log("백엔드호출중");
      const response = await axios.get(
        `https://golfposeserver.store/get_json_data/`
      );
      // const response = await axios.get(`http://54.180.245.26/get_json_data/`);
      // 여러분이 사용하고자 하는 API 엔드포인트로 대체하세요.
      console.log(response.data);
      // console.log(response.data[1].objs);

      setObjData(response.data[1].objs);
      // console.log("백엔드호출완");
    } catch (error) {
      console.log("백엔드호출실패 ObjViewer.jsx");
      console.log(error);
    }
  };

  useEffect(() => {
    // getApi();
  }, []);

  const objUrls = [
    "/obj/mesh90.obj",
    "/obj/mesh0.obj",
    "/obj/mesh1.obj",
    "/obj/mesh2.obj",
    "/obj/mesh3.obj",
    "/obj/mesh4.obj",
    "/obj/mesh5.obj",
    "/obj/mesh6.obj",
    "/obj/mesh7.obj",
    "/obj/mesh8.obj",
    "/obj/mesh9.obj",
    "/obj/mesh10.obj",
    "/obj/mesh11.obj",
    "/obj/mesh12.obj",
    "/obj/mesh13.obj",
    "/obj/mesh14.obj",
    "/obj/mesh15.obj",
    "/obj/mesh16.obj",
    "/obj/mesh17.obj",
    "/obj/mesh18.obj",
    "/obj/mesh19.obj",
    "/obj/mesh20.obj",
    "/obj/mesh21.obj",
    "/obj/mesh22.obj",
    "/obj/mesh23.obj",
    "/obj/mesh24.obj",
    "/obj/mesh25.obj",
    "/obj/mesh26.obj",
    "/obj/mesh27.obj",
    "/obj/mesh28.obj",
    "/obj/mesh29.obj",
    "/obj/mesh30.obj",
    "/obj/mesh31.obj",
    "/obj/mesh32.obj",
    "/obj/mesh33.obj",
    "/obj/mesh34.obj",
    "/obj/mesh35.obj",
    "/obj/mesh36.obj",
    "/obj/mesh37.obj",
    "/obj/mesh38.obj",
    "/obj/mesh39.obj",
    "/obj/mesh40.obj",
    "/obj/mesh41.obj",
    "/obj/mesh42.obj",
    "/obj/mesh43.obj",
    "/obj/mesh44.obj",
    "/obj/mesh45.obj",
    "/obj/mesh46.obj",
    "/obj/mesh47.obj",
    "/obj/mesh48.obj",
    "/obj/mesh49.obj",
    "/obj/mesh50.obj",
    "/obj/mesh51.obj",
    "/obj/mesh52.obj",
    "/obj/mesh53.obj",
    "/obj/mesh54.obj",
    "/obj/mesh55.obj",
    "/obj/mesh56.obj",
    "/obj/mesh57.obj",
    "/obj/mesh58.obj",
    "/obj/mesh59.obj",
    "/obj/mesh60.obj",
    "/obj/mesh61.obj",
    "/obj/mesh62.obj",
    "/obj/mesh63.obj",
    "/obj/mesh64.obj",
    "/obj/mesh65.obj",
    "/obj/mesh66.obj",
    "/obj/mesh67.obj",
    "/obj/mesh68.obj",
    "/obj/mesh69.obj",
    "/obj/mesh70.obj",
    "/obj/mesh71.obj",
    "/obj/mesh72.obj",
    "/obj/mesh73.obj",
    "/obj/mesh74.obj",
    "/obj/mesh75.obj",
    "/obj/mesh76.obj",
    "/obj/mesh77.obj",
    "/obj/mesh78.obj",
    "/obj/mesh79.obj",
    "/obj/mesh80.obj",
    "/obj/mesh81.obj",
    "/obj/mesh82.obj",
    "/obj/mesh83.obj",
    "/obj/mesh84.obj",
    "/obj/mesh85.obj",
    "/obj/mesh86.obj",
    "/obj/mesh87.obj",
    "/obj/mesh88.obj",
    "/obj/mesh89.obj",
    "/obj/mesh90.obj",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % objUrls.length);
      //   console.log(index);
    }, 200); // 0.2초마다 모델을 변경합니다.
    return () => clearInterval(interval);
  }, [objUrls.length]);

  return (
    <div className="ObjViewer">
      <p>3D 아바타를 클릭 후 움직여 보세요</p>
      {/*  style={{ width: "20%", height: "50vh" }} */}
      <Canvas>
        {/* 주변 조명으로, 장면 전체를 고르게 비춥니다. */}
        <ambientLight intensity={0.5} />
        {/* 스포트라이트 조명 */}
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        {/* 점 조명으로, 특정 지점에서 모든 방향으로 빛을 방출 */}
        {/* <pointLight position={[-10, -10, -10]} /> */}
        <OrbitControls
          //   camera={cameraRef.current}
          makeDefault={true}
          // enableZoom={false}
        />
        {/* <axesHelper args={[10, 10, 10]} /> */}
        {/* <Axes /> */}
        {/* 여기서 Obj 파일 받아서 시각화 시켜줌 */}
        <Model url={objUrls[index]} />
      </Canvas>
    </div>
  );
}
