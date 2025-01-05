import React, { useState, useEffect } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
}

interface GitHubProjectsProps {
  username: string;
}

const GitHubProjects: React.FC<GitHubProjectsProps> = ({ username }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: GitHubRepo[] = await response.json();
        setRepos(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (loading) {
    return <p className="text-gray-600 dark:text-gray-300">Loading repositories...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        All Github Repos {username}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 
              transition-all duration-300 hover:shadow-lg hover:bg-gray-100 
              dark:hover:bg-gray-600 bg-white/80 dark:bg-gray-700/80"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {repo.name}
            </h3>
            {repo.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {repo.description}
              </p>
            )}
            <div className="flex flex-wrap gap-3 text-sm mb-2">
              {repo.language && (
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                  {repo.language}
                </span>
              )}
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                ⭐ {repo.stargazers_count}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date(repo.updated_at).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GitHubProjects;
