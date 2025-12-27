
import React, { useEffect, useState } from 'react';
import { ContentItem, ThemeMode } from '../types';

interface DetailViewProps {
  item: ContentItem;
  theme: ThemeMode;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ item, theme, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Determine which specific layout logic to use based on ID and Theme
  const getLayoutType = () => {
    if (isDark) {
      if (item.id.includes('vessel') || item.id.includes('lore')) return 'world';
      if (item.id.includes('commissions') || item.id.includes('art')) return 'art';
      return 'log';
    } else {
      if (item.id.includes('proj') || item.id.includes('exp')) return 'project';
      if (item.id.includes('skill') || item.id.includes('work') || item.id.includes('mind')) return 'ability';
      return 'hobby';
    }
  };

  const layoutType = getLayoutType();

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Background Layer - Refined Dark Color */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? 'bg-[#121216]' : 'bg-[#fdfcf8]'}`}>
        {isDark ? (
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-50" />
        )}
      </div>

      {/* Shared HUD Header */}
      <header className={`fixed top-0 left-0 w-full z-50 px-10 py-8 flex justify-between items-center transition-all ${isDark ? 'text-purple-300 bg-black/60 backdrop-blur-xl border-b border-white/5' : 'text-black/40 bg-white/40 backdrop-blur-md'}`}>
        <button onClick={onClose} className="group flex items-center gap-4 font-cinzel text-[10px] tracking-[0.4em] hover:text-current active:scale-95 transition-all">
          <span className="text-xl group-hover:-translate-x-2 transition-transform">←</span>
          <span>{isDark ? 'EXIT_SANCTUM' : 'BACK_TO_ARCHIVE'}</span>
        </button>
        <div className="text-right">
          <p className="font-cinzel text-[8px] tracking-[0.6em] mb-1">RECORD_TYPE</p>
          <p className="font-chinese text-sm font-bold tracking-widest uppercase">{layoutType}</p>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar pt-32 pb-20">
        {isDark ? (
          <ScrollContainer item={item} type={layoutType} />
        ) : (
          <GalleryContainer item={item} type={layoutType} />
        )}
      </div>

      {/* Bottom Border Decoration */}
      <div className={`fixed bottom-0 left-0 w-full h-1 z-30 ${isDark ? 'bg-purple-600 shadow-[0_0_20px_purple]' : 'bg-black/5'}`} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* --- LIGHT THEME: THE LONG GALLERY CONTAINER (PROJECTS & WORKS) --- */
/* -------------------------------------------------------------------------- */
const GalleryContainer = ({ item, type }: { item: ContentItem, type: string }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-10 space-y-48 animate-fade-in-up">
      {/* Introduction Hero */}
      <section className="flex flex-col lg:flex-row items-center gap-24 pt-20">
        <div className="relative w-full lg:w-3/5 group">
          <div className="absolute -inset-10 bg-white opacity-50 blur-3xl pointer-events-none group-hover:opacity-80 transition-opacity" />
          <div className="relative gallery-frame bg-white shadow-2xl border border-black/5 p-8">
            <div className="aspect-[16/9] overflow-hidden bg-gray-100">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[30s] hover:scale-125" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 space-y-8">
          <span className="text-[10px] font-cinzel font-bold tracking-[0.5em] text-black/30 border-b border-black/10 pb-2 inline-block uppercase">Exhibit / {type}</span>
          <h2 className="text-7xl font-chinese font-bold leading-tight text-black">{item.title}</h2>
          <p className="text-xl font-serif italic text-black/60 leading-relaxed">{item.description}</p>
        </div>
      </section>

      {/* Specialized Modules for Light Theme (As per previous successful requests) */}
      {type === 'project' && <ProjectDetailModule />}
      {type === 'ability' && <AbilityDetailModule />}
      {type === 'hobby' && <HobbyDetailModule />}
    </div>
  );
};

const ProjectDetailModule = () => (
  <div className="space-y-48 pb-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div className="space-y-10">
        <h3 className="text-[10px] font-cinzel font-bold tracking-[0.6em] text-black/30 uppercase">Exhibit 02 / Genesis & Research</h3>
        <p className="text-3xl font-chinese font-bold">前期调研与策划构思</p>
        <p className="text-sm font-serif text-black/60 leading-relaxed italic">
          通过对竞品分析及用户心流映射，确定了核心玩法循环。我们专注于在精密逻辑中植入艺术美感。
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 border border-black/5 bg-white/50">
            <span className="text-[8px] font-cinzel opacity-40">TARGET_USER</span>
            <p className="text-xs font-bold mt-1">Creative Gamers</p>
          </div>
          <div className="p-6 border border-black/5 bg-white/50">
            <span className="text-[8px] font-cinzel opacity-40">CORE_LOOP</span>
            <p className="text-xs font-bold mt-1">Discover -> Create -> Refine</p>
          </div>
        </div>
      </div>
      <div className="relative p-10 bg-black/5 rounded-sm flex items-center justify-center">
        <div className="w-full h-full flex flex-col justify-between items-center py-10 gap-8">
          {['IDEATION', 'UX_MAPPING', 'PROTOTYPE', 'POLISH'].map((s, i) => (
            <div key={i} className="flex items-center gap-6 w-full max-w-xs">
              <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center font-cinzel text-[10px]">{i+1}</div>
              <div className="flex-1 h-px bg-black/10" />
              <div className="text-[9px] font-cinzel tracking-widest font-bold">{s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="space-y-20">
      <h3 className="text-[10px] font-cinzel font-bold tracking-[0.6em] text-black/30 text-center uppercase">Exhibit 03 / Visual Language</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-6">
          <img src="https://picsum.photos/seed/env/500/700" className="w-full aspect-[3/4] object-cover gallery-frame p-2 bg-white" />
          <h4 className="text-center font-chinese text-lg font-bold">场景美术</h4>
        </div>
        <div className="space-y-6 pt-12">
          <img src="https://picsum.photos/seed/char/500/700" className="w-full aspect-[3/4] object-cover gallery-frame p-2 bg-white" />
          <h4 className="text-center font-chinese text-lg font-bold">角色设计</h4>
        </div>
        <div className="space-y-6">
          <img src="https://picsum.photos/seed/ui/500/700" className="w-full aspect-[3/4] object-cover gallery-frame p-2 bg-white" />
          <h4 className="text-center font-chinese text-lg font-bold">UI / 交互界面</h4>
        </div>
      </div>
    </div>

    <div className="bg-black/5 p-20 flex flex-col md:flex-row gap-20">
      <div className="md:w-1/3 space-y-6">
        <h3 className="text-[10px] font-cinzel font-bold tracking-[0.6em] text-black/30 uppercase">Exhibit 04 / Engineering</h3>
        <p className="text-2xl font-chinese font-bold">开发（编程）与技术栈</p>
        <p className="text-xs font-serif italic text-black/40">The soul is built in the shadows of the code.</p>
      </div>
      <div className="md:w-2/3 bg-[#1a1a1a] p-10 rounded shadow-inner text-green-500 font-mono text-[11px] overflow-hidden">
        <pre className="opacity-80">
{`// INITIALIZING RENDER KERNEL
class ProjectCore extends EventEmitter {
  constructor(config) {
    this.logic = new LogicEngine(config.rules);
    this.view = new RenderLayer(config.viewport);
  }
  
