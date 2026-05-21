"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Sparkles, Heart, Moon } from "lucide-react";

export function AIAssistant() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // States: "resting", "investigating", "tapping", "returning"
  const [state, setState] = useState<"resting" | "investigating" | "tapping" | "returning">("resting");
  const [clickReaction, setClickReaction] = useState<"none" | "happy" | "heart" | "surprised">("none");
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  
  const [windowSize, setWindowSize] = useState({ w: 1000, h: 800 });
  const lastMouseMoveTime = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set initial window size
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      lastMouseMoveTime.current = Date.now();
      
      // If the user moves the mouse while the bot is investigating or tapping, return home
      setState((prev) => {
        if (prev === "investigating" || prev === "tapping") {
          sayMessage("Oh! You're back 👀");
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          
          // Return home after a brief surprised pause
          timeoutRef.current = setTimeout(() => {
            setState("returning");
            timeoutRef.current = setTimeout(() => {
              setState("resting");
            }, 1000);
          }, 1500);

          return "surprised" as any; // Temporary visual state just handled via returning shortly
        }
        return prev;
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Idle check loop
  useEffect(() => {
    const idleCheck = setInterval(() => {
      // Only trigger if resting
      if (state === "resting" && Date.now() - lastMouseMoveTime.current > 7000) {
        setState("investigating");
        sayMessage("Is anyone there? ...");
        
        // Move towards cursor sequence
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setState("tapping");
          sayMessage("Wake up human 👀");
          setClickReaction("surprised");
          
          // Tap animation and then return
          timeoutRef.current = setTimeout(() => {
            setClickReaction("none");
            setState("returning");
            
            timeoutRef.current = setTimeout(() => {
              setState("resting");
            }, 1500);
          }, 2500);
        }, 1500); // Takes 1.5s to float to cursor
      }
    }, 1000);
    return () => clearInterval(idleCheck);
  }, [state]);

  const sayMessage = (msg: string, duration = 3000) => {
    setMessageText(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), duration);
  };

  const handleClick = () => {
    if (state !== "resting") return;
    
    lastMouseMoveTime.current = Date.now(); // Reset idle
    const reactions = ["happy", "heart", "surprised"] as const;
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    setClickReaction(randomReaction);
    
    const responses = [
      "Boop!",
      "Analyzing...",
      "Hi there! 👋",
      "I love data! 🤖"
    ];
    
    if (randomReaction === "heart") {
      sayMessage("You're awesome! 💙");
    } else {
      sayMessage(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    setTimeout(() => {
      setClickReaction("none");
    }, 2000);
  };

  // Eyes Blinking
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    const blinkCycle = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      setTimeout(blinkCycle, Math.random() * 4000 + 2000); // 2-6 sec between blinks
    };
    const timer = setTimeout(blinkCycle, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Compute positions
  const homeX = windowSize.w - 80;
  const homeY = windowSize.h - 80;
  
  let targetX = homeX;
  let targetY = homeY;
  
  if (state === "investigating" || state === "tapping") {
    // Offset slightly from cursor so it doesn't block it
    targetX = mousePos.x + 30;
    targetY = mousePos.y + 30;
  }

  // Calculate eye look direction based on cursor relative to robot
  const dx = mousePos.x - targetX;
  const dy = mousePos.y - targetY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  const maxEyeMove = 4;
  const eyeOffsetX = (dx / (distance || 1)) * Math.min(maxEyeMove, distance / 20);
  const eyeOffsetY = (dy / (distance || 1)) * Math.min(maxEyeMove, distance / 20);

  // Bobbing animation for resting state
  const isSleepy = state === "resting" && Date.now() - lastMouseMoveTime.current > 4000 && Date.now() - lastMouseMoveTime.current <= 7000;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-auto cursor-pointer"
      animate={{ x: targetX, y: targetY }}
      transition={{
        type: "spring",
        damping: state === "investigating" ? 15 : 25,
        stiffness: state === "investigating" ? 60 : 120,
        mass: 1
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <div className="relative -ml-6 -mt-6"> {/* Center offset */}
        
        {/* Reaction icons */}
        <AnimatePresence>
          {clickReaction === "heart" && (
            <motion.div
              key="heart"
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -40, scale: 1.2 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute -top-6 right-0 text-pink-500 z-10"
            >
              <Heart size={20} fill="currentColor" />
            </motion.div>
          )}
          {clickReaction === "surprised" && (
            <motion.div
              key="surprised"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 180 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 right-0 text-cyan-400 z-10"
            >
              <Sparkles size={20} />
            </motion.div>
          )}
          {isSleepy && state === "resting" && (
            <motion.div
              key="sleepy"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: 1, x: 10, y: -20 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-6 right-2 text-purple-400 z-10"
            >
              <Moon size={16} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Speech Bubble */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              key="speech-bubble"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-full mb-3 right-0 origin-bottom-right bg-black/80 border border-cyan-500/40 text-cyan-50 text-xs py-2 px-3 rounded-2xl rounded-br-sm whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-md"
            >
              {messageText}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot Body */}
        <motion.div
          animate={{
            y: [0, -8, 0], // Floating motion
            scale: isHovering ? 1.05 : 1,
            rotate: state === "tapping" ? [0, -15, 15, -10, 0] : (clickReaction === "happy" ? [0, -10, 10, -10, 0] : dx > 50 ? 5 : dx < -50 ? -5 : 0)
          }}
          transition={{
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            scale: { duration: 0.2 },
            rotate: { duration: state === "tapping" || clickReaction === "happy" ? 0.5 : 0.4 }
          }}
          className="relative w-14 h-12 bg-gray-900 border border-gray-700 rounded-[24px] shadow-[0_0_20px_rgba(6,182,212,0.2)] overflow-hidden flex items-center justify-center backdrop-blur-lg"
          style={{
            boxShadow: `inset 0 -4px 10px rgba(0,0,0,0.5), 0 0 ${isHovering ? 30 : 15}px rgba(6,182,212,${isHovering ? 0.6 : 0.3})`
          }}
        >
          {/* Holographic glowing screen / face plate */}
          <div className="absolute inset-1 bg-gradient-to-b from-cyan-950/40 to-black/80 rounded-[20px] overflow-hidden">
            {/* Scanline effect */}
            <motion.div 
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 w-full h-[15%] bg-cyan-400/10 blur-[2px]"
            />
          </div>

          {/* Eyes Container - Moves based on cursor tracking */}
          <motion.div 
            animate={{ x: eyeOffsetX, y: eyeOffsetY }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative z-10 flex gap-3 h-full items-center mt-1"
          >
            {/* Left Eye */}
            <motion.div 
              animate={{ 
                height: isBlinking ? 2 : (clickReaction === "happy" ? 6 : state === "investigating" ? 10 : 8),
                borderRadius: clickReaction === "happy" ? "50% 50% 0 0" : "4px"
              }}
              className={`w-[6px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] rounded-full transition-all duration-100`}
            />
            {/* Right Eye */}
            <motion.div 
              animate={{ 
                height: isBlinking ? 2 : (clickReaction === "happy" ? 6 : state === "investigating" ? 10 : 8),
                borderRadius: clickReaction === "happy" ? "50% 50% 0 0" : "4px"
              }}
              className={`w-[6px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] rounded-full transition-all duration-100`}
            />
          </motion.div>
          
          {/* Small decorative glow spots */}
          <div className="absolute bottom-1 left-3 w-1 h-1 rounded-full bg-purple-500/50" />
          <div className="absolute bottom-1 right-3 w-1 h-1 rounded-full bg-cyan-500/50" />
        </motion.div>
      </div>
    </motion.div>
  );
}