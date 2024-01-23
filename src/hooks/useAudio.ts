import React, { useRef, useEffect } from 'react'

export const useAudio = ({ url, isPlaying }: { url: string; isPlaying: boolean }) => {
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
