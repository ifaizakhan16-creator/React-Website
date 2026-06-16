import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 overflow-hidden relative">
      
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />

      {/* BIG BACKGROUND TEXT (Absolute to prevent overlap) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="text-[25vw] font-black text-white italic tracking-tighter select-none"
        >
          404
        </motion.h1>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tight">
              Route <span className="text-indigo-500">Not Found</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">
              Error Code: NULL_POINTER_EXCEPTION // Status: Lost
            </p>
          </div>

          <p className="max-w-md mx-auto text-slate-500 font-medium italic text-lg leading-relaxed">
            The directory you are attempting to access does not exist within the current system architecture.
          </p>

          <div className="pt-10">
            <Link 
              to="/" 
              className="px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-2xl shadow-indigo-900/40 inline-block"
            >
              Return to Nexus
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Terminal Lines */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <p className="text-slate-800 font-mono text-[10px] uppercase tracking-widest">
          Terminal Access: Restricted <br />
          System Time: 2026.05.20
        </p>
      </div>
    </div>
  );
};

export default NotFound;