
import React from 'react';
import { User, Code, Coffee, Lightbulb } from 'lucide-react';

const AboutMe = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 z-10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <User className="w-5 h-5 text-green-400" />
            <span className="uppercase tracking-widest text-xs font-bold text-green-300">
              About Me
            </span>
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-pink-400">
            ~/about-me
          </h2>
        </div>

        <div className="bg-gray-900/90 backdrop-blur border border-green-500/30 rounded-lg overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-gray-800/50 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-400 font-mono text-sm">~/about/profile.md</span>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="font-mono text-sm text-green-400 mb-4">
              <span className="text-gray-500">$</span> cat profile.md
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-6 font-mono text-base">
                Hey there! I'm a passionate full-stack developer who thrives on turning complex problems into elegant, 
                user-friendly solutions. With over 5 years of experience in the tech industry, I've had the privilege 
                of working with cutting-edge technologies and collaborating with amazing teams to build impactful applications.
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-6 font-mono text-base">
                My journey started with a curiosity about how websites work, which quickly evolved into a deep love for 
                coding and software architecture. I specialize in React, Node.js, and modern web technologies, but I'm 
                always eager to learn new tools and frameworks that can enhance the development experience.
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-8 font-mono text-base">
                When I'm not coding, you'll find me exploring the latest tech trends, contributing to open-source projects, 
                or sharing knowledge with the developer community. I believe in writing clean, maintainable code and 
                creating digital experiences that make a difference.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
                <Code className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-white font-mono font-semibold">5+ Years</div>
                  <div className="text-gray-400 font-mono text-sm">Experience</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
                <Coffee className="w-6 h-6 text-yellow-400" />
                <div>
                  <div className="text-white font-mono font-semibold">1000+</div>
                  <div className="text-gray-400 font-mono text-sm">Cups of Coffee</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
                <Lightbulb className="w-6 h-6 text-pink-400" />
                <div>
                  <div className="text-white font-mono font-semibold">50+</div>
                  <div className="text-gray-400 font-mono text-sm">Projects Built</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
