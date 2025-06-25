import React, { useState } from "react";
import EmojiStrip from "./EmojiStrip";

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  
  const skills = [
    { 
      name: "Frontend", 
      level: 85, 
      color: "from-green-400 to-green-600",
      description: "Building breathtaking UIs with hooks, context, and modern patterns",
      tools: ["Next.js", "React", "Tailwindcss", "vite","HTML & CSS","TypeScript"]
    },
    { 
      name: "Backend", 
      level: 60, 
      color: "from-blue-400 to-blue-600",
      description: "Building the behind-the-scenes of websites and applications",
      tools: ["Express", "Django", "RESTAPI's", "NodeJS" ,"MySQL","Websockets"]
    },
    { 
      name: "Machine learning", 
      level: 65, 
      color: "from-teal-400 to-blue-500",
      description: "Creating intelligent systems that learn from data and make predictions",
      tools: ["Numpy and Pandas", "Tensorflow", "BeautifulSoup", "Scikit-learn", "Matplotlib", "Seaborn", "PyTorch", "NLTK",]
    },
    
    
    { 
      name: "Devops", 
      level: 55, 
      color: "from-yellow-400 to-orange-500",
      description: "Hosting applications, managing servers, and automating workflows",
      tools: ["Docker", "Kubernetes", "CI/CD", "Terraform","AWS", "GitHub Actions", "Jenkins", "Grafana"]
    },
    { 
      name: "Quantum", 
      level: 45, 
      color: "from-teal-400 to-blue-500",
      description: "A niche and upcoming field",
      tools: ["Pennylane", "Qiskit", "Mitiq", "Quantum Circuits","Quantum Machine Learning"]
    },
    { 
      name: "Softwares", 
      level: 75, 
      color: "from-green-500 to-teal-500",
      description: "various tools that i use in my daily Life",
      tools: ["Git & Github", "Docker", "Figma","VS code","Postman", "MongoDB Compass","Linux"]
    },
    
  ];

  const handleSkillClick = (skillName: string) => {
    setActiveSkill(activeSkill === skillName ? null : skillName);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 z-10 bg-black/50 border-t border-b border-green-500/60">
      <div className="container mx-auto max-w-6xl">
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

        <div className="mb-16">
          {/* <EmojiStrip />  */}
          {/* this has to be changed */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div key={skill.name} className="group">
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
                
                <div className="w-full bg-gray-800 rounded-sm h-2 overflow-hidden border border-gray-700">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 delay-${index * 100}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                
                <div className="mt-2 flex items-center space-x-2 opacity-60">
                  <span className="text-green-400 font-mono text-xs">&gt;</span>
                  <span className="text-gray-400 font-mono text-xs">Status: Active</span>
                </div>
              </div>

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
              <span className="animate-pulse">_.</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
