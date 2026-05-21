"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";

export function SecretTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: "user" | "system", text: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hidden easter egg key sequence listener
  useEffect(() => {
    let keyBuffer = "";
    const secretCode = "analyzesiddhu";
    const secretCode2 = "aimode";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't listen to key sequences if terminal is already open
      if (isOpen) return;

      keyBuffer += e.key.toLowerCase();
      
      if (keyBuffer.length > Math.max(secretCode.length, secretCode2.length)) {
        keyBuffer = keyBuffer.slice(-Math.max(secretCode.length, secretCode2.length));
      }

      if (keyBuffer.includes(secretCode) || keyBuffer.includes(secretCode2)) {
        setIsOpen(true);
        setHistory([
          { type: "system", text: "ACCESS GRANTED. INITIALIZING SECURE TERMINAL..." },
          { type: "system", text: "Type 'help' for available commands." }
        ]);
        keyBuffer = ""; // reset
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: "user" as const, text: `> ${input}` }];

    switch (cmd) {
      case "help":
        newHistory.push({ type: "system", text: "AVAILABLE COMMANDS:" });
        newHistory.push({ type: "system", text: "- projects: View core systems" });
        newHistory.push({ type: "system", text: "- achievements: View accolades" });
        newHistory.push({ type: "system", text: "- skills: View parameters" });
        newHistory.push({ type: "system", text: "- close/exit: Terminate session" });
        newHistory.push({ type: "system", text: "- sudo rm -rf /: [RESTRICTED]" });
        break;
      case "projects":
        newHistory.push({ type: "system", text: "Fetching project data..." });
        newHistory.push({ type: "system", text: "Found 4 active repositories. Scroll to 'Projects' section for details." });
        setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 1000);
        break;
      case "achievements":
        newHistory.push({ type: "system", text: "Querying timeline..." });
        newHistory.push({ type: "system", text: "Taekwondo state athlete, Hackathon winner, Leadership roles verified." });
        setTimeout(() => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" }), 1000);
        break;
      case "skills":
        newHistory.push({ type: "system", text: "Processing skill matrix..." });
        newHistory.push({ type: "system", text: "Python, Next.js, ML Algorithms, Data Structures operational at 98% efficiency." });
        break;
      case "close":
      case "exit":
        setIsOpen(false);
        setInput("");
        return;
      case "sudo rm -rf /":
        newHistory.push({ type: "system", text: "CRITICAL: Access Denied. Nice try! 😜" });
        break;
      default:
        newHistory.push({ type: "system", text: `Command not found: ${cmd}` });
    }

    setHistory(newHistory);
    setInput("");
    
    // Scroll to bottom of terminal
    setTimeout(() => {
      const termBody = document.getElementById("terminal-body");
      if (termBody) termBody.scrollTop = termBody.scrollHeight;
    }, 10);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-10 right-10 z-[100] w-80 sm:w-[400px] bg-black/90 backdrop-blur-xl border border-cyan-500/50 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.3)] overflow-hidden font-mono text-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-2 border-b border-cyan-500/30 bg-cyan-950/30">
            <div className="flex items-center gap-2 text-cyan-400">
              <TerminalIcon size={16} />
              <span className="font-semibold text-xs tracking-wider">SECURE_TERMINAL_v1.0</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-cyan-400 hover:text-cyan-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div id="terminal-body" className="p-4 h-64 overflow-y-auto flex flex-col gap-2">
            {history.map((msg, i) => (
              <div 
                key={i} 
                className={msg.type === "system" ? "text-cyan-300" : "text-gray-400"}
              >
                {msg.text}
              </div>
            ))}
            
            <form onSubmit={handleCommand} className="flex gap-2 mt-2 text-cyan-400">
              <span>{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none border-none focus:ring-0 text-cyan-400"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}