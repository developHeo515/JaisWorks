// Obj 백엔드와 연동
// 작업공간

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function Model({ url }) {
  const obj = useLoader(OBJLoader, url);
  const ref = useRef();
  //   console.log(url);
  //   console.log(obj);

  //중심축 이동 코드
  useEffect(() => {
    if (obj) {
      const box = new THREE.Box3().setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      obj.position.sub(center); // Center the model
    }
  }, [obj]);

  //   useFrame(() => {
  //     if (ref.current) {
  //       //   ref.current.rotation.y += 0.01; // 단순 애니메이션 효과를 위해 모델을 회전시킵니다.
  //     }
  //   });

  return <primitive ref={ref} object={obj} scale={3} />;
}

export default function ObjViewer({ urls }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 0) % urls.length);
      //   console.log(index);
    }, 100); // 0.1초마다 모델을 변경합니다.
    return () => clearInterval(interval);
  }, [urls.length]);

  return (
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
      <axesHelper args={[10, 10, 10]} />
      <Model url={urls[index]} />
    </Canvas>
  );
}
