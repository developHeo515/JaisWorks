import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const MeshViewer = () => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const sliderRef = useRef();
  const mountRef = useRef();
  // const meshRef = useRef(new THREE.Mesh());
  const meshRef = useRef(null);

  // const [objFiles, setObjFiles] = useState([]);
  const objFiles = [
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

  const loader = new OBJLoader();

  const updateOBJView = (fileIndex) => {
    loader.load(
      objFiles[fileIndex],
      (obj) => {
        // console.log("updateOBJView확인", obj);
        // console.log(objFiles[fileIndex]);
        // console.log(obj.children);
        if (obj.children.length > 0) {
          const mesh = obj.children[0];
          meshRef.current.geometry.dispose();
          meshRef.current.geometry = mesh.geometry;
          meshRef.current.material.dispose();
          meshRef.current.material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
          });
        }
      },
      undefined,
      (error) => {
        console.error("Error loading OBJ file:", error);
      }
    );
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Mesh 초기화 및 씬에 추가
    meshRef.current = new THREE.Mesh();
    console.log("meshRef확인", meshRef.current);
    scene.add(meshRef.current);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      // console.log("렌더확인", renderer);
    };
    animate();

    const handleSliderChange = (e) => {
      const newIndex = Number(e.target.value);
      setCurrentFileIndex(newIndex);
      updateOBJView(newIndex);
      console.log("현재위치 첫번째 이펙트", newIndex);
    };

    sliderRef.current.addEventListener("input", handleSliderChange);

    // 초기 OBJ 파일 로드
    updateOBJView(currentFileIndex);

    return () => {
      sliderRef.current.removeEventListener("input", handleSliderChange);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
      <primitive ref={mountRef} object={loader} scale={3} />;
    };
  }, [currentFileIndex]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFileIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % objFiles.length;
          updateOBJView(newIndex);
          console.log("두번째 이펙트 후", newIndex);
          return newIndex;
        });
      }, 100);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, objFiles]);

  return (
    <div>
      <div ref={mountRef}></div>
      <input
        type="range"
        ref={sliderRef}
        min="0"
        max={objFiles.length - 1}
        value={currentFileIndex}
        onChange={(e) => setCurrentFileIndex(Number(e.target.value))}
      />
      <button onClick={() => setIsPlaying((prev) => !prev)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default MeshViewer;
