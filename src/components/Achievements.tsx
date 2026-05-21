"use client";

import { motion } from "framer-motion";
import { Award, Medal, Trophy } from "lucide-react";

const achievements = [
  "Top 5 at V-Medithon Hackathon",
  "State-level Taekwondo Runner-up",
  "District Gold Medalist",
  "Zonal Handball Champion",
  "Mentoring 100+ students",
  "Organized coding contests and workshops"
];

const certifications = [
  "Deloitte Data Analytics Simulation",
  "IIT Madras ML with Python",
  "IIT Madras Data Science",
  "IBM Python for Data Science",
  "Cisco Python Essentials"
];

export function Achievements() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Achievements */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Trophy className="text-yellow-400" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Milestones
                </span>
              </h2>
            </motion.div>
            
            <div className="space-y-4">
              {achievements.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 border border-white/5 hover:border-yellow-500/30 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform">
                    <Medal size={20} />
                  </div>
                  <span className="text-gray-300 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Award className="text-cyan-400" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Certifications
                </span>
              </h2>
            </motion.div>
            
            <div className="space-y-4">
              {certifications.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Award size={20} />
                  </div>
                  <span className="text-gray-300 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}