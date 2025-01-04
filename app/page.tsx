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
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-4 ">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Ekaspreet Singh Atwal
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        Upcoming Software Engineering Intern @Microsoft (Summer
                        2025)
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Prefinal year Information Technology student at Dr. B. R.
                    Ambedkar National Institute of Technology, Jalandhar, with a
                    CGPA of 8.34. Passionate about software development with
                    experience in building scalable web applications.
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Achivements</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 ">
                    <li>
                        Cracked @Microsoft (Summer 2025) Software Engineering Intern
                      </li>
                      <li>
                        hackCBS - India&aposs Largest Student-run Hackathon ! 🏆✨
                        Ton track Winner
                      </li>
                      <li>
                        Achieved a 3-Star rating with a score of 1648 on
                        CodeChef
                      </li>
                      <li> Among the top 5% strata of my academic year</li>
                      
                    </ul>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Current Roles</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 ">
                      <li>Student Coordinator - Cybernauts</li>
                      <li>Core Member - GDGC Web Team</li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Previous Roles</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 ">
                      <li>Class Repersentative - IT 2026</li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">
                      Technical Skills and Interests
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                      <li>
                        <strong>Languages:</strong>
                        <ul className="list-none list-inside ml-4">
                          <li>→ C</li>
                          <li>→ C++</li>
                          <li>→ JavaScript</li>
                          <li>→ TypeScript</li>
                          <li>→ Java</li>
                          <li>→ Python</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Frameworks & Libraries:</strong>
                        <ul className="list-none list-inside ml-4">
                          <li>→ Node.js</li>
                          <li>→ Express.js</li>
                          <li>→ HonoJS</li>
                          <li>→ React.js</li>
                          <li>→ Next.js</li>
                          <li>→ Recoil</li>
                          <li>→ WebSockets</li>
                          <li>→ Zod</li>
                          <li>→ TailwindCSS</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Tools:</strong>
                        <ul className="list-none list-inside ml-4">
                          <li>→ Git/GitHub</li>
                          <li>→ Figma</li>
                          <li>→ Google Colab</li>
                          <li>→ Docker</li>
                          <li>→ AWS</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Databases:</strong>
                        <ul className="list-none list-inside ml-4">
                          <li>→ MySQL</li>
                          <li>→ PostgreSQL</li>
                          <li>→ MongoDB</li>
                          <li>→ Prisma ORM</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Relevant Coursework:</strong>
                        <ul className="list-none list-inside ml-4">
                          <li>→ Data Structures and Algorithms</li>
                          <li>→ Object-Oriented Programming</li>
                          <li>→ Computer Networks</li>
                          <li>→ Database Management Systems</li>
                          <li>→ Operating Systems</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
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
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-2">
                    Contact Information
                  </h2>
                  Contact Email: ekasatwal.work@gmail.com Phone: +91-8872059425
                  GitHub: ekas-7 LinkedIn: Ekaspreet Singh Atwal
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
