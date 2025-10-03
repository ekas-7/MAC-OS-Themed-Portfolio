'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Heart, Repeat, Shuffle, Minimize2 } from 'lucide-react'

interface SpotifyTrack {
  id: string
  name: string
  artist: string
  album: string
  albumArt: string
  duration: number
  uri: string
}

// Popular tracks with Spotify URIs
const spotifyTracks: SpotifyTrack[] = [
  {
    id: "4iV5W9uYEdYUVa79Axb7Rh",
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    duration: 200,
    uri: "spotify:track:4iV5W9uYEdYUVa79Axb7Rh"
  },
  {
    id: "7qiZfU4dY1lWllzX7mPMBI",
    name: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    duration: 233,
    uri: "spotify:track:7qiZfU4dY1lWllzX7mPMBI"
  },
  {
    id: "0VjIjW4UAa4v4eB9fszJU5",
    name: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273ef24c3d2c1c4a0b2a3b3b3b",
    duration: 203,
    uri: "spotify:track:0VjIjW4UAa4v4eB9fszJU5"
  },
  {
    id: "6f3Slt0gbA4bCyY3QcvZQF",
    name: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a",
    duration: 178,
    uri: "spotify:track:6f3Slt0gbA4bCyY3QcvZQF"
  },
  {
    id: "3n3Ppam7vgaVa1iaRUqs9D",
    name: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273f7b7174bef6f3fbfda3a0bb7",
    duration: 174,
    uri: "spotify:track:3n3Ppam7vgaVa1iaRUqs9D"
  },
  {
    id: "1rqqCSm0Qe4I9rUvXd0Fyg",
    name: "Bad Guy",
    artist: "Billie Eilish",
    album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856",
    duration: 194,
    uri: "spotify:track:1rqqCSm0Qe4I9rUvXd0Fyg"
  }
]

