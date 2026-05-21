"use client";

import { motion } from "framer-motion";
import { User, Target, Database, Gamepad2 } from "lucide-react";
import { Reveal3D } from "./Reveal3D";

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal3D direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              System Initialization
            </span>
            <br /> About Me
          </h2>
          <div className="w-24 h-1 bg-cyan-500/50 mx-auto rounded-full glow-card" />
        </Reveal3D>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal3D direction="left" delay={0.2} className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              I am a <strong className="text-cyan-400">Computer Science Engineering Student</strong> and an aspiring <strong className="text-purple-400">Data Scientist & AI Engineer</strong>. My journey is fueled by a profound passion for Artificial Intelligence, Machine Learning, and unraveling complex problems through data.
            </p>
            <p>
              Equipped with a solid foundation in software development and competitive programming, I thrive in environments that challenge my problem-solving mindset. I enjoy architecting intelligent systems, real-time analytics dashboards, and impactful applications out of raw data.
            </p>
          </Reveal3D>

          <Reveal3D direction="right" delay={0.4}>
            <div className="w-full max-w-xs mx-auto md:max-w-none grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard icon={<Database className="text-cyan-400" />} title="Data Focus" desc="Analytical & scalable" />
              <InfoCard icon={<Target className="text-purple-400" />} title="Driven" desc="Leadership & mentoring" />
              <InfoCard icon={<Gamepad2 className="text-green-400" />} title="Gamer" desc="Strategic thinking" />
              <InfoCard icon={<User className="text-pink-400" />} title="Athlete" desc="Martial artist & biker" />
            </div>
          </Reveal3D>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass p-6 rounded-2xl flex flex-col items-center text-center gap-3 hover:bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all glow-card">
      <div className="p-3 bg-black/50 rounded-full">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}