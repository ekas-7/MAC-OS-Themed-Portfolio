import { useState, useEffect, useRef } from "react";
import {
  Wifi,
  WifiOff,
  BatteryFull,
  BatteryLow,
  BatteryCharging,
  Sun,
  Moon,
  Settings,
  Maximize2,
  Minimize2,
  LucideCopyright,
  ChevronDown,
  X
} from "lucide-react"; // Import close icon
import { useTheme } from "../contexts/ThemeContext";
import Calendar from "./Calendar";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}


const MenuBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme() as ThemeContextType;
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [batteryLevel, setBatteryLevel] = useState<number>(100);
  const wifiStrength: number = 3;
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setBatteryLevel((prev) => (prev > 10 ? prev - 1 : 100));
    }, 5000);

    return () => clearInterval(batteryInterval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    if (deltaY > 0 && deltaY < 300 && drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = (): void => {
    const deltaY = currentY.current - startY.current;
    if (!drawerRef.current) return;

    if (deltaY > 50) {
      setIsDrawerOpen(true);
      drawerRef.current.style.transform = 'translateY(100%)';
    } else {
      setIsDrawerOpen(false);
      drawerRef.current.style.transform = 'translateY(0)';
    }
  };

  const handleDrawerClose = (): void => {
    setIsDrawerOpen(false);
    if (drawerRef.current) {
      drawerRef.current.style.transform = 'translateY(-100%)';
    }
  };

  const handleCalendarClick = (): void => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleFullscreenToggle = async (): Promise<void> => {
    if (isFullscreen) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const renderBatteryIcon = (): React.ReactNode => {
    if (batteryLevel > 80)
      return <BatteryFull className="sm:w-4 w-6 sm:h-4 h-6 text-black dark:text-white" />;
    if (batteryLevel > 30)
      return <BatteryCharging className="sm:w-4 w-6 sm:h-4 h-6 text-black dark:text-white" />;
    return <BatteryLow className="sm:w-4 w-6 sm:h-4 h-6 text-red-500" />;
  };

  const renderWifiIcon = (): React.ReactNode => {
    if (wifiStrength === 3) return <Wifi className="sm:w-4 w-6 sm:h-4 h-6 text-black dark:text-white" />;
    if (wifiStrength === 2) return <Wifi className="sm:w-4 w-6 sm:h-4 h-6 text-yellow-500" />;
    if (wifiStrength === 1) return <Wifi className="sm:w-4 w-6 sm:h-4 h-6 text-red-500" />;
    return <WifiOff className="sm:w-4 w-6 sm:h-4 h-6 text-gray-500" />;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 sm:h-8 h-9 ${
          theme === "light"
            ? "bg-gradient-to-br from-white/70 to-gray-100/70 text-black"
            : "bg-gradient-to-br from-gray-900/70 to-gray-800/70 text-white"
        } backdrop-blur-xl flex items-center sm:justify-between px-4 z-50 transition-colors duration-300 justify-evenly`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center space-x-2">
          <span className="hidden sm:block">Ekaspreet Singh Atwal</span>
          <LucideCopyright className="sm:h-4 h-6 sm:w-4 w-6 font-thin hidden sm:block"/>
          <span className="hidden sm:block">2025</span>
        </div>
        
        <div className="flex items-center space-x-4 sm:space-x-2">
          <ChevronDown className="sm:hidden w-6 h-6" />
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-black/25 transition-colors"
          >
            {theme === "light" ? (
              <Moon className="sm:w-4 w-6 sm:h-4 h-6" />
            ) : (
              <Sun className="sm:w-4 w-6 sm:h-4 h-6" />
            )}
          </button>
          
          <Settings className="sm:w-4 w-6 sm:h-4 h-6 hover:scale-110 transition-transform" />
          
          <div className="relative group">
            {renderBatteryIcon()}
            <span className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {batteryLevel}%
            </span>
          </div>

          <div className="relative group">
            {renderWifiIcon()}
            <span className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {`${wifiStrength * 33}%`}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={handleCalendarClick}
              aria-label="Toggle calendar"
              className={`text-md sm:text-sm ${theme === "light" ? "text-black" : "text-white"}`}
            >
              {formatDate(dateTime)}
            </button>
            {isCalendarOpen && (
              <div className="absolute top-8 left-[0%] transform -translate-x-1/2 z-10 sm:block hidden">
                <Calendar />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              aria-label="Display time"
              className={`sm:text-sm text-md ${theme === "light" ? "text-black" : "text-white"}`}
            >
              {formatTime(dateTime)}
            </button>
          </div>

          <button
            onClick={handleFullscreenToggle}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors hidden sm:block"
          >
            {isFullscreen ? (
              <Minimize2 className="sm:w-4 w-6 sm:h-4 h-6" />
            ) : (
              <Maximize2 className="sm:w-4 w-6 sm:h-4 h-6" />
            )}
          </button>
        </div>
      </div>

      <div
        ref={drawerRef}
        className={`fixed top-9 left-0 right-0 sm:hidden ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        } shadow-lg transition-transform duration-300 ease-in-out z-40`}
        style={{
          transform: isDrawerOpen ? 'translateY(100%)' : 'translateY(-100%)',
          height: 'auto',
          maxHeight: '80vh'
        }}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Ekaspreet Singh Atwal</span>
            <div className="flex items-center space-x-2">
              <LucideCopyright className="h-4 w-4" />
              <span>2025</span>
            </div>
            <button onClick={handleDrawerClose} aria-label="Close Drawer" className="p-1 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-6 h-6" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-6 h-6" />
                  <span>Light Mode</span>
                </>
              )}
            </button>

            <div className="flex items-center space-x-2 p-2">
              {renderBatteryIcon()}
              <span>Battery: {batteryLevel}%</span>
            </div>

            <div className="flex items-center space-x-2 p-2">
              {renderWifiIcon()}
              <span>WiFi Strength: {wifiStrength * 33}%</span>
            </div>

            <div className="p-2">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
