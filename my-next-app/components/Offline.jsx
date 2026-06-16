import React from 'react';
import { motion } from 'framer-motion';

const Offline = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 overflow-hidden relative">
      
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      {/* Pulse Effect for Signal Loss */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 blur-[100px] rounded-full animate-pulse" />

      <div className="text-center relative z-10">
        {/* Animated Signal Icon */}
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8 flex justify-center"
        >
          <div className="w-20 h-20 rounded-full border-2 border-red-500/30 flex items-center justify-center">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tight">
              Signal <span className="text-red-500">Terminated</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">
              Protocol: OFFLINE_MODE // Network Link: Severed
            </p>
          </div>

          <p className="max-w-md mx-auto text-slate-500 font-medium italic text-lg leading-relaxed">
            The system has lost connection to the primary nexus. Please check your local hardware configuration and wait for signal restoration.
          </p>

          <div className="pt-10">
            <button 
              onClick={() => window.location.reload()}
              className="px-12 py-5 border border-white/10 hover:border-red-500/50 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all bg-white/5"
            >
              Attempt Reconnection
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Terminal Lines */}
      <div className="absolute bottom-10 right-10 hidden md:block text-right">
        <p className="text-red-900/40 font-mono text-[10px] uppercase tracking-widest">
          ERROR_CODE: 0x000104 <br />
          LOCAL_DATA_ENCRYPTED: TRUE
        </p>
      </div>
    </div>
  );
};

export default Offline;