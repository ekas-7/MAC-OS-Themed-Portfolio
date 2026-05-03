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
          <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Increff — Software Development Engineer
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Jan 2026 – Present | Bangalore, India
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              <li>Spearheaded an OLAP reporting module for WMS 2.0 using Spring Boot; overhauled 500+ OLTP MySQL queries into ClickHouse pipelines, slashing report latency and directly contributing to $110K+ MRR.</li>
              <li>Crafted a dynamic charting module — a low-code interface giving warehouse operators fully configurable, multi-dimensional analytics views with zero engineering intervention, reducing custom-dashboard requests by 60%+.</li>
              <li>Modernized the legacy reporting layer by replacing brittle batch jobs with real-time ClickHouse analytics, unblocking enterprise-tier client onboarding and improving UX for 10+ client teams.</li>
              <li>Authored an MCP server for WMS 2.0 decoupling inter-service communication, reducing integration overhead for 5+ internal teams.</li>
              <li>Constructed a replenishment dependency engine in Java that optimized inventory flow and eliminated stock inconsistencies across multi-node warehouse operations.</li>
              <li>Merged 70+ PRs across Spring Boot, Angular and Next.js codebases, contributing to full-stack feature delivery and code-quality initiatives.</li>
            </ul>
          </div>

          {/* Experience 2 */}
          <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Prava Payments — Software Engineering Intern
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Aug 2025 – Dec 2025 | Remote
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              <li>Implemented Shopify REST &amp; GraphQL endpoints powering CRUD operations, custom order creation, and secure payment confirmation at scale.</li>
              <li>Shipped a production Shopify extension with ChatGPT-driven checkout; containerized with Docker and provisioned AWS (ECS, ECR, S3, CloudFront, EC2, Aurora) via Terraform IaC with end-to-end CI/CD automation.</li>
              <li>Launched Radar (radar.prava.space): an AI-visibility platform scoring e-commerce brands across 3 LLM engines to expose competitor leakage and missed revenue opportunities.</li>
            </ul>
          </div>

          {/* Experience 3 */}
          <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Microsoft — Software Engineering Intern
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              June 2025 – Aug 2025 | Bangalore, India
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              <li>Architected RAG-based pipelines that auto-generated PRs to remediate null pointer dereferences and memory leaks, cutting manual code-review overhead by 40%+.</li>
              <li>Identified &amp; eliminated 90+ null pointer dereferences and 85+ memory leaks in low-level GPU code across 3+ internal repositories.</li>
              <li>Shipped AI-generated unit tests into CI pipelines, boosting test coverage and ensuring clean builds.</li>
            </ul>
          </div>

          {/* Experience 4 */}
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
