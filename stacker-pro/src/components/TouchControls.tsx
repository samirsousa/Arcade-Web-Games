import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';

interface TouchControlsProps {
  onDrop: () => void;
  visible: boolean;
}

export const TouchControls: React.FC<TouchControlsProps> = ({ onDrop, visible }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const hasTouch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isNarrow = window.innerWidth <= 1024;
      setIsMobile(Boolean(hasTouch && (isCoarse || isNarrow)));
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Nunca renderiza no PC
  if (!visible || !isMobile) return null;

  const handlePress = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onDrop();
  };

  return (
    <div
      className="fixed inset-x-0 bottom-6 px-6 pointer-events-none flex lg:hidden justify-center items-end z-30 select-none pb-[env(safe-area-inset-bottom,0.75rem)] touch-none"
    >
      <button
        type="button"
        onTouchStart={handlePress}
        className="pointer-events-auto flex items-center justify-center gap-3 px-8 py-4 rounded-3xl bg-gradient-to-r from-cyan-600/90 via-slate-900/90 to-pink-600/90 backdrop-blur-md border-2 border-cyan-400 text-white active:scale-95 transition-all shadow-2xl shadow-cyan-500/40 font-display font-black text-lg tracking-widest touch-manipulation group"
        aria-label="Soltar Bloco"
      >
        <Layers className="w-6 h-6 text-cyan-300 group-active:rotate-12 transition-transform" />
        <span>SOLTAR BLOCO</span>
      </button>
    </div>
  );
};
