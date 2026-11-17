import React from 'react';
import { Play, Settings, Monitor, Gamepad2, Trophy, Users } from 'lucide-react';
import { CharacterId } from '../types/game';
import { CHARACTERS } from '../data/characters';
import { CharacterPortrait } from './CharacterPortrait';
import { soundManager } from '../sound/soundEngine';

interface MenuPrincipalProps {
  highScore: number;
  selectedCharacter: CharacterId;
  onStartGame: () => void;
  onOpenSettings: () => void;
  onOpenGraphics: () => void;
  onOpenCommands: () => void;
  onOpenCharacters: () => void;
}

export const MenuPrincipal: React.FC<MenuPrincipalProps> = ({
  highScore,
  selectedCharacter,
  onStartGame,
  onOpenSettings,
  onOpenGraphics,
  onOpenCommands,
  onOpenCharacters,
}) => {
  const currentHero = CHARACTERS.find((c) => c.id === selectedCharacter) || CHARACTERS[0];

  const handleMouseEnter = () => {
    soundManager.playSelect();
  };

  const handleStart = () => {
    soundManager.playGameStart();
    onStartGame();
  };

  const handleOpenSettings = () => {
    soundManager.playSelect();
    onOpenSettings();
  };

  const handleOpenGraphics = () => {
    soundManager.playSelect();
    onOpenGraphics();
  };

  const handleOpenCommands = () => {
    soundManager.playSelect();
    onOpenCommands();
  };

  const handleOpenCharacters = () => {
    soundManager.playSelect();
    onOpenCharacters();
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-between items-center p-4 md:p-8 bg-slate-950/50 backdrop-blur-[2px] transition-all duration-700 animate-fade-in select-none">
      {/* Luzes cósmicas de ambientação */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-r from-emerald-500/15 via-purple-600/20 to-blue-600/15 blur-[100px] rounded-full pointer-events-none" />

      {/* Cabeçalho Superior Clássico */}
      <header className="w-full max-w-4xl flex justify-between items-center z-10">
        {/* BOTÃO DE ESCOLHER PERSONAGEM NO LUGAR DE "ARCADE EDITION 2026" */}
        <button
          type="button"
          onClick={handleOpenCharacters}
          onMouseEnter={handleMouseEnter}
          className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-950/90 via-slate-900/90 to-emerald-950/90 backdrop-blur-md border-2 border-emerald-400 text-emerald-300 hover:text-white hover:border-emerald-300 font-mono text-xs font-black tracking-wider shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all group"
          title="Clique para escolher entre Donkey Kong, Ash (Pokémon), Link (Zelda), Mario, Sonic e Goku"
        >
          <div className="w-6 h-6 rounded-lg overflow-hidden border border-white/20 bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <CharacterPortrait characterId={currentHero.id} size={22} />
          </div>
          <span className="hidden sm:inline">HERÓI:</span>
          <span className="text-white font-bold">{currentHero.name}</span>
          <Users className="w-3.5 h-3.5 text-emerald-400 ml-1" />
        </button>

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-sm shadow-lg shadow-amber-950/30">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>RECORDE: <strong className="text-white font-black">{highScore}</strong></span>
        </div>
      </header>

      {/* Núcleo Central: Título Lendário & Coluna Clássica de Botões */}
      <main className="w-full max-w-lg flex flex-col items-center text-center my-auto z-10 space-y-6">
        {/* Título Estilo Fliperama Clássico */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/85 border border-emerald-500/30 text-[10px] md:text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase shadow-md mb-1">
            <div className="w-4 h-4 rounded overflow-hidden flex items-center justify-center">
              <CharacterPortrait characterId={currentHero.id} size={16} />
            </div>
            <span>{currentHero.name} • {currentHero.franchise}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-200 to-purple-400 drop-shadow-[0_0_35px_rgba(16,185,129,0.5)]">
            SUPERSHIFT
          </h1>
          <p className="text-base sm:text-xl font-mono font-black text-slate-200 tracking-wider flex items-center justify-center gap-2">
            <span className="text-purple-400">AVENTURA EM</span>
            <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm">
              GRAVIDADE ZERO
            </span>
          </p>
        </div>

        {/* Menu Clássico com os 4 Botões Principais */}
        <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-3 pt-2">
          {/* 1. Botão JOGAR (Destaque Principal) */}
          <button
            type="button"
            onClick={handleStart}
            onMouseEnter={handleMouseEnter}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 font-black font-mono text-xl tracking-wider shadow-xl shadow-emerald-500/40 hover:shadow-emerald-400/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-emerald-300/80 group"
          >
            <Play className="w-6 h-6 fill-slate-950 group-hover:scale-110 transition-transform" />
            <span>JOGAR</span>
          </button>

          {/* 2. Botão CONFIGURAÇÕES */}
          <button
            type="button"
            onClick={handleOpenSettings}
            onMouseEnter={handleMouseEnter}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900/85 hover:bg-slate-800/90 text-slate-200 font-bold font-mono text-base tracking-wide border border-slate-700/80 hover:border-slate-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-black/40 backdrop-blur-md"
          >
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-emerald-400" />
            <span>CONFIGURAÇÕES</span>
          </button>

          {/* 3. Botão GRÁFICOS */}
          <button
            type="button"
            onClick={handleOpenGraphics}
            onMouseEnter={handleMouseEnter}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900/85 hover:bg-slate-800/90 text-slate-200 font-bold font-mono text-base tracking-wide border border-slate-700/80 hover:border-slate-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-black/40 backdrop-blur-md"
          >
            <Monitor className="w-5 h-5 text-purple-400" />
            <span>GRÁFICOS</span>
          </button>

          {/* 4. Botão COMANDOS */}
          <button
            type="button"
            onClick={handleOpenCommands}
            onMouseEnter={handleMouseEnter}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900/85 hover:bg-slate-800/90 text-slate-200 font-bold font-mono text-base tracking-wide border border-slate-700/80 hover:border-slate-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-black/40 backdrop-blur-md"
          >
            <Gamepad2 className="w-5 h-5 text-blue-400" />
            <span>COMANDOS</span>
          </button>
        </div>

        {/* Efeito Clássico Piscante "PRESS START" */}
        <div className="pt-2 animate-pulse text-xs font-mono font-bold text-emerald-400/90 tracking-widest uppercase">
          ✦ CLIQUE EM JOGAR OU PRESSIONE [ESPAÇO] PARA INICIAR ✦
        </div>
      </main>

      {/* Rodapé Clássico */}
      <footer className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400/80 z-10 border-t border-slate-800/60 pt-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded overflow-hidden inline-flex items-center justify-center">
              <CharacterPortrait characterId={currentHero.id} size={16} />
            </span>
            {currentHero.name} ({currentHero.franchise})
          </span>
          <span>•</span>
          <span>6 Setores Cósmicos</span>
          <span>•</span>
          <span>Itens Clássicos</span>
        </div>
        <div className="text-emerald-400/80">
          60 FPS • Web Audio Procedural
        </div>
      </footer>
    </div>
  );
};
