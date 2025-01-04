import { User , File, Mail, Briefcase } from 'lucide-react'

interface DesktopProps {
  toggleWindow: (id: string) => void
}

export default function Desktop({ toggleWindow }: DesktopProps) {
  const icons = [
    {
      id: 'about',
      label: 'About Me',
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
    },
    {
      id: 'resume',
      label: 'Resume',
      icon: <File className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
    }
  ]

  return (
    <div className="absolute right-0 top-8 p-4 sm:flex flex-col gap-8  hidden">
      {icons.map(({ id, label, icon }) => (
        <button
          key={id}
          className="flex flex-col items-center"
          onClick={() => toggleWindow(id)}
        >
          <div className="group flex flex-col items-center">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-100/75 dark:bg-gray-800/75 rounded-xl flex items-center justify-center shadow-lg border border-white/20 dark:border-white/10 group-hover:scale-105 transition-transform`}>
              {icon}
            </div>
            <span className="mt-1 text-white dark:text-white text-xs sm:text-sm">
              {label}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
