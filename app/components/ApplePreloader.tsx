'use client'

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { DigitalRain } from './DigitalRain'; // Import the DigitalRain component

const OSBootPreloader = () => {
  const [bootSteps, setBootSteps] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const bootSequence = useMemo(() => [
    { text: 'Initializing BIOS...', delay: 500 },
    { text: 'Performing POST (Power-On Self-Test)...', delay: 600 },
    { text: 'Detecting hardware components...', delay: 400 },
    { text: 'Loading boot loader...', delay: 300 },
    { text: 'Initializing kernel...', delay: 500 },
    { text: 'Mounting root filesystem...', delay: 400 },
    { text: 'Starting system services...', delay: 600 },
    { text: 'Configuring network interfaces...', delay: 400 },
    { text: 'Initializing graphical subsystem...', delay: 500 },
    { text: 'Loading user environment...', delay: 300 },
    { text: 'Performing final system checks...', delay: 400 },
    { text: 'SYSTEM READY', delay: 1000 },
  ], []);

  const addBootStep = useCallback((step: string) => {
    setBootSteps(prev => [...prev, step]);
    setProgress(prev => prev + (100 / bootSequence.length));
  }, [bootSequence.length]);

  useEffect(() => {
    setIsClient(true);

    const runBootSequence = async () => {
      for (let step of bootSequence) {
        await new Promise(resolve => setTimeout(resolve, step.delay));
        addBootStep(step.text);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };

    runBootSequence();
  }, [bootSequence, addBootStep]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black font-mono text-green-500 flex flex-col justify-center items-center z-50 overflow-hidden">
      {/* Digital Rain as background */}
      <DigitalRain />

      <div className="w-full max-w-2xl px-8 relative z-10">
  <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
    <div className="mb-4 h-2 bg-green-900 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>

    {bootSteps.map((step, index) => (
      <div key={index} className="mb-2 overflow-hidden whitespace-nowrap">
        <span className="text-green-600">[SYSTEM]</span> {step}
      </div>
    ))}

    {!loading && (
      <div className="mt-8 text-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-wider glitch">
          EKASPREET SINGH ATWAL
        </div>
        <div className="text-sm flex items-center justify-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full cursor-blink inline-block"></span>
          <span>System loaded successfully</span>
        </div>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default OSBootPreloader;
