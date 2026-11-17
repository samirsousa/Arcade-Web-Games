import React from 'react';
import { GameStats } from '../types/game';
import { RotateCcw, Home, Sparkles, Trophy, AlertTriangle, Coins, Orbit } from 'lucide-react';

interface ModalGameOverProps {
  isVictory: boolean;
  stats: GameStats;
  onRestart: () => void;
  onGoToMenu: () => void;
}

export const ModalGameOver: React.FC<ModalGameOverProps> = ({
  isVictory,
  stats,
  onRestart,
  onGoToMenu,
}) => {
  const isNewHighScore = stats.score >= stats.highScore && stats.score > 0;
  const timeFormatted = `${Math.floor(stats.timeElapsed)}s`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-md bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 text-center relative overflow-hidden">
        {/* Glow de fundo */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-[90px] pointer-events-none ${
            isVictory ? 'bg-emerald-500/25' : 'bg-rose-500/25'
          }`}
        />

        {/* Título & Ícone */}
        <div className="relative mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border-2 shadow-xl ${
              isVictory
                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-400 shadow-emerald-500/20'
                : 'bg-rose-500/20 border-rose-500/50 text-rose-500 shadow-rose-500/20'
            }`}>
              {isVictory ? <Trophy className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
            </div>
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-black font-sans uppercase tracking-tight ${
              isVictory ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isVictory ? 'MISSÃO CUMPRIDA!' : 'FALHA GRAVITACIONAL'}
          </h2>
          <p className="text-sm font-mono text-slate-300 mt-1">
            {isVictory
              ? 'Fenda de gravidade zero dominada com maestria!'
              : 'O campo gravitacional instável desestabilizou o traje. Tente novamente!'}
          </p>
        </div>

        {/* Notificação de Novo Recorde */}
        {isNewHighScore && (
          <div className="mb-4 py-1.5 px-3 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold flex items-center justify-center gap-1.5 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            NOVO RECORDE PESSOAL REGISTRADO!
          </div>
        )}

        {/* Grade de Estatísticas da Partida */}
        <div className="grid grid-cols-2 gap-3 mb-8 text-left">
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">PONTOS</span>
            <span className="text-xl font-mono font-black text-white">{stats.score}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">RECORD MÁXIMO</span>
            <span className="text-xl font-mono font-black text-amber-400">{stats.highScore}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">MOEDAS</span>
              <span className="text-lg font-mono font-bold text-yellow-400 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-400" /> {stats.coins}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">PORTAIS</span>
              <span className="text-lg font-mono font-bold text-purple-400 flex items-center gap-1">
                <Orbit className="w-3.5 h-3.5 text-purple-400" /> {stats.portalsUsed}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">TEMPO</span>
              <span className="text-lg font-mono font-bold text-cyan-400">{timeFormatted}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">SETOR ATINGIDO</span>
              <span className="text-sm font-mono font-bold text-emerald-400">{stats.currentLevel} / 6</span>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black font-mono text-base tracking-wider hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>JOGAR NOVAMENTE</span>
          </button>

          <button
            type="button"
            onClick={onGoToMenu}
            className="w-full py-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold font-mono text-sm transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>MENU PRINCIPAL</span>
          </button>
        </div>
      </div>
    </div>
  );
};
