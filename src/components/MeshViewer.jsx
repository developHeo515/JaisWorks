// src/MeshViewer.js
import React, { useEffect } from "react";
import * as THREE from "three";

const MeshViewer = ({ filename }) => {
  useEffect(() => {
    console.log("매트립 진행중", filename);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xfdfdfd, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    const loadOBJ = (filename) => {
      fetch("http://54.180.245.26/get_json_data/")
        .then((response) => {
          response.text();
          console.log("loadOBJ실험", response);
          console.log("loadOBJ실험2", response.text());
          console.log("loadOBJ실험3", response.data[1]);
        })
        .then((data) => {
          const vertices = [];
          const faces = [];

          const lines = data.split("\n");
          lines.forEach((line) => {
            if (line.startsWith("v ")) {
              const vertex = line.slice(2).trim().split(" ").map(Number);
              vertices.push(vertex);
            } else if (line.startsWith("f ")) {
              const face = line
                .slice(2)
                .trim()
                .split(" ")
                .map((part) => parseInt(part.split("/")[0], 10) - 1);
              faces.push(face);
            }
          });

          const geometry = new THREE.Geometry();
          const positions = new Float32Array(vertices.length * 3);
          for (let i = 0; i < vertices.length; i++) {
            positions[i * 3] = vertices[i][0];
            positions[i * 3 + 1] = vertices[i][1];
            positions[i * 3 + 2] = vertices[i][2];
          }
          geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
          );

          const indices = [];
          faces.forEach((face) => {
            indices.push(face[0], face[1], face[2]);
          });
          geometry.setIndex(indices);
          geometry.computeVertexNormals();

          const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);

          camera.position.z = 5;
          const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
          };
          animate();
        });
    };

    loadOBJ(filename);

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, [filename]);

  return <div />;
};

export default MeshViewer;
