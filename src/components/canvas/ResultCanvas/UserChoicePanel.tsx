'use client'

import dynamic from 'next/dynamic'
import { Html } from '@react-three/drei'
import { Box } from '@react-three/flex'
import { MODELS } from '@/Game'

const Rock = dynamic(() => import('@/components/canvas/Rock'), { ssr: false })
const Paper = dynamic(() => import('@/components/canvas/Paper'), { ssr: false })
const Scissors = dynamic(() => import('@/components/canvas/Scissors'), { ssr: false })

export const UserChoicePanel = ({ model, isMobile }) => {
  return (
    <Box>
      <Html position={isMobile ? [3.5, 0, 0] : [3.5, 1.5, 0]}>
        <div className='w-[200px] text-white font-bold'>You Chose</div>
      </Html>
      {model == MODELS.rock && <Rock position={isMobile ? [5, -8, 0] : [4, -4, 0]} scale={[20, 20, 20]} />}
      {model == MODELS.paper && (
        <Paper
          position={isMobile ? [5, -6.5, 0] : [4, -2.5, 0]}
          scale={[3.5, 3.5, 3.5]}
          rotation={[0, Math.PI / 4, 0]}
        />
      )}
      {model == MODELS.scissors && <Scissors position={isMobile ? [5, -7.5, 0] : [4, -3.5, 0]} scale={[20, 20, 20]} />}
    </Box>
  )
}
