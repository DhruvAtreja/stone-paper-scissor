'use client'

import dynamic from 'next/dynamic'
import { useCallback, Suspense, useState, useRef, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Loader from '@/components/Loader'
import { Box } from '@react-three/flex'
import { GAME_RESULT, MODELS } from '@/page'
import { UserChoicePanel } from './UserChoicePanel'
import { ComputerChoicePanel } from './ComputerChoicePanel'
import { Header } from '../../Header'

export const ResultCanvas = ({
  selectedModel,
  computerModel,
  gameResult,
}: {
  selectedModel: string
  computerModel: string
  gameResult: string
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

  return (
    <div className={backgroundGradient}>
      <Canvas
        camera={{
          near: 0.1,
          far: 50,
          position: [0.5, -2, 9],
        }}
        className='w-full h-screen bg-transparent'
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls />
          <ambientLight intensity={1.5} />
          <pointLight position={[1, 0, 1]} intensity={10} />
          <UserChoicePanel model={selectedModel} />
          <ComputerChoicePanel model={computerModel} />
        </Suspense>
      </Canvas>
    </div>
  )
}
