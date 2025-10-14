"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Minimize2 } from "lucide-react";

interface LocalTrack {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  src: string;
}

const localTracks: LocalTrack[] = [
  {
    id: "local-1",
    name: "Mockingbird",
    artist: "Eminem",
    albumArt: "/mockinbird.jpg",
    src: "/Eminem-Mockingbird-.mp3",
  },
  {
    id: "local-2",
    name: "Dawood",
    artist: "Sidhu Moose Wala",
    albumArt: "/pbx1.jpg",
    src: "/Dawood.mp3",
  },
];

export default function FullScreenMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(localTracks[currentTrack].src);
    audio.preload = "auto";
    audio.volume = volume;

    const onTime = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
      setIsPlaying(!audio.paused);
    };
    const onEnded = () => {
      setCurrentTrack((t) => (t + 1) % localTracks.length);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  const next = () => setCurrentTrack((t) => (t + 1) % localTracks.length);
  const prev = () => setCurrentTrack((t) => (t - 1 + localTracks.length) % localTracks.length);

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;
    const newTime = (value / 100) * duration;
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const changeVolume = (v: number) => setVolume(v);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressValue = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 text-gray-800 dark:text-white flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col items-center min-h-screen">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-4 sm:mb-6">
          <img
            src={localTracks[currentTrack].albumArt}
            alt={localTracks[currentTrack].name}
            width={256}
            height={256}
            className="w-full h-full object-cover rounded-xl shadow-2xl"
          />
          <button
            className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full ${
              isLiked ? "bg-red-500" : "bg-white bg-opacity-20"
            }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={16} className={isLiked ? "text-white" : "text-gray-200"} />
          </button>
        </div>

        <div className="text-center mb-4 sm:mb-6 w-full px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 truncate">
            {localTracks[currentTrack].name}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1 truncate">
            {localTracks[currentTrack].artist}
          </p>
        </div>

        <div className="w-full flex items-center space-x-2 mb-4 sm:mb-6 px-2">
          <span className="text-xs sm:text-sm">{formatTime(progress)}</span>
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={100}
              value={progressValue || 0}
              className="w-full h-1 sm:h-1.5 bg-green-200 dark:bg-green-900 rounded-full appearance-none cursor-pointer"
              onChange={(e) => seek(parseFloat(e.target.value))}
            />
          </div>
          <span className="text-xs sm:text-sm">{formatTime(duration)}</span>
        </div>

        <div className="flex justify-center items-center space-x-3 sm:space-x-4 md:space-x-6 mb-4 sm:mb-6">
          <button onClick={prev} className="text-gray-600">
            <SkipBack size={20} />
          </button>
          <button onClick={togglePlay} className="bg-white dark:bg-gray-500 rounded-full p-2 sm:p-3">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button onClick={next} className="text-gray-600">
            <SkipForward size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2 sm:space-x-3">
          <Volume2 size={16} className="text-green-500" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-green-200 dark:bg-green-900 rounded-full appearance-none cursor-pointer"
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <button className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-white">
        <Minimize2 size={16} />
      </button>
    </div>
  );
}