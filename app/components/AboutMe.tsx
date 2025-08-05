const ProfileCard = () => {
    return (
      <div className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Ekaspreet Singh Atwal
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            Software Engineering Intern at Microsoft
          </p>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Information Technology student at Dr. B. R. Ambedkar National Institute of Technology, Jalandhar, 
            with a CGPA of 8.35 (Top 5%). Passionate about software development with experience in building 
            scalable web applications, AI/ML systems, and contributing to open source projects.
          </p>
        </div>
  
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Professional Experience & Achievements
          </h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Microsoft - Software Engineering Intern</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Summer 2025 | Bangalore, India</p>
              <p className="mt-1">Automated Static Analysis for GPU code, developed RAG-based workflows</p>
            </div>
            <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Open Food Facts - Open Source Contributor</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Feb 2025 – June 2025 | Remote</p>
              <p className="mt-1">CI/CD Automation and Feature Development</p>
            </div>
            <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Global Psychological Services - Freelancer</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Oct 2024 – Jan 2025 | Remote</p>
              <p className="mt-1">Built Drishti Assessment Platform serving 2,500+ users</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Hackathon Victories & Recognition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <div className="space-y-2">
              <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded-lg">
                <h4 className="font-semibold">HackTU 6.0</h4>
                <p className="text-sm">2nd Runner-Up & Best Gen AI</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">5000+ participants</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded-lg">
                <h4 className="font-semibold">Electothon 7.0</h4>
                <p className="text-sm">Best MongoDB Use</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">4550+ participants</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded-lg">
                <h4 className="font-semibold">Hack CBS 7.0</h4>
                <p className="text-sm">TON Track Winner</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">4400+ participants</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded-lg">
                <h4 className="font-semibold">Competitive Programming</h4>
                <p className="text-sm">LeetCode: 815+ problems (1774 rating)</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">CodeChef: 3-Star (1648)</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Leadership & Community Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Current Roles</h4>
              <ul className="space-y-1 text-sm">
                <li>Core Member - GDG on Campus</li>
                <li>Student Coordinator - Cybernauts</li>
                <li>Class Representative - IT 2026</li>
              </ul>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Impact</h4>
              <ul className="space-y-1 text-sm">
                <li>Led 5+ workshops</li>
                <li>Mentored 30+ students in web development</li>
                <li>Built NITJ's official web app</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Technical Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Languages</h4>
              <div className="space-y-1 text-sm">
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">C++</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">JavaScript</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">TypeScript</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">Python</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">Java</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">C</span>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Frameworks & Tools</h4>
              <div className="space-y-1 text-sm">
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">React.js</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">Next.js</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">Node.js</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">Express.js</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">FastAPI</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">TailwindCSS</span>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Databases & Cloud</h4>
              <div className="space-y-1 text-sm">
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">PostgreSQL</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">MongoDB</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">Redis</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">AWS</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">Docker</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">Kubernetes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileCard;
  