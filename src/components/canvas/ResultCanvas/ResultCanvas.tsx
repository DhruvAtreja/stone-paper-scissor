'use client'

import { Suspense, useState, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Loader from '@/components/Loader'
import { GAME_RESULT } from '@/Game'
import { UserChoicePanel } from './UserChoicePanel'
import { ComputerChoicePanel } from './ComputerChoicePanel'

export const ResultCanvas = ({
  selectedModel,
  computerModel,
  gameResult,
}: {
  selectedModel: 'rock' | 'paper' | 'scissors' | null
  computerModel: 'rock' | 'paper' | 'scissors' | null
  gameResult: 'win' | 'lose' | 'draw' | null
}) => {
  const backgroundGradient = useMemo(() => {
    switch (gameResult) {
      case GAME_RESULT.lose:
        return 'w-screen h-screen bg-gradient-to-r from-green-400 via-yellow to-red-500'
      case GAME_RESULT.win:
        return 'w-screen h-screen bg-gradient-to-l from-green-400 via-yellow to-red-500'
      case GAME_RESULT.draw:
        return 'w-screen h-screen bg-gradient-to-l from-green-400 via-green-500 to-green-400'
    }
  }, [gameResult])

  const [width, setWidth] = useState<number>(2000)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 768

  return (
    <div className={backgroundGradient}>
      <Canvas
        camera={{
          near: 0.1,
          far: 50,
          position: isMobile ? [0.5, -0, 25] : [0.5, -2, 9],
        }}
        className='w-full h-screen bg-transparent'
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls />
          <ambientLight intensity={1.5} />
          <pointLight position={[1, 0, 1]} intensity={10} />
          <UserChoicePanel model={selectedModel} isMobile={isMobile} />
          <ComputerChoicePanel model={computerModel} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  )
}
