import React, { useRef, useEffect } from 'react'

export const useAudio = ({ url, isPlaying }: { url: string; isPlaying: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    audioRef.current = new Audio(url)
    audioRef.current.loop = true
  }, [url])

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
    return () => {
      audioRef.current.pause()
    }
  }, [isPlaying])
}
