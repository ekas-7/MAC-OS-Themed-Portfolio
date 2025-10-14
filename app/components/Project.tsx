import React from 'react';
import Image from 'next/image';
import { Github, ExternalLink, Play, Image as ImageIcon } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  deployedUrl: string;
  githubUrl: string;
  youtubeUrl?: string;
  imageUrl?: string;
  technologies: string[];
}

const initialProjects: Project[] = [
  {
    title: "Echonet",
    description: "A DePIN that rewards providers of validated, real-world sound data with on-chain crypto.",
    deployedUrl: "https://echonet.live/",
    githubUrl: "https://github.com/Saurabh-0312/ECHONET",
    youtubeUrl: "https://youtu.be/0onUl0kPEDo",
    imageUrl: "/Projects/echonet.png",
    technologies: ["DePIN", "Web3","Devops", "Hardware","CI/CD", "Edge Data", "The Graph", "IPFS" ]
  },
  {
    title: "Dev Mux",
    description: "A collaboration platform featuring video calls, code editing, and a whiteboard with real-time sync via LiveKit and CodeSandbox.",
    deployedUrl: "https://www.devmux.xyz/",
    githubUrl: "https://github.com/ekas-7/Dev-Mux",
    youtubeUrl: "https://youtu.be/GfUFaTmD7oo",
    imageUrl: "/Projects/devmux2.png",
    technologies: ["Docker","Canvas","Prisma", "PostgreSQL", "Node.js", "LiveKit","Websockets","WebRTC"]
  },
  {
    title: "MAC-OS Themed Portfolio",
    description: "A sleek, modern portfolio website with a macOS-inspired theme showcasing projects, skills, and work — built with Next.js.",
    deployedUrl: "https://www.ekas.site/",
    githubUrl: "https://github.com/ekas-7/MAC-OS-Themed-Portfolio",
    youtubeUrl: "",
    imageUrl: "/Projects/macos.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Agamify",
    description: "An intelligent agent that migrates web application code across multiple frontend frameworks, streamlining cross-framework development and modernization workflows.",
    deployedUrl: "https://agamify.site/",
    githubUrl: "https://github.com/ekas-7/Agamify",
    youtubeUrl: "https://youtu.be/wdHqQIuspdc",
    imageUrl: "/Projects/agamify2.png",
    technologies: ["Agent", "Code Migration", "Frontend", "RAG"]
  },
  {
    title: "Zing Guru",
    description: "An AI-powered learning ecosystem providing study paths, gamified modules, and 24/7 AI support (RAG-powered).",
    deployedUrl: "https://sage-zingguru.vercel.app/",
    githubUrl: "https://github.com/ekas-7/sage-zingguru",
    youtubeUrl: "https://youtu.be/tBbk4axjduw",
    imageUrl: "/Projects/zingguru2.png",
    technologies: ["React", "Node.js", "LangChain", "OpenAI", "PostgreSQL","RAG", "Blockchain", "Foundry"]
  },
  {
    title: "Dhaniverse",
    description: "A gamified 2D RPG that teaches financial literacy using real-life money simulations, chunked maps, and on-chain banking/leaderboards on ICP.",
    deployedUrl: "https://www.dhaniverse.in/",
    githubUrl: "https://github.com/dhaniverse/dhaniverse",
    youtubeUrl: "https://youtu.be/AhxIUaZny2k",
    imageUrl: "/Projects/dhaniverse.png",
    technologies: ["React", "Phaser 3", "Deno", "MongoDB", "WebSockets"]
  },
  {
    title: "Jiva",
    description: "Jiva is an advanced healthcare tracking system designed to streamline your medical journey. Our comprehensive platform connects patients with healthcare providers through an intuitive interface that centralizes all your health information in one secure place.",
    deployedUrl: "https://jiva-sage.vercel.app",
    githubUrl: "https://github.com/itzzGaurav7/jiva-sage",
    youtubeUrl: "https://youtu.be/0154CRk0VZU",
    imageUrl: "/Projects/jiva.png",
    technologies: [
      "React",
      "Tailwind CSS",
      "MongoDB",
      "AWS",
      "Node.js",
      "Flutter",
      "FastAPI",
      "RAG",
      "Gemini",
      "OpenAI",
      "Smart Contracts"
    ]
  },
  {
    title: "Walmart Hackathon",
    description: "A modern e-commerce extension built for the Walmart Hackathon. Demonstrates a responsive, performant, and visually appealing shopping experience using React, Vite, and Tailwind CSS in an agentic AI environment.",
    deployedUrl: "",
    githubUrl: "https://github.com/ekas-7/Walmart_hackathon",
    youtubeUrl: "https://youtu.be/ZY4vKH_Wx_o",
    imageUrl: "/projects/sparkshop.png",
    technologies: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "Vercel", "Agentic AI"]
  },
  {
    title: "Aurea",
    description: "Access to quality healthcare is a widespread issue. While urban areas have better facilities, people in small towns often lack access to specialists, leaving skin conditions undiagnosed or improperly treated, which can lead to a dip in self-worth and potential health risks.",
    deployedUrl: "https://noobz-1.onrender.com/",
    githubUrl: "https://github.com/ekas-7/Aurea",
    youtubeUrl: "https://youtu.be/4hEOXCBb89o", // Add your actual YouTube demo
    imageUrl: "/projects/noobz.png", // Add your project screenshot
    technologies: ["React", "Node.js", "Express", "MongoDB", "Machine Learning"]
  },
  {
    title: "Skill Sensei",
    description: "Skill Sensei is a modern, minimal web app that allows users to list skills they offer, request skills they want, and connect with others for mutually beneficial learning swaps. Built with Next.js 13+ App Router and TypeScript.",
    deployedUrl: "https://skill-sensai.vercel.app/",
    githubUrl: "https://github.com/ekas-7/Skill-Sensai",
    youtubeUrl: "https://youtu.be/l--B2RSduJY",
    imageUrl: "/Projects/skillssen.png",
    technologies: ["Next.js", "TypeScript", "App Router"]
  },
  {
    title: "Chat-App",
    description: "Chat-App is a real-time messaging application that allows users to communicate instantly with each other. It provides a platform for seamless text-based conversations in a user-friendly interface.",
    deployedUrl: "https://github.com/ekas-7/Chat-App",
    githubUrl: "https://github.com/ekas-7/Chat-App",
    youtubeUrl: "", // Add your actual YouTube demo
    imageUrl: "/Projects/chatapp.png", // Add your project screenshot
    technologies: ["React", "Socket.IO", "Node.js", "Express", "MongoDB"]
  },
  {
    title: "npx-ekas",
    description: "npx-ekas is a simple, yet powerful, personal CLI card built using Node.js. It serves as a digital business card that you can share quickly via the npx command.",
    deployedUrl: "https://www.npmjs.com/package/ekas",
    githubUrl: "https://github.com/ekas-7/npx-ekas",
    youtubeUrl: "", // Add your actual YouTube demo
    imageUrl: "/Projects/npx2.png", // Add your project screenshot
    technologies: ["Node.js", "CLI", "NPM", "JavaScript"]
  },
  {
    title: "Web-based Wallet",
    description: "A lightweight web-based cryptocurrency wallet demo built with Vite and React. Demonstrates wallet UI components and simple integrations (Ethereum & Solana) for experimentation and learning.",
    deployedUrl: "https://web-based-wallet-seven.vercel.app/",
    githubUrl: "https://github.com/ekas-7/Web-based-wallet",
    youtubeUrl: "",
    imageUrl: "/projects/wallet.png",
    technologies: ["Vite", "React", "Ethereum", "Solana", "Web3"]
  },
  {
    title: "Drishti",
    description: "Drishti is a software developed for a global psychological services startup to administer RIASEC and DISC tests",
    deployedUrl: "https://drishti-dnro.vercel.app/",
    githubUrl: "https://github.com/ekas-7/Drishti",
    youtubeUrl: "", // Add your actual YouTube demo
    imageUrl: "/wallpaper5.jpg", // Add your project screenshot
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"]
  },
  {
    title: "Blog It",
    description: "This is a blogging application inspired by Medium. The project is built from scratch using a modern tech stack and deployed on Vercel and Cloudflare Workers.",
    deployedUrl: "https://blog-it-frontend-gules.vercel.app/",
    githubUrl: "https://github.com/ekas-7/Blog-It",
    youtubeUrl: "", // Add your actual YouTube demo
    imageUrl: "/Projects/blogit.png", // Add your project screenshot
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Cloudflare Workers"]
  },
  {
    title: "Anemia Detection (Pi)",
    description: "Personalized Anemia Detection Framework for custom hardware.",
    deployedUrl: "",
    githubUrl: "https://github.com/ekas-7/Anemia-detection-pi",
    youtubeUrl: "",
    imageUrl: "/wallpaper3.jpg",
    technologies: ["Embedded", "Computer Vision", "Python"]
  },
];

