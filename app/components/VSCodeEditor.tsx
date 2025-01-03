import React from 'react'
import { File, Folder } from 'lucide-react'

const VSCodeEditor: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-2 sm:p-4 rounded-lg shadow-lg w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <div className="flex space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs sm:text-sm">portfolio.tsx - macOS Portfolio</div>
        <div></div>
      </div>
      <div className="flex flex-1 text-xs sm:text-sm">
        <div className="w-1/4 border-r border-gray-700 pr-2">
          <div className="flex items-center mb-2">
            <Folder size={14} className="mr-2" />
            <span>project</span>
          </div>
          <div className="pl-4">
            <div className="flex items-center">
              <File size={12} className="mr-2" />
              <span>index.tsx</span>
            </div>
            <div className="flex items-center">
              <File size={12} className="mr-2" />
              <span>styles.css</span>
            </div>
          </div>
        </div>
        <div className="w-3/4 pl-2 sm:pl-4 overflow-auto">
          <pre className="text-xs sm:text-sm">
            <code>{`import React from 'react';

const Portfolio = () => {
  return (
    <div>
      <h1>Welcome to my Portfolio</h1>
      <p>Here are some of my projects:</p>
      <ul>
        <li>Project 1</li>
        <li>Project 2</li>
        <li>Project 3</li>
      </ul>
    </div>
  );
};

export default Portfolio;`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default VSCodeEditor

