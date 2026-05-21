"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GiBat } from "react-icons/gi";

export function CursorBat() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track previous position to calculate rotation/direction
  const [rotation, setRotation] = useState(0);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setMousePosition({ x, y });
      
      // Calculate angle based on movement direction
      const dx = x - prevPosition.x;
      const dy = y - prevPosition.y;
      
      // Only update rotation if we moved a bit to avoid jitter
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        // Calculate angle in degrees
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        // Add 90 because the bat icon naturally faces up, we want it to face the direction of movement
        setRotation(angle + 90);
        setPrevPosition({ x, y });
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [prevPosition]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
      animate={{
        x: mousePosition.x - 20, // Center the icon
        y: mousePosition.y - 20,
        rotate: rotation,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.8,
      }}
    >
      <GiBat size={40} />
    </motion.div>
  );
}