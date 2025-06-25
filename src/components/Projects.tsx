import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Play, Code2, ExternalLink, Github, ChevronLeft, ChevronRight, Folder, File } from 'lucide-react';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '$ ls projects/',
    'terminal-ecommerce/',
    'cli-chat-app/',
    'task-manager/',
    'portfolio-site/',
    '$ # Type "cd <project-name>" to explore a project',
    '$ # Type "demo <project-name>" to see live preview',
    '$ # Type "help" for available commands'
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const projects = [
    {
      id: 'terminal-ecommerce',
      title: "Terminal E-Commerce",
      description: "A command-line inspired e-commerce platform with CLI-style navigation",
      preview: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Terminal UI"],
      files: [
        { name: "app.js", type: "file", size: "2.4KB" },
        { name: "components/", type: "folder", size: "12 files" },
        { name: "styles/", type: "folder", size: "8 files" },
        { name: "package.json", type: "file", size: "1.2KB" }
      ],
      commands: ["npm start", "npm test", "npm run build"],
      github: "#",
      live: "#",
      demoCode: `// Terminal Shopping Cart
const cart = new ShoppingCart();
cart.add('laptop', 999.99);
cart.add('mouse', 29.99);
console.log(cart.total()); // $1029.98`
    },
    {
      id: 'cli-chat-app',
      title: "CLI Chat Application",
      description: "Real-time chat with terminal aesthetics and command-based interactions",
      preview: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      tech: ["React", "Socket.io", "Node.js", "CLI Design"],
      files: [
        { name: "server.js", type: "file", size: "3.1KB" },
        { name: "client/", type: "folder", size: "15 files" },
        { name: "socket/", type: "folder", size: "5 files" },
        { name: "README.md", type: "file", size: "2.8KB" }
      ],
      commands: ["node server.js", "npm run client", "npm run dev"],
      github: "#",
      live: "#",
      demoCode: `// Real-time messaging
socket.on('message', (data) => {
  terminal.print(\`[\${data.user}]: \${data.msg}\`);
});
socket.emit('message', { user: 'john', msg: 'Hello!' });`
    },
    {
      id: 'task-manager',
      title: "Terminal Task Manager",
      description: "Project management with command-line interface and drag-and-drop",
      preview: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      tech: ["React", "TypeScript", "Firebase", "Terminal CSS"],
      files: [
        { name: "index.ts", type: "file", size: "1.8KB" },
        { name: "tasks/", type: "folder", size: "9 files" },
        { name: "utils/", type: "folder", size: "6 files" },
        { name: "firebase.config.js", type: "file", size: "0.9KB" }
      ],
      commands: ["npm run dev", "npm run build", "firebase deploy"],
      github: "#",
      live: "#",
      demoCode: `// Task Management
const task = new Task('Build awesome UI');
task.setPriority('high');
task.assignTo('developer');
console.log(task.status); // 'in-progress'`
    },
    {
      id: 'portfolio-site',
      title: "Developer Portfolio",
      description: "Terminal-themed portfolio with interactive animations",
      preview: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      tech: ["React", "Three.js", "Tailwind", "Terminal UI"],
      files: [
        { name: "App.tsx", type: "file", size: "4.2KB" },
        { name: "components/", type: "folder", size: "20 files" },
        { name: "hooks/", type: "folder", size: "7 files" },
        { name: "assets/", type: "folder", size: "25 files" }
      ],
      commands: ["npm start", "npm run build", "npm run deploy"],
      github: "#",
      live: "#",
      demoCode: `// 3D Portfolio Animation
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);`
    }
  ];

  const currentProject = projects[activeProject];

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const newHistory = [...terminalHistory, `$ ${command}`];

    if (cmd === 'help') {
      newHistory.push(
        'Available commands:',
        '  ls              - list all projects',
        '  cd <project>    - navigate to project',
        '  demo <project>  - show live preview',
        '  cat <file>      - view file contents',
        '  run <command>   - execute project command',
        '  clear           - clear terminal',
        '  help            - show this help'
      );
    } else if (cmd === 'ls' || cmd === 'ls projects/') {
      newHistory.push('Projects:');
      projects.forEach(p => newHistory.push(`  ${p.id}/`));
    } else if (cmd.startsWith('cd ')) {
      const projectName = cmd.split(' ')[1];
      const projectIndex = projects.findIndex(p => p.id === projectName);
      if (projectIndex !== -1) {
        setActiveProject(projectIndex);
        newHistory.push(`Entering ${projectName}/`);
        newHistory.push('Files:');
        projects[projectIndex].files.forEach(f => {
          const icon = f.type === 'folder' ? '📁' : '📄';
          newHistory.push(`  ${icon} ${f.name} (${f.size})`);
        });
      } else {
        newHistory.push(`cd: ${projectName}: No such project`);
      }
    } else if (cmd.startsWith('demo ')) {
      const projectName = cmd.split(' ')[1];
      const project = projects.find(p => p.id === projectName);
      if (project) {
        newHistory.push(` Launching demo for ${project.title}...`);
        newHistory.push(` Demo running at localhost:3000`);
      } else {
        newHistory.push(`demo: ${projectName}: Project not found`);
      }
    } else if (cmd === 'clear') {
      setTerminalHistory(['$ # Terminal cleared']);
    } else if (cmd.startsWith('cat ')) {
      const filename = cmd.split(' ')[1];
      if (filename === 'package.json') {
        newHistory.push(`{
  "name": "${currentProject.id}",
  "version": "1.0.0",
  "dependencies": {
    ${currentProject.tech.map(t => `"${t.toLowerCase()}": "latest"`).join(',\n    ')}
  }
}`);
      } else {
        newHistory.push(`cat: ${filename}: No such file`);
      }
    } else if (cmd.startsWith('run ')) {
      const runCmd = cmd.split(' ').slice(1).join(' ');
      if (currentProject.commands.includes(runCmd)) {
        newHistory.push(`Running: ${runCmd}`);
        newHistory.push(`✅ ${runCmd} completed successfully`);
      } else {
        newHistory.push(`run: ${runCmd}: Command not found`);
      }
    } else if (cmd) {
      newHistory.push(`${cmd}: command not found. Type 'help' for available commands.`);
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const executeTypingAnimation = (text: string, callback: () => void) => {
    setIsTyping(true);
    let i = 0;
    const timer = setInterval(() => {
      setTerminalInput(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(timer);
        setIsTyping(false);
        setTimeout(callback, 500);
      }
    }, 100);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    setTimeout(() => {
      executeTypingAnimation('ls', () => handleCommand('ls'));
    }, 3000);
  }, []);

  return (
    <section className="relative py-12 sm:py-24 px-4 sm:px-6 z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4 sm:mb-6">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            <span className="uppercase tracking-widest text-xs font-bold text-green-300">
              Interactive Projects
            </span>
          </span>
          <h2 className="text-2xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-pink-400">
            Project Terminal
          </h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Navigate through my projects using real terminal commands
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">

          <div className="order-2 xl:order-1">
            <div className="bg-gray-900/90 backdrop-blur border border-green-500/30 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400 font-mono text-sm">~/projects</span>
              </div>

              <div 
                ref={terminalRef}
                className="h-64 sm:h-80 overflow-y-auto p-4 font-mono text-sm"
              >
                {terminalHistory.map((line, index) => (
                  <div key={index} className={`mb-1 ${line.startsWith('$') ? 'text-green-400' : 'text-gray-300'}`}>
                    {line}
                  </div>
                ))}
                <div className="flex items-center text-green-400">
                  <span>$ </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCommand(terminalInput)}
                    className="flex-1 bg-transparent outline-none ml-1 text-white"
                    placeholder="Type a command..."
                    disabled={isTyping}
                  />
                  <span className={`ml-1 ${isTyping ? 'animate-pulse' : 'animate-terminal-blink'} text-green-400`}>
                    _
                  </span>
                </div>
              </div>
              

              <div className="px-4 py-3 bg-gray-800/30 border-t border-green-500/20">
                <div className="flex flex-wrap gap-2">
                  {['help', 'ls', `cd ${currentProject.id}`, `demo ${currentProject.id}`].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => handleCommand(cmd)}
                      className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs font-mono hover:bg-green-500/30 transition-colors"
                    >
                      {cmd}
                    </button>
                  ))} <div className='animate-pulse text-grey-200'>
                    {`{A work in progress}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 xl:order-2">
            <div className="bg-gray-900/90 backdrop-blur border border-green-500/30 rounded-lg overflow-hidden">
              <div className="px-4 sm:px-6 py-4 bg-gray-800/50 border-b border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={prevProject}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{currentProject.title}</h3>
                    <button
                      onClick={nextProject}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <a href={currentProject.github} className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
                      <Github className="w-4 h-4 text-white" />
                    </a>
                    <a href={currentProject.live} className="p-2 bg-green-500 hover:bg-green-600 rounded transition-colors">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{currentProject.description}</p>
              </div>

              <div className="relative h-32 sm:h-48 overflow-hidden">
                <img
                  src={currentProject.preview}
                  alt={currentProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                  <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white opacity-80" />
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="bg-black/50 rounded-lg p-3 sm:p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-mono text-sm">Live Code Preview</span>
                  </div>
                  <pre className="text-xs sm:text-sm text-gray-300 font-mono overflow-x-auto">
                    {currentProject.demoCode}
                  </pre>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentProject.tech.map((tech, index) => (
                    <span key={index} className="px-2 sm:px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold border border-green-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeProject ? 'bg-green-400 w-6' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
