'use client'
import React, { useState, useEffect, useRef } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import { Howl } from 'howler'

interface AudioPlayerProps {
  url: string
  className?: string
}

const AudioPlayer = ({ url, className = '' }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const soundRef = useRef<Howl | null>(null)

  useEffect(() => {
    soundRef.current = new Howl({
      src: [url],
      html5: true,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => {
        setIsPlaying(false)
        setProgress(0)
      }
    })

    return () => {
      soundRef.current?.unload()
    }
  }, [url])

  useEffect(() => {
    let animationFrame: number
    const updateProgress = () => {
      if (soundRef.current) {
        const seek = soundRef.current.seek() as number
        const duration = soundRef.current.duration() as number
        setProgress(duration ? (seek / duration) * 100 : 0)
      }
      animationFrame = requestAnimationFrame(updateProgress)
    }

    if (isPlaying) {
      animationFrame = requestAnimationFrame(updateProgress)
    }

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause()
      } else {
        soundRef.current.play()
      }
    }
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <button
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-soundverse-purple hover:bg-purple-700 transition-colors"
      >
        {isPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white" />}
      </button>
      
      <div className="flex-1 bg-gray-700 rounded-full h-1.5">
        <div
          className="bg-soundverse-purple h-full rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default AudioPlayer