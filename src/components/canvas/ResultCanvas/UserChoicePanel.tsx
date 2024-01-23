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
      {model == MODELS.rock && <Rock position={[2.5, -3, 0]} scale={[14, 14, 14]} />}
      {model == MODELS.paper && <Paper position={[2.5, -2, 0]} scale={[2, 2, 2]} rotation={[0, Math.PI / 4, 0]} />}
      {model == MODELS.scissors && <Scissors position={[2.5, -2.5, 0]} scale={[13, 13, 13]} />}
      <Float rotationIntensity={1} floatIntensity={0.25}>
        <Html position={[2, 1, 0]}>
          <div className='w-[200px] text-white font-bold'>You Chose</div>
        </Html>
      </Float>
    </Box>
  )
}
