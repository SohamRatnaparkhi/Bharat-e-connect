import React from 'react'

import { Environment, OrbitControls, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { ConferenceTable } from './ConferenceTable'
import { SittingSoham } from './Sitting-soham'

const VRCanvas = () => {
  return (
    <div style={{'backgroundColor':'transparent'}}>
        <Canvas style={{'width':'100vw', 'height':'100vh', 'backgroundColor':'transparent'}}>
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
            <SittingSoham position={[0, 0.3, -2]} rotation={[0, Math.PI/2, 0]} />

        </Canvas>
    </div>
  )
}

export default VRCanvas