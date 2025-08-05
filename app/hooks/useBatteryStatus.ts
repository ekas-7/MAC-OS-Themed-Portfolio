import { useState, useEffect } from 'react';

interface BatteryStatus {
  level: number;
  charging: boolean;
  chargingTime: number | null;
  dischargingTime: number | null;
  supported: boolean;
}

interface BatteryManager {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
}

declare global {
  interface Navigator {
    getBattery?: () => Promise<BatteryManager>;
  }
}

const useBatteryStatus = (): BatteryStatus => {
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>({
    level: 100,
    charging: false,
    chargingTime: null,
    dischargingTime: null,
    supported: false,
  });

  useEffect(() => {
    let battery: BatteryManager | null = null;

    const updateBatteryStatus = () => {
      if (battery) {
        setBatteryStatus({
          level: Math.round(battery.level * 100),
          charging: battery.charging,
          chargingTime: battery.chargingTime === Infinity ? null : battery.chargingTime,
          dischargingTime: battery.dischargingTime === Infinity ? null : battery.dischargingTime,
          supported: true,
        });
      }
    };

    const initBattery = async () => {
      try {
        if ('getBattery' in navigator) {
          battery = await navigator.getBattery!();
          updateBatteryStatus();

          // Add event listeners for battery status changes
          battery.addEventListener('chargingchange', updateBatteryStatus);
          battery.addEventListener('levelchange', updateBatteryStatus);
          battery.addEventListener('chargingtimechange', updateBatteryStatus);
          battery.addEventListener('dischargingtimechange', updateBatteryStatus);
        } else {
          // Fallback for browsers that don't support the Battery API
          setBatteryStatus(prevStatus => ({
            ...prevStatus,
            supported: false,
          }));
        }
      } catch (error) {
        console.warn('Battery Status API not supported or access denied:', error);
        setBatteryStatus(prevStatus => ({
          ...prevStatus,
          supported: false,
        }));
      }
    };

    initBattery();

    return () => {
      if (battery) {
        battery.removeEventListener('chargingchange', updateBatteryStatus);
        battery.removeEventListener('levelchange', updateBatteryStatus);
        battery.removeEventListener('chargingtimechange', updateBatteryStatus);
        battery.removeEventListener('dischargingtimechange', updateBatteryStatus);
      }
    };
  }, []);

  return batteryStatus;
};

export default useBatteryStatus;
