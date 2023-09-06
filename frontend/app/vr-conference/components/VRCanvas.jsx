import React from 'react'

import { Environment, OrbitControls, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { ConferenceTable } from './ConferenceTable'
import { SittingSoham } from './Sitting-soham'

import { positions } from '../positions'
import { VRButton, XR } from '@react-three/xr'

const VRCanvas = () => {
  return (
    <div style={{'backgroundColor':'transparent'}}>
      <VRButton style={{
        'position': 'absolute',
        'top': '10px',
        'width': '20px',
        'height': '10px'
      }}/>
        <Canvas style={{'width':'100vw', 'height':'100vh', 'backgroundColor':'transparent'}}>
          <XR>
            <OrbitControls />
            <ambientLight />
            <axesHelper args={[50]} />
            <gridHelper args={[50, 50]} />

            <Environment preset="forest" />
            <Sky sunPosition={[100, 20, 100]} />
            <hemisphereLight skyColor="#ffffff" groundColor="#000000" intensity={1.0} />
            <pointLight position={[5, 5, 5]} />
            {/* <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" />
            </mesh> */}
            <ConferenceTable position={[0, 0, 0]} />
            {/* <SittingSoham position={[0, 0.3, -2]} /> */}
            <SittingSoham position={positions[3]} rotation={[0, Math.PI/2, 0]} />
          </XR>
        </Canvas>
    </div>
  )
}

export default VRCanvas