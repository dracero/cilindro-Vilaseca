import React, { Suspense, useState, useRef } from "react";
import { VRCanvas } from 'react-xr' 
import { OrbitControls } from "@react-three/drei";
import GltfModel from "./gltf";

const ModelViewer = ({ modelPath, scale = 10, position = [-1 , 1, -2]}) => {
  const mesh = useRef()
  
  const [action, setAction] = useState(false)
  const Noaction = () => {
    return <button onClick={()=>setAction(!action)}>
                 Click to RUN
          </button>
  }
  const Play = () => {
    return <button onClick={()=>setAction(!action)}>
                 Click to STOP
          </button>
  }
return (
  <div className="wrapper"> 
  <div className="scene-wrapper"> 
     {action ? <Play /> : <Noaction />}
   <VRCanvas>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.6} penumbra={1} />
      <pointLight position={[-1, -1, -1]} />
      <Suspense fallback={null}>
         <GltfModel modelPath={modelPath} scale={scale} position={position} action={action}/>
        <OrbitControls />
      </Suspense>
    </VRCanvas>
   </div> 
  </div> 
  );
};

export default ModelViewer;