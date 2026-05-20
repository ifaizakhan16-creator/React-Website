import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ChatRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const scrollRef = useRef(null);

  // Mocked connection data based on the ID
  const chatPartner = {
    name: "Alex Thompson",
    skill: "Next.js Architecture",
    status: "Online"
  };

  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: "Hello. I saw you accepted the proposal for the Next.js/Framer Motion swap.", time: "10:02 AM" },
    { id: 2, sender: 'them', text: "I'm free this weekend to go over the architectural patterns we discussed.", time: "10:03 AM" }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setMessage('');
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-24 pb-10 px-8 flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex flex-col h-[80vh] bg-white border border-slate-100 rounded-[3.5rem] shadow-sm overflow-hidden">
        
        {/* CHAT HEADER */}
        <header className="p-10 border-b border-slate-50 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/request-history')}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-indigo-600 transition-all"
            >
              ← Terminate
            </button>
            <div className="h-10 w-[1px] bg-slate-100 mx-2" />
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight italic">
                {chatPartner.name}
              </h2>
              <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mt-1">
                Active Session / {chatPartner.skill}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secure Link Established</span>
          </div>
        </header>

        {/* MESSAGES AREA */}
        <div className="flex-1 overflow-y-auto p-12 space-y-8 custom-scrollbar">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] p-6 rounded-[2rem] ${
                  msg.sender === 'me' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-900 rounded-tl-none border border-slate-100'
                }`}>
                  <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                  <p className={`text-[8px] font-black uppercase tracking-widest mt-3 opacity-40 ${
                    msg.sender === 'me' ? 'text-white' : 'text-slate-500'
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={scrollRef} />
        </div>

        {/* INPUT AREA */}
        <footer className="p-8 bg-slate-50 border-t border-slate-100">
          <form onSubmit={handleSend} className="flex gap-4">
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white border border-slate-200 rounded-2xl px-8 py-5 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-all shadow-sm"
            />
            <button 
              type="submit"
              className="px-10 py-5 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100"
            >
              Transmit
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default ChatRoom;