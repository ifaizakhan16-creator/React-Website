import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Requests = ({ addToHistory }) => {
  const navigate = useNavigate();
  
  // DATA SOURCE: The Inbox List (Add or remove items here)
  const [requests, setRequests] = useState([
    { id: 1, name: "Zain Dev", offer: "Next.js Architecture", want: "Framer Motion", msg: "I can help you optimize your production build...", initial: "Z", color: "bg-indigo-600" },
    { id: 2, name: "Elara Design", offer: "3D Blender Modeling", want: "React Basics", msg: "Looking to turn assets into a web portfolio...", initial: "E", color: "bg-purple-600" },
    { id: 3, name: "Marcus Codes", offer: "Python Automation", want: "Graphic Design", msg: "I have scripts that can automate your workflow...", initial: "M", color: "bg-emerald-600" },
    { id: 4, name: "Sophia V", offer: "Video Editing", want: "Copywriting", msg: "Need high-converting scripts for my reviews...", initial: "S", color: "bg-amber-500" },
    { id: 5, name: "Tech King", offer: "Cyber Security", want: "Mobile App Dev", msg: "Offering a full security audit of your projects...", initial: "T", color: "bg-slate-900" },
    { id: 6, name: "Noah Arch", offer: "Structural Design", want: "Web UI Basics", msg: "I want to build a site for my architectural firm...", initial: "N", color: "bg-blue-600" },
    { id: 7, name: "Clara Brand", offer: "Logo Design", want: "SEO Strategy", msg: "Need to rank my boutique on the first page...", initial: "C", color: "bg-pink-500" },
    { id: 8, name: "Dev Dave", offer: "Backend API", want: "Tailwind CSS", msg: "Help me make my raw data look beautiful...", initial: "D", color: "bg-cyan-600" }
  ]);

  const handleAction = (req, action) => {
    const status = action === 'accept' ? 'accepted' : 'rejected';
    
    // Transfer data to History in App.jsx
    if (addToHistory) {
      addToHistory(req, status);
    }

    // Remove from Inbox with animation
    setRequests(prev => prev.filter(r => r.id !== req.id));
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20 px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-12">
          <div>
            <h1 className="text-7xl font-black text-slate-900 tracking-tighter italic mb-4">
              The <span className="text-indigo-600">Inbox</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em]">
              {requests.length} ACTIVE PROPOSALS WAITING
            </p>
          </div>
          
          <div className="flex gap-4">
             <button 
               onClick={() => navigate('/request-history')}
               className="px-8 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 transition-all"
             >
               View History & Chats
             </button>
          </div>
        </header>

        {/* REQUESTS LIST */}
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {requests.map((req) => (
              <motion.div
                key={req.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="group bg-white border border-slate-100 p-8 rounded-[3.5rem] flex flex-col lg:flex-row items-center gap-10 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500"
              >
                {/* Avatar */}
                <div className={`w-20 h-20 ${req.color} rounded-[2rem] flex items-center justify-center text-white text-3xl font-black shadow-xl group-hover:rotate-6 transition-transform duration-500`}>
                  {req.initial}
                </div>

                {/* User Details */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">@{req.name.toLowerCase().replace(' ', '_')}</h3>
                    <div className="flex gap-2 justify-center">
                       <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100">Offers {req.offer}</span>
                       <span className="bg-slate-50 text-slate-400 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100 italic">Wants {req.want}</span>
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium italic line-clamp-1 max-w-lg">"{req.msg}"</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                  <button 
                    onClick={() => navigate(`/review-report/${req.id}`)}
                    className="px-8 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
                  >
                    📄 Review Report
                  </button>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAction(req, 'reject')}
                      className="w-12 h-12 flex items-center justify-center bg-white border border-red-100 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      ✕
                    </button>
                    <button 
                      onClick={() => handleAction(req, 'accept')}
                      className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100"
                    >
                      Accept Swap
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State Logic */}
          {requests.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
               <h2 className="text-4xl font-black text-slate-300 tracking-tighter italic uppercase">Clear Inbox</h2>
               <p className="text-slate-400 font-bold text-[10px] tracking-widest mt-4">All proposals have been moved to history.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;