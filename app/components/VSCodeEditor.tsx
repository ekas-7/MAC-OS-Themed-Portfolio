import React, { useState } from "react";
import {
  File,
  ChevronDown,
  ChevronRight,
  Star,
  Plus,
} from "lucide-react";

interface FileData {
  name: string;
  content: string;
}

interface Project {
  description: string;
  files: FileData[];
}

interface ProjectFiles {
  [key: string]: Project;
}

interface ExpandedState {
  [key: string]: { files: boolean; description: boolean };
}

const VSCodeEditor: React.FC = () => {
  const [projects, setProjects] = useState<ProjectFiles>({
    eminem: {
      description: ``,
      files: [
        {
          name: "biography.md",
          content: `# Marshall Bruce Mathers III (Eminem)
Born: October 17, 1972
Origin: Detroit, Michigan`,
        },
        {
          name: "hi-mynameis.css",
          content: `.eminem-style {
  background-color: #212121;
  color: #fff;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
}

.eminem-style:hover {
  background-color: #444;
  cursor: pointer;
}
`,
        },
      ],
    },
    sidhu: {
      description: ``,
      files: [
        {
          name: "biography.md",
          content: `# Shubhdeep Singh Sidhu (Sidhu Moose Wala)
Born: June 11, 1993
Origin: Moosa, Punjab`,
        },
        {
          name: "JattDaMuqabala.py",
          content: `def print_lyrics():
    lyrics = """
    
    ਓ, ਵੱਡੇ ਜੋ star ਰਾਤੀ ਡਰ-ਡਰ ਉਥਦੇ ਨੇ
    ਜਦੋਂ ਦਾ ਹੈ ਆਇਆ ਜੱਟ ਕਲਾਕਾਰੀ 'ਚ
    ਭੱਜ ਜਾਂਦੇ ਖੜ੍ਹਦਾ ਐ Sidhu Moose Wala ਜਿੱਥੇ ਐ ਨੀ
    ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ ਦੱਸ ਮੈਨੂੰ ਕਿੱਥੇ ਐ ਨੀ
    ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ, ਦੱਸ ਮੈਨੂੰ ਕਿੱਥੇ ਤੇਰੇ ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ
    ਦੱਸ ਮੈਨੂੰ ਕਿੱਥੇ ਐ ਨੀ ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ
    ਦੱਸ ਮੈਨੂੰ ਕਿੱਥੇ ਐ ਨੀ ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ
    Road'an 'ਤੇ ਘੁੰਮਦੀ Benz ਦੇਖ
    Anti'an ਦੀ ਟਾਹਣੀ tense ਦੇਖ
    Bow down, no chance
    ਤੂੰ ਮੇਰੇ ਚਿਹਰੇ 'ਤੇ confidence ਦੇਖ
    ਹੋ, ਬੁੱਕਦਾ ਏ ਜੱਟ loud ਨਹੀਂ
    ਅੱਗੇ-ਪਿੱਛੇ high level crowd ਨੀ
    ਮੌਤ wife ਐ, ਜੱਟ life ਐ
    ਚੌੜ-ਬਾਜੀ ਐਥੇ allowed ਨਹੀਂ
    ਹੋ, ਕਹਿੰਦੇ ਤੇ ਕਹਾਉਂਦੇ ਧੌਣੋ ਫੜ ਥੱਲੇ ਸਿੱਟੇ ਐ ਨੀ
    ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ ਦੱਸ ਮੈਨੂੰ ਕਿੱਥੇ ਐ ਨੀ
    ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ ਦੱਸ ਮੈਨੂੰ ਕਿੱਥੇ ਐ ਨੀ
    ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ, ਦੱਸ ਮੈਨੂੰ ਕਿੱਥੇ ਤੇਰੇ ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ
    ਦੱਸ ਮੈਨੂੰ ਕਿੱਥੇ ਐ ਨੀ ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ
    ਊਂਚਾ उड़के इतना इतराओ मत परिंदो
    मैं औक़ात पे आ गया तो आसमाँ खरीद लूँगा
    Haha! (Snappy)
    ਓ, ਦਿਲ ਦਾ ਨੀ ਮਾੜਾ
    ਤੇਰਾ Sidhu Moose Wala
    ਜੱਟ life, baby
    """
    
    print(lyrics)

print_lyrics()
`,
        },
      ],
    },
    gojo: {
      description: ``,
      files: [
        {
          name: "Six-eyes.html",
          content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Six Eyes</title>
    <style>
        .eye {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: white;
            border: 2px solid black;
            position: absolute;
        }

        .eye.left { left: 50px; top: 100px; }
        .eye.right { right: 50px; top: 100px; }
        .eye.center-left { left: 150px; top: 100px; }
        .eye.center-right { right: 150px; top: 100px; }
        .eye.bottom-left { left: 50px; bottom: 50px; }
        .eye.bottom-right { right: 50px; bottom: 50px; }
    </style>
</head>
<body>

    <div class="eye left"></div>
    <div class="eye right"></div>
    <div class="eye center-left"></div>
    <div class="eye center-right"></div>
    <div class="eye bottom-left"></div>
    <div class="eye bottom-right"></div>

</body>
</html>
`,
        },
        {
          name: "character.ts",
          content: `type TechniqueType = "Infinity" | "Teleportation" | "Reversal";

interface CursedTechnique {
  name: string;
  type: TechniqueType;
}`,
        },
      ],
    },
  });

  const [expandedProjects, setExpandedProjects] = useState<ExpandedState>({
    eminem: { files: true, description: true },
    sidhu: { files: true, description: true },
    gojo: { files: true, description: true },
  });

  const [selectedProject, setSelectedProject] = useState<string>("eminem");
  const [selectedFile, setSelectedFile] = useState<FileData>(
    projects.eminem.files[0]
  );

  const addNewFile = (projectName: string) => {
    const fileName = prompt("Enter file name:");
    if (fileName) {
      const newFile = {
        name: fileName,
        content: "",
      };
      setProjects((prev) => ({
        ...prev,
        [projectName]: {
          ...prev[projectName],
          files: [...prev[projectName].files, newFile],
        },
      }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-300">
      <div className="flex flex-1 text-xs sm:text-sm">
        <div className="w-48 border-r border-gray-700 bg-gray-800">
          <div className="p-2">
            {Object.entries(projects).map(([projectName, project]) => (
              <div key={projectName} className="mb-4">
                <div className="flex items-center justify-between p-1">
                  <div
                    className="flex items-center cursor-pointer hover:bg-gray-700 rounded flex-1"
                    onClick={() =>
                      setExpandedProjects((prev) => ({
                        ...prev,
                        [projectName]: {
                          ...prev[projectName],
                          files: !prev[projectName].files,
                        },
                      }))
                    }
                  >
                    {expandedProjects[projectName].files ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                    <Star
                      size={14}
                      className="mx-2"
                      style={{
                        color:
                          projectName === "eminem"
                            ? "#FFD700"
                            : projectName === "sidhu"
                              ? "#FF4B4B"
                              : "#6366F1",
                      }}
                    />
                    <span className="capitalize">{projectName} Project</span>
                  </div>
                  <button
                    onClick={() => addNewFile(projectName)}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {expandedProjects[projectName].description && (
                  <div className="ml-6 text-sm text-gray-400">
                    {project.description}
                  </div>
                )}

                {expandedProjects[projectName].files &&
                  project.files.map((file) => (
                    <div
                      key={file.name}
                      className={`flex items-center p-1 cursor-pointer rounded hover:bg-gray-700 ml-4 ${selectedFile === file ? "bg-gray-700" : ""
                        }`}
                      onClick={() => {
                        setSelectedProject(projectName);
                        setSelectedFile(file);
                      }}
                    >
                      <File size={12} className="mr-2" />
                      <span>{file.name}</span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="flex">
            <div className="p-4 text-right text-gray-500 bg-gray-800 select-none w-12">
              {selectedFile.content.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              value={selectedFile.content}
              onChange={(e) => {
                const updatedFile = {
                  ...selectedFile,
                  content: e.target.value,
                };
                setProjects((prev) => ({
                  ...prev,
                  [selectedProject]: {
                    ...prev[selectedProject],
                    files: prev[selectedProject].files.map((f) =>
                      f.name === selectedFile.name ? updatedFile : f
                    ),
                  },
                }));
                setSelectedFile(updatedFile);
              }}
              className="p-4 flex-1 bg-gray-900 text-gray-300 font-mono resize-none outline-none"
              spellCheck="false"
              style={{
                minHeight: "100%",
                lineHeight: "1.5",
                tabSize: 2,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSCodeEditor;
