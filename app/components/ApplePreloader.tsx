import React from 'react'

const ApplePreloader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 p-10">
      <div className="text-black dark:text-white animate-apple-bounce mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-wide text-center">
          EKASPREET SINGH ATWAL
        </h1>
      </div>
      {/* Circular Loader */}
      <div className="w-12 h-12 border-4 border-t-transparent border-gray-400 dark:border-gray-600 rounded-full animate-spin"></div>
    </div>
  )
}

export default ApplePreloader
