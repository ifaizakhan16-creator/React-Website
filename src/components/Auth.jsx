import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Scene from "./Scene";

const Auth = ({ onAuthSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (location.state?.mode) setMode(location.state.mode);
  }, [location]);

  // ✅ LOGIN + SIGNUP HANDLER (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        const res = await axios.post("import.meta.env.VITE_API_URL/api/login", {
          email: formData.email,
          password: formData.password
        });

        if (res.data.success) {
          localStorage.setItem("email", res.data.user.email);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  onAuthSuccess(res.data.user);

          navigate("/browse");
        }
      } else {
        const res = await axios.post("import.meta.env.VITE_API_URL/api/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        if (res.data.success) {
          localStorage.setItem("email", res.data.user.email);
          navigate("/browse");
        }
      }
    } catch (error) {
      console.log("AUTH ERROR:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start pt-32 bg-[#020617] overflow-hidden">
      <Scene />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-xl px-6"
      >
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 shadow-2xl">

          <h2 className="text-5xl font-black text-white mb-10 italic text-center tracking-tighter">
            {mode === "login" ? "Authorization" : "New Identity"}
          </h2>

          {/* ✅ FIXED FORM */}
          <form onSubmit={handleSubmit} className="space-y-8">

            {mode === "signup" && (
              <input
                required
                type="text"
                placeholder="YOUR NAME"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white outline-none font-black text-xl"
              />
            )}

            <input
              required
              type="email"
              placeholder="EMAIL"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white outline-none font-black"
            />

            <input
              required
              type="password"
              placeholder="PASSWORD"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white outline-none font-black"
            />

            <button
              type="submit"
              className="w-full bg-white text-black font-black py-7 rounded-3xl uppercase text-xs tracking-widest"
            >
              {mode === "login" ? "Login" : "Register"}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="w-full mt-10 text-slate-400 text-[10px] font-black uppercase"
          >
            Switch Mode
          </button>

        </div>
      </motion.div>
    </div>
  );
};

export default Auth;