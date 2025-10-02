'use client';

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
import PacManGame from "./components/PacManGame";
import WorkExperience from "./components/WorkExperience"; // ✅ Import WorkExperience

export default function Home() {
  // Load open windows from localStorage
  const [openWindows, setOpenWindows] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("openWindows");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("openWindows", JSON.stringify(openWindows));
  }, [openWindows]);

  const [isLoading, setIsLoading] = useState(true);

  const [wallpaper1, setWallpaper] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wallpaper");
      return saved ? { src: saved } : wallpaper;
    }
    return wallpaper;
  });

  const wallpapers = [wallpaper, wallpaper2, wallpaper3, wallpaper4, wallpaper5, wallpaper7, wallpaper8, wallpaper9, wallpaper10];

  const switchWallpaper = (wallpaperSrc: string) => {
    const selectedWallpaper = wallpapers.find((wall) => wall.src === wallpaperSrc);
    if (selectedWallpaper) {
      setWallpaper(selectedWallpaper);
      localStorage.setItem("wallpaper", selectedWallpaper.src);
    }
  };

  const toggleWindow = (id: string) => {
    setOpenWindows((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "t") {
      toggleWindow("terminal");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ThemeProvider>
      <div
        className="min-h-screen min-w-full overflow-hidden bg-cover bg-center text-black dark:text-white transition-colors duration-300"
        style={{ backgroundImage: `url(${wallpaper1.src})` }}
      >
        {isLoading ? (
          <ApplePreloader />
        ) : (
          <>
            <MenuBar switchWallpaper={switchWallpaper} />
            <Desktop toggleWindow={toggleWindow} />

            {/* About Me */}
            {openWindows.includes("about") && (
              <Window
                id="about"
                title="About Me"
                onClose={() => toggleWindow("about")}
              >
                <ProfileCard />
              </Window>
            )}

            {/* Work Experience ✅ */}
            {openWindows.includes("work-experience") && (
              <Window
                id="work-experience"
                title="Work Experience"
                onClose={() => toggleWindow("work-experience")}
              >
                <WorkExperience />
              </Window>
            )}

            {/* Projects */}
            {openWindows.includes("projects") && (
              <Window
                id="projects"
                title="My Projects"
                onClose={() => toggleWindow("projects")}
              >
                <Projects />
              </Window>
            )}

            {/* Contact */}
            {openWindows.includes("contact") && (
              <Window
                id="contact"
                title="Contact Me"
                onClose={() => toggleWindow("contact")}
              >
                <ConnectWithMe />
              </Window>
            )}

            {/* VS Code */}
            {openWindows.includes("vscode") && (
              <Window
                id="vscode"
                title="VS Code"
                onClose={() => toggleWindow("vscode")}
              >
                <VSCodeEditor />
              </Window>
            )}

            {/* Browser */}
            {openWindows.includes("browser") && (
              <Window
                id="browser"
                title="Browser"
                onClose={() => toggleWindow("browser")}
              >
                <GeminiChat />
              </Window>
            )}

            {/* Terminal */}
            {openWindows.includes("terminal") && (
              <Window
                id="terminal"
                title="Terminal"
                onClose={() => toggleWindow("terminal")}
              >
                <Terminal />
              </Window>
            )}

            {/* Music Player */}
            {openWindows.includes("music-player") && (
              <Window
                id="music-player"
                title="Music Player"
                onClose={() => toggleWindow("music-player")}
              >
                <MusicPlayer />
              </Window>
            )}

            {/* Resume */}
            {openWindows.includes("resume") && (
              <ResumeWindow onClose={() => toggleWindow("resume")} />
            )}

            {/* Pac-Man Game */}
            {openWindows.includes("pacman-game") && (
              <Window
                id="pacman-game"
                title="Pac-Man Game"
                onClose={() => toggleWindow("pacman-game")}
              >
                <PacManGame />
              </Window>
            )}

            <Dock toggleWindow={toggleWindow} />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
