import React, { useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./Itachi.css";
import "./Itachi3d.css";

const ItachiModel = () => {
  const gltf = useLoader(GLTFLoader, "/models/itachi/scene.gltf");
  const itachiRef = useRef();

  useFrame(() => {
    if (itachiRef.current) {
      itachiRef.current.rotation.y += 0.01; // Slow rotation
    }
  });

  // Adjusted position and scale to keep the model centered
  return <primitive ref={itachiRef} object={gltf.scene} scale={1.4} position={[0, -0.4, 0]} />;
};

const Itachi = () => {
  return (
    <section className="itachi-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <ItachiModel />
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </section>
  );
};

export default Itachi;