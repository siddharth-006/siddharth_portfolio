"use client";

import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill out all fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success state after a few seconds
      setTimeout(() => setStatus("idle"), 5000);
      
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "An unexpected error occurred.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background visual */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] z-0" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500">
              Initiate Connection
            </span>
          </h2>
          <div className="w-24 h-1 bg-purple-500/50 mx-auto rounded-full glow-card" />
        </motion.div>

        <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-3xl glow-card border border-white/5 bg-black/40">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Let&apos;s Build the Future</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Whether you have a question, a project idea, or just want to say hi, my inbox is always open. Let&apos;s connect and create something amazing together.
              </p>

              <div className="space-y-6">
                <a href="mailto:siddharth.v006@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all border border-white/5">
                    <Mail size={20} />
                  </div>
                  <span>siddharth.v006@gmail.com</span>
                </a>
                <a href="https://linkedin.com/in/siddharth-vijayakumar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all border border-white/5">
                    <FaLinkedin size={20} />
                  </div>
                  <span>LinkedIn Profile</span>
                </a>
                <a href="https://github.com/siddharth-006" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all border border-white/5">
                    <FaGithub size={20} />
                  </div>
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={status === "loading"}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all disabled:opacity-50"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={status === "loading"}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all disabled:opacity-50"
                  required
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Message Protocol..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={status === "loading"}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none disabled:opacity-50"
                  required
                />
              </div>
              
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-950/30 p-3 rounded-xl border border-red-500/30">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}
              
              {status === "success" && (
                <div className="flex items-center gap-2 text-green-400 text-sm bg-green-950/30 p-3 rounded-xl border border-green-500/30">
                  <CheckCircle size={16} />
                  <span>Message intercepted successfully. I will get back to you!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transform hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    Transmitting... <Loader2 size={18} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Transmit Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Footer text */}
      <div className="text-center mt-24 text-gray-500 text-sm font-mono">
        <p>&copy; {new Date().getFullYear()} Siddharth Vijayakumar. All Systems Operational.</p>
      </div>
    </section>
  );
}