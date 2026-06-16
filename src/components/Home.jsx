import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const steps = [
    { num: "01", title: "Create a Profile", desc: "Sign up and set up your profile with skills you offer and want to learn.", size: "md:col-span-2", color: "bg-blue-50", accent: "text-blue-600", border: "border-blue-100", glow: "bg-blue-400/20" },
    { num: "02", title: "Browse Users", desc: "Discover people with matching interests. Use smart filters to find your perfect peer.", size: "md:col-span-1", color: "bg-purple-50", accent: "text-purple-600", border: "border-purple-100", glow: "bg-purple-400/20" },
    { num: "03", title: "Send Requests", desc: "Reach out to start a swap. Both must accept to unlock the workspace.", size: "md:col-span-1", color: "bg-amber-50", accent: "text-amber-600", border: "border-amber-100", glow: "bg-amber-400/20" },
    { num: "04", title: "Start Chatting", desc: "Coordinate via our secure chat to discuss goals and schedules.", size: "md:col-span-2", color: "bg-emerald-50", accent: "text-emerald-600", border: "border-emerald-100", glow: "bg-emerald-400/20" },
    { num: "05", title: "Learn & Teach", desc: "Swap skills and grow together. A win-win ecosystem built on human connection.", size: "md:col-span-3", color: "bg-indigo-50", accent: "text-indigo-600", border: "border-indigo-100", glow: "bg-indigo-400/20" }
  ];

  const skills = ["Web Development", "UI/UX Design", "Digital Marketing", "Guitar", "French", "Data Science", "Photography", "Yoga", "Public Speaking", "Cooking"];

  const whyPoints = [
    { title: "Learn for Free", desc: "No payments, no subscriptions. Just mutual skill exchange.",},
    { title: "Teach What You Know", desc: "Share your knowledge and help others grow while you do too.",},
    { title: "Meet Like-Minded People", desc: "Find people with shared interests and build real connections.",},
    { title: "Mutual Growth", desc: "Both users learn and grow together—everyone wins.",},
    { title: "Endless Possibilities", desc: "From coding to cooking, explore any skill you’re curious about.",}
  ];

  return (
    <div ref={containerRef} className="bg-[#020617] w-full relative">
      
      {/* --- HERO SECTION --- */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="fixed top-0 left-0 w-full h-screen px-4 sm:px-8 lg:px-16 flex items-center overflow-hidden z-0 bg-[#020617]"
      >
        {/* Grain Overlay spanning across the base */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 pointer-events-none z-10"></div>

        {/* Repositioned global ambient blur rings */}
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[700px] h-[300px] md:h-[650px] bg-indigo-600/20 blur-[100px] md:blur-[150px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[550px] h-[250px] md:h-[500px] bg-blue-900/20 blur-[80px] md:blur-[130px] rounded-full pointer-events-none z-0" />

        {/* Main Content Layout Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-20 w-full pt-28 lg:pt-20">
          
          {/* LEFT HEADER CONTENT CONTAINER */}
          <div className="space-y-6 md:space-y-10 text-left order-2 lg:order-1 relative py-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[8px]">v2.0 Protocol</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black italic tracking-tighter leading-[0.9] text-white">
                Architecture <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-600 to-blue-500">for Growth</span>
              </h1>
            </div>

            <p className="max-w-xl text-slate-400 text-base md:text-xl font-medium italic leading-relaxed border-l-2 border-indigo-900/50 pl-4 md:pl-6">
              SkillSwitch implements smart workspaces to streamline dynamic peer-to-peer knowledge exchange.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => navigate('/browse')} 
                className="w-full sm:w-auto text-center px-8 py-4 md:py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] transition-all relative z-30"
              >
                Explore Assets
              </button>
              <button 
                onClick={() => navigate('/about')} 
                className="w-full sm:w-auto text-center px-8 py-4 md:py-5 bg-slate-900/50 backdrop-blur-md border border-slate-800 hover:border-indigo-500/50 text-white rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] transition-all relative z-30"
              >
                System Review
              </button>
            </div>
          </div>

          {/* RIGHT GRAPHIC CONTENT CONTAINER */}
          <div className="relative order-1 lg:order-2 max-w-md mx-auto lg:max-w-none w-full px-4 sm:px-0">
            <div className="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-slate-800/50 shadow-[0_0_50px_rgba(79,70,229,0.1)] relative">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                alt="Architecture Interface" 
                className="w-full h-[200px] sm:h-[300px] md:h-full object-cover opacity-70" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-indigo-600 p-4 rounded-[1.5rem] shadow-xl hidden sm:block">
              <p className="text-white font-black italic text-sm tracking-tighter">Verified.2026</p>
            </div>
          </div>
          
        </div>
      </motion.section>

      {/* --- THE SCROLLING SPACER --- */}
      <div className="h-screen pointer-events-none" />

      {/* --- SLIDE-OVER MAIN CONTENT --- */}
      <main className="relative z-20 bg-white rounded-t-[35px] md:rounded-t-[60px] shadow-[0_-40px_80px_rgba(0,0,0,0.65)] w-full">
        
        {/* HOW IT WORKS */}
        <section className="px-4 sm:px-8 md:px-20 py-20 md:py-40 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter italic">How It Works</h2>
            <p className="mt-4 text-sm md:text-xl text-slate-500 max-w-xl font-bold uppercase tracking-widest">Five intentional steps toward mastery.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <motion.div 
                whileInView={{ y: [40, 0], opacity: [0, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                key={i} 
                className={`${step.size} ${step.color} ${step.border} border-2 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-10 transition-all hover:shadow-xl duration-300`}
              >
                <div className="h-full flex flex-col justify-between gap-4">
                  <span className={`text-4xl md:text-6xl font-black opacity-20 ${step.accent}`}>{step.num}</span>
                  <h3 className={`text-2xl md:text-3xl font-black ${step.accent} tracking-tighter italic`}>{step.title}</h3>
                  <p className="text-slate-700 text-sm md:text-lg font-bold leading-snug">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* POPULAR SKILLS */}
        <section className="px-4 sm:px-8 md:px-20 py-20 md:py-40 bg-[#f8faff] border-y border-indigo-50">
          <div className="max-w-7xl mx-auto text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 md:mb-12 tracking-tighter italic">Trending Skills</h2>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {skills.map((skill, i) => (
                /* UPDATED HOVER CLASSES HERE: 
                   Added 'hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/30' 
                   along with cursor pointer and smooth transition definitions */
                <div 
                  key={i} 
                  className="px-5 py-3 md:px-8 md:py-5 bg-white border border-slate-100 text-slate-800 rounded-xl md:rounded-[2rem] font-black uppercase text-[10px] md:text-xs tracking-widest shadow-sm cursor-pointer transition-all duration-300 ease-out hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/30 hover:scale-[1.03]"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY USE SKILLSWITCH */}
        <section className="px-4 sm:px-6 md:px-20 py-20 md:py-40">
          <div className="max-w-7xl mx-auto bg-slate-950 rounded-[2.5rem] md:rounded-[5rem] p-8 sm:p-12 md:p-32 text-white relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-8xl font-black mb-4 tracking-tighter leading-none italic">
                  Why use <br /> <span className="text-indigo-500 underline">SkillSwitch?</span>
                </h2>
              </div>
              <div className="flex flex-col gap-6 md:gap-8">
                {whyPoints.map((point, i) => (
                  <div key={i} className="flex gap-4 md:gap-8 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 hover:bg-white/5 transition-all">
                    <div className="text-3xl md:text-4xl flex-shrink-0">{point.icon}</div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-black mb-1 italic tracking-tight">{point.title}</h4>
                      <p className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed">{point.desc}</p>
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