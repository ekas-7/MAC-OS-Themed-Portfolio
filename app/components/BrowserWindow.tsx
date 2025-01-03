import React from 'react'
import { ArrowLeft, ArrowRight, RefreshCw, Home } from 'lucide-react'

const BrowserWindow: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full h-full flex flex-col overflow-hidden">
      <div className="bg-gray-200 dark:bg-gray-700 p-2 flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 flex items-center bg-white dark:bg-gray-600 rounded px-2">
          <ArrowLeft size={12} className="text-gray-500 dark:text-gray-400 mr-2" />
          <ArrowRight size={12} className="text-gray-500 dark:text-gray-400 mr-2" />
          <RefreshCw size={12} className="text-gray-500 dark:text-gray-400 mr-2" />
          <Home size={12} className="text-gray-500 dark:text-gray-400 mr-2" />
          <input 
            type="text" 
            value="https://portfolio.com" 
            readOnly 
            className="bg-transparent text-xs sm:text-sm flex-1 outline-none text-gray-700 dark:text-gray-300"
          />
        </div>
      </div>
      <div className="flex-1 bg-white dark:bg-gray-800 p-2 sm:p-4 overflow-auto">
        <h1 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-800 dark:text-white">Welcome to My Portfolio</h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-4">
          Hi, I'm a web developer passionate about creating beautiful and functional websites.
        </p>
        <h2 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800 dark:text-white">My Projects</h2>
        <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          <li>Project 1: E-commerce Website</li>
          <li>Project 2: Weather App</li>
          <li>Project 3: Task Management System</li>
        </ul>
      </div>
    </div>
  )
}

export default BrowserWindow

