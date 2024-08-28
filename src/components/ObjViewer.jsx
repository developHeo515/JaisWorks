// Obj 파일 뷰어 완성

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
// import { OrbitControls, GridHelper, AxesHelper } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import "./ObjViewer.css";
import axios from "axios";

// function Model({ url }) {
function Model({ url }) {
  // console.log("?????", url);
  const obj = useLoader(OBJLoader, url);
  // console.log("실험중", obj);
  const ref = useRef();

  //중심축 이동 코드
  useEffect(() => {
    if (obj) {
      // console.log(obj);
      const box = new THREE.Box3().setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      obj.position.sub(center); // Center the model

      // 원하는 위치로 모델 이동 (예: x: 5, y: 0, z: 3)
      obj.position.add(new THREE.Vector3(0, 0, 0));
      // obj.rotation.y = Math.PI;

      // Iterate through the children of the object
      obj.traverse((child) => {
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
  }, [obj]);

  return <primitive ref={ref} object={obj} scale={3} />;
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

export default function ObjViewer(props) {
  const ex = props.ex;
  // console.log(ex);ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ,,mmmmmmmm
  const [index, setIndex] = useState(0);
  const [objData, setObjData] = useState([]);
  const [loadedObjs, setLoadedObjs] = useState([]);
  const [arr, setArr] = useState([]);

  // 영상 분석 api 호출
  const getApi = async () => {
    try {
      // console.log("백엔드호출중");

      const response = await axios.get(
        `https://golfposeserver.store/get_json_data/`
      );
      // const response = await axios.get(`http://54.180.245.26/get_json_data/`);
      // 여러분이 사용하고자 하는 API 엔드포인트로 대체하세요.

      console.log(response.data[ex]);
      // console.log(response.data[ex].objs);
      // console.log(response.data[ex].objs.length);

      // const UrlObj = response.data[ex].objs;
      setObjData(response.data[ex].objs);
      // console.log("백엔드호출완");
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
      }, 100); // 0.2초마다 모델을 변경합니다.
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
        <Model url={objData[index]} />
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
