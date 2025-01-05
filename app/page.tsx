"use client";

import { useState, useEffect } from "react";
import Desktop from "./components/Desktop";
import Dock from "./components/Dock";
import MenuBar from "./components/MenuBar";
import Window from "./components/Window";
import ApplePreloader from "./components/ApplePreloader";
import { ThemeProvider } from "./contexts/ThemeContext";
import VSCodeEditor from "./components/VSCodeEditor";
import GeminiChat from "./components/BrowserWindow";
import Terminal from "./components/Terminal";
import ResumeWindow from "./components/ResumeWindow";
import wallpaper3 from "@/public/wallpaper-white.jpg";
import wallpaper2 from "@/public/wallpaper2.jpg";
import wallpaper from "@/public/wallpaper3.jpg";
import wallpaper4 from "@/public/wallpaper4.jpg";
import wallpaper5 from "@/public/wallpaper5.jpg";
import wallpaper7 from "@/public/wallpaper7.jpg";
import wallpaper8 from "@/public/wallpaper8.jpg";
import wallpaper9 from "@/public/wallpaper9.jpg";
import wallpaper10 from "@/public/wallpaper10.jpg";
import MusicPlayer from "./components/MusicPlayer";
import ProfileCard from "./components/AboutMe";
import ConnectWithMe from "./components/Social";
import Projects from "./components/Project";


export default function Home() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wallpaper1, setWallpaper] = useState(wallpaper); // Default wallpaper

  // Array of wallpapers
  const wallpapers = [wallpaper, wallpaper2,wallpaper3,wallpaper4,wallpaper5,wallpaper7,wallpaper8,wallpaper9,wallpaper10];

  // Function to toggle between wallpapers
  const switchWallpaper = (wallpaperSrc: string) => {
    
    const selectedWallpaper = wallpapers.find((wallpaper) => wallpaper.src === wallpaperSrc);
    if (selectedWallpaper) {
      setWallpaper(selectedWallpaper); // Assuming setWallpaper is a state setter for the current wallpaper
    }
  };
  

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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    // Adding the keydown event listener for Cmd + T
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      // Cleanup the event listener when the component unmounts
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ThemeProvider>
      <div
        className="min-h-screen min-w-full overflow-hidden bg-cover bg-center text-black dark:text-white transition-colors duration-300"
        style={{
          backgroundImage: `url(${wallpaper1.src})`,
        }}
      >
        {isLoading ? (
          <ApplePreloader />
        ) : (
          <>
            <MenuBar switchWallpaper={switchWallpaper} />
            <Desktop toggleWindow={toggleWindow} />
            {openWindows.includes("about") && (
              <Window
                id="about"
                title="About Me"
                onClose={() => toggleWindow("about")}
              >
                <ProfileCard />
              </Window>
            )}
            {openWindows.includes("projects") && (
              <Window
                id="projects"
                title="My Projects"
                onClose={() => toggleWindow("projects")}
              >
                <Projects />
              </Window>
            )}
            {openWindows.includes("contact") && (
              <Window
                id="contact"
                title="Contact Me"
                onClose={() => toggleWindow("contact")}
              >
                <ConnectWithMe />
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
              <Window
                id="browser"
                title="Contact Me"
                onClose={() => toggleWindow("browser")}
              >
                <GeminiChat />
              </Window>
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
            {/* Button to switch wallpaper */}
            
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
