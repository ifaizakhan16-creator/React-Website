import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Requests = ({ addToHistory }) => {
  const navigate = useNavigate();

  
  // DATA SOURCE: The Inbox List (Add or remove items here)
  const [requests, setRequests] = useState([]);

  useEffect(() => {
  const email = localStorage.getItem("email");

  const fetchRequests = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/request/inbox/${email}`
      );

      const data = await res.json();

      console.log("BACKEND RESPONSE:", data);

      setRequests(data.requests || []);
    } catch (err) {
      console.log(err);
    }
  };

  if (email) {
    fetchRequests();
  }
}, []);

  const handleAction = async (req, action) => {
  try {
    const res = await fetch(`http://localhost:5000/api/request/${req._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: action === "accept" ? "accepted" : "rejected"
      })
    });

    const data = await res.json();
    console.log("UPDATED:", data);

    // remove from inbox after action
    setRequests(prev => prev.filter(r => r._id !== req._id));

    // send correct status to history
    if (addToHistory) {
      addToHistory(req, action === "accept" ? "accepted" : "rejected");
    }

  } catch (err) {
    console.log(err);
  }
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
               onClick={() => navigate("/request-history")}
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
      key={req._id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="group bg-white border border-slate-100 p-8 rounded-[3.5rem] flex flex-col lg:flex-row items-center gap-10 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500"
    >
      {/* Avatar */}
      <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black shadow-xl group-hover:rotate-6 transition-transform duration-500">
        {req.senderEmail?.charAt(0).toUpperCase()}
      </div>

      {/* User Details */}
      <div className="flex-1 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            @{req.senderEmail?.split("@")[0]}
          </h3>

          <div className="flex gap-2 justify-center">
            <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100">
              Offers {req.offer}
            </span>

            <span className="bg-slate-50 text-slate-400 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100 italic">
              Wants {req.want}
            </span>
          </div>
        </div>

        <p className="text-slate-500 font-medium italic line-clamp-1 max-w-lg">
          "{req.message}"
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => navigate(`/review-report/${req._id}`)}
          className="px-8 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
        >
          📄 Review Report
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => handleAction(req, "reject")}
            className="w-12 h-12 flex items-center justify-center bg-white border border-red-100 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
          >
            ✕
          </button>

          <button
            onClick={() => handleAction(req, "accept")}
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