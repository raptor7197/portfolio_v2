
import React, { useState } from 'react';
import {
  Atom, // React
  Chrome,
  Layers,
  Feather,
  TerminalSquare,
  Database,
  Cloud,
  CloudLightning,
  GitBranch,
  Dock,
  Figma,
  BugPlay,
  Server,
  PackageOpen,
  Shield,
  FileCode2,
  Smartphone
} from "lucide-react";

// Technologies grouped by domain, using only official Lucide icons
const GROUPS = [
  {
    key: 'frontend',
    label: 'Frontend',
    color: "from-cyan-400 to-sky-600",
    technologies: [
      { name: "React", Icon: Atom },
      { name: "TypeScript", Icon: Chrome },
      { name: "Next.js", Icon: Layers },
      { name: "Tailwind", Icon: Feather }
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    color: "from-violet-400 to-fuchsia-600",
    technologies: [
      { name: "Node.js", Icon: TerminalSquare },
      { name: "PostgreSQL", Icon: Database },
      { name: "GraphQL", Icon: Server },
      { name: "MongoDB", Icon: PackageOpen }
    ],
  },
  {
    key: 'devops',
    label: 'DevOps',
    color: "from-emerald-400 to-cyan-600",
    technologies: [
      { name: "AWS", Icon: Cloud },
      { name: "Firebase", Icon: CloudLightning },
      { name: "Git", Icon: GitBranch },
      { name: "Docker", Icon: Dock }
    ],
  },
  {
    key: 'cybersec',
    label: 'Cybersecurity',
    color: "from-rose-400 to-red-600",
    technologies: [
      { name: "Security", Icon: Shield },
      { name: "Code", Icon: FileCode2 }
    ],
  },
  {
    key: 'design',
    label: 'Design',
    color: "from-pink-400 to-purple-600",
    technologies: [
      { name: "Figma", Icon: Figma },
      { name: "Mobile", Icon: Smartphone }
    ],
  }
];

const centerIcon = <BugPlay className="w-8 h-8 text-white" />; // Python as central logo

function getPosition(index: number, total: number, radius: number, open: boolean) {
  // Arm position (if open, the arm extends further)
  // 0 = top, rotates around circle
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const armLength = open ? radius * 1.45 : radius;
  return {
    x: Math.cos(angle) * armLength,
    y: Math.sin(angle) * armLength,
  };
}

const TechSpider: React.FC = () => {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Responsiveness: adjust radius based on screen size
  const RADIUS = 92; // px base (adjust below)
  const TECH_RADIUS = 40; // px radius for tech items when arm open

  // SVG ViewBox center
  const center = 200;
  const mainRadius = RADIUS;
  const armCount = GROUPS.length;

  // For responsive hexagons, set sizes in rem/em for container flex.
  return (
    <div className="relative flex items-center justify-center min-h-[400px] w-full py-6 sm:py-8 md:py-12 select-none">
      {/* Spider Web SVG lines */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        width={center * 2}
        height={center * 2}
        style={{ zIndex: 1, maxWidth: '100vw' }}
      >
        {GROUPS.map((group, i) => {
          const { x, y } = getPosition(i, armCount, mainRadius + 46, openGroup === group.key);
          return (
            <line
              key={group.key}
              x1={center}
              y1={center}
              x2={center + x}
              y2={center + y}
              stroke={`url(#${group.key}-stroke)`}
              strokeWidth={openGroup === group.key ? 4 : 2}
              strokeDasharray="2 4"
              style={{
                transition: 'all 0.4s cubic-bezier(.5,2,.8,1)',
                opacity: 0.78
              }}
            />
          );
        })}
        {/* Gradients for arm color */}
        <defs>
          {GROUPS.map(group => (
            <linearGradient key={group.key} id={`${group.key}-stroke`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="80%" stopColor="#8b5cf6" />
            </linearGradient>
          ))}
        </defs>
      </svg>
      {/* Central Hexagon */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-default"
        style={{
          width: 96,
          height: 96
        }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <div
            className={`bg-gradient-to-br from-cyan-600 via-fuchsia-600/60 to-slate-900 shadow-2xl border-4 border-cyan-400/70 rounded-[18%] 
                flex items-center justify-center w-full h-full animate-glow`}
            style={{
              clipPath:
                "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
            }}
          >
            {centerIcon}
          </div>
        </div>
      </div>
      {/* Sub Hexagons */}
      {GROUPS.map((group, i) => {
        const { x, y } = getPosition(i, armCount, mainRadius + 46, openGroup === group.key);
        return (
          <div
            key={group.key}
            className="absolute z-20 group"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transition: "all 0.38s cubic-bezier(.5,2,.8,1)",
              transform: `translate(-50%,-50%) scale(${openGroup === group.key ? 1.12 : 1})`,
              cursor: "pointer"
            }}
            onClick={() => setOpenGroup(openGroup === group.key ? null : group.key)}
            tabIndex={0}
            aria-label={group.label}
          >
            <div
              className={`relative bg-gradient-to-br ${group.color} p-1 rounded-[19%] shadow-xl hover:scale-110 transition-transform`}
              style={{
                clipPath:
                  "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
                minWidth: 72,
                minHeight: 72,
                maxWidth: 92,
                maxHeight: 92,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              <span className="w-full h-full flex items-center justify-center font-semibold tracking-wider text-white text-sm sm:text-base select-none px-2 text-center drop-shadow-2xl"
                style={{ userSelect: "none" }}>
                {group.label}
              </span>
              {openGroup === group.key && (
                <span className="absolute -top-2 -right-2 bg-slate-800 border border-slate-300/30 rounded-full text-xs text-white px-1.5 py-0.5 ring-2 ring-white/80 z-50 animate-fade-in">
                  ×
                </span>
              )}
            </div>
            {/* Connected technologies, if open */}
            {openGroup === group.key && (
              <div className="absolute left-1/2 top-1/2 z-20" style={{ transform: 'translate(-50%,-60%)', width: 210, maxWidth: '38vw' }}>
                <div className="grid grid-cols-2 gap-4 sm:gap-5 mt-8 p-3 rounded-xl bg-slate-950/95 shadow-xl border border-cyan-400/20 animate-fade-in">
                  {group.technologies.map(({ name, Icon }) => (
                    <div key={name} className="flex flex-col items-center space-y-2">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-slate-800/90 border border-slate-600 shadow hover:bg-slate-700 duration-300">
                        <Icon className="w-7 h-7 mx-auto text-white" />
                      </span>
                      <span className="text-xs text-gray-200">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
      {/* Responsive Fallback for mobile */}
      <div className="sm:hidden flex flex-col items-center w-full gap-4 mt-3 z-20">
        {GROUPS.map((group) =>
          <div key={group.key} className="w-full">
            <button
              className={`w-full bg-gradient-to-r ${group.color} rounded-xl py-2 font-semibold text-white text-base shadow mb-1`}
              onClick={() => setOpenGroup(openGroup === group.key ? null : group.key)}
              aria-label={group.label}
            >
              {group.label}
            </button>
            {openGroup === group.key && (
              <div className="grid grid-cols-2 gap-3 p-2 rounded-b-xl bg-slate-900 border border-cyan-400/10 animate-fade-in">
                {group.technologies.map(({ name, Icon }) => (
                  <div key={name} className="flex flex-col items-center space-y-1">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded bg-slate-800/90 border border-slate-700">
                      <Icon className="w-6 h-6 text-white" />
                    </span>
                    <span className="text-xs text-gray-200">{name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechSpider;
