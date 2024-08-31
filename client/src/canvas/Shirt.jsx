// import React, { useEffect, useState } from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio' //just like recoil of react 
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
//decal to aaply texture to rendered 3d element
//useGltf to load 3d element
//useTexture to load textures (logo and all) 
import state from '../store'

const Shirt = () => {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/shirt_baked.glb') //available for free on sketchfab

  const logoTexture = snap.logoDecal ? useTexture(snap.logoDecal) : null
  const fullTexture = snap.fullDecal ? useTexture(snap.fullDecal) : null
   
  
  

 
  useFrame(() => {
    if (materials.lambert1) {
     
      easing.dampC(materials.lambert1.color, snap.color, 0.25)
    }
  }) //applying color on every rendered frame 1.starting color 2.target color 3.0.25 ms

  const stateString = JSON.stringify(snap)

  return (
    <>
    
   
    <group key={stateString}>
      <mesh
        
        geometry={nodes.T_Shirt_male.geometry} //idk
        material={materials.lambert1}       //for surface appearence eg; color,logo
        
      >
        {/* mesh is vertices and edges */}
        {snap.isFullTexture && fullTexture && (
          <Decal 
            position={[0, 0, 0]} //x,y,z
            rotation={[0, 0, 0]} //x,y,z
            scale={1} //size
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && logoTexture && (
          <Decal 
            position={[0, 0.09, 0.1]} //x,y,z
            rotation={[0, 0, 0]} //rotate as per axis
            scale={0.15} //size
            map={logoTexture} 
           
          />
        )}
      </mesh>
    </group>
    <group>


    </group>
    </>
  )
}

export default Shirt
