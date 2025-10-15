'use client';

import { useState, useEffect, useCallback } from "react";
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
import wallpaper from "@/public/wallpaper3.jpg";
import MusicPlayer from "./components/MusicPlayer";
import ProfileCard from "./components/AboutMe";
import ConnectWithMe from "./components/Social";
import Projects from "./components/Project";
import FlappyBird from "./components/PacManGame";
import WorkExperience from "./components/WorkExperience";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [wallpaper1, setWallpaper] = useState<string>(wallpaper.src);
  const [isLoading, setIsLoading] = useState(true);

  // Wallpapers are managed via WallpaperSelector; stored wallpaper src in state and localStorage

  useEffect(() => {
    setIsMounted(true);

    const savedWindows = localStorage.getItem("openWindows");
    if (savedWindows) setOpenWindows(JSON.parse(savedWindows));

    const savedWallpaper = localStorage.getItem("wallpaper");
    if (savedWallpaper) setWallpaper(savedWallpaper);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("openWindows", JSON.stringify(openWindows));
  }, [openWindows, isMounted]);

  const switchWallpaper = (wallpaperSrc: string) => {
    setWallpaper(wallpaperSrc);
    localStorage.setItem("wallpaper", wallpaperSrc);
  };

  const toggleWindow = (id: string) => {
    setOpenWindows((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "t") toggleWindow("terminal");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 10000);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!isMounted) return null;

  return (
    <ThemeProvider>
      <div
        className="min-h-screen min-w-full overflow-hidden bg-cover bg-center bg-no-repeat text-black dark:text-white transition-colors duration-300 relative"
  style={{ backgroundImage: `url(${wallpaper1})` }}
      >
        {isLoading ? (
          <ApplePreloader />
        ) : (
          <>
            <MenuBar switchWallpaper={switchWallpaper} />
            <Desktop toggleWindow={toggleWindow} />

            {openWindows.includes("about") && (
              <Window id="about" title="About Me" onClose={() => toggleWindow("about")}>
                <ProfileCard />
              </Window>
            )}
            {openWindows.includes("work-experience") && (
              <Window id="work-experience" title="Work Experience" onClose={() => toggleWindow("work-experience")}>
                <WorkExperience />
              </Window>
            )}
            {openWindows.includes("projects") && (
              <Window id="projects" title="My Projects" onClose={() => toggleWindow("projects")}>
                <Projects />
              </Window>
            )}
            {openWindows.includes("contact") && (
              <Window id="contact" title="Contact Me" onClose={() => toggleWindow("contact")}>
                <ConnectWithMe />
              </Window>
            )}
            {openWindows.includes("vscode") && (
              <Window id="vscode" title="VS Code" onClose={() => toggleWindow("vscode")}>
                <VSCodeEditor />
              </Window>
            )}
            {openWindows.includes("browser") && (
              <Window id="browser" title="Browser" onClose={() => toggleWindow("browser")}>
                <GeminiChat />
              </Window>
            )}
            {openWindows.includes("terminal") && (
              <Window id="terminal" title="Terminal" onClose={() => toggleWindow("terminal")}>
                <Terminal />
              </Window>
            )}
            {openWindows.includes("music-player") && (
              <Window id="music-player" title="Music Player" onClose={() => toggleWindow("music-player")}>
                <MusicPlayer />
              </Window>
            )}
            {openWindows.includes("resume") && <ResumeWindow onClose={() => toggleWindow("resume")} />}
            {openWindows.includes("flappy-bird") && (
              <Window id="flappy-bird" title="Flappy Bird" onClose={() => toggleWindow("flappy-bird")}>
                <FlappyBird />
              </Window>
            )}

            <Dock toggleWindow={toggleWindow} />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
