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
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import Calendar from "./Calendar";

export default function MenuBar() {
  const { theme, toggleTheme } = useTheme();
  const [dateTime, setDateTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [wifiStrength, setWifiStrength] = useState(3);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    const batteryInterval = setInterval(() => {
      setBatteryLevel((prev) => (prev > 10 ? prev - 1 : 100));
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearInterval(batteryInterval);
    };
  }, []);

  const renderBatteryIcon = () => {
    if (batteryLevel > 80)
      return <BatteryFull className="w-4 h-4 text-green-500" />;
    if (batteryLevel > 30)
      return <BatteryCharging className="w-4 h-4 text-yellow-500" />;
    return <BatteryLow className="w-4 h-4 text-red-500" />;
  };

  const renderWifiIcon = () => {
    if (wifiStrength === 3) return <Wifi className="w-4 h-4 text-green-500" />;
    if (wifiStrength === 2) return <Wifi className="w-4 h-4 text-yellow-500" />;
    if (wifiStrength === 1) return <Wifi className="w-4 h-4 text-red-500" />;
    return <WifiOff className="w-4 h-4 text-gray-500" />;
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
      className={`fixed top-0 left-0 right-0 h-7 ${
        theme === "light"
          ? "bg-white/25 text-black"
          : "bg-gray-800/25 text-white"
      } backdrop-blur-xl flex items-center sm:justify-between px-4 z-50 transition-colors duration-300 justify-evenly`}
    >
      <div className="flex items-center space-x-4">
        <span className="font-semibold hidden sm:block">Ekaspreet Singh Atwal</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </button>
        <Settings className="w-4 h-4 hover:scale-110 transition-transform" />
        <div className="relative group">
          {renderBatteryIcon()}
          <span className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {batteryLevel}%
          </span>
        </div>
        <div className="relative group">
          {renderWifiIcon()}
          <span className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-gray-800  text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {wifiStrength === 0 ? "No Signal" : `${wifiStrength * 33}%`}
          </span>
        </div>

        <div className="relative">
          <button
            onClick={handleCalendarClick}
            className={`text-sm ${
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
            className={`text-sm ${
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
          className="p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors hidden sm:block"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
