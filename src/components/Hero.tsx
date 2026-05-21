"use client";

import { motion } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { NetworkBackground } from "./NetworkBackground";

export function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Animated Elements */}
      <NetworkBackground />
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <span className="px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-400 text-sm font-mono bg-cyan-500/5">
             Welcome to my Nexus
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 text-white glow-text"
        >
          Siddharth Vijayakumar
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl md:text-3xl text-gray-400 mb-8 h-[40px]"
        >
          I am a <span className="text-cyan-400 font-semibold">
            <Typewriter
              words={[
                "Data Science Enthusiast",
                "AI & ML Developer",
                "Power BI Analyst",
                "Full Stack Developer",
                "DSA Problem Solver"
              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-6"
        >
          <a
            href="/Siddharth%20Resume%202026%20-%20updated.pdf"
            download="Siddharth Resume 2026 - updated.pdf"
            className="flex items-center gap-2 px-8 py-4 bg-cyan-500 text-black font-semibold rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          >
            Download Resume <Download size={20} />
          </a>
          
          <div className="flex items-center gap-4">
            <SocialLink href="https://linkedin.com/in/siddharth-vijayakumar" icon={<FaLinkedin size={24} />} />
            <SocialLink href="https://github.com/siddharth-006" icon={<FaGithub size={24} />} />
            <SocialLink href="https://leetcode.com/u/siddharth006/" icon={<SiLeetcode size={24} />} />
            <SocialLink href="https://codolio.com/profile/siddharth006" icon={<CodolioIcon />} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-500"
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-mono">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
    >
      {icon}
    </a>
  );
}

function CodolioIcon() {
  return (
    <img
      src="/codolio-icon.svg"
      alt="Codolio"
      className="h-8 w-8 object-contain"
    />
  );
}