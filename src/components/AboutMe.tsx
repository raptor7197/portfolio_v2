
import React from 'react';
import { User, Code, Coffee, Lightbulb } from 'lucide-react';

const AboutMe = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 z-10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <User className="w-5 h-5 text-green-400" />
            <span className="uppercase tracking-widest text-lg font-bold text-green-200">
              About Me
            </span>
          </span>
          {/* <h2 className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-pink-400">
            ~/about-me
          </h2> */}
        </div>

        <div className="bg-gray-900/90 backdrop-blur border border-green-500/30 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-gray-800/50 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-400 font-mono text-sm">~/about/profile.md</span>
          </div>

          <div className="p-10">
            <div className="font-mono text-sm text-green-400 mb-4">
              <span className="text-gray-500">$</span> cat profile.md
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-6 font-mono text-base">
                Hey there! I'm a developer in the making — currently juggling  multiple unfinished projects and the occasional existential crisis. While I don't have years of experience yet, I do have an unhealthy number of Stack Overflow tabs open and a passion for turning "why isn’t this working?!" into “ohhh, that’s why.” 
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-6 font-display text-base">
               If debugging is the process of removing bugs, then programming must be the process of putting them in</p>
              
              <p className="text-gray-300 leading-relaxed mb-8 font-mono text-base">
                When I'm not coding, you'll find me sleeping or binge watching movies/series,  
                or trying to figure out how to find myself a girlfriend. I’m always up for a challenge, whether it’s picking up a new framework , figuring out how to fix my broken sleep schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
                <Code className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-white font-mono font-semibold">since 2023 </div>
                  <div className="text-gray-400 font-mono text-sm"> exploring the tech world</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
                <Coffee className="w-6 h-6 text-yellow-400" />
                <div>
                  <div className="text-white font-mono font-semibold">342+</div>
                  <div className="text-gray-400 font-mono text-sm">Addicted to coffee</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
                <Lightbulb className="w-6 h-6 text-pink-400" />
                <div>
                  <div className="text-white font-mono font-semibold">5+</div>
                  <div className="text-gray-400 font-mono text-sm">Projects Built</div>
                  <div className="text-gray-400 font-mono text-">and many more in the making ...</div>

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
