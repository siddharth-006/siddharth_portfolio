"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
  "Initializing Interface...",
  "Loading Neural Pathways...",
  "Establishing Secure Connection...",
  "Rendering Portfolio Dimensions...",
  "Ready."
];

export function StartupLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Generate random particles only on the client to prevent hydration mismatch
    setParticles(Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 1000,
      y: (Math.random() - 0.5) * 1000,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 0.5,
      duration: Math.random() * 1.5 + 1
    })));

    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, loadingMessages.length - 1));
    }, 600);

    // End loading after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 3200);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="startup-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Ambient Background Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
              className="absolute w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]"
            />
          </div>

          {/* Converging Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
              animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-cyan-400"
              style={{
                width: p.size,
                height: p.size,
                boxShadow: "0 0 10px 2px rgba(6, 182, 212, 0.5)",
              }}
            />
          ))}

          {/* Central Logo / Name */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 mb-8"
            >
              SIDDHARTH
            </motion.div>

            {/* Progress Line */}
            <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative mb-6">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute inset-0 bg-cyan-400 blur-[4px] mix-blend-screen"
              />
            </div>

            {/* Dynamic Changing Text */}
            <div className="h-6 relative w-full flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="absolute text-cyan-500/80 text-sm font-mono tracking-widest uppercase"
                >
                  {loadingMessages[messageIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}