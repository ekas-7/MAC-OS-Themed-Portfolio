import { 
  Music, 
  Code, 
  Globe, 
  Terminal,
  User,
  Briefcase,
  Mail,
  File // Import File icon
} from 'lucide-react'
import {  ReactNode } from 'react'


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
      className="relative w-10 h-10 sm:w-10 sm:h-10 rounded-xl 
        bg-gradient-to-br from-gray-100/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 
        backdrop-blur-lg flex items-center justify-center text-lg sm:text-xl 
        border border-black/5 dark:border-white/10 
        shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
        group-hover:scale-110 group-hover:-translate-y-1 
        group-hover:from-white/60 group-hover:to-gray-100/60 
        dark:group-hover:from-gray-700/60 dark:group-hover:to-gray-800/60"
    >
      {children}
    </button>
    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200">
      <div className="relative px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
        rounded-lg text-xs font-medium shadow-lg">
        {label}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 
          bg-white dark:bg-gray-900 rotate-45"></div>
      </div>
    </div>
  </div>
)

export default function Dock({ toggleWindow }: DockProps) {
  

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 sm:w-auto max-w-[98%] ">
      <div className="flex items-center gap-1.5  sm:gap-3 px-4 py-2 
        bg-gradient-to-br from-white/70 to-gray-100/70 
        dark:from-gray-900/70 dark:to-gray-800/70 
        backdrop-blur-xl rounded-xl shadow-2xl 
        border border-black/5 dark:border-white/10 
        transition-all duration-300">
        <DockItem label="About" onClick={() => toggleWindow('about')}>
          <User className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Projects" onClick={() => toggleWindow('projects')}>
          <Briefcase className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Contact" onClick={() => toggleWindow('contact')}>
          <Mail className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Music" onClick={() => toggleWindow('music-player')}>
          <Music className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="VSCode" onClick={() => toggleWindow('vscode')}>
          <Code className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Browser" onClick={() => toggleWindow('browser')}>
          <Globe className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        <DockItem label="Terminal" onClick={() => toggleWindow('terminal')}>
          <Terminal className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>

        {/* Added Resume item */}
        <DockItem label="Resume" onClick={() => toggleWindow('resume')}>
          <File className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600/80 dark:text-white/80 
            group-hover:text-gray-900 dark:group-hover:text-white" />
        </DockItem>
      </div>

      
    </div>
  )
}
