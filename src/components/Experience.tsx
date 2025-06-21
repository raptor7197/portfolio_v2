import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import CertificatesScroller from './CertificatesScroller';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      company: "Spider-Tech Industries",
      location: "New York, NY",
      period: "2022 - Present",
      description: "Leading development of multiverse applications, mentoring junior developers across dimensions, and architecting scalable solutions for interdimensional commerce.",
      achievements: [
        "Built quantum-entangled APIs serving 1M+ users across realities",
        "Reduced interdimensional latency by 40% through spider-web optimization",
        "Led team of 8 developers across parallel universes"
      ]
    },
    {
      id: 2,
      title: "Full-Stack Developer",
      company: "Web Warriors Corp",
      location: "San Francisco, CA",
      period: "2020 - 2022",
      description: "Developed responsive web applications with React and Node.js, integrated with various spider-sense APIs, and collaborated with cross-dimensional teams.",
      achievements: [
        "Launched 15+ web applications with 99.9% uptime",
        "Implemented advanced spider-tracking analytics",
        "Optimized performance across multiple dimensions"
      ]
    },
    {
      id: 3,
      title: "Junior Developer",
      company: "Daily Bugle Digital",
      location: "New York, NY",
      period: "2019 - 2020",
      description: "Started my journey in web development, learning the ropes of modern frameworks and discovering my spider-powers in code.",
      achievements: [
        "Contributed to 10+ open-source web-slinging projects",
        "Learned React, Vue, and Angular across the spider-verse",
        "Built responsive designs for heroes and villains alike"
      ]
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            My journey through the dimensions of code
          </p>
        </div>

        <CertificatesScroller />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="group relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-purple-500 to-blue-500 rounded-full transform group-hover:scale-105 transition-transform duration-300" />
              
              <div className="ml-8 p-8 rounded-2xl bg-gradient-to-br from-red-500/5 via-purple-500/5 to-blue-500/5 border border-white/10 hover:border-red-500/30 transition-all duration-500 backdrop-blur glow-hover-pink">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2 md:mb-0">{exp.title}</h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {exp.period}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h4 className="text-xl text-red-400 font-semibold mb-2 md:mb-0">{exp.company}</h4>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {exp.location}
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>
                
                <div className="space-y-2">
                  <h5 className="text-white font-semibold mb-3">Key Achievements:</h5>
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
