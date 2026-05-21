"use client";

import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Reveal3D } from "./Reveal3D";

const projects = [
  {
    title: "Facial Emotion Detection System",
    description: "Real-time emotion recognition system that detects 7 emotions. Features confidence visualization and real-time webcam integration.",
    tech: ["TensorFlow", "Keras", "OpenCV", "MTCNN", "Streamlit"],
    link: "https://github.com/siddharth-006/AI-Companion",
    github: "https://github.com/siddharth-006/AI-Companion"
  },
  {
    title: "Blinkit Sales Performance Dashboard",
    description: "Interactive Power BI dashboard detailing analytics across outlet tiers, revenue insights, designed with dashboard-inspired visuals.",
    tech: ["Power BI", "DAX", "Power Query"],
    link: "https://github.com/siddharth-006/Blinkit-Dashboard",
    github: "https://github.com/siddharth-006/Blinkit-Dashboard"
  },
  {
    title: "Executive HR Dashboard",
    description: "Interactive Power BI dashboard for monitoring employee performance, workforce statistics, and organizational insights.",
    tech: ["Power BI", "Power Query", "DAX", "Excel"],
    link: "https://github.com/siddharth-006/Executive-HR-Dashboard",
    github: "https://github.com/siddharth-006/Executive-HR-Dashboard"
  },
  {
    title: "Notification Logging System",
    description: "Backend-focused application to manage, store, and track notifications in real-time with structured logging mechanics.",
    tech: ["Node.js", "JavaScript", "Backend APIs"],
    link: "https://github.com/siddharth-006/notification-logging-system",
    github: "https://github.com/siddharth-006/notification-logging-system"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute center left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <Reveal3D direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Neural Network Links
            </span>
            <br /> Featured Projects
          </h2>
          <div className="w-24 h-1 bg-cyan-500/50 mx-auto rounded-full glow-card" />
        </Reveal3D>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <Reveal3D
              key={idx}
              direction="up"
              delay={idx * 0.15}
              className="glass p-8 rounded-3xl border border-white/5 bg-black/40 h-full flex flex-col hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-cyan-400 group-hover:scale-110 transition-transform">
                  <FolderGit2 size={36} strokeWidth={1.5} />
                </div>
                <div className="flex gap-3">
                  <a href={project.github} className="text-gray-400 hover:text-white hover:scale-110 transition-all">
                    <FaGithub size={22} />
                  </a>
                  <a href={project.link} className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all">
                    <ExternalLink size={22} />
                  </a>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm flex-grow mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  );
}