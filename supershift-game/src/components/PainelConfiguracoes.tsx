import React from 'react';
import { GameSettings } from '../types/game';
import { X, Volume2, Smartphone, Keyboard, Settings } from 'lucide-react';

interface PainelConfiguracoesProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onClose: () => void;
}

export const PainelConfiguracoes: React.FC<PainelConfiguracoesProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  const toggleSound = () => {
    onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled });
  };

  const toggleMusic = () => {
    onUpdateSettings({ ...settings, musicEnabled: !settings.musicEnabled });
  };

  const toggleTouchControls = () => {
    onUpdateSettings({ ...settings, showTouchControls: !settings.showTouchControls });
  };

  const handleSfxVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({ ...settings, sfxVolume: parseFloat(e.target.value) });
  };

  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({ ...settings, musicVolume: parseFloat(e.target.value) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-lg bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 text-left relative max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <Settings className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-xl font-black font-sans text-white tracking-wide">
              CONFIGURAÇÕES DO SISTEMA
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Seção 1: Áudio e Música */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <Volume2 className="w-4 h-4" /> ÁUDIO E SONS ARCADE
            </h3>

            {/* SFX Toggle & Slider */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200">Efeitos Sonoros (SFX)</span>
                <button
                  type="button"
                  onClick={toggleSound}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                    settings.soundEnabled
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {settings.soundEnabled ? 'ATIVADO' : 'MUTADO'}
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                disabled={!settings.soundEnabled}
                value={settings.sfxVolume}
                onChange={handleSfxVolumeChange}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Música Chiptune Toggle & Slider */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200">Trilha Sonora Procedural</span>
                <button
                  type="button"
                  onClick={toggleMusic}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                    settings.musicEnabled
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {settings.musicEnabled ? 'ATIVADO' : 'MUTADO'}
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                disabled={!settings.musicEnabled}
                value={settings.musicVolume}
                onChange={handleMusicVolumeChange}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Seção 2: Controles e Touch UI */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> INTERFACE & CONTROLES
            </h3>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-slate-200 block">
                  Controles Táteis na Tela (Touch UI)
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Exibe D-Pad e botões de pulo/boost para telas de toque ou mobile
                </span>
              </div>
              <button
                type="button"
                onClick={toggleTouchControls}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  settings.showTouchControls
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {settings.showTouchControls ? 'VISÍVEL' : 'OCULTO'}
              </button>
            </div>
          </div>

          {/* Seção 3: Guia de Atalhos do Teclado */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Keyboard className="w-4 h-4" /> GUIA RÁPIDO DE TECLAS
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300 pt-1">
              <div><strong className="text-emerald-400">A / D ou ◀ / ▶</strong>: Mover</div>
              <div><strong className="text-purple-400">W ou Espaço</strong>: Pular / Pulo Duplo</div>
              <div><strong className="text-blue-400">Shift ou K</strong>: Super Boost</div>
              <div><strong className="text-amber-400">P ou Esc</strong>: Pausar Jogo</div>
              <div><strong className="text-cyan-400">R</strong>: Reiniciar Nível</div>
            </div>
          </div>
        </div>

        {/* Botão Concluir */}
        <div className="mt-8 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-black font-mono text-sm tracking-wider hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/30 text-center"
          >
            SALVAR E RETORNAR
          </button>
        </div>
      </div>
    </div>
  );
};
