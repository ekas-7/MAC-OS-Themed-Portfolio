import { useState, useRef, useEffect } from 'react'
import { X, Minus, Square } from 'lucide-react'

interface WindowProps {
  id: string
  title: string
  children: React.ReactNode
  onClose: () => void
}

export default function Window({ id, title, children, onClose }: WindowProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

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

  return (
    <div
      ref={windowRef}
      className="absolute bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 transition-colors duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: 'calc(100% - 2rem)',
        height: 'calc(100% - 6rem)',
        maxWidth: '800px',
        maxHeight: '600px',
      }}
    >
      <div
        className="bg-gray-100/80 dark:bg-gray-800/80 h-8 flex items-center justify-between px-3 cursor-move backdrop-blur-sm border-b border-white/10 dark:border-white/5 transition-colors duration-300"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <button className="w-3 h-3 rounded-full bg-red-500" onClick={onClose} />
          <button className="w-3 h-3 rounded-full bg-yellow-500" />
          <button className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</span>
        <div className="w-16" />
      </div>
      <div className="bg-white/50 dark:bg-black/50 backdrop-blur-md p-4 h-[calc(100%-2rem)] overflow-auto text-gray-800 dark:text-gray-200 transition-colors duration-300">{children}</div>
    </div>
  )
}

