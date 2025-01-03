import React, { useState, useRef, useEffect } from 'react'
import { 
  Github, 
  Linkedin, 
  X, 
  Instagram, 
  Mail,
  ArrowRight 
} from 'lucide-react'

interface WindowProps {
  id: string
  title: string
  onClose: () => void
}

const DraggableWindow = ({ id, title, onClose }: WindowProps) => {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [size, setSize] = useState({ width: 800, height: 600 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      url: "github.com/ekas-7",
      color: "hover:text-purple-600 dark:hover:text-purple-400"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      url: "linkedin.com/in/ekas7",
      color: "hover:text-blue-600 dark:hover:text-purple-400"
    },
    {
      icon: <X className="w-6 h-6" />,
      label: "X",
      url: "twitter.com/Ekas_7",
      color: "hover:text-sky-500 dark:hover:text-purple-400"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram",
      url: "instagram.com/ekas_7",
      color: "hover:text-pink-600 dark:hover:text-purple-400"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      url: "mailto:ekasatwal.work@gmail.com",
      color: "hover:text-red-500 dark:hover:text-purple-400"
    }
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
      if (isResizing && windowRef.current) {
        const newWidth = Math.max(300, e.clientX - position.x)
        const newHeight = Math.max(200, e.clientY - position.y)
        setSize({ width: newWidth, height: newHeight })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, dragOffset, position])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
    e.stopPropagation()
  }

  const handleMaximize = () => {
    if (windowRef.current) {
      setPosition({ x: 0, y: 0 })
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
  }

  return (
    <div
      ref={windowRef}
      className="absolute bg-white/25 dark:bg-black/25 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/10"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      <div
        className="bg-gray-100/80 dark:bg-gray-800/80 h-8 flex items-center justify-between px-3 cursor-move backdrop-blur-sm border-b border-white/10"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <button className="w-3 h-3 rounded-full bg-red-500" onClick={onClose} />
          <button className="w-3 h-3 rounded-full bg-yellow-500" />
          <button className="w-3 h-3 rounded-full bg-green-500" onClick={handleMaximize} />
        </div>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</span>
        <div className="w-16" />
      </div>
      
      <div className="bg-white/50 dark:bg-black/50 backdrop-blur-md p-6 overflow-auto" style={{ height: `calc(100% - 2rem)` }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Connect With Me
          </h1>
          
          <div className="grid gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={`https://${link.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                  transition-all duration-300 hover:shadow-lg ${link.color}
                  bg-white/80 dark:bg-gray-700/80 group`}
              >
                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-600 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {link.label}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {link.url}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-transparent"
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  )
}

export default DraggableWindow