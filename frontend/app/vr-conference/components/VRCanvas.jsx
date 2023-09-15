import React from 'react'

import { CameraControls, Environment, OrbitControls, Sky } from '@react-three/drei'
import { VRButton, XR } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'

import { ConferenceTable } from './ConferenceTable'
import { SittingSoham } from './Sitting-soham'
import { SohamR } from './Soham-r-model'
import { SohamPModel } from './Soham-P-model'

import { positions } from '../positions'

const VRCanvas = () => {
  return (
    <div style={{'backgroundColor':'transparent'}}>
      <VRButton />
        <Canvas style={{'width':'100vw', 'height':'100vh', 'backgroundColor':'transparent'}}>
          <XR>
            
            <OrbitControls />
            <ambientLight />
            <axesHelper args={[50]} />
            <gridHelper args={[50, 50]} />
            

            {/* <Environment files='environments/sky-mountain.hdr' background blur={0} /> */}
            <Sky sunPosition={[100, 20, 100]} />
            <hemisphereLight skyColor="#ffffff" groundColor="#000000" intensity={1.0} />
            <pointLight position={[5, 5, 5]} />
            {/* <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" />
            </mesh> */}
            <group position={[0, 0, 0]}>
              <ConferenceTable position={[0, 0, 0]} />
              {/* <SittingSoham position={[0, 0.3, -2]} /> */}
              {/* <SittingSoham position={positions[3]} rotation={[0, Math.PI/2, 0]} /> */}
              <SohamR position={positions[1]} rotation={[0, Math.PI, 0]} />
              <SohamPModel position={positions[2]} rotation={[0, -Math.PI/2, 0]} />
            </group>
          </XR>
        </Canvas>
    </div>
  )
}

export default VRCanvas