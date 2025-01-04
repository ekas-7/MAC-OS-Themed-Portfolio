import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ArrowRight,
} from "lucide-react";

const socialLinks = [
  {
    icon: <Github className="w-6 h-6" />,
    label: "GitHub",
    url: "github.com/ekas-7",
    color: "hover:text-purple-600 dark:hover:text-purple-400",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    label: "LinkedIn",
    url: "linkedin.com/in/ekas7",
    color: "hover:text-blue-600 dark:hover:text-purple-400",
  },
  {
    icon: <Twitter className="w-6 h-6" />,
    label: "X",
    url: "twitter.com/Ekas_7",
    color: "hover:text-sky-500 dark:hover:text-purple-400",
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    label: "Instagram",
    url: "instagram.com/ekas_7",
    color: "hover:text-pink-600 dark:hover:text-purple-400",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    url: "mailto:ekasatwal.work@gmail.com",
    color: "hover:text-red-500 dark:hover:text-purple-400",
  },
];
const ConnectWithMe = () => {
  return (
    <div className="max-w-2xl mx-auto sm:p-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Connect With Me
      </h1>

      <div className="grid gap-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={`https://${link.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 
              transition-all duration-300 hover:shadow-lg ${link.color}
              bg-white/80 dark:bg-gray-700/80 group`}
          >
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-600 group-hover:scale-110 transition-transform">
              {link.icon}
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {link.label}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {link.url}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ConnectWithMe;
