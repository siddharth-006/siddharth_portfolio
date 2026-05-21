"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Reveal3DProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down" | "none";
  delay?: number;
  className?: string;
}

export function Reveal3D({ 
  children, 
  direction = "up", 
  delay = 0, 
  className = "" 
}: Reveal3DProps) {
  const isLeft = direction === "left";
  const isRight = direction === "right";
  
  const fromX = isLeft ? -120 : isRight ? 120 : 0;
  const fromY = direction === "up" ? 100 : direction === "down" ? -100 : 0;
  // Rotate heading from one side with rotateY
  const fromRotateY = isLeft ? -35 : isRight ? 35 : 0;

  return (
    <div style={{ perspective: "1000px" }} className={className}>
      <motion.div
        custom={direction}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { 
            opacity: 0, 
            x: fromX, 
            y: fromY,
            z: -400, // Elements initially far away in Z-axis
            rotateY: fromRotateY,
            rotateX: direction === "up" ? 15 : direction === "down" ? -15 : 0,
            filter: "blur(12px)", // Blur-to-focus transition
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            z: 0,
            rotateY: 0,
            rotateX: 0,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 70,
              damping: 20,
              mass: 1,
              duration: 1.2,
              delay: delay,
            }
          }
        }}
        // Adding glow/shadow during reveal and float post-reveal
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{
            y: [0, -8, 0],
            filter: [
              "drop-shadow(0px 0px 0px rgba(6, 182, 212, 0))",
              "drop-shadow(0px 10px 20px rgba(168, 85, 247, 0.15))",
              "drop-shadow(0px 0px 0px rgba(6, 182, 212, 0))"
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 1.2 // Stagger the floating motion after reveal
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
