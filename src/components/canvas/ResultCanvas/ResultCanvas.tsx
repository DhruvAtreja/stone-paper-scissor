'use client'

import dynamic from 'next/dynamic'
import { useCallback, Suspense, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useAudio } from '@/hooks/useAudio'
import Loader from '@/components/Loader'
import { Box } from '@react-three/flex'
import { MODELS } from '@/page'
import { UserChoicePanel } from './UserChoicePanel'
import { ComputerChoicePanel } from './ComputerChoicePanel'

export const ResultCanvas = () => {
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

  const [selectedModel, setSelectedModel] = useState(null)

  const handleClick = useCallback(
    (model) => {
      // setIsSoundPlaying(true)
      setSelectedModel(model)
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
    <div className='w-screen h-screen bg-gradient-to-r from-green-400 via-yellow to-red-500'>
      <div className='absolute top-0 left-0 w-full  '>
        <div className='flex shadow h-[100px] w-1/2 bg-opacity-50 bg-black m-auto rounded justify-around items-center'>
          <div className='inline mx-2'>
            <div className='text-white  font-bold mb-1'>Round</div>
            <div className='text-white text-center '>1</div>
          </div>
          <div className='inline mx-2'>
            <div className='text-white  font-bold mb-1'>Computer</div>
            <div className='text-white text-center '>0</div>
          </div>
          <div className='inline mx-2'>
            <div className='text-white  font-bold mb-1'>You</div>
            <div className='text-white text-center '>1</div>
          </div>
        </div>
        <div className=' text-3xl mt-[50px] animate-pulse bg-gradient-to-r from-white via-yellow-500 to-white bg-clip-text text-transparent font-bold  text-center '>
          Congratulations, YOU WIN
        </div>
      </div>
      <Canvas
        camera={{
          near: 0.1,
          far: 50,
          position: [0, -3, 8],
        }}
        className='w-full h-screen bg-transparent'
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls />
          <ambientLight intensity={1.5} />
          <pointLight position={[1, 0, 1]} intensity={10} />
          <UserChoicePanel model={model} />
          <ComputerChoicePanel model={model} />
        </Suspense>
      </Canvas>
    </div>
  )
}
