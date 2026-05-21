"use client";

import { motion } from "framer-motion";
import { Reveal3D } from "./Reveal3D";

const skillsTop = [
  {
    category: "Languages",
    items: ["Python", "SQL", "JavaScript"],
  },
  {
    category: "Data Science & AI",
    items: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "MTCNN",
      "Random Forest",
    ],
  },
  {
    category: "Visualization",
    items: ["Power BI", "Tableau", "Matplotlib", "Excel"],
  },
];

const skillsBottom = [
  {
    category: "Frameworks & Tools",
    items: [
      "Flask",
      "Streamlit",
      "Git",
      "GitHub",
      "PostgreSQL",
      "Power Query",
      "DAX",
    ],
  },
  {
    category: "Concepts",
    items: [
      "DSA",
      "DBMS",
      "Machine Learning",
      "Deep Learning",
      "Data Analytics",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] -translate-y-1/2 -z-10" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <Reveal3D direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Technical Arsenal
            </span>
          </h2>
          <div className="w-24 h-1 bg-cyan-500/50 mx-auto rounded-full glow-card" />
        </Reveal3D>

        <div className="flex flex-col gap-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsTop.map((skillGroup, idx) => (
              <Reveal3D
                key={idx}
                direction="up"
                delay={idx * 0.15}
                className="glass p-8 rounded-3xl glow-card border border-white/5 hover:border-cyan-500/30 transition-all bg-black/40"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full border-2 border-cyan-400" />
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 text-sm font-medium text-cyan-50 bg-cyan-500/10 border border-cyan-500/20 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal3D>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:w-2/3 mx-auto">
            {skillsBottom.map((skillGroup, idx) => (
              <Reveal3D
                key={idx}
                direction="up"
                delay={0.45 + idx * 0.15}
                className="glass p-8 rounded-3xl glow-card border border-white/5 hover:border-cyan-500/30 transition-all bg-black/40"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full border-2 border-cyan-400" />
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 text-sm font-medium text-cyan-50 bg-cyan-500/10 border border-cyan-500/20 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}