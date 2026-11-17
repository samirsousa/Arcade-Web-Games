import React from 'react';
import { CharacterId } from '../types/game';
import { CHARACTERS } from '../data/characters';
import { X, Check, Sparkles, Users } from 'lucide-react';
import { CharacterPortrait } from './CharacterPortrait';
import { soundManager } from '../sound/soundEngine';

interface ModalSelecaoPersonagemProps {
  selectedCharacter: CharacterId;
  onSelectCharacter: (id: CharacterId) => void;
  onClose: () => void;
}

export const ModalSelecaoPersonagem: React.FC<ModalSelecaoPersonagemProps> = ({
  selectedCharacter,
  onSelectCharacter,
  onClose,
}) => {
  const handleSelect = (id: CharacterId) => {
    soundManager.playSelect();
    onSelectCharacter(id);
  };

  const handleConfirm = () => {
    soundManager.playGameStart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-4xl bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-black/80 text-left relative max-h-[92vh] overflow-y-auto">
        {/* Glow Decorativo */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-white tracking-wide">
                SELEÇÃO DE HERÓIS CÓSMICOS
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Cada personagem possui atributos e renderização exclusiva no Canvas
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grade com os 6 Personagens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
          {CHARACTERS.map((char) => {
            const isSelected = selectedCharacter === char.id;
            return (
              <div
                key={char.id}
                onClick={() => handleSelect(char.id)}
                className={`cursor-pointer rounded-2xl p-4 transition-all relative overflow-hidden flex flex-col justify-between border-2 ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-400 shadow-xl shadow-emerald-500/20 scale-[1.02]'
                    : 'bg-slate-900/70 border-slate-700/70 hover:border-slate-500 hover:bg-slate-800/60'
                }`}
              >
                {/* Badge Selecionado */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-mono text-[10px] font-black shadow-md">
                    <Check className="w-3 h-3 stroke-[3]" /> ATIVO
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 flex-shrink-0 overflow-hidden"
                      style={{ backgroundColor: char.badgeColor }}
                    >
                      <CharacterPortrait characterId={char.id} size={42} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        {char.franchise}
                      </span>
                      <h3 className="text-base font-black text-white font-sans leading-tight">
                        {char.name}
                      </h3>
                      <span className="text-xs text-emerald-400 font-mono font-medium block">
                        {char.title}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                    {char.description}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-start gap-1.5 mt-auto">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">{char.trait}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rodapé com Botão Confirmar */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-400">
            Personagem selecionado: <strong className="text-emerald-400 font-bold">{CHARACTERS.find(c => c.id === selectedCharacter)?.name}</strong>
          </div>
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black font-mono text-sm tracking-wider hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/30 text-center"
          >
            CONFIRMAR HERÓI & RETORNAR
          </button>
        </div>
      </div>
    </div>
  );
};
