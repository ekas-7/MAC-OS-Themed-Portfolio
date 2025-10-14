const ProfileCard = () => {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Ekaspreet Singh Atwal
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium px-4">
            Information Technology Student • Software Engineering Intern at Prava Payments
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-300">
            <span>ekaspreetatwal@gmail.com</span>
            <span className="hidden sm:inline">•</span>
            <a className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="https://ekas.site" target="_blank" rel="noreferrer">ekas.site</a>
          </div>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed max-w-4xl mx-auto px-4 text-sm sm:text-base">
            Information Technology undergraduate at Dr. B. R. Ambedkar National Institute of Technology, Jalandhar (2022–2026),
            focused on full-stack development, AI/ML workflows, and cloud-native deployments. Passionate about building
            scalable systems, contributing to open source, and designing developer tooling.
          </p>
        </div>

        {/* Education */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Education
          </h3>
          <div className="text-gray-700 dark:text-gray-300">
            <h4 className="font-semibold text-base sm:text-lg">Dr B. R. Ambedkar National Institute of Technology, Jalandhar</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">B.Tech — Information Technology | 2022 – 2026</p>
            <p className="mt-2 text-sm font-medium">CGPA: 8.35 (Top 5%)</p>
          </div>
        </div>
  
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Professional Experience
          </h3>
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-base sm:text-lg">Prava Payments — Software Engineering Intern</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Aug 2025 – Present | Remote (USA)</p>
              <ul className="mt-3 list-disc list-inside space-y-2 text-sm leading-relaxed">
                <li>Built REST and GraphQL agentic endpoints for Shopify enabling CRUD operations, custom orders, and secure payment confirmations.</li>
                <li>Containerized and deployed backend services and Shopify extensions on AWS (ECS, ECR, Aurora, CloudFront, S3, CloudWatch, EC2) using Terraform and Docker.</li>
                <li>Implemented CI/CD pipelines for streamlined deployments and observability.</li>
                <li>Developed a Chrome extension integrating Prava APIs with ChatGPT and Perplexity for AI-agentic payments in chat.</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-base sm:text-lg">Microsoft — Software Engineering Intern</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">June 2025 – Aug 2025 | Bangalore, India</p>
              <ul className="mt-3 list-disc list-inside space-y-2 text-sm leading-relaxed">
                <li>Developed RAG-based workflows to automate generation of pull requests to identify and fix potential nullptr dereferences and memory leaks in low-level GPU code.</li>
                <li>Detected and resolved 90+ null pointer dereferences and 85+ memory leaks.</li>
                <li>Integrated AI-generated unit tests into CI pipelines, improving test coverage and ensuring build stability.</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-base sm:text-lg">Open Food Facts — Open Source Contributor</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Feb 2025 – June 2025 | Remote</p>
              <ul className="mt-3 list-disc list-inside space-y-2 text-sm leading-relaxed">
                <li>Integrated GitHub Actions for Dependabot, semantic PRs, auto-assignment, and TypeScript linting.</li>
                <li>Built a Knowledge Panel UI with lit, enhanced Docker setups, and improved API documentation and consistency.</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-base sm:text-lg">Global Psychological Services — Freelancer</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Oct 2024 – Jan 2025 | Remote</p>
              <ul className="mt-3 list-disc list-inside space-y-2 text-sm leading-relaxed">
                <li>Built and deployed the Drishti Assessment Platform (RIASEC, DISC, MBTI), serving 2,500+ users with automated report generation.</li>
                <li>Designed secure authentication and analytics dashboards and optimized platform performance.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-6 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Hackathon Victories & Recognition
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HackTU 6.0 */}
            <div className="group relative border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-5 rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="mb-3">
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">HackTU 6.0</h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">2nd Runner-Up & Best Gen AI</p>
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">ZingGuru</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">RAG-powered learning platform focused on personalized study workflows and content retrieval.</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">Participants</span>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">5,000+</span>
              </div>
            </div>

            {/* Electothon 7.0 */}
            <div className="group relative border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-5 rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="mb-3">
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">Electothon 7.0</h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Best MongoDB Use</p>
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">JIVA</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">AI-driven healthcare system that uses MongoDB for scalable medical data ingestion and analytics.</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">Participants</span>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">4,550+</span>
              </div>
            </div>

            {/* Hack CBS 7.0 */}
            <div className="group relative border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-5 rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="mb-3">
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">Hack CBS 7.0</h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">TON Track Winner</p>
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Decentralized ML Platform</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">IPFS-based decentralized ML training system that enabled federated data access and model updates.</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">Participants</span>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">4,400+</span>
              </div>
            </div>

            {/* ETHGlobal New Delhi */}
            <div className="group relative border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-5 rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="mb-3">
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">ETHGlobal New Delhi</h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">1st Place — Best use of Hypergraph</p>
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Hypergraph Solution</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Showcased a Hypergraph-based solution in a blockchain interoperability track with agentic ML prototype integration.</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">Scale</span>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Global Event</span>
              </div>
            </div>

            {/* ETHGlobal - 4th Place */}
            <div className="group relative border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-5 rounded-lg hover:shadow-lg transition-all duration-300 md:col-span-2">
              <div className="mb-3">
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">ETHGlobal</h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">4th Place — Fetch Track</p>
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Fetch Integration</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Developed innovative solution leveraging Fetch.ai's autonomous economic agents for decentralized data processing and AI coordination.</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">Scale</span>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Global Event</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Removed Leadership & Community Impact as requested */}

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Coding Profiles & Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Competitive Coding Profiles</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>LeetCode:</span>
                  <span className="font-medium">850+ problems (Peak 1774)</span>
                </li>
                <li className="flex justify-between">
                  <span>CodeChef:</span>
                  <span className="font-medium">3★ (1648)</span>
                </li>
                <li className="flex justify-between">
                  <span>GeeksforGeeks:</span>
                  <span className="font-medium">300+ problems</span>
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Certifications</h4>
              <ul className="space-y-2 text-sm">
                <li>• Web Dev + DevOps Certification (100xDevs)</li>
                <li>• Machine Learning Specialization (Stanford + DeepLearning.AI)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Technical Expertise
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Languages</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">C++</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">JavaScript</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">TypeScript</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">Python</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">Java</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">C</span>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Frameworks & Tools</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">React.js</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">Next.js</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">Node.js</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">Express.js</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">FastAPI</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">TailwindCSS</span>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Databases & Cloud</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">PostgreSQL</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">MongoDB</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">Redis</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">AWS</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">Docker</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">Kubernetes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileCard;
  