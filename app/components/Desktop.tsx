import { Folder } from 'lucide-react'

interface DesktopProps {
  toggleWindow: (id: string) => void
}

export default function Desktop({ toggleWindow }: DesktopProps) {
  return (
    <div className="absolute inset-0 p-4 pt-8">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        <button
          className="flex flex-col items-center"
          onClick={() => toggleWindow('about')}
        >
          <div className="group flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-b from-blue-500/90 to-blue-600/90 dark:from-blue-600/90 dark:to-blue-700/90 rounded-xl flex items-center justify-center shadow-lg border border-white/20 dark:border-white/10 group-hover:scale-105 transition-transform">
              <Folder className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="mt-1 text-black dark:text-white text-shadow px-2 py-0.5 rounded-md bg-white/20 dark:bg-black/20 backdrop-blur-sm text-xs sm:text-sm">
              About Me
            </span>
          </div>
        </button>
        <button
          className="flex flex-col items-center"
          onClick={() => toggleWindow('projects')}
        >
          <div className="group flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-b from-green-500/90 to-green-600/90 dark:from-green-600/90 dark:to-green-700/90 rounded-xl flex items-center justify-center shadow-lg border border-white/20 dark:border-white/10 group-hover:scale-105 transition-transform">
              <Folder className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="mt-1 text-black dark:text-white text-shadow px-2 py-0.5 rounded-md bg-white/20 dark:bg-black/20 backdrop-blur-sm text-xs sm:text-sm">
              Projects
            </span>
          </div>
        </button>
        <button
          className="flex flex-col items-center"
          onClick={() => toggleWindow('contact')}
        >
          <div className="group flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-b from-yellow-500/90 to-yellow-600/90 dark:from-yellow-600/90 dark:to-yellow-700/90 rounded-xl flex items-center justify-center shadow-lg border border-white/20 dark:border-white/10 group-hover:scale-105 transition-transform">
              <Folder className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="mt-1 text-black dark:text-white text-shadow px-2 py-0.5 rounded-md bg-white/20 dark:bg-black/20 backdrop-blur-sm text-xs sm:text-sm">
              Contact
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}