const Projects: React.FC = () => {
  // removed additional projects fetching logic

  const renderProjects = (projects: Project[]) =>
    projects.map((project, index) => (
      <div
        key={index}
        className="bg-white/90 dark:bg-gray-800/90 rounded-2xl border border-gray-200 dark:border-gray-700 
          shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden backdrop-blur-sm
          w-full max-w-none"
      >
        <div className="flex flex-col xl:flex-row h-full">
          {/* Left side - Demo/Preview */}
          <div className="xl:w-1/2 w-full relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800">
            <div className="aspect-video relative overflow-hidden">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} preview`}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-600 dark:to-gray-700">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
              
              {/* Clickable overlay for video */}
              {project.youtubeUrl && (
                <a
                  href={project.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/10 hover:bg-black/30 flex items-center justify-center transition-all duration-300 group cursor-pointer"
                >
                  <div className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </a>
              )}
            </div>
            
            {/* Technology badges */}
            <div className="p-3 sm:p-4">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full
                      whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Project details */}
          <div className="xl:w-1/2 w-full p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                {project.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a
                  href={project.deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl 
                    animate-shimmer border border-slate-800 
                    bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%]
                    text-slate-400 transition-all duration-300 flex-1 group
                    hover:shadow-lg hover:shadow-slate-500/25 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transition-transform group-hover:scale-110" />
                  <span className="text-xs sm:text-sm">Live Demo</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl 
                    animate-shimmer border border-slate-800 
                    bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%]
                    text-slate-400 transition-all duration-300 flex-1 group
                    hover:shadow-lg hover:shadow-slate-500/25 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transition-transform group-hover:scale-110" />
                  <span className="text-xs sm:text-sm">Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-white">
          Featured Projects
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
          A showcase of my recent work, featuring full-stack applications, 
          web development projects, and innovative solutions.
        </p>
      </div>

      {/* Main Projects Grid */}
      <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
        {renderProjects(initialProjects)}
      </div>
    </div>
  );
};

export default Projects;
