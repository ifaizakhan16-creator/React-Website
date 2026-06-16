import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#020617] text-slate-400 py-20 px-6 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-white italic tracking-tighter">
              SkillSwitch<span className="text-indigo-600">.</span>
            </h2>
            <p className="text-sm font-medium leading-relaxed max-w-xs italic">
              Architectural Peer Exchange platform designed for the next generation of knowledge capital.
            </p>
            <div className="pt-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                © 2026 — Knowledge is the only currency.
              </p>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-8">Platform</h4>
            <ul className="space-y-4">
              {['The Terminal', 'Ecosystem Review', 'Dossier Verification', 'Historical Audit'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white font-bold text-sm hover:text-indigo-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Governance Column */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-8">Governance</h4>
            <ul className="space-y-4">
              {['Trust Score Logic', 'Peer Compliance', 'Protocol API', 'Knowledge Escrow'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white font-bold text-sm hover:text-indigo-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-8">Connect</h4>
            <ul className="space-y-4">
              {['System Status', 'Strategic Support', 'Direct Line', 'LinkedIn'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white font-bold text-sm hover:text-indigo-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;