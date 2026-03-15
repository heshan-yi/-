
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DATA } from './constants';
import { ThemeMode, ContentItem } from './types';
import Shelf from './components/Shelf';
import WitchBot from './components/WitchBot';
import DetailView from './components/DetailView';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [glitch, setGlitch] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBuff, setShowBuff] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isBotOpen, setIsBotOpen] = useState(false);

  const sections = theme === 'light' ? DATA.light : DATA.dark;

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 't') {
        toggleTheme();
        triggerBuff(theme === 'light' ? '+1 MANA' : '+1 LOGIC');
      }
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [theme]);

  const toggleTheme = () => {
    setGlitch(true);
    setTimeout(() => {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
      setGlitch(false);
    }, 400);
  };

  const triggerBuff = (text: string) => {
    setShowBuff(text);
    setTimeout(() => setShowBuff(null), 1000);
  };

  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${glitch ? 'opacity-20 blur-sm' : 'opacity-100'} ${theme === 'dark' ? 'text-purple-200/80' : 'text-[#1a1a1a]'}`}>
      
      {/* Scroll XP Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[70] pointer-events-none">
        <div 
          className={`h-full transition-all duration-300 ease-out ${theme === 'dark' ? 'bg-purple-500 shadow-[0_0_10px_purple]' : 'bg-black opacity-40'}`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Buff Effect */}
      {showBuff && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none animate-bounce">
          <span className={`font-cinzel text-xs tracking-[0.5em] font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-black'}`}>
            {showBuff}
          </span>
        </div>
      )}

      {/* Minimalist Game HUD (Top) */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-10 py-4 flex justify-between items-center transition-all duration-700 ${theme === 'dark' ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5' : 'bg-white/60 backdrop-blur-lg border-b border-black/5'}`}>
        <div className="flex items-center gap-6">
          <div 
            onClick={() => {
              scrollToSection('home');
              triggerBuff('RECENTERED');
            }}
            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-2xl transition-all hover:rotate-12 cursor-pointer active:scale-90 ${theme === 'dark' ? 'bg-purple-900/30 border-purple-500/40 shadow-[0_0_15px_rgba(192,132,252,0.3)]' : 'bg-white border-black/10 text-black shadow-sm'}`}
          >
            {theme === 'dark' ? '🔮' : '🏛️'}
          </div>
          <div className="flex flex-col">
            <h1 className="text-[10px] font-cinzel font-bold tracking-[0.5em] uppercase opacity-40">
              {theme === 'light' ? 'SYSTEM_DESIGNER' : 'GAME_ARCHITECT'}
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm font-chinese font-bold tracking-widest">
                {theme === 'light' ? '尹果 YinGuo' : '果子 Y.G.'}
              </span>
              <div className={`px-2 py-[2px] text-[8px] font-cinzel border rounded-sm ${theme === 'dark' ? 'border-purple-500/50 text-purple-400' : 'border-black/20 text-black/60'}`}>
                LV.99
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-12">
          <nav className="hidden lg:flex gap-10 font-cinzel text-[9px] tracking-[0.4em] font-bold opacity-30 hover:opacity-100 transition-opacity">
            <button onClick={() => scrollToSection('home')} className="hover:text-current">[ {theme === 'light' ? '首页' : 'HOME'} ]</button>
            {sections.map(section => (
              <button 
                key={section.id} 
                onClick={() => scrollToSection(section.id)} 
                className="hover:text-current"
              >
                [ {section.id === 'about' ? '关于我' : 
                   section.id === 'skills' ? '技能' : 
                   section.id === 'projects' ? '项目' : 
                   section.id === 'gaming' ? '游戏' : 
                   section.id === 'contact' ? '联系' : section.name} ]
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-8">
            <div className="hidden sm:flex flex-col items-end font-cinzel text-[8px] tracking-widest opacity-20">
              <span>SYNC: 100%</span>
              <span>TPS: 60</span>
            </div>
            <button 
              onClick={toggleTheme}
              className={`group relative w-12 h-12 rounded-lg border border-current/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${theme === 'dark' ? 'shadow-[inset_0_0_10px_purple]' : ''}`}
            >
              <span className="text-xl group-hover:rotate-180 transition-transform duration-500">
                {theme === 'dark' ? '👁️' : '⚖️'}
              </span>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[6px] font-cinzel opacity-0 group-hover:opacity-100 transition-opacity">
                PRESS [T]
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-48">
        
        {/* Intro Section - Personal / OC Introduction */}
        <section id="home" className="mb-48 relative">
          <div className="max-w-4xl">
            <h2 className={`text-8xl md:text-[12rem] font-chinese font-bold leading-[0.75] mb-12 tracking-tighter transition-all animate-fade-in-up ${theme === 'dark' ? 'text-white blur-[0.5px] drop-shadow-[0_0_20px_purple]' : 'text-black opacity-90'}`}>
              {theme === 'light' ? '系统策划' : '架构师'}
              <br />
              <span className={`transition-all duration-1000 ${theme === 'light' ? 'opacity-10' : 'opacity-100 text-purple-500 font-whimsical italic text-8xl md:text-[9rem]'}`}>
                {theme === 'light' ? 'System Design' : 'Game Architect'}
              </span>
            </h2>
            <div className={`w-24 h-[2px] mb-16 animate-width-expand ${theme === 'dark' ? 'bg-purple-500 shadow-[0_0_10px_purple]' : 'bg-black opacity-20'}`}></div>
            <p className={`text-xl leading-relaxed font-serif italic max-w-xl transition-all opacity-0 animate-fade-in-up delay-500 fill-mode-forwards ${theme === 'dark' ? 'text-purple-200/40' : 'text-black/60'}`} style={{ animationDelay: '0.8s' }}>
              {theme === 'light' 
                ? "清华美院背景，系统策划。执着于在精密逻辑与人文美学之间寻找那一抹呼吸感。欢迎来到我的个人陈列馆。" 
                : "深渊的观测者，破碎梦境的缝补匠。在虚无的静态中提取代码的魔力，将逻辑萃取为致幻的数字药水。"}
            </p>
          </div>
          
          {theme === 'dark' && (
            <div className="absolute -top-10 -right-20 w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[150px] -z-10 animate-pulse"></div>
          )}
        </section>

        {/* Shelf Grid */}
        <section id="shelves" className="space-y-80">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              {theme === 'light' ? (
                section.id === 'projects' ? (
                  <div className="space-y-12">
                    <div className="flex flex-col mb-16">
                      <span className="text-[10px] font-cinzel tracking-[0.3em] opacity-30 block mb-2">SECTION_PROJECTS</span>
                      <h2 className="text-3xl font-cinzel font-bold">{section.name}</h2>
                      <div className="mt-4 h-px w-12 bg-black opacity-20" />
                    </div>
                    
                    <div className="space-y-12">
                      {/* Main Projects - 2x2 Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {section.items.filter(item => ['startup', 'jam-2', 'jam-1', 'deconstruct-2'].includes(item.id)).map((item) => (
                          <motion.div 
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer bg-black/5 hover:bg-black/10 transition-all rounded-2xl overflow-hidden flex flex-col h-full"
                          >
                            <div className="w-full h-64 overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-1 p-8 flex flex-col">
                              <div className="flex justify-between items-start mb-4">
                                <span className="text-[8px] font-cinzel tracking-widest opacity-40 uppercase">{item.category}</span>
                                <span className="text-[8px] font-cinzel opacity-20">VIEW_DETAILS →</span>
                              </div>
                              <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-2 transition-transform">{item.title}</h3>
                              <p className="text-sm opacity-60 line-clamp-2 mb-6">{item.description}</p>
                              <div className="flex gap-2 mt-auto">
                                {item.tags?.slice(0, 3).map(tag => (
                                  <span key={tag} className="text-[8px] font-cinzel px-2 py-1 border border-black/10 rounded-full">{tag}</span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Secondary Projects - 2x1 Grid (No Images) */}
                      <div className="pt-12 border-t border-black/5">
                        <span className="text-[10px] font-cinzel tracking-[0.2em] opacity-20 block mb-8 uppercase">Other_Works</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {section.items.filter(item => !['startup', 'jam-2', 'jam-1', 'deconstruct-2'].includes(item.id)).map((item) => (
                            <motion.div 
                              key={item.id}
                              onClick={() => handleItemClick(item)}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              className="group cursor-pointer bg-black/5 hover:bg-black/10 transition-all rounded-2xl p-8 flex flex-col justify-between border border-black/5"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <span className="text-[8px] font-cinzel tracking-widest opacity-40 uppercase">{item.category}</span>
                                <div className="w-8 h-px bg-black opacity-10 group-hover:w-12 transition-all" />
                              </div>
                              <div>
                                <h4 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">{item.title}</h4>
                                <p className="text-xs opacity-50 line-clamp-1">{item.description}</p>
                              </div>
                              <div className="mt-6 flex justify-between items-center">
                                <span className="text-[8px] font-cinzel opacity-20">OPEN_ARCHIVE</span>
                                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-1">
                      <div className="sticky top-32">
                        <span className="text-[10px] font-cinzel tracking-[0.3em] opacity-30 block mb-2">SECTION_{section.id.toUpperCase()}</span>
                        <h2 className="text-3xl font-cinzel font-bold mb-4">
                          {section.name}
                        </h2>
                        <div className={`h-px w-12 ${theme === 'light' ? 'bg-black' : 'bg-white'} opacity-20`} />
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-12">
                      {section.items.map((item) => (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-40 aspect-square overflow-hidden bg-black/5">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-1">
                              <span className="text-[8px] font-cinzel tracking-widest opacity-40 mb-1 block">{item.category}</span>
                              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                              <p className="text-sm leading-relaxed opacity-60 whitespace-pre-line">{item.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <Shelf 
                  section={section} 
                  isDark={theme === 'dark'} 
                  onItemClick={handleItemClick}
                />
              )}
            </section>
          ))}
        </section>

        {/* Ending Stats */}
        <footer className={`mt-80 pt-32 border-t border-current/10 flex flex-col md:flex-row justify-between items-start gap-20 transition-all ${theme === 'dark' ? 'opacity-20' : 'opacity-40'}`}>
          <div className="flex flex-col">
            <h4 className="font-cinzel text-[10px] font-bold tracking-[0.6em] mb-6 uppercase">Checkpoint Saved</h4>
            <p className="text-sm font-serif italic max-w-xs leading-loose">
              {theme === 'light' 
                ? "The curator has finished the daily log. Identity synchronization complete." 
                : "The shadow has been documented. The narrative continues in the silence."}
            </p>
          </div>
          
          <div className="flex gap-20 font-cinzel text-[10px] tracking-widest font-bold">
            <div className="flex flex-col gap-6">
              <span className="opacity-40">STORAGE</span>
              <button onClick={() => scrollToSection('projects')} className="text-left hover:tracking-[0.2em] transition-all">SAVES_PROJECTS</button>
              <button onClick={() => scrollToSection('gaming')} className="text-left hover:tracking-[0.2em] transition-all">SAVES_GAMING</button>
            </div>
            <div className="flex flex-col gap-6">
              <span className="opacity-40">SOCIAL</span>
              <button onClick={() => scrollToSection('contact')} className="text-left hover:tracking-[0.2em] transition-all">CONNECT</button>
            </div>
          </div>
        </footer>
      </main>

      <WitchBot theme={theme} isOpen={isBotOpen} setIsOpen={setIsBotOpen} />
      
      {/* Immersive Detail Page */}
      {selectedItem && (
        <DetailView 
          item={selectedItem} 
          theme={theme} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
};

export default App;
