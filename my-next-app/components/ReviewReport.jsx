import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

const ReviewReport = ({ addToHistory }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock Content Restored
  const userReport = {
    id: `SK-99${id || '20'}`,
    name: "Alex Thompson",
    email: "alex.dev@skillswitch.io",
    qualification: "Senior Full-Stack Engineer | 6+ Years",
    address: "San Francisco, CA (Remote)",
    proposalText: "I am offering a deep dive into React Design Patterns and System Architecture. In exchange, I want to learn the fundamentals of UI/UX spacing and color theory.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000"
    ]
  };

  const handleDecision = (status) => {
    addToHistory(userReport, status); // Saves to App.jsx memory
    navigate('/requests'); 
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-40 px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate('/requests')}
          className="mb-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-all"
        >
          ← Back to Requests
        </button>

        {/* HEADER: Identity restored */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b border-slate-100 pb-12">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 bg-slate-950 rounded-[3rem] flex items-center justify-center text-white text-5xl font-black shadow-2xl">A</div>
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-2">Verified Skill Report</p>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">{userReport.name}</h1>
              <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px] mt-2">USER ID: {userReport.id}</p>
            </div>
          </div>
          <div className="mt-8 md:mt-0 text-right">
            <p className="text-slate-500 font-bold text-sm">{userReport.email}</p>
            <p className="text-slate-400 text-xs mt-1">{userReport.address}</p>
          </div>
        </div>

        {/* CONTENT: Text and Portfolio restored */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div className="space-y-12">
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Qualification</h3>
              <p className="text-2xl font-black text-slate-800 leading-tight">{userReport.qualification}</p>
            </section>
            <section className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">The Proposal</h3>
              <p className="text-xl font-medium text-slate-700 italic leading-relaxed">"{userReport.proposalText}"</p>
            </section>
          </div>

          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Portfolio</h3>
            <div className="grid grid-cols-1 gap-6">
              {userReport.portfolioImages.map((img, idx) => (
                <div key={idx} className="rounded-[2.5rem] overflow-hidden h-64 border-4 border-white shadow-xl">
                  <img src={img} alt="work" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DECISION BAR */}
        <footer className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-slate-950/90 backdrop-blur-xl p-6 rounded-[3rem] flex items-center justify-between border border-white/10 shadow-2xl z-50">
           <div className="pl-6 hidden md:block">
              <p className="text-white font-black text-[10px] uppercase tracking-widest">Action Required</p>
           </div>
           <div className="flex gap-4">
             <button onClick={() => handleDecision('rejected')} className="px-10 py-5 bg-white/5 hover:bg-red-500/20 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest border border-white/10">Reject</button>
             <button onClick={() => handleDecision('accepted')} className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-lg">Accept Proposal</button>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default ReviewReport;