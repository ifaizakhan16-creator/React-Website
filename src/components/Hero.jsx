import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { scrollY } = useScroll();
  
  // High-end parallax animations
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.85]);

  return (
    <section className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#020617] overflow-hidden z-10">
      
      {/* 1. Animated Tech-Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }}
      />

      {/* 2. Soft Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />

      {/* 3. Hero Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="text-indigo-300 text-xs font-black uppercase tracking-[0.4em]">
            Zero Cost. Human Led.
          </span>
        </motion.div>

        <h1 className="text-7xl md:text-[150px] font-black text-white leading-[0.8] tracking-tighter">
          SKILL <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-t from-indigo-500 to-white">
            WITHOUT <br /> LIMITS.
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-medium leading-relaxed italic"
        >
          Trade your expertise for world-class skills. 
          Join the global network of makers, thinkers, and doers.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-14 flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Link 
            to="/auth"
            className="px-14 py-6 bg-white text-slate-950 rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
          >
            START SWAPPING
          </Link>
          <button className="px-14 py-6 border-2 border-slate-700 text-white rounded-[2rem] font-bold text-lg hover:bg-white/5 transition-all">
            WATCH DEMO
          </button>
        </motion.div>
      </motion.div>

      {/* 4. Scroll Visualizer */}
      <div className="absolute bottom-10 flex flex-col items-center gap-4 opacity-30">
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[10px] text-white font-black uppercase tracking-[0.5em] [writing-mode:vertical-lr]">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;