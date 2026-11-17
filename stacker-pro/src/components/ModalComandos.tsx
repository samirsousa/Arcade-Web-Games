import React from 'react';
import { X, Keyboard, Smartphone, Scissors, Zap, Heart, Flame } from 'lucide-react';

interface ModalComandosProps {
  onClose: () => void;
}

export const ModalComandos: React.FC<ModalComandosProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-lg bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl text-left relative max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <h2 className="text-lg font-black font-display text-white tracking-wider flex items-center gap-2">
            <span className="text-cyan-400">STACKER PRO:</span> MANUAL DE OPERAÇÕES
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Seção 1: Controles */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Keyboard className="w-4 h-4" /> COMANDOS DO SISTEMA
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60">
                <span className="text-slate-300">Soltar Bloco na Pilha</span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-400 font-bold">ESPAÇO</kbd>
                  <span className="text-slate-500">ou</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-400 font-bold">CLIQUE</kbd>
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60">
                <span className="text-slate-300">Mobile / Celular</span>
                <span className="flex items-center gap-1.5 text-pink-400">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Botão DROP ou Toque na Tela</span>
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60">
                <span className="text-slate-300">Pausar / Continuar</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold">P / ESC</kbd>
              </div>
            </div>
          </div>

          {/* Seção 2: Mecânicas & Regras de Precisão */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono font-bold text-pink-400 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4" /> MECÂNICAS ARCADE
            </h3>

            {/* Corte a Laser */}
            <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Scissors className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-slate-200">Corte do Excesso Desalinhado</h4>
                <p className="text-slate-400 mt-0.5">
                  Qualquer parte do bloco que ultrapassar as margens da pilha anterior será cortada e cairá no abismo, diminuindo a largura útil da torre.
                </p>
              </div>
            </div>

            {/* Encaixe Perfeito */}
            <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Flame className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-slate-200">Encaixe Perfeito & Combos</h4>
                <p className="text-slate-400 mt-0.5">
                  Solte o bloco perfeitamente alinhado com o anterior para acionar o <strong>PERFECT</strong>. Manter sequências de combos recupera a largura dos blocos e gera pontuação exponencial!
                </p>
              </div>
            </div>

            {/* Vidas & Tolerância */}
            <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-slate-200">Sistema de Vidas (3 Chances)</h4>
                <p className="text-slate-400 mt-0.5">
                  Se você errar completamente o bloco (sem tocar na base), perderá 1 vida. O jogo encerra apenas após esgotar as 3 vidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
