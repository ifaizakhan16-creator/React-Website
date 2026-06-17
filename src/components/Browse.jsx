import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('swap'); 
  const navigate = useNavigate();

  useEffect(() => {
    const realSkills = [
      { have: "Video Editing", want: "Guitar Lessons" },
      { have: "Spanish", want: "Baking" },
      { have: "Photography", want: "Python" },
      { have: "Fitness", want: "Logo Design" },
      { have: "Piano", want: "Painting" },
      { have: "Chess", want: "Japanese" }
    ];
    
    
  fetch(`${import.meta.env.VITE_API_URL}/api/browse`)
    .then(res => res.json())
    .then(data => {
      setPosts(data.users);
      setLoading(false);
    })
    .catch(err => {
      console.log("API Error:", err);
      setLoading(false);
    });
}, []);


  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="py-24 px-8 bg-slate-950 text-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[9px]">Global Network Live</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-black tracking-tighter italic mb-6">
            The <span className="text-indigo-500">Knowledge</span> Terminal
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg mb-12 italic">
            Access the world's most elite skill-sharing network. Select your operational mode.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('swap')}
              className={`px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all border-2 ${
                viewMode === 'swap' 
                ? 'bg-indigo-600 border-indigo-500 shadow-[0_20px_50px_rgba(79,70,229,0.3)]' 
                : 'bg-slate-900 border-slate-800 opacity-50 hover:opacity-100'
              }`}
            >
              Skill Swapping
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('paid')}
              className={`px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all border-2 ${
                viewMode === 'paid' 
                ? 'bg-amber-500 border-amber-400 shadow-[0_20px_50px_rgba(245,158,11,0.3)]' 
                : 'bg-slate-900 border-slate-800 opacity-50 hover:opacity-100'
              }`}
            >
              Paid Mentorship
            </motion.button>
          </div>
        </motion.div>
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[140px]" />
        </div>
      </section>

      {/* --- FEED SECTION --- */}
      <div className="max-w-7xl mx-auto py-24 px-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-40"
            >
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-8" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] animate-pulse">Syncing Database Assets...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {posts.map((user) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15 }}
                  onClick={() => navigate(`/user/${user._id}`)}
                  className="group relative cursor-pointer"
                >
                  <div className="relative h-[560px] rounded-[4rem] p-12 bg-white border-2 border-slate-50 group-hover:border-indigo-100 group-hover:shadow-[0_50px_100px_-20px_rgba(79,70,229,0.1)] transition-all duration-700 flex flex-col justify-between overflow-hidden">
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div>
                      {/* User Identity Header */}
                      <div className="flex items-center gap-6 mb-16">
                        <div className="w-20 h-20 bg-slate-950 rounded-[2rem] flex items-center justify-center text-white text-2xl font-black shadow-xl group-hover:bg-indigo-600 group-hover:rotate-6 transition-all duration-500">
                          {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-slate-950 tracking-tighter group-hover:text-indigo-600 transition-colors">
                            @{user.username ? user.username.toLowerCase() : "anonymous"}
                          </h3>
                          <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                             <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">
                               ID: 2026-X{user._id?.slice(-5)}
                             </p>
                          </div>
                        </div>
                      </div>

                      {/* Skills Content */}
                      <div className="space-y-12 relative z-10">
                        <div>
                          <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">Skill Offering</p>
                          <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500 italic">
                            {user.skillHave}
                          </p>
                        </div>

                        <div className="w-12 h-[3px] bg-slate-100 group-hover:w-full group-hover:bg-indigo-50 transition-all duration-700" />

                        <div>
                          <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.4em] mb-4">Learning Target</p>
                          <p className="text-4xl font-black text-slate-900 opacity-20 tracking-tighter leading-none group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 italic">
                            {user.skillWant}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="pt-10 border-t border-slate-50 flex items-center justify-between relative z-10">
                      {viewMode === 'paid' ? (
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Fee Matrix</span>
                          <span className="text-3xl font-black text-slate-950 tracking-tighter">${user.rate}<span className="text-xs text-slate-300 ml-1 italic">/hr</span></span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                          <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.2em]">Ready to Swap</span>
                        </div>
                      )}

                      <div className="flex items-center gap-4 bg-slate-950 text-white px-8 py-5 rounded-[1.8rem] group-hover:bg-indigo-600 group-hover:shadow-[0_15px_30px_rgba(79,70,229,0.3)] transition-all duration-500">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">View Profile</span>
                        <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default Browse;