  async sync() {
    await this.logic.prime();
    this.view.start();
    console.log("PROJECT_SYNC_COMPLETE");
  }
}`}
        </pre>
      </div>
    </div>

    <div className="space-y-12">
       <h3 className="text-[10px] font-cinzel font-bold tracking-[0.6em] text-black/30 uppercase text-center">Grand Finale / Full Showcase</h3>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="aspect-video overflow-hidden gallery-frame p-1 bg-white hover:scale-105 transition-transform duration-700">
               <img src={`https://picsum.photos/seed/show-${i}/800/600`} className="w-full h-full object-cover" />
            </div>
          ))}
       </div>
    </div>
  </div>
);

const AbilityDetailModule = () => (
  <div className="space-y-24 pb-20">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
      <div className="space-y-8">
        <h4 className="font-cinzel text-xs font-bold tracking-widest uppercase opacity-40">Logic Pillars</h4>
        {[85, 92, 78].map((v, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between font-cinzel text-[9px] font-bold">
              <span>MODULE_STABILITY_{i}</span>
              <span>{v}%</span>
            </div>
            <div className="h-1 bg-black/5 overflow-hidden">
              <div className="h-full bg-black" style={{ width: `${v}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="gallery-frame p-10 bg-white/50 border border-black/5">
        <p className="font-serif italic text-black/60 leading-relaxed">
          能力不仅仅是工具的堆砌，更是对复杂系统进行解构与重组的直觉。
        </p>
      </div>
    </div>
  </div>
);

const HobbyDetailModule = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-20">
    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
      <div key={i} className={`aspect-square gallery-frame p-2 bg-white hover:scale-105 transition-all ${i % 2 === 0 ? 'translate-y-4' : ''}`}>
        <img src={`https://picsum.photos/seed/hb-${i}/400/400`} className="w-full h-full object-cover grayscale opacity-60" />
      </div>
    ))}
  </div>
);

/* -------------------------------------------------------------------------- */
/* --- DARK THEME: THE ALCHEMIST'S SCROLL CONTAINER (OCS & ART) --- */
/* -------------------------------------------------------------------------- */
const ScrollContainer = ({ item, type }: { item: ContentItem, type: string }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center gap-12 pb-40">
      
      {/* The Essence (Potion Bottle) */}
      <div className="relative w-72 h-96 group mb-12">
        {/* Bottle Hardware */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-14 h-14 bg-purple-900/40 border-2 border-purple-400/50 rounded-t-xl z-10" />
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-20 h-5 bg-purple-700 border border-purple-400 rounded-full z-20 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
        
        {/* Bottle Body */}
        <div className="relative w-full h-full bg-[#1a1a1f] border-2 border-purple-500/40 rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.2)]">
          <img src={item.image} className="w-full h-full object-cover opacity-80 transition-all duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-0 w-full text-center">
            <span className="text-[10px] font-cinzel text-purple-200 tracking-[0.5em] animate-pulse drop-shadow-md font-bold">EXTRACTING_ESSENCE</span>
          </div>
        </div>
      </div>

      {/* The Redesigned High-Quality Scroll */}
      <div className="relative w-full max-w-4xl min-h-[800px] flex flex-col group/scroll">
        
        {/* TOP ROLLER (Wooden cylinder effect) */}
        <div className="absolute -top-8 left-[-3%] w-[106%] h-16 z-20 flex items-center">
            <div className="w-4 h-20 bg-[#5d4b3f] rounded-l-md shadow-lg" />
            <div className="flex-1 h-14 bg-gradient-to-b from-[#8b7a5e] via-[#c9b896] to-[#5d4b3f] shadow-lg border-y border-black/10" />
            <div className="w-4 h-20 bg-[#5d4b3f] rounded-r-md shadow-lg" />
        </div>
        
        {/* SCROLL BODY (Paper texture with depth) */}
        <div className="relative flex-1 bg-[#e8dab5] mx-auto w-[98%] shadow-[0_30px_100px_rgba(0,0,0,0.6)] p-12 md:p-20 z-10 overflow-hidden" 
             style={{ 
               backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png'), linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 8%, transparent 92%, rgba(0,0,0,0.08) 100%)`,
               boxShadow: 'inset 0 0 120px rgba(139, 122, 94, 0.4), 0 20px 80px rgba(0,0,0,0.7)'
             }}>
          
          <div className="relative text-[#3d2b1f] space-y-12">
            {/* Header Area */}
            <div className="flex justify-between items-start border-b-2 border-[#3d2b1f]/20 pb-10">
              <div className="space-y-3">
                <span className="font-cinzel text-[10px] font-bold tracking-[0.5em] text-[#5d4b3f]/60 uppercase">Codex Archive / {type}</span>
                <h2 className="text-6xl font-chinese font-bold drop-shadow-sm leading-tight">{item.title}</h2>
              </div>
              <div className="text-right">
                <div className="inline-block px-5 py-2 border-2 border-[#3d2b1f]/40 font-cinzel text-xs font-bold tracking-widest uppercase bg-[#3d2b1f]/5">
                  {item.category}
                </div>
              </div>
            </div>

            {/* Narrative Context */}
            <div className="font-serif italic text-2xl leading-relaxed text-[#3d2b1f] first-letter:text-8xl first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:mt-2 first-letter:text-[#5d4b3f]">
              {item.description}
            </div>

            {/* Specialized Modules for Dark Mode Content */}
            {type === 'world' && <WorldDetailModule />}
            {type === 'art' && <ArtDetailModule />}
            {type === 'log' && <LogDetailModule />}

            {/* Scroll Signature/Footer */}
            <div className="pt-24 flex justify-between items-end border-t border-[#3d2b1f]/10">
              <div className="space-y-3">
                <p className="font-cinzel text-[9px] font-bold tracking-[0.4em] opacity-40">SEALED_UNDER_THE_ECLIPSE</p>
                <div className="flex gap-3">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#3d2b1f]/30" />)}
                </div>
              </div>
              <div className="text-7xl opacity-30 transform -rotate-12 select-none hover:rotate-0 transition-transform cursor-default">🪶</div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROLLER */}
        <div className="absolute -bottom-8 left-[-3%] w-[106%] h-16 z-20 flex items-center">
            <div className="w-4 h-20 bg-[#5d4b3f] rounded-l-md shadow-lg" />
            <div className="flex-1 h-14 bg-gradient-to-b from-[#8b7a5e] via-[#c9b896] to-[#5d4b3f] shadow-lg border-y border-black/10" />
            <div className="w-4 h-20 bg-[#5d4b3f] rounded-r-md shadow-lg" />
        </div>
      </div>
    </div>
  );
};

const WorldDetailModule = () => (
  <div className="space-y-20 py-12">
    {/* World Map Section */}
    <div className="space-y-10">
      <h4 className="text-4xl font-chinese font-bold border-l-8 border-[#3d2b1f]/40 pl-8">世界观地图 / Forbidden Chart</h4>
      <div className="relative aspect-[21/9] rounded-sm shadow-2xl overflow-hidden border-4 border-[#3d2b1f]/15 bg-black/10 group">
        <img src="https://picsum.photos/seed/fantasy-world/1600/900" className="w-full h-full object-cover opacity-70 grayscale sepia-50 hover:opacity-100 transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-cinzel text-lg tracking-[1.5em] font-bold opacity-30 text-[#3d2b1f]">THE_UNDISCOVERED_COUNTRY</span>
        </div>
      </div>
    </div>
    
    {/* Residents and Relations */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="space-y-10">
        <h4 className="text-3xl font-chinese font-bold border-l-8 border-[#3d2b1f]/40 pl-6">主要住民 / Resident OCs</h4>
        <div className="grid grid-cols-1 gap-8">
          {[
            { name: "Sylas Vane", role: "Keykeeper of the Void", status: "Watcher" },
            { name: "Lyra Dawn", role: "Echo Weaver", status: "Manifested" },
            { name: "The Alchemist", role: "Curator of Static", status: "Host" }
          ].map((oc, i) => (
            <div key={i} className="flex items-center gap-8 p-6 bg-white/10 rounded-xl border border-[#3d2b1f]/10 group hover:bg-white/20 transition-all">
              <div className="w-20 h-20 rounded-full bg-black/20 overflow-hidden border-4 border-[#3d2b1f]/20 shadow-inner group-hover:scale-105 transition-transform">
                <img src={`https://picsum.photos/seed/oc-portrait-${i}/300/300`} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-2xl font-bold font-chinese">{oc.name}</p>
                <p className="text-sm italic opacity-70 text-[#5d4b3f]">{oc.role}</p>
              </div>
              <div className="text-[10px] font-bold font-cinzel opacity-40 tracking-tighter bg-[#3d2b1f]/10 px-2 py-1">{oc.status}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-10">
        <h4 className="text-3xl font-chinese font-bold border-l-8 border-[#3d2b1f]/40 pl-6">人际网 / Relationship Weave</h4>
        <div className="p-10 border-2 border-dashed border-[#3d2b1f]/30 bg-[#3d2b1f]/5 rounded-2xl font-serif italic text-xl leading-relaxed space-y-6">
          <p className="border-b border-[#3d2b1f]/10 pb-4">“Lyra 寻找着 Sylas 弄丢的钥匙，而 Sylas 却在 Lyra 的回声中迷失。他们从未交谈，但呼吸却在同一个频率跳动。”</p>
          <div className="flex justify-between items-center text-sm font-cinzel opacity-60">
            <span>Log Source: Fragment #902</span>
            <span>Entropy Level: Moderate</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
             {[1,2,3].map(i => <div key={i} className="h-1 bg-[#3d2b1f]/20" />)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ArtDetailModule = () => (
  <div className="space-y-20 py-12">
    {/* Dynamic Tags for Commission */}
    <div className="flex flex-wrap gap-5">
      {['正比插画', 'Q版小人', '平面设计', '契约绘制', '私人藏品'].map(tag => (
        <span key={tag} className="px-6 py-2 bg-[#3d2b1f]/5 border-2 border-[#3d2b1f]/40 text-sm font-chinese font-bold shadow-md hover:bg-[#3d2b1f]/10 hover:border-[#3d2b1f] transition-all cursor-default">
          {tag}
        </span>
      ))}
    </div>
    
    {/* Artwork Presentation (Large Tray) */}
    <div className="space-y-12">
      <div className="bg-white/40 p-10 shadow-[-20px_20px_60px_rgba(0,0,0,0.3)] rounded-sm border border-[#3d2b1f]/15 relative group">
        <img src="https://picsum.photos/seed/commission-final/1200/1600" className="w-full h-auto grayscale-[20%] hover:grayscale-0 transition-all duration-1000 shadow-2xl" />
        <div className="absolute top-14 right-14 w-24 h-24 border-4 border-[#3d2b1f]/20 rounded-full flex items-center justify-center rotate-12 opacity-40">
           <span className="font-cinzel text-[10px] font-bold text-center">CONTRACT<br/>VERIFIED</span>
        </div>
      </div>
      
      {/* Commission Metadata Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-cinzel font-bold text-[#3d2b1f]/80 italic tracking-[0.2em] bg-[#3d2b1f]/10 p-6 rounded-lg">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] opacity-40 not-italic">ELAPSED_TIME</span>
            <span>72_MOON_CYCLES</span>
          </div>
          <div className="w-px h-8 bg-[#3d2b1f]/20" />
          <div className="flex flex-col">
            <span className="text-[9px] opacity-40 not-italic">FILE_ID</span>
            <span>COMM_#0923_ART</span>
          </div>
        </div>
        <div className="px-4 py-2 border border-[#3d2b1f]/20 bg-[#e8dab5] rounded shadow-inner">
           STATUS: FINALIZED
        </div>
      </div>
    </div>
  </div>
);

const LogDetailModule = () => (
  <div className="space-y-16 py-12">
    <div className="p-12 border-l-8 border-[#3d2b1f]/50 bg-[#3d2b1f]/5 italic text-3xl font-serif leading-loose text-[#3d2b1f]/90 shadow-inner">
      “每一次记录都是对虚无的一次反击。我们在这里堆砌逻辑，试图在混沌中搭建一座永恒的图书馆，哪怕它最终会被名为‘遗忘’的洪水淹没。”
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="aspect-square bg-white/20 border-2 border-[#3d2b1f]/15 flex flex-col items-center justify-center p-6 text-center group hover:bg-white/40 hover:border-[#3d2b1f]/40 transition-all shadow-lg cursor-pointer">
          <span className="text-5xl mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform">📜</span>
          <div className="space-y-1">
             <span className="text-[10px] font-bold font-cinzel opacity-40 tracking-widest uppercase block">Fragment</span>
             <span className="text-xs font-bold font-serif italic text-[#5d4b3f]">Echo_{i * 2}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DetailView;
