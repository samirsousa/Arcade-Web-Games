import React, { useState, useEffect } from 'react';
import { InputState } from '../types/game';

interface TouchControlsProps {
  onInput: (key: keyof InputState, value: boolean) => void;
  visible: boolean;
}

export const TouchControls: React.FC<TouchControlsProps> = ({ onInput, visible }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Detecta se é touch screen real com ponteiro grosso (típico de celulares e tablets)
      const hasTouch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const isNarrowScreen = window.innerWidth <= 1024;
      
      // Nunca exibir em PC com mouse convencional e telas amplas
      setIsMobile(Boolean(hasTouch && (isCoarsePointer || isNarrowScreen)));
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Se não estiver visível ou se for desktop/PC, não renderiza absolutamente nada no DOM
  if (!visible || !isMobile) return null;

  const handlePress = (key: keyof InputState) => (e: React.SyntheticEvent) => {
    e.preventDefault();
    onInput(key, true);
  };

  const handleRelease = (key: keyof InputState) => (e: React.SyntheticEvent) => {
    e.preventDefault();
    onInput(key, false);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-4 sm:bottom-6 px-4 sm:px-6 pointer-events-none flex lg:hidden justify-between items-end z-40 select-none pb-[env(safe-area-inset-bottom,0.75rem)] touch-none"
      style={{ WebkitUserSelect: 'none' }}
    >
      {/* D-Pad Horizontal (Esquerda / Direita) */}
      <div className="flex gap-3 sm:gap-4 pointer-events-auto">
        <button
          type="button"
          onTouchStart={handlePress('left')}
          onTouchEnd={handleRelease('left')}
          onTouchCancel={handleRelease('left')}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900/85 backdrop-blur-md border-2 border-emerald-500/60 text-emerald-400 active:bg-emerald-500 active:text-black active:scale-95 transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center font-mono text-xl sm:text-2xl font-bold touch-manipulation"
          aria-label="Mover para Esquerda"
        >
          ◀
        </button>

        <button
          type="button"
          onTouchStart={handlePress('right')}
          onTouchEnd={handleRelease('right')}
          onTouchCancel={handleRelease('right')}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900/85 backdrop-blur-md border-2 border-emerald-500/60 text-emerald-400 active:bg-emerald-500 active:text-black active:scale-95 transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center font-mono text-xl sm:text-2xl font-bold touch-manipulation"
          aria-label="Mover para Direita"
        >
          ▶
        </button>
      </div>

      {/* Botões de Ação (Pulo e Boost) */}
      <div className="flex gap-3 sm:gap-4 pointer-events-auto items-end">
        {/* Boost Pad / Ação (Sonic Style) */}
        <button
          type="button"
          onTouchStart={handlePress('boost')}
          onTouchEnd={handleRelease('boost')}
          onTouchCancel={handleRelease('boost')}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/85 backdrop-blur-md border-2 border-blue-500/70 text-blue-400 active:bg-blue-500 active:text-white active:scale-95 transition-all shadow-lg shadow-blue-950/60 flex items-center justify-center font-mono text-lg sm:text-xl font-black touch-manipulation"
          aria-label="Super Boost"
        >
          ⚡
        </button>

        {/* Pulo (Mario Style) */}
        <button
          type="button"
          onTouchStart={handlePress('jump')}
          onTouchEnd={handleRelease('jump')}
          onTouchCancel={handleRelease('jump')}
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/80 text-purple-300 active:bg-purple-600 active:text-white active:scale-95 transition-all shadow-xl shadow-purple-950/70 flex items-center justify-center font-mono text-2xl sm:text-3xl font-black touch-manipulation"
          aria-label="Pular"
        >
          ▲
        </button>
      </div>
    </div>
  );
};
