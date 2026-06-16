import axios from "axios";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: "Is SkillSwap completely free?",
      a: "Yes, SkillSwap is 100% free. No hidden costs, no subscriptions. Just connect, learn, and teach."
    },
    {
      q: "How do I connect with someone?",
      a: "Browse users by skills, send a connection request, and once accepted, you can start chatting and exchanging skills."
    },
    {
      q: "Can I both teach and learn?",
      a: "Absolutely! You can offer skills you're confident in and learn skills you're interested in at the same time."
    },
    {
      q: "Do I need to be an expert to teach?",
      a: "Nope. As long as you have a decent understanding of a skill, you're welcome to teach others who are just starting out."
    },
    {
      q: "Is there any limit to how many skills I can add?",
      a: "No, you can add as many skills to your profile as you want — both for learning and offering."
    },
    {
      q: "How does the 'Paid Mentorship' work?",
      a: "While swapping is free, some elite mentors charge an hourly rate for intensive 1-on-1 sessions. This is clearly marked on their profile cards."
    },
    {
      q: "Is my data secure?",
      a: "We prioritize your privacy. Your contact details are only shared with users you have officially accepted a connection with."
    }
  ];

  const handleSendMessage = async (e) => {
  e.preventDefault();

  try {
    const email = e.target[0].value;
    const message = e.target[1].value;

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, {
      email,
      message
    });

    console.log("SUCCESS:", res.data);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);

    e.target.reset();

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);
  }
};

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-slate-900 tracking-tighter italic mb-4"
          >
            Common <span className="text-indigo-600 underline decoration-indigo-200">Inquiries</span>
          </motion.h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Everything you need to know</p>
        </div>

        {/* --- ACCORDION SECTION --- */}
        <div className="space-y-4 mb-32">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-[2rem] transition-all duration-500 overflow-hidden ${
                activeIndex === index ? 'border-indigo-200 bg-indigo-50/30' : 'border-slate-100 bg-white'
              }`}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-10 py-8 flex items-center justify-between text-left"
              >
                <span className={`text-xl font-black tracking-tight ${activeIndex === index ? 'text-indigo-600' : 'text-slate-900'}`}>
                  {faq.q}
                </span>
                <span className={`text-2xl transition-transform duration-500 ${activeIndex === index ? 'rotate-45 text-indigo-600' : 'text-slate-300'}`}>
                  +
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-10 pb-8"
                  >
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* --- CUSTOM MESSAGE SECTION --- */}
        <div className="relative">
          <div className="bg-slate-950 rounded-[4rem] p-12 md:p-20 text-white overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-20" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-5xl font-black tracking-tighter italic mb-6 leading-none">
                  Still have <br /> <span className="text-indigo-400">Questions?</span>
                </h3>
                <p className="text-slate-400 text-lg">
                  Can't find what you're looking for? Send us a direct message and our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <input 
                  required
                  type="text" 
                  placeholder="Your Email"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 transition-all"
                />
                <textarea 
                  required
                  rows="4"
                  placeholder="Type your message here..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 transition-all resize-none"
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl tracking-widest uppercase text-xs transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>

          {/* --- NOTIFICATION NOTIFICATION --- */}
          <AnimatePresence>
            {submitted && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white border border-slate-100 shadow-2xl px-10 py-6 rounded-full flex items-center gap-4 z-[100]"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                <p className="font-black text-slate-900 tracking-tight italic">Message sent to the SkillSwap team!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FAQ;