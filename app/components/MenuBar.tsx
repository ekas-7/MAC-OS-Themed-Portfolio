import { useState, useEffect } from "react";
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
  LucideCopyright
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import Calendar from "./Calendar";

export default function MenuBar() {
  const { theme, toggleTheme } = useTheme();
  const [dateTime, setDateTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const wifiStrength = 3;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update Date and Time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Update Battery Level (simulated)
  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setBatteryLevel((prev) => (prev > 10 ? prev - 1 : 100));
    }, 5000);

    return () => {
      clearInterval(batteryInterval);
    };
  }, []);

  const renderBatteryIcon = () => {
    if (batteryLevel > 80)
      return <BatteryFull className="sm:w-4 w-6 sm:h-4 h-6 text-green-500" />;
    if (batteryLevel > 30)
      return <BatteryCharging className="sm:w-4 w-6 sm:h-4 h-6 text-yellow-500" />;
    return <BatteryLow className="sm:w-4 w-6 sm:h-4 h-6 text-red-500" />;
  };

  const renderWifiIcon = () => {
    if (wifiStrength === 3) return <Wifi className="sm:w-4 w-6 sm:h-4 h-6 text-green-500" />;
    if (wifiStrength === 2) return <Wifi className="sm:w-4 w-6 sm:h-4 h-6 text-yellow-500" />;
    if (wifiStrength === 1) return <Wifi className="sm:w-4 w-6 sm:h-4 h-6 text-red-500" />;
    return <WifiOff className="sm:w-4 w-6 sm:h-4 h-6 text-gray-500" />;
  };

  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleFullscreenToggle = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 sm:h-7 h-9 ${
        theme === "light"
          ? "bg-white/25 text-black"
          : "bg-black/25 text-white"
      } backdrop-blur-xl flex items-center sm:justify-between px-4 z-50 transition-colors duration-300 justify-evenly`}
    >
      <div className="flex items-center space-x-2">
     
        <span className="font-semibold hidden sm:block">Ekaspreet Singh Atwal</span>
        <LucideCopyright className=" sm:h-4 h-6 sm:w-4 w-6 font-thin hidden sm:block"/>
        <span className=" hidden sm:block">2025</span>
        
      </div>
      <div className="flex items-center space-x-4 sm:space-x-2">
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
        <Settings className="sm:w-4 w-6 sm:h-4 h-6 hover:scale-110 transition-transform " />
        <div className="relative group ">
          {renderBatteryIcon()}
          <span className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {batteryLevel}%
          </span>
        </div>
        <div className="relative group ">
          {renderWifiIcon()}
          <span className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {`${wifiStrength * 33}%`}
          </span>
        </div>

        <div className="relative  ">
          <button
            onClick={handleCalendarClick}
            aria-label="Toggle calendar"
            className={`text-xl sm:text-sm ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {dateTime.toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}  
          </button>
          {isCalendarOpen && (
            <div className="absolute top-7 right-0 z-10">
              <Calendar /> 
            </div>
          )}
        </div>

        <div className="relative">
          <button
            aria-label="Display time"
            className={`sm:text-sm text-xl ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {dateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
  );
}
