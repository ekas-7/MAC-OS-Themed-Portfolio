import { useState, useRef, useEffect } from "react";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Window({ id, title, children, onClose }: WindowProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeOffset, setResizeOffset] = useState({ x: 0, y: 0 });

  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isMinimized) {
        setIsMinimized(false);
      }
      if (isMaximized) {
        setIsMaximized(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isMinimized, isMaximized]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
      if (isResizing) {
        setSize({
          width: e.clientX - windowRef.current!.offsetLeft - resizeOffset.x,
          height: e.clientY - windowRef.current!.offsetTop - resizeOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, isResizing, resizeOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMaximize = () => {
    if (windowRef.current) {
      setPosition({ x: 5, y: 35 });
      setSize({
        width: window.innerWidth - 10,
        height: window.innerHeight - 40,
      });
      setIsMaximized(true);
      setIsMinimized(false);
    }
  };

  const handleMinimize = () => {
    if (windowRef.current) {
      setPosition({ x: 50, y: 50 });
      setSize({ width: 800, height: 600 });
      setIsMaximized(false);
      setIsMinimized(true);
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    const rect = windowRef.current!.getBoundingClientRect();
    setResizeOffset({
      x: e.clientX - rect.right,
      y: e.clientY - rect.bottom,
    });
    setIsResizing(true);
  };

  return (
    <div
      ref={windowRef}
      className="absolute bg-white/25 dark:bg-black/25 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 transition-all duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        transition:
          isMaximized || isMinimized
            ? "width 0.3s ease, height 0.3s ease"
            : "none",
      }}
    >
      <div
        className="bg-gray-100/80 dark:bg-gray-800/80 h-8 flex items-center justify-between px-3 cursor-move backdrop-blur-sm border-b border-white/10 dark:border-white/5 transition-colors duration-300"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <button
            className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center"
            onClick={onClose}
          >
            <X className="w-4 h-4 p-0.5 text-white dark:text-black" />
          </button>

          <button
            className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center"
            onClick={handleMinimize}
          >
            <Minus className="w-4 h-4 p-0.5 text-white dark:text-black" />
          </button>

          <button
            className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center"
            onClick={handleMaximize}
          >
            <Square className="w-4 h-4 p-0.5 text-white dark:text-black" />
          </button>
        </div>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </span>
        <div className="w-16" />
      </div>
      <div className="bg-white/50 dark:bg-black/50 backdrop-blur-md  h-[calc(100%-2rem)] overflow-auto text-gray-800 dark:text-gray-200 transition-colors duration-300">
        {children}
      </div>
      <div
        className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize "
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
}
