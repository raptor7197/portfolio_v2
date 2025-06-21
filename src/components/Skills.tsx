import React, { useState } from "react";
import EmojiStrip from "./EmojiStrip";

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  
  const skills = [
    { 
      name: "React", 
      level: 95, 
      color: "from-green-400 to-green-600",
      description: "Building dynamic UIs with hooks, context, and modern patterns",
      tools: ["Next.js", "Vite", "React Router", "Redux Toolkit"]
    },
    { 
      name: "TypeScript", 
      level: 90, 
      color: "from-blue-400 to-blue-600",
      description: "Type-safe development with advanced generics and utility types",
      tools: ["Zod", "tRPC", "Prisma", "Type Guards"]
    },
    { 
      name: "Node.js", 
      level: 85, 
      color: "from-green-500 to-teal-500",
      description: "Server-side JavaScript with Express, APIs, and microservices",
      tools: ["Express", "Fastify", "Socket.io", "PM2"]
    },
    { 
      name: "Three.js", 
      level: 80, 
      color: "from-purple-400 to-pink-500",
      description: "3D graphics, animations, and interactive web experiences",
      tools: ["R3F", "Drei", "Cannon", "GSAP"]
    },
    { 
      name: "Python", 
      level: 75, 
      color: "from-yellow-400 to-orange-500",
      description: "Data analysis, automation, and backend development",
      tools: ["Django", "FastAPI", "Pandas", "NumPy"]
    },
    { 
      name: "MongoDB", 
      level: 85, 
      color: "from-teal-400 to-blue-500",
      description: "NoSQL database design, aggregation, and scaling",
      tools: ["Mongoose", "Atlas", "Compass", "GridFS"]
    },
  ];

  const handleSkillClick = (skillName: string) => {
    setActiveSkill(activeSkill === skillName ? null : skillName);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 z-10 bg-black/90">
      <div className="container mx-auto max-w-6xl">
        {/* Terminal Header */}
        <div className="text-center mb-20">
          <div className="inline-block bg-gray-900 border border-green-500/30 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400 font-mono text-sm ml-4">~/skills</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-green-400 font-mono">
              <span className="text-gray-500">$</span> ./skills --list
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-mono">
            <span className="text-green-400"># </span>Technologies mastered across the digital realm
          </p>
        </div>

        {/* Moving Emoji Strip */}
        <div className="mb-16">
          <EmojiStrip />
        </div>

        {/* Terminal Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div key={skill.name} className="group">
              {/* Skill Bar */}
              <div 
                className="bg-gray-900 border border-green-500/30 rounded-lg p-4 cursor-pointer hover:border-green-400/50 transition-all duration-300 glow-hover"
                onClick={() => handleSkillClick(skill.name)}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 font-mono text-sm">$</span>
                    <span className="text-white font-mono font-semibold">{skill.name.toLowerCase()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 font-mono text-sm">{skill.level}%</span>
                    <span className="text-green-400 font-mono text-xs">
                      {activeSkill === skill.name ? '[-]' : '[+]'}
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-800 rounded-sm h-2 overflow-hidden border border-gray-700">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 delay-${index * 100}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                
                {/* Terminal Output */}
                <div className="mt-2 flex items-center space-x-2 opacity-60">
                  <span className="text-green-400 font-mono text-xs">&gt;</span>
                  <span className="text-gray-400 font-mono text-xs">Status: Active</span>
                </div>
              </div>

              {/* Expanded Details */}
              {activeSkill === skill.name && (
                <div className="mt-4 bg-gray-900 border border-green-500/30 rounded-lg p-4 animate-fade-in glow-hover">
                  <div className="space-y-3">
                    <div>
                      <span className="text-green-400 font-mono text-sm">Description:</span>
                      <p className="text-gray-300 font-mono text-sm mt-1 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-green-400 font-mono text-sm">Tools & Libraries:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skill.tools.map((tool) => (
                          <span 
                            key={tool}
                            className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs font-mono border border-green-500/20"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-700">
                      <span className="text-gray-500 font-mono text-xs">
                        Last updated: {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Terminal Footer */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gray-900 border border-green-500/30 rounded-lg p-3 glow-hover">
            <span className="text-green-400 font-mono text-sm">
              <span className="text-gray-500">$</span> echo "Skills loaded successfully" 
              <span className="animate-pulse">_</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
