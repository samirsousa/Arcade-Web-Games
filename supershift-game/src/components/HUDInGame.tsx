import React from 'react';
import { GameStats, Pet, Player } from '../types/game';
import { Pause, Settings, Zap, Feather, Magnet, Flame, Coins } from 'lucide-react';

interface HUDInGameProps {
  stats: GameStats;
  player: Player | null;
  pets: Pet[];
  gravityInverted: boolean;
  onPause: () => void;
  onOpenSettings: () => void;
}

export const HUDInGame: React.FC<HUDInGameProps> = ({
  stats,
  player,
  pets,
  gravityInverted,
  onPause,
  onOpenSettings,
}) => {
  const currentHealth = player ? player.health : 3;
  const maxHealth = player ? player.maxHealth : 3;
  const speed = stats.speed;
  const isSonicSpeed = speed > 450;
  const heroName = player?.characterId ? player.characterId.toUpperCase() : 'HERÓI';

  return (
    <header className="fixed top-0 inset-x-0 p-3 md:p-4 z-30 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Painel Esquerdo: Vidas & Indicador de Gravidade */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Card de Saúde */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg shadow-black/40">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
              {heroName}
            </span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: maxHealth }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    i < currentHealth
                      ? 'bg-gradient-to-br from-rose-500 to-emerald-600 shadow-md shadow-rose-500/50 scale-100'
                      : 'bg-slate-700/50 scale-90 opacity-40'
                  }`}
                  title={i < currentHealth ? 'Vida Cheia' : 'Vida Perdida'}
                />
              ))}
            </div>
          </div>

          {/* Badge de Nível (1 a 6) */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-xs font-black shadow-md shadow-cyan-950/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SETOR {stats.currentLevel}/6</span>
          </div>

          {/* Medidor de Gravidade (Twist Central Antigravity) */}
          <div
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-md border transition-all duration-500 ${
              gravityInverted
                ? 'bg-purple-950/80 border-purple-500 text-purple-200 shadow-lg shadow-purple-500/30 animate-pulse'
                : 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200 shadow-md shadow-emerald-500/20'
            }`}
          >
            <span className="text-lg font-black">
              {gravityInverted ? '▲' : '▼'}
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase leading-none">
                CAMPO
              </span>
              <span className="text-xs font-mono font-extrabold tracking-tight">
                {gravityInverted ? 'GRAVIDADE ZERO' : 'GRAVIDADE 1G'}
              </span>
            </div>
          </div>
        </div>

        {/* Painel Central: Moedas, Score e Velocímetro Sonic */}
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          {/* Moedas Coletadas (Mario Style) */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-amber-500/40 shadow-lg shadow-amber-950/30">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black shadow-md shadow-yellow-500/50">
              <Coins className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="text-amber-400 font-mono font-black text-base md:text-lg">
              {stats.coins.toString().padStart(2, '0')}
            </span>
          </div>

          {/* Pontuação & Recorde */}
          <div className="flex flex-col items-center px-4 py-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg shadow-black/40">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
              SCORE / HI: <strong className="text-emerald-400">{stats.highScore}</strong>
            </span>
            <span className="text-lg md:text-xl font-mono font-black text-white tracking-wider">
              {stats.score.toString().padStart(6, '0')}
            </span>
          </div>

          {/* Velocímetro (Sonic Style) */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-blue-500/40 shadow-lg shadow-blue-950/30">
            <Zap className={`w-4 h-4 ${isSonicSpeed ? 'text-blue-400 animate-bounce' : 'text-slate-400'}`} />
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-mono text-slate-400 uppercase">VELOCIDADE</span>
                <span className={`text-[10px] font-mono font-black ${isSonicSpeed ? 'text-blue-400' : 'text-slate-300'}`}>
                  {speed} px/s
                </span>
              </div>
              <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100"
                  style={{ width: `${Math.min(100, (speed / 750) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Painel Direito: Pocket Pets Ativos & Botões de Ação */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Lista de Pocket Pets (Pokémon Style) */}
          {pets.length > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-md">
              <span className="text-[10px] font-mono font-bold text-slate-400 mr-1 hidden lg:inline">
                PETS:
              </span>
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs shadow-md border border-white/20 relative group transition-transform hover:scale-110"
                  style={{ backgroundColor: pet.color }}
                  title={`${pet.name}: ${pet.description}`}
                >
                  {pet.type === 'FIRE' && <Flame className="w-4 h-4 text-white" />}
                  {pet.type === 'FLY' && <Feather className="w-4 h-4 text-white" />}
                  {pet.type === 'MAGNET' && <Magnet className="w-4 h-4 text-white" />}
                  {/* Tooltip flutuante */}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {pet.name} ({pet.type})
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Botão Pausa */}
          <button
            type="button"
            onClick={onPause}
            className="w-10 h-10 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 active:scale-95 transition-all flex items-center justify-center shadow-md shadow-black/40"
            title="Pausar Jogo (P)"
          >
            <Pause className="w-5 h-5" />
          </button>

          {/* Botão Configurações */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 active:scale-95 transition-all flex items-center justify-center shadow-md shadow-black/40"
            title="Configurações"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
