"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { Reveal3D } from "./Reveal3D";

const experiences = [
  {
    role: "Data Science Intern",
    company: "Null Class",
    date: "Recent",
    description: "Worked on predictive models, data processing pipelines, and scalable solutions for data analytics.",
  },
  {
    role: "Operational Head",
    company: "GeeksforGeeks Student Chapter",
    date: "Past",
    description: "Organized coding contests, technical workshops, and led a community of tech enthusiasts.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <Reveal3D direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Experience Timeline
            </span>
          </h2>
          <div className="w-24 h-1 bg-purple-500/50 mx-auto rounded-full glow-card" />
        </Reveal3D>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, idx) => (
            <Reveal3D
              key={idx}
              direction={idx % 2 === 0 ? "left" : "right"}
              delay={idx * 0.2}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline line */}
              <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-transparent hidden md:block" />
              
              <div className="md:grid md:grid-cols-5 items-center gap-8 glass p-8 rounded-3xl glow-card border border-white/5 hover:border-purple-500/30 transition-all bg-black/40">
                <div className="md:col-span-2 mb-4 md:mb-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                    <Briefcase size={18} />
                    <span>{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                    <Calendar size={14} />
                    <span>{exp.date}</span>
                  </div>
                </div>
                
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-bold text-white mb-3">{exp.role}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  );
}