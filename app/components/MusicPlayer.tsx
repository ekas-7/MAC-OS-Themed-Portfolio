import React, { useState, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'

interface Song {
  title: string;
  artist: string;
  src: string;
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const songs: Song[] = [
    { title: "Song 1", artist: "Artist 1", src: "/song1.mp3" },
    { title: "Song 2", artist: "Artist 2", src: "/song2.mp3" },
    { title: "Song 3", artist: "Artist 3", src: "/song3.mp3" },
  ]

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length)
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.src = songs[(currentSong + 1) % songs.length].src
      audioRef.current.play()
    }
  }

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length)
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.src = songs[(currentSong - 1 + songs.length) % songs.length].src
      audioRef.current.play()
    }
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 rounded-lg shadow-lg w-80">
      <audio ref={audioRef} src={songs[currentSong].src} />
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{songs[currentSong].title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{songs[currentSong].artist}</p>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <button onClick={prevSong} className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
          <SkipBack size={24} />
        </button>
        <button onClick={togglePlay} className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={nextSong} className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
          <SkipForward size={24} />
        </button>
      </div>
      <div className="mt-4 flex items-center">
        <Volume2 size={18} className="text-gray-800 dark:text-white mr-2" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="1"
          className="w-full"
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.volume = parseFloat(e.target.value)
            }
          }}
        />
      </div>
    </div>
  )
}

export default MusicPlayer

