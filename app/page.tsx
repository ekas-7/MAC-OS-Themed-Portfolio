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
import ProfileCard from "./components/AboutMe";
import ConnectWithMe from "./components/Social";



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
          backgroundImage: `url(${wallpaper.src})`,
        }}
      >
        {isLoading ? (
          <ApplePreloader />
        ) : (
          <>
            <MenuBar />
            <Desktop toggleWindow={toggleWindow} />
            {openWindows.includes("about") && (
              <Window
                id="about"
                title="About Me"
                onClose={() => toggleWindow("about")}
              >
                <ProfileCard/>
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
                    Projects 1. Chat-App A real-time messaging application
                    enabling instant communication with a user-friendly
                    interface. Features: Real-time messaging, user presence
                    indicators, message history. Tech Stack: Node.js,
                    Express.js, Socket.IO, MongoDB, HTML/CSS, JavaScript. GitHub
                    Repository 2. SAMP - NIT Jalandhar A web platform for
                    managing user data and administrative tasks for the Student
                    Academic Mentorship Program (SAMP). Features: User
                    authentication, role-based access control, CRUD operations
                    for users. Tech Stack: Node.js, Express.js, React, MongoDB,
                    Tailwind CSS. GitHub Repository 3. Blog It A blogging
                    platform inspired by Medium, enabling users to create, edit,
                    and explore blog posts seamlessly. Features: JWT-based
                    authentication, skeleton loading for UX, Prisma-based
                    database management. Tech Stack: React, Vite, Cloudflare
                    Workers, TypeScript, Prisma, PostgreSQL, Zod. GitHub
                    Repository
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
              <DraggableWindow
                id="social-links"
                title="My Social Links"
                onClose={() => toggleWindow("browser")}
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
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
