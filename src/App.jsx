import React, { Suspense, useState, useRef, useEffect } from "react";
import { XR, VRButton, Controllers, Interactive } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";
import GltfModel from "./gltf";
import { Physics} from "@react-three/cannon"
import { Canvas } from "@react-three/fiber"

const ModelViewer = ({ modelPath, scale = 1, position = [-5 , 0.1, -5]}) => {
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
  useEffect(()=>{
    {alert("Recordar que las fuerzar radiales se aplican sobre el centro de masa")}
  },[])
  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0)
  }
return (
  <div className="wrapper"> 
  <div className="scene-wrapper"> 
     {action ? <Play /> : <Noaction />}
   <VRButton />   
   <Canvas>
   <XR>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.6} penumbra={1} />
      <pointLight position={[-1, -1, -1]} />
      <Interactive onSelect={()=>setAction(!action)}>
        <Suspense fallback={null}>
         <Physics>
          <GltfModel modelPath={modelPath} scale={scale} position={position} action={action} color={0xffffff}/>
         </Physics>   
        <OrbitControls />
      </Suspense>
      </Interactive>
     </XR> 
    </Canvas>
   </div> 
  </div> 
  );
};

export default ModelViewer;