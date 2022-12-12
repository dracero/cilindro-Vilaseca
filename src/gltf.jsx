import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAnimations, useGLTF } from "@react-three/drei";

const GltfModel = ({ modelPath, scale = 5, position = [-1, 10, -1], action }) => {
  const mesh = useRef()
  const gltf = useLoader(GLTFLoader, modelPath);
  const {  animations } = useGLTF("/cilindroVilaseca.glb");
  const { actions } = useAnimations(animations, mesh);
  useEffect(() => {
    console.log(actions);
    if (action){
      actions.Action.paused=false
      actions.Action.play();
     } else  {
      actions.Action.paused=true;
     }
  })
  return (
    <mesh>
     <primitive
        ref={mesh}
        object={gltf.scene}
        position={position}
      />
    </mesh>
  );
};

export default GltfModel;