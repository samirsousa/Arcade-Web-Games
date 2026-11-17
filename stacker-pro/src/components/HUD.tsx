import React from 'react';
import { GameStats } from '../types/game';
import { Pause, Trophy, Flame, Building2, Zap, Heart } from 'lucide-react';

interface HUDProps {
  stats: GameStats;
  onPause: () => void;
  onOpenSettings: () => void;
}

export const HUD: React.FC<HUDProps> = ({ stats, onPause }) => {
  return (
    <div className="fixed inset-x-0 top-0 p-3 sm:p-5 pointer-events-none flex flex-col gap-2 z-20 select-none">
      {/* Barra Superior Principal */}
      <div className="flex justify-between items-center max-w-4xl mx-auto w-full">
        {/* Painel Esquerdo: Andar / Altura da Torre */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-cyan-500/40 shadow-lg shadow-cyan-950/40">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                ANDAR URBANO
              </span>
              <span className="text-lg sm:text-2xl font-black font-display text-white tracking-wider">
                {stats.height} <small className="text-xs font-mono text-cyan-400">FL</small>
              </span>
            </div>
          </div>

          {/* Vidas / Tolerância de Erros */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-pink-500/30 shadow-lg shadow-pink-950/30">
            <span className="text-[10px] font-mono font-bold text-slate-400 mr-1 hidden sm:inline">
              VIDAS:
            </span>
            {Array.from({ length: stats.maxLives }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 transition-all ${
                  i < stats.lives
                    ? 'text-pink-500 fill-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] scale-100'
                    : 'text-slate-700 fill-slate-800 scale-90'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Painel Direito: Pontuação, Combo & Botão Pausa */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Pontuação */}
          <div className="text-right px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-purple-500/40 shadow-lg shadow-purple-950/40">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
              PONTUAÇÃO
            </span>
            <span className="text-base sm:text-2xl font-black font-mono text-white tracking-wider">
              {stats.score.toLocaleString()}
            </span>
          </div>

          {/* Botão Pausa */}
          <button
            type="button"
            onClick={onPause}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-lg"
            aria-label="Pausar jogo"
          >
            <Pause className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Faixa Secundária: Combo Streak & Zona Urbana */}
      <div className="flex justify-between items-center max-w-4xl mx-auto w-full px-1">
        {/* Combo Streak */}
        <div className="flex items-center gap-2">
          {stats.combo > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-400/50 shadow-md shadow-amber-950/40 animate-pulse-fast">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-mono font-black text-amber-300 tracking-wider">
                COMBO x{stats.combo}
              </span>
            </div>
          )}

          {stats.perfectDrops > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>{stats.perfectDrops} PERFECTS</span>
            </div>
          )}
        </div>

        {/* Zona Urbana Atual & Recorde */}
        <div className="flex items-center gap-2 text-right">
          <div className="px-2.5 py-1 rounded-xl bg-slate-900/70 border border-slate-800 text-[10px] sm:text-xs font-mono text-cyan-300">
            {stats.zone}
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900/70 border border-slate-800 text-[10px] font-mono text-amber-400">
            <Trophy className="w-3 h-3 text-amber-400" />
            <span>TOP: {stats.highScore.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
