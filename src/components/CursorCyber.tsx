"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorCyber() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [isVisible]);

  // Number of trailing data nodes
  const trailCount = 10;

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-screen hidden md:block">
      {/* 
        1. Neural/Data snake trail dynamically shifting from Cyan to Purple.
        Each segment uses progressive spring dampening to follow smoothly like a fluid tail.
      */}
      {Array.from({ length: trailCount }).map((_, index) => {
        const isHead = index === 0;
        // Shift hue from Cyan (190) to Deep Purple (270)
        const hue = 190 + (index * 8); 
        const size = isHead ? 10 : Math.max(2, 10 - index);
        const offset = -size / 2;
        
        return (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: `hsl(${hue}, 100%, 60%)`,
              boxShadow: `0 0 ${12 - index}px hsl(${hue}, 100%, 60%)`,
              top: offset,
              left: offset,
            }}
            animate={{
              x: mousePosition.x + 16, // Offset to trail from the center "tail" without a gap
              y: mousePosition.y + 16,
            }}
            transition={{
              type: "spring",
              stiffness: 1200 - index * 100, // Lower stiffness = lagging behind
              damping: 25 + index * 3,     // Higher damping = smoother braking
              mass: 0.1 + index * 0.05,
            }}
          />
        );
      })}

      {/* 2. Outer Rotating Sci-Fi Diamond (Cyan) */}
      <motion.div
        className="absolute border border-cyan-400/40"
        style={{
          width: 40,
          height: 40,
          top: -20,
          left: -20,
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          boxShadow: "0 0 15px rgba(6,182,212,0.3)",
        }}
        animate={{
          x: mousePosition.x + 16,
          y: mousePosition.y + 16,
          rotate: 360,
        }}
        transition={{
          x: { type: "spring", stiffness: 1200, damping: 25, mass: 0.1 },
          y: { type: "spring", stiffness: 1200, damping: 25, mass: 0.1 },
          rotate: { repeat: Infinity, duration: 8, ease: "linear" },
        }}
      />
      
      {/* 3. Inner Reverse Rotating Sci-Fi Diamond (Purple) */}
      <motion.div
        className="absolute border border-purple-500/60 transition-opacity"
        style={{
          width: 20,
          height: 20,
          top: -10,
          left: -10,
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
        animate={{
          x: mousePosition.x + 16,
          y: mousePosition.y + 16,
          rotate: -360,
        }}
        transition={{
          x: { type: "spring", stiffness: 1200, damping: 25, mass: 0.1 },
          y: { type: "spring", stiffness: 1200, damping: 25, mass: 0.1 },
          rotate: { repeat: Infinity, duration: 4, ease: "linear" },
        }}
      />
    </div>
  );
}
