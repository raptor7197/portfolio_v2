
import React, { useRef, useEffect } from "react";
import { Award } from "lucide-react";

const certificates = [
  {
    title: "Full Stack Development",
    issuer: "Tech Academy",
    year: "2023",
    color: "from-emerald-400 to-cyan-500"
  },
  {
    title: "Cloud Solutions Architect",
    issuer: "Cloud Institute",
    year: "2022",
    color: "from-blue-400 to-indigo-500"
  },
  {
    title: "React Specialist",
    issuer: "Frontend Masters",
    year: "2021",
    color: "from-purple-400 to-pink-500"
  },
  {
    title: "Node.js Developer",
    issuer: "Backend Academy",
    year: "2022",
    color: "from-green-400 to-teal-500"
  },
  {
    title: "UI/UX Design",
    issuer: "Design Institute",
    year: "2020",
    color: "from-orange-400 to-red-500"
  }
];

const CertificatesScroller = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="mb-16">
      <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 glow-hover">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 flex items-center gap-3 mb-8">
          <Award className="w-8 h-8 text-green-400" />
          Certifications
        </h3>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-800"
        >
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className={`min-w-[300px] bg-gradient-to-br ${cert.color} rounded-xl shadow-xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up border border-white/20 glow-hover backdrop-blur-sm`}
              style={{
                animationDelay: `${idx * 150}ms`,
                animationFillMode: "backwards"
              }}
            >
              <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                <h4 className="font-bold text-xl text-white mb-3">{cert.title}</h4>
                <div className="text-lg text-white/90 font-medium mb-4">{cert.issuer}</div>
                <div className="flex items-center justify-between">
                  <span className="px-4 py-2 rounded-full text-sm font-bold bg-white/20 text-white backdrop-blur-sm border border-white/30">
                    {cert.year}
                  </span>
                  <Award className="w-5 h-5 text-white/70" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificatesScroller;
