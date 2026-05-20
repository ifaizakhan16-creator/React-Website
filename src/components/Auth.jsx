import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Scene from './Scene';

const Auth = ({ onAuthSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (location.state?.mode) setMode(location.state.mode);
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(formData));
    localStorage.setItem('user_active', 'true');
    onAuthSuccess();

    // Account mode = straight to profile. Login/Signup = straight to home.
    if (mode === 'account') {
      navigate('/profile');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start pt-32 bg-[#020617] overflow-hidden">
      <Scene />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-xl px-6">
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 shadow-2xl">
          <h2 className="text-5xl font-black text-white mb-10 italic text-center tracking-tighter">
            {mode === 'account' ? "Account Access" : mode === 'login' ? "Authorization" : "New Identity"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {(mode === 'account' || mode === 'signup') && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Profile Identity</label>
                <input required type="text" placeholder="YOUR NAME" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white outline-none focus:border-indigo-500 font-black text-xl" />
              </div>
            )}

            {mode !== 'account' && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Email Protocol</label>
                  <input required type="email" placeholder="ADDRESS@DOMAIN.COM" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white outline-none focus:border-indigo-500 font-black" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Security Key</label>
                  <input required type="password" placeholder="••••••••" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white outline-none focus:border-indigo-500 font-black" />
                </div>
              </>
            )}

            <button className="w-full bg-white text-black font-black py-7 rounded-3xl mt-6 hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-[0.2em] text-xs">
              {mode === 'account' ? "Initialize Profile" : "Execute Login"}
            </button>
          </form>

          {mode !== 'account' && (
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="w-full mt-10 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white">
              {mode === 'login' ? "[ Switch to Registration ]" : "[ Switch to Authorization ]"}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;