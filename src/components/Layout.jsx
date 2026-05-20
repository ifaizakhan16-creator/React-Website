import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';

const Layout = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdfe] font-['Inter']">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-2xl border border-slate-100 rounded-[2.5rem] px-10 py-5 flex justify-between items-center shadow-sm">
          
          {/* LOGO (Anchored Left) */}
          <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter italic hover:opacity-70 transition-opacity">
            Skill<span className="text-indigo-600">Switch</span>
          </Link>

          {/* RIGHT SIDE GROUPING (Links + Buttons) */}
          <div className="flex items-center gap-10">
            
            {/* NAV LINKS (Now aligned to the right, next to buttons) */}
            <div className="hidden lg:flex items-center gap-8 border-r border-slate-100 pr-8">
              <Link 
                to="/" 
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive('/') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
              >
                Home
              </Link>

              <Link 
                to="/browse" 
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive('/browse') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
              >
                Browse
              </Link>

              {isLoggedIn && (
                <>
                  <Link 
                    to="/requests" 
                    className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive('/requests') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
                  >
                    Inbox
                  </Link>
                  <Link 
                    to="/request-history" 
                    className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive('/request-history') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
                  >
                    Messages
                  </Link>
                </>
              )}

              <Link 
                to="/faqs" 
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive('/faqs') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
              >
                FAQs
              </Link>

              <Link 
                to="/about" 
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive('/about') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
              >
                About
              </Link>
            </div>

            {/* AUTH / PROFILE ACTIONS */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigate('/profile')}
                    className="px-6 py-3 bg-slate-50 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
                  >
                    Profile
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-100"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/auth', { state: { mode: 'login' } })}
                  className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100"
                >
                  Authorize
                </button>
              )}
            </div>
          </div>

        </div>
      </nav>

      {/* PAGE RENDERER */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
      
    </div>
  );
};

export default Layout;