// Obj 파일 뷰어 완성

import { useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Text, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";
import "./ObjViewer.css";

function Model({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center); // Center the model
      scene.position.add(new THREE.Vector3(0, 0, 0)); // Move to desired position

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          let bufferGeometry = child.geometry;
          if (bufferGeometry.type !== "BufferGeometry") {
            bufferGeometry = new THREE.BufferGeometry().fromGeometry(
              bufferGeometry
            );
          }

          const material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(0xffffff),
            roughness: 0.1,
            reflectivity: 1.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            side: THREE.DoubleSide,
            flatShading: true,
          });

          child.geometry = bufferGeometry;
          child.material = material;
        }
      });
    }
  }, [scene]);

  return <primitive ref={ref} object={scene} scale={5} castShadow />;
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
    gridHelperXY.position.set(0, 0, -5);
    scene.add(gridHelperXY);

    const gridHelperXZ = new THREE.GridHelper(size, divisions);
    gridHelperXZ.position.set(0, -5, 0);
    scene.add(gridHelperXZ);

    const gridHelperYZ = new THREE.GridHelper(size, divisions);
    gridHelperYZ.rotation.z = Math.PI / 2;
    gridHelperYZ.position.set(-5, 0, 0);
    scene.add(gridHelperYZ);

    const gridHelperXY2 = new THREE.GridHelper(size, divisions);
    gridHelperXY2.rotation.x = Math.PI / 2;
    gridHelperXY2.position.set(0, 0, 5);
    scene.add(gridHelperXY2);

    const gridHelperYZ2 = new THREE.GridHelper(size, divisions);
    gridHelperYZ2.rotation.z = Math.PI / 2;
    gridHelperYZ2.position.set(5, 0, 0);
    scene.add(gridHelperYZ2);

    return () => {
      scene.remove(gridHelperXY);
      scene.remove(gridHelperXZ);
      scene.remove(gridHelperYZ);
      scene.remove(gridHelperXY2);
      scene.remove(gridHelperYZ2);
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

export default function GlbViewer() {
  const [index, setIndex] = useState(0);
  const [objData, setObjData] = useState([]);

  // 영상 분석 api 호출
  const getApi = async () => {
    try {
      console.log("백엔드호출 GlbViewer.jsx");
      const response = await axios.get(
        `https://golfposeserver.store/get_json_data/`
      );
      // const response = await axios.get(`http://54.180.245.26/get_json_data/`);
      // 여러분이 사용하고자 하는 API 엔드포인트로 대체하세요.
      console.log(response.data);
      // console.log(response.data[1].glbs);

      setObjData(response.data[1].glbs);
      //   console.log("백엔드호출완 GlbViewer.jsx");
    } catch (error) {
      console.log("백엔드호출실패 GlbViewer.jsx");
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    // console.log("api", objData.length);
    // console.log("local", objUrls.length);

    if (objData.length) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % objData.length;
          // console.log(newIndex);
          return newIndex;
        });
      }, 200); // 0.02초마다 모델을 변경합니다.
      return () => clearInterval(interval);
    }
  }, [objData.length]);

  return (
    <div className="ObjViewer">
      <p>3D 아바타를 클릭 후 움직여 보세요</p>
      {/*  style={{ width: "20%", height: "50vh" }} */}
      <Canvas shadows>
        <ambientLight intensity={0.5} />
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
        <OrbitControls />
        <AxesHelper size={5} />
        <GridHelper size={10} divisions={10} />
        <AxisLabels />
        {objData.length > 0 && <Model url={objData[index]} />}
        {/* <Model url={objData[index]} /> */}
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
