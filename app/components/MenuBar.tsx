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
import WallpaperSelector from "./WallpaperSel";
import useBatteryStatus from "../hooks/useBatteryStatus";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
interface MenuBarProps {
  switchWallpaper: (wallpaperSrc: string) => void; // Define the prop type
}

const MenuBar: React.FC<MenuBarProps> = ({ switchWallpaper }) => {
  const { theme, toggleTheme } = useTheme() as ThemeContextType;
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const batteryStatus = useBatteryStatus();
  const wifiStrength: number = 3;
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isWallpaperSelectorOpen, setIsWallpaperSelectorOpen] = useState(false);

  

  const handleCloseWallpaperSelector = (): void => {
    setIsWallpaperSelectorOpen(false);
  };

  const handleSelectWallpaper = (wallpaper: string): void => {
    // Call the passed switchWallpaper function to change the wallpaper
    switchWallpaper(wallpaper);
    setIsWallpaperSelectorOpen(false); // Close the wallpaper selector after selection
  };
  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
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
  const handleOpenWallpaperSelector = (): void => {
    handleDrawerClose();
    setIsWallpaperSelectorOpen(true);
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
    const { level, charging } = batteryStatus;
    
    if (charging) {
      return <BatteryCharging className="w-4 h-4 text-green-500" />;
    }
    
    if (level > 80)
      return <BatteryFull className="w-4 h-4 text-black dark:text-white" />;
    if (level > 30)
      return <BatteryCharging className="w-4 h-4 text-black dark:text-white" />;
    return <BatteryLow className="w-4 h-4 text-red-500" />;
  };

  const renderWifiIcon = (): React.ReactNode => {
    if (wifiStrength === 3) return <Wifi className="w-4 h-4 text-black dark:text-white" />;
    if (wifiStrength === 2) return <Wifi className="w-4 h-4 text-yellow-500" />;
    if (wifiStrength === 1) return <Wifi className="w-4 h-4 text-red-500" />;
    return <WifiOff className="w-4 h-4 text-gray-500" />;
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
        className={`fixed top-0 left-0 right-0 h-8 sm:h-8 ${
          theme === "light"
            ? "bg-gradient-to-br from-white/70 to-gray-100/70 text-black"
            : "bg-gradient-to-br from-gray-900/70 to-gray-800/70 text-white"
        } backdrop-blur-xl flex items-center justify-between px-2 sm:px-4 z-50 transition-colors duration-300`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center space-x-1 sm:space-x-2">
          <span className="hidden md:block text-xs sm:text-sm">Ekaspreet Singh Atwal</span>
          <span className="md:hidden text-xs">E. S. Atwal</span>
          <LucideCopyright className="h-3 w-3 sm:h-4 sm:w-4 font-thin"/>
          <span className="text-xs sm:text-sm">2025</span>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <ChevronDown className="sm:hidden w-5 h-5" />
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-0.5 sm:p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-black/25 transition-colors"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 sm:w-4 sm:h-4" />
            ) : (
              <Sun className="w-4 h-4 sm:w-4 sm:h-4" />
            )}
          </button>
          
          <Settings
            onClick={handleOpenWallpaperSelector}
            className="w-4 h-4 sm:w-4 sm:h-4 hover:scale-110 transition-transform cursor-pointer"
          />
          
          <div className="relative group">
            {renderBatteryIcon()}
            <span className="absolute top-6 sm:top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {batteryStatus.level}% {batteryStatus.charging ? '⚡' : ''}
            </span>
          </div>

          <div className="relative group">
            {renderWifiIcon()}
            <span className="absolute top-6 sm:top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {`${wifiStrength * 33}%`}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={handleCalendarClick}
              aria-label="Toggle calendar"
              className={`text-xs sm:text-sm ${theme === "light" ? "text-black" : "text-white"}`}
            >
              {formatDate(dateTime)}
            </button>
            {isCalendarOpen && (
              <div className="absolute top-6 sm:top-8 left-[0%] transform -translate-x-1/2 z-10 sm:block hidden">
                <Calendar />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              aria-label="Display time"
              className={`text-xs sm:text-sm ${theme === "light" ? "text-black" : "text-white"}`}
            >
              {formatTime(dateTime)}
            </button>
          </div>

          <button
            onClick={handleFullscreenToggle}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="p-0.5 sm:p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors hidden sm:block"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 sm:w-4 sm:h-4" />
            ) : (
              <Maximize2 className="w-4 h-4 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </div>

      <div
        ref={drawerRef}
        className={`fixed top-8 left-0 right-0 sm:hidden ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        } shadow-lg transition-transform duration-300 ease-in-out z-40`}
        style={{
          transform: isDrawerOpen ? 'translateY(100%)' : 'translateY(-100%)',
          height: 'auto',
          maxHeight: '80vh'
        }}
      >
        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">Ekaspreet Singh Atwal</span>
            <div className="flex items-center space-x-1">
              <LucideCopyright className="h-3 w-3" />
              <span className="text-sm">2025</span>
            </div>
            <button onClick={handleDrawerClose} aria-label="Close Drawer" className="p-1 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
            
            
          <div className="flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"  onClick={handleOpenWallpaperSelector } >
          <Settings
            className="h-5 w-5"
          />
              <span>Change Background</span>
            </div>
            <div className="flex items-center space-x-3 p-3">
              {renderBatteryIcon()}
              <span>Battery: {batteryStatus.level}% {batteryStatus.charging ? '(Charging)' : ''}</span>
            </div>

            <div className="flex items-center space-x-3 p-3">
              {renderWifiIcon()}
              <span>WiFi Strength: {wifiStrength * 33}%</span>
            </div>

            <div className="p-3">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
      {isWallpaperSelectorOpen && (
        <WallpaperSelector
          onSelectWallpaper={handleSelectWallpaper}
          closeWindow={handleCloseWallpaperSelector}
        />
      )}
    </>
  );
};

export default MenuBar;
