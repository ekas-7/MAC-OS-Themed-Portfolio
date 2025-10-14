import React from "react";

const WorkExperience: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          Work Experience
        </h3>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          {/* Experience 1 */}

          {/* Experience 1 */}
          <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Prava Payments — Software Engineering Intern
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Aug 2025 – Present | Remote (USA)
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              <li>Built REST and GraphQL agentic endpoints for Shopify enabling CRUD operations, custom orders, and secure payment confirmations.</li>
              <li>Containerized and deployed backend services and Shopify extensions to AWS (ECS, ECR, Aurora, CloudFront, S3, CloudWatch, EC2) using Terraform and Docker.</li>
              <li>Implemented CI/CD pipelines and observability for production services.</li>
              <li>Developed a Chrome extension integrating Prava APIs with ChatGPT and Perplexity for AI-agentic payments.</li>
            </ul>
          </div>

          {/* Experience 2 */}
          <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Microsoft — Software Engineering Intern
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              June 2025 – Aug 2025 | Bangalore, India
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              <li>Developed RAG-based workflows to automate PR generation for detecting and fixing nullptr dereferences and memory leaks in low-level GPU code.</li>
              <li>Detected and resolved 90+ null pointer dereferences and 85+ memory leaks.</li>
              <li>Integrated AI-generated unit tests into CI pipelines to improve coverage and build reliability.</li>
            </ul>
          </div>

          {/* Experience 2 */}
          <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Open Food Facts — Open Source Contributor
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Feb 2025 – June 2025 | Remote
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              <li>Worked on CI/CD automation and feature development</li>
              <li>Improved data ingestion pipelines for 1M+ product entries</li>
              <li>Collaborated with a global open-source community</li>
            </ul>
          </div>

          {/* Experience 3 */}
          <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Global Psychological Services — Freelancer
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Oct 2024 – Jan 2025 | Remote
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              <li>Built Drishti Assessment Platform serving 2,500+ users</li>
              <li>Designed secure authentication & analytics dashboards</li>
              <li>Optimized platform performance and scalability</li>
            </ul>
          </div>

          {/* Experience 4 */}
          <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Freelance Projects & Hackathons
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              2023 – Present
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              <li>Developed multiple full-stack web applications</li>
              <li>Won awards in GenAI, MongoDB, and blockchain hackathons</li>
              <li>Mentored juniors in open-source contributions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
