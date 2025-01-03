import React from 'react'


const ApplePreloader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50 p-10">
      <div className="text-black dark:text-white animate-apple-bounce">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-wide text-center">
          EKASPREET SINGH ATWAL
        </h1>
      </div>
    </div>
  )
}

export default ApplePreloader
