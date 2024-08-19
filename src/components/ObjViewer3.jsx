// Obj 파일 뷰어 끊김 현상 해결중 - 잠시 홀딩중 24.8.9(금) ~

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
// import { OrbitControls, GridHelper, AxesHelper } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import "./ObjViewer.css";
import axios from "axios";

let cnt = 0;
var qwer = [];

// function Model({ url }) {
function Model({ url, length }) {
  // const [qwer, setQwer] = useState([]);

  // if (typeof url == "undefined") {
  //   console.log(url, "++++");
  // } else {
  //   console.log(url, "--ㅠㅠ--");
  // }

  // for (let i = 0; i < obj.length; i++) {
  //   // console.log(obj[i]);
  //   // console.log(useLoader(OBJLoader, obj[i]));
  //   // const obj2 = useLoader(OBJLoader, obj[i]);
  //   // console.log(i, "실험중22", obj2);
  //   setQwer((qwer) => [...qwer, useLoader(OBJLoader, obj[i])]);
  //   // console.log(arr);
  // }

  // console.log("?????", url);

  // console.log(obj);

  // 배열 크기 할당이 받아온 obj 객체 크기랑 같아지면 0으로 리셋해줘야함
  if (cnt == length) {
    cnt = 0;
  }

  if (typeof qwer[cnt] == "undefined") {
    console.log("연산드가자~", qwer[cnt]);
    const obj = useLoader(OBJLoader, url);
    // console.log(qwer[cnt], length, "언딥파인드", cnt);
    qwer[cnt] = obj;
    console.log(cnt, qwer[cnt]);
    const box = new THREE.Box3().setFromObject(qwer[cnt]);
    const center = box.getCenter(new THREE.Vector3());
    qwer[cnt].position.sub(center); // Center the model
  }

  // setQwer((qwer) => [...qwer, obj]);
  // console.log("실험중", obj);
  const ref = useRef();

  //중심축 이동 코드
  useEffect(() => {
    if (qwer[cnt]) {
      // console.log(qwer[cnt]);
      const box = new THREE.Box3().setFromObject(qwer[cnt]);
      const center = box.getCenter(new THREE.Vector3());
      qwer[cnt].position.sub(center); // Center the model

      // 원하는 위치로 모델 이동 (예: x: 5, y: 0, z: 3)
      qwer[cnt].position.add(new THREE.Vector3(0, 0, 0));
      //  qwer[cnt].rotation.y = Math.PI;

      // Iterate through the children of the object
      qwer[cnt].traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Ensure geometry is BufferGeometry
          let bufferGeometry = child.geometry;
          if (bufferGeometry.type !== "BufferGeometry") {
            bufferGeometry = new THREE.BufferGeometry().fromGeometry(
              bufferGeometry
            );
          }

          // Update material to highlight the triangular facets
          const material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(0xffffff), // Tomato color
            // metalness: 0.7,
            roughness: 0.2,
            reflectivity: 0.5,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            side: THREE.DoubleSide,
            flatShading: true, // Use flat shading to emphasize the triangular facets
          });

          child.geometry = bufferGeometry;
          child.material = material;
        }
      });
    }
  }, [qwer[cnt]]);
  // console.log(cnt, qwer[cnt], "++++", qwer.length);
  return <primitive ref={ref} object={qwer[cnt++]} scale={3} />;
}

