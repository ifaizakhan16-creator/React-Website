import axios from "axios";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProfileSettings = () => {
  const [editSection, setEditSection] = useState(null); 
  const [user, setUser] = useState({
    name: "Caspian Reed",
    email: "caspian@skillswitch.edu",
    address: "102 Innovation Blvd, Silicon Valley",
    qualification: "Undergraduate - Computer Science",
    skillsHave: ["React.js", "Tailwind CSS", "Figma"],
    skillsWant: ["Jazz Guitar", "French"],
    isPro: true,
    hourlyRate: 45,
    proBio: "Expert-level instruction in modern web architecture and design systems."
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored) setUser(prev => ({ ...prev, ...stored }));
  }, []);

  const updateField = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

 const handleSave = async () => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID missing. Please login again.");
      return;
    }

    const res = await axios.put(
  `import.meta.env.VITE_API_URL/api/profile-setup/${userId}`,
  {
    skillHave: user.skillsHave,
    skillWant: user.skillsWant,
    rate: user.hourlyRate,
    address: user.address,
    qualification: user.qualification,
    isPro: user.isPro,
    hourlyRate: user.hourlyRate,
    proBio: user.proBio
  }
);

    alert("Profile saved successfully!");
    console.log(res.data);

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Save failed");
  }
};

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20 px-6 relative">
      
      {/* NAVIGATION BRIDGE */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link to="/">
          <motion.div whileHover={{ x: -5 }} className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-500 hover:text-indigo-600 transition-all cursor-pointer">
            <span className="text-lg">←</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Terminal</span>
          </motion.div>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="flex items-center gap-8 group">
            <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-600 shadow-2xl flex items-center justify-center text-white text-5xl font-black border-8 border-white">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic">{user.name}</h1>
              <p className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Elite Member Profile</p>
            </div>
          </div>
          <button 
            onClick={() => setEditSection('pro')} 
            className="px-12 py-5 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl hover:bg-indigo-600"
          >
            Pro Command Center
          </button>
        </div>

        {/* PROFILE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div onClick={() => setEditSection('identity')} className="lg:col-span-1 bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm cursor-pointer relative group">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Dossier Information</h3>
             <div className="space-y-6">
                <div><p className="text-[10px] font-black text-indigo-400 uppercase mb-1">Academic Status</p><p className="font-bold text-slate-800 text-lg">{user.qualification}</p></div>
                <div><p className="text-[10px] font-black text-indigo-400 uppercase mb-1">Mail Protocol</p><p className="font-bold text-slate-800 text-lg">{user.email}</p></div>
                <div><p className="text-[10px] font-black text-indigo-400 uppercase mb-1">Location</p><p className="font-bold text-slate-800 text-lg">{user.address}</p></div>
             </div>
          </motion.div>

          <motion.div onClick={() => setEditSection('skills')} className="lg:col-span-2 bg-slate-50 border-2 border-dashed border-slate-200 p-10 rounded-[4rem] cursor-pointer hover:border-indigo-400 transition-all">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                   <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 italic">Current Expertise</h3>
                   <div className="flex flex-wrap gap-2">{user.skillsHave.map(s => (<span key={s} className="px-5 py-2 bg-white rounded-xl font-bold text-slate-800 text-xs shadow-sm border border-slate-100">{s}</span>))}</div>
                </div>
                <div>
                   <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-6 italic">Learning Targets</h3>
                   <div className="flex flex-wrap gap-2">{user.skillsWant.map(s => (<span key={s} className="px-5 py-2 bg-white rounded-xl font-bold text-slate-800 text-xs shadow-sm border border-slate-100">{s}</span>))}</div>
                </div>
             </div>
          </motion.div>

          <motion.div onClick={() => setEditSection('mission')} className="lg:col-span-3 bg-slate-950 p-16 rounded-[5rem] text-white relative group cursor-pointer overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent" />
             <h3 className="text-xs font-black text-indigo-500 uppercase tracking-[0.4em] mb-8">Professional Philosophy</h3>
             <p className="text-4xl font-black tracking-tighter leading-tight italic opacity-90 relative z-10">"{user.proBio}"</p>
          </motion.div>
        </div>

        {/* --- ANIMATED MODAL SYSTEM --- */}
        <AnimatePresence>
          {editSection && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl flex flex-col overflow-hidden max-h-[85vh] border border-white/20"
              >
                <div className="flex-1 overflow-y-auto p-12 pb-6 custom-scrollbar-premium">
                  <div className="space-y-10">
                    {editSection === 'identity' && (
                      <div className="space-y-6">
                        <h2 className="text-3xl font-black tracking-tighter italic">Edit Dossier</h2>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-indigo-600 uppercase">Full Name</label>
                          <input type="text" value={user.name} onChange={(e) => updateField('name', e.target.value)} className="w-full bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 outline-none focus:border-indigo-500 font-bold" />
                          <label className="text-[10px] font-black text-indigo-600 uppercase">Qualification</label>
                          <input type="text" value={user.qualification} onChange={(e) => updateField('qualification', e.target.value)} className="w-full bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 outline-none focus:border-indigo-500 font-bold" />
                          <label className="text-[10px] font-black text-indigo-600 uppercase">Email Protocol</label>
                          <input type="email" value={user.email} onChange={(e) => updateField('email', e.target.value)} className="w-full bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 outline-none focus:border-indigo-500 font-bold" />
                          <label className="text-[10px] font-black text-indigo-600 uppercase">Address</label>
                          <input type="text" value={user.address} onChange={(e) => updateField('address', e.target.value)} className="w-full bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 outline-none focus:border-indigo-500 font-bold" />
                        </div>
                      </div>
                    )}
                    
                    {editSection === 'skills' && (
                      <div className="space-y-6">
                        <h2 className="text-3xl font-black tracking-tighter italic">Update Inventory</h2>
                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-indigo-600 uppercase">Knowledge to Teach</label>
                           <textarea value={user.skillsHave.join(', ')} onChange={(e) => updateField('skillsHave', e.target.value.split(', '))} className="w-full bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 outline-none focus:border-indigo-500 font-bold" rows="3" />
                           <label className="text-[10px] font-black text-amber-500 uppercase">Knowledge to Learn</label>
                           <textarea value={user.skillsWant.join(', ')} onChange={(e) => updateField('skillsWant', e.target.value.split(', '))} className="w-full bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 outline-none focus:border-amber-500 font-bold" rows="3" />
                        </div>
                      </div>
                    )}

                    {editSection === 'pro' && (
                      <div className="space-y-6">
                        <h2 className="text-3xl font-black tracking-tighter italic">Pro Control Center</h2>
                        <div className="p-8 bg-slate-900 rounded-[2.5rem] flex items-center justify-between">
                          <p className="font-black text-white text-lg tracking-tight">Pro Visibility</p>
                          <button onClick={() => updateField('isPro', !user.isPro)} className={`w-16 h-8 rounded-full flex items-center px-1 transition-colors ${user.isPro ? 'bg-indigo-500 justify-end' : 'bg-slate-700 justify-start'}`}><div className="w-6 h-6 bg-white rounded-full shadow-md" /></button>
                        </div>
                        <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Hourly Compensation ($)</label>
                        <input type="number" value={user.hourlyRate} onChange={(e) => updateField('hourlyRate', e.target.value)} className="w-full bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 outline-none focus:border-indigo-500 font-black text-3xl" />
                      </div>
                    )}

                    {editSection === 'mission' && (
                      <div className="space-y-6">
                        <h2 className="text-3xl font-black tracking-tighter italic">Refine Philosophy</h2>
                        <label className="text-[10px] font-black text-indigo-600 uppercase">Professional Mission Statement</label>
                        <textarea rows="6" value={user.proBio} onChange={(e) => updateField('proBio', e.target.value)} className="w-full bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-100 outline-none focus:border-indigo-500 font-bold text-xl italic leading-relaxed" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8 border-t border-slate-50 bg-white flex gap-4">
                  <button onClick={handleSave} className="flex-grow bg-slate-950 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-indigo-600 transition-all active:scale-95">
                    SAVE & SYNCHRONIZE
                  </button>
                  <button onClick={() => setEditSection(null)} className="px-8 bg-slate-100 text-slate-400 font-black py-5 rounded-2xl hover:text-slate-600 transition-colors">
                    CANCEL
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style dangerouslySetInnerHTML={{ __html: `
          .custom-scrollbar-premium::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar-premium::-webkit-scrollbar-track { background: rgba(248, 250, 252, 0.5); border-radius: 0 3.5rem 3.5rem 0; }
          .custom-scrollbar-premium::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; border: 3px solid white; }
          .custom-scrollbar-premium:hover::-webkit-scrollbar-thumb { background: #6366f1; border: 2px solid white; }
        `}} />
      </div>
    </div>
  );
};

export default ProfileSettings;