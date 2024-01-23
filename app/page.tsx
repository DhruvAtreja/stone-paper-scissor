'use client'

import dynamic from 'next/dynamic'
import { useCallback, Suspense, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useAudio } from '@/hooks/useAudio'
import Loader from '@/components/Loader'

const Rock = dynamic(() => import('@/components/canvas/Rock'), { ssr: false })
const Paper = dynamic(() => import('@/components/canvas/Paper'), { ssr: false })
const Scissors = dynamic(() => import('@/components/canvas/Scissors'), { ssr: false })

const MODELS = {
  rock: 'rock',
  paper: 'paper',
  scissors: 'scissors',
}

export default function Game() {
  const [model, setModel] = useState(MODELS.rock)
  const [isSoundPlaying, setIsSoundPlaying] = useState(false)
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

  useAudio({ url: 'bgMusic.mp3', isPlaying: isSoundPlaying })

  const [hovered, setHovered] = useState(false)

  const handleHover = (e) => {
    e.stopPropagation()
    setHovered(true)
  }

  const handleUnhover = (e) => {
    e.stopPropagation()
    setHovered(false)
  }

  const [activeModel, setActiveModel] = useState(null)

  const handleClick = useCallback(
    (model) => {
      setIsSoundPlaying(true)
    },
    [isSoundPlaying],
  )

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer'
    } else {
      document.body.style.cursor = 'default'
    }
  }, [hovered])

  return (
    <div className='w-screen h-screen bg-violet-100'>
      <Canvas
        camera={{
          near: 0.1,
          far: 50,
          position: [0, -5, 8],
        }}
        className='w-full h-screen bg-transparent'
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls />
          <ambientLight intensity={1.5} />
          <pointLight position={[1, 0, 1]} intensity={10} />

          {model == MODELS.rock && (
            <Rock
              position={[0, -3, 0]}
              scale={[14, 14, 14]}
              onPointerOver={handleHover}
              onPointerOut={handleUnhover}
              onClick={() => handleClick(MODELS.rock)}
            />
          )}
          {model == MODELS.paper && (
            <Paper
              position={[0, -2, 0]}
              scale={[2, 2, 2]}
              rotation={[0, Math.PI / 4, 0]}
              onPointerOver={handleHover}
              onPointerOut={handleUnhover}
              onClick={() => handleClick(MODELS.paper)}
            />
          )}
          {model == MODELS.scissors && (
            <Scissors
              position={[0, -2, 0]}
              scale={[13, 13, 13]}
              onPointerOver={handleHover}
              onPointerOut={handleUnhover}
              onClick={() => handleClick(MODELS.scissors)}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
