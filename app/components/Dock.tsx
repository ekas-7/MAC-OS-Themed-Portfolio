import { 
  Music, 
  Code, 
  Globe, 
  Terminal,
  User,
  Briefcase,
  Mail,
  File, // Import File icon
  Gamepad2 // Import Gamepad2 icon for the game
} from 'lucide-react'
import {  ReactNode } from 'react'
import { ClipboardList } from 'lucide-react';


interface DockItemProps {
  label: string;
  onClick: () => void;
  children: ReactNode;
}

interface DockProps {
  toggleWindow: (id: string) => void;
}

const DockItem = ({ label, onClick, children }: DockItemProps) => (
  <div className="group relative flex flex-col items-center">
    <button
      onClick={onClick}
      className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl 
        bg-gradient-to-br from-gray-100/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 
        backdrop-blur-lg flex items-center justify-center text-sm sm:text-lg lg:text-xl 
        border border-black/5 dark:border-white/10 
        shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
        group-hover:scale-110 group-hover:-translate-y-1 
        group-hover:from-white/60 group-hover:to-gray-100/60 
        dark:group-hover:from-gray-700/60 dark:group-hover:to-gray-800/60"
    >
      {children}
    </button>
    <div className="absolute -top-8 sm:-top-10 scale-0 group-hover:scale-100 transition-all duration-200 z-50">
      <div className="relative px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
        rounded-lg text-xs font-medium shadow-lg whitespace-nowrap">
        {label}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 
          bg-white dark:bg-gray-900 rotate-45"></div>
      </div>
    </div>
  </div>
)

export default function Dock({ toggleWindow }: DockProps) {
  return (
    <div className="fixed bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 w-auto max-w-[95vw]">
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 px-2 sm:px-4 py-2
        bg-gradient-to-br from-white/70 to-gray-100/70 
        dark:from-gray-900/70 dark:to-gray-800/70 
        backdrop-blur-xl rounded-lg sm:rounded-xl shadow-2xl 
        border border-black/5 dark:border-white/10 
        transition-all duration-300 overflow-x-auto"
        >
        <DockItem label="About" onClick={() => toggleWindow('about')}>
          <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Projects" onClick={() => toggleWindow('projects')}>
          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Contact" onClick={() => toggleWindow('contact')}>
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Music" onClick={() => toggleWindow('music-player')}>
          <Music className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="VSCode" onClick={() => toggleWindow('vscode')}>
          <Code className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Browser" onClick={() => toggleWindow('browser')}>
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Terminal" onClick={() => toggleWindow('terminal')}>
          <Terminal className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Resume" onClick={() => toggleWindow('resume')}>
          <File className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Work Experience" onClick={() => toggleWindow('work-experience')}>
          <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Pac-Man Game" onClick={() => toggleWindow('pacman-game')}>
          <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>
      </div>
    </div>
  )
}
