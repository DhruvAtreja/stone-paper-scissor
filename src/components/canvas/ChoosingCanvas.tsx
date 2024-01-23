'use client'

import dynamic from 'next/dynamic'
import { useCallback, Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Loader from '@/components/Loader'
import { Box } from '@react-three/flex'
import { MODELS, GAME_STATES } from '@/Game'

const Rock = dynamic(() => import('@/components/canvas/Rock'), { ssr: false })
const Paper = dynamic(() => import('@/components/canvas/Paper'), { ssr: false })
const Scissors = dynamic(() => import('@/components/canvas/Scissors'), { ssr: false })

export const ChoosingCanvas = ({
  selectedModel,
  setSelectedModel,
  setGameState,
}: {
  selectedModel: 'rock' | 'paper' | 'scissors' | null
  setSelectedModel: (model: string) => void
  setGameState: (state: string) => void
  setIsSoundPlaying: (isPlaying: boolean) => void
}) => {
  const [model, setModel] = useState(MODELS.rock)
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

  const [hovered, setHovered] = useState(false)

  const handleHover = (e) => {
    e.stopPropagation()
    setHovered(true)
  }

  const handleUnhover = (e) => {
    e.stopPropagation()
    setHovered(false)
  }

  const handleClick = useCallback((model) => {
    setSelectedModel(model)
    setGameState(GAME_STATES.result)
  }, [])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer'
    } else {
      document.body.style.cursor = 'default'
    }
  }, [hovered])

  return (
    <div className='w-screen h-screen bg-transparent '>
      <Canvas
        camera={{
          near: 0.1,
          far: 50,
          position: [0, -4, 8],
        }}
        className='w-full h-screen hover:bg-gradient-to-l bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 '
        z-index={10}
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls />
          <ambientLight intensity={1.5} />
          <pointLight position={[1, -1, 3]} intensity={10} />
          <Box>
            {model == MODELS.rock && (
              <Rock
                position={[0, -3.5, 0]}
                scale={[18, 18, 18]}
                onPointerOver={handleHover}
                onPointerOut={handleUnhover}
                onClick={() => handleClick(MODELS.rock)}
              />
            )}
            {model == MODELS.paper && (
              <Paper
                position={[0, -2.5, 0]}
                scale={[3, 3, 3]}
                rotation={[0, Math.PI / 4, 0]}
                onPointerOver={handleHover}
                onPointerOut={handleUnhover}
                onClick={() => handleClick(MODELS.paper)}
              />
            )}
            {model == MODELS.scissors && (
              <Scissors
                position={[0, -3, 0]}
                scale={[18, 18, 18]}
                onPointerOver={handleHover}
                onPointerOut={handleUnhover}
                onClick={() => handleClick(MODELS.scissors)}
              />
            )}
          </Box>
        </Suspense>
      </Canvas>
    </div>
  )
}
