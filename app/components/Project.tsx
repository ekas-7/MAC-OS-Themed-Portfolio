import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, ExternalLink, Play, Image as ImageIcon } from 'lucide-react';
import GitHubProjects from './OtherProject';

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
    title: "Blog It",
    description: "This is a blogging application inspired by Medium. The project is built from scratch using a modern tech stack and deployed on Vercel and Cloudflare Workers.",
    deployedUrl: "https://blog-7ytpfq9wi-ekasatwal7.vercel.app/",
    githubUrl: "https://github.com/ekas-7/Blog-It",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Add your actual YouTube demo
    imageUrl: "/pbx1.jpg", // Add your project screenshot
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Cloudflare Workers"]
  },
  {
    title: "Aurea",
    description: "Access to quality healthcare is a widespread issue. While urban areas have better facilities, people in small towns often lack access to specialists, leaving skin conditions undiagnosed or improperly treated, which can lead to a dip in self-worth and potential health risks.",
    deployedUrl: "https://noobz-1.onrender.com/",
    githubUrl: "https://github.com/ekas-7/Aurea",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Add your actual YouTube demo
    imageUrl: "/wallpaper2.jpg", // Add your project screenshot
    technologies: ["React", "Node.js", "Express", "MongoDB", "Machine Learning"]
  },
  {
    title: "Chat-App",
    description: "Chat-App is a real-time messaging application that allows users to communicate instantly with each other. It provides a platform for seamless text-based conversations in a user-friendly interface.",
    deployedUrl: "https://github.com/ekas-7/Chat-App",
    githubUrl: "https://github.com/ekas-7/Chat-App",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Add your actual YouTube demo
    imageUrl: "/wallpaper3.jpg", // Add your project screenshot
    technologies: ["React", "Socket.IO", "Node.js", "Express", "MongoDB"]
  },
  {
    title: "npx-ekas",
    description: "npx-ekas is a simple, yet powerful, personal CLI card built using Node.js. It serves as a digital business card that you can share quickly via the npx command.",
    deployedUrl: "https://www.npmjs.com/package/ekas",
    githubUrl: "https://github.com/ekas-7/npx-ekas",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Add your actual YouTube demo
    imageUrl: "/wallpaper4.jpg", // Add your project screenshot
    technologies: ["Node.js", "CLI", "NPM", "JavaScript"]
  },
  {
    title: "Drishti",
    description: "Drishti is a software developed for a global psychological services startup to administer RIASEC and DISC tests",
    deployedUrl: "https://drishti-dnro.vercel.app/",
    githubUrl: "https://github.com/ekas-7/Drishti",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Add your actual YouTube demo
    imageUrl: "/wallpaper5.jpg", // Add your project screenshot
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"]
  },
  {
    title: "Dhaniverse",
    description: "A gamified 2D RPG that teaches financial literacy using real-life money simulations, chunked maps, and on-chain banking/leaderboards on ICP.",
    deployedUrl: "https://github.com/ekas-7/Dhaniverse",
    githubUrl: "https://github.com/ekas-7/Dhaniverse",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/wallpaper7.jpg",
    technologies: ["React", "Phaser 3", "Deno", "MongoDB", "WebSockets"]
  },
  {
    title: "Dev Mux",
    description: "A collaboration platform featuring video calls, code editing, and a whiteboard with real-time sync via LiveKit and CodeSandbox.",
    deployedUrl: "https://github.com/ekas-7/Dev-Mux",
    githubUrl: "https://github.com/ekas-7/Dev-Mux",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/wallpaper8.jpg",
    technologies: ["Prisma", "PostgreSQL", "Node.js", "LiveKit"]
  },
  {
    title: "Zing Guru",
    description: "An AI-powered learning ecosystem providing study paths, gamified modules, and 24/7 AI support (RAG-powered).",
    deployedUrl: "https://github.com/ekas-7/Zing-Guru",
    githubUrl: "https://github.com/ekas-7/Zing-Guru",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/wallpaper9.jpg",
    technologies: ["React", "Node.js", "LangChain", "OpenAI", "PostgreSQL"]
  },
];

const Projects: React.FC = () => {
  const [additionalProjects, setAdditionalProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdditionalProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate fetching additional projects
        const fetchedProjects: Project[] = [
          {
            title: "Additional Project 1",
            description: "A description for additional project 1.",
            deployedUrl: "https://additionalproject1.example.com",
            githubUrl: "https://github.com/username/additionalproject1",
            technologies: ["React", "TypeScript"]
          },
        ];
        setTimeout(() => setAdditionalProjects(fetchedProjects), 1000); // Simulated delay
      } catch (err) {
        setError('Failed to fetch additional projects');
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdditionalProjects();
  }, []);

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

      {/* Additional Projects Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 sm:pt-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
            More Projects
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-4">
            Additional projects and experiments
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 sm:ml-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">Loading projects...</span>
          </div>
        )}
        
        {error && (
          <div className="text-center py-6 sm:py-8 px-4">
            <p className="text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 sm:p-4 inline-block text-sm sm:text-base">
              {error}
            </p>
          </div>
        )}
        
        <div className="space-y-6 sm:space-y-8">
          {!isLoading && !error && renderProjects(additionalProjects)}
        </div>
      </div>

      {/* GitHub Projects Component */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 sm:pt-12">
        <GitHubProjects username="ekas-7" />
      </div>
    </div>
  );
};

export default Projects;
