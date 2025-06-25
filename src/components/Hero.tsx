
import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail,Twitter } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullName = 'Vamsi krishna';
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const typingTimer = setInterval(() => {
      if (index < fullName.length) {
        setTypedText(fullName.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingTimer);
      }
    }, 150);

    return () => clearInterval(typingTimer);
  }, [isVisible]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 z-10">
      <div className="container mx-auto text-center relative z-10 max-w-6xl">
        <div className={`mb-6 sm:mb-8 transition-all duration-1000 ${isVisible ? 'animate-float-in' : 'opacity-0'}`}>
          <div className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 sm:p-6 max-w-2xl mx-auto mb-6 sm:mb-8 glow-hover">
            <div className="flex items-center space-x-2 mb-4 overflow-x-auto">
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-400 font-mono text-xs sm:text-sm whitespace-nowrap">~/home/me</span>
            </div>
            <div className="text-left font-mono">
              <p className="text-green-400 text-xs sm:text-sm mb-2">
                <span className="text-gray-500">$</span> whoami..
              </p>
              <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-lexend text-white min-h-[2rem] sm:min-h-[3rem] flex items-center">
                <span className={`transition-opacity duration-600 ${typedText ? 'opacity-100' : 'opacity-50'} break-all`}>
                  {typedText}
                </span>
                <span className={`ml-1 ${isTypingComplete ? 'hidden' : 'animate-terminal-blink'} text-green-400`}>
                  _
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
           Aspiring Software Engineer
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          </p>
        </div>

        <div className={`flex justify-center space-x-4 sm:space-x-6 mb-12 sm:mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <a href="https://github.com/raptor7197" className="p-3 sm:p-4 rounded-lg bg-green-500/10 border border-green-500/30 hover:border-green-500 transition-all duration-300 hover:scale-110 group glow-hover">
            <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-green-400 transition-colors" />
          </a>
          <a href="https://linkedin.com/in/pvamsikrishna" className="p-3 sm:p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 hover:border-blue-500 transition-all duration-300 hover:scale-110 group glow-hover-blue">
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-blue-400 transition-colors" />
          </a>
          <a href="mailto:vamsikrishna.p.me@gmail.com" className="p-3 sm:p-4 rounded-lg bg-pink-500/10 border border-pink-500/30 hover:border-pink-500 transition-all duration-300 hover:scale-110 group glow-hover-pink">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-pink-400 transition-colors" />
          </a>
          <a href="https://x.com/justvamsi7" className="p-3 sm:p-4 rounded-lg bg-violet-500/10 border border-blue-500/30 hover:border-violet-500 transition-all duration-300 hover:scale-110 group glow-hover-pink">
            <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-violrt-400 transition-colors" />
          </a>
        </div>

        <div className={`relative bottom sm:bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex flex-col items-center absolute top-52 left-1/2 transform -translate-x-1/2">
            <span className="text-gray-400 mb-5 text-xs sm:text-sm">Dive in  </span>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6  text-green-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
