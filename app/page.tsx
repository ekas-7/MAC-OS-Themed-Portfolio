"use client";

import { useState, useEffect } from "react";
import Desktop from "./components/Desktop";
import Dock from "./components/Dock";
import MenuBar from "./components/MenuBar";
import Window from "./components/Window";
import ApplePreloader from "./components/ApplePreloader";
import { ThemeProvider } from "./contexts/ThemeContext";
import VSCodeEditor from "./components/VSCodeEditor";
import DraggableWindow from "./components/BrowserWindow";
import Terminal from "./components/Terminal";
import ResumeWindow from "./components/ResumeWindow";
import wallpaper from "@/public/wallpaper-white.jpg";
import MusicPlayer from "./components/MusicPlayer";

export default function Home() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleWindow = (id: string) => {
    setOpenWindows((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  // Function to handle Cmd + T event
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "t") {
      toggleWindow("terminal");
    }
  };

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.src = wallpaper.src;
    img.onload = () => {
      setIsLoading(false);
    };

    // Adding the keydown event listener for Cmd + T
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ThemeProvider>
      {isLoading ? (
        <ApplePreloader />
      ) : (
        <main
          className="h-screen w-screen overflow-hidden bg-cover bg-center text-black dark:text-white transition-colors duration-300"
          style={{
            backgroundImage: `url(${wallpaper.src})`,
          }}
        >
          <MenuBar />
          <Desktop toggleWindow={toggleWindow} />
          {openWindows.includes("about") && (
            <Window
              id="about"
              title="About Me"
              onClose={() => toggleWindow("about")}
            >
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">
                  Ekaspreet Singh Atwal
                </h2>
                <p>
                  I am a web developer passionate about creating beautiful and
                  functional websites.
                </p>
              </div>
            </Window>
          )}
          {openWindows.includes("projects") && (
            <Window
              id="projects"
              title="My Projects"
              onClose={() => toggleWindow("projects")}
            >
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">Projects</h2>
                <ul className="list-disc list-inside">
                  <li>Project 1: Portfolio Website</li>
                  <li>Project 2: E-commerce Platform</li>
                  <li>Project 3: Weather App</li>
                </ul>
              </div>
            </Window>
          )}
          {openWindows.includes("contact") && (
            <Window
              id="contact"
              title="Contact Me"
              onClose={() => toggleWindow("contact")}
            >
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                <p>Email: john.doe@example.com</p>
                <p>Twitter: @johndoe</p>
                <p>GitHub: github.com/johndoe</p>
              </div>
            </Window>
          )}
          {openWindows.includes("vscode") && (
            <Window
              id="vscode"
              title="VS Code"
              onClose={() => toggleWindow("vscode")}
            >
              <VSCodeEditor />
            </Window>
          )}
          {openWindows.includes("browser") && (
            <DraggableWindow
              id="social-links"
              title="My Social Links"
              onClose={() =>
                setOpenWindows(openWindows.filter((win) => win !== "browser"))
              }
            />
          )}

          {openWindows.includes("terminal") && (
            <Window
              id="terminal"
              title="Terminal"
              onClose={() => toggleWindow("terminal")}
            >
              <Terminal />
            </Window>
          )}
          {openWindows.includes("music-player") && (
            <Window
              id="music-player"
              title="Music Player"
              onClose={() => toggleWindow("music-player")}
            >
              <MusicPlayer />
            </Window>
          )}
          {openWindows.includes("resume") && (
            <ResumeWindow onClose={() => toggleWindow("resume")} />
          )}
          <Dock toggleWindow={toggleWindow} />
        </main>
      )}
    </ThemeProvider>
  );
}