export default function ObjViewer3(props) {
  const ex = props.ex;
  // console.log(ex);ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ,,mmmmmmmm
  const [index, setIndex] = useState(0);
  const [objData, setObjData] = useState([]);
  const [loadedObjs, setLoadedObjs] = useState([]);
  const [arr, setArr] = useState([]);
  // var objData = [];

  // 영상 분석 api 호출
  const getApi = async () => {
    try {
      // console.log("백엔드호출중");

      const response = await axios.get(
        `https://golfposeserver.store/get_json_data/`
      );
      // const response = await axios.get(`http://54.180.245.26/get_json_data/`);
      // 여러분이 사용하고자 하는 API 엔드포인트로 대체하세요.

      // console.log(response.data);
      // console.log(response.data[ex].objs);
      // console.log(response.data[ex].objs.length);

      // for (let i = 0; i < response.data[ex].objs.length; i++) {
      //   // console.log(i);
      //   // console.log(response.data[ex].objs[i]);
      //   // arr[i] = response.data[ex].objs[i];
      //   // arr[i] = useLoader(OBJLoader, response.data[ex].objs[i]);
      //   console.log(useLoader(OBJLoader, response.data[ex].objs[i]));
      // }

      // const UrlObj = response.data[ex].objs;
      setObjData(response.data[ex].objs);
      // for (let i = 0; i < response.data[ex].objs.length; i++) {
      //   console.log(i, "+", useLoader(OBJLoader, response.data[ex].objs[i]));
      //   // console.log(i);
      // }
    } catch (error) {
      console.log("백엔드호출실패 ObjViewer.jsx");
      // console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    if (objData.length) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % objData.length;
          // console.log(newIndex);
          return newIndex;
        });
      }, 1000); // 0.1초마다 모델을 변경합니다.
      return () => clearInterval(interval);
    }
  }, [objData.length]);

  return (
    <div className="ObjViewer">
      <p>3D 아바타를 클릭 후 움직여 보세요</p>
      {/*  style={{ width: "20%", height: "50vh" }} */}
      <Canvas className="Canvas">
        {/* 주변 조명으로, 장면 전체를 고르게 비춥니다. */}
        <ambientLight intensity={0.5} />
        {/* 스포트라이트 조명 */}
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        {/* 점 조명으로, 특정 지점에서 모든 방향으로 빛을 방출 */}
        {/* <pointLight position={[-10, -10, -10]} /> */}
        <directionalLight
          castShadow
          position={[10, 10, 10]}
          intensity={1.0}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          castShadow
          position={[-10, -10, -10]}
          intensity={0.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <OrbitControls
        //   camera={cameraRef.current}
        // makeDefault={true}
        // enableZoom={false}
        />
        {/* x, y, z축을 그려줌 */}
        {/* <axesHelper args={[10, 10, 10]} /> */}
        <AxesHelper size={5} />
        <GridHelper size={10} divisions={10} />
        <AxisLabels />
        {/* 여기서 Obj 파일 받아서 시각화 시켜줌 */}
        {/* <Model url={objData[index]} /> */}
        {objData.length == 0 ? null : (
          <Model url={objData[index]} length={objData.length} />
        )}
        <mesh
          receiveShadow
          position={[0, -3, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {/* <planeBufferGeometry attach="geometry" args={[500, 500]} /> */}
          <shadowMaterial attach="material" opacity={0.5} />
        </mesh>
      </Canvas>
    </div>
  );
}

function AxesHelper({ size }) {
  const { scene } = useThree();
  useEffect(() => {
    const axesHelper = new THREE.AxesHelper(size);
    scene.add(axesHelper);
    return () => {
      scene.remove(axesHelper);
    };
  }, [scene, size]);
  return null;
}

function GridHelper({ size, divisions }) {
  const { scene } = useThree();
  useEffect(() => {
    const gridHelperXY = new THREE.GridHelper(size, divisions);
    gridHelperXY.rotation.x = Math.PI / 2;
    gridHelperXY.position.set(0, 0, -5); // 원하는 위치로 변경
    scene.add(gridHelperXY);

    const gridHelperXZ = new THREE.GridHelper(size, divisions);
    gridHelperXZ.position.set(0, -5, 0); // 원하는 위치로 변경
    scene.add(gridHelperXZ);

    const gridHelperYZ = new THREE.GridHelper(size, divisions);
    gridHelperYZ.rotation.z = Math.PI / 2;
    gridHelperYZ.position.set(-5, 0, 0); // 원하는 위치로 변경
    scene.add(gridHelperYZ);

    // const gridHelperXY2 = new THREE.GridHelper(size, divisions);
    // gridHelperXY2.rotation.x = Math.PI / 2;
    // gridHelperXY2.position.set(0, 0, 5); // 원하는 위치로 변경
    // scene.add(gridHelperXY2);

    // const gridHelperYZ2 = new THREE.GridHelper(size, divisions);
    // gridHelperYZ2.rotation.z = Math.PI / 2;
    // gridHelperYZ2.position.set(5, 0, 0); // 원하는 위치로 변경
    // scene.add(gridHelperYZ2);

    return () => {
      scene.remove(gridHelperXY);
      scene.remove(gridHelperXZ);
      scene.remove(gridHelperYZ);
    };
  }, [scene, size, divisions]);
  return null;
}

function AxisLabels() {
  return (
    <>
      <Text position={[5, 0, 0]} fontSize={0.5} color="red">
        X
      </Text>
      <Text position={[0, 5, 0]} fontSize={0.5} color="green">
        Y
      </Text>
      <Text position={[0, 0, 5]} fontSize={0.5} color="blue">
        Z
      </Text>
    </>
  );
}

// const objUrls = [
//   "/obj/mesh90.obj",
//   "/obj/mesh0.obj",
//   "/obj/mesh1.obj",
//   "/obj/mesh2.obj",
//   "/obj/mesh3.obj",
//   "/obj/mesh4.obj",
//   "/obj/mesh5.obj",
//   "/obj/mesh6.obj",
//   "/obj/mesh7.obj",
//   "/obj/mesh8.obj",
//   "/obj/mesh9.obj",
//   "/obj/mesh10.obj",
//   "/obj/mesh11.obj",
//   "/obj/mesh12.obj",
//   "/obj/mesh13.obj",
//   "/obj/mesh14.obj",
//   "/obj/mesh15.obj",
//   "/obj/mesh16.obj",
//   "/obj/mesh17.obj",
//   "/obj/mesh18.obj",
//   "/obj/mesh19.obj",
//   "/obj/mesh20.obj",
//   "/obj/mesh21.obj",
//   "/obj/mesh22.obj",
//   "/obj/mesh23.obj",
//   "/obj/mesh24.obj",
//   "/obj/mesh25.obj",
//   "/obj/mesh26.obj",
//   "/obj/mesh27.obj",
//   "/obj/mesh28.obj",
//   "/obj/mesh29.obj",
//   "/obj/mesh30.obj",
//   "/obj/mesh31.obj",
//   "/obj/mesh32.obj",
//   "/obj/mesh33.obj",
//   "/obj/mesh34.obj",
//   "/obj/mesh35.obj",
//   "/obj/mesh36.obj",
//   "/obj/mesh37.obj",
//   "/obj/mesh38.obj",
//   "/obj/mesh39.obj",
//   "/obj/mesh40.obj",
//   "/obj/mesh41.obj",
//   "/obj/mesh42.obj",
//   "/obj/mesh43.obj",
//   "/obj/mesh44.obj",
//   "/obj/mesh45.obj",
//   "/obj/mesh46.obj",
//   "/obj/mesh47.obj",
//   "/obj/mesh48.obj",
//   "/obj/mesh49.obj",
//   "/obj/mesh50.obj",
//   "/obj/mesh51.obj",
//   "/obj/mesh52.obj",
//   "/obj/mesh53.obj",
//   "/obj/mesh54.obj",
//   "/obj/mesh55.obj",
//   "/obj/mesh56.obj",
//   "/obj/mesh57.obj",
//   "/obj/mesh58.obj",
//   "/obj/mesh59.obj",
//   "/obj/mesh60.obj",
//   "/obj/mesh61.obj",
//   "/obj/mesh62.obj",
//   "/obj/mesh63.obj",
//   "/obj/mesh64.obj",
//   "/obj/mesh65.obj",
//   "/obj/mesh66.obj",
//   "/obj/mesh67.obj",
//   "/obj/mesh68.obj",
//   "/obj/mesh69.obj",
//   "/obj/mesh70.obj",
//   "/obj/mesh71.obj",
//   "/obj/mesh72.obj",
//   "/obj/mesh73.obj",
//   "/obj/mesh74.obj",
//   "/obj/mesh75.obj",
//   "/obj/mesh76.obj",
//   "/obj/mesh77.obj",
//   "/obj/mesh78.obj",
//   "/obj/mesh79.obj",
//   "/obj/mesh80.obj",
//   "/obj/mesh81.obj",
//   "/obj/mesh82.obj",
//   "/obj/mesh83.obj",
//   "/obj/mesh84.obj",
//   "/obj/mesh85.obj",
//   "/obj/mesh86.obj",
//   "/obj/mesh87.obj",
//   "/obj/mesh88.obj",
//   "/obj/mesh89.obj",
//   "/obj/mesh90.obj",
// ];