export default function FullScreenMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0)
  const [spotifyController, setSpotifyController] = useState<any>(null)
  const [isSpotifyReady, setIsSpotifyReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const iframeRef = useRef<HTMLDivElement>(null)

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (spotifyController) {
      if (isPlaying) {
        spotifyController.pause()
      } else {
        spotifyController.resume()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (spotifyController) {
      spotifyController.setVolume(newVolume)
    }
  }

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} className="text-green-500" />
    if (volume < 0.5) return <Volume1 size={16} className="text-green-500" />
    return <Volume2 size={16} className="text-green-500" />
  }

  const nextSong = () => {
    const nextIndex = (currentSong + 1) % spotifyTracks.length
    setCurrentSong(nextIndex)
    if (spotifyController) {
      spotifyController.loadUri(spotifyTracks[nextIndex].uri)
    }
    setIsPlaying(true)
  }

  const prevSong = () => {
    const prevIndex = (currentSong - 1 + spotifyTracks.length) % spotifyTracks.length
    setCurrentSong(prevIndex)
    if (spotifyController) {
      spotifyController.loadUri(spotifyTracks[prevIndex].uri)
    }
    setIsPlaying(true)
  }

  // Initialize Spotify iframe API
  useEffect(() => {
    const initializeSpotify = () => {
      if (typeof window !== 'undefined' && (window as any).Spotify) {
        const element = iframeRef.current
        if (element) {
          const options = {
            uri: spotifyTracks[currentSong].uri,
            width: 300,
            height: 80,
            view: 'list',
            theme: 'dark'
          }
          
          (window as any).Spotify.createController(element, options, (controller: any) => {
            setSpotifyController(controller)
            setIsSpotifyReady(true)
            setIsLoading(false)
            
            // Set up event listeners
            controller.addListener('ready', () => {
              console.log('Spotify player ready')
              setIsLoading(false)
            })
            
            controller.addListener('playback_update', (state: any) => {
              setIsPlaying(state.is_playing)
              setProgress(state.position / 1000) // Convert to seconds
              setDuration(state.duration / 1000) // Convert to seconds
            })

            controller.addListener('playback_status', (state: any) => {
              if (state.track_window && state.track_window.current_track) {
                // Track ended, move to next
                if (repeatMode !== 2) {
                  nextSong()
                }
              }
            })

            controller.addListener('initialization_error', (error: any) => {
              console.error('Spotify initialization error:', error)
              setHasError(true)
              setIsLoading(false)
            })
          })
        }
      }
    }

    // Check if Spotify API is already loaded
    if (typeof window !== 'undefined' && (window as any).Spotify) {
      initializeSpotify()
    } else {
      // Wait for Spotify API to load with timeout
      let attempts = 0
      const maxAttempts = 50 // 5 seconds timeout
      
      const checkSpotify = setInterval(() => {
        attempts++
        if (typeof window !== 'undefined' && (window as any).Spotify) {
          clearInterval(checkSpotify)
          initializeSpotify()
        } else if (attempts >= maxAttempts) {
          clearInterval(checkSpotify)
          setHasError(true)
          setIsLoading(false)
          console.error('Spotify API failed to load within timeout')
        }
      }, 100)
      
      return () => clearInterval(checkSpotify)
    }
  }, [])

  // Update track when currentSong changes
  useEffect(() => {
    if (spotifyController && isSpotifyReady) {
      spotifyController.loadUri(spotifyTracks[currentSong].uri)
    }
  }, [currentSong, spotifyController, isSpotifyReady])

  // Calculate current time safely
  const currentTime = progress
  const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed inset-0 text-gray-800 dark:text-white flex flex-col items-center justify-between p-8 px-6 md:px-20 overflow-hidden">
      <div className="w-[70%] flex flex-col items-center min-h-screen">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading Spotify Player...</p>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Spotify Player Unavailable</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              The Spotify player couldn't be loaded. This might be due to network issues or browser restrictions. 
              Please try refreshing the page or check your internet connection.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Music Player Content */}
        {!isLoading && !hasError && (
          <>
            {/* Album Art */}
            <div className="relative w-32 h-32 sm:w-64 sm:h-64 mb-4">
              <Image 
                src={spotifyTracks[currentSong].albumArt} 
                alt={`${spotifyTracks[currentSong].name} album art`}
                width={256}
                height={256}
                className="w-full h-full object-cover rounded-xl shadow-2xl" 
              />
              <button 
                className={`absolute top-2 right-2 p-1 rounded-full ${isLiked ? 'bg-red-500' : 'bg-white bg-opacity-20'}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart size={16} className={isLiked ? 'text-white' : 'text-gray-200'} />
              </button>
            </div>
      
            {/* Song Info */}
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold mb-1 truncate w-48 sm:w-64">{spotifyTracks[currentSong].name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 truncate w-48 sm:w-64">{spotifyTracks[currentSong].artist}</p>
              <p className="text-xs text-gray-900 dark:text-gray-100 truncate w-48 sm:w-64">{spotifyTracks[currentSong].album}</p>
            </div>
      
            {/* Progress Bar */}
            <div className="w-full flex items-center space-x-2 mb-4">
              <span className="text-xs">{formatTime(currentTime)}</span>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressValue || 0}
                  className="w-full h-1 bg-green-200 dark:bg-green-900 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-500 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full"
                  style={{
                    backgroundImage: `linear-gradient(to right, #22c55e ${progressValue}%, #bbf7d0 ${progressValue}%)`
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (spotifyController) {
                      const newTime = (parseFloat(e.target.value) / 100) * duration
                      spotifyController.seek(newTime * 1000) // Convert to milliseconds
                    }
                  }}
                />
              </div>
              <span className="text-xs">{formatTime(duration)}</span>
            </div>
      
            {/* Controls */}
            <div className="flex justify-center items-center space-x-4 mb-4">
              <Shuffle 
                size={16} 
                className={`cursor-pointer ${isShuffled ? 'text-green-500' : 'dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black'}`}
                onClick={() => setIsShuffled(!isShuffled)}
              />
              <SkipBack size={20} className="cursor-pointer dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black" onClick={prevSong} />
              <button 
                onClick={togglePlay}
                className="bg-white dark:bg-gray-500 rounded-full p-2 hover:scale-105 transition-transform"
              >
                {isPlaying ? 
                  <Pause size={20} className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black" /> : 
                  <Play size={20} className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black ml-0.5" />
                }
              </button>
              <SkipForward size={20} className="cursor-pointer dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black" onClick={nextSong} />
              <Repeat 
                size={16} 
                className={`cursor-pointer ${repeatMode > 0 ? 'text-green-500' : 'dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black'}`}
                onClick={() => setRepeatMode((prev: number) => (prev + 1) % 3)}
              />
            </div>
      
            {/* Volume Control - Updated with green styling */}
            <div className="flex items-center justify-center space-x-2">
              <VolumeIcon />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                className="w-20 h-1 bg-green-200 dark:bg-green-900 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-500 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full"
                style={{
                  backgroundImage: `linear-gradient(to right, #22c55e ${volume * 100}%, #bbf7d0 ${volume * 100}%)`
                }}
                onChange={handleVolumeChange}
              />
            </div>
          </>
        )}
      </div>
  
      {/* Minimize Button */}
      <button className="absolute top-2 right-2 text-gray-400 hover:text-white">
        <Minimize2 size={16} />
      </button>
  
      {/* Hidden Spotify iframe */}
      <div 
        ref={iframeRef}
        className="hidden"
        style={{ width: '300px', height: '80px' }}
      />
    </div>
  );
}