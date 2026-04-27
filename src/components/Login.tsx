import { useState } from 'react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [id, setId] = useState('22014890');
  const [password, setPassword] = useState('password');

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0a4a9e] via-[#1877F2] to-[#42A5F5] flex flex-col items-center justify-center p-8 z-[100]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xs flex flex-col items-center gap-6"
      >
        <div className="w-20 h-20 rounded-[22px] bg-white/15 border-2 border-white/30 flex items-center justify-center">
          <svg viewBox="0 0 44 44" fill="none" className="w-11 h-11">
            <circle cx="22" cy="22" r="18" stroke="white" strokeWidth="2" opacity=".7"/>
            <path d="M4 22H40" stroke="white" strokeWidth="1.5" opacity=".6"/>
            <path d="M22 4C19 9 18 14 18 22s1 13 4 18" stroke="white" strokeWidth="1.5" fill="none"/>
            <path d="M22 4C25 9 26 14 26 22s-1 13-4 18" stroke="white" strokeWidth="1.5" fill="none"/>
            <circle cx="22" cy="22" r="3" fill="white" opacity=".8"/>
          </svg>
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">HEMIS</h1>
          <p className="text-[11px] font-medium text-white/70 mt-1 leading-relaxed">
            Uzbekistan State World Languages University<br />
            UzSWLU · 2024–2025
          </p>
        </div>

        <div className="w-full space-y-4 mt-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Talaba ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full p-3.5 bg-white/15 border-1.5 border-white/20 rounded-xl text-white outline-none focus:border-white/60 focus:bg-white/20 transition-all"
              placeholder="ID raqam"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 bg-white/15 border-1.5 border-white/20 rounded-xl text-white outline-none focus:border-white/60 focus:bg-white/20 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={onLogin}
            className="w-full p-4 bg-white text-[#1877F2] rounded-xl font-extrabold text-lg shadow-lg active:scale-[0.98] transition-transform mt-2"
          >
            Kirish →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
