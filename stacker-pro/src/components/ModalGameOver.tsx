import React from 'react';
import { GameStats } from '../types/game';
import { RotateCcw, Home, Trophy, Building2, Flame, Zap } from 'lucide-react';
import { soundManager } from '../sound/soundEngine';

interface ModalGameOverProps {
  stats: GameStats;
  isNewRecord: boolean;
  onRestart: () => void;
  onGoToMenu: () => void;
}

export const ModalGameOver: React.FC<ModalGameOverProps> = ({
  stats,
  isNewRecord,
  onRestart,
  onGoToMenu,
}) => {
  const handleRestart = () => {
    soundManager.playGameStart();
    onRestart();
  };

  const handleMenu = () => {
    soundManager.playDrop();
    onGoToMenu();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-md bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Glow Decorativo */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-500/15 blur-[100px] rounded-full pointer-events-none" />

        {/* Título de Fim de Obra */}
        <div className="mb-6 relative z-10">
          {isNewRecord && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 font-mono text-xs font-black tracking-wider uppercase mb-3 shadow-lg animate-pulse-fast">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>NOVO RECORDE HISTÓRICO!</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-wider">
            FIM DE CONSTRUÇÃO
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Seu arranha-céu cyberpunk atingiu as alturas
          </p>
        </div>

        {/* Grade de Estatísticas da Partida */}
        <div className="grid grid-cols-2 gap-3 mb-6 relative z-10 text-left">
          {/* Andar Máximo */}
          <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/70">
            <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono font-bold mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>ANDAR FINAL</span>
            </div>
            <span className="text-2xl font-black font-display text-white">
              {stats.height} <small className="text-xs font-mono text-cyan-400">FL</small>
            </span>
          </div>

          {/* Pontuação Total */}
          <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/70">
            <div className="flex items-center gap-1.5 text-purple-400 text-xs font-mono font-bold mb-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>PONTUAÇÃO</span>
            </div>
            <span className="text-2xl font-black font-mono text-white">
              {stats.score.toLocaleString()}
            </span>
          </div>

          {/* Encaixes Perfeitos */}
          <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/70">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>PERFECT DROPS</span>
            </div>
            <span className="text-2xl font-black font-mono text-white">
              {stats.perfectDrops}
            </span>
          </div>

          {/* Maior Combo */}
          <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/70">
            <div className="flex items-center gap-1.5 text-pink-400 text-xs font-mono font-bold mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>MAIOR COMBO</span>
            </div>
            <span className="text-2xl font-black font-mono text-white">
              x{stats.maxCombo}
            </span>
          </div>
        </div>

        {/* Zona Urbana Atingida */}
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6 text-xs font-mono text-slate-300">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Camada Urbana Atingida</span>
          <span className="text-cyan-400 font-bold text-sm">{stats.zone}</span>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col gap-3 relative z-10">
          <button
            type="button"
            onClick={handleRestart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-500 text-slate-950 font-black font-display text-sm tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/30"
          >
            <RotateCcw className="w-4 h-4 stroke-[3]" />
            <span>RECONSTRUIR (JOGAR NOVAMENTE)</span>
          </button>

          <button
            type="button"
            onClick={handleMenu}
            className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold font-mono text-xs transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>MENU PRINCIPAL</span>
          </button>
        </div>
      </div>
    </div>
  );
};
