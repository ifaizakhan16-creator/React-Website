"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  const steps = [
    { num: "01", title: "Create a Profile", desc: "Sign up and set up your profile with skills you offer and want to learn.", size: "md:col-span-2", color: "bg-blue-50", accent: "text-blue-600", border: "border-blue-100", glow: "bg-blue-400/20" },
    { num: "02", title: "Browse Users", desc: "Discover people with matching interests. Use smart filters to find your perfect peer.", size: "md:col-span-1", color: "bg-purple-50", accent: "text-purple-600", border: "border-purple-100", glow: "bg-purple-400/20" },
    { num: "03", title: "Send Requests", desc: "Reach out to start a swap. Both must accept to unlock the workspace.", size: "md:col-span-1", color: "bg-amber-50", accent: "text-amber-600", border: "border-amber-100", glow: "bg-amber-400/20" },
    { num: "04", title: "Start Chatting", desc: "Coordinate via our secure chat to discuss goals and schedules.", size: "md:col-span-2", color: "bg-emerald-50", accent: "text-emerald-600", border: "border-emerald-100", glow: "bg-emerald-400/20" },
    { num: "05", title: "Learn & Teach", desc: "Swap skills and grow together. A win-win ecosystem built on human connection.", size: "md:col-span-3", color: "bg-indigo-50", accent: "text-indigo-600", border: "border-indigo-100", glow: "bg-indigo-400/20" }
  ];

  const skills = ["Web Development", "UI/UX Design", "Digital Marketing", "Guitar", "French", "Data Science", "Photography", "Yoga", "Public Speaking", "Cooking"];

  const whyPoints = [
    { title: "Learn for Free", desc: "No payments, no subscriptions. Just mutual skill exchange."},
    { title: "Teach What You Know", desc: "Share your knowledge and help others grow while you do too.",},
    { title: "Meet Like-Minded People", desc: "Find people with shared interests and build real connections.",},
    { title: "Mutual Growth", desc: "Both users learn and grow together—everyone wins.",},
    { title: "Endless Possibilities", desc: "From coding to cooking, explore any skill you’re curious about.",}
  ];

  return (
    <div className="bg-[#020617]">
      
      {/* --- HERO SECTION WITH STICKY PARALLAX --- */}
      {/* We use 'sticky top-0' so the hero stays in place while the rest slides over it */}
      <section className="sticky top-0 h-screen w-full px-8 lg:px-16 flex items-center overflow-hidden z-0">
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 pointer-events-none"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          {/* LEFT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[9px]">v2.0 Protocol Active</span>
              </div>

              <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-[0.85] text-white">
                Architecture <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-600 to-blue-500">for Growth</span>
              </h1>
            </div>

            <p className="max-w-xl text-slate-400 text-xl font-medium italic leading-relaxed border-l-2 border-indigo-900/50 pl-6">
              SkillSwitch is implementing AI-driven automated dossiers to rank mastery and 
              streamline strategic peer-to-peer knowledge exchange.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <button 
                onClick={() => router.push('/browse')}
                className="group relative px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all overflow-hidden"
              >
                <span className="relative z-10">Explore Assets</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              
              <button 
                onClick={() => router.push('/about')}
                className="px-10 py-5 bg-slate-900/50 backdrop-blur-md border border-slate-800 hover:border-indigo-500/50 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all"
              >
                System Review
              </button>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="rounded-[4rem] overflow-hidden border border-slate-800/50 shadow-[0_0_80px_rgba(79,70,229,0.15)] relative group">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                alt="Architecture Interface" 
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
            </div>

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl hidden xl:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl">📈</div>
                <div>
                  <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest">Efficiency</p>
                  <p className="text-white font-black text-2xl italic">+94.2%</p>
                </div>
              </div>
            </motion.div>

            <div className="absolute -bottom-8 -left-8 bg-indigo-600 p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(79,70,229,0.3)]">
              <p className="text-indigo-100 font-black text-[9px] uppercase tracking-[0.4em] mb-1">Audit Status</p>
              <p className="text-white font-black italic text-2xl tracking-tighter">Verified.2026</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT SECTION (This slides OVER the hero) --- */}
      {/* We use 'relative z-20' and 'mt-0' to make it follow the sticky hero correctly */}
      <main className="relative z-20 bg-white rounded-t-[60px] shadow-[0_-50px_100px_rgba(0,0,0,0.4)]">
        
        {/* HOW IT WORKS */}
        <section className="px-6 md:px-20 py-40 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter italic">How It Works</h2>
            <p className="mt-6 text-xl text-slate-500 max-w-xl font-bold uppercase tracking-widest">Five intentional steps toward mastery.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }} 
                className={`${step.size} ${step.color} ${step.border} relative group overflow-hidden border-2 rounded-[3.5rem] p-10 transition-all cursor-default`}
              >
                <div className={`absolute -right-10 -top-10 w-40 h-40 ${step.glow} rounded-full blur-3xl opacity-50`} />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <span className={`text-6xl font-black opacity-20 ${step.accent}`}>{step.num}</span>
                  <h3 className={`text-3xl font-black ${step.accent} mt-2 tracking-tighter italic`}>{step.title}</h3>
                  <p className="text-slate-700 text-lg font-bold leading-snug">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* POPULAR SKILLS */}
        <section className="px-6 md:px-20 py-40 bg-[#f8faff] border-y border-indigo-50">
          <div className="max-w-7xl mx-auto text-center md:text-left">
            <h2 className="text-5xl font-black text-slate-900 mb-12 tracking-tighter italic">Trending Skills</h2>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {skills.map((skill, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, borderColor: "#4f46e5" }} 
                  className="px-8 py-5 bg-white border-2 border-transparent text-slate-800 rounded-[2rem] font-black uppercase text-xs tracking-widest cursor-pointer transition-all shadow-sm"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY USE SKILLSWITCH */}
        <section className="px-6 md:px-20 py-40">
          <div className="max-w-7xl mx-auto bg-slate-950 rounded-[5rem] p-12 md:p-32 text-white relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div>
                <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-none italic">
                  Why use <br /> <span className="text-indigo-500 underline">SkillSwitch?</span>
                </h2>
              </div>
              <div className="flex flex-col gap-8">
                {whyPoints.map((point, i) => (
                  <div key={i} className="flex gap-8 p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/5 transition-all group">
                    <div className="text-4xl group-hover:scale-125 transition-transform">{point.icon}</div>
                    <div>
                      <h4 className="text-2xl font-black mb-2 italic tracking-tight">{point.title}</h4>
                      <p className="text-slate-400 text-lg font-medium leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;