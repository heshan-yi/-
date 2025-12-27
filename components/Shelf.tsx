
import React, { useState } from 'react';
import { Section, ContentItem } from '../types';

interface ShelfProps {
  section: Section;
  isDark: boolean;
  onItemClick: (item: ContentItem) => void;
}

const Shelf: React.FC<ShelfProps> = ({ section, isDark, onItemClick }) => {
  return (
    <div className="relative">
      {/* Decorative Game-style Header */}
      <div className={`flex flex-col mb-20 ${isDark ? 'items-center text-center' : 'items-start'}`}>
        <div className={`mb-6 p-1 border-b-2 transition-all duration-1000 ${isDark ? 'border-purple-500/30' : 'border-black/10'}`}>
          <div className={`w-14 h-14 flex items-center justify-center text-3xl transition-all ${isDark ? 'animate-dream blur-[0.5px]' : 'opacity-40'}`}>
            {section.icon}
          </div>
        </div>
        <div className="relative group">
          <h3 className={`text-4xl font-chinese font-bold tracking-tight uppercase ${isDark ? 'text-white' : 'text-black'}`}>
            {section.name}
          </h3>
          <p className="font-cinzel text-[10px] tracking-[0.7em] mt-4 uppercase opacity-30">
            {isDark ? 'LEVEL_ARCHIVE_DATA' : 'CURATED_SECTOR_01'}
          </p>
          {/* Minimalist Underline for Shelf effect */}
          <div className={`mt-2 h-px w-full transition-all duration-1000 ${isDark ? 'bg-purple-500/20' : 'bg-black/5'}`}></div>
        </div>
      </div>
      
      {/* Item Grid - High-end Slot Appearance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
        {section.items.map((item, idx) => (
          <ItemSlot 
            key={item.id} 
            item={item} 
            isDark={isDark} 
            idx={idx} 
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
      
      {/* Shelf Divider Line */}
      <div className={`mt-32 h-[2px] w-full transition-all duration-1000 ${isDark ? 'bg-gradient-to-r from-transparent via-purple-500/10 to-transparent' : 'bg-gradient-to-r from-transparent via-black/5 to-transparent'}`}></div>
    </div>
  );
};

interface ItemSlotProps {
  item: ContentItem;
  isDark: boolean;
  idx: number;
  onClick: () => void;
}

const ItemSlot: React.FC<ItemSlotProps> = ({ item, isDark, idx, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isRare = ['Masterwork', 'Legendary', 'Artifact', 'Vessel', 'Soul'].includes(item.category);

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex flex-col cursor-pointer
        transition-all duration-1000
        ${isDark ? 'animate-dream' : 'hover:-translate-y-2'}
      `}
      style={isDark ? { animationDelay: `${idx * 0.5}s` } : {}}
    >
      {/* The Slot / Frame */}
      <div className={`
        relative w-full aspect-[3/4] mb-8 overflow-hidden transition-all duration-1000
        ${isDark 
          ? `dream-frame bg-black/80 border border-white/5 group-hover:border-purple-500/40 p-1 ${isRare ? 'shadow-[0_0_30px_rgba(192,132,252,0.15)]' : ''}` 
          : `gallery-frame bg-white/50 border border-black/5 group-hover:border-black/20 ${isRare ? 'shadow-[0_15px_40px_rgba(0,0,0,0.08)]' : ''}`}
      `}>
        {/* Interaction Progress Bar */}
        <div className={`absolute bottom-0 left-0 h-[2px] z-40 transition-all duration-700 bg-current opacity-60 ${isHovered ? 'w-full' : 'w-0'}`} />
        
        {/* Subtle Rarity Glow (Pulse) */}
        {isRare && (
          <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isDark ? 'bg-purple-500/5 animate-pulse' : 'bg-amber-500/5 animate-pulse'}`}></div>
        )}
        
        <div className="w-full h-full overflow-hidden relative">
          <img 
            src={item.image} 
            alt={item.title} 
            className={`
              w-full h-full object-cover transition-all duration-[1.5s] ease-out
              ${isDark 
                ? 'grayscale-[80%] opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105' 
                : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'}
            `}
          />
          
          {/* HUD Overlay within slot */}
          <div className="absolute top-4 left-4 z-30 flex flex-col gap-1">
            <span className={`text-[8px] font-cinzel font-bold tracking-widest px-2 py-1 transition-all ${isDark ? 'bg-purple-900/80 text-purple-300' : 'bg-black text-white'}`}>
              {item.category}
            </span>
            {isHovered && (
              <span className="text-[6px] font-cinzel tracking-[0.2em] opacity-40">
                {isDark ? 'ANALYZING_CORE...' : 'CURATING_ITEM...'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Typography - Illustrated Book Style */}
      <div className={`px-2 transition-all duration-700 ${isDark ? 'text-center' : 'text-left'}`}>
        <h4 className={`text-xl font-chinese font-bold mb-3 transition-colors ${isDark ? 'text-purple-100/60 group-hover:text-purple-200 group-hover:opacity-100' : 'text-black group-hover:text-black/40'}`}>
          {item.title}
        </h4>
        <p className={`text-xs font-serif italic leading-relaxed transition-opacity duration-700 ${isDark ? 'opacity-20 group-hover:opacity-50' : 'opacity-50'}`}>
          {item.description}
        </p>
      </div>

      {/* Slot Interaction Hints */}
      <div className={`mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-40 transition-all duration-500 ${isDark ? 'justify-center translate-y-2 group-hover:translate-y-0' : 'justify-start translate-x-2 group-hover:translate-x-0'}`}>
        <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-purple-400' : 'bg-black'}`}></div>
        <span className="font-cinzel text-[7px] tracking-widest uppercase">Inspect</span>
      </div>
    </div>
  );
};

export default Shelf;
