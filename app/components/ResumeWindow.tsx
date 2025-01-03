import Window from './Window'


export default function ResumeWindow({ onClose }: { onClose: () => void }) {
  return (
    <Window id="resume" title="Resume" onClose={onClose}>
      <div className="p-4">

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
