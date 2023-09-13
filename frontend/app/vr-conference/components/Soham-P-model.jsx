/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/soham-model.glb
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations,  } from '@react-three/drei'

export function SohamPModel(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('models/soham-model.glb')

  const {animations: sittingAnim} = useGLTF('animations/sitting-Idle.fbx');
  sittingAnim[0].name = 'sitting-anim';

  const {actions} = useAnimations(sittingAnim, group);;

  useEffect(() => {
    actions['sitting-anim'].reset().play();
  }, [actions]);
 
  return (
    <group {...props} ref={group} dispose={null} rotation={[Math.PI/2, Math.PI, Math.PI/2]}>
      <axesHelper />
      <primitive object={nodes.Hips} />
      <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Outfit_Top" geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} morphTargetDictionary={nodes.Wolf3D_Outfit_Top.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Outfit_Top.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Outfit_Bottom" geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} morphTargetDictionary={nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Outfit_Footwear" geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} morphTargetDictionary={nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Body" geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences} />
    </group>
  )
}

useGLTF.preload('models/soham-model.glb')
