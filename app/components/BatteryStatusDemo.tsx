import React from 'react';
import useBatteryStatus from '../hooks/useBatteryStatus';

const BatteryStatusDemo: React.FC = () => {
  const batteryStatus = useBatteryStatus();

  const formatTime = (seconds: number | null) => {
    if (!seconds || seconds === Infinity) return 'Unknown';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Battery Status
      </h3>
      
      {!batteryStatus.supported ? (
        <p className="text-red-500">
          Battery Status API not supported in this browser/environment
        </p>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Level:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {batteryStatus.level}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Status:</span>
            <span className={`font-medium ${batteryStatus.charging ? 'text-green-600' : 'text-gray-800 dark:text-white'}`}>
              {batteryStatus.charging ? 'Charging ⚡' : 'Discharging'}
            </span>
          </div>
          
          {batteryStatus.charging && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Time to full:</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {formatTime(batteryStatus.chargingTime)}
              </span>
            </div>
          )}
          
          {!batteryStatus.charging && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Time remaining:</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {formatTime(batteryStatus.dischargingTime)}
              </span>
            </div>
          )}
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                batteryStatus.level > 50 
                  ? 'bg-green-500' 
                  : batteryStatus.level > 20 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
              }`}
              style={{ width: `${batteryStatus.level}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BatteryStatusDemo;
