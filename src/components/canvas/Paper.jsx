// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const Paper = (props) => {
  const { nodes, materials } = useGLTF('paper.glb')

  const paper = useRef()

  useFrame((state, delta) => {
    paper.current.rotation.y += delta * 4
  })

  return (
    <group {...props} ref={paper} dispose={null}>
      <mesh name='paper' geometry={nodes.Cube_Cube001.geometry} material={materials['Material.000']} />
    </group>
  )
}

useGLTF.preload('paper.glb')

export default Paper
