import { Music, Code, Globe, Twitter, Terminal } from 'lucide-react'
import { useState } from 'react'
import MusicPlayer from './MusicPlayer'

interface DockProps {
  toggleWindow: (id: string) => void
}

export default function Dock({ toggleWindow }: DockProps) {
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg px-4">
      <div className="flex items-end justify-center space-x-1 sm:space-x-2 bg-white/25 dark:bg-black/25 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/20 dark:border-white/10 transition-colors duration-300 overflow-x-auto">
        <button
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-900/80 flex items-center justify-center text-lg sm:text-2xl border border-white/20 dark:border-white/10 shadow-lg transform-gpu transition-all duration-150 hover:scale-125 hover:-translate-y-2 hover:mb-1 group"
          onClick={() => toggleWindow('about')}
        >
          <span className="group-hover:scale-90 transition-transform">👤</span>
        </button>
        <button
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-900/80 flex items-center justify-center text-lg sm:text-2xl border border-white/20 dark:border-white/10 shadow-lg transform-gpu transition-all duration-150 hover:scale-125 hover:-translate-y-2 hover:mb-1 group peer"
          onClick={() => toggleWindow('projects')}
        >
          <span className="group-hover:scale-90 transition-transform">💼</span>
        </button>
        <button
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-900/80 flex items-center justify-center text-lg sm:text-2xl border border-white/20 dark:border-white/10 shadow-lg transform-gpu transition-all duration-150 hover:scale-125 hover:-translate-y-2 hover:mb-1 group peer"
          onClick={() => toggleWindow('contact')}
        >
          <span className="group-hover:scale-90 transition-transform">📧</span>
        </button>
        <button
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-900/80 flex items-center justify-center text-lg sm:text-2xl border border-white/20 dark:border-white/10 shadow-lg transform-gpu transition-all duration-150 hover:scale-125 hover:-translate-y-2 hover:mb-1 group peer"
          onClick={() => setShowMusicPlayer(!showMusicPlayer)}
        >
          <Music className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800 dark:text-white group-hover:scale-90 transition-transform" />
        </button>
        <button
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-900/80 flex items-center justify-center text-lg sm:text-2xl border border-white/20 dark:border-white/10 shadow-lg transform-gpu transition-all duration-150 hover:scale-125 hover:-translate-y-2 hover:mb-1 group peer"
          onClick={() => toggleWindow('vscode')}
        >
          <Code className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800 dark:text-white group-hover:scale-90 transition-transform" />
        </button>
        <button
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-900/80 flex items-center justify-center text-lg sm:text-2xl border border-white/20 dark:border-white/10 shadow-lg transform-gpu transition-all duration-150 hover:scale-125 hover:-translate-y-2 hover:mb-1 group peer"
          onClick={() => toggleWindow('browser')}
        >
          <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800 dark:text-white group-hover:scale-90 transition-transform" />
        </button>
        <button
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-900/80 flex items-center justify-center text-lg sm:text-2xl border border-white/20 dark:border-white/10 shadow-lg transform-gpu transition-all duration-150 hover:scale-125 hover:-translate-y-2 hover:mb-1 group peer"
          onClick={() => window.open('https://twitter.com/yourusername', '_blank')}
        >
          <Twitter className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800 dark:text-white group-hover:scale-90 transition-transform" />
        </button>
        <button
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-900/80 flex items-center justify-center text-lg sm:text-2xl border border-white/20 dark:border-white/10 shadow-lg transform-gpu transition-all duration-150 hover:scale-125 hover:-translate-y-2 hover:mb-1 group peer"
          onClick={() => toggleWindow('terminal')}
        >
          <Terminal className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800 dark:text-white group-hover:scale-90 transition-transform" />
        </button>
      </div>
      {showMusicPlayer && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
          <MusicPlayer />
        </div>
      )}
    </div>
  )
}

