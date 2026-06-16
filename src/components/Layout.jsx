import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Footer from './Footer'; 

const Layout = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdfe] font-['Inter'] overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 px-4 md:px-8 py-3 md:py-6">
        <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-2xl border border-slate-100 rounded-[1.5rem] md:rounded-[2.5rem] px-5 md:px-10 py-3 md:py-5 flex flex-col md:flex-row justify-between md:items-center shadow-sm transition-all duration-300">
          
          {/* TOP BAR: Logo & Burger */}
          <div className="flex justify-between items-center w-full md:w-auto">
            <Link to="/" className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter italic hover:opacity-70 transition-opacity">
              Skill<span className="text-indigo-600">Switch</span>
            </Link>

            {/* HAMBURGER BUTTON */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden p-2 text-slate-900 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* MAIN MENU LINKS */}
          <div className={`${mobileMenuOpen ? 'flex animate-fadeIn' : 'hidden'} md:flex flex-col md:flex-row md:items-center gap-5 md:gap-10 w-full md:w-auto pt-4 md:pt-0 border-t border-slate-100 md:border-none mt-2 md:mt-0`}>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 md:border-r md:border-slate-100 md:pr-8 w-full md:w-auto">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`text-[10px] font-black uppercase tracking-widest py-1 md:py-0 transition-colors ${isActive('/') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}>
                Home
              </Link>
              <Link to="/browse" onClick={() => setMobileMenuOpen(false)} className={`text-[10px] font-black uppercase tracking-widest py-1 md:py-0 transition-colors ${isActive('/browse') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}>
                Browse
              </Link>

              {isLoggedIn && (
                <>
                  <Link to="/requests" onClick={() => setMobileMenuOpen(false)} className={`text-[10px] font-black uppercase tracking-widest py-1 md:py-0 transition-colors ${isActive('/requests') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}>
                    Inbox
                  </Link>
                  <Link to="/request-history" onClick={() => setMobileMenuOpen(false)} className={`text-[10px] font-black uppercase tracking-widest py-1 md:py-0 transition-colors ${isActive('/request-history') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}>
                    Messages
                  </Link>
                </>
              )}

              <Link to="/faqs" onClick={() => setMobileMenuOpen(false)} className={`text-[10px] font-black uppercase tracking-widest py-1 md:py-0 transition-colors ${isActive('/faqs') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}>
                FAQs
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`text-[10px] font-black uppercase tracking-widest py-1 md:py-0 transition-colors ${isActive('/about') ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}>
                About
              </Link>
            </div>

            {/* AUTH ACTIONS */}
            <div className="flex items-center gap-4 w-full md:w-auto pt-2 md:pt-0">
              {isLoggedIn ? (
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                    className="w-1/2 md:w-auto text-center px-5 py-3 bg-slate-50 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-100"
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-1/2 md:w-auto text-center px-5 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { navigate('/auth', { state: { mode: 'login' } }); setMobileMenuOpen(false); }}
                  className="w-full md:w-auto text-center px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100"
                >
                  Authorize
                </button>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* --- PAGE CONTENT --- */}
      {/* Adjusted spacing to avoid content jumps across viewport sizes */}
      <main className="flex-grow pt-24 md:pt-36">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;