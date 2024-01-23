'use client'

import dynamic from 'next/dynamic'
import { useCallback, Suspense, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useAudio } from '@/hooks/useAudio'
import Loader from '@/components/Loader'
import { Box } from '@react-three/flex'
import { ChoosingCanvas } from '@/components/canvas/ChoosingCanvas'
import { ResultCanvas } from '@/components/canvas/ResultCanvas/ResultCanvas'
export const MODELS = {
  rock: 'rock',
  paper: 'paper',
  scissors: 'scissors',
}

export default function Game() {
  return <ResultCanvas />
}
