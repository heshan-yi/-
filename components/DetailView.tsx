
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
      if (item.id.includes('gaming') || item.id.includes('contact')) return 'log';
      return 'log';
    } else {
      if (item.id.includes('deconstruct') || item.id.includes('jam') || item.id.includes('startup') || item.id.includes('practice')) return 'project';
      if (item.id.includes('pro-tools') || item.id.includes('coding') || item.id.includes('expertise')) return 'ability';
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

      {/* Shared HUD Header - Merged with Project Nav */}
      <header className={`fixed top-0 left-0 w-full z-50 px-10 py-4 flex justify-between items-center transition-all ${isDark ? 'text-purple-300 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'text-black bg-white/80 backdrop-blur-md border-b border-black/5'}`}>
        <div className="flex items-center gap-8">
          <button onClick={onClose} className="group flex items-center gap-3 font-cinzel text-[10px] tracking-[0.4em] hover:opacity-60 active:scale-95 transition-all">
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span>{isDark ? 'EXIT' : 'HOME'}</span>
          </button>
          <div className="h-4 w-px bg-current opacity-10" />
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-cinzel ${isDark ? 'bg-purple-500 text-white' : 'bg-black text-white'}`}>YG</div>
            <span className="font-cinzel text-[10px] tracking-widest font-bold truncate max-w-[150px]">{item.title}</span>
          </div>
        </div>

        {layoutType === 'project' && !isDark && (
          <nav className="hidden md:flex gap-8 font-cinzel text-[9px] tracking-widest opacity-40">
            {['HERO', 'INTRO', 'GAMEPLAY', 'VISUAL', 'LEVEL', 'TEAM', 'FEEDBACK'].map(anchor => (
              <button key={anchor} onClick={() => {
                const el = document.getElementById(anchor.toLowerCase());
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} className="hover:opacity-100 transition-opacity">
                {anchor}
              </button>
            ))}
          </nav>
        )}

        <div className="text-right hidden sm:block">
          <p className="font-cinzel text-[7px] tracking-[0.6em] mb-0.5 opacity-40">RECORD_TYPE</p>
          <p className="font-chinese text-[10px] font-bold tracking-widest uppercase">{layoutType}</p>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar pt-24 pb-20">
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
  if (type === 'project') {
    return <ProjectLayout item={item} />;
  }

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

      {/* Specialized Modules for Light Theme */}
      {type === 'ability' && <AbilityDetailModule />}
      {type === 'hobby' && <HobbyDetailModule />}
    </div>
  );
};

const NarutoDeconstructModule = ({ item }: { item: ContentItem }) => {
  return (
    <div className="w-full bg-white text-black font-inter">
      <div className="max-w-7xl mx-auto px-10 space-y-40 pb-40">
        {/* Hero Section */}
        <section id="hero" className="pt-20">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl mb-12 group">
            <img src={item.image} className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {item.category}
                </span>
                {item.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-4">{item.title}</h1>
              <p className="text-xl font-cinzel tracking-[0.3em] opacity-80 mb-6 uppercase">ROLE: 系统策划 / 深度拆解</p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-white text-black font-bold text-sm rounded-full hover:scale-105 transition-transform">VIEW_PDF</button>
                <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm rounded-full hover:bg-white/20 transition-all">ANALYSIS_LOG</button>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section id="intro" className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 p-12 bg-black/5 rounded-3xl border border-black/5">
            <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 mb-8 uppercase">01_拆解目的与背景</h3>
            <p className="text-3xl font-bold leading-tight mb-8">提炼驱动玩家互动和留存的设计逻辑，形成可迁移的社交机制设计思路。</p>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="space-y-2">
                <h4 className="font-bold opacity-40">竞品参考</h4>
                <p>航海王 (One Piece)</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold opacity-40">核心认知</h4>
                <p>熟人社交为主的轻社交强竞技格斗游戏，依托微信/QQ平台进行社交互动。</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-8 border border-black/5 rounded-3xl bg-black text-white">
              <h4 className="font-cinzel text-[10px] tracking-widest mb-4 opacity-40">ANALYSIS_PHASES</h4>
              <ul className="space-y-3 text-xs">
                <li className="flex gap-3">
                  <span className="opacity-30">01</span>
                  <span>局外社交系统 (全局视野)</span>
                </li>
                <li className="flex gap-3">
                  <span className="opacity-30">02</span>
                  <span>局内社交点 (核心互动)</span>
                </li>
                <li className="flex gap-3">
                  <span className="opacity-30">03</span>
                  <span>社区生态 (外围影响力)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Organization System */}
        <section id="gameplay" className="space-y-12">
          <div className="flex justify-between items-end">
            <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 uppercase">02_组织系统 (核心)</h3>
            <span className="text-[8px] font-cinzel opacity-20">BOND_SYSTEM_LOGIC</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="p-10 bg-black/5 rounded-3xl border border-black/5">
                <h4 className="text-2xl font-bold mb-6">核心任务：构建“羁绊”</h4>
                <p className="text-lg opacity-60 leading-relaxed mb-8">
                  不同于好友系统解决“现实关系导入”，组织系统的核心任务是在游戏内构建一个有温度、有目标、有归属的集体。
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: '归属感', desc: '身份、历史、文化' },
                    { label: '互助性', desc: '低成本相互帮助' },
                    { label: '利益绑定', desc: '成长资源挂钩' },
                    { label: '集体荣誉', desc: '周期性集体活动' }
                  ].map(attr => (
                    <div key={attr.label} className="p-4 bg-white rounded-xl border border-black/5">
                      <p className="font-bold text-sm mb-1">{attr.label}</p>
                      <p className="text-[10px] opacity-40">{attr.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-10 bg-black text-white rounded-3xl">
                <h4 className="text-xl font-bold mb-8 font-cinzel tracking-widest">SYSTEM_ARCHITECTURE</h4>
                <div className="space-y-6 text-sm">
                  <div className="flex gap-6">
                    <div className="w-16 font-bold opacity-30">信息</div>
                    <div className="flex-1 opacity-60">基础信息、荣誉展示、进入组织</div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-16 font-bold opacity-30">玩法</div>
                    <div className="flex-1 opacity-60">祈愿、祈福、叛忍来袭、要塞争夺战</div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-16 font-bold opacity-30">成员</div>
                    <div className="flex-1 opacity-60">成员列表、职位管理、退出/加入</div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-16 font-bold opacity-30">日志</div>
                    <div className="flex-1 opacity-60">组织大事记、历史轨迹记录</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Friend & Chat */}
        <section id="visual" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 uppercase">03_好友与聊天系统</h3>
            <div className="p-10 bg-black/5 rounded-3xl border border-black/5 space-y-8">
              <div className="space-y-4">
                <h4 className="font-bold">好友系统：现实关系导入</h4>
                <p className="text-sm opacity-60 leading-relaxed">
                  利用微信/QQ关系链快速建立好友网络。通过“一键赠送/领取体力”构建低成本高频次的轻量化日常互动。
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold">聊天系统：信息高速公路</h4>
                <p className="text-sm opacity-60 leading-relaxed">
                  构建“信息分层”：世界频道（公共表达）、组织频道（集体协同）、系统播报（权威信息）。
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-12">
            <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 uppercase">04_局内社交点</h3>
            <div className="p-10 bg-black text-white rounded-3xl space-y-8">
              <div className="flex items-center gap-6">
                <div className="text-4xl">💬</div>
                <div>
                  <h4 className="font-bold">局内表情包</h4>
                  <p className="text-xs opacity-40">轻量情绪表达出口，缓解对局压力。</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-4xl">🎙️</div>
                <div>
                  <h4 className="font-bold">实时语音</h4>
                  <p className="text-xs opacity-40">降低配合成本，提升通关成功率。</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-4xl">🎴</div>
                <div>
                  <h4 className="font-bold">战后名片</h4>
                  <p className="text-xs opacity-40">将临时关系转化为好友的机会。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard */}
        <section id="level" className="space-y-12">
          <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 uppercase">05_排行榜系统</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-12 bg-black/5 rounded-3xl border border-black/5">
              <h4 className="text-2xl font-bold mb-6">多维度评价体系</h4>
              <p className="text-lg opacity-60 leading-relaxed mb-8">
                让每个玩家都有“上榜”的机会。覆盖战力、竞技、收集等多维度，引导玩家成长方向。
              </p>
              <div className="flex gap-4">
                {['本服排行', '战区排行', '全区排行', '国服排行'].map(rank => (
                  <span key={rank} className="px-4 py-2 bg-black text-white text-[10px] font-bold rounded-lg">{rank}</span>
                ))}
              </div>
            </div>
            <div className="p-12 bg-black text-white rounded-3xl flex flex-col justify-center">
              <h4 className="text-xl font-bold mb-4">荣誉资产化</h4>
              <p className="text-sm opacity-40 leading-relaxed italic">
                “称号与头像框作为荣誉资产，激发他人羡慕与追赶，成为付费转化的催化剂。”
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section id="feedback" className="space-y-12">
          <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 uppercase">06_总结：社交五层结构</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: '战略层', desc: '核心定位' },
              { label: '范围层', desc: '功能覆盖' },
              { label: '结构层', desc: '导入与沉淀' },
              { label: '交互层', desc: '轻量化' },
              { label: '表现层', desc: 'IP塑造' }
            ].map((layer, i) => (
              <div key={layer.label} className="p-6 border border-black/5 rounded-2xl text-center space-y-2 hover:bg-black hover:text-white transition-all">
                <span className="text-[8px] font-cinzel opacity-30">LAYER_0{i+1}</span>
                <p className="font-bold text-sm">{layer.label}</p>
                <p className="text-[10px] opacity-40">{layer.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary & Footer */}
        <section className="pt-20 border-t border-black/5 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-4xl font-bold">结语</h3>
            <p className="text-sm opacity-60 leading-relaxed">
              《火影忍者》社交系统围绕“羁绊”主题，通过身份塑造、互惠循环、利益绑定与管理支撑四个层次，将松散的玩家群体凝聚为有温度、有战斗力的集体。
            </p>
          </div>
          <div className="flex justify-center gap-6">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-10 py-4 bg-black text-white font-bold rounded-full hover:scale-105 transition-transform">TOP_OF_PAGE</button>
            <button className="px-10 py-4 border border-black/20 font-bold rounded-full hover:bg-black hover:text-white transition-all">NEXT_PROJECT</button>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProjectLayout = ({ item }: { item: ContentItem }) => {
  if (item.id === 'deconstruct-2') {
    return <NarutoDeconstructModule item={item} />;
  }

  return (
    <div className="w-full bg-white text-black font-inter">
      <div className="max-w-7xl mx-auto px-10 space-y-40 pb-40">
        {/* Hero Section */}
        <section id="hero" className="pt-20">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl mb-12 group">
            <img src={item.image} className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {item.category}
                </span>
                {item.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-4">{item.title}</h1>
              {item.role && (
                <p className="text-xl font-cinzel tracking-[0.3em] opacity-80 mb-6 uppercase">ROLE: {item.role}</p>
              )}
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-white text-black font-bold text-sm rounded-full hover:scale-105 transition-transform">PLAY_DEMO</button>
                <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm rounded-full hover:bg-white/20 transition-all">VIEW_DOCS</button>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section id="intro" className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 p-12 bg-black/5 rounded-3xl border border-black/5">
            <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 mb-8 uppercase">01_INTRODUCTION</h3>
            <p className="text-3xl font-bold leading-tight mb-8">{item.description}</p>
            <p className="text-lg opacity-60 leading-relaxed">
              本项目旨在探索核心玩法与叙事体验的深度融合。通过对系统逻辑的精密设计，我们试图为玩家提供一个既具有挑战性又不失沉浸感的规则世界。
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-8 border border-black/5 rounded-3xl flex items-center gap-6 group hover:bg-black/5 transition-colors">
              <div className="text-4xl group-hover:scale-110 transition-transform">💡</div>
              <div>
                <h4 className="font-bold">灵感来源</h4>
                <p className="text-xs opacity-50">Inspiration & Concept</p>
              </div>
            </div>
            <div className="p-8 border border-black/5 rounded-3xl flex items-center gap-6 group hover:bg-black/5 transition-colors">
              <div className="text-4xl group-hover:scale-110 transition-transform">🎯</div>
              <div>
                <h4 className="font-bold">核心目标</h4>
                <p className="text-xs opacity-50">Core Objectives</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Gameplay */}
        <section id="gameplay" className="space-y-12">
          <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 uppercase">02_CORE_GAMEPLAY</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-video bg-black/5 rounded-3xl overflow-hidden relative group">
              <img src="https://picsum.photos/seed/gameplay/1200/800" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">▶</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg">
                OPERATION_GIF_AREA
              </div>
            </div>
            <div className="p-12 bg-black text-white rounded-3xl flex flex-col justify-center space-y-8">
              <h4 className="text-2xl font-bold">进度条特写 / Progress Logic</h4>
              <p className="opacity-60 text-sm leading-relaxed">
                我们重新设计了 UI 反馈系统，确保玩家在激烈的操作中依然能够清晰感知当前的资源状态与技能冷却。
              </p>
              <div className="space-y-4">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-3/4 animate-pulse" />
                </div>
                <div className="flex justify-between text-[10px] font-cinzel tracking-widest opacity-40">
                  <span>SYNCING_DATA...</span>
                  <span>75%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Humor & Punishment */}
        <section className="space-y-12">
          <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 uppercase">03_PUNISHMENT_HUMOR</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-black/5 rounded-3xl overflow-hidden group">
                <img src={`https://picsum.photos/seed/humor-${i}/600/600`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="p-6">
                  <p className="text-xs font-bold opacity-40">DEATH_SCENE_{i}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Characters & UI */}
        <section id="visual" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] bg-black/5 rounded-3xl overflow-hidden group">
            <img src="https://picsum.photos/seed/character/800/1200" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <h4 className="text-4xl font-bold mb-2">角色立绘</h4>
              <p className="text-xs opacity-60 font-cinzel tracking-widest">CHARACTER_DESIGN</p>
            </div>
          </div>
          <div className="space-y-12">
            <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 uppercase">04_VISUAL_IDENTITY</h3>
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-black/5 rounded-2xl border border-black/5 p-4 flex items-center justify-center">
                  <img src={`https://picsum.photos/seed/ui-icon-${i}/200/200`} className="w-1/2 opacity-40 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
            <div className="p-8 bg-black/5 rounded-3xl">
              <h4 className="font-bold mb-4">UI 组合 / Interface System</h4>
              <p className="text-sm opacity-60 leading-relaxed italic">
                “美学不应干扰功能，而应成为功能的延伸。”
              </p>
            </div>
          </div>
        </section>

        {/* Level Design */}
        <section id="level" className="space-y-12">
          <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 uppercase">05_LEVEL_DESIGN</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['FOREST', 'CAVE', 'CITY', 'VOID'].map((name, i) => (
              <div key={i} className="p-8 bg-black/5 rounded-3xl border border-black/5 hover:bg-black hover:text-white transition-all group">
                <span className="text-[8px] font-cinzel opacity-40 block mb-4">STAGE_0{i+1}</span>
                <h4 className="text-xl font-bold mb-2">{name}</h4>
                <div className="w-full h-1 bg-current opacity-10 mt-4 group-hover:opacity-30" />
              </div>
            ))}
          </div>
          <div className="p-12 bg-black/5 rounded-3xl border border-black/5">
            <h4 className="font-bold mb-8">难度曲线 / Difficulty Curve</h4>
            <div className="h-40 w-full flex items-end gap-2">
              {[20, 35, 30, 50, 45, 70, 65, 90, 85, 100].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-black/10 hover:bg-black transition-colors rounded-t-lg" 
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[8px] font-cinzel tracking-widest opacity-40 uppercase">
              <span>Early Game</span>
              <span>Mid Game</span>
              <span>End Game</span>
            </div>
          </div>
        </section>

        {/* Team & Dev Process */}
        <section id="team" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-12 border border-black/5 rounded-3xl space-y-8">
            <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 uppercase">06_TEAM_DIVISION</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                <span className="font-bold">尹果 (YinGuo)</span>
                <span className="text-xs opacity-50">主策划 / UI 设计</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                <span className="font-bold">Team Member A</span>
                <span className="text-xs opacity-50">程序开发</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                <span className="font-bold">Team Member B</span>
                <span className="text-xs opacity-50">美术表现</span>
              </div>
            </div>
          </div>
          <div className="p-12 bg-black text-white rounded-3xl space-y-8">
            <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-40 uppercase">07_ADJUSTMENT_STORY</h3>
            <p className="text-lg font-serif italic leading-relaxed">
              “在开发中期，我们发现核心循环过于冗长，导致玩家在第二关出现明显的疲劳感。通过引入即时反馈机制和缩短关卡流程，我们成功将留存率提升了 30%。”
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xl">🔧</div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xl">📈</div>
            </div>
          </div>
        </section>

        {/* Test Feedback */}
        <section id="feedback" className="space-y-12">
          <h3 className="text-[10px] font-cinzel font-bold tracking-[0.5em] opacity-30 uppercase">08_TEST_FEEDBACK</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-black/5 rounded-3xl border border-black/5 relative">
              <span className="text-6xl absolute top-4 right-8 opacity-10">“</span>
              <p className="text-xl font-bold mb-6">“操作手感非常丝滑，特别是进度条的反馈设计，让人很有成就感。”</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/10" />
                <div>
                  <p className="text-xs font-bold">测试玩家 A</p>
                  <p className="text-[8px] opacity-40">BETA_TESTER</p>
                </div>
              </div>
            </div>
            <div className="p-10 bg-black/5 rounded-3xl border border-black/5 relative">
              <span className="text-6xl absolute top-4 right-8 opacity-10">“</span>
              <p className="text-xl font-bold mb-6">“关卡难度曲线设计得很合理，既有挑战性又不会让人感到绝望。”</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/10" />
                <div>
                  <p className="text-xs font-bold">测试玩家 B</p>
                  <p className="text-[8px] opacity-40">BETA_TESTER</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary & Footer */}
        <section className="pt-20 border-t border-black/5 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-4xl font-bold">总结与反思</h3>
            <p className="text-sm opacity-60 leading-relaxed">
              本项目是我在系统策划领域的一次重要实践。通过对核心循环的反复打磨与对玩家反馈的深度分析，我更加坚信：好的设计应当是逻辑与美学的完美统一。
            </p>
          </div>
          <div className="flex justify-center gap-6">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-10 py-4 bg-black text-white font-bold rounded-full hover:scale-105 transition-transform">TOP_OF_PAGE</button>
            <button className="px-10 py-4 border border-black/20 font-bold rounded-full hover:bg-black hover:text-white transition-all">NEXT_PROJECT</button>
          </div>
        </section>
      </div>
    </div>
  );
};

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
