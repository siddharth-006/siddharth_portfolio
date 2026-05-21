"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Code, GraduationCap, Medal, Star, Trophy } from "lucide-react";

const journeyItems = [
  {
    title: "Started Coding",
    description: "Wrote my first lines of code. Developed a passion for programming and logically breaking down problems.",
    date: "2022",
    icon: <Code size={24} />,
    color: "from-green-400 to-emerald-600"
  },
  {
    title: "DSA Journey",
    description: "Dove deep into Data Structures and Algorithms. Solved hundreds of problems continuously expanding algorithmic proficiency.",
    date: "2023 - Present",
    icon: <Trophy size={24} />,
    color: "from-yellow-400 to-amber-600"
  },
  {
    title: "IIT Madras Workshops",
    description: "Attended advanced workshops on Data Science and Web Development. Networked with brilliant minds.",
    date: "2023",
    icon: <Star size={24} />,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Hackathons",
    description: "Competed in multiple hackathons. Built smart solutions under pressure and won accolades for innovation.",
    date: "2023 - Present",
    icon: <Star size={24} />,
    color: "from-cyan-400 to-blue-600"
  },
  {
    title: "AI & ML Projects",
    description: "Developed advanced AI and ML projects, including predictive models and NLP applications. Gained expertise in deep learning.",
    date: "2024 - Present",
    icon: <Code size={24} />,
    color: "from-cyan-500 to-purple-600"
  },
  {
    title: "Operational Head @ GeeksforGeeks",
    description: "Organized coding contests, technical workshops, and led a community of tech enthusiasts in the Student Chapter.",
    date: "2025 - Present",
    icon: <Star size={24} />,
    color: "from-pink-500 to-rose-400"
  },
  {
    title: "Data Science Intern @ Null Class",
    description: "Worked on predictive models, data processing pipelines, and scalable solutions for data analytics.",
    date: "2026",
    icon: <Briefcase size={24} />,
    color: "from-teal-400 to-emerald-500"
  }
];

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="py-20 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My <span className="text-cyan-400">Journey</span></h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main timeline line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 rounded-full transform md:-translate-x-1/2">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] rounded-full origin-top" 
            />
          </div>

          <div className="flex flex-col gap-12">
            {journeyItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative flex items-center md:justify-between w-full">
                  
                  {/* Left Side (Empty on mobile, Content or Empty on desktop) */}
                  <div className={`hidden md:block w-[45%] ${!isEven ? 'order-1' : 'order-1 md:order-none opacity-0'}`}>
                    {!isEven && <TimelineCard item={item} align="right" delay={index * 0.1} />}
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border-4 border-gray-800 z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)] order-1 md:order-none">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className={`w-full h-full rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}
                    >
                      <div className="scale-50">{item.icon}</div>
                    </motion.div>
                  </div>

                  {/* Right Side / Mobile Side */}
                  <div className={`ml-16 md:ml-0 w-full md:w-[45%] ${isEven ? 'order-1' : 'order-1 md:order-none opacity-0 hidden md:block'}`}>
                    {isEven && <TimelineCard item={item} align="left" delay={index * 0.1} />}
                    {/* Mobile always shows on this side */}
                    {!isEven && <div className="md:hidden"><TimelineCard item={item} align="left" delay={index * 0.1} /></div>}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item, align, delay }: { item: any, align: 'left' | 'right', delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-500/50 transition-colors ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      <div className={`absolute top-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-3xl -z-10 group-hover:opacity-20 transition-opacity ${align === 'right' ? 'right-0' : 'left-0'}`} />
      
      <span className="text-cyan-400 font-mono text-sm font-semibold tracking-wider">{item.date}</span>
      <h3 className="text-xl font-bold text-white mt-2 mb-2">{item.title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
    </motion.div>
  );
}