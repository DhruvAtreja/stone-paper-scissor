'use client'

import dynamic from 'next/dynamic'
import { Suspense, useCallback } from 'react'
const Rock = dynamic(() => import('@/components/canvas/Rock'), { ssr: false })
const Paper = dynamic(() => import('@/components/canvas/Paper'), { ssr: false })
const Scissors = dynamic(() => import('@/components/canvas/Scissors'), { ssr: false })
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

import { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Image, OrbitControls, Text, Float } from '@react-three/drei'
import { Flex, Box, useReflow } from '@react-three/flex'

// import useGame from './stores/useGame.js'

const MODELS = {
  rock: 'rock',
  paper: 'paper',
  scissors: 'scissors',
}
export default function Game() {
  const [model, setModel] = useState(MODELS.rock)

  const [limit, setLimit] = useState(null)

  const switchModel = useCallback(() => {
    const keys = Object.keys(MODELS)
    const index = keys.indexOf(model)
    const next = keys[(index + 1) % keys.length]
    setModel(next)
  }, [model])

  useEffect(() => {
    const switchModelTimer = setInterval(switchModel, 1000)
    return () => clearInterval(switchModelTimer)
  })

  const rock = useRef()
  const paper = useRef()
  const scissors = useRef()

  const [hovered, setHovered] = useState(false)

  const handleHover = (e) => {
    e.stopPropagation()
    setHovered(true)
  }

  const handleUnhover = (e) => {
    e.stopPropagation()
    setHovered(false)
  }

  return (
    <div className='w-screen h-screen bg-violet-100'>
      <Canvas
        camera={{
          // fov: 45,
          near: 0.1,
          far: 50,
          position: [0, -5, 8],
        }}
        className='w-1/2 h-screen bg-transparent'
      >
        <OrbitControls />
        <ambientLight intensity={1.5} />
        <pointLight position={[1, 0, 1]} intensity={10} />

        {model == MODELS.rock && (
          <Rock
            ref={rock}
            position={[0, -3, 0]}
            scale={[14, 14, 14]}
            onPointerOver={handleHover}
            onPointerOut={handleUnhover}
          />
        )}
        {model == MODELS.paper && (
          <Paper
            ref={paper}
            position={[0, -2, 0]}
            scale={[2, 2, 2]}
            rotation={[0, Math.PI / 4, 0]}
            onPointerOver={handleHover}
            onPointerOut={handleUnhover}
          />
        )}
        {model == MODELS.scissors && (
          <Scissors
            ref={scissors}
            position={[0, -2, 0]}
            scale={[13, 13, 13]}
            onPointerOver={handleHover}
            onPointerOut={handleUnhover}
          />
        )}
      </Canvas>
    </div>
  )
}
