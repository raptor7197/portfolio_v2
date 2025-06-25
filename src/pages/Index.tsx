
import React from 'react';
import ThreeBackground from '../components/ThreeBackground';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Hobbies from '../components/Hobbies';
import Contact from '../components/Contact';
import CustomCursor from '../components/CustomCursor';
import GitHubStats from '../components/GitHubStats';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative terminal-bg">
      <CustomCursor />
      <ThreeBackground />
      
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none z-0"></div>
      
      <Navigation />
      
      <div id="home">
        <Hero />
      </div>
      
      <div id="about">
        <AboutMe />
      </div>
      
      <div id="skills">
        <Skills />
      </div>
      
      <div id="projects">
        {/* <Projects /> */}
      </div>
      
      <div id="experience">
        {/* <Experience /> */}
      </div>
      
      <div id="github">
        <GitHubStats />
      </div>
      
      <div id="hobbies">
        <Hobbies />
      </div>
      
      <div id="contact">
        <Contact />
      </div>

      <footer className="relative z-10 bg-gray-900/90 border-t border-green-500/30 py-8">
        <div className="container mx-auto px-6">
          <div className="bg-gray-900 border border-green-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400 font-mono text-sm ml-4">~/portfolio</span>
            </div>
            <p className="text-green-400 font-mono text-sm">
              <span className="text-gray-500">$</span> {new Date().getFullYear()} Vamsi Krishna. No rights reserved Do what you like "
              <span className="animate-terminal-blink ml-1">__</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
