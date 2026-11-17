import React from 'react';
import { Play, Settings, HelpCircle, Trophy, Building2, Flame } from 'lucide-react';
import { soundManager } from '../sound/soundEngine';

interface MenuPrincipalProps {
  highScore: number;
  maxHeight: number;
  onStartGame: () => void;
  onOpenSettings: () => void;
  onOpenCommands: () => void;
}

export const MenuPrincipal: React.FC<MenuPrincipalProps> = ({
  highScore,
  maxHeight,
  onStartGame,
  onOpenSettings,
  onOpenCommands,
}) => {
  const handleMouseEnter = () => {
    soundManager.playDrop();
  };

  const handleStart = () => {
    soundManager.playGameStart();
    onStartGame();
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-between items-center p-4 md:p-8 bg-slate-950/60 backdrop-blur-[3px] transition-all duration-700 animate-fade-in select-none">
      {/* Luzes cósmicas de ambientação */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-cyan-500/20 via-pink-600/20 to-purple-600/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Cabeçalho Superior */}
      <header className="w-full max-w-lg flex justify-between items-center z-10">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-xs shadow-lg">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span>TORRE MÁX: <strong className="text-white font-bold">{maxHeight} ANDARES</strong></span>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-xs shadow-lg">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>RECORDE: <strong className="text-white font-bold">{highScore.toLocaleString()}</strong></span>
        </div>
      </header>

      {/* Núcleo Central: Título Cyberpunk e Botões Arcade */}
      <main className="w-full max-w-sm flex flex-col items-center text-center my-auto z-10 space-y-6">
        {/* Título Estilo Fliperama Futurista */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/85 border border-cyan-500/40 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase shadow-md mb-2">
            <Flame className="w-3.5 h-3.5 text-pink-500" />
            <span>PRECISION ARCADE BUILDER</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]">
            STACKER PRO
          </h1>
          <p className="text-sm font-mono font-bold text-slate-300 tracking-wider">
            URBAN BUILDER
          </p>
        </div>

        {/* Coluna Clássica de Botões */}
        <div className="w-full flex flex-col gap-3">
          {/* Botão JOGAR */}
          <button
            type="button"
            onClick={handleStart}
            onMouseEnter={handleMouseEnter}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-500 text-slate-950 font-black font-display text-base tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/30 group"
          >
            <Play className="w-5 h-5 fill-slate-950 group-hover:scale-110 transition-transform" />
            <span>INICIAR CONSTRUÇÃO</span>
          </button>

          {/* Botão CONFIGURAÇÕES */}
          <button
            type="button"
            onClick={onOpenSettings}
            onMouseEnter={handleMouseEnter}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 font-bold font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-md"
          >
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>SISTEMA & ÁUDIO</span>
          </button>

          {/* Botão COMANDOS & REGRAS */}
          <button
            type="button"
            onClick={onOpenCommands}
            onMouseEnter={handleMouseEnter}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 text-slate-300 font-bold font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-md"
          >
            <HelpCircle className="w-4 h-4 text-pink-400" />
            <span>COMO JOGAR & MECÂNICAS</span>
          </button>
        </div>
      </main>

      {/* Rodapé Informativo */}
      <footer className="w-full max-w-lg text-center z-10 text-[11px] font-mono text-slate-400">
        <p className="flex items-center justify-center gap-2">
          <span>Pressione <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-bold">ESPAÇO</kbd> ou toque para soltar blocos</span>
        </p>
      </footer>
    </div>
  );
};
