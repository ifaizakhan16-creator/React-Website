import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RequestHistory = ({ history, onRestore }) => {
  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic mb-12">Communications</h1>
        
        <div className="grid gap-6">
          {history.length > 0 ? history.map((req) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={req.id} 
              className={`p-8 rounded-[3rem] border flex flex-col md:flex-row justify-between items-center gap-6 ${
                req.status === 'rejected' ? 'bg-slate-50 border-slate-200 opacity-80' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 ${req.color} rounded-2xl flex items-center justify-center text-white font-black`}>{req.initial}</div>
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${req.status === 'rejected' ? 'text-rose-500' : 'text-indigo-600'}`}>
                    {req.status === 'rejected' ? 'Rejected' : 'Accepted'}
                  </span>
                  <h3 className={`text-2xl font-black tracking-tight ${req.status === 'rejected' ? 'text-slate-400' : 'text-slate-800'}`}>@{req.name.toLowerCase()}</h3>
                </div>
              </div>

              <div>
                {req.status === 'rejected' ? (
                  <button onClick={() => onRestore(req.id)} className="px-10 py-5 bg-rose-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all">Restore Request</button>
                ) : (
                  <Link to="/chatroom">
                    <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">Start Communication</button>
                  </Link>
                )}
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-32 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No transaction history. Accept or reject an inbox proposal first.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestHistory;