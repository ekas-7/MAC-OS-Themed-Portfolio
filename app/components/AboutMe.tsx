const ProfileCard = () => {
    return (
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Ekaspreet Singh Atwal</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Upcoming Software Engineering Intern @Microsoft (Summer 2025)
            </p>
          </div>
        </div>
  
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          Prefinal year Information Technology student at Dr. B. R. Ambedkar
          National Institute of Technology, Jalandhar, with a CGPA of 8.34.
          Passionate about software development with experience in building
          scalable web applications.
        </p>
  
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Achievements</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
            <li>
              Cracked @Microsoft (Summer 2025) Software Engineering Intern
            </li>
            <li>
              hackCBS - India&apos;s Largest Student-run Hackathon! 🏆✨ Ton track
              Winner
            </li>
            <li>
              Achieved a 3-Star rating with a score of 1648 on CodeChef
            </li>
            <li>Among the top 5% strata of my academic year</li>
          </ul>
        </div>
  
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Current Roles</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
            <li>Student Coordinator - Cybernauts</li>
            <li>Core Member - GDGC Web Team</li>
          </ul>
        </div>
  
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Previous Roles</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
            <li>Class Representative - IT 2026</li>
            <li>Co Lead - IOTA</li>
          </ul>
        </div>
  
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Technical Skills and Interests</h3>
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
    );
  };
  
  export default ProfileCard;
  