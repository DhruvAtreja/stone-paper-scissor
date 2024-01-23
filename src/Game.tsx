'use client'

import { useCallback, useState, useRef, useEffect } from 'react'
import { ChoosingCanvas } from '@/components/canvas/ChoosingCanvas'
import { ResultCanvas } from '@/components/canvas/ResultCanvas/ResultCanvas'
import { Header } from '@/components/Header'
import { useAudio } from '@/hooks/useAudio'

export const MODELS = {
  rock: 'rock',
  paper: 'paper',
  scissors: 'scissors',
}

const RULES = {
  [MODELS.rock]: MODELS.scissors,
  [MODELS.paper]: MODELS.rock,
  [MODELS.scissors]: MODELS.paper,
}

export const GAME_STATES = {
  choosing: 'choosing',
  result: 'result',
}

export const GAME_RESULT = {
  win: 'win',
  lose: 'lose',
  draw: 'draw',
}

export default function Game() {
  const [gameState, setGameState] = useState(GAME_STATES.choosing) // ['choosing', 'result'
  const [selectedModel, setSelectedModel] = useState(null)
  const [gameResult, setGameResult] = useState(null) // ['win', 'lose', 'draw'
  const [computerModel, setComputerModel] = useState(null) // ['rock', 'paper', 'scissors'
  const [isSoundPlaying, setIsSoundPlaying] = useState(false)
  const [winCount, setWinCount] = useState(0)
  const [loseCount, setLoseCount] = useState(0)
  const [roundCount, setRoundCount] = useState(0)

  useAudio({ url: 'bgMusic.mp3', isPlaying: isSoundPlaying })

  const resetGame = useCallback(() => {
    setGameState(GAME_STATES.choosing)
    setWinCount(0)
    setLoseCount(0)
    setRoundCount(0)
  }, [])

  useEffect(() => {
    console.log('selectedModel', selectedModel)
    console.log('computerModel', computerModel)
    if (selectedModel) {
      const generatedComputerModel = Object.values(MODELS)[Math.floor(Math.random() * 3)]
      console.log('generateComputerModel', generatedComputerModel)
      setComputerModel(generatedComputerModel)
      if (RULES[selectedModel] == generatedComputerModel) {
        setGameResult(GAME_RESULT.win)
        setWinCount((winCount) => winCount + 1)
      } else if (RULES[generatedComputerModel] == selectedModel) {
        setGameResult(GAME_RESULT.lose)
        setLoseCount((loseCount) => loseCount + 1)
      } else if (generatedComputerModel == selectedModel) {
        setGameResult(GAME_RESULT.draw)
      }
      setRoundCount((roundCount) => roundCount + 1)
    }
    console.log('computerModel', computerModel)
  }, [selectedModel])

  useEffect(() => {
    if (gameState == GAME_STATES.choosing) {
      setSelectedModel(null)
      setGameResult(null)
      setComputerModel(null)
    }
  }, [gameState])

  return (
    <div className='w-screen h-screen'>
      <Header
        gameState={gameState}
        setGameState={setGameState}
        resetGame={resetGame}
        gameResult={gameResult}
        setIsSoundPlaying={setIsSoundPlaying}
        isSoundPlaying={isSoundPlaying}
        winCount={winCount}
        loseCount={loseCount}
        roundCount={roundCount}
      />
      {gameState == GAME_STATES.choosing && (
        <ChoosingCanvas
          selectedModel={selectedModel}
          setIsSoundPlaying={setIsSoundPlaying}
          setSelectedModel={setSelectedModel}
          setGameState={setGameState}
        />
      )}
      {gameState == GAME_STATES.result && (
        <ResultCanvas gameResult={gameResult} computerModel={computerModel} selectedModel={selectedModel} />
      )}
    </div>
  )
}
