"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
}

export function DataStreamReveal({ children, delay = 0 }: Props) {
  return (
    <div className="relative group perspective-[1000px]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { 
            opacity: 0, 
            y: 50, 
            z: -200, 
            rotateX: 10,
            filter: "blur(10px)",
            clipPath: "inset(10% 0 10% 0)" // Glitch start
          },
          visible: {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            filter: "blur(0px)",
            clipPath: "inset(0% 0 0% 0)",
            transition: {
              type: "spring",
              damping: 20,
              stiffness: 80,
              duration: 1,
              delay: delay,
            }
          }
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative">
          {children}

          {/* Glitch Overlay effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: [0, 0.4, 0, 0.1, 0],
              x: [-5, 5, -5, 0],
              y: [-1, 2, -1, 0]
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: delay + 0.1 }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent mix-blend-overlay pointer-events-none"
            style={{ clipPath: "polygon(0 10%, 100% 20%, 100% 30%, 0 40%)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}