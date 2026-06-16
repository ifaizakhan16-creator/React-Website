import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data: In your real app, this would come from an API based on 'id'
  const [userData, setUserData] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/${id}`
      );

      setUserData(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  fetchUser();
}, [id]);

  const handleSendRequest = () => {
    // Here you would normally trigger your backend logic
    setIsModalOpen(true);
  };

  if (!userData) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#f8faff] pt-32 pb-20 px-6 md:px-20 relative">
      
      {/* --- SUCCESS MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl border border-slate-100"
            >
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-indigo-200">
                <span className="text-white text-3xl">✓</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-4">Request Sent</h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed mb-10 uppercase tracking-widest">
                Your swap proposal has been transmitted to the user's terminal.
              </p>
              <button 
                onClick={() => navigate('/browse')}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
              >
                Back to Terminal
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto">
        
        {/* TOP NAV BAR */}
        <div className="flex justify-between items-center mb-12">
          <button 
            onClick={() => navigate('/browse')}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-all"
          >
            <span className="group-hover:-translate-x-2 transition-transform">←</span> Return to Terminal
          </button>
          <div className="px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100">
             <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Protocol Verified</p>
          </div>
        </div>

        {/* MAIN PROFILE CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl shadow-indigo-900/5 p-10 md:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] opacity-50" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column: Avatar */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-48 h-48 bg-slate-900 rounded-[3rem] flex items-center justify-center text-white text-6xl font-black shadow-2xl mb-8">
                {userData.name?.charAt(0).toUpperCase()}
              </div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-2 text-center lg:text-left w-full">
                Asset ID: 2026-X{id}
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mastery Status: Active</span>
              </div>
            </div>

            {/* Right Column: Bio & Skills */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4">
                <h1 className="text-6xl font-black text-slate-900 italic tracking-tighter leading-none">
                   @{userData.name?.toLowerCase()}
                </h1>
                <p className="text-xl text-slate-500 font-bold italic leading-relaxed max-w-xl">
                  "{userData.proBio}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Knowledge Assets</p>
                  <div className="flex flex-wrap gap-3">
                    {userData.skillHave?.map(s => (
                      <span key={s} className="px-5 py-3 bg-indigo-50 text-indigo-700 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-indigo-100">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">Target Learning</p>
                  <div className="flex flex-wrap gap-3">
                    {userData.skillWant?.map(s => (
                      <span key={s} className="px-5 py-3 bg-amber-50 text-amber-700 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-amber-100">{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ACTION AREA */}
              <div className="pt-12 border-t border-slate-50 flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={handleSendRequest}
                  className="flex-grow bg-slate-900 hover:bg-indigo-600 text-white px-10 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-indigo-900/10"
                >
                  Send Skill-Swap Request
                </button>
                <button 
                   onClick={() => navigate('/browse')}
                   className="px-10 py-6 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all border border-slate-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-12 text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.6em]">
          End of Profile Log — Knowledge is the only currency.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;