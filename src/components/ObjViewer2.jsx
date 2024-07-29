// Obj 파일 뷰어 완성

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
// import { OrbitControls, GridHelper, AxesHelper } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import "./ObjViewer.css";
import axios from "axios";

function Model({ url }) {
  const obj = useLoader(OBJLoader, url);
  const ref = useRef();

  useEffect(() => {
    if (obj) {
      const box = new THREE.Box3().setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      obj.position.sub(center); // Center the model

      // 원하는 위치로 모델 이동 (예: x: 5, y: 0, z: 3)
      // obj.position.add(new THREE.Vector3(0, 0, 0));
      // 모델을 오른쪽으로 90도 회전시킴
      obj.rotation.y = Math.PI / 2;

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
            color: new THREE.Color(0xffffff),
            // metalness: 0.9, // Increase metalness for a more reflective surface
            roughness: 0.1, // Decrease roughness for a smoother surface
            reflectivity: 1.0, // Increase reflectivity for more pronounced reflections
            clearcoat: 1.0, // Add a clear coat for an extra layer of reflection
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

  return <primitive ref={ref} object={obj} scale={5} />;
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

export default function ObjViewer() {
  const [index, setIndex] = useState(0);
  const [objData, setObjData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 영상 분석 api 호출
  const getApi = async () => {
    try {
      console.log("백엔드호출 ObjViewer2.jsx");
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
      console.log("백엔드호출실패 ObjViewer2.jsx");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const objUrls = [
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
    console.log("api", objData.length);
    // console.log("local", objUrls.length);

    if (objData.length) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % objData.length;
          console.log(newIndex);
          return newIndex;
        });
      }, 200); // 0.2초마다 모델을 변경합니다.
      return () => clearInterval(interval);
    }
  }, [objData.length]);

  const MemoizedModel = useMemo(() => {
    return <Model url={objData[index]} />;
  }, [objData, index]);

  return (
    <div className="ObjViewer">
      <p>3D 아바타를 클릭 후 움직여 보세요</p>
      {/*  style={{ width: "20%", height: "50vh" }} */}
      <Canvas>
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
        {/* {objData.length > 0 && <Model url={objData[index]} />} */}
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        {!loading && objData.length > 0 && MemoizedModel}
        {/* </Suspense> */}
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
