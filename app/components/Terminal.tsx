import React, { useState } from 'react'

const Terminal: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>(['Welcome to the portfolio terminal!', 'Type "help" for a list of commands.'])

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase()
      let response: string

      switch (command) {
        case 'help':
          response = 'Available commands: about, skills, projects, contact'
          break
        case 'about':
          response = "I'm a passionate web developer with a love for creating intuitive and efficient applications."
          break
        case 'skills':
          response = 'My skills include: JavaScript, React, Node.js, TypeScript, and more.'
          break
        case 'projects':
          response = 'Some of my projects: 1. Portfolio Website, 2. E-commerce Platform, 3. Weather App'
          break
        case 'contact':
          response = 'Email: john.doe@example.com | GitHub: github.com/johndoe | Twitter: @johndoe'
          break
        default:
          response = `Command not recognized: ${command}`
      }

      setOutput([...output, `$ ${input}`, response])
      setInput('')
    }
  }

  return (
    <div className="bg-black text-green-400 p-2 sm:p-4 rounded-lg shadow-lg w-full h-full font-mono text-xs sm:text-sm overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto mb-2">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleInput}
          className="bg-transparent outline-none flex-1"
          autoFocus
        />
      </div>
    </div>
  )
}

export default Terminal

