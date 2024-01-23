import React, { useRef, useEffect, useCallback } from 'react'

export const useAudio = ({ url, isPlaying }) => {
  if (typeof window === 'undefined') return
  const audioRef = useRef(new Audio(url))
  audioRef.current.loop = true

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
    return () => {
      audioRef.current.pause()
    }
  }, [isPlaying])
}
