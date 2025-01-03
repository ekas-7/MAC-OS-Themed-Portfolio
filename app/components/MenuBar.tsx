import { Apple, Wifi, Battery, Search, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function MenuBar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-white/25 dark:bg-black/25 backdrop-blur-xl flex items-center justify-between px-4 text-black dark:text-white z-50 transition-colors duration-300">
      <div className="flex items-center space-x-4">
        <Apple className="w-4 h-4" />
        <span className="font-semibold">Portfolio</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Window</span>
        <span>Help</span>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={toggleTheme} className="p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors">
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
        <Battery className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Search className="w-4 h-4" />
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  )
}

