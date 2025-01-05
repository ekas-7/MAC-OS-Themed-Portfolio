import React, { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import GitHubProjects from './OtherProject';

interface Project {
  title: string;
  description: string;
  deployedUrl: string;
  githubUrl: string;
}

const initialProjects: Project[] = [
  {
    title: "Blog It",
    description: "This is a blogging application inspired by Medium. The project is built from scratch using a modern tech stack and deployed on Vercel and Cloudflare Workers.",
    deployedUrl: "https://blog-7ytpfq9wi-ekasatwal7.vercel.app/",
    githubUrl: "https://github.com/ekas-7/Blog-It",
  },
  {
    title: "Aurea",
    description: "Access to quality healthcare is a widespread issue. While urban areas have better facilities, people in small towns often lack access to specialists, leaving skin conditions undiagnosed or improperly treated, which can lead to a dip in self-worth and potential health risks.",
    deployedUrl: "https://noobz-1.onrender.com/",
    githubUrl: "https://github.com/ekas-7/Aurea",
  },
  {
    title: "Chat-App",
    description: "Chat-App is a real-time messaging application that allows users to communicate instantly with each other. It provides a platform for seamless text-based conversations in a user-friendly interface.",
    deployedUrl: "https://github.com/ekas-7/Chat-App",
    githubUrl: "https://github.com/ekas-7/Chat-App",
  },
  {
    title: "npx-ekas",
    description: "npx-ekas is a simple, yet powerful, personal CLI card built using Node.js. It serves as a digital business card that you can share quickly via the npx command.",
    deployedUrl: "https://www.npmjs.com/package/ekas",
    githubUrl: "https://github.com/ekas-7/npx-ekas",
  },
  {
    title: "Drishti",
    description: "Drishti is a software developed for a global psychological services startup to administer RIASEC and DISC tests",
    deployedUrl: "https://drishti-dnro.vercel.app/",
    githubUrl: "https://github.com/ekas-7/Drishti",
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
        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 
          transition-all duration-300 hover:shadow-lg
          bg-white/80 dark:bg-gray-700/80"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {project.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex gap-3">
          <a
            href={project.deployedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            <span>View Live</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-1.5 text-sm rounded-md bg-gray-700 text-white hover:bg-gray-800 transition-colors"
          >
            <Github className="w-4 h-4 mr-1" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    ));

  return (
    <div className="mx-auto sm:px-12 sm:p-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        My Projects
      </h1>

      <div className="grid gap-4">{renderProjects(initialProjects)}</div>

      <h2 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-white">
        More Projects
      </h2>

      {isLoading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4">
        {!isLoading && !error && renderProjects(additionalProjects)}
      </div>

      <GitHubProjects username="ekas-7" />
    </div>
  );
};

export default Projects;
