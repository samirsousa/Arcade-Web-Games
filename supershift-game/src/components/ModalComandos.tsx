import React from 'react';
import { X, Keyboard, Smartphone, Sparkles, Feather, Flame, Magnet, Gamepad2, Pause } from 'lucide-react';
import { soundManager } from '../sound/soundEngine';

interface ModalComandosProps {
  onClose: () => void;
}

export const ModalComandos: React.FC<ModalComandosProps> = ({ onClose }) => {
  const handleClose = () => {
    soundManager.playSelect();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-2xl bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 text-left relative max-h-[90vh] overflow-y-auto">
        {/* Glow Decorativo */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/15 blur-[80px] rounded-full pointer-events-none" />

        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-sans text-white tracking-wide">
              GUIA DE COMANDOS & MECÂNICAS
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Seção 1: Controles de Teclado (PC) */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <Keyboard className="w-4 h-4" /> CONTROLES NO TECLADO (DESKTOP)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-slate-200 block">Mover Personagem</span>
                  <span className="text-xs text-slate-400">Corrida horizontal contínua</span>
                </div>
                <div className="flex gap-1.5 font-mono text-xs font-bold text-emerald-400">
                  <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700">A</span>
                  <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700">D</span>
                  <span className="text-slate-500 self-center">ou</span>
                  <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700">◀ ▶</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-slate-200 block">Pular / Pulo Duplo</span>
                  <span className="text-xs text-slate-400">Pulo duplo ativo com Pet Aero</span>
                </div>
                <div className="flex gap-1.5 font-mono text-xs font-bold text-purple-400">
                  <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700">ESPAÇO</span>
                  <span className="text-slate-500 self-center">ou</span>
                  <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700">W / ▲</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-slate-200 block">Super Boost Sonic</span>
                  <span className="text-xs text-slate-400">Arranco supersônico & rastro azul</span>
                </div>
                <div className="flex gap-1.5 font-mono text-xs font-bold text-blue-400">
                  <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700">SHIFT</span>
                  <span className="text-slate-500 self-center">ou</span>
                  <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700">K</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-slate-200 block">Pausa & Reinício</span>
                  <span className="text-xs text-slate-400">Menu tático rápido</span>
                </div>
                <div className="flex gap-1.5 font-mono text-xs font-bold text-amber-400">
                  <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700">P (Pausa)</span>
                  <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700">R (Restart)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 2: Controles Táteis (Mobile) */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> CONTROLES NA TELA (TOUCH SCREEN / MOBILE)
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/30">
                <span className="text-xl font-mono text-emerald-400 block mb-1 font-black">◀ ▶</span>
                <span className="text-xs font-bold text-slate-200 block">D-Pad Direcional</span>
                <span className="text-[10px] text-slate-400">Canto inferior esquerdo</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-purple-500/30">
                <span className="text-xl font-mono text-purple-400 block mb-1 font-black">▲</span>
                <span className="text-xs font-bold text-slate-200 block">Botão de Pulo</span>
                <span className="text-[10px] text-slate-400">Canto inferior direito</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-blue-500/30">
                <span className="text-xl font-mono text-blue-400 block mb-1 font-black">⚡</span>
                <span className="text-xs font-bold text-slate-200 block">Botão de Boost</span>
                <span className="text-[10px] text-slate-400">Aceleração máxima</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30">
                <div className="flex justify-center mb-1 pt-0.5">
                  <Pause className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-xs font-bold text-slate-200 block">Pausa HUD</span>
                <span className="text-[10px] text-slate-400">Canto superior direito</span>
              </div>
            </div>
          </div>

          {/* Seção 3: Habilidades dos Pocket Pets (Pokémon Style) */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> VANTAGENS DOS POCKET PETS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-sky-950/40 border border-sky-500/40 flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-sky-500/50">
                  <Feather className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-sky-300 block font-mono">AERO (VOADOR)</span>
                  <span className="text-xs text-slate-300 leading-tight block mt-0.5">
                    Habilita Pulo Duplo no ar para alcançar tetos e plataformas elevadas.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-orange-950/40 border border-orange-500/40 flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-orange-500/50">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-orange-300 block font-mono">SPARKY (FOGO)</span>
                  <span className="text-xs text-slate-300 leading-tight block mt-0.5">
                    Cria uma aura ígnea protetora que destrói drones e glitches em contato.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-yellow-950/40 border border-yellow-500/40 flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 text-slate-950 shadow-md shadow-yellow-500/50">
                  <Magnet className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-yellow-300 block font-mono">VOLT (MAGNÉTICO)</span>
                  <span className="text-xs text-slate-300 leading-tight block mt-0.5">
                    Atrai moedas automaticamente em um campo magnético de 240px.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Fechar */}
        <div className="mt-8 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-black font-mono text-sm tracking-wider hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/30 text-center"
          >
            ENTENDIDO, VAMOS JOGAR!
          </button>
        </div>
      </div>
    </div>
  );
};
