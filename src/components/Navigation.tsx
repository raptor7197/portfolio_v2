
import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', command: './home.sh' },
    { name: 'Projects', href: '#projects', command: './projects.sh' },
    { name: 'Skills', href: '#skills', command: './skills.sh' },
    { name: 'Experience', href: '#experience', command: './experience.sh' },
    { name: 'GitHub', href: '#github', command: './github.sh' },
    { name: 'Contact', href: '#contact', command: './contact.sh' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-3 sm:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <div className={`max-w-5xl w-full mx-auto rounded-lg border transition-all duration-300 pointer-events-auto ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-green-500/50 shadow-lg shadow-green-500/20'
          : 'bg-gray-900/90 border-green-500/30'
      }`}>
        <div className="flex items-center justify-between h-12 sm:h-16 px-3 sm:px-4 md:px-8">
          <div className="flex items-center space-x-2 text-green-400">
            <Terminal className="w-4 h-4 sm:w-6 sm:h-6" />
            <span className="font-mono font-bold text-sm sm:text-lg">~/portfolio</span>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="group relative px-3 py-2 font-mono text-sm text-gray-200 hover:text-green-400 transition-all duration-300 hover:bg-green-500/10 rounded border border-transparent hover:border-green-500/30"
                title={item.command}
              >
                <span className="text-green-400">$ </span>
                {item.name.toLowerCase()}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-green-400 p-1.5 sm:p-2 hover:bg-green-500/10 rounded border border-green-500/30 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-12 sm:top-16 left-0 right-0 rounded-b-lg bg-gray-900/98 border-t border-green-500/30 max-h-[70vh] overflow-y-auto">
            <div className="py-2 sm:py-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 font-mono text-sm sm:text-base text-gray-200 hover:text-green-400 hover:bg-green-500/10 transition-colors duration-300"
                >
                  <span className="text-green-400">$ </span>
                  {item.name.toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
