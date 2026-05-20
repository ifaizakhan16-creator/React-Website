import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("User");
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse', path: '/browse' },
    { name: 'Requests', path: '/requests' },
    { name: 'Messages', path: '/request-history' },
    { name: 'FAQs', path: '/faqs' },
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUserName(storedUser.name);
  }, [isLoggedIn]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-black italic tracking-tighter text-slate-900">
          SKILL<span className="text-indigo-600">SWITCH</span>
        </Link>

        {/* 5 CENTERED LINKS */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-indigo-600 ${location.pathname === link.path ? 'text-indigo-600' : 'text-slate-400'}`}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {!isLoggedIn ? (
            <div className="flex items-center gap-8">
              <Link to="/auth" state={{ mode: 'login' }} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Login</Link>
              <Link to="/auth" state={{ mode: 'account' }}>
                <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-600 transition-all">
                  Account
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative">
              <motion.button onClick={() => setShowDropdown(!showDropdown)} className="w-12 h-12 rounded-full bg-slate-900 border-4 border-white shadow-2xl flex items-center justify-center text-white font-black text-sm">
                {userName.charAt(0)}
              </motion.button>

              <AnimatePresence>
                {showDropdown && (
                  <>
                    <div className="fixed inset-0 z-[-1]" onClick={() => setShowDropdown(false)} />
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }} className="absolute right-0 mt-4 w-64 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-4">
                      <div className="flex flex-col gap-1">
                        <Link to="/profile" onClick={() => setShowDropdown(false)} className="p-5 hover:bg-indigo-50 rounded-[1.8rem] flex flex-col group">
                          <span className="text-[10px] font-black uppercase text-slate-800 group-hover:text-indigo-600">Edit Profile</span>
                          <span className="text-[7px] font-bold text-slate-400 mt-1">Full Settings</span>
                        </Link>
                        <button onClick={() => { handleLogout(); setShowDropdown(false); navigate('/'); }} className="p-5 text-left hover:bg-rose-50 rounded-[1.8rem] flex flex-col">
                          <span className="text-[10px] font-black uppercase text-rose-500">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;