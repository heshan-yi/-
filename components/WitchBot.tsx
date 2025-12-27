
import React, { useState } from 'react';
import { askWitch } from '../services/geminiService';

interface WitchBotProps {
  theme: 'light' | 'dark';
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const WitchBot: React.FC<WitchBotProps> = ({ theme, isOpen, setIsOpen }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    
    const response = await askWitch(userMsg, theme);
    setMessages(prev => [...prev, { role: 'bot', text: response || '' }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-12 right-12 z-[60] flex flex-col items-end gap-6">
      {isOpen && (
        <div className={`
          w-80 h-[500px] flex flex-col border-[1px] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 animate-fade-in-up
          ${theme === 'dark' ? 'bg-[#050505] border-purple-500/30 text-purple-100' : 'bg-[#fdfcf8] border-black/10 text-black'}
        `}>
          {/* Minimalist Header */}
          <div className="p-5 border-b border-current/10 flex justify-between items-center bg-current/5">
            <span className="font-cinzel text-[9px] tracking-[0.5em] uppercase font-bold">
              {theme === 'dark' ? 'Signal Received' : 'Curator Desk'}
            </span>
            <button onClick={() => setIsOpen(false)} className="text-sm hover:rotate-90 transition-transform">✕</button>
          </div>

          {/* Conversation Log */}
          <div className={`flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar ${theme === 'dark' ? 'bg-[url("https://www.transparenttextures.com/patterns/simple-dashed.png")]' : ''}`}>
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-6">
                <span className={`text-4xl transition-all duration-1000 ${theme === 'dark' ? 'animate-dream blur-[2px]' : ''}`}>
                  {theme === 'dark' ? '📽️' : '📖'}
                </span>
                <p className="font-serif italic text-sm leading-relaxed px-4">
                  {theme === 'dark' ? "What whispers do you seek from the static?" : "How may I assist your traversal through the archive?"}
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`
                  max-w-[90%] p-5 text-sm leading-relaxed border-l-2
                  ${m.role === 'user' ? 'border-current/20 italic opacity-60' : `border-current/60 bg-current/5 ${theme === 'dark' ? 'font-serif blur-[0.3px] hover:blur-0' : ''}`}
                `}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-1 pl-4 animate-pulse">
                <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
              </div>
            )}
          </div>

          {/* Clean Input Field */}
          <div className="p-5 border-t border-current/10 flex gap-4 bg-current/5">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-serif italic outline-none placeholder:opacity-30"
              placeholder={theme === 'dark' ? "Signal..." : "Inquire..."}
            />
            <button 
              onClick={handleSend}
              className="font-cinzel text-[9px] font-bold tracking-[0.2em] hover:opacity-40 transition-opacity"
            >
              BREW
            </button>
          </div>
        </div>
      )}

      {/* Aesthetic Trigger Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-all duration-700 hover:rotate-12
          ${theme === 'dark' ? 'bg-purple-900/40 text-purple-300 border border-purple-500/50 backdrop-blur-md' : 'bg-[#1a1a1a] text-[#fdfcf8]'}
        `}
      >
        <span className={`text-2xl transition-all ${theme === 'dark' && !isOpen ? 'animate-dream' : ''}`}>
          {isOpen ? '✕' : (theme === 'dark' ? '👁️' : '✒️')}
        </span>
      </button>
    </div>
  );
};

export default WitchBot;
