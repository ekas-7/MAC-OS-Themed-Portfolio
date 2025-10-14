import { useState, useRef, useEffect } from "react";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Window({ children, onClose }: WindowProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeOffset, setResizeOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const windowRef = useRef<HTMLDivElement>(null);

  const updateDeviceType = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 768);
    
    // Set appropriate default sizes based on screen size
    if (width <= 480) {
      // Mobile phones
      setSize({ width: width * 0.95, height: window.innerHeight * 0.8 });
      setPosition({ x: width * 0.025, y: 40 });
    } else if (width <= 768) {
      // Tablets
      setSize({ width: width * 0.9, height: window.innerHeight * 0.7 });
      setPosition({ x: width * 0.05, y: 50 });
    } else if (width <= 1024) {
      // Small desktops
      setSize({ width: 700, height: 500 });
      setPosition({ x: 50, y: 60 });
    } else {
      // Large desktops
      setSize({ width: 800, height: 600 });
      setPosition({ x: 50, y: 60 });
    }
  };

  useEffect(() => {
    updateDeviceType();
    
    const handleResize = () => {
      updateDeviceType();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    // Disable dragging on mobile devices
    if (isMobile) return;
    
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
      if (isMobile) {
        setPosition({ x: 0, y: 32 });
        setSize({
          width: window.innerWidth,
          height: window.innerHeight - 32,
        });
      } else {
        setPosition({ x: 0, y: 32 });
        setSize({
          width: window.innerWidth,
          height: window.innerHeight - 32,
        });
      }
      setIsMaximized(true);
      setIsMinimized(false);
    }
  };

  const handleMinimize = () => {
    if (windowRef.current) {
      // Reset to responsive default size
      updateDeviceType();
      setIsMaximized(false);
      setIsMinimized(true);
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    // Disable resizing on mobile devices
    if (isMobile) return;
    
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
      className={`absolute bg-white/25 dark:bg-black/25 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 transition-all duration-300 ${
        isMobile ? 'rounded-lg' : 'rounded-xl'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        minWidth: isMobile ? '300px' : '400px',
        minHeight: isMobile ? '200px' : '300px',
        maxWidth: isMobile ? '100vw' : 'none',
        maxHeight: isMobile ? '100vh' : 'none',
        transition:
          isMaximized || isMinimized
            ? "width 0.3s ease, height 0.3s ease"
            : "none",
      }}
    >
      <div
        className={`bg-gray-100/80 dark:bg-gray-800/80 h-8 sm:h-8 flex items-center justify-between px-3 backdrop-blur-sm border-b border-white/10 dark:border-white/5 transition-colors duration-300 ${
          isMobile ? 'cursor-default' : 'cursor-move'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <button
            className="w-4 h-4 sm:w-3 sm:h-3 lg:w-3 lg:h-3 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
            onClick={onClose}
          >
            <X className="w-2 h-2 sm:w-2 sm:h-2 text-white" />
          </button>

          <button
            className="w-4 h-4 sm:w-3 sm:h-3 lg:w-3 lg:h-3 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-600 transition-colors"
            onClick={handleMinimize}
          >
            <Minus className="w-2 h-2 sm:w-2 sm:h-2 text-white" />
          </button>

          <button
            className="w-4 h-4 sm:w-3 sm:h-3 lg:w-3 lg:h-3 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
            onClick={handleMaximize}
          >
            <Square className="w-2 h-2 sm:w-2 sm:h-2 text-white" />
          </button>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-black/50 backdrop-blur-md h-[calc(100%-2rem)] overflow-auto text-gray-800 dark:text-gray-200 transition-colors duration-300">
        {children}
      </div>
      
      {!isMobile && (
        <div
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize"
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
}
