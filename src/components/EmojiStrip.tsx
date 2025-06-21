import React from 'react';

const EmojiStrip = () => {
  const techEmojis = [
    { emoji: '⚛️', name: 'React', url: 'https://reactjs.org' },
    { emoji: '📘', name: 'TypeScript', url: 'https://typescriptlang.org' },
    { emoji: '🟢', name: 'Node.js', url: 'https://nodejs.org' },
    { emoji: '🎮', name: 'Three.js', url: 'https://threejs.org' },
    { emoji: '🐍', name: 'Python', url: 'https://python.org' },
    { emoji: '🍃', name: 'MongoDB', url: 'https://mongodb.com' },
    { emoji: '🔥', name: 'Firebase', url: 'https://firebase.google.com' },
    { emoji: '⚡', name: 'Vite', url: 'https://vitejs.dev' },
    { emoji: '🎨', name: 'Tailwind', url: 'https://tailwindcss.com' },
    { emoji: '🚀', name: 'Vercel', url: 'https://vercel.com' },
    { emoji: '💾', name: 'PostgreSQL', url: 'https://postgresql.org' },
    { emoji: '🐳', name: 'Docker', url: 'https://docker.com' }
  ];

  const handleEmojiClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative overflow-hidden py-8 bg-gradient-to-r from-transparent via-green-500/5 to-transparent border-y border-green-500/20 glow-hover">
      <div className="flex animate-marquee">
        {[...techEmojis, ...techEmojis].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex-shrink-0 mx-6 cursor-pointer group transition-all duration-300 hover:scale-125 hover:rotate-6 glow-hover"
            onClick={() => handleEmojiClick(tech.url)}
            title={tech.name}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-3xl md:text-4xl filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300 group-hover:brightness-125">
                {tech.emoji}
              </span>
              <span className="text-xs text-green-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiStrip;
