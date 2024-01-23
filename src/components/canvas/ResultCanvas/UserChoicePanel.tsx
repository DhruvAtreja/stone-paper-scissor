'use client'

import dynamic from 'next/dynamic'
import { useCallback, Suspense, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, Float } from '@react-three/drei'
import { useAudio } from '@/hooks/useAudio'
import Loader from '@/components/Loader'
import { Box } from '@react-three/flex'
import { MODELS } from '@/page'

const Rock = dynamic(() => import('@/components/canvas/Rock'), { ssr: false })
const Paper = dynamic(() => import('@/components/canvas/Paper'), { ssr: false })
const Scissors = dynamic(() => import('@/components/canvas/Scissors'), { ssr: false })

export const UserChoicePanel = ({ model }) => {
  return (
    <Box>
      <Html position={[3.5, 1.5, 0]}>
        <div className='w-[200px] text-white font-bold'>You Chose</div>
      </Html>
      {model == MODELS.rock && <Rock position={[4, -4, 0]} scale={[20, 20, 20]} />}
      {model == MODELS.paper && (
        <Paper position={[4, -2.5, 0]} scale={[3.5, 3.5, 3.5]} rotation={[0, Math.PI / 4, 0]} />
      )}
      {model == MODELS.scissors && <Scissors position={[4, -3.5, 0]} scale={[20, 20, 20]} />}
    </Box>
  )
}
