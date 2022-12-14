import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useController } from "@react-three/xr"
import { useBox } from "@react-three/cannon"
import * as THREE from "three"

const GltfModel = ({ modelPath, scale=1, position = [-5, 1, -50], action}) => {
  const mesh = useRef()
  const gltf = useLoader(GLTFLoader, modelPath);
  const {  animations } = useGLTF("/cilindroVilaseca.glb");
  const { actions } = useAnimations(animations, mesh);
  const rightController = useController("right")
  const [ref, api] = useBox(() => ({ type: "Kinematic" }))
  useEffect(() => {
    console.log(actions);
    if (action){
      actions.Action.paused=false
      actions.Action.play();
     } else  {
      actions.Action.paused=true;
     }
  })
  useFrame((state) => {
    if (!rightController) {
      return
    }
    const { grip: controller } = rightController
    const forward = new THREE.Vector3(1, 1, 1)
    forward.applyQuaternion(controller.quaternion)
    const position = new THREE.Vector3().copy(controller.position).add(forward)
    api.position.set(position.x, position.y, position.z)
    api.rotation.set(controller.rotation.x, controller.rotation.y, controller.rotation.z)
  })
  return (
    <mesh ref={ref} dispose={null} scale={[1, 1, 1]}>
     <primitive
        ref={mesh}
        object={gltf.scene}
        position={position}
        scale={scale}
      />
    </mesh>
  );
};

export default GltfModel;