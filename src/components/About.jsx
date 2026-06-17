import { motion } from 'framer-motion';

const About = () => {
  const metrics = [
    { label: "Total Proposals", value: "1,450 Requests", width: "100%", color: "bg-indigo-500" },
    { label: "Detailed Reviews", value: "942 Dossiers Opened", width: "65%", color: "bg-indigo-400" },
    { label: "Accepted Swaps", value: "610 Conversions", width: "42%", color: "bg-emerald-500" },
    { label: "Active Chats", value: "507 Active Sessions", width: "35%", color: "bg-indigo-600" }
  ];

  return (
  <div className="w-full bg-[#020617] text-slate-200 overflow-x-hidden -mt-36 pt-36">
    <div className="relative w-full bg-[#020617] -mt-36 pt-36"></div>
      <div className="max-w-7xl mx-auto space-y-40">
        
        {/* --- SECTION 1: ECOSYSTEM OVERVIEW --- */}
        <section className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[11px] mb-4">Platform Strategic Review</p>
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter italic leading-none mb-8">
              SkillSwitch <span className="text-indigo-600">Ecosystem</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-slate-400 font-medium leading-relaxed italic">
              Optimizing Peer-to-Peer Knowledge Exchange through high-transparency verification and historical audit frameworks.
            </p>
          </motion.div>
        </section>

        {/* --- SECTION 2: EXECUTIVE SUMMARY (No Emojis, Enhanced Typography) --- */}
        <section className="w-full">
          <h2 className="text-4xl font-black text-white italic mb-12 tracking-tight">Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-800 rounded-[3.5rem] overflow-hidden bg-slate-900/20">
            
            {/* Challenge Card */}
            <div className="p-14 border-b md:border-b-0 md:border-r border-slate-800 hover:bg-slate-900/50 transition-all duration-500">
              <span className="text-rose-500 font-black uppercase tracking-[0.3em] text-[10px] block mb-6">Phase 01</span>
              <h3 className="text-3xl font-black text-white mb-6 italic tracking-tight">The Challenge</h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                Decision fatigue in peer-to-peer exchanges caused by lack of verifiable user data and unstructured request handling.
              </p>
            </div>

            {/* Solution Card */}
            <div className="p-14 border-b md:border-b-0 md:border-r border-slate-800 hover:bg-slate-900/50 transition-all duration-500">
              <span className="text-indigo-500 font-black uppercase tracking-[0.3em] text-[10px] block mb-6">Phase 02</span>
              <h3 className="text-3xl font-black text-white mb-6 italic tracking-tight">The Solution</h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                A multi-tiered management system featuring Inbox control, Dossier verification, and Terminal history auditing.
              </p>
            </div>

            {/* Impact Card */}
            <div className="p-14 hover:bg-slate-900/50 transition-all duration-500">
              <span className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px] block mb-6">Phase 03</span>
              <h3 className="text-3xl font-black text-white mb-6 italic tracking-tight">Strategic Impact</h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                Reduced rejection rates by 40% and increased session activation through curated technical transparency reports.
              </p>
            </div>

          </div>
        </section>

        {/* --- SECTION 3: PROPOSAL FLOW --- */}
        <section className="flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-black text-white italic mb-10 tracking-tight leading-tight">Managing <br />Proposal Flow</h2>
            <p className="text-slate-400 font-medium text-xl italic mb-12 leading-relaxed">
              The SkillSwitch Inbox serves as the primary gateway for exchange proposals, utilizing architectural visual logic.
            </p>
            <ul className="space-y-10">
              {[
                { t: "Dynamic Queue", d: "Real-time processing of incoming skill-swap proposals." },
                { t: "Dual-State Actions", d: "Instant Accept/Reject capability from the list view." },
                { t: "Dossier Access", d: "Direct link to technical verified reports for deep-dive review." }
              ].map((item, i) => (
                <li key={i} className="flex gap-6 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-3 group-hover:scale-150 transition-transform"></span>
                  <div>
                    <span className="text-white font-black uppercase text-[11px] tracking-[0.3em] block mb-2">{item.t}</span>
                    <span className="text-slate-400 text-base font-medium italic leading-relaxed">{item.d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="rounded-[4.5rem] overflow-hidden border border-slate-800 shadow-2xl shadow-indigo-950/20 aspect-video relative">
               <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
                alt="Global Connection Network" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </section>

        {/* --- SECTION 4: CONVERSION METRICS --- */}
        <section>
          <h2 className="text-4xl font-black text-white italic mb-20 tracking-tight">Decision Conversion Metrics</h2>
          <div className="space-y-12">
            {metrics.map((m, i) => (
              <div key={i} className="space-y-5">
                <div className="flex justify-between items-end px-2">
                  <span className="text-slate-500 font-black uppercase text-[11px] tracking-[0.4em]">{m.label}</span>
                  <span className="text-white font-black text-2xl italic tracking-tighter">{m.value}</span>
                </div>
                <div className="h-3 w-full bg-slate-900/50 rounded-full overflow-hidden border border-slate-800/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: m.width }}
                    transition={{ duration: 1.2, ease: "circOut", delay: i * 0.1 }}
                    className={`h-full ${m.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 5: ARCHITECTURE FOR GROWTH --- */}
        <section className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <p className="text-amber-500 font-black uppercase tracking-[0.5em] text-[11px] mb-6">Future Roadmap</p>
            <h2 className="text-7xl font-black text-white italic mb-12 leading-[0.9] tracking-tighter">Architecture <br/> for <span className="text-amber-500">Growth</span></h2>
            <div className="space-y-8 text-slate-400 font-medium italic text-xl leading-relaxed">
              <p>In Q3 2026, SkillSwitch will implement AI-driven automated dossiers, ranking users based on peer-verified knowledge mastery.</p>
              <p>Our goal is to reduce decision time from 4 minutes to under 30 seconds per proposal.</p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="rounded-[4.5rem] overflow-hidden border border-slate-800 shadow-2xl aspect-video relative group">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                alt="Advanced Tech Interface" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;