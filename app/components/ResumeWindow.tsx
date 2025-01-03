import Window from './Window'


export default function ResumeWindow({ onClose }: { onClose: () => void }) {
  return (
    <Window id="resume" title="Resume" onClose={onClose}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Resume</h2>
        <iframe
          src="/resume.pdf" // Corrected path
          width="100%"
          height="1090"
          title="Resume"
        />
      </div>
    </Window>
  )
}